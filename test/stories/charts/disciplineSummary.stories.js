import React from "react";
import Im from "traec/immutable";
import { DisciplineSummary } from "AppSrc/charts/disciplineSummary";
import { Container } from "../decorators";

export default {
  title: "Discipline Summary",
  decorators: [storyFn => Container(storyFn)]
};

const data = Im.fromJS([
  {
    name: "Acoustic Consultant",
    "Nothing Received": 40,
    Overdue: 24,
    "Pending Review": 24,
    "Requires Revision": 20,
    "OK for Submission": 20
  },
  {
    name: "Air Quality Consultant",
    "Nothing Received": 32,
    Overdue: 27,
    "Pending Review": 21,
    "Requires Revision": 20,
    "OK for Submission": 10
  },
  {
    name: "Architect",
    "Nothing Received": 42,
    Overdue: 12,
    "Pending Review": 24,
    "Requires Revision": 20,
    "OK for Submission": 20
  },
  {
    name: "BMS Consultant",
    "Nothing Received": 40,
    Overdue: 24,
    "Pending Review": 24,
    "Requires Revision": 20,
    "OK for Submission": 20
  },
  {
    name: "BMS Contractor",
    "Nothing Received": 40,
    Overdue: 24,
    "Pending Review": 24,
    "Requires Revision": 20,
    "OK for Submission": 20
  },
  {
    name: "Building Owner",
    "Nothing Received": 40,
    Overdue: 45,
    "Pending Review": 35,
    "Requires Revision": 20,
    "OK for Submission": 20
  },
  {
    name: "Civil Consultant",
    "Nothing Received": 12,
    Overdue: 43,
    "Pending Review": 25,
    "Requires Revision": 20,
    "OK for Submission": 20
  }
]);

export const withTitle = () => {
  return <DisciplineSummary data={data} />;
};
