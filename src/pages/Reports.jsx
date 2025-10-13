import { Link } from "react-router-dom";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import useReportContext from "../contexts/ReportContext";
import useLeadContext from "../contexts/LeadContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const { closedByAgent, closedLeads, pipeline } = useReportContext();
  const {
    leads,
    newStatusCount,
    contactStatusCount,
    qualifiedStatusCount,
    proposalSentStatusCount,
    closedStatusCount,
  } = useLeadContext();
  const closedLeadsCount = closedLeads?.length || 0;
  const pipelineCount = pipeline?.totalLeadsInPipeline || 0;


  const doughnutData = {
    labels: ["Closed Leads", "Pipeline Leads"],
    datasets: [
      {
        label: "Leads Status",
        data: [closedLeadsCount, pipelineCount],
        backgroundColor: ["rgba(235, 19, 217, 1)", "rgba(248, 255, 40, 1)"],
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 3,
      },
    ],
  };

  const barData = {
    labels:
      closedByAgent && closedByAgent.length > 0
        ? closedByAgent.map((agent) => agent.agentName)
        : [],
    datasets: [
      {
        label: "Leads Closed By Agent",
        data:
          closedByAgent && closedByAgent.length > 0
            ? closedByAgent.map((agent) => agent.count)
            : [],
        backgroundColor: [
          // "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 75, 1)",
          // "rgba(255, 159, 64, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 99, 132, 1)",
        ],
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const barData2 = {
    labels: ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"],
    datasets: [
      {
        label: "Leads distribution by status",
        data: [
          newStatusCount,
          contactStatusCount,
          qualifiedStatusCount,
          proposalSentStatusCount,
          closedStatusCount,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 1)",
          // "rgba(75, 192, 75, 1)",
          // "rgba(255, 159, 64, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 99, 132, 1)",
        ],
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Leads Closed vs Total Leads in Pipeline",
      },
    },
  };

  const barOptionsforAgents = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Leads closed by each agent",
      },
    },
  };

  const barOptionsforLeadsByStatus = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Lead Distribution by Status",
      },
    },
  };

  return (
    <>
      <div className="app-header">
        <h1>Anvaya CRM Reports</h1>
      </div>
      <div className="content">
        <div className="sidebar">
          <Link className="dashboard" to="/">
            Back to Dashboard
          </Link>
        </div>
        <div className="reports-info">
          <h2>Report Overview</h2>
          <div className="report-1">
            <h3>Total Leads Closed vs In Pipeline</h3>
            <div className="pie-chart-container">
              <Pie data={doughnutData} options={chartOptions} />
            </div>
          </div>
          <div className="report-2">
            <h3>Leads Closed by Each Agent</h3>
            <div className="bar-chart-container">
              {closedByAgent && closedByAgent.length > 0 && (
                <Bar data={barData} options={barOptionsforAgents} />
              )}
            </div>
          </div>
          <div className="report-3">
            <h3>Lead Status Distribution</h3>
            <div className="bar-chart-container">
              {leads && leads.length > 0 && (
                <Bar data={barData2} options={barOptionsforLeadsByStatus} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
