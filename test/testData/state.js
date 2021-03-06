import Traec from "traec";

export const TestState = {
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
};
