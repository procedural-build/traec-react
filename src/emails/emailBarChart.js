import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Moment from "moment";

export const EmailBarChart = props => {
  if (!props.emails || !props.emails.size) {
    return null;
  }
  let emails = [];
  let { company } = props;
  if (company) {
    emails = formatCompanyEmails(props.emails);
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
            {<Bar dataKey={`${company ? "Company" : "Project"} Invite`} fill="#D9A691" />}
            {company ? null : <Bar dataKey="Report Approved" fill="#D9CF9C" />}
            {company ? null : <Bar dataKey="Report Near Due" fill="#D971CB" />}
            {company ? null : <Bar dataKey="Report Over Due" fill="#71D9CA" />}
            {company ? null : <Bar dataKey="Report Submitted" fill="#2081C5" />}
            {company ? null : <Bar dataKey="Report Rejected" fill="#DB4D52" />}
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
