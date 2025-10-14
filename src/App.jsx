import { Link } from "react-router-dom";
import useFetch from "../useFetch";
import "./App.css";
import { useState } from "react";

function App() {
  const { data, loading, error } = useFetch("https://major-project2-backend-seven.vercel.app/leads");
  console.log(data);

  const [selectedStatus, setSelectedStatus] = useState("");

  let newStatusCount =
    data?.filter((lead) => lead.status === "New").length || 0;
  let contactStatusCount =
    data?.filter((lead) => lead.status === "Contacted").length || 0;
  let qualifiedStatusCount =
    data?.filter((lead) => lead.status === "Qualified").length || 0;
  let proposalSentStatusCount =
    data?.filter((lead) => lead.status === "Proposal Sent").length || 0;
  let closedStatusCount =
    data?.filter((lead) => lead.status === "Closed").length || 0;

  const filteredLeads = selectedStatus
    ? data?.filter((lead) => lead.status === selectedStatus)
    : [];

  return (
    <>
      <div className="app-header">
        <h1>Anvaya CRM Dashboard</h1>
      </div>
      <div className="content">
        <div className="sidebar">
          <Link className="links" to="/leads">
            Leads
          </Link>
           <Link className="links" to="/leadby">
            View Lead Filters
          </Link>
          <Link className="links" to="/agents">
            Sales Agents
          </Link>
          <Link className="links" to="/reports">
            Reports
          </Link>
          <Link className="links" to="/settings">
            Settings
          </Link>
        </div>
        <div className="lead-info">
          <div className="leads-section">
            <h3>LEADS</h3>
            <div className="leads">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>An error occurred while fetching leads</p>
              ) : data && data.length > 0 ? (
                data.map((lead) => (
                  <div className="leads-title" key={lead._id}>
                    <Link className="lead-links" to={`/lead/${lead._id}`}>
                      {lead.name}
                    </Link>
                  </div>
                ))
              ) : (
                <p> No Leads found.</p>
              )}
            </div>
          </div>
          <hr />
          <div className="lead-status-section">
            <h3>Lead Status:</h3>
            <div className="leadStatus-count">
              <div
                className="cards"
                onClick={() => setSelectedStatus("New")}
              >
                New: {newStatusCount} {newStatusCount === 1 ? "Lead" : "Leads"}
              </div>
              <div
                className="cards"
                onClick={() => setSelectedStatus("Contacted")}
              >
                Contacted: {contactStatusCount}{" "}
                {contactStatusCount === 1 ? "Lead" : "Leads"}
              </div>
              <div
                className="cards"
                onClick={() => setSelectedStatus("Qualified")}
              >
                Qualified: {qualifiedStatusCount}{" "}
                {qualifiedStatusCount === 1 ? "Lead" : "Leads"}
              </div>
              <div
                className="cards"
                onClick={() => setSelectedStatus("Proposal Sent")}
              >
                Proposal Sent: {proposalSentStatusCount}{" "}
                {proposalSentStatusCount === 1 ? "Lead" : "Leads"}
              </div>
              <div
                className="cards"
                onClick={() => setSelectedStatus("Closed")}
              >
                Closed: {closedStatusCount}{" "}
                {closedStatusCount === 1 ? "Lead" : "Leads"}
              </div>
            </div>
          </div>
          <hr />
          {selectedStatus && (
            <div className="lead-details">
              <h3>{selectedStatus} Leads:</h3>
              <div className="filtered-leads">
                {filteredLeads && filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <div className="filtered-leadDetails" key={lead._id}>
                      <Link className="lead-links" to={`/lead/${lead._id}`}>
                        <p>Lead name: {lead.name}</p>
                      </Link>
                      <p>Agent: {lead.salesAgent.name}</p>
                      <p>Priority: {lead.priority} </p>
                    </div>
                  ))
                ) : (
                  <p>No {selectedStatus} Leads found.</p>
                )}
              </div>
              <hr />
            </div>
          )}
          <div className="add-lead">
            <Link className="addLead-btn" to="/addLead">Add New Lead</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
