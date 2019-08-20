import { constructDataTree } from "../src/utils/constructDataTree";
//import {TestState} from "./testData/state";
import Im from "traec/immutable";

describe("Construct Data Tree", () => {
  it("Test Case A", () => {
    let allCommitIds = new Set();
    let trackerId = "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd";
    let rootMasterId = TestStateA.getInPath(`entities.trackers.byId.${trackerId}.root_master`);
    let rootCommitId = TestStateA.getInPath(`entities.refs.byId.${rootMasterId}.latest_commit.root_commit`);
    let data =
      rootCommitId && rootMasterId ? constructDataTree(TestStateA, rootMasterId, rootCommitId, allCommitIds) : null;

    expect(data.toJS()).toEqual(resultStateA);
  });

  it("Test Case B", () => {
    let allCommitIds = new Set();
    let trackerId = "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd";
    let rootMasterId = TestStateB.getInPath(`entities.trackers.byId.${trackerId}.root_master`);
    let rootCommitId = TestStateB.getInPath(`entities.refs.byId.${rootMasterId}.latest_commit.root_commit`);
    let data =
      rootCommitId && rootMasterId ? constructDataTree(TestStateB, rootMasterId, rootCommitId, allCommitIds) : null;

    expect(data.toJS()).toEqual(resultStateB);
  });

  it("Test Case C", () => {
    let allCommitIds = new Set();
    let trackerId = "67d0cbdd-796c-41b3-aed5-f3ce5837bec8";
    let rootMasterId = TestStateC.getInPath(`entities.trackers.byId.${trackerId}.root_master`);
    let rootCommitId = TestStateC.getInPath(`entities.refs.byId.${rootMasterId}.latest_commit.root_commit`);
    let data =
      rootCommitId && rootMasterId ? constructDataTree(TestStateC, rootMasterId, rootCommitId, allCommitIds) : null;

    expect(data.toJS()).toEqual(resultStateC);
  });
});

