# Anvaya CRM App
The Anvaya CRM app will focus on lead management with defined steps for each lead's lifecycle. We will assign sales agents to leads and allow users to add comments or updates to each lead.

---

## Demo Link

[Demo Link](https://major-project2-frontend.vercel.app/)

---

## Quick Start

```
git clone https://github.com/NagaaSaketh/MajorProject2_Frontend.git
cd MajorProject2_Frontend
npm install
npm run dev
```
---

## Technologies

- React JS
- React Router
- Chart.js
- Node.js
- Express
- MongoDB

---

## Demo Video

Watch a walkthrough (5–7 minutes) of all major features of this app: [Video Link](https://drive.google.com/file/d/151wR9od6eS8KMDhsIni6Sy1jH9pnOZN4/view?usp=sharing)

---

## Features

**Dashboard**
- Displays all leads.

- Shows lead statuses and the number of leads under each status.

- Includes navigation buttons to move between different pages in the app.

- Provides an "Add New Lead" button to create a new lead.

**Lead Details Page**
**(Accessed by clicking on a lead from the Dashboard)** 

- Displays detailed information about each lead.

- Includes an "Edit Lead" button to update lead details.

- Contains a Comments Section to view all comments related to the lead.

- Includes an "Add New Comment" field for agents to add comments.

**View Leads Filters Page**

- Displays a list of leads.

- Allows filtering leads by Status, Source, and Agent using query parameters.

- Includes a Filters Section

**Leads Page**

- Shows a complete overview of all leads.

- Includes a Filters Section for lead categorization and search.

**Sales Agents Page**

- Displays a list of all sales agents.

- Provides an "Add New Agent" button to add a new sales agent.

**Reports Page** 

- Displays lead insights through data visualizations such as Pie Charts and Bar Charts.

**Settings Page**

- Displays all leads and agents.

- Provides options to delete leads or agents.

## API Reference

### **GET /api/agents**
Display all the agents

Sample Response :
```
[{_id,name,email}]
```
### **GET /api/leads**
Display all the leads

Sample Response :
```
[{_id,name,source,salesAgent,status, ...}]
```
### **GET /api/lead/:id**
Display lead details for one lead

Sample Response :
```
{_id,name,source,salesAgent,status, ...}
```
### **GET /api/leads/:id/comments**
Display all the comments for one lead 

Sample Response :
```
[{_id,commentText,author}]
```
### **GET /api/report/last-week**
Display all the leads with status "Closed"

Sample Response :
```
[{id,name,salesAgent}]
```
### **GET /api/report/pipeline**
Display the number of leads that are in pipeline 

Sample Response :
```
{"totalLeadsInPipeline":7}
```
### **GET /api/report/closed-by-agent**
Display the agents & the no.of leads they closed. 

Sample Response :
```
[{agentName,count}]
```
### **GET /api/tags**
Display all the tags

Sample Response :
```
[{_id,name}]
```
### **POST /api/agents**
Create a new agent

Sample Response :
```
{_id,name,email}
```
### **POST /api/leads**
Create a new lead

Sample Response :
```
{_id,name,source,salesAgent,status, ...}
```
### **POST /api/tags**
Create a new tag

Sample Response :
```
{_id,name}
```
### **POST /api/leads/:id/comments** 
Create a new comment

Sample Response :
```
{_id,commentText,author}
```
### **PUT /api/leads/:id**
Update any lead details

Sample Response :
```
{_id,name,source,salesAgent,status, ...}
```
### **DELETE /api/agents/:id**
Delete any agent by their id

Sample Response :
```
{_id,name,email}
```
### **DELETE /api/leads/:id**
Delete any lead by their id

Sample Response :
```
{_id,name,source,salesAgent,status, ...}
```
---
## Contact

For bugs or feature requests, please reach out to vadlamanisaketh25@gmail.com

