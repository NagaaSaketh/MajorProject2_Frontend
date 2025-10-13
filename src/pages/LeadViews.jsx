import { Link } from "react-router-dom";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../useFetch";
import useAgentContext from "../contexts/AgentContext";
const LeadViews = () => {
  const { agents } = useAgentContext();
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");
  const salesAgent = searchParams.get("salesAgent");
  const source = searchParams.get("source");

  let query = [];

  if (status) {
    query.push(`status=${status}`);
  }
  if (salesAgent) {
    query.push(`salesAgent=${salesAgent}`);
  }
  if (source) {
    query.push(`source=${source}`);
  }

  const queryString = query.length != 0 ? `?${query.join("&")}` : "";

  const { data, loading, error } = useFetch(
    `https://major-project2-backend-seven.vercel.app/leads/${queryString}`
  );
  console.log(data);

  const [selectedAgent, setSelectedAgent] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredLeads = data?.filter((lead) => {
    const agentsMatch =
      selectedAgent === "All" || lead.salesAgent.name === selectedAgent;
    const priorityMatch =
      selectedPriority === "All" || lead.priority === selectedPriority;
    const statusMatch =
      selectedStatus === "All" || lead.status === selectedStatus;
    return agentsMatch && priorityMatch && statusMatch;
  });

  return (
    <>
      <div className="app-header">
        <h1>
          Leads{" "}
          {status
            ? "by Status"
            : salesAgent
            ? "by Sales Agent"
            : source
            ? "by Source"
            : ""}{" "}
        </h1>
      </div>
      <div className="content">
        <div className="sidebar">
          <Link className="dashboard" to="/">
            Back to Dashboard
          </Link>
          {status && salesAgent ? (
            <div className="filters">
              <label htmlFor="priority">Filter by Priority:</label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                id="priority"
              >
                <option value="All">Choose priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          ) : status ? (
            <>
              <h3>Filters</h3>
              <div className="filters">
                <label htmlFor="agents">Filter by Agents:</label>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  id="agents"
                >
                  <option value="All">Choose agent</option>
                  {agents?.map((agent) => (
                    <option key={agent._id} value={agent.name}>
                      {agent.name}
                    </option>
                  ))}
                </select>

                <label htmlFor="priority">Filter by Priority:</label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  id="priority"
                >
                  <option value="All">Choose priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </>
          ) : salesAgent ? (
            <div className="filters">
              <label htmlFor="status">Filter by Status:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                id="status"
              >
                <option value="All">Choose Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </select>

              <label htmlFor="priority">Filter by Priority:</label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                id="priority"
              >
                <option value="All">Choose priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          ) : source ? (
            <div className="filters">
              <label htmlFor="agents">Filter by Agents:</label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                id="agents"
              >
                <option value="All">Choose agent</option>
                {agents?.map((agent) => (
                  <option key={agent._id} value={agent.name}>
                    {agent.name}
                  </option>
                ))}
              </select>

              <label htmlFor="priority">Filter by Priority:</label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                id="priority"
              >
                <option value="All">Choose priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          ) : null}
        </div>

        <div className="status-info">
          <h2>
            {status
              ? "Lead List by Status"
              : salesAgent
              ? "Lead List by Sales Agent"
              : source
              ? "Lead List by Source"
              : "List of Leads"}{" "}
          </h2>
          <hr />
          <h2 className="status-desc">
            {status
              ? `Status: ${status} `
              : salesAgent
              ? `Sales Agent: ${salesAgent} `
              : source
              ? `Source: ${source} `
              : ""}{" "}
          </h2>
          <div className="leads-byStatus">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>An error occurred while fetching agents</p>
            ) : filteredLeads && filteredLeads.length > 0 ? (
              filteredLeads.map((lead, index) => (
                <div className="lead-details" key={lead._id}>
                  <h3>
                    {index + 1}. {lead.name}
                  </h3>
                  <p>Assigned Sales Agent: {lead.salesAgent.name}</p>
                  <p>Estimated Time to close: {lead.timeToClose} days </p>
                  <p>Priority: {lead.priority} </p>
                </div>
              ))
            ) : (
              <p className="no-leads"> No Leads found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadViews;
