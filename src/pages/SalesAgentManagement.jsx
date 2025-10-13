import { Link } from "react-router-dom";
import useFetch from "../../useFetch";

const SalesAgentManagement = () => {
  const { data, loading, error } = useFetch("http://localhost:3000/agents");
  console.log(data);

  return (
    <>
      <div className="app-header">
        <h1>Sales Agent Management</h1>
      </div>
      <div className="content">
        <div className="sidebar">
          <Link className="dashboard" to="/">
            Back to Dashboard
          </Link>
        </div>
        <div className="agents-info">
          <h2>Sales Agent List</h2>
          <div className="agents">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>An error occurred while fetching agents</p>
            ) : data && data.length > 0 ? (
              data.map((agent) => (
                <div className="agents-details" key={agent._id}>
                  <h3>
                    Agent: {agent.name} - {agent.email}
                  </h3>
                </div>
              ))
            ) : (
              <p> No Agents found.</p>
            )}
          </div>
          <div className="add-agent">
          <Link className="addAgent-btn" to="/addAgent">
            Add New Agent
          </Link>
        </div>
        </div>
        
      </div>
    </>
  );
};

export default SalesAgentManagement;
