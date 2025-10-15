import { Link, useParams } from "react-router-dom";
import useFetch from "../../useFetch";
import useCommentContext from "../contexts/CommentContext";
import { useEffect, useState } from "react";
import { ToastContainer, Slide } from "react-toastify";
import useLeadContext from "../contexts/LeadContext";
import useAgentContext from "../contexts/AgentContext";

const LeadDetails = () => {
  const { leadId } = useParams();
  const { editDetails, getDetails } = useLeadContext();
  const { agents } = useAgentContext();

  const [agent, setAgent] = useState("");


  // console.log(agents);

  const [leadData, setLeadData] = useState(null);

  const { data, loading, error } = useFetch(
    `https://major-project2-backend-seven.vercel.app/lead/${leadId}`
  );

  useEffect(() => {
    if (data) {
      setLeadData(data);
    }
  }, [data]);

  const { comments, fetchComments, postComment, newComment, setNewComment } =
    useCommentContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    priority: "",
    timeToClose: 0,
    tags: [],
  });

  useEffect(() => {
    fetchComments(leadId);
  }, [leadId]);

   useEffect(() => {
    console.log("Comments state updated:", comments);
  }, [comments]);

  useEffect(() => {
    if (isModalOpen && leadData) {
      setFormData({
        name: leadData.name || "",
        source: leadData.source || "",
        salesAgent: leadData.salesAgent?._id || "",
        status: leadData.status || "",
        priority: leadData.priority || "",
        timeToClose: leadData.timeToClose || 0,
        tags: leadData.tags || [],
      });
    }
  }, [isModalOpen, leadData]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const updatedData = {
      _id: data._id,
      name: formData.name,
      source: formData.source,
      salesAgent: formData.salesAgent,
      status: formData.status,
      priority: formData.priority,
      timeToClose: Number(formData.timeToClose),
      tags: formData.tags || [],
    };
    await editDetails(updatedData);

    const updatedLead = await getDetails(leadId);
    setLeadData(updatedLead);

    setIsModalOpen(false);
  };

   const handleCommentSubmit = async () => {
    console.log("Submitting comment with agentId:", agent);
    await postComment(leadId, agent);
    setAgent(""); // Clear agent selection after submitting
  };

  

  return (
    <>
      <div className="app-header">
        <h1>Lead Management : {leadData?.name}</h1>
      </div>
      <div className="content">
        <div className="sidebar">
          <Link className="dashboard" to="/">
            Back to Dashboard
          </Link>
        </div>
        <div className="lead-information">
          <div className="lead-section">
            <h2>Lead Details</h2>
            <div className="about-lead">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>An error occurred while fetching leads</p>
              ) : leadData ? (
                <div className="lead-desc">
                  <p>Lead Name: {leadData?.name} </p>
                  <p>Sales Agent: {leadData?.salesAgent.name} </p>
                  <p>Lead Source: {leadData?.source} </p>
                  <p>Status: {leadData?.status} </p>
                  <p>Priority: {leadData?.priority} </p>
                  <p>Time to Close: {leadData?.timeToClose} days </p>
                </div>
              ) : (
                <p> No Leads found.</p>
              )}
              <button onClick={() => setIsModalOpen(true)} className="edit-btn">
                Edit Lead
              </button>
            </div>
            <div className="comments-section">
              <h3>Comments</h3>
              {comments && comments.length > 0 ? (
                <>
                  {comments.map((comment) => (
                    <div key={comment.id}>
                      <p>
                        Author: {comment.author} -{" "}
                        {new Date(comment.createdAt).toLocaleString()}{" "}
                      </p>
                      <p>Comment: {comment.commentText} </p>
                    </div>
                  ))}
                </>
              ) : (
                <p className="no-comments">No Comments</p>
              )}
              <hr />
            </div>
            <div className="addComment-section">
              <h3>Add New Comment</h3>
              <label htmlFor="agents">Select Agent:</label>
              {agents && agents.length > 0 ? (
                <>
                  {agents.map((agentItem) => (
                    <label key={agentItem._id} className="agent-radio">
                      <input
                        type="radio"
                        name="agents"
                        value={agentItem._id}
                        checked={agent==agentItem._id}
                        onChange={(e) => setAgent(e.target.value)}
                      />
                      {agentItem.name}
                    </label>
                  ))}
                </>
              ) : (
                <p>No Agents found</p>
              )}
              <label htmlFor="addComment"></label>
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                type="text"
                id="addComment"
                placeholder="Leave a comment"
              />
              <button
                className="addComment-btn"
                onClick={handleCommentSubmit}
              >
                Submit Comment
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Lead Details</h2>
              <button
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <div>
              <div className="modal-form-group">
                <label>Lead Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              <div className="modal-form-group">
                <label>Lead Source:</label>
                <select
                  value={formData.source}
                  onChange={(e) => handleChange("source", e.target.value)}
                  id="source"
                >
                  <option value="">Select Source</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Email">Email</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="modal-form-group">
                <label>Sales Agent:</label>
                <select
                  value={formData.salesAgent}
                  onChange={(e) => handleChange("salesAgent", e.target.value)}
                  id="agents"
                >
                  <option value="">Select Agent</option>
                  {agents && agents.length > 0 ? (
                    agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No Agents Found</option>
                  )}
                </select>
              </div>

              <div className="modal-form-group">
                <label>Status:</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  id="status"
                >
                  <option value="">Select Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="modal-form-group">
                <label>Priority:</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="modal-form-group">
                <label>Time to Close (days):</label>
                <input
                  type="number"
                  value={formData.timeToClose}
                  onChange={(e) => handleChange("timeToClose", e.target.value)}
                />
              </div>

              <div className="modal-actions">
                <button
                  className="modal-cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button className="modal-save-btn" onClick={handleSubmit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default LeadDetails;
