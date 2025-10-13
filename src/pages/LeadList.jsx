import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../useFetch";
import useAgentContext from "../contexts/AgentContext";
import { useState } from "react";
import useTagContext from "../contexts/TagsContext";
const LeadList = () => {
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
    `http://localhost:3000/leads/${queryString}`
  );
  // console.log(data);
  const { agents } = useAgentContext();
  const { tags } = useTagContext();

  console.log(data);

  const [selectedAgent, setSelectedAgent] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedTags, setSelectedTags] = useState([]);

  const filteredLeads = data?.filter((lead) => {
    const agentsMatch =
      selectedAgent === "All" || lead.salesAgent.name === selectedAgent;
    const priorityMatch =
      selectedPriority === "All" || lead.priority === selectedPriority;
    const statusMatch =
      selectedStatus === "All" || lead.status === selectedStatus;
    const tagsMatch =
      selectedTags.length === 0 ||
      selectedTags.includes("All") ||
      lead.tags.find((tag) => selectedTags.includes(tag));
    return agentsMatch && priorityMatch && statusMatch && tagsMatch;
  });
  return (
    <>
      <div className="app-header">
        <h1>Lead List</h1>
      </div>
      <div className="content">
        <div className="sidebar">
          <Link className="dashboard" to="/">
            Back to Dashboard
          </Link>
          <h3>Filters</h3>
          <div className="filters">
            <label htmlFor="status">Filter by Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              id="status"
            >
              <option value="All">Select status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
            <label htmlFor="agents">Filter by Agents:</label>
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              id="agents"
            >
              <option value="All">Select agent</option>
              {agents?.map((agent) => (
                <option key={agent._id} value={agent.name}>
                  {agent.name}
                </option>
              ))}
            </select>
            <label htmlFor="agents">Filter by Tags:</label>
            <select
              value={selectedTags}
              onChange={(e) => {
                const values = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                if (values.includes("All")) {
                  setSelectedTags(["All"]);
                } else {
                  setSelectedTags(values);
                }
              }}
              id="agents"
              multiple
            >
              <option value="All">Select Tags</option>
              {tags?.map((tag) => (
                <option key={tag._id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          <h3>Sort By</h3>
          <label htmlFor="priority">Priority:</label>
          <div className="sortBy">
            <label className="low-p">
              <input
                onChange={(e) => setSelectedPriority(e.target.value)}
                type="radio"
                name="priorities"
                value="Low"
                id="low-p"
              />{" "}
              Low
            </label>
            <label htmlFor="med-p">
              <input
                onChange={(e) => setSelectedPriority(e.target.value)}
                type="radio"
                name="priorities"
                value="Medium"
                id="med-p"
              />{" "}
              Medium
            </label>
            <label htmlFor="high-p">
              <input
                onChange={(e) => setSelectedPriority(e.target.value)}
                type="radio"
                name="priorities"
                value="High"
                id="high-p"
              />{" "}
              High
            </label>
          </div>
        </div>
        <div className="leads-info">
          <h2>Lead Overview</h2>
          <div className="lead-list">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>An error occurred while fetching leads</p>
            ) : filteredLeads && filteredLeads.length > 0 ? (
              filteredLeads.map((lead, index) => (
                <div className="lead-details" key={lead._id}>
                  <h3>
                    {index + 1}. {lead.name}
                  </h3>
                  <p>Lead status: {lead.status} </p>
                  <p>Agent: {lead.salesAgent.name} </p>
                  <p>Priority: {lead.priority} </p>
                  <hr />
                </div>
              ))
            ) : (
              <p> No Leads found.</p>
            )}
          </div>
          <div className="add-lead">
            <Link className="addLead-btn" to="/addLead">
              Add New Lead
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadList;
