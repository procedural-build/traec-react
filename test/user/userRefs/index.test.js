import Im from "traec/immutable";
import { mapStateToProps } from "../../../src/user/userRefs";

describe("User Refs mapStateToProps", () => {
  it("should return the user refs", () => {
    let expectedResult = {
      trackerIds: Im.Map({
        "537560d0-44a1-4662-993e-94c5795cb64c": "537560d0-44a1-4662-993e-94c5795cb64c",
        "e81832af-70db-4e8e-bfa5-0bf2152d3d11": "e81832af-70db-4e8e-bfa5-0bf2152d3d11",
        "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02": "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02"
      }),
      projectIds: Im.Map({
        "3a6f1905-2efb-400a-b305-3243f9ff657e": "3a6f1905-2efb-400a-b305-3243f9ff657e",
        "730c60ce-509c-4909-a360-2841798eab7c": "730c60ce-509c-4909-a360-2841798eab7c",
        "7c3fc288-9f40-463f-acac-dca47b74de33": "7c3fc288-9f40-463f-acac-dca47b74de33"
      }),
      userRefs: [
        {
          title: "master",
          project: Im.Map({
            meta_json: Im.Map({}),
            NLA: null,
            suburb: "",
            app_host: null,
            created: "2019-08-24T06:02:37.653447",
            name: "Test Company",
            client: "",
            creator: Im.Map({
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            }),
            closed: false,
            postcode: "",
            uid: "7c3fc288-9f40-463f-acac-dca47b74de33",
            state: "",
            address: "",
            country: "",
            trackers: Im.List([
              Im.Map({
                uid: "e81832af-70db-4e8e-bfa5-0bf2152d3d11",
                name: "dgnb_tool"
              })
            ]),
            company: Im.Map({
              uid: "ed63b358-d3e5-4db1-af52-f15de1d52c31",
              name: "Test",
              depth: 1
            }),
            default_workflow: "cdd5ff4c-6877-4f96-8118-e0492b871f9f",
            host_site: 14
          }),
          company: "Test",
          status: null
        }
      ]
    };
    let actualResult = mapStateToProps(state);

    expect(actualResult).toEqual(expectedResult);
  });
});

