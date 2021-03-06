import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Moment from "moment";

export const EmailBarChart = props => {
  if (!props.emails || !props.emails.size) {
    return null;
  }
  let emails = [];
  let { emailType } = props;
  if (emailType === "company") {
    emails = formatCompanyEmails(props.emails);
  } else if (emailType === "compute") {
    emails = formatComputeEmails(props.emails);
  } else {
    emails = formatProjectEmails(props.emails);
  }

  return (
    <div>
      <h2>{props.title}</h2>

      <p>{props.text}</p>
      <div style={{ width: "100%", height: 600 }}>
        <ResponsiveContainer>
          <BarChart
            data={emails}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 20
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {<Bar dataKey={`${emailType === "company" ? "Company" : "Project"} Invite`} fill="#D9A691" />}
            {emailType === "project" ? <Bar dataKey="Report Approved" fill="#D9CF9C" /> : null}
            {emailType === "project" ? <Bar dataKey="Report Near Due" fill="#D971CB" /> : null}
            {emailType === "project" ? <Bar dataKey="Report Over Due" fill="#71D9CA" /> : null}
            {emailType === "project" ? <Bar dataKey="Report Submitted" fill="#2081C5" /> : null}
            {emailType === "project" ? <Bar dataKey="Report Rejected" fill="#DB4D52" /> : null}
            {emailType === "compute" ? <Bar dataKey="Parent Task Completed" fill="#2081C5" /> : null}
            {emailType === "compute" ? <Bar dataKey="Task Completed" fill="#DB4D52" /> : null}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const formatProjectEmails = emails => {
  return emails
    .map(item => {
      return {
        name: Moment(item.get("min_date")).format("MMM YYYY"),
        "Project Invite": item.getInPath("email_types.project_invite") || 0,
        "Report Approved": item.getInPath("email_types.project_ref_approved") || 0,
        "Report Near Due": item.getInPath("email_types.project_ref_near_due") || 0,
        "Report Over Due": item.getInPath("email_types.project_ref_overdue") || 0,
        "Report Rejected": item.getInPath("email_types.project_ref_rejected") || 0,
        "Report Submitted": item.getInPath("email_types.project_ref_submitted") || 0
      };
    })
    .toJS();
};

export const formatCompanyEmails = emails => {
  return emails
    .map(item => {
      return {
        name: Moment(item.get("min_date")).format("MMM YYYY"),
        "Company Invite": item.getInPath("email_types.company_invite") || 0
      };
    })
    .toJS();
};

export const formatComputeEmails = emails => {
  return emails
    .map(item => {
      return {
        name: Moment(item.get("min_date")).format("MMM YYYY"),
        "Company Invite": item.getInPath("email_types.company_invite") || 0,
        "Parent Task Completed": item.getInPath("email_types.parent_task_completed") || 0,
        "Task Completed": item.getInPath("email_types.task_completed") || 0
      };
    })
    .toJS();
};
