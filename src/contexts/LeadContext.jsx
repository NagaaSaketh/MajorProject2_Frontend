import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const LeadContext = createContext();

const useLeadContext = () => useContext(LeadContext);

export const LeadProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [agent, setAgent] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [tags, setTags] = useState([]);
  const [leads, setLeads] = useState([]);

  const fetchAllLeads = async () => {
    try {
      const response = await fetch("https://major-project2-backend-seven.vercel.app/leads");

      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchAllLeads()
      .then((leads) => {
        setLeads(leads);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  let newStatusCount =
    leads?.filter((lead) => lead.status === "New").length || 0;
  let contactStatusCount =
    leads?.filter((lead) => lead.status === "Contacted").length || 0;
  let qualifiedStatusCount =
    leads?.filter((lead) => lead.status === "Qualified").length || 0;
  let proposalSentStatusCount =
    leads?.filter((lead) => lead.status === "Proposal Sent").length || 0;
  let closedStatusCount =
    leads?.filter((lead) => lead.status === "Closed").length || 0;

  const createLead = async (e) => {
    e.preventDefault();
    try {
      const leadData = {
        name: name,
        source: source,
        salesAgent: agent,
        status: status,
        tags: tags,
        timeToClose: closeTime,
        priority: priority,
      };
      console.log(leadData);

      const response = await fetch("https://major-project2-backend-seven.vercel.app/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });
      if (!response.ok) {
        throw new Error("Failed to save lead info");
      }
      const data = await response.json();
      console.log("Added lead:", data);
      toast.success("Lead created successfully!");
      setLeads((prev) => [...prev, data]);

      setName("");
      setSource("");
      setAgent("");
      setStatus("");
      setPriority("");
      setCloseTime("");
      setTags([]);
    } catch (err) {
      console.log("Error creating lead:", err);
      toast.error(err.message || "Failed to save lead info");
    }
  };

  const editDetails = async (leadData) => {
    try {
      if (!leadData.name) {
        toast.error("Lead name is required");
        return;
      }
      if (!leadData.source) {
        toast.error("Lead source is required");
        return;
      }
      if (!leadData.salesAgent) {
        toast.error("Sales agent is required");
        return;
      }
      if (!leadData.status) {
        toast.error("Status is required");
        return;
      }
      if (!leadData.timeToClose && leadData.timeToClose !== 0) {
        toast.error("Time to close is required");
        return;
      }
      if (!leadData.priority) {
        toast.error("Priority is required");
        return;
      }
      const updatedLead = {
        name: leadData.name,
        source: leadData.source,
        salesAgent: leadData.salesAgent,
        status: leadData.status,
        tags: leadData.tags || [],
        timeToClose: Number(leadData.timeToClose),
        priority: leadData.priority,
      };
      console.log(updatedLead);

      const response = await fetch(
        `https://major-project2-backend-seven.vercel.app/leads/${leadData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedLead),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update lead details");
      }

      const data = await response.json();
      setLeads((prev) =>
        prev.map((lead) => (lead._id === leadData._id ? data : lead))
      );
      console.log("Updated Lead:", data);
      toast.success("Lead updated successfully");

      const updatedLeads = await fetchAllLeads();
      setLeads(updatedLeads);

      setName("");
      setSource("");
      setAgent("");
      setStatus("");
      setPriority("");
      setCloseTime("");
      setTags([]);
    } catch (err) {
      console.log("Error updating lead:", err);
      toast.error(err.message || "Failed to update lead");
    }
  };

  const getDetails = async (leadId) => {
    try {
      const response = await fetch(`https://major-project2-backend-seven.vercel.app/lead/${leadId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch lead details");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const deleteLead = async (leadId) => {
    try {
      const response = await fetch(`https://major-project2-backend-seven.vercel.app/leads/${leadId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLeads((prevLead) => prevLead.filter((lead) => lead._id !== leadId));
      toast.success("Lead deleted successfully!");
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <LeadContext.Provider
      value={{
        createLead,
        name,
        setName,
        source,
        setSource,
        agent,
        setAgent,
        status,
        setStatus,
        priority,
        setPriority,
        closeTime,
        setCloseTime,
        tags,
        setTags,
        editDetails,
        leads,
        newStatusCount,
        contactStatusCount,
        qualifiedStatusCount,
        proposalSentStatusCount,
        closedStatusCount,
        deleteLead,
        getDetails,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export default useLeadContext;