export const TestStateA = Im.fromJS({
  ui: {
    sidebar: {
      items: [
        {
          label: "Status",
          to: "/project/d6b0aec4-3f86-4a83-925f-0508035a5888/status/"
        },
        {
          label: "Tasks",
          to: "/project/d6b0aec4-3f86-4a83-925f-0508035a5888/tasks/"
        },
        {
          label: "Branches",
          to: "/project/d6b0aec4-3f86-4a83-925f-0508035a5888/branches/"
        },
        {
          label: "Details",
          to: "/project/d6b0aec4-3f86-4a83-925f-0508035a5888/details/"
        }
      ]
    },
    navbar: {
      items: [
        {
          label: "Project Menu",
          requiresAdmin: true,
          to: [
            {
              label: "Members",
              to: "/project/d6b0aec4-3f86-4a83-925f-0508035a5888/members/"
            },
            {
              label: "Email Settings",
              to: "/project/d6b0aec4-3f86-4a83-925f-0508035a5888/email/settings"
            },
            {
              label: "Email Statistics",
              to: "/project/d6b0aec4-3f86-4a83-925f-0508035a5888/email/report"
            }
          ]
        }
      ]
    },
    dashboards: {
      "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd": {
        selected: {
          "0": {
            treeId: "e126d0bc-f3d0-4a50-99a4-ad87d51be5bf",
            crefId: "cd6de6d2-85c4-4747-b06a-953cc53fc3d3",
            commitId: "c3a2a241-e674-461b-b64c-704813bea917"
          },
          "1": null
        }
      }
    }
  },
  entities: {
    refs: {
      byId: {
        "93056eb6-9b37-4b90-8fe2-f0cbe3a92a25": {
          uid: "93056eb6-9b37-4b90-8fe2-f0cbe3a92a25",
          name: "Sub Task 1.1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "test",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T08:57:40.622926",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T08:57:40.622926",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:37:58.677135",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "1d6d2ed8-069f-4c44-94e4-79596c175870",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "93056eb6-9b37-4b90-8fe2-f0cbe3a92a25",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "05df5404-749a-4d5d-9340-201647fb73a7",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "b1a228b9-82b6-46b7-89e1-bae38de00bc5": {
          uid: "b1a228b9-82b6-46b7-89e1-bae38de00bc5",
          name: "Sub Task 1.1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "test",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T08:57:40.622926",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T08:57:40.622926",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:37:58.489104",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "625a3691-c3c9-4f0c-8834-09a6be4e548d",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "b1a228b9-82b6-46b7-89e1-bae38de00bc5",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "4aea071a-1b51-4015-b910-44453a80e4d0",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "b6324b42-7d17-412d-a426-776877d6f3ac": {
          uid: "b6324b42-7d17-412d-a426-776877d6f3ac",
          name: "b1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "dadsasads",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T09:37:59.267801",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T09:37:59.267801",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "e126d0bc-f3d0-4a50-99a4-ad87d51be5bf",
              name: "b3222420455c1060a608a7056b6870da4145ef6f"
            },
            is_staging: true,
            created: "2019-06-26T09:38:14.035980",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "c5578e5a-e0ee-4740-869c-1b2ccba1fac9",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "b6324b42-7d17-412d-a426-776877d6f3ac",
            root_commit: "c740e91d-e355-4872-90a2-9d96d3acb321",
            previous: "c740e91d-e355-4872-90a2-9d96d3acb321",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 2,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "bbcdacde-16f7-489f-9dff-a16d0ea96a30": {
          uid: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "5aac99b5-87ea-449c-95f1-10f7e3bacda5",
              name: "9be1d66e5ec5d417c4b5f97fdc09396a0c7ee1bb"
            },
            is_staging: true,
            created: "2019-06-26T09:37:58.998699",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "515309e1-492a-47bf-9ebd-abe7a834156f",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
            root_commit: "33cd78f6-7e99-4da3-8adf-13a630635068",
            previous: "756aa8c3-8886-487b-92ab-a0651693cc9a",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "721d3a18-5476-487c-a7b5-404f6382b9ef": {
          uid: "721d3a18-5476-487c-a7b5-404f6382b9ef",
          name: "b2",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "dsfdsa",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T09:36:44.604728",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T09:36:44.604728",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "e5d6c3ec-79eb-46c0-9164-abf72341589b",
              name: "fff28dff2c3b7e5ae482e6f404e8c1e12fe0deda"
            },
            is_staging: true,
            created: "2019-06-26T09:37:22.357543",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "a5264f92-2df4-4d72-89b8-e3a7c82f1149",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "721d3a18-5476-487c-a7b5-404f6382b9ef",
            root_commit: "92b1147c-118d-4f65-bcc9-d11341c7991a",
            previous: "92b1147c-118d-4f65-bcc9-d11341c7991a",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 2,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "54309fe5-7c98-4036-8b77-a180c85f8b6d": {
          uid: "54309fe5-7c98-4036-8b77-a180c85f8b6d",
          name: "Sub Task 1.1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "test",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T08:57:40.622926",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T08:57:40.622926",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:37:58.845925",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "9ea2d869-4fff-4f9e-9f00-93a5b493c03f",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "54309fe5-7c98-4036-8b77-a180c85f8b6d",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "23a7f243-f652-485a-bac1-db73d8c3d345",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "505b70ec-fc51-40c6-9f97-a8aad3606f6f": {
          uid: "505b70ec-fc51-40c6-9f97-a8aad3606f6f",
          name: "branch1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "nbcvnbvcnbvc",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T09:20:28.097717",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T09:20:28.097717",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "5aac99b5-87ea-449c-95f1-10f7e3bacda5",
              name: "9be1d66e5ec5d417c4b5f97fdc09396a0c7ee1bb"
            },
            is_staging: true,
            created: "2019-06-26T09:38:15.211330",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "21b554e7-1390-4617-818d-cc0e7a1f8fe1",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "505b70ec-fc51-40c6-9f97-a8aad3606f6f",
            root_commit: "33cd78f6-7e99-4da3-8adf-13a630635068",
            previous: "6373e673-85ff-42a9-a5f8-8b31d8d143c1",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "a83c5981-2b63-41d1-913f-a9c6d4f60ec7": {
          uid: "a83c5981-2b63-41d1-913f-a9c6d4f60ec7",
          name: "b2",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "dsfdsa",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T09:36:44.604728",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T09:36:44.604728",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "e5d6c3ec-79eb-46c0-9164-abf72341589b",
              name: "fff28dff2c3b7e5ae482e6f404e8c1e12fe0deda"
            },
            is_staging: true,
            created: "2019-06-26T09:37:01.193954",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "a0dcaafa-1280-4013-9d5f-ac5b27978cb2",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "a83c5981-2b63-41d1-913f-a9c6d4f60ec7",
            root_commit: "92b1147c-118d-4f65-bcc9-d11341c7991a",
            previous: "92b1147c-118d-4f65-bcc9-d11341c7991a",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 2,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "0f402c9c-c310-4469-bd19-690067c3e7d2": {
          uid: "0f402c9c-c310-4469-bd19-690067c3e7d2",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "83a1d08e-aadc-4cf0-8661-337b09010515",
              name: "root"
            },
            is_staging: true,
            created: "2019-06-24T11:35:17.790695",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "0f402c9c-c310-4469-bd19-690067c3e7d2",
            root_commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
            previous: null,
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 1,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "440840b0-8466-4f74-9104-41397cef2f65": {
          uid: "440840b0-8466-4f74-9104-41397cef2f65",
          name: "master",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "5aac99b5-87ea-449c-95f1-10f7e3bacda5",
              name: "9be1d66e5ec5d417c4b5f97fdc09396a0c7ee1bb"
            },
            is_staging: true,
            created: "2019-06-26T09:38:15.041576",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "39e1e0bf-e066-4591-9141-1290a78695a2",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "440840b0-8466-4f74-9104-41397cef2f65",
            root_commit: "33cd78f6-7e99-4da3-8adf-13a630635068",
            previous: "756aa8c3-8886-487b-92ab-a0651693cc9a",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "20a234fa-ae3e-41a8-a783-3b617f5afff5": {
          uid: "20a234fa-ae3e-41a8-a783-3b617f5afff5",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "e5d6c3ec-79eb-46c0-9164-abf72341589b",
              name: "fff28dff2c3b7e5ae482e6f404e8c1e12fe0deda"
            },
            is_staging: true,
            created: "2019-06-26T09:36:44.447875",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "827d0559-0998-4334-8d5c-13a1a778282e",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "20a234fa-ae3e-41a8-a783-3b617f5afff5",
            root_commit: "92b1147c-118d-4f65-bcc9-d11341c7991a",
            previous: "92b1147c-118d-4f65-bcc9-d11341c7991a",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 2,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "124a9490-e9ea-47cd-816f-4bb353172bd5": {
          uid: "124a9490-e9ea-47cd-816f-4bb353172bd5",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "dbb27f61-22ea-41aa-9385-ac13eff07610",
              name: "root"
            },
            is_staging: true,
            created: "2019-06-27T13:11:20.386110",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "d64405ba-eec2-4f7f-b319-d46fbc959970",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "124a9490-e9ea-47cd-816f-4bb353172bd5",
            root_commit: "d64405ba-eec2-4f7f-b319-d46fbc959970",
            previous: null,
            tracker: "63135d68-faa5-4cc1-91e8-ab8e3b2d8775",
            due_date: null,
            project: "73e1c9ea-f11b-4e43-9541-6696522f256a",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "63135d68-faa5-4cc1-91e8-ab8e3b2d8775",
          depth: 1,
          project: "73e1c9ea-f11b-4e43-9541-6696522f256a"
        },
        "ad162378-abe4-43db-8943-7e3a97088076": {
          uid: "ad162378-abe4-43db-8943-7e3a97088076",
          name: "Sub Task 1.1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "test",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T08:57:40.622926",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T08:57:40.622926",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:38:14.870889",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "61015619-9b33-4f93-93b1-42bd0f3d8ee7",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "ad162378-abe4-43db-8943-7e3a97088076",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "23a7f243-f652-485a-bac1-db73d8c3d345",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "e75281f4-b4a4-4639-b7eb-f7aed6245776": {
          uid: "e75281f4-b4a4-4639-b7eb-f7aed6245776",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "bdf8d0e6-a1de-4185-afe7-e60086f769a7",
              name: "aa1d3053127a99acb8125efdbee4709265ac5674"
            },
            is_staging: true,
            created: "2019-06-27T12:16:32.005854",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "2b3079ea-0239-464c-990f-75c154009056",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "e75281f4-b4a4-4639-b7eb-f7aed6245776",
            root_commit: "2b3079ea-0239-464c-990f-75c154009056",
            previous: null,
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 2,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "984140b3-be59-46db-a033-831de5c299a4": {
          uid: "984140b3-be59-46db-a033-831de5c299a4",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:37:58.320733",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "06b51bfb-2952-4429-9d70-2c565706a30e",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "984140b3-be59-46db-a033-831de5c299a4",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "14596aa8-56f5-40bb-bdd2-f10d7e2b3f8f",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "4728fcf9-cbf3-46ab-873f-0f3a2fddd34f": {
          uid: "4728fcf9-cbf3-46ab-873f-0f3a2fddd34f",
          name: "Sub Task 1.1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "test",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T08:57:40.622926",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T08:57:40.622926",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:38:14.727249",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "2f1d9342-c738-44b3-91b5-8d30ba089940",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "4728fcf9-cbf3-46ab-873f-0f3a2fddd34f",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "05df5404-749a-4d5d-9340-201647fb73a7",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "70c89a45-4068-40e1-a9ea-96d846f084a4": {
          uid: "70c89a45-4068-40e1-a9ea-96d846f084a4",
          name: "Sub Task 1.1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "test",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T08:57:40.622926",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T08:57:40.622926",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:38:14.568181",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "b96d3466-51c4-4d3c-acc5-79e3bc93e0de",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "70c89a45-4068-40e1-a9ea-96d846f084a4",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "4aea071a-1b51-4015-b910-44453a80e4d0",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "c6e54bbd-05b2-4e2d-878c-c9f743464b7e": {
          uid: "c6e54bbd-05b2-4e2d-878c-c9f743464b7e",
          name: "branch1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "nbcvnbvcnbvc",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T09:20:28.097717",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T09:20:28.097717",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "5aac99b5-87ea-449c-95f1-10f7e3bacda5",
              name: "9be1d66e5ec5d417c4b5f97fdc09396a0c7ee1bb"
            },
            is_staging: true,
            created: "2019-06-26T09:37:59.143281",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "1f8fc86f-f9a9-4cb9-8ff9-ef5a1f605360",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "c6e54bbd-05b2-4e2d-878c-c9f743464b7e",
            root_commit: "33cd78f6-7e99-4da3-8adf-13a630635068",
            previous: "6373e673-85ff-42a9-a5f8-8b31d8d143c1",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "cd6de6d2-85c4-4747-b06a-953cc53fc3d3": {
          uid: "cd6de6d2-85c4-4747-b06a-953cc53fc3d3",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "e126d0bc-f3d0-4a50-99a4-ad87d51be5bf",
              name: "b3222420455c1060a608a7056b6870da4145ef6f"
            },
            is_staging: true,
            created: "2019-06-26T09:37:58.049561",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "c3a2a241-e674-461b-b64c-704813bea917",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "cd6de6d2-85c4-4747-b06a-953cc53fc3d3",
            root_commit: "c740e91d-e355-4872-90a2-9d96d3acb321",
            previous: "c740e91d-e355-4872-90a2-9d96d3acb321",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 2,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "50b5f2b3-b426-426a-8fcc-8721cb1721e1": {
          uid: "50b5f2b3-b426-426a-8fcc-8721cb1721e1",
          name: "master",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:38:14.403223",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "d63ba008-7499-422c-9737-f0d65263007e",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "50b5f2b3-b426-426a-8fcc-8721cb1721e1",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "14596aa8-56f5-40bb-bdd2-f10d7e2b3f8f",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        }
      }
    },
    commitBranches: {
      commit: {
        "0e1c4838-1ce4-4830-9842-b45a7a1898f5": {
          branch: {
            "c740e91d-e355-4872-90a2-9d96d3acb321": {
              byId: {
                "3b8ab701-4bbb-444d-8b96-8e6fe7ae4793": {
                  uid: "3b8ab701-4bbb-444d-8b96-8e6fe7ae4793",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "cd6de6d2-85c4-4747-b06a-953cc53fc3d3",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "c740e91d-e355-4872-90a2-9d96d3acb321"
                },
                "9289e0db-7dc7-4bac-b486-3e9a296d9c77": {
                  uid: "9289e0db-7dc7-4bac-b486-3e9a296d9c77",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "b6324b42-7d17-412d-a426-776877d6f3ac",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "c740e91d-e355-4872-90a2-9d96d3acb321"
                }
              }
            },
            "92b1147c-118d-4f65-bcc9-d11341c7991a": {
              byId: {
                "926f297a-20c6-42e8-a725-6a0dbc8f7db8": {
                  uid: "926f297a-20c6-42e8-a725-6a0dbc8f7db8",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "20a234fa-ae3e-41a8-a783-3b617f5afff5",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "92b1147c-118d-4f65-bcc9-d11341c7991a"
                },
                "74cb95c0-83b2-41fd-bd7b-fa89bc11af19": {
                  uid: "74cb95c0-83b2-41fd-bd7b-fa89bc11af19",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "721d3a18-5476-487c-a7b5-404f6382b9ef",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "92b1147c-118d-4f65-bcc9-d11341c7991a"
                },
                "aaa499a3-1e40-4608-b900-77e5bbf3e9a3": {
                  uid: "aaa499a3-1e40-4608-b900-77e5bbf3e9a3",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "a83c5981-2b63-41d1-913f-a9c6d4f60ec7",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "92b1147c-118d-4f65-bcc9-d11341c7991a"
                }
              }
            },
            "2b3079ea-0239-464c-990f-75c154009056": {
              byId: {
                "f69ac98e-65a6-471c-953e-e2b5b5f9d105": {
                  uid: "f69ac98e-65a6-471c-953e-e2b5b5f9d105",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "e75281f4-b4a4-4639-b7eb-f7aed6245776",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "2b3079ea-0239-464c-990f-75c154009056"
                }
              }
            }
          }
        },
        "c3a2a241-e674-461b-b64c-704813bea917": {
          branch: {
            "33cd78f6-7e99-4da3-8adf-13a630635068": {
              byId: {
                "936e1bf2-fc48-4785-b060-b2fc6ad82656": {
                  uid: "936e1bf2-fc48-4785-b060-b2fc6ad82656",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "c6e54bbd-05b2-4e2d-878c-c9f743464b7e",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "33cd78f6-7e99-4da3-8adf-13a630635068"
                },
                "9a3a10ed-05ef-49df-bdde-8a946082272c": {
                  uid: "9a3a10ed-05ef-49df-bdde-8a946082272c",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "33cd78f6-7e99-4da3-8adf-13a630635068"
                }
              }
            },
            "ad0be76f-62ab-4eac-b428-b46a246ae84e": {
              byId: {
                "b0997c61-e6f5-4f02-95c4-f872b87b9e91": {
                  uid: "b0997c61-e6f5-4f02-95c4-f872b87b9e91",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "54309fe5-7c98-4036-8b77-a180c85f8b6d",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "ab10e4d3-25aa-4dc3-aa15-34458109b7bc": {
                  uid: "ab10e4d3-25aa-4dc3-aa15-34458109b7bc",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "93056eb6-9b37-4b90-8fe2-f0cbe3a92a25",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "821eb60b-c3a8-47b7-a529-a23c500e2f00": {
                  uid: "821eb60b-c3a8-47b7-a529-a23c500e2f00",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "b1a228b9-82b6-46b7-89e1-bae38de00bc5",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "51af3a81-32b9-4c34-a342-fbc0e5f83c02": {
                  uid: "51af3a81-32b9-4c34-a342-fbc0e5f83c02",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "984140b3-be59-46db-a033-831de5c299a4",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                }
              }
            }
          }
        },
        "c5578e5a-e0ee-4740-869c-1b2ccba1fac9": {
          branch: {
            "33cd78f6-7e99-4da3-8adf-13a630635068": {
              byId: {
                "87b2da3b-e7ff-406c-a55f-780aa9621268": {
                  uid: "87b2da3b-e7ff-406c-a55f-780aa9621268",
                  commit: "c5578e5a-e0ee-4740-869c-1b2ccba1fac9",
                  target: {
                    ref: "505b70ec-fc51-40c6-9f97-a8aad3606f6f",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "33cd78f6-7e99-4da3-8adf-13a630635068"
                },
                "0d0e1930-97c1-4a5d-8ecd-efe67d922575": {
                  uid: "0d0e1930-97c1-4a5d-8ecd-efe67d922575",
                  commit: "c5578e5a-e0ee-4740-869c-1b2ccba1fac9",
                  target: {
                    ref: "440840b0-8466-4f74-9104-41397cef2f65",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "33cd78f6-7e99-4da3-8adf-13a630635068"
                }
              }
            },
            "ad0be76f-62ab-4eac-b428-b46a246ae84e": {
              byId: {
                "a15fe6a8-9b0e-4721-9b29-51528f4fac6c": {
                  uid: "a15fe6a8-9b0e-4721-9b29-51528f4fac6c",
                  commit: "c5578e5a-e0ee-4740-869c-1b2ccba1fac9",
                  target: {
                    ref: "ad162378-abe4-43db-8943-7e3a97088076",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "ff981311-67b3-4270-a3ff-d0e018c419da": {
                  uid: "ff981311-67b3-4270-a3ff-d0e018c419da",
                  commit: "c5578e5a-e0ee-4740-869c-1b2ccba1fac9",
                  target: {
                    ref: "4728fcf9-cbf3-46ab-873f-0f3a2fddd34f",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "15060104-12b7-4840-8eeb-8b83f616029a": {
                  uid: "15060104-12b7-4840-8eeb-8b83f616029a",
                  commit: "c5578e5a-e0ee-4740-869c-1b2ccba1fac9",
                  target: {
                    ref: "70c89a45-4068-40e1-a9ea-96d846f084a4",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "717303d6-ca40-4819-8c9e-b805f62bbb0d": {
                  uid: "717303d6-ca40-4819-8c9e-b805f62bbb0d",
                  commit: "c5578e5a-e0ee-4740-869c-1b2ccba1fac9",
                  target: {
                    ref: "50b5f2b3-b426-426a-8fcc-8721cb1721e1",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                }
              }
            }
          }
        },
        "c740e91d-e355-4872-90a2-9d96d3acb321": {
          branch: {
            "ad0be76f-62ab-4eac-b428-b46a246ae84e": {
              byId: {
                "a0a83e72-07b3-44a4-ac05-03e03a6584e6": {
                  uid: "a0a83e72-07b3-44a4-ac05-03e03a6584e6",
                  commit: "c740e91d-e355-4872-90a2-9d96d3acb321",
                  target: {
                    ref: "984140b3-be59-46db-a033-831de5c299a4",
                    commit: "14596aa8-56f5-40bb-bdd2-f10d7e2b3f8f"
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                }
              }
            },
            "33cd78f6-7e99-4da3-8adf-13a630635068": {
              byId: {
                "fef002e3-8059-4aee-81e8-3bd6b5a74167": {
                  uid: "fef002e3-8059-4aee-81e8-3bd6b5a74167",
                  commit: "c740e91d-e355-4872-90a2-9d96d3acb321",
                  target: {
                    ref: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
                    commit: "756aa8c3-8886-487b-92ab-a0651693cc9a"
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "33cd78f6-7e99-4da3-8adf-13a630635068"
                }
              }
            }
          }
        }
      },
      root: {
        branch: {
          "0e1c4838-1ce4-4830-9842-b45a7a1898f5": {
            byId: {
              "8053fd27-7de0-4bbb-baf1-cbfd132551f9": {
                uid: "8053fd27-7de0-4bbb-baf1-cbfd132551f9",
                commit: null,
                target: {
                  ref: "0f402c9c-c310-4469-bd19-690067c3e7d2",
                  commit: null
                },
                heads: {
                  master: true,
                  user: true
                },
                branchId: "0e1c4838-1ce4-4830-9842-b45a7a1898f5"
              }
            }
          }
        }
      }
    },
    fetchFlags: {
      trackers: {
        "": true
      }
    },
    metricScores: {
      byId: {
        "311bc197-8bbf-48d8-b927-a7f0be2bfe88": {
          period: -1,
          from_date: null,
          parameters: {
            uid: "2f29eab3-d102-4a7f-ad9e-576b1c1b64df",
            params_json: {}
          },
          freq_unit: null,
          uid: "311bc197-8bbf-48d8-b927-a7f0be2bfe88",
          is_forecast: false,
          metric: "f0d5d23d-6486-4793-b2fa-ce7107c89fea",
          freq_num: 1,
          required: false
        }
      }
    },
    baseMetrics: {
      byId: {
        "f0d5d23d-6486-4793-b2fa-ce7107c89fea": {
          uid: "f0d5d23d-6486-4793-b2fa-ce7107c89fea",
          unit: "Number",
          category: null,
          parentmetric: null,
          name: "sfgsfgs",
          description: "",
          fuel: ""
        }
      }
    },
    trees: {
      byId: {
        "b53c3616-9864-4c03-968b-3e1ccf18f16e": {
          uid: "b53c3616-9864-4c03-968b-3e1ccf18f16e",
          name: "95e815d1541bf6f358cfffbe66ab3af0d0c09d09"
        },
        "83a1d08e-aadc-4cf0-8661-337b09010515": {
          uid: "83a1d08e-aadc-4cf0-8661-337b09010515",
          name: "root"
        },
        "e5d6c3ec-79eb-46c0-9164-abf72341589b": {
          uid: "e5d6c3ec-79eb-46c0-9164-abf72341589b",
          name: "fff28dff2c3b7e5ae482e6f404e8c1e12fe0deda"
        },
        "5be283c6-785a-428b-a714-7e3e3e58af29": {
          uid: "5be283c6-785a-428b-a714-7e3e3e58af29",
          name: "396e4428bfc78bcd76fad35afeb5a9bcf8c72741"
        },
        "9b6add43-9300-4b48-8c11-a1d94058788b": {
          uid: "9b6add43-9300-4b48-8c11-a1d94058788b",
          name: "16eb797ce52116b01e8070b00a88159a52e3f2e7"
        },
        "e126d0bc-f3d0-4a50-99a4-ad87d51be5bf": {
          uid: "e126d0bc-f3d0-4a50-99a4-ad87d51be5bf",
          name: "b3222420455c1060a608a7056b6870da4145ef6f"
        },
        "0a352255-b1a5-4615-99ba-31ee4b545fca": {
          uid: "0a352255-b1a5-4615-99ba-31ee4b545fca",
          name: "1216b3c8ab58c2ea0d3dbae18aa694fa2b63fe70"
        },
        "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13": {
          uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
          name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
        },
        "e91f3570-420d-4a24-8441-11cc90017b8d": {
          uid: "e91f3570-420d-4a24-8441-11cc90017b8d",
          name: "13e75bcf04fcaa454ac9bf1c113b63fdff5cfc6b"
        },
        "e095272e-4ecb-4d2c-bf6f-48ab29b2b54c": {
          uid: "e095272e-4ecb-4d2c-bf6f-48ab29b2b54c",
          name: "c5a39a3a7b3df7a7c25d3954cca5306e26c2073a"
        },
        "5aac99b5-87ea-449c-95f1-10f7e3bacda5": {
          uid: "5aac99b5-87ea-449c-95f1-10f7e3bacda5",
          name: "9be1d66e5ec5d417c4b5f97fdc09396a0c7ee1bb"
        },
        "bdf8d0e6-a1de-4185-afe7-e60086f769a7": {
          uid: "bdf8d0e6-a1de-4185-afe7-e60086f769a7",
          name: "aa1d3053127a99acb8125efdbee4709265ac5674"
        }
      }
    },
    descriptions: {
      byId: {
        "a4c43f97-0438-4f11-a689-298df5411559": {
          uid: "a4c43f97-0438-4f11-a689-298df5411559",
          title: "Task 2",
          text: "<p>ertyejdfj</p>",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-06-26T09:22:36.452405"
        },
        "2204a3d5-c793-47d1-9360-31d4dd8cfe21": {
          uid: "2204a3d5-c793-47d1-9360-31d4dd8cfe21",
          title: "Task 4",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-06-27T12:16:32.053361"
        },
        "d2554fce-ff4c-441d-bd91-fe2e57d4338f": {
          uid: "d2554fce-ff4c-441d-bd91-fe2e57d4338f",
          title: "Task 1",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-06-26T08:45:33.633470"
        },
        "32448b52-f9d2-4684-8002-b7948339a949": {
          uid: "32448b52-f9d2-4684-8002-b7948339a949",
          title: "Æ:,",
          text: "<p>,_.,:_,</p>",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-06-26T09:20:10.491710"
        },
        "e38fd638-3afa-4c5e-81e8-6326b638d050": {
          uid: "e38fd638-3afa-4c5e-81e8-6326b638d050",
          title: "Sub Task 1",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-06-26T08:56:58.651885"
        }
      }
    },
    projects: {
      byId: {
        "73e1c9ea-f11b-4e43-9541-6696522f256a": {
          meta_json: {},
          NLA: null,
          suburb: "",
          app_host: null,
          created: "2019-06-27T13:11:20.237477",
          name: "Test Project 2",
          client: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          closed: false,
          postcode: "",
          reporting: null,
          uid: "73e1c9ea-f11b-4e43-9541-6696522f256a",
          state: "",
          address: "",
          country: "",
          trackers: [
            {
              uid: "63135d68-faa5-4cc1-91e8-ab8e3b2d8775",
              name: "dgnb_tool"
            }
          ],
          company: {
            uid: "c8298601-e901-4c3b-b162-3eb6631ddc52",
            name: "Test Company",
            depth: 1
          },
          default_workflow: "445b864b-8e31-4452-9f21-9e84d0c24ef6",
          host_site: 1
        },
        "d6b0aec4-3f86-4a83-925f-0508035a5888": {
          meta_json: {},
          NLA: null,
          suburb: "",
          app_host: null,
          created: "2019-06-24T09:33:01.849626",
          name: "Test Project 1",
          client: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          closed: false,
          postcode: "",
          reporting: null,
          uid: "d6b0aec4-3f86-4a83-925f-0508035a5888",
          state: "",
          address: "",
          country: "",
          trackers: [
            {
              uid: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
              name: "DGNB"
            }
          ],
          company: {
            uid: "c8298601-e901-4c3b-b162-3eb6631ddc52",
            name: "Test Company",
            depth: 1
          },
          default_workflow: "d6daa30a-7f71-43c6-8c4e-156477c99a92",
          host_site: 1
        }
      }
    },
    trackers: {
      byId: {
        "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd": {
          created: "2019-06-24T11:35:17.757475",
          alt_root_masters: {},
          name: "DGNB",
          errors: null,
          from_template: null,
          is_template: false,
          uid: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          project: {
            uid: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            name: "Test Project 1"
          },
          is_public: false,
          root_master: "0f402c9c-c310-4469-bd19-690067c3e7d2"
        },
        "63135d68-faa5-4cc1-91e8-ab8e3b2d8775": {
          created: "2019-06-27T13:11:20.369365",
          alt_root_masters: {},
          name: "dgnb_tool",
          from_template: null,
          is_template: false,
          uid: "63135d68-faa5-4cc1-91e8-ab8e3b2d8775",
          project: {
            uid: "73e1c9ea-f11b-4e43-9541-6696522f256a",
            name: "Test Project 2"
          },
          is_public: false,
          root_master: "124a9490-e9ea-47cd-816f-4bb353172bd5"
        }
      }
    },
    projectObjects: {
      byId: {
        "d6b0aec4-3f86-4a83-925f-0508035a5888": {
          userPermission: {
            is_admin: true,
            actions: ["*"],
            project_disciplines: [
              {
                uid: "7954ec77-391e-451b-936d-f954f7a266e1",
                name: "Administrator",
                approver: null,
                auth: {
                  uid: "830b61be-40f1-48fb-8860-e9e5f67271fa",
                  is_admin: true,
                  name: "Admin",
                  policy_json: {}
                },
                project: {
                  uid: "d6b0aec4-3f86-4a83-925f-0508035a5888",
                  name: "Test Project 1"
                },
                base_uid: "c1c91f73-caec-43d2-afb4-84301f6f16f5"
              }
            ],
            errors: null,
            projectDisciplineIds: ["7954ec77-391e-451b-936d-f954f7a266e1"],
            baseDisciplineIds: ["c1c91f73-caec-43d2-afb4-84301f6f16f5"]
          }
        }
      }
    },
    commits: {
      byId: {
        "14596aa8-56f5-40bb-bdd2-f10d7e2b3f8f": {
          meta_json: {
            status: "pending_approval",
            actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
          },
          tree_root: {
            uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
            name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
          },
          is_staging: false,
          created: "2019-06-26T09:37:58.295064",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          uid: "14596aa8-56f5-40bb-bdd2-f10d7e2b3f8f",
          discipline: null,
          reporting_period: null,
          status: {
            uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
            name: "Pending Approval",
            color: "#D1B2D1"
          },
          ref: "984140b3-be59-46db-a033-831de5c299a4",
          root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
          previous: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          due_date: null,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
          forced_by: "c740e91d-e355-4872-90a2-9d96d3acb321",
          comment: "dadsasads"
        },
        "756aa8c3-8886-487b-92ab-a0651693cc9a": {
          meta_json: {
            status: "pending_approval",
            actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
          },
          tree_root: {
            uid: "5aac99b5-87ea-449c-95f1-10f7e3bacda5",
            name: "9be1d66e5ec5d417c4b5f97fdc09396a0c7ee1bb"
          },
          is_staging: false,
          created: "2019-06-26T09:37:58.983651",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          uid: "756aa8c3-8886-487b-92ab-a0651693cc9a",
          discipline: null,
          reporting_period: null,
          status: {
            uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
            name: "Pending Approval",
            color: "#D1B2D1"
          },
          ref: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
          root_commit: "33cd78f6-7e99-4da3-8adf-13a630635068",
          previous: "33cd78f6-7e99-4da3-8adf-13a630635068",
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          due_date: null,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
          forced_by: "c740e91d-e355-4872-90a2-9d96d3acb321",
          comment: "dadsasads"
        }
      }
    },
    commitEdges: {
      byId: {
        "0e1c4838-1ce4-4830-9842-b45a7a1898f5": {
          trees: {
            "83a1d08e-aadc-4cf0-8661-337b09010515": {
              categories: {
                "3b8ab701-4bbb-444d-8b96-8e6fe7ae4793": {
                  uid: "3b8ab701-4bbb-444d-8b96-8e6fe7ae4793",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "cd6de6d2-85c4-4747-b06a-953cc53fc3d3",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "c740e91d-e355-4872-90a2-9d96d3acb321"
                },
                "926f297a-20c6-42e8-a725-6a0dbc8f7db8": {
                  uid: "926f297a-20c6-42e8-a725-6a0dbc8f7db8",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "20a234fa-ae3e-41a8-a783-3b617f5afff5",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "92b1147c-118d-4f65-bcc9-d11341c7991a"
                },
                "f69ac98e-65a6-471c-953e-e2b5b5f9d105": {
                  uid: "f69ac98e-65a6-471c-953e-e2b5b5f9d105",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "e75281f4-b4a4-4639-b7eb-f7aed6245776",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "2b3079ea-0239-464c-990f-75c154009056"
                }
              }
            }
          }
        },
        "92b1147c-118d-4f65-bcc9-d11341c7991a": {
          trees: {
            "e5d6c3ec-79eb-46c0-9164-abf72341589b": {
              descriptions: ["a4c43f97-0438-4f11-a689-298df5411559"]
            }
          }
        },
        "2b3079ea-0239-464c-990f-75c154009056": {
          trees: {
            "bdf8d0e6-a1de-4185-afe7-e60086f769a7": {
              descriptions: ["2204a3d5-c793-47d1-9360-31d4dd8cfe21"]
            }
          }
        },
        "c740e91d-e355-4872-90a2-9d96d3acb321": {
          trees: {
            "e126d0bc-f3d0-4a50-99a4-ad87d51be5bf": {
              categories: {
                "a0a83e72-07b3-44a4-ac05-03e03a6584e6": {
                  uid: "a0a83e72-07b3-44a4-ac05-03e03a6584e6",
                  commit: "c740e91d-e355-4872-90a2-9d96d3acb321",
                  target: {
                    ref: "984140b3-be59-46db-a033-831de5c299a4",
                    commit: "14596aa8-56f5-40bb-bdd2-f10d7e2b3f8f"
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "fef002e3-8059-4aee-81e8-3bd6b5a74167": {
                  uid: "fef002e3-8059-4aee-81e8-3bd6b5a74167",
                  commit: "c740e91d-e355-4872-90a2-9d96d3acb321",
                  target: {
                    ref: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
                    commit: "756aa8c3-8886-487b-92ab-a0651693cc9a"
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "33cd78f6-7e99-4da3-8adf-13a630635068"
                }
              },
              descriptions: ["d2554fce-ff4c-441d-bd91-fe2e57d4338f"]
            }
          }
        },
        "827d0559-0998-4334-8d5c-13a1a778282e": {
          trees: {
            "e5d6c3ec-79eb-46c0-9164-abf72341589b": {
              descriptions: ["a4c43f97-0438-4f11-a689-298df5411559"]
            }
          }
        },
        "c3a2a241-e674-461b-b64c-704813bea917": {
          trees: {
            "e126d0bc-f3d0-4a50-99a4-ad87d51be5bf": {
              categories: {
                "51af3a81-32b9-4c34-a342-fbc0e5f83c02": {
                  uid: "51af3a81-32b9-4c34-a342-fbc0e5f83c02",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "984140b3-be59-46db-a033-831de5c299a4",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "9a3a10ed-05ef-49df-bdde-8a946082272c": {
                  uid: "9a3a10ed-05ef-49df-bdde-8a946082272c",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "33cd78f6-7e99-4da3-8adf-13a630635068"
                }
              },
              descriptions: ["d2554fce-ff4c-441d-bd91-fe2e57d4338f"]
            }
          }
        },
        "515309e1-492a-47bf-9ebd-abe7a834156f": {
          trees: {
            "5aac99b5-87ea-449c-95f1-10f7e3bacda5": {
              descriptions: ["32448b52-f9d2-4684-8002-b7948339a949"]
            }
          }
        },
        "06b51bfb-2952-4429-9d70-2c565706a30e": {
          trees: {
            "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13": {
              trees: [
                "5be283c6-785a-428b-a714-7e3e3e58af29",
                "9b6add43-9300-4b48-8c11-a1d94058788b",
                "0a352255-b1a5-4615-99ba-31ee4b545fca",
                "b53c3616-9864-4c03-968b-3e1ccf18f16e",
                "e91f3570-420d-4a24-8441-11cc90017b8d",
                "e095272e-4ecb-4d2c-bf6f-48ab29b2b54c"
              ],
              descriptions: ["e38fd638-3afa-4c5e-81e8-6326b638d050"]
            },
            "5be283c6-785a-428b-a714-7e3e3e58af29": {
              parent: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13"
            },
            "9b6add43-9300-4b48-8c11-a1d94058788b": {
              parent: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              metricScores: ["311bc197-8bbf-48d8-b927-a7f0be2bfe88"]
            },
            "0a352255-b1a5-4615-99ba-31ee4b545fca": {
              parent: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13"
            },
            "b53c3616-9864-4c03-968b-3e1ccf18f16e": {
              parent: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13"
            },
            "e91f3570-420d-4a24-8441-11cc90017b8d": {
              parent: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13"
            },
            "e095272e-4ecb-4d2c-bf6f-48ab29b2b54c": {
              parent: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13"
            }
          }
        }
      }
    }
  }
});

export const TestStateB = Im.fromJS({
  ui: {
    sidebar: {
      items: [
        {
          label: "Status",
          to: "/project/d6b0aec4-3f86-4a83-925f-0508035a5888/status/"
        },
        {
          label: "Tasks",
          to: "/project/d6b0aec4-3f86-4a83-925f-0508035a5888/tasks/"
        },
        {
          label: "Branches",
          to: "/project/d6b0aec4-3f86-4a83-925f-0508035a5888/branches/"
        },
        {
          label: "Details",
          to: "/project/d6b0aec4-3f86-4a83-925f-0508035a5888/details/"
        }
      ]
    },
    navbar: {
      items: [
        {
          label: "Project Menu",
          requiresAdmin: true,
          to: [
            {
              label: "Members",
              to: "/project/d6b0aec4-3f86-4a83-925f-0508035a5888/members/"
            },
            {
              label: "Email Settings",
              to: "/project/d6b0aec4-3f86-4a83-925f-0508035a5888/email/settings"
            },
            {
              label: "Email Statistics",
              to: "/project/d6b0aec4-3f86-4a83-925f-0508035a5888/email/report"
            }
          ]
        }
      ]
    },
    dashboards: {
      "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd": {
        selected: {
          "0": {
            treeId: "bdf8d0e6-a1de-4185-afe7-e60086f769a7",
            crefId: "e75281f4-b4a4-4639-b7eb-f7aed6245776",
            commitId: "2b3079ea-0239-464c-990f-75c154009056"
          },
          "1": {
            treeId: "c958a966-e00f-4d29-a4de-d480943f3aed",
            crefId: "d9451590-bb3c-4f2b-8f6c-e6ba4e52ad96",
            commitId: "9cc5ac69-7a95-41e8-90de-cd92e37892b1"
          }
        }
      }
    }
  },
  entities: {
    refs: {
      byId: {
        "93056eb6-9b37-4b90-8fe2-f0cbe3a92a25": {
          uid: "93056eb6-9b37-4b90-8fe2-f0cbe3a92a25",
          name: "Sub Task 1.1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "test",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T08:57:40.622926",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T08:57:40.622926",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:37:58.677135",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "1d6d2ed8-069f-4c44-94e4-79596c175870",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "93056eb6-9b37-4b90-8fe2-f0cbe3a92a25",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "05df5404-749a-4d5d-9340-201647fb73a7",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "b1a228b9-82b6-46b7-89e1-bae38de00bc5": {
          uid: "b1a228b9-82b6-46b7-89e1-bae38de00bc5",
          name: "Sub Task 1.1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "test",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T08:57:40.622926",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T08:57:40.622926",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:37:58.489104",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "625a3691-c3c9-4f0c-8834-09a6be4e548d",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "b1a228b9-82b6-46b7-89e1-bae38de00bc5",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "4aea071a-1b51-4015-b910-44453a80e4d0",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "269fb510-6f0c-436a-af0e-23f690393109": {
          uid: "269fb510-6f0c-436a-af0e-23f690393109",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "2b139274-050f-46a0-972f-9e24d0c0e8bd",
              name: "9cab073a5140ea40c6df8ae69b0b38bf75c67cfa"
            },
            is_staging: true,
            created: "2019-06-27T15:34:52.651418",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "e49ef1b5-50e7-464d-bcbf-9cbb99628f56",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "269fb510-6f0c-436a-af0e-23f690393109",
            root_commit: "e49ef1b5-50e7-464d-bcbf-9cbb99628f56",
            previous: null,
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "d9451590-bb3c-4f2b-8f6c-e6ba4e52ad96": {
          uid: "d9451590-bb3c-4f2b-8f6c-e6ba4e52ad96",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "c958a966-e00f-4d29-a4de-d480943f3aed",
              name: "764b814882da4af3852d1ffc507cb963de7af7af"
            },
            is_staging: true,
            created: "2019-06-27T15:35:17.493303",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "9cc5ac69-7a95-41e8-90de-cd92e37892b1",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "d9451590-bb3c-4f2b-8f6c-e6ba4e52ad96",
            root_commit: "9cc5ac69-7a95-41e8-90de-cd92e37892b1",
            previous: null,
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "b6324b42-7d17-412d-a426-776877d6f3ac": {
          uid: "b6324b42-7d17-412d-a426-776877d6f3ac",
          name: "b1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "dadsasads",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T09:37:59.267801",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T09:37:59.267801",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "e126d0bc-f3d0-4a50-99a4-ad87d51be5bf",
              name: "b3222420455c1060a608a7056b6870da4145ef6f"
            },
            is_staging: true,
            created: "2019-06-26T09:38:14.035980",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "c5578e5a-e0ee-4740-869c-1b2ccba1fac9",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "b6324b42-7d17-412d-a426-776877d6f3ac",
            root_commit: "c740e91d-e355-4872-90a2-9d96d3acb321",
            previous: "c740e91d-e355-4872-90a2-9d96d3acb321",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 2,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "bbcdacde-16f7-489f-9dff-a16d0ea96a30": {
          uid: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "5aac99b5-87ea-449c-95f1-10f7e3bacda5",
              name: "9be1d66e5ec5d417c4b5f97fdc09396a0c7ee1bb"
            },
            is_staging: true,
            created: "2019-06-26T09:37:58.998699",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "515309e1-492a-47bf-9ebd-abe7a834156f",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
            root_commit: "33cd78f6-7e99-4da3-8adf-13a630635068",
            previous: "756aa8c3-8886-487b-92ab-a0651693cc9a",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "721d3a18-5476-487c-a7b5-404f6382b9ef": {
          uid: "721d3a18-5476-487c-a7b5-404f6382b9ef",
          name: "b2",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "dsfdsa",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T09:36:44.604728",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T09:36:44.604728",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "e5d6c3ec-79eb-46c0-9164-abf72341589b",
              name: "fff28dff2c3b7e5ae482e6f404e8c1e12fe0deda"
            },
            is_staging: true,
            created: "2019-06-26T09:37:22.357543",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "a5264f92-2df4-4d72-89b8-e3a7c82f1149",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "721d3a18-5476-487c-a7b5-404f6382b9ef",
            root_commit: "92b1147c-118d-4f65-bcc9-d11341c7991a",
            previous: "92b1147c-118d-4f65-bcc9-d11341c7991a",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 2,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "54309fe5-7c98-4036-8b77-a180c85f8b6d": {
          uid: "54309fe5-7c98-4036-8b77-a180c85f8b6d",
          name: "Sub Task 1.1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "test",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T08:57:40.622926",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T08:57:40.622926",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:37:58.845925",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "9ea2d869-4fff-4f9e-9f00-93a5b493c03f",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "54309fe5-7c98-4036-8b77-a180c85f8b6d",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "23a7f243-f652-485a-bac1-db73d8c3d345",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "505b70ec-fc51-40c6-9f97-a8aad3606f6f": {
          uid: "505b70ec-fc51-40c6-9f97-a8aad3606f6f",
          name: "branch1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "nbcvnbvcnbvc",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T09:20:28.097717",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T09:20:28.097717",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "5aac99b5-87ea-449c-95f1-10f7e3bacda5",
              name: "9be1d66e5ec5d417c4b5f97fdc09396a0c7ee1bb"
            },
            is_staging: true,
            created: "2019-06-26T09:38:15.211330",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "21b554e7-1390-4617-818d-cc0e7a1f8fe1",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "505b70ec-fc51-40c6-9f97-a8aad3606f6f",
            root_commit: "33cd78f6-7e99-4da3-8adf-13a630635068",
            previous: "6373e673-85ff-42a9-a5f8-8b31d8d143c1",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "a83c5981-2b63-41d1-913f-a9c6d4f60ec7": {
          uid: "a83c5981-2b63-41d1-913f-a9c6d4f60ec7",
          name: "b2",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "dsfdsa",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T09:36:44.604728",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T09:36:44.604728",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "e5d6c3ec-79eb-46c0-9164-abf72341589b",
              name: "fff28dff2c3b7e5ae482e6f404e8c1e12fe0deda"
            },
            is_staging: true,
            created: "2019-06-26T09:37:01.193954",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "a0dcaafa-1280-4013-9d5f-ac5b27978cb2",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "a83c5981-2b63-41d1-913f-a9c6d4f60ec7",
            root_commit: "92b1147c-118d-4f65-bcc9-d11341c7991a",
            previous: "92b1147c-118d-4f65-bcc9-d11341c7991a",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 2,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "0f402c9c-c310-4469-bd19-690067c3e7d2": {
          uid: "0f402c9c-c310-4469-bd19-690067c3e7d2",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "83a1d08e-aadc-4cf0-8661-337b09010515",
              name: "root"
            },
            is_staging: true,
            created: "2019-06-24T11:35:17.790695",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "0f402c9c-c310-4469-bd19-690067c3e7d2",
            root_commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
            previous: null,
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 1,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "440840b0-8466-4f74-9104-41397cef2f65": {
          uid: "440840b0-8466-4f74-9104-41397cef2f65",
          name: "master",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "5aac99b5-87ea-449c-95f1-10f7e3bacda5",
              name: "9be1d66e5ec5d417c4b5f97fdc09396a0c7ee1bb"
            },
            is_staging: true,
            created: "2019-06-26T09:38:15.041576",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "39e1e0bf-e066-4591-9141-1290a78695a2",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "440840b0-8466-4f74-9104-41397cef2f65",
            root_commit: "33cd78f6-7e99-4da3-8adf-13a630635068",
            previous: "756aa8c3-8886-487b-92ab-a0651693cc9a",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "20a234fa-ae3e-41a8-a783-3b617f5afff5": {
          uid: "20a234fa-ae3e-41a8-a783-3b617f5afff5",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "e5d6c3ec-79eb-46c0-9164-abf72341589b",
              name: "fff28dff2c3b7e5ae482e6f404e8c1e12fe0deda"
            },
            is_staging: true,
            created: "2019-06-26T09:36:44.447875",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "827d0559-0998-4334-8d5c-13a1a778282e",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "20a234fa-ae3e-41a8-a783-3b617f5afff5",
            root_commit: "92b1147c-118d-4f65-bcc9-d11341c7991a",
            previous: "92b1147c-118d-4f65-bcc9-d11341c7991a",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 2,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "124a9490-e9ea-47cd-816f-4bb353172bd5": {
          uid: "124a9490-e9ea-47cd-816f-4bb353172bd5",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "dbb27f61-22ea-41aa-9385-ac13eff07610",
              name: "root"
            },
            is_staging: true,
            created: "2019-06-27T13:11:20.386110",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "d64405ba-eec2-4f7f-b319-d46fbc959970",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "124a9490-e9ea-47cd-816f-4bb353172bd5",
            root_commit: "d64405ba-eec2-4f7f-b319-d46fbc959970",
            previous: null,
            tracker: "63135d68-faa5-4cc1-91e8-ab8e3b2d8775",
            due_date: null,
            project: "73e1c9ea-f11b-4e43-9541-6696522f256a",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "63135d68-faa5-4cc1-91e8-ab8e3b2d8775",
          depth: 1,
          project: "73e1c9ea-f11b-4e43-9541-6696522f256a"
        },
        "ad162378-abe4-43db-8943-7e3a97088076": {
          uid: "ad162378-abe4-43db-8943-7e3a97088076",
          name: "Sub Task 1.1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "test",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T08:57:40.622926",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T08:57:40.622926",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:38:14.870889",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "61015619-9b33-4f93-93b1-42bd0f3d8ee7",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "ad162378-abe4-43db-8943-7e3a97088076",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "23a7f243-f652-485a-bac1-db73d8c3d345",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "e75281f4-b4a4-4639-b7eb-f7aed6245776": {
          uid: "e75281f4-b4a4-4639-b7eb-f7aed6245776",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "bdf8d0e6-a1de-4185-afe7-e60086f769a7",
              name: "aa1d3053127a99acb8125efdbee4709265ac5674"
            },
            is_staging: true,
            created: "2019-06-27T12:16:32.005854",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "2b3079ea-0239-464c-990f-75c154009056",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "e75281f4-b4a4-4639-b7eb-f7aed6245776",
            root_commit: "2b3079ea-0239-464c-990f-75c154009056",
            previous: null,
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 2,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "984140b3-be59-46db-a033-831de5c299a4": {
          uid: "984140b3-be59-46db-a033-831de5c299a4",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:37:58.320733",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "06b51bfb-2952-4429-9d70-2c565706a30e",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "984140b3-be59-46db-a033-831de5c299a4",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "14596aa8-56f5-40bb-bdd2-f10d7e2b3f8f",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "67081270-0d51-408c-b6a9-468a6e604c36": {
          uid: "67081270-0d51-408c-b6a9-468a6e604c36",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "dd7651ce-e2d9-4cf3-844f-cb560aeba32b",
              name: "56df95495014b02bbbb33d1b9e2d500e08a4bf31"
            },
            is_staging: true,
            created: "2019-06-27T15:35:08.253953",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "872dd4c6-9bad-4cea-8929-877d09b6730b",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "67081270-0d51-408c-b6a9-468a6e604c36",
            root_commit: "872dd4c6-9bad-4cea-8929-877d09b6730b",
            previous: null,
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "4728fcf9-cbf3-46ab-873f-0f3a2fddd34f": {
          uid: "4728fcf9-cbf3-46ab-873f-0f3a2fddd34f",
          name: "Sub Task 1.1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "test",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T08:57:40.622926",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T08:57:40.622926",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:38:14.727249",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "2f1d9342-c738-44b3-91b5-8d30ba089940",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "4728fcf9-cbf3-46ab-873f-0f3a2fddd34f",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "05df5404-749a-4d5d-9340-201647fb73a7",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "70c89a45-4068-40e1-a9ea-96d846f084a4": {
          uid: "70c89a45-4068-40e1-a9ea-96d846f084a4",
          name: "Sub Task 1.1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "test",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T08:57:40.622926",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T08:57:40.622926",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:38:14.568181",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "b96d3466-51c4-4d3c-acc5-79e3bc93e0de",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "70c89a45-4068-40e1-a9ea-96d846f084a4",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "4aea071a-1b51-4015-b910-44453a80e4d0",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "c6e54bbd-05b2-4e2d-878c-c9f743464b7e": {
          uid: "c6e54bbd-05b2-4e2d-878c-c9f743464b7e",
          name: "branch1",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              history: [
                {
                  status: {
                    uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
                    name: "Pending Approval",
                    color: "#D1B2D1"
                  },
                  comment: "nbcvnbvcnbvc",
                  updateBy: {
                    email: "admin@ods-track.com",
                    username: "admin",
                    last_name: "",
                    first_name: ""
                  },
                  updateOn: "2019-06-26T09:20:28.097717",
                  updateById: "4af06b93-fd82-4636-a467-f4d9073a85ef"
                }
              ],
              lastUpdateBy: {
                email: "admin@ods-track.com",
                username: "admin",
                last_name: "",
                first_name: ""
              },
              lastUpdateOn: "2019-06-26T09:20:28.097717",
              lastUpdateById: "4af06b93-fd82-4636-a467-f4d9073a85ef",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "5aac99b5-87ea-449c-95f1-10f7e3bacda5",
              name: "9be1d66e5ec5d417c4b5f97fdc09396a0c7ee1bb"
            },
            is_staging: true,
            created: "2019-06-26T09:37:59.143281",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "1f8fc86f-f9a9-4cb9-8ff9-ef5a1f605360",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "c6e54bbd-05b2-4e2d-878c-c9f743464b7e",
            root_commit: "33cd78f6-7e99-4da3-8adf-13a630635068",
            previous: "6373e673-85ff-42a9-a5f8-8b31d8d143c1",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "cd6de6d2-85c4-4747-b06a-953cc53fc3d3": {
          uid: "cd6de6d2-85c4-4747-b06a-953cc53fc3d3",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "e126d0bc-f3d0-4a50-99a4-ad87d51be5bf",
              name: "b3222420455c1060a608a7056b6870da4145ef6f"
            },
            is_staging: true,
            created: "2019-06-26T09:37:58.049561",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "c3a2a241-e674-461b-b64c-704813bea917",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "cd6de6d2-85c4-4747-b06a-953cc53fc3d3",
            root_commit: "c740e91d-e355-4872-90a2-9d96d3acb321",
            previous: "c740e91d-e355-4872-90a2-9d96d3acb321",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 2,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        },
        "50b5f2b3-b426-426a-8fcc-8721cb1721e1": {
          uid: "50b5f2b3-b426-426a-8fcc-8721cb1721e1",
          name: "master",
          latest_commit: {
            meta_json: {
              status: "pending_approval",
              actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
            },
            tree_root: {
              uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
            },
            is_staging: true,
            created: "2019-06-26T09:38:14.403223",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "d63ba008-7499-422c-9737-f0d65263007e",
            discipline: null,
            reporting_period: null,
            status: {
              uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
              name: "Pending Approval",
              color: "#D1B2D1"
            },
            ref: "50b5f2b3-b426-426a-8fcc-8721cb1721e1",
            root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
            previous: "14596aa8-56f5-40bb-bdd2-f10d7e2b3f8f",
            tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
            due_date: null,
            project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          depth: 3,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888"
        }
      }
    },
    commitBranches: {
      commit: {
        "0e1c4838-1ce4-4830-9842-b45a7a1898f5": {
          branch: {
            "c740e91d-e355-4872-90a2-9d96d3acb321": {
              byId: {
                "3b8ab701-4bbb-444d-8b96-8e6fe7ae4793": {
                  uid: "3b8ab701-4bbb-444d-8b96-8e6fe7ae4793",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "cd6de6d2-85c4-4747-b06a-953cc53fc3d3",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "c740e91d-e355-4872-90a2-9d96d3acb321"
                },
                "9289e0db-7dc7-4bac-b486-3e9a296d9c77": {
                  uid: "9289e0db-7dc7-4bac-b486-3e9a296d9c77",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "b6324b42-7d17-412d-a426-776877d6f3ac",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "c740e91d-e355-4872-90a2-9d96d3acb321"
                }
              }
            },
            "92b1147c-118d-4f65-bcc9-d11341c7991a": {
              byId: {
                "926f297a-20c6-42e8-a725-6a0dbc8f7db8": {
                  uid: "926f297a-20c6-42e8-a725-6a0dbc8f7db8",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "20a234fa-ae3e-41a8-a783-3b617f5afff5",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "92b1147c-118d-4f65-bcc9-d11341c7991a"
                },
                "74cb95c0-83b2-41fd-bd7b-fa89bc11af19": {
                  uid: "74cb95c0-83b2-41fd-bd7b-fa89bc11af19",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "721d3a18-5476-487c-a7b5-404f6382b9ef",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "92b1147c-118d-4f65-bcc9-d11341c7991a"
                },
                "aaa499a3-1e40-4608-b900-77e5bbf3e9a3": {
                  uid: "aaa499a3-1e40-4608-b900-77e5bbf3e9a3",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "a83c5981-2b63-41d1-913f-a9c6d4f60ec7",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "92b1147c-118d-4f65-bcc9-d11341c7991a"
                }
              }
            },
            "2b3079ea-0239-464c-990f-75c154009056": {
              byId: {
                "f69ac98e-65a6-471c-953e-e2b5b5f9d105": {
                  uid: "f69ac98e-65a6-471c-953e-e2b5b5f9d105",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "e75281f4-b4a4-4639-b7eb-f7aed6245776",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "2b3079ea-0239-464c-990f-75c154009056"
                }
              }
            }
          }
        },
        "827d0559-0998-4334-8d5c-13a1a778282e": {
          branch: {
            "e49ef1b5-50e7-464d-bcbf-9cbb99628f56": {
              byId: {
                "c6a2adc8-816e-4f07-a263-29f980cbbdd8": {
                  uid: "c6a2adc8-816e-4f07-a263-29f980cbbdd8",
                  commit: "827d0559-0998-4334-8d5c-13a1a778282e",
                  target: {
                    ref: "269fb510-6f0c-436a-af0e-23f690393109",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "e49ef1b5-50e7-464d-bcbf-9cbb99628f56"
                }
              }
            }
          }
        },
        "c3a2a241-e674-461b-b64c-704813bea917": {
          branch: {
            "ad0be76f-62ab-4eac-b428-b46a246ae84e": {
              byId: {
                "51af3a81-32b9-4c34-a342-fbc0e5f83c02": {
                  uid: "51af3a81-32b9-4c34-a342-fbc0e5f83c02",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "984140b3-be59-46db-a033-831de5c299a4",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "b0997c61-e6f5-4f02-95c4-f872b87b9e91": {
                  uid: "b0997c61-e6f5-4f02-95c4-f872b87b9e91",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "54309fe5-7c98-4036-8b77-a180c85f8b6d",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "ab10e4d3-25aa-4dc3-aa15-34458109b7bc": {
                  uid: "ab10e4d3-25aa-4dc3-aa15-34458109b7bc",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "93056eb6-9b37-4b90-8fe2-f0cbe3a92a25",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "821eb60b-c3a8-47b7-a529-a23c500e2f00": {
                  uid: "821eb60b-c3a8-47b7-a529-a23c500e2f00",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "b1a228b9-82b6-46b7-89e1-bae38de00bc5",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                }
              }
            },
            "33cd78f6-7e99-4da3-8adf-13a630635068": {
              byId: {
                "9a3a10ed-05ef-49df-bdde-8a946082272c": {
                  uid: "9a3a10ed-05ef-49df-bdde-8a946082272c",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "33cd78f6-7e99-4da3-8adf-13a630635068"
                },
                "936e1bf2-fc48-4785-b060-b2fc6ad82656": {
                  uid: "936e1bf2-fc48-4785-b060-b2fc6ad82656",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "c6e54bbd-05b2-4e2d-878c-c9f743464b7e",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "33cd78f6-7e99-4da3-8adf-13a630635068"
                }
              }
            }
          }
        },
        "2b3079ea-0239-464c-990f-75c154009056": {
          branch: {
            "872dd4c6-9bad-4cea-8929-877d09b6730b": {
              byId: {
                "c172502a-4dce-4e49-8f7f-b48dd5a0dc56": {
                  uid: "c172502a-4dce-4e49-8f7f-b48dd5a0dc56",
                  commit: "2b3079ea-0239-464c-990f-75c154009056",
                  target: {
                    ref: "67081270-0d51-408c-b6a9-468a6e604c36",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "872dd4c6-9bad-4cea-8929-877d09b6730b"
                }
              }
            },
            "9cc5ac69-7a95-41e8-90de-cd92e37892b1": {
              byId: {
                "bada8e5a-3db3-483c-989f-ee3799f8eb37": {
                  uid: "bada8e5a-3db3-483c-989f-ee3799f8eb37",
                  commit: "2b3079ea-0239-464c-990f-75c154009056",
                  target: {
                    ref: "d9451590-bb3c-4f2b-8f6c-e6ba4e52ad96",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "9cc5ac69-7a95-41e8-90de-cd92e37892b1"
                }
              }
            }
          }
        },
        "c740e91d-e355-4872-90a2-9d96d3acb321": {
          branch: {
            "ad0be76f-62ab-4eac-b428-b46a246ae84e": {
              byId: {
                "a0a83e72-07b3-44a4-ac05-03e03a6584e6": {
                  uid: "a0a83e72-07b3-44a4-ac05-03e03a6584e6",
                  commit: "c740e91d-e355-4872-90a2-9d96d3acb321",
                  target: {
                    ref: "984140b3-be59-46db-a033-831de5c299a4",
                    commit: "14596aa8-56f5-40bb-bdd2-f10d7e2b3f8f"
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                }
              }
            },
            "33cd78f6-7e99-4da3-8adf-13a630635068": {
              byId: {
                "fef002e3-8059-4aee-81e8-3bd6b5a74167": {
                  uid: "fef002e3-8059-4aee-81e8-3bd6b5a74167",
                  commit: "c740e91d-e355-4872-90a2-9d96d3acb321",
                  target: {
                    ref: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
                    commit: "756aa8c3-8886-487b-92ab-a0651693cc9a"
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "33cd78f6-7e99-4da3-8adf-13a630635068"
                }
              }
            }
          }
        },
        "c5578e5a-e0ee-4740-869c-1b2ccba1fac9": {
          branch: {
            "33cd78f6-7e99-4da3-8adf-13a630635068": {
              byId: {
                "87b2da3b-e7ff-406c-a55f-780aa9621268": {
                  uid: "87b2da3b-e7ff-406c-a55f-780aa9621268",
                  commit: "c5578e5a-e0ee-4740-869c-1b2ccba1fac9",
                  target: {
                    ref: "505b70ec-fc51-40c6-9f97-a8aad3606f6f",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "33cd78f6-7e99-4da3-8adf-13a630635068"
                },
                "0d0e1930-97c1-4a5d-8ecd-efe67d922575": {
                  uid: "0d0e1930-97c1-4a5d-8ecd-efe67d922575",
                  commit: "c5578e5a-e0ee-4740-869c-1b2ccba1fac9",
                  target: {
                    ref: "440840b0-8466-4f74-9104-41397cef2f65",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "33cd78f6-7e99-4da3-8adf-13a630635068"
                }
              }
            },
            "ad0be76f-62ab-4eac-b428-b46a246ae84e": {
              byId: {
                "a15fe6a8-9b0e-4721-9b29-51528f4fac6c": {
                  uid: "a15fe6a8-9b0e-4721-9b29-51528f4fac6c",
                  commit: "c5578e5a-e0ee-4740-869c-1b2ccba1fac9",
                  target: {
                    ref: "ad162378-abe4-43db-8943-7e3a97088076",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "ff981311-67b3-4270-a3ff-d0e018c419da": {
                  uid: "ff981311-67b3-4270-a3ff-d0e018c419da",
                  commit: "c5578e5a-e0ee-4740-869c-1b2ccba1fac9",
                  target: {
                    ref: "4728fcf9-cbf3-46ab-873f-0f3a2fddd34f",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "15060104-12b7-4840-8eeb-8b83f616029a": {
                  uid: "15060104-12b7-4840-8eeb-8b83f616029a",
                  commit: "c5578e5a-e0ee-4740-869c-1b2ccba1fac9",
                  target: {
                    ref: "70c89a45-4068-40e1-a9ea-96d846f084a4",
                    commit: null
                  },
                  heads: {
                    master: false,
                    user: false
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "717303d6-ca40-4819-8c9e-b805f62bbb0d": {
                  uid: "717303d6-ca40-4819-8c9e-b805f62bbb0d",
                  commit: "c5578e5a-e0ee-4740-869c-1b2ccba1fac9",
                  target: {
                    ref: "50b5f2b3-b426-426a-8fcc-8721cb1721e1",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                }
              }
            }
          }
        }
      },
      root: {
        branch: {
          "0e1c4838-1ce4-4830-9842-b45a7a1898f5": {
            byId: {
              "8053fd27-7de0-4bbb-baf1-cbfd132551f9": {
                uid: "8053fd27-7de0-4bbb-baf1-cbfd132551f9",
                commit: null,
                target: {
                  ref: "0f402c9c-c310-4469-bd19-690067c3e7d2",
                  commit: null
                },
                heads: {
                  master: true,
                  user: true
                },
                branchId: "0e1c4838-1ce4-4830-9842-b45a7a1898f5"
              }
            }
          }
        }
      }
    },
    fetchFlags: {
      trackers: {
        "": true
      }
    },
    metricScores: {
      byId: {
        "311bc197-8bbf-48d8-b927-a7f0be2bfe88": {
          period: -1,
          from_date: null,
          parameters: {
            uid: "2f29eab3-d102-4a7f-ad9e-576b1c1b64df",
            params_json: {}
          },
          freq_unit: null,
          uid: "311bc197-8bbf-48d8-b927-a7f0be2bfe88",
          is_forecast: false,
          metric: "f0d5d23d-6486-4793-b2fa-ce7107c89fea",
          freq_num: 1,
          required: false
        }
      }
    },
    baseMetrics: {
      byId: {
        "f0d5d23d-6486-4793-b2fa-ce7107c89fea": {
          uid: "f0d5d23d-6486-4793-b2fa-ce7107c89fea",
          unit: "Number",
          category: null,
          parentmetric: null,
          name: "sfgsfgs",
          description: "",
          fuel: ""
        }
      }
    },
    trees: {
      byId: {
        "b53c3616-9864-4c03-968b-3e1ccf18f16e": {
          uid: "b53c3616-9864-4c03-968b-3e1ccf18f16e",
          name: "95e815d1541bf6f358cfffbe66ab3af0d0c09d09"
        },
        "83a1d08e-aadc-4cf0-8661-337b09010515": {
          uid: "83a1d08e-aadc-4cf0-8661-337b09010515",
          name: "root"
        },
        "e5d6c3ec-79eb-46c0-9164-abf72341589b": {
          uid: "e5d6c3ec-79eb-46c0-9164-abf72341589b",
          name: "fff28dff2c3b7e5ae482e6f404e8c1e12fe0deda"
        },
        "2b139274-050f-46a0-972f-9e24d0c0e8bd": {
          uid: "2b139274-050f-46a0-972f-9e24d0c0e8bd",
          name: "9cab073a5140ea40c6df8ae69b0b38bf75c67cfa"
        },
        "5be283c6-785a-428b-a714-7e3e3e58af29": {
          uid: "5be283c6-785a-428b-a714-7e3e3e58af29",
          name: "396e4428bfc78bcd76fad35afeb5a9bcf8c72741"
        },
        "9b6add43-9300-4b48-8c11-a1d94058788b": {
          uid: "9b6add43-9300-4b48-8c11-a1d94058788b",
          name: "16eb797ce52116b01e8070b00a88159a52e3f2e7"
        },
        "e126d0bc-f3d0-4a50-99a4-ad87d51be5bf": {
          uid: "e126d0bc-f3d0-4a50-99a4-ad87d51be5bf",
          name: "b3222420455c1060a608a7056b6870da4145ef6f"
        },
        "0a352255-b1a5-4615-99ba-31ee4b545fca": {
          uid: "0a352255-b1a5-4615-99ba-31ee4b545fca",
          name: "1216b3c8ab58c2ea0d3dbae18aa694fa2b63fe70"
        },
        "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13": {
          uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
          name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
        },
        "c958a966-e00f-4d29-a4de-d480943f3aed": {
          uid: "c958a966-e00f-4d29-a4de-d480943f3aed",
          name: "764b814882da4af3852d1ffc507cb963de7af7af"
        },
        "e91f3570-420d-4a24-8441-11cc90017b8d": {
          uid: "e91f3570-420d-4a24-8441-11cc90017b8d",
          name: "13e75bcf04fcaa454ac9bf1c113b63fdff5cfc6b"
        },
        "dd7651ce-e2d9-4cf3-844f-cb560aeba32b": {
          uid: "dd7651ce-e2d9-4cf3-844f-cb560aeba32b",
          name: "56df95495014b02bbbb33d1b9e2d500e08a4bf31"
        },
        "e095272e-4ecb-4d2c-bf6f-48ab29b2b54c": {
          uid: "e095272e-4ecb-4d2c-bf6f-48ab29b2b54c",
          name: "c5a39a3a7b3df7a7c25d3954cca5306e26c2073a"
        },
        "5aac99b5-87ea-449c-95f1-10f7e3bacda5": {
          uid: "5aac99b5-87ea-449c-95f1-10f7e3bacda5",
          name: "9be1d66e5ec5d417c4b5f97fdc09396a0c7ee1bb"
        },
        "bdf8d0e6-a1de-4185-afe7-e60086f769a7": {
          uid: "bdf8d0e6-a1de-4185-afe7-e60086f769a7",
          name: "aa1d3053127a99acb8125efdbee4709265ac5674"
        }
      }
    },
    descriptions: {
      byId: {
        "a4c43f97-0438-4f11-a689-298df5411559": {
          uid: "a4c43f97-0438-4f11-a689-298df5411559",
          title: "Task 2",
          text: "<p>ertyejdfj</p>",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-06-26T09:22:36.452405"
        },
        "d2554fce-ff4c-441d-bd91-fe2e57d4338f": {
          uid: "d2554fce-ff4c-441d-bd91-fe2e57d4338f",
          title: "Task 1",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-06-26T08:45:33.633470"
        },
        "2204a3d5-c793-47d1-9360-31d4dd8cfe21": {
          uid: "2204a3d5-c793-47d1-9360-31d4dd8cfe21",
          title: "Task 4",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-06-27T12:16:32.053361"
        },
        "672d2d4f-4181-4074-9f71-3e4255df492c": {
          uid: "672d2d4f-4181-4074-9f71-3e4255df492c",
          title: "Sub Task 4.1",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-06-27T15:35:08.288790"
        },
        "92d863ae-ca4c-48c1-818a-1e7520102c6a": {
          uid: "92d863ae-ca4c-48c1-818a-1e7520102c6a",
          title: "Sub Task 4.2",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-06-27T15:35:17.530686"
        },
        "32448b52-f9d2-4684-8002-b7948339a949": {
          uid: "32448b52-f9d2-4684-8002-b7948339a949",
          title: "Sub Task 1.2",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-06-26T09:20:10.491710"
        },
        "e38fd638-3afa-4c5e-81e8-6326b638d050": {
          uid: "e38fd638-3afa-4c5e-81e8-6326b638d050",
          title: "Sub Task 1.1",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-06-26T08:56:58.651885"
        },
        "7210663b-b4ad-4cf9-98de-676e9b3e98c4": {
          uid: "7210663b-b4ad-4cf9-98de-676e9b3e98c4",
          title: "Sub Task 2.1",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-06-27T15:34:52.683528"
        }
      }
    },
    projects: {
      byId: {
        "73e1c9ea-f11b-4e43-9541-6696522f256a": {
          meta_json: {},
          NLA: null,
          suburb: "",
          app_host: null,
          created: "2019-06-27T13:11:20.237477",
          name: "Test Project 2",
          client: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          closed: false,
          postcode: "",
          reporting: null,
          uid: "73e1c9ea-f11b-4e43-9541-6696522f256a",
          state: "",
          address: "",
          country: "",
          trackers: [
            {
              uid: "63135d68-faa5-4cc1-91e8-ab8e3b2d8775",
              name: "dgnb_tool"
            }
          ],
          company: {
            uid: "c8298601-e901-4c3b-b162-3eb6631ddc52",
            name: "Test Company",
            depth: 1
          },
          default_workflow: "445b864b-8e31-4452-9f21-9e84d0c24ef6",
          host_site: 1
        },
        "d6b0aec4-3f86-4a83-925f-0508035a5888": {
          meta_json: {},
          NLA: null,
          suburb: "",
          app_host: null,
          created: "2019-06-24T09:33:01.849626",
          name: "Test Project 1",
          client: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          closed: false,
          postcode: "",
          reporting: null,
          uid: "d6b0aec4-3f86-4a83-925f-0508035a5888",
          state: "",
          address: "",
          country: "",
          trackers: [
            {
              uid: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
              name: "DGNB"
            }
          ],
          company: {
            uid: "c8298601-e901-4c3b-b162-3eb6631ddc52",
            name: "Test Company",
            depth: 1
          },
          default_workflow: "d6daa30a-7f71-43c6-8c4e-156477c99a92",
          host_site: 1
        }
      }
    },
    trackers: {
      byId: {
        "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd": {
          created: "2019-06-24T11:35:17.757475",
          alt_root_masters: {},
          name: "DGNB",
          errors: null,
          from_template: null,
          is_template: false,
          uid: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          project: {
            uid: "d6b0aec4-3f86-4a83-925f-0508035a5888",
            name: "Test Project 1"
          },
          is_public: false,
          root_master: "0f402c9c-c310-4469-bd19-690067c3e7d2"
        },
        "63135d68-faa5-4cc1-91e8-ab8e3b2d8775": {
          created: "2019-06-27T13:11:20.369365",
          alt_root_masters: {},
          name: "dgnb_tool",
          from_template: null,
          is_template: false,
          uid: "63135d68-faa5-4cc1-91e8-ab8e3b2d8775",
          project: {
            uid: "73e1c9ea-f11b-4e43-9541-6696522f256a",
            name: "Test Project 2"
          },
          is_public: false,
          root_master: "124a9490-e9ea-47cd-816f-4bb353172bd5"
        }
      }
    },
    projectObjects: {
      byId: {
        "d6b0aec4-3f86-4a83-925f-0508035a5888": {
          userPermission: {
            is_admin: true,
            actions: ["*"],
            project_disciplines: [
              {
                uid: "7954ec77-391e-451b-936d-f954f7a266e1",
                name: "Administrator",
                approver: null,
                auth: {
                  uid: "830b61be-40f1-48fb-8860-e9e5f67271fa",
                  is_admin: true,
                  name: "Admin",
                  policy_json: {}
                },
                project: {
                  uid: "d6b0aec4-3f86-4a83-925f-0508035a5888",
                  name: "Test Project 1"
                },
                base_uid: "c1c91f73-caec-43d2-afb4-84301f6f16f5"
              }
            ],
            errors: null,
            projectDisciplineIds: ["7954ec77-391e-451b-936d-f954f7a266e1"],
            baseDisciplineIds: ["c1c91f73-caec-43d2-afb4-84301f6f16f5"]
          }
        }
      }
    },
    commits: {
      byId: {
        "14596aa8-56f5-40bb-bdd2-f10d7e2b3f8f": {
          meta_json: {
            status: "pending_approval",
            actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
          },
          tree_root: {
            uid: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
            name: "59ac3aca9af1c69037d4207b4796212b5ff4474e"
          },
          is_staging: false,
          created: "2019-06-26T09:37:58.295064",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          uid: "14596aa8-56f5-40bb-bdd2-f10d7e2b3f8f",
          discipline: null,
          reporting_period: null,
          status: {
            uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
            name: "Pending Approval",
            color: "#D1B2D1"
          },
          ref: "984140b3-be59-46db-a033-831de5c299a4",
          root_commit: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
          previous: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          due_date: null,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
          forced_by: "c740e91d-e355-4872-90a2-9d96d3acb321",
          comment: "dadsasads"
        },
        "756aa8c3-8886-487b-92ab-a0651693cc9a": {
          meta_json: {
            status: "pending_approval",
            actionRequiredBy: "7954ec77-391e-451b-936d-f954f7a266e1"
          },
          tree_root: {
            uid: "5aac99b5-87ea-449c-95f1-10f7e3bacda5",
            name: "9be1d66e5ec5d417c4b5f97fdc09396a0c7ee1bb"
          },
          is_staging: false,
          created: "2019-06-26T09:37:58.983651",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          uid: "756aa8c3-8886-487b-92ab-a0651693cc9a",
          discipline: null,
          reporting_period: null,
          status: {
            uid: "6b51b441-4a15-4b9f-b511-170b927dd98d",
            name: "Pending Approval",
            color: "#D1B2D1"
          },
          ref: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
          root_commit: "33cd78f6-7e99-4da3-8adf-13a630635068",
          previous: "33cd78f6-7e99-4da3-8adf-13a630635068",
          tracker: "1b92b1b8-9f92-44b2-8d17-dd655dd62cfd",
          due_date: null,
          project: "d6b0aec4-3f86-4a83-925f-0508035a5888",
          forced_by: "c740e91d-e355-4872-90a2-9d96d3acb321",
          comment: "dadsasads"
        }
      }
    },
    commitEdges: {
      byId: {
        "2b3079ea-0239-464c-990f-75c154009056": {
          trees: {
            "bdf8d0e6-a1de-4185-afe7-e60086f769a7": {
              categories: {
                "c172502a-4dce-4e49-8f7f-b48dd5a0dc56": {
                  uid: "c172502a-4dce-4e49-8f7f-b48dd5a0dc56",
                  commit: "2b3079ea-0239-464c-990f-75c154009056",
                  target: {
                    ref: "67081270-0d51-408c-b6a9-468a6e604c36",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "872dd4c6-9bad-4cea-8929-877d09b6730b"
                },
                "bada8e5a-3db3-483c-989f-ee3799f8eb37": {
                  uid: "bada8e5a-3db3-483c-989f-ee3799f8eb37",
                  commit: "2b3079ea-0239-464c-990f-75c154009056",
                  target: {
                    ref: "d9451590-bb3c-4f2b-8f6c-e6ba4e52ad96",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "9cc5ac69-7a95-41e8-90de-cd92e37892b1"
                }
              },
              descriptions: ["2204a3d5-c793-47d1-9360-31d4dd8cfe21"]
            }
          }
        },
        "872dd4c6-9bad-4cea-8929-877d09b6730b": {
          trees: {
            "dd7651ce-e2d9-4cf3-844f-cb560aeba32b": {
              descriptions: ["672d2d4f-4181-4074-9f71-3e4255df492c"]
            }
          }
        },
        "ad0be76f-62ab-4eac-b428-b46a246ae84e": {
          trees: {
            "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13": {
              descriptions: ["e38fd638-3afa-4c5e-81e8-6326b638d050"]
            }
          }
        },
        "9cc5ac69-7a95-41e8-90de-cd92e37892b1": {
          trees: {
            "c958a966-e00f-4d29-a4de-d480943f3aed": {
              descriptions: ["92d863ae-ca4c-48c1-818a-1e7520102c6a"]
            }
          }
        },
        "06b51bfb-2952-4429-9d70-2c565706a30e": {
          trees: {
            "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13": {
              trees: [
                "5be283c6-785a-428b-a714-7e3e3e58af29",
                "9b6add43-9300-4b48-8c11-a1d94058788b",
                "0a352255-b1a5-4615-99ba-31ee4b545fca",
                "b53c3616-9864-4c03-968b-3e1ccf18f16e",
                "e91f3570-420d-4a24-8441-11cc90017b8d",
                "e095272e-4ecb-4d2c-bf6f-48ab29b2b54c"
              ],
              descriptions: ["e38fd638-3afa-4c5e-81e8-6326b638d050"]
            },
            "5be283c6-785a-428b-a714-7e3e3e58af29": {
              parent: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13"
            },
            "9b6add43-9300-4b48-8c11-a1d94058788b": {
              parent: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13",
              metricScores: ["311bc197-8bbf-48d8-b927-a7f0be2bfe88"]
            },
            "0a352255-b1a5-4615-99ba-31ee4b545fca": {
              parent: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13"
            },
            "b53c3616-9864-4c03-968b-3e1ccf18f16e": {
              parent: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13"
            },
            "e91f3570-420d-4a24-8441-11cc90017b8d": {
              parent: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13"
            },
            "e095272e-4ecb-4d2c-bf6f-48ab29b2b54c": {
              parent: "a4a47d7c-1a52-4b04-9f66-14b6a0e9ba13"
            }
          }
        },
        "c740e91d-e355-4872-90a2-9d96d3acb321": {
          trees: {
            "e126d0bc-f3d0-4a50-99a4-ad87d51be5bf": {
              categories: {
                "a0a83e72-07b3-44a4-ac05-03e03a6584e6": {
                  uid: "a0a83e72-07b3-44a4-ac05-03e03a6584e6",
                  commit: "c740e91d-e355-4872-90a2-9d96d3acb321",
                  target: {
                    ref: "984140b3-be59-46db-a033-831de5c299a4",
                    commit: "14596aa8-56f5-40bb-bdd2-f10d7e2b3f8f"
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "fef002e3-8059-4aee-81e8-3bd6b5a74167": {
                  uid: "fef002e3-8059-4aee-81e8-3bd6b5a74167",
                  commit: "c740e91d-e355-4872-90a2-9d96d3acb321",
                  target: {
                    ref: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
                    commit: "756aa8c3-8886-487b-92ab-a0651693cc9a"
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "33cd78f6-7e99-4da3-8adf-13a630635068"
                }
              },
              descriptions: ["d2554fce-ff4c-441d-bd91-fe2e57d4338f"]
            }
          }
        },
        "33cd78f6-7e99-4da3-8adf-13a630635068": {
          trees: {
            "5aac99b5-87ea-449c-95f1-10f7e3bacda5": {
              descriptions: ["32448b52-f9d2-4684-8002-b7948339a949"]
            }
          }
        },
        "e49ef1b5-50e7-464d-bcbf-9cbb99628f56": {
          trees: {
            "2b139274-050f-46a0-972f-9e24d0c0e8bd": {
              descriptions: ["7210663b-b4ad-4cf9-98de-676e9b3e98c4"]
            }
          }
        },
        "827d0559-0998-4334-8d5c-13a1a778282e": {
          trees: {
            "e5d6c3ec-79eb-46c0-9164-abf72341589b": {
              categories: {
                "c6a2adc8-816e-4f07-a263-29f980cbbdd8": {
                  uid: "c6a2adc8-816e-4f07-a263-29f980cbbdd8",
                  commit: "827d0559-0998-4334-8d5c-13a1a778282e",
                  target: {
                    ref: "269fb510-6f0c-436a-af0e-23f690393109",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "e49ef1b5-50e7-464d-bcbf-9cbb99628f56"
                }
              },
              descriptions: ["a4c43f97-0438-4f11-a689-298df5411559"]
            }
          }
        },
        "0e1c4838-1ce4-4830-9842-b45a7a1898f5": {
          trees: {
            "83a1d08e-aadc-4cf0-8661-337b09010515": {
              categories: {
                "3b8ab701-4bbb-444d-8b96-8e6fe7ae4793": {
                  uid: "3b8ab701-4bbb-444d-8b96-8e6fe7ae4793",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "cd6de6d2-85c4-4747-b06a-953cc53fc3d3",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "c740e91d-e355-4872-90a2-9d96d3acb321"
                },
                "926f297a-20c6-42e8-a725-6a0dbc8f7db8": {
                  uid: "926f297a-20c6-42e8-a725-6a0dbc8f7db8",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "20a234fa-ae3e-41a8-a783-3b617f5afff5",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "92b1147c-118d-4f65-bcc9-d11341c7991a"
                },
                "f69ac98e-65a6-471c-953e-e2b5b5f9d105": {
                  uid: "f69ac98e-65a6-471c-953e-e2b5b5f9d105",
                  commit: "0e1c4838-1ce4-4830-9842-b45a7a1898f5",
                  target: {
                    ref: "e75281f4-b4a4-4639-b7eb-f7aed6245776",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "2b3079ea-0239-464c-990f-75c154009056"
                }
              }
            }
          }
        },
        "c3a2a241-e674-461b-b64c-704813bea917": {
          trees: {
            "e126d0bc-f3d0-4a50-99a4-ad87d51be5bf": {
              categories: {
                "51af3a81-32b9-4c34-a342-fbc0e5f83c02": {
                  uid: "51af3a81-32b9-4c34-a342-fbc0e5f83c02",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "984140b3-be59-46db-a033-831de5c299a4",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e"
                },
                "9a3a10ed-05ef-49df-bdde-8a946082272c": {
                  uid: "9a3a10ed-05ef-49df-bdde-8a946082272c",
                  commit: "c3a2a241-e674-461b-b64c-704813bea917",
                  target: {
                    ref: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "33cd78f6-7e99-4da3-8adf-13a630635068"
                }
              },
              descriptions: ["d2554fce-ff4c-441d-bd91-fe2e57d4338f"]
            }
          }
        },
        "515309e1-492a-47bf-9ebd-abe7a834156f": {
          trees: {
            "5aac99b5-87ea-449c-95f1-10f7e3bacda5": {
              descriptions: ["32448b52-f9d2-4684-8002-b7948339a949"]
            }
          }
        },
        "92b1147c-118d-4f65-bcc9-d11341c7991a": {
          trees: {
            "e5d6c3ec-79eb-46c0-9164-abf72341589b": {
              descriptions: ["a4c43f97-0438-4f11-a689-298df5411559"]
            }
          }
        }
      }
    }
  }
});

export const TestStateC = Im.fromJS({
  entities: {
    refs: {
      byId: {
        "72384461-e033-44d0-a57e-366ed1b11ad0": {
          uid: "72384461-e033-44d0-a57e-366ed1b11ad0",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "47061b50-03e9-4f01-96c3-21b68bb0b940",
              name: "root"
            },
            is_staging: true,
            created: "2019-08-20T07:39:56.614069",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "9ffb697e-b3c9-4007-af31-f26e891c7d9f",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "72384461-e033-44d0-a57e-366ed1b11ad0",
            root_commit: "9ffb697e-b3c9-4007-af31-f26e891c7d9f",
            previous: null,
            tracker: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
            due_date: null,
            project: "76558a90-acb1-4af3-a3fa-dd82b68a7aed",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
          depth: 1,
          project: "76558a90-acb1-4af3-a3fa-dd82b68a7aed"
        },
        "d9d374fb-5800-4501-8ea2-4fc78c05e7b6": {
          uid: "d9d374fb-5800-4501-8ea2-4fc78c05e7b6",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "bff69cf4-e3ae-421c-bab7-8dc96b9f66ef",
              name: "c2c53d66948214258a26ca9ca845d7ac0c17f8e7"
            },
            is_staging: true,
            created: "2019-08-20T07:41:29.282255",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "4a357f85-1bc3-4fbb-afb7-c815713177ee",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "d9d374fb-5800-4501-8ea2-4fc78c05e7b6",
            root_commit: "4a357f85-1bc3-4fbb-afb7-c815713177ee",
            previous: null,
            tracker: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
            due_date: null,
            project: "76558a90-acb1-4af3-a3fa-dd82b68a7aed",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
          depth: 2,
          project: "76558a90-acb1-4af3-a3fa-dd82b68a7aed"
        },
        "f03b8adb-a5c4-458e-b120-4df079060d7c": {
          uid: "f03b8adb-a5c4-458e-b120-4df079060d7c",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "f6736866-65c0-4dae-b5a1-edb7e807b560",
              name: "ced7f67e593e9d94a54e98c4f8bb7b97460a585c"
            },
            is_staging: true,
            created: "2019-08-20T08:40:53.938555",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "4ab23472-f005-4fac-8f06-d68a4477f365",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "f03b8adb-a5c4-458e-b120-4df079060d7c",
            root_commit: "4ab23472-f005-4fac-8f06-d68a4477f365",
            previous: null,
            tracker: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
            due_date: null,
            project: "76558a90-acb1-4af3-a3fa-dd82b68a7aed",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
          depth: 4,
          project: "76558a90-acb1-4af3-a3fa-dd82b68a7aed"
        },
        "e541ab44-abfb-4b4d-9eef-83597ffb6da2": {
          uid: "e541ab44-abfb-4b4d-9eef-83597ffb6da2",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "5aca02c1-8f89-4cd4-8674-fe598a854743",
              name: "e2398779d5a199b7adb4917fab0cbe5660e3c52f"
            },
            is_staging: true,
            created: "2019-08-20T07:41:35.194223",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "384f965f-a05a-4b02-9891-0f9828584f26",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "e541ab44-abfb-4b4d-9eef-83597ffb6da2",
            root_commit: "384f965f-a05a-4b02-9891-0f9828584f26",
            previous: null,
            tracker: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
            due_date: null,
            project: "76558a90-acb1-4af3-a3fa-dd82b68a7aed",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
          depth: 3,
          project: "76558a90-acb1-4af3-a3fa-dd82b68a7aed"
        },
        "11420889-98c9-44c7-be33-c9c272dab84f": {
          uid: "11420889-98c9-44c7-be33-c9c272dab84f",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "ca9c42a1-d68f-4d9f-8a30-6939397c978b",
              name: "7295b69b0df06d518d481c54d71973f9f911520a"
            },
            is_staging: true,
            created: "2019-08-20T08:26:29.006587",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "11e9ab7b-569c-41f9-af74-e7104138987a",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "11420889-98c9-44c7-be33-c9c272dab84f",
            root_commit: "11e9ab7b-569c-41f9-af74-e7104138987a",
            previous: null,
            tracker: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
            due_date: null,
            project: "76558a90-acb1-4af3-a3fa-dd82b68a7aed",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
          depth: 3,
          project: "76558a90-acb1-4af3-a3fa-dd82b68a7aed"
        },
        "982a9a0d-6a97-4138-a792-300e54f23040": {
          uid: "982a9a0d-6a97-4138-a792-300e54f23040",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "19f9d366-7a7d-4540-9b46-c0552859050f",
              name: "27161de5bd31becbda77e5d712b2a5645087eb19"
            },
            is_staging: true,
            created: "2019-08-20T08:40:44.856009",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "a8e82cc5-4b94-48ca-8147-aa9e91edc6e7",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "982a9a0d-6a97-4138-a792-300e54f23040",
            root_commit: "a8e82cc5-4b94-48ca-8147-aa9e91edc6e7",
            previous: null,
            tracker: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
            due_date: null,
            project: "76558a90-acb1-4af3-a3fa-dd82b68a7aed",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
          depth: 4,
          project: "76558a90-acb1-4af3-a3fa-dd82b68a7aed"
        },
        "3acc072f-9239-48f7-8d27-2f9d922821a1": {
          uid: "3acc072f-9239-48f7-8d27-2f9d922821a1",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "c473f92a-071d-4d8d-95fd-2dd004ce84ee",
              name: "5944552127bb1cb40e51d54133e73def852f34ce"
            },
            is_staging: true,
            created: "2019-08-20T08:40:35.772913",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "b9f29a6c-8873-4dbe-aed3-37bfd172fe70",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "3acc072f-9239-48f7-8d27-2f9d922821a1",
            root_commit: "b9f29a6c-8873-4dbe-aed3-37bfd172fe70",
            previous: null,
            tracker: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
            due_date: null,
            project: "76558a90-acb1-4af3-a3fa-dd82b68a7aed",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
          depth: 4,
          project: "76558a90-acb1-4af3-a3fa-dd82b68a7aed"
        }
      }
    },
    commitBranches: {
      commit: {
        "9ffb697e-b3c9-4007-af31-f26e891c7d9f": {
          branch: {
            "4a357f85-1bc3-4fbb-afb7-c815713177ee": {
              byId: {
                "71614c68-68e8-4ab4-b2ae-d80dee0790ee": {
                  uid: "71614c68-68e8-4ab4-b2ae-d80dee0790ee",
                  commit: "9ffb697e-b3c9-4007-af31-f26e891c7d9f",
                  target: {
                    ref: "d9d374fb-5800-4501-8ea2-4fc78c05e7b6",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "4a357f85-1bc3-4fbb-afb7-c815713177ee"
                }
              }
            }
          }
        },
        "11e9ab7b-569c-41f9-af74-e7104138987a": {
          branch: {
            "4ab23472-f005-4fac-8f06-d68a4477f365": {
              byId: {
                "b4dd64f2-649f-4bfd-88c8-126d3f774887": {
                  uid: "b4dd64f2-649f-4bfd-88c8-126d3f774887",
                  commit: "11e9ab7b-569c-41f9-af74-e7104138987a",
                  target: {
                    ref: "f03b8adb-a5c4-458e-b120-4df079060d7c",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "4ab23472-f005-4fac-8f06-d68a4477f365"
                }
              }
            }
          }
        },
        "4a357f85-1bc3-4fbb-afb7-c815713177ee": {
          branch: {
            "384f965f-a05a-4b02-9891-0f9828584f26": {
              byId: {
                "35c6fd42-6da1-4d8a-87ca-5b94a3ecd2e4": {
                  uid: "35c6fd42-6da1-4d8a-87ca-5b94a3ecd2e4",
                  commit: "4a357f85-1bc3-4fbb-afb7-c815713177ee",
                  target: {
                    ref: "e541ab44-abfb-4b4d-9eef-83597ffb6da2",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "384f965f-a05a-4b02-9891-0f9828584f26"
                }
              }
            },
            "11e9ab7b-569c-41f9-af74-e7104138987a": {
              byId: {
                "43106dee-f929-46ca-b920-c01d86249360": {
                  uid: "43106dee-f929-46ca-b920-c01d86249360",
                  commit: "4a357f85-1bc3-4fbb-afb7-c815713177ee",
                  target: {
                    ref: "11420889-98c9-44c7-be33-c9c272dab84f",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "11e9ab7b-569c-41f9-af74-e7104138987a"
                }
              }
            }
          }
        },
        "384f965f-a05a-4b02-9891-0f9828584f26": {
          branch: {
            "a8e82cc5-4b94-48ca-8147-aa9e91edc6e7": {
              byId: {
                "e065434f-4882-46ef-81b4-5b472ff0d6bc": {
                  uid: "e065434f-4882-46ef-81b4-5b472ff0d6bc",
                  commit: "384f965f-a05a-4b02-9891-0f9828584f26",
                  target: {
                    ref: "982a9a0d-6a97-4138-a792-300e54f23040",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "a8e82cc5-4b94-48ca-8147-aa9e91edc6e7"
                }
              }
            },
            "b9f29a6c-8873-4dbe-aed3-37bfd172fe70": {
              byId: {
                "92b5ed71-2f29-473d-9f6f-a00efd1be519": {
                  uid: "92b5ed71-2f29-473d-9f6f-a00efd1be519",
                  commit: "384f965f-a05a-4b02-9891-0f9828584f26",
                  target: {
                    ref: "3acc072f-9239-48f7-8d27-2f9d922821a1",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "b9f29a6c-8873-4dbe-aed3-37bfd172fe70"
                }
              }
            }
          }
        }
      },
      root: {
        branch: {
          "9ffb697e-b3c9-4007-af31-f26e891c7d9f": {
            byId: {
              "fc59e573-5461-4b6c-b090-0398ee42d1aa": {
                uid: "fc59e573-5461-4b6c-b090-0398ee42d1aa",
                commit: null,
                target: {
                  ref: "72384461-e033-44d0-a57e-366ed1b11ad0",
                  commit: null
                },
                heads: {
                  master: true,
                  user: true
                },
                branchId: "9ffb697e-b3c9-4007-af31-f26e891c7d9f"
              }
            }
          }
        }
      }
    },
    fetchFlags: {
      trackers: {
        "": true
      }
    },
    metricScores: {
      byId: {
        "db8601d5-9e6a-440d-8f1e-1883b14ea5e5": {
          period: -1,
          from_date: null,
          parameters: {
            uid: "17b5d762-a5ce-44d2-b8c7-19609826e762",
            params_json: {
              max: 100,
              weight: 1
            }
          },
          freq_unit: null,
          uid: "db8601d5-9e6a-440d-8f1e-1883b14ea5e5",
          is_forecast: false,
          metric: "5f2401b4-5a76-49eb-9938-f675d81c3c67",
          freq_num: 1,
          required: false
        },
        "3a50f053-156a-434b-87be-d4b66ba2624c": {
          period: -1,
          from_date: null,
          parameters: {
            uid: "19fd7bca-c60c-4fc4-b314-7c512f045b4f",
            params_json: {
              max: 100,
              weight: 1
            }
          },
          freq_unit: null,
          uid: "3a50f053-156a-434b-87be-d4b66ba2624c",
          is_forecast: false,
          metric: "b72a40cf-e1ce-4b26-a679-4ff4fcd1ce18",
          freq_num: 1,
          required: false
        },
        "fb01cd6b-0408-4773-adc6-6846c78c9649": {
          period: -1,
          from_date: null,
          parameters: {
            uid: "ca58efcd-7c9d-420e-9de7-7589d38e3b5f",
            params_json: {
              max: 100,
              weight: 1
            }
          },
          freq_unit: null,
          uid: "fb01cd6b-0408-4773-adc6-6846c78c9649",
          is_forecast: false,
          metric: "1854eaba-60dd-40f6-9cec-4a205a55417b",
          freq_num: 1,
          required: false
        },
        "e476bdc4-c605-481a-ad58-fc9c2fb089d9": {
          period: -1,
          from_date: null,
          parameters: {
            uid: "02f2d443-19be-4219-903e-f9c729d5b2e2",
            params_json: {
              max: 100,
              weight: 1
            }
          },
          freq_unit: null,
          uid: "e476bdc4-c605-481a-ad58-fc9c2fb089d9",
          is_forecast: false,
          metric: "b11c7281-40f1-4f7c-9696-bd8eaa1abf67",
          freq_num: 1,
          required: false
        },
        "97e360ee-9ef8-4580-a161-fd2b1900441d": {
          period: -1,
          from_date: null,
          parameters: {
            uid: "7b8ad454-9ec6-4345-84d0-31968c6d5f84",
            params_json: {
              max: 100,
              weight: 1
            }
          },
          freq_unit: null,
          uid: "97e360ee-9ef8-4580-a161-fd2b1900441d",
          is_forecast: false,
          metric: "6297dc32-6002-4247-baab-f13bd25c8ff6",
          freq_num: 1,
          required: false
        },
        "f7297f6a-b92f-4cb6-afe1-848dc0d96bb9": {
          period: -1,
          from_date: null,
          parameters: {
            uid: "4351d605-bb55-415a-8825-83c0147fc89e",
            params_json: {
              max: 100,
              weight: 1
            }
          },
          freq_unit: null,
          uid: "f7297f6a-b92f-4cb6-afe1-848dc0d96bb9",
          is_forecast: false,
          metric: "8edd0df6-80ff-48f3-bc8f-f1decba111b2",
          freq_num: 1,
          required: false
        }
      }
    },
    baseMetrics: {
      byId: {
        "5f2401b4-5a76-49eb-9938-f675d81c3c67": {
          uid: "5f2401b4-5a76-49eb-9938-f675d81c3c67",
          unit: "Number",
          category: null,
          parentmetric: null,
          name: "T",
          description: "",
          fuel: ""
        },
        "b72a40cf-e1ce-4b26-a679-4ff4fcd1ce18": {
          uid: "b72a40cf-e1ce-4b26-a679-4ff4fcd1ce18",
          unit: "Number",
          category: "Test",
          parentmetric: null,
          name: "Test 2",
          description: "",
          fuel: ""
        },
        "1854eaba-60dd-40f6-9cec-4a205a55417b": {
          uid: "1854eaba-60dd-40f6-9cec-4a205a55417b",
          unit: "Number",
          category: null,
          parentmetric: null,
          name: "T1",
          description: "",
          fuel: ""
        },
        "b11c7281-40f1-4f7c-9696-bd8eaa1abf67": {
          uid: "b11c7281-40f1-4f7c-9696-bd8eaa1abf67",
          unit: "Number",
          category: "Test",
          parentmetric: null,
          name: "T1.2",
          description: "",
          fuel: ""
        },
        "6297dc32-6002-4247-baab-f13bd25c8ff6": {
          uid: "6297dc32-6002-4247-baab-f13bd25c8ff6",
          unit: "Number",
          category: "Test",
          parentmetric: null,
          name: "T1.1",
          description: "",
          fuel: ""
        },
        "8edd0df6-80ff-48f3-bc8f-f1decba111b2": {
          uid: "8edd0df6-80ff-48f3-bc8f-f1decba111b2",
          unit: "Number",
          category: "Test",
          parentmetric: null,
          name: "T2.1",
          description: "",
          fuel: ""
        }
      }
    },
    trees: {
      byId: {
        "47061b50-03e9-4f01-96c3-21b68bb0b940": {
          uid: "47061b50-03e9-4f01-96c3-21b68bb0b940",
          name: "root"
        },
        "07d1ae9c-26e0-4e77-8646-65fc3e4c8849": {
          uid: "07d1ae9c-26e0-4e77-8646-65fc3e4c8849",
          name: "c2c53d66948214258a26ca9ca845d7ac0c17f8e7"
        },
        "2e1fe261-8492-4009-b703-b119715e0076": {
          uid: "2e1fe261-8492-4009-b703-b119715e0076",
          name: "5944552127bb1cb40e51d54133e73def852f34ce"
        },
        "b549236b-8fc6-40da-be3b-41e03d1ef06a": {
          uid: "b549236b-8fc6-40da-be3b-41e03d1ef06a",
          name: "ced7f67e593e9d94a54e98c4f8bb7b97460a585c"
        },
        "f6736866-65c0-4dae-b5a1-edb7e807b560": {
          uid: "f6736866-65c0-4dae-b5a1-edb7e807b560",
          name: "ced7f67e593e9d94a54e98c4f8bb7b97460a585c"
        },
        "ca9c42a1-d68f-4d9f-8a30-6939397c978b": {
          uid: "ca9c42a1-d68f-4d9f-8a30-6939397c978b",
          name: "7295b69b0df06d518d481c54d71973f9f911520a"
        },
        "bff69cf4-e3ae-421c-bab7-8dc96b9f66ef": {
          uid: "bff69cf4-e3ae-421c-bab7-8dc96b9f66ef",
          name: "c2c53d66948214258a26ca9ca845d7ac0c17f8e7"
        },
        "713ad474-f6ec-4c5c-9ffe-db4f5a7e43a3": {
          uid: "713ad474-f6ec-4c5c-9ffe-db4f5a7e43a3",
          name: "27161de5bd31becbda77e5d712b2a5645087eb19"
        },
        "19f9d366-7a7d-4540-9b46-c0552859050f": {
          uid: "19f9d366-7a7d-4540-9b46-c0552859050f",
          name: "27161de5bd31becbda77e5d712b2a5645087eb19"
        },
        "c473f92a-071d-4d8d-95fd-2dd004ce84ee": {
          uid: "c473f92a-071d-4d8d-95fd-2dd004ce84ee",
          name: "5944552127bb1cb40e51d54133e73def852f34ce"
        },
        "5aca02c1-8f89-4cd4-8674-fe598a854743": {
          uid: "5aca02c1-8f89-4cd4-8674-fe598a854743",
          name: "e2398779d5a199b7adb4917fab0cbe5660e3c52f"
        },
        "ca6f4a6d-cc8f-4894-9a07-884a97d5242d": {
          uid: "ca6f4a6d-cc8f-4894-9a07-884a97d5242d",
          name: "7295b69b0df06d518d481c54d71973f9f911520a"
        },
        "a0194b11-e3e3-4930-b081-77bdf94df404": {
          uid: "a0194b11-e3e3-4930-b081-77bdf94df404",
          name: "e2398779d5a199b7adb4917fab0cbe5660e3c52f"
        }
      }
    },
    descriptions: {
      byId: {
        "23d78606-6b98-41b8-98ad-eeedd1e77414": {
          uid: "23d78606-6b98-41b8-98ad-eeedd1e77414",
          title: "T",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-08-20T07:41:29.305763"
        },
        "3ae06ff4-fa15-4def-8d21-2e0868c76caa": {
          uid: "3ae06ff4-fa15-4def-8d21-2e0868c76caa",
          title: "Test 2",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-08-20T08:26:29.078994"
        },
        "54d4dd0d-adb7-4ccb-bc48-d7fd5f3231ec": {
          uid: "54d4dd0d-adb7-4ccb-bc48-d7fd5f3231ec",
          title: "T1",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-08-20T07:41:35.217050"
        },
        "2faae2e4-3740-4d8b-9a3b-9cefe2a353b3": {
          uid: "2faae2e4-3740-4d8b-9a3b-9cefe2a353b3",
          title: "T1.2",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-08-20T08:40:44.884286"
        },
        "1d346f6d-0a7b-47be-be99-277b9348b5c2": {
          uid: "1d346f6d-0a7b-47be-be99-277b9348b5c2",
          title: "T1.1",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-08-20T08:40:35.787910"
        },
        "6bcd6202-2725-447f-91f4-c689b3c5ff2f": {
          uid: "6bcd6202-2725-447f-91f4-c689b3c5ff2f",
          title: "T2.1",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-08-20T08:40:53.960699"
        }
      }
    },
    projects: {
      byId: {
        "76558a90-acb1-4af3-a3fa-dd82b68a7aed": {
          meta_json: {},
          NLA: null,
          suburb: "",
          app_host: null,
          created: "2019-08-20T07:39:56.391423",
          name: "Test",
          client: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          closed: false,
          postcode: "",
          reporting: null,
          uid: "76558a90-acb1-4af3-a3fa-dd82b68a7aed",
          state: "",
          address: "",
          country: "",
          trackers: [
            {
              uid: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
              name: "dgnb_tool"
            }
          ],
          company: {
            uid: "55a1b192-a548-475d-be70-e73b3b357fc5",
            name: "TEST",
            depth: 1
          },
          default_workflow: "f58e2867-1512-429c-b09b-8e7dd8cce916",
          host_site: 1
        }
      }
    },
    trackers: {
      byId: {
        "67d0cbdd-796c-41b3-aed5-f3ce5837bec8": {
          created: "2019-08-20T07:39:56.577685",
          alt_root_masters: {},
          name: "dgnb_tool",
          errors: null,
          from_template: null,
          is_template: false,
          uid: "67d0cbdd-796c-41b3-aed5-f3ce5837bec8",
          project: {
            uid: "76558a90-acb1-4af3-a3fa-dd82b68a7aed",
            name: "Test"
          },
          is_public: false,
          root_master: "72384461-e033-44d0-a57e-366ed1b11ad0"
        }
      }
    },
    projectObjects: {
      byId: {
        "76558a90-acb1-4af3-a3fa-dd82b68a7aed": {
          userPermission: {
            is_admin: true,
            actions: ["*"],
            project_disciplines: [
              {
                uid: "df54a911-db07-4921-b9e7-d1eedc68621b",
                name: "Administrator",
                approver: null,
                auth: {
                  uid: "813a4d18-995a-47c8-a27c-c583ffae1b15",
                  is_admin: true,
                  name: "Admin",
                  policy_json: {}
                },
                project: {
                  uid: "76558a90-acb1-4af3-a3fa-dd82b68a7aed",
                  name: "Test"
                },
                base_uid: "c1c91f73-caec-43d2-afb4-84301f6f16f5"
              }
            ],
            errors: null,
            projectDisciplineIds: ["df54a911-db07-4921-b9e7-d1eedc68621b"],
            baseDisciplineIds: ["c1c91f73-caec-43d2-afb4-84301f6f16f5"]
          }
        }
      }
    },
    commitEdges: {
      byId: {
        "9ffb697e-b3c9-4007-af31-f26e891c7d9f": {
          trees: {
            "47061b50-03e9-4f01-96c3-21b68bb0b940": {
              categories: {
                "71614c68-68e8-4ab4-b2ae-d80dee0790ee": {
                  uid: "71614c68-68e8-4ab4-b2ae-d80dee0790ee",
                  commit: "9ffb697e-b3c9-4007-af31-f26e891c7d9f",
                  target: {
                    ref: "d9d374fb-5800-4501-8ea2-4fc78c05e7b6",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "4a357f85-1bc3-4fbb-afb7-c815713177ee"
                }
              }
            }
          }
        },
        "4a357f85-1bc3-4fbb-afb7-c815713177ee": {
          trees: {
            "bff69cf4-e3ae-421c-bab7-8dc96b9f66ef": {
              categories: {
                "35c6fd42-6da1-4d8a-87ca-5b94a3ecd2e4": {
                  uid: "35c6fd42-6da1-4d8a-87ca-5b94a3ecd2e4",
                  commit: "4a357f85-1bc3-4fbb-afb7-c815713177ee",
                  target: {
                    ref: "e541ab44-abfb-4b4d-9eef-83597ffb6da2",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "384f965f-a05a-4b02-9891-0f9828584f26"
                },
                "43106dee-f929-46ca-b920-c01d86249360": {
                  uid: "43106dee-f929-46ca-b920-c01d86249360",
                  commit: "4a357f85-1bc3-4fbb-afb7-c815713177ee",
                  target: {
                    ref: "11420889-98c9-44c7-be33-c9c272dab84f",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "11e9ab7b-569c-41f9-af74-e7104138987a"
                }
              },
              trees: ["07d1ae9c-26e0-4e77-8646-65fc3e4c8849"],
              descriptions: ["23d78606-6b98-41b8-98ad-eeedd1e77414"]
            },
            "07d1ae9c-26e0-4e77-8646-65fc3e4c8849": {
              parent: "bff69cf4-e3ae-421c-bab7-8dc96b9f66ef",
              metricScores: ["db8601d5-9e6a-440d-8f1e-1883b14ea5e5"]
            }
          },
          scoreValues: {}
        },
        "11e9ab7b-569c-41f9-af74-e7104138987a": {
          trees: {
            "ca9c42a1-d68f-4d9f-8a30-6939397c978b": {
              categories: {
                "b4dd64f2-649f-4bfd-88c8-126d3f774887": {
                  uid: "b4dd64f2-649f-4bfd-88c8-126d3f774887",
                  commit: "11e9ab7b-569c-41f9-af74-e7104138987a",
                  target: {
                    ref: "f03b8adb-a5c4-458e-b120-4df079060d7c",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "4ab23472-f005-4fac-8f06-d68a4477f365"
                }
              },
              trees: ["ca6f4a6d-cc8f-4894-9a07-884a97d5242d"],
              descriptions: ["3ae06ff4-fa15-4def-8d21-2e0868c76caa"]
            },
            "ca6f4a6d-cc8f-4894-9a07-884a97d5242d": {
              parent: "ca9c42a1-d68f-4d9f-8a30-6939397c978b",
              metricScores: ["3a50f053-156a-434b-87be-d4b66ba2624c"]
            }
          },
          scoreValues: {}
        },
        "384f965f-a05a-4b02-9891-0f9828584f26": {
          trees: {
            "5aca02c1-8f89-4cd4-8674-fe598a854743": {
              categories: {
                "92b5ed71-2f29-473d-9f6f-a00efd1be519": {
                  uid: "92b5ed71-2f29-473d-9f6f-a00efd1be519",
                  commit: "384f965f-a05a-4b02-9891-0f9828584f26",
                  target: {
                    ref: "3acc072f-9239-48f7-8d27-2f9d922821a1",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "b9f29a6c-8873-4dbe-aed3-37bfd172fe70"
                },
                "e065434f-4882-46ef-81b4-5b472ff0d6bc": {
                  uid: "e065434f-4882-46ef-81b4-5b472ff0d6bc",
                  commit: "384f965f-a05a-4b02-9891-0f9828584f26",
                  target: {
                    ref: "982a9a0d-6a97-4138-a792-300e54f23040",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "a8e82cc5-4b94-48ca-8147-aa9e91edc6e7"
                }
              },
              trees: ["a0194b11-e3e3-4930-b081-77bdf94df404"],
              descriptions: ["54d4dd0d-adb7-4ccb-bc48-d7fd5f3231ec"]
            },
            "a0194b11-e3e3-4930-b081-77bdf94df404": {
              parent: "5aca02c1-8f89-4cd4-8674-fe598a854743",
              metricScores: ["fb01cd6b-0408-4773-adc6-6846c78c9649"]
            }
          },
          scoreValues: {}
        },
        "b9f29a6c-8873-4dbe-aed3-37bfd172fe70": {
          scoreValues: {},
          trees: {
            "c473f92a-071d-4d8d-95fd-2dd004ce84ee": {
              trees: ["2e1fe261-8492-4009-b703-b119715e0076"],
              descriptions: ["1d346f6d-0a7b-47be-be99-277b9348b5c2"]
            },
            "2e1fe261-8492-4009-b703-b119715e0076": {
              parent: "c473f92a-071d-4d8d-95fd-2dd004ce84ee",
              metricScores: ["97e360ee-9ef8-4580-a161-fd2b1900441d"]
            }
          }
        },
        "a8e82cc5-4b94-48ca-8147-aa9e91edc6e7": {
          scoreValues: {},
          trees: {
            "19f9d366-7a7d-4540-9b46-c0552859050f": {
              trees: ["713ad474-f6ec-4c5c-9ffe-db4f5a7e43a3"],
              descriptions: ["2faae2e4-3740-4d8b-9a3b-9cefe2a353b3"]
            },
            "713ad474-f6ec-4c5c-9ffe-db4f5a7e43a3": {
              parent: "19f9d366-7a7d-4540-9b46-c0552859050f",
              metricScores: ["e476bdc4-c605-481a-ad58-fc9c2fb089d9"]
            }
          }
        },
        "4ab23472-f005-4fac-8f06-d68a4477f365": {
          scoreValues: {},
          trees: {
            "f6736866-65c0-4dae-b5a1-edb7e807b560": {
              trees: ["b549236b-8fc6-40da-be3b-41e03d1ef06a"],
              descriptions: ["6bcd6202-2725-447f-91f4-c689b3c5ff2f"]
            },
            "b549236b-8fc6-40da-be3b-41e03d1ef06a": {
              parent: "f6736866-65c0-4dae-b5a1-edb7e807b560",
              metricScores: ["f7297f6a-b92f-4cb6-afe1-848dc0d96bb9"]
            }
          }
        }
      }
    }
  }
});

const resultStateB = {
  name: "master",
  refId: "0f402c9c-c310-4469-bd19-690067c3e7d2",
  children: [
    {
      name: "Task 1",
      masterRefId: "cd6de6d2-85c4-4747-b06a-953cc53fc3d3",
      branchId: "c740e91d-e355-4872-90a2-9d96d3acb321",
      colname: "level1",
      children: [
        {
          name: "master",
          branchId: "3b8ab701-4bbb-444d-8b96-8e6fe7ae4793",
          refId: "cd6de6d2-85c4-4747-b06a-953cc53fc3d3",
          colname: "level2",
          isMaster: true,
          children: [
            {
              name: "Sub Task 1.1",
              masterRefId: "984140b3-be59-46db-a033-831de5c299a4",
              branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
              colname: "level3",
              children: [
                {
                  name: "master",
                  branchId: "a0a83e72-07b3-44a4-ac05-03e03a6584e6",
                  refId: "984140b3-be59-46db-a033-831de5c299a4",
                  colname: "level4",
                  isMaster: true,
                  children: []
                }
              ],
              isMaster: true
            },
            {
              name: "Sub Task 1.2",
              masterRefId: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
              branchId: "33cd78f6-7e99-4da3-8adf-13a630635068",
              colname: "level3",
              children: [
                {
                  name: "master",
                  branchId: "fef002e3-8059-4aee-81e8-3bd6b5a74167",
                  refId: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
                  colname: "level4",
                  isMaster: true,
                  children: []
                }
              ],
              isMaster: true
            }
          ]
        },
        {
          name: "b1",
          branchId: "9289e0db-7dc7-4bac-b486-3e9a296d9c77",
          refId: "b6324b42-7d17-412d-a426-776877d6f3ac",
          colname: "level2",
          isMaster: false,
          children: []
        }
      ],
      isMaster: true
    },
    {
      name: "Task 2",
      masterRefId: "20a234fa-ae3e-41a8-a783-3b617f5afff5",
      branchId: "92b1147c-118d-4f65-bcc9-d11341c7991a",
      colname: "level1",
      children: [
        {
          name: "master",
          branchId: "926f297a-20c6-42e8-a725-6a0dbc8f7db8",
          refId: "20a234fa-ae3e-41a8-a783-3b617f5afff5",
          colname: "level2",
          isMaster: true,
          children: []
        },
        {
          name: "b2",
          branchId: "74cb95c0-83b2-41fd-bd7b-fa89bc11af19",
          refId: "721d3a18-5476-487c-a7b5-404f6382b9ef",
          colname: "level2",
          isMaster: false,
          children: []
        },
        {
          name: "b2",
          branchId: "aaa499a3-1e40-4608-b900-77e5bbf3e9a3",
          refId: "a83c5981-2b63-41d1-913f-a9c6d4f60ec7",
          colname: "level2",
          isMaster: false,
          children: []
        }
      ],
      isMaster: true
    },
    {
      name: "Task 4",
      masterRefId: "e75281f4-b4a4-4639-b7eb-f7aed6245776",
      branchId: "2b3079ea-0239-464c-990f-75c154009056",
      colname: "level1",
      children: [
        {
          name: "master",
          branchId: "f69ac98e-65a6-471c-953e-e2b5b5f9d105",
          refId: "e75281f4-b4a4-4639-b7eb-f7aed6245776",
          colname: "level2",
          isMaster: true,
          children: [
            {
              name: "Sub Task 4.1",
              masterRefId: "67081270-0d51-408c-b6a9-468a6e604c36",
              branchId: "872dd4c6-9bad-4cea-8929-877d09b6730b",
              colname: "level3",
              children: [
                {
                  name: "master",
                  branchId: "c172502a-4dce-4e49-8f7f-b48dd5a0dc56",
                  refId: "67081270-0d51-408c-b6a9-468a6e604c36",
                  colname: "level4",
                  isMaster: true,
                  children: []
                }
              ],
              isMaster: true
            },
            {
              name: "Sub Task 4.2",
              masterRefId: "d9451590-bb3c-4f2b-8f6c-e6ba4e52ad96",
              branchId: "9cc5ac69-7a95-41e8-90de-cd92e37892b1",
              colname: "level3",
              children: [
                {
                  name: "master",
                  branchId: "bada8e5a-3db3-483c-989f-ee3799f8eb37",
                  refId: "d9451590-bb3c-4f2b-8f6c-e6ba4e52ad96",
                  colname: "level4",
                  isMaster: true,
                  children: []
                }
              ],
              isMaster: true
            }
          ]
        }
      ],
      isMaster: true
    }
  ]
};

const resultStateA = {
  name: "master",
  refId: "0f402c9c-c310-4469-bd19-690067c3e7d2",
  children: [
    {
      name: "Task 1",
      masterRefId: "cd6de6d2-85c4-4747-b06a-953cc53fc3d3",
      branchId: "c740e91d-e355-4872-90a2-9d96d3acb321",
      colname: "level1",
      children: [
        {
          name: "master",
          branchId: "3b8ab701-4bbb-444d-8b96-8e6fe7ae4793",
          refId: "cd6de6d2-85c4-4747-b06a-953cc53fc3d3",
          colname: "level2",
          isMaster: true,
          children: [
            {
              name: "Sub Task 1",
              masterRefId: "984140b3-be59-46db-a033-831de5c299a4",
              branchId: "ad0be76f-62ab-4eac-b428-b46a246ae84e",
              colname: "level3",
              children: [
                {
                  name: "master",
                  branchId: "a0a83e72-07b3-44a4-ac05-03e03a6584e6",
                  refId: "984140b3-be59-46db-a033-831de5c299a4",
                  colname: "level4",
                  isMaster: true,
                  children: []
                }
              ],
              isMaster: true
            },
            {
              name: "Æ:,",
              masterRefId: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
              branchId: "33cd78f6-7e99-4da3-8adf-13a630635068",
              colname: "level3",
              children: [
                {
                  name: "master",
                  branchId: "fef002e3-8059-4aee-81e8-3bd6b5a74167",
                  refId: "bbcdacde-16f7-489f-9dff-a16d0ea96a30",
                  colname: "level4",
                  isMaster: true,
                  children: []
                }
              ],
              isMaster: true
            }
          ]
        },
        {
          name: "b1",
          branchId: "9289e0db-7dc7-4bac-b486-3e9a296d9c77",
          refId: "b6324b42-7d17-412d-a426-776877d6f3ac",
          colname: "level2",
          isMaster: false,
          children: []
        }
      ],
      isMaster: true
    },
    {
      name: "Task 2",
      masterRefId: "20a234fa-ae3e-41a8-a783-3b617f5afff5",
      branchId: "92b1147c-118d-4f65-bcc9-d11341c7991a",
      colname: "level1",
      children: [
        {
          name: "master",
          branchId: "926f297a-20c6-42e8-a725-6a0dbc8f7db8",
          refId: "20a234fa-ae3e-41a8-a783-3b617f5afff5",
          colname: "level2",
          isMaster: true,
          children: []
        },
        {
          name: "b2",
          branchId: "74cb95c0-83b2-41fd-bd7b-fa89bc11af19",
          refId: "721d3a18-5476-487c-a7b5-404f6382b9ef",
          colname: "level2",
          isMaster: false,
          children: []
        },
        {
          name: "b2",
          branchId: "aaa499a3-1e40-4608-b900-77e5bbf3e9a3",
          refId: "a83c5981-2b63-41d1-913f-a9c6d4f60ec7",
          colname: "level2",
          isMaster: false,
          children: []
        }
      ],
      isMaster: true
    },
    {
      name: "Task 4",
      masterRefId: "e75281f4-b4a4-4639-b7eb-f7aed6245776",
      branchId: "2b3079ea-0239-464c-990f-75c154009056",
      colname: "level1",
      children: [
        {
          name: "master",
          branchId: "f69ac98e-65a6-471c-953e-e2b5b5f9d105",
          refId: "e75281f4-b4a4-4639-b7eb-f7aed6245776",
          colname: "level2",
          isMaster: true,
          children: []
        }
      ],
      isMaster: true
    }
  ]
};

const resultStateC = {
  name: "master",
  refId: "72384461-e033-44d0-a57e-366ed1b11ad0",
  children: [
    {
      name: "T",
      masterRefId: "d9d374fb-5800-4501-8ea2-4fc78c05e7b6",
      branchId: "4a357f85-1bc3-4fbb-afb7-c815713177ee",
      colname: "level1",
      children: [
        {
          name: "master",
          branchId: "71614c68-68e8-4ab4-b2ae-d80dee0790ee",
          refId: "d9d374fb-5800-4501-8ea2-4fc78c05e7b6",
          colname: "level2",
          isMaster: true,
          children: [
            {
              name: "T1",
              masterRefId: "e541ab44-abfb-4b4d-9eef-83597ffb6da2",
              branchId: "384f965f-a05a-4b02-9891-0f9828584f26",
              colname: "level3",
              children: [
                {
                  name: "master",
                  branchId: "35c6fd42-6da1-4d8a-87ca-5b94a3ecd2e4",
                  refId: "e541ab44-abfb-4b4d-9eef-83597ffb6da2",
                  colname: "level4",
                  isMaster: true,
                  children: [
                    {
                      name: "T1.2",
                      masterRefId: "982a9a0d-6a97-4138-a792-300e54f23040",
                      branchId: "a8e82cc5-4b94-48ca-8147-aa9e91edc6e7",
                      colname: "level5",
                      children: [
                        {
                          name: "master",
                          branchId: "e065434f-4882-46ef-81b4-5b472ff0d6bc",
                          refId: "982a9a0d-6a97-4138-a792-300e54f23040",
                          colname: "level6",
                          isMaster: true,
                          children: []
                        }
                      ],
                      isMaster: true
                    },
                    {
                      name: "T1.1",
                      masterRefId: "3acc072f-9239-48f7-8d27-2f9d922821a1",
                      branchId: "b9f29a6c-8873-4dbe-aed3-37bfd172fe70",
                      colname: "level5",
                      children: [
                        {
                          name: "master",
                          branchId: "92b5ed71-2f29-473d-9f6f-a00efd1be519",
                          refId: "3acc072f-9239-48f7-8d27-2f9d922821a1",
                          colname: "level6",
                          isMaster: true,
                          children: []
                        }
                      ],
                      isMaster: true
                    }
                  ]
                }
              ],
              isMaster: true
            },
            {
              name: "Test 2",
              masterRefId: "11420889-98c9-44c7-be33-c9c272dab84f",
              branchId: "11e9ab7b-569c-41f9-af74-e7104138987a",
              colname: "level3",
              children: [
                {
                  name: "master",
                  branchId: "43106dee-f929-46ca-b920-c01d86249360",
                  refId: "11420889-98c9-44c7-be33-c9c272dab84f",
                  colname: "level4",
                  isMaster: true,
                  children: [
                    {
                      name: "T2.1",
                      masterRefId: "f03b8adb-a5c4-458e-b120-4df079060d7c",
                      branchId: "4ab23472-f005-4fac-8f06-d68a4477f365",
                      colname: "level5",
                      children: [
                        {
                          name: "master",
                          branchId: "b4dd64f2-649f-4bfd-88c8-126d3f774887",
                          refId: "f03b8adb-a5c4-458e-b120-4df079060d7c",
                          colname: "level6",
                          isMaster: true,
                          children: []
                        }
                      ],
                      isMaster: true
                    }
                  ]
                }
              ],
              isMaster: true
            }
          ]
        }
      ],
      isMaster: true
    }
  ]
};
