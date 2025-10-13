import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AgentContext = createContext();

const useAgentContext = () => useContext(AgentContext);

export const AgentProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agents, setAgents] = useState([]);

  const fetchAllAgents = async () => {
    try {
      const response = await fetch("http://localhost:3000/agents");
      if (!response.ok) {
        throw new Error("Failed to fetch agents");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  useEffect(() => {
    fetchAllAgents()
      .then((agents) => {
        setAgents(agents);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  const createAgent = async (e) => {
    e.preventDefault();
    try {
      const leadData = {
        name: name,
        email: email,
      };
      console.log(leadData);

      const response = await fetch("http://localhost:3000/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });

      if (response.status == 400) {
        toast.error("Please enter valid email address");
        return;
      }
      if (response.status == 409) {
        toast.error("Email already exists");
        return;
      }
      const data = await response.json();
      console.log("Added Agent:", data);
      toast.success("Agent created successfully!");

      setName("");
      setEmail("");
    } catch (err) {
      console.log("Error creating agent:", err);
      toast.error(err.message || "Failed to save agent info");
    }
  };

  const deleteAgent = async (agentId) => {
    try {
      const response = await fetch(`http://localhost:3000/agents/${agentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setAgents((prevAgents) =>
        prevAgents.filter((agent) => agent._id !== agentId)
      );
      toast.success("Agent deleted successfully");
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <AgentContext.Provider
      value={{
        createAgent,
        name,
        setName,
        email,
        setEmail,
        agents,
        deleteAgent,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export default useAgentContext;
