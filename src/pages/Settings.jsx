import { Link } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import useLeadContext from "../contexts/LeadContext";
import useAgentContext from "../contexts/AgentContext";
const Settings = () => {
  const { leads, deleteLead } = useLeadContext();
  const { agents, deleteAgent } = useAgentContext();

  return (
    <>
      <div className="app-header">
        <h1>Anvaya CRM Settings</h1>
      </div>
      <div className="content">
        <div className="sidebar">
          <Link className="dashboard" to="/">
            Back to Dashboard
          </Link>
        </div>
        <div className="settings-section">
          <div className="delete-lead-section">
            <h2>Leads</h2>
            {leads && leads.length > 0 ? (
              <>
                {leads.map((lead) => (
                  <div key={lead._id} className="lead">
                    <h3>{lead.name}</h3>
                    <button
                      onClick={() => deleteLead(lead._id)}
                      className="delete-btn"
                    >
                      Delete Lead
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <p>No Leads found.</p>
            )}
          </div>
          <div className="delete-agent-section">
            <h2>Agents</h2>
            {agents && agents.length > 0 ? (
              <>
                {agents.map((agent) => (
                  <div key={agent._id} className="agent">
                    <h3>{agent.name}</h3>
                    <button
                      onClick={() => deleteAgent(agent._id)}
                      className="delete-btn"
                    >
                      Delete Agent
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <p>No Agents Found</p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </>
  );
};

export default Settings;
