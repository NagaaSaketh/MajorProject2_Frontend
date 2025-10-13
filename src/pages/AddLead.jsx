import useFetch from "../../useFetch";
import useLeadContext from "../contexts/LeadContext";
import { Link } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";

const AddLead = () => {
  const { data, loading, error } = useFetch("http://localhost:3000/agents");
  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
  } = useFetch("http://localhost:3000/tags");
  const {
    createLead,
    setName,
    name,
    setSource,
    source,
    setAgent,
    agent,
    setStatus,
    status,
    setPriority,
    priority,
    setCloseTime,
    closeTime,
    tags,
    setTags,
  } = useLeadContext();

  return (
    <>
      <div className="sidebar">
        <Link className="dashboard" to="/">
          Back to Dashboard
        </Link>
      </div>
      <div className="container">
        <h1>Add New Lead</h1>
        <form onSubmit={createLead}>
          <div className="form-group">
            <label htmlFor="name">Lead Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              value={name}
              placeholder="Enter lead name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="leadSource">Lead Source</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              id="leadsource"
              required
            >
              <option value="">Select lead source</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Email">Email</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="agents">Sales Agent</label>
            {loading ? (
              <p className="loading-text">Loading agents...</p>
            ) : error ? (
              <p className="error-text">Error loading agents</p>
            ) : data && data.length > 0 ? (
              <select
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
                id="agents"
                required
              >
                <option value="">Select sales agent</option>
                {data.map((agentItem) => (
                  <option key={agentItem._id} value={agentItem._id}>
                    {agentItem.name}
                  </option>
                ))}
              </select>
            ) : (
              <p>No Agents to show</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="status">Lead Status</label>
            <select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              id="status"
              required
            >
              <option value="">Select Lead status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              onChange={(e) => setPriority(e.target.value)}
              value={priority}
              id="priority"
              required
            >
              <option value="">Select lead priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="timetoclose">Time to Close (days)</label>
            <input
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              type="number"
              id="timetoclose"
              placeholder="Enter number of days"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            {tagsLoading ? (
              <p className="loading-text">Loading tags...</p>
            ) : tagsError ? (
              <p className="error-text">Error loading tags</p>
            ) : tagsData && tagsData.length > 0 ? (
              <select
                multiple
                value={tags}
                onChange={(e) => {
                  const selectedOptions = Array.from(
                    e.target.selectedOptions
                  ).map((option) => option.value);
                  setTags(selectedOptions);
                }}
                id="tags"
                required
              >
                {tagsData.map((tag) => (
                  <option key={tag._id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </select>
            ) : (
              <p>No Tags to show</p>
            )}
          </div>

          <button type="submit">Create Lead</button>
        </form>
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

export default AddLead;
