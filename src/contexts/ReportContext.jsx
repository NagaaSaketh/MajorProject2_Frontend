import { createContext, useContext, useEffect, useState } from "react";
import  useLeadContext  from "./LeadContext.jsx";
const ReportContext = createContext();

const useReportContext = () => useContext(ReportContext);

export const ReportProvider = ({ children }) => {
  const { leads } = useLeadContext();
  const [closedByAgent, setClosedByAgent] = useState([]);
  const [closedLeads, setClosedLeads] = useState([]);
  const [pipeline, setPipeline] = useState([]);

  const fetchClosedLeadsAndPipeLine = async () => {
    try {
      const response1 = await fetch("https://major-project2-backend-seven.vercel.app/report/last-week");
      const response2 = await fetch("https://major-project2-backend-seven.vercel.app/report/pipeline");
      if (!response1.ok) {
        throw new Error("Failed to fetch closed leads.");
      }
      if (!response2.ok) {
        throw new Error("Failed to fetch pipeline leads.");
      }
      const data1 = await response1.json();
      const data2 = await response2.json();
      setClosedLeads(data1);
      setPipeline(data2);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const fetchLeadsClosedByAgent = async () => {
    try {
      const response = await fetch(
        "https://major-project2-backend-seven.vercel.app/report/closed-by-agent"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch leads that are closed by agent");
      }
      const data = await response.json();
      setClosedByAgent(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchClosedLeadsAndPipeLine();
    fetchLeadsClosedByAgent();
  }, [leads]);
  return (
    <ReportContext.Provider value={{ closedByAgent, closedLeads, pipeline }}>
      {children}
    </ReportContext.Provider>
  );
};

export default useReportContext;
