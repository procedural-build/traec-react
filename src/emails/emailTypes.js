export const emailDefaultFrequencies = type => {
  if (type === "company") {
    return { company_invite: { value: 7, type: "number" } };
  } else if (type === "project") {
    return {
      project_invite: { value: 7, type: "number" },
      project_ref_near_due: { value: 7, type: "number" },
      project_ref_overdue: { value: 1, type: "number" },
      project_ref_submitted: { value: 3, type: "number" },
      project_ref_rejected: { value: 7, type: "number" },
      project_ref_approved: { value: 0, type: "checkbox" }
    };
  } else {
    return null;
  }
};

export const emailTypes = type => {
  if (type === "company") {
    return ["company_invite"];
  } else if (type === "project") {
    return [
      "project_invite",
      "project_ref_near_due",
      "project_ref_overdue",
      "project_ref_submitted",
      "project_ref_rejected",
      "project_ref_approved"
    ];
  }
};

export const emailTypeHeaders = type => {
  if (type === "company") {
    return ["Invite"];
  } else if (type === "project") {
    return ["Invite", "Near Due", "Overdue", "Submitted", "Rejected", "Approved"];
  }
};