let state = Im.fromJS({
  ui: {
    navbar: {
      items: [
        {
          label: "Home",
          to: "/"
        }
      ]
    }
  },
  entities: {
    refs: {
      byId: {
        "473a1322-2391-412d-a7a7-e5514cf94902": {
          uid: "473a1322-2391-412d-a7a7-e5514cf94902",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "4bb50823-4cb7-4c5e-b571-035981815886",
              name: "root"
            },
            is_staging: true,
            created: "2019-09-04T11:48:56.994679",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "94249f1f-b2c6-4d97-8a45-977d0c3527eb",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "473a1322-2391-412d-a7a7-e5514cf94902",
            root_commit: "94249f1f-b2c6-4d97-8a45-977d0c3527eb",
            previous: null,
            tracker: "537560d0-44a1-4662-993e-94c5795cb64c",
            due_date: null,
            project: "3a6f1905-2efb-400a-b305-3243f9ff657e",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "537560d0-44a1-4662-993e-94c5795cb64c",
          depth: 1,
          project: "3a6f1905-2efb-400a-b305-3243f9ff657e"
        },
        "dff11852-1926-470f-96ce-27d42586adfd": {
          uid: "dff11852-1926-470f-96ce-27d42586adfd",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "65b080a2-ea06-4ff9-bfdf-e5d6facfa573",
              name: "root"
            },
            is_staging: true,
            created: "2019-08-24T06:02:37.817361",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "53f89992-3c46-4944-a069-4c0303099a61",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "dff11852-1926-470f-96ce-27d42586adfd",
            root_commit: "53f89992-3c46-4944-a069-4c0303099a61",
            previous: null,
            tracker: "e81832af-70db-4e8e-bfa5-0bf2152d3d11",
            due_date: null,
            project: "7c3fc288-9f40-463f-acac-dca47b74de33",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "e81832af-70db-4e8e-bfa5-0bf2152d3d11",
          depth: 1,
          project: "7c3fc288-9f40-463f-acac-dca47b74de33"
        },
        "0f49b3f3-2aff-4ef2-8141-508693c183ca": {
          uid: "0f49b3f3-2aff-4ef2-8141-508693c183ca",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "41cc9a14-2211-4dd3-8d31-acf20ce27917",
              name: "root"
            },
            is_staging: true,
            created: "2019-08-27T08:14:17.064532",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "094b10d9-d134-424e-85ea-09fe46f985f1",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "0f49b3f3-2aff-4ef2-8141-508693c183ca",
            root_commit: "094b10d9-d134-424e-85ea-09fe46f985f1",
            previous: null,
            tracker: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
            due_date: null,
            project: "730c60ce-509c-4909-a360-2841798eab7c",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
          depth: 1,
          project: "730c60ce-509c-4909-a360-2841798eab7c"
        }
      }
    },
    docStatus: {
      byId: {
        "3494b735-55c6-449c-8557-63624448956c": {
          uid: "3494b735-55c6-449c-8557-63624448956c",
          status: {
            uid: "f84b9324-ea4e-4ede-bb95-7a0655f8b2b5",
            name: "OK for Submission",
            color: "#99EB99"
          },
          current_object: {
            uid: "9351a43f-f716-4c67-8909-f766c7d320c0",
            filename: "Tasks stages bar styles.pdf",
            created: "2019-10-16T09:42:14.405158",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            url:
              "http://traec-dev-eu-central-1-secure.s3.amazonaws.com/media/secure/tracker/9ef2f2ef-3099-48dc-89e2-86fd80f6ce02/objects/c4/a9/46/f77d21a9b2b8cb099fdda2c3f2e2df58bf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIO6J5ZOFAZABAGNQ%2F20191017%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20191017T082447Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=550f8c34db8df184dc7c28c55067f310b61eea030114a2c737cf9abbab1d65c9",
            virus_checked: true,
            commit: "40deaf56-3695-478f-9a83-6101d39c0b1b"
          },
          due_date: "2019-10-25T00:00:00",
          discipline_id: "c1c91f73-caec-43d2-afb4-84301f6f16f5"
        }
      }
    },
    user: {
      documents: {
        byId: {
          "d31a5187-f93a-4b3e-a4f3-3ce9e82ad697": {
            uid: "d31a5187-f93a-4b3e-a4f3-3ce9e82ad697",
            status: "3494b735-55c6-449c-8557-63624448956c",
            description: "aada7a27-6cab-46ae-a400-ca7c3cf31a3f",
            trackerId: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02"
          }
        }
      },
      refs: { byId: { "dff11852-1926-470f-96ce-27d42586adfd": { uid: "dff11852-1926-470f-96ce-27d42586adfd" } } }
    },
    companyInvites: {
      byId: {}
    },
    projectInvites: {
      byId: {}
    },
    descriptions: {
      byId: {
        "aada7a27-6cab-46ae-a400-ca7c3cf31a3f": {
          uid: "aada7a27-6cab-46ae-a400-ca7c3cf31a3f",
          title: "doc 1",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-09-02T08:34:15.606917"
        }
      }
    },
    projects: {
      byId: {
        "3a6f1905-2efb-400a-b305-3243f9ff657e": {
          meta_json: {},
          NLA: null,
          suburb: "",
          app_host: null,
          created: "2019-09-04T11:48:56.736174",
          name: "ENV Demo",
          client: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          closed: false,
          postcode: "",
          uid: "3a6f1905-2efb-400a-b305-3243f9ff657e",
          state: "",
          address: "",
          country: "",
          trackers: [
            {
              uid: "537560d0-44a1-4662-993e-94c5795cb64c",
              name: "dgnb_tool"
            }
          ],
          company: {
            uid: "ed63b358-d3e5-4db1-af52-f15de1d52c31",
            name: "Test",
            depth: 1
          },
          default_workflow: "f0f293d2-4cf8-4c1c-b4b1-4855d11ffef7",
          host_site: 14
        },
        "730c60ce-509c-4909-a360-2841798eab7c": {
          meta_json: {},
          NLA: null,
          suburb: "",
          app_host: null,
          created: "2019-08-27T08:14:16.936605",
          name: "DGNB NKB16",
          client: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          closed: false,
          postcode: "",
          uid: "730c60ce-509c-4909-a360-2841798eab7c",
          state: "",
          address: "",
          country: "",
          trackers: [
            {
              uid: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
              name: "dgnb_tool"
            }
          ],
          company: {
            uid: "7551772c-13d0-4024-8985-fd2e5e87e7f8",
            name: "BIG",
            depth: 1
          },
          default_workflow: "e6c5d5bb-898c-4ef8-8161-b01f9a538245",
          host_site: 14
        },
        "7c3fc288-9f40-463f-acac-dca47b74de33": {
          meta_json: {},
          NLA: null,
          suburb: "",
          app_host: null,
          created: "2019-08-24T06:02:37.653447",
          name: "Test Company",
          client: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          closed: false,
          postcode: "",
          uid: "7c3fc288-9f40-463f-acac-dca47b74de33",
          state: "",
          address: "",
          country: "",
          trackers: [
            {
              uid: "e81832af-70db-4e8e-bfa5-0bf2152d3d11",
              name: "dgnb_tool"
            }
          ],
          company: {
            uid: "ed63b358-d3e5-4db1-af52-f15de1d52c31",
            name: "Test",
            depth: 1
          },
          default_workflow: "cdd5ff4c-6877-4f96-8118-e0492b871f9f",
          host_site: 14
        }
      }
    },
    trackers: {
      byId: {
        "537560d0-44a1-4662-993e-94c5795cb64c": {
          created: "2019-09-04T11:48:56.962304",
          alt_root_masters: {},
          name: "dgnb_tool",
          from_template: null,
          is_template: false,
          uid: "537560d0-44a1-4662-993e-94c5795cb64c",
          project: {
            uid: "3a6f1905-2efb-400a-b305-3243f9ff657e",
            name: "ENV Demo"
          },
          is_public: false,
          root_master: "473a1322-2391-412d-a7a7-e5514cf94902"
        },
        "e81832af-70db-4e8e-bfa5-0bf2152d3d11": {
          created: "2019-08-24T06:02:37.794690",
          alt_root_masters: {},
          name: "dgnb_tool",
          from_template: null,
          is_template: false,
          uid: "e81832af-70db-4e8e-bfa5-0bf2152d3d11",
          project: {
            uid: "7c3fc288-9f40-463f-acac-dca47b74de33",
            name: "Test Company"
          },
          is_public: false,
          root_master: "dff11852-1926-470f-96ce-27d42586adfd"
        },
        "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02": {
          created: "2019-08-27T08:14:17.050651",
          alt_root_masters: {},
          name: "dgnb_tool",
          from_template: null,
          is_template: false,
          uid: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
          project: {
            uid: "730c60ce-509c-4909-a360-2841798eab7c",
            name: "DGNB NKB16"
          },
          is_public: false,
          root_master: "0f49b3f3-2aff-4ef2-8141-508693c183ca"
        }
      }
    },
    companies: {
      byId: {
        "ed63b358-d3e5-4db1-af52-f15de1d52c31": {
          meta_json: "",
          suburb: "",
          parentid: null,
          name: "Test",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          postcode: "",
          uid: "ed63b358-d3e5-4db1-af52-f15de1d52c31",
          state: "",
          address: "",
          country: "",
          projects: [
            {
              uid: "7c3fc288-9f40-463f-acac-dca47b74de33",
              name: "Test Company"
            },
            {
              uid: "3a6f1905-2efb-400a-b305-3243f9ff657e",
              name: "ENV Demo"
            }
          ],
          childids: [],
          address2: ""
        },
        "7551772c-13d0-4024-8985-fd2e5e87e7f8": {
          meta_json: "",
          suburb: "Valby",
          parentid: null,
          name: "BIG",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          postcode: "2500",
          uid: "7551772c-13d0-4024-8985-fd2e5e87e7f8",
          state: "Copenhagen",
          address: "Kløverbladsgade 56",
          country: "Denmark",
          projects: [
            {
              uid: "730c60ce-509c-4909-a360-2841798eab7c",
              name: "DGNB NKB16"
            }
          ],
          childids: [],
          address2: ""
        }
      }
    },
    commits: {
      byId: {}
    }
  }
});
