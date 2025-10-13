import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AddLead from "./pages/AddLead.jsx";
import { LeadProvider } from "./contexts/LeadContext.jsx";
import LeadDetails from "./pages/LeadDetails.jsx";
import SalesAgentManagement from "./pages/SalesAgentManagement.jsx";
import AddAgent from "./pages/AddAgent.jsx";
import { AgentProvider } from "./contexts/AgentContext.jsx";
import { TagsProvider } from "./contexts/TagsContext.jsx";
import LeadList from "./pages/LeadList.jsx";
import LeadViews from "./pages/LeadViews.jsx";
import { CommentProvider } from "./contexts/CommentContext.jsx";
import Reports from "./pages/Reports.jsx";
import { ReportProvider } from "./contexts/ReportContext.jsx";
import Settings from "./pages/Settings.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/addLead", element: <AddLead /> },
  { path: "/lead/:leadId", element: <LeadDetails /> },
  { path: "/agents", element: <SalesAgentManagement /> },
  { path: "/addAgent", element: <AddAgent /> },
  { path: "/leads", element: <LeadList /> },
  { path: "/leadby", element: <LeadViews /> },
  { path: "/reports", element: <Reports /> },
  { path: "/settings", element: <Settings /> },
]);

root.render(
  <StrictMode>
    <AgentProvider>
      <TagsProvider>
        <LeadProvider>
          <CommentProvider>
            <ReportProvider>
              <RouterProvider router={router} />
            </ReportProvider>
          </CommentProvider>
        </LeadProvider>
      </TagsProvider>
    </AgentProvider>
  </StrictMode>
);
