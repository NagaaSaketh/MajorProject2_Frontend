import useAgentContext from "../contexts/AgentContext";
import { Link } from "react-router-dom";
import { ToastContainer,Slide } from "react-toastify";
const AddAgent = () => {
    const {createAgent,name,email,setName,setEmail} = useAgentContext();
  return (
    <>
    <div className="sidebar">
        <Link className="dashboard" to="/">
          Back to Dashboard
        </Link>
      </div>
      <div className="container">
        <h1>Add New Sales Agent</h1>
        <form onSubmit={createAgent}>
          <div className="form-group">
            <label htmlFor="name">Agent Name: </label>
            <input
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              value={name}
              placeholder="Enter agent name"
              required
            />
          </div>
           <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="text"
              value={email}
              placeholder="Enter email"
              required
            />
            <button type="submit">Create Agent</button>
          </div>
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

export default AddAgent;
