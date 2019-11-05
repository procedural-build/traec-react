import React from "react";
import Im from "traec/immutable";
import { DisciplineSummary } from "AppSrc/charts/disciplineSummary";

export default {
  title: "Discipline Summary"
};

const data = [
  {
    name: "Acoustic Consultant",
    "Nothing Received": 4000,
    Overdue: 2400,
    "Pending Review": 2400,
    "Requires Revision": 20,
    "OK for Submission": 20
  },
  {
    name: "Air Quality Consultant",
    "Nothing Received": 4000,
    Overdue: 2400,
    "Pending Review": 2400,
    "Requires Revision": 20,
    "OK for Submission": 20
  },
  {
    name: "Architect",
    "Nothing Received": 4000,
    Overdue: 2400,
    "Pending Review": 2400,
    "Requires Revision": 20,
    "OK for Submission": 20
  },
  {
    name: "BMS Consultant",
    "Nothing Received": 4000,
    Overdue: 2400,
    "Pending Review": 2400,
    "Requires Revision": 20,
    "OK for Submission": 20
  },
  {
    name: "BMS Contractor",
    "Nothing Received": 4000,
    Overdue: 2400,
    "Pending Review": 2400,
    "Requires Revision": 20,
    "OK for Submission": 20
  },
  {
    name: "Building Owner",
    "Nothing Received": 4000,
    Overdue: 2400,
    "Pending Review": 2400,
    "Requires Revision": 20,
    "OK for Submission": 20
  },
  {
    name: "Civil Consultant",
    "Nothing Received": 4000,
    Overdue: 2400,
    "Pending Review": 2400,
    "Requires Revision": 20,
    "OK for Submission": 20
  }
];

export const withTitle = () => {
  return <DisciplineSummary data={data} />;
};
