import Im from "traec/immutable";
import { mapStateToProps } from "../../../src/user/userRefs";

describe("User Refs mapStateToProps", () => {
  it("should return the user refs", () => {
    let expectedResult = {
      trackerIds: Im.Map({
        "537560d0-44a1-4662-993e-94c5795cb64c": "537560d0-44a1-4662-993e-94c5795cb64c",
        "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02": "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
        "e81832af-70db-4e8e-bfa5-0bf2152d3d11": "e81832af-70db-4e8e-bfa5-0bf2152d3d11"
      }),
      projectIds: Im.Map({
        "3a6f1905-2efb-400a-b305-3243f9ff657e": "3a6f1905-2efb-400a-b305-3243f9ff657e",
        "730c60ce-509c-4909-a360-2841798eab7c": "730c60ce-509c-4909-a360-2841798eab7c",
        "7c3fc288-9f40-463f-acac-dca47b74de33": "7c3fc288-9f40-463f-acac-dca47b74de33"
      }),
      userRefs: [
        {
          title: "ENV 1.1 Livscyklusvurdering (LCA) - Miljøpåvirkninger",
          project: Im.Map({
            meta_json: Im.Map({}),
            NLA: null,
            suburb: "",
            app_host: null,
            created: "2019-08-27T08:14:16.936605",
            name: "DGNB NKB16",
            client: "",
            creator: Im.Map({
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            }),
            closed: false,
            postcode: "",
            uid: "730c60ce-509c-4909-a360-2841798eab7c",
            state: "",
            address: "",
            country: "",
            trackers: Im.List([
              Im.Map({
                uid: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
                name: "dgnb_tool"
              })
            ]),
            company: Im.Map({
              uid: "7551772c-13d0-4024-8985-fd2e5e87e7f8",
              name: "BIG",
              depth: 1
            }),
            default_workflow: "e6c5d5bb-898c-4ef8-8161-b01f9a538245",
            host_site: 14
          }),
          company: "BIG",
          status: Im.Map({ uid: null, name: null, color: null }),
          commitId: "e3d55286-a6cb-4273-af2f-4336e033cbe8",
          trackerId: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02"
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
        },
        "b98ef89a-c631-419b-a9ca-ec8d2fad3f97": {
          uid: "b98ef89a-c631-419b-a9ca-ec8d2fad3f97",
          name: "master",
          tracker: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
          project: "730c60ce-509c-4909-a360-2841798eab7c",
          depth: 3,
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "113705f7-7306-4a08-9dff-eb22196fa8a3",
              name: "566e6a8b206e523ba18155fe70a01e52bb7b8087"
            },
            is_staging: true,
            created: "2019-08-27T08:51:35.054181",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "e3d55286-a6cb-4273-af2f-4336e033cbe8",
            discipline: "c1c91f73-caec-43d2-afb4-84301f6f16f5",
            reporting_period: null,
            status: {
              uid: null,
              name: null,
              color: null
            },
            ref: "b98ef89a-c631-419b-a9ca-ec8d2fad3f97",
            root_commit: "e3d55286-a6cb-4273-af2f-4336e033cbe8",
            reporting_period_data: {
              uid: null,
              startDate: null,
              endDate: null,
              previous: null,
              meta_json: null
            },
            previous: null,
            tracker: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
            due_date: null,
            project: "730c60ce-509c-4909-a360-2841798eab7c",
            forced_by: null,
            comment: ""
          }
        },
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
        "9b0ea3fd-36bf-45b8-a57d-7874a54b9111": {
          uid: "9b0ea3fd-36bf-45b8-a57d-7874a54b9111",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "804a2aea-2625-4b79-aeaa-579bd3fca930",
              name: "0bd00c87b384234a761f30bb766283fe62f94de0"
            },
            is_staging: true,
            created: "2019-08-27T08:57:22.947449",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "40deaf56-3695-478f-9a83-6101d39c0b1b",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "9b0ea3fd-36bf-45b8-a57d-7874a54b9111",
            root_commit: "40deaf56-3695-478f-9a83-6101d39c0b1b",
            previous: null,
            tracker: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
            due_date: null,
            project: "730c60ce-509c-4909-a360-2841798eab7c",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
          depth: 4,
          project: "730c60ce-509c-4909-a360-2841798eab7c"
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
        "ad2a8281-a714-4444-8dd4-bc543b2e8606": {
          uid: "ad2a8281-a714-4444-8dd4-bc543b2e8606",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "c4792220-96f0-4d43-8b36-6968fcc49719",
              name: "e8b2f1a68e90164adfe8b7f3d11e6cc2e6ce2f88"
            },
            is_staging: true,
            created: "2019-08-27T08:59:15.513297",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "972e2acf-4cde-475d-815c-5ec10bf2c0d8",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "ad2a8281-a714-4444-8dd4-bc543b2e8606",
            root_commit: "972e2acf-4cde-475d-815c-5ec10bf2c0d8",
            previous: null,
            tracker: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
            due_date: null,
            project: "730c60ce-509c-4909-a360-2841798eab7c",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
          depth: 4,
          project: "730c60ce-509c-4909-a360-2841798eab7c"
        },
        "ee493c97-5eba-4e53-92d1-1dda20588ad6": {
          uid: "ee493c97-5eba-4e53-92d1-1dda20588ad6",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "5eff603e-5a2b-4958-b412-1c54386842bc",
              name: "336c597ec5bf4dca2ed5601a601bb1a32cc14d9b"
            },
            is_staging: true,
            created: "2019-08-27T08:59:42.435330",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "598f049e-d9c7-4508-943d-695be66cf73f",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "ee493c97-5eba-4e53-92d1-1dda20588ad6",
            root_commit: "598f049e-d9c7-4508-943d-695be66cf73f",
            previous: null,
            tracker: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
            due_date: null,
            project: "730c60ce-509c-4909-a360-2841798eab7c",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
          depth: 4,
          project: "730c60ce-509c-4909-a360-2841798eab7c"
        },
        "b2c7a483-2cde-4681-90bf-2032d03c1489": {
          uid: "b2c7a483-2cde-4681-90bf-2032d03c1489",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "eec34bbb-9951-404a-9be2-522222bca952",
              name: "2ad9671b6046ce556efd32dcf646838828cf202e"
            },
            is_staging: true,
            created: "2019-08-27T08:58:41.834210",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "cc768b37-8937-4a20-8955-5135323e128e",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "b2c7a483-2cde-4681-90bf-2032d03c1489",
            root_commit: "cc768b37-8937-4a20-8955-5135323e128e",
            previous: null,
            tracker: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
            due_date: null,
            project: "730c60ce-509c-4909-a360-2841798eab7c",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
          depth: 4,
          project: "730c60ce-509c-4909-a360-2841798eab7c"
        },
        "61c79348-11d8-4aee-adc0-1ffea3098ee2": {
          uid: "61c79348-11d8-4aee-adc0-1ffea3098ee2",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "d8b976f5-feef-46eb-965c-3eb38e0c9d6a",
              name: "fd934454f5330c50a83b1f0cd914003a0cd5a812"
            },
            is_staging: true,
            created: "2019-08-27T08:58:14.234675",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "9f6ee49b-1520-4bfe-b779-57db2dbf81cb",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "61c79348-11d8-4aee-adc0-1ffea3098ee2",
            root_commit: "9f6ee49b-1520-4bfe-b779-57db2dbf81cb",
            previous: null,
            tracker: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
            due_date: null,
            project: "730c60ce-509c-4909-a360-2841798eab7c",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02",
          depth: 4,
          project: "730c60ce-509c-4909-a360-2841798eab7c"
        }
      }
    },
    commitBranches: {
      commit: {
        "e3d55286-a6cb-4273-af2f-4336e033cbe8": {
          branch: {
            "40deaf56-3695-478f-9a83-6101d39c0b1b": {
              byId: {
                "9083fbd9-06b7-45a1-9efe-64b79e32f739": {
                  uid: "9083fbd9-06b7-45a1-9efe-64b79e32f739",
                  commit: "e3d55286-a6cb-4273-af2f-4336e033cbe8",
                  target: {
                    ref: "9b0ea3fd-36bf-45b8-a57d-7874a54b9111",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "40deaf56-3695-478f-9a83-6101d39c0b1b"
                }
              }
            },
            "9f6ee49b-1520-4bfe-b779-57db2dbf81cb": {
              byId: {
                "48730a2f-4583-4e3b-bfab-45ec7f741f1a": {
                  uid: "48730a2f-4583-4e3b-bfab-45ec7f741f1a",
                  commit: "e3d55286-a6cb-4273-af2f-4336e033cbe8",
                  target: {
                    ref: "61c79348-11d8-4aee-adc0-1ffea3098ee2",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "9f6ee49b-1520-4bfe-b779-57db2dbf81cb"
                }
              }
            },
            "cc768b37-8937-4a20-8955-5135323e128e": {
              byId: {
                "8c71d042-7248-4189-9cf4-b907e512840b": {
                  uid: "8c71d042-7248-4189-9cf4-b907e512840b",
                  commit: "e3d55286-a6cb-4273-af2f-4336e033cbe8",
                  target: {
                    ref: "b2c7a483-2cde-4681-90bf-2032d03c1489",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "cc768b37-8937-4a20-8955-5135323e128e"
                }
              }
            },
            "972e2acf-4cde-475d-815c-5ec10bf2c0d8": {
              byId: {
                "193f28e5-a9e1-4465-952c-619893bdf8b6": {
                  uid: "193f28e5-a9e1-4465-952c-619893bdf8b6",
                  commit: "e3d55286-a6cb-4273-af2f-4336e033cbe8",
                  target: {
                    ref: "ad2a8281-a714-4444-8dd4-bc543b2e8606",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "972e2acf-4cde-475d-815c-5ec10bf2c0d8"
                }
              }
            },
            "598f049e-d9c7-4508-943d-695be66cf73f": {
              byId: {
                "66831733-28a2-4f51-81fa-98320f72d787": {
                  uid: "66831733-28a2-4f51-81fa-98320f72d787",
                  commit: "e3d55286-a6cb-4273-af2f-4336e033cbe8",
                  target: {
                    ref: "ee493c97-5eba-4e53-92d1-1dda20588ad6",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "598f049e-d9c7-4508-943d-695be66cf73f"
                }
              }
            }
          }
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
              "http://traec-dev-eu-central-1-secure.s3.amazonaws.com/media/secure/tracker/9ef2f2ef-3099-48dc-89e2-86fd80f6ce02/objects/c4/a9/46/f77d21a9b2b8cb099fdda2c3f2e2df58bf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIO6J5ZOFAZABAGNQ%2F20191021%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20191021T101746Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=cf1fc3bdd2cc54ab3d5ce32d60303827844b09f2d099f0d69c01beca9bb9722a",
            virus_checked: true,
            commit: "40deaf56-3695-478f-9a83-6101d39c0b1b"
          },
          due_date: "2019-10-29T00:00:00",
          discipline_id: "c1c91f73-caec-43d2-afb4-84301f6f16f5"
        }
      }
    },
    user: {
      refs: {
        byId: {
          "b98ef89a-c631-419b-a9ca-ec8d2fad3f97": {
            uid: "b98ef89a-c631-419b-a9ca-ec8d2fad3f97"
          }
        }
      },
      documents: {
        byId: {
          "d31a5187-f93a-4b3e-a4f3-3ce9e82ad697": {
            uid: "d31a5187-f93a-4b3e-a4f3-3ce9e82ad697",
            status: "3494b735-55c6-449c-8557-63624448956c",
            description: "aada7a27-6cab-46ae-a400-ca7c3cf31a3f",
            trackerId: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02"
          }
        }
      }
    },
    companyInvites: {
      byId: {}
    },
    projectInvites: {
      byId: {}
    },
    metricScores: {
      byId: {
        "d59b4890-a016-424c-8a42-9a4954dc1a72": {
          period: -1,
          from_date: null,
          parameters: {
            uid: "d4660e90-382b-466a-9922-e53f47e11574",
            params_json: {
              max: "700",
              weight: "7",
              threshold: "70"
            }
          },
          freq_unit: null,
          uid: "d59b4890-a016-424c-8a42-9a4954dc1a72",
          is_forecast: false,
          metric: "b65f6b87-e69a-44af-b905-c30a7a3c0fcc",
          freq_num: 1,
          required: false
        }
      }
    },
    baseMetrics: {
      byId: {
        "b65f6b87-e69a-44af-b905-c30a7a3c0fcc": {
          uid: "b65f6b87-e69a-44af-b905-c30a7a3c0fcc",
          unit: "Number",
          category: "ENV1.1",
          parentmetric: null,
          name: "ENV 1.1 Livscyklusvurdering (LCA) - Miljøpåvirkninger",
          description: "",
          fuel: ""
        }
      }
    },
    trees: {
      byId: {
        "113705f7-7306-4a08-9dff-eb22196fa8a3": {
          uid: "113705f7-7306-4a08-9dff-eb22196fa8a3",
          name: "566e6a8b206e523ba18155fe70a01e52bb7b8087"
        },
        "7d46cb74-ee32-4c2c-adbb-8285f05ac027": {
          uid: "7d46cb74-ee32-4c2c-adbb-8285f05ac027",
          name: "566e6a8b206e523ba18155fe70a01e52bb7b8087"
        }
      }
    },
    descriptions: {
      byId: {
        "af6dd29b-fcfd-45f1-875a-951cd428b33b": {
          uid: "af6dd29b-fcfd-45f1-875a-951cd428b33b",
          title: "ENV 1.1 Livscyklusvurdering (LCA) - Miljøpåvirkninger",
          text:
            '<p>Der udf&oslash;res en LCA i LCA Byg. Vurderingen indeholder data for de faser, der fremg&aring;r af Figuren nedenfor. Processerne A1-A3, B4, C3-C4 og D er rettet imod materialeforbruget i bygningen, mens proces B6 er rettet imod driftsenergien i brugsfasen.</p>\n<p>[INSERT FIGURE - FIG. 4]</p>\n<p>Illustration af bygningens livscyklusfaser og definition af hvilke processer, der indg&aring;r i livscyklusvurderingen, er markeret med fed.</p>\n<p><strong>Betragtningsperiode</strong></p>\n<p>Betragtningsperioden, td, i del 1 er 50 &aring;r.</p>\n<p>Betragtningsperioden, td, i del 2 er 80 &aring;r.</p>\n<p><strong>Den vurderede bygning</strong></p>\n<p>De reelle v&aelig;rdier findes ved hj&aelig;lp af "Metodebeskrivelse&rdquo; (Bilag 1).</p>\n<p>Alene bygningsrelateret driftsenergi beregnes (varmeforbrug og bygningsrelateret elforbrug).</p>\n<p><strong>Referencebygning</strong></p>\n<ul>\n<li>Referencev&aelig;rdierne (R), som anvendes til beregning af point, er en samlet v&aelig;rdi som best&aring;r hhv. af:</li>\n<li>Referencev&aelig;rdi for bygningens (materialernes) bidrag, fastlagt og fremg&aring;r af Tabel 2.</li>\n<li>Referencev&aelig;rdi for driftsenergiforbrugets bidrag, dynamisk v&aelig;rdi, fastlagt i henhold til BR 15 (beregnes i Be15).</li>\n</ul>\n<p>Referencev&aelig;rdierne beregnes i LCA-v&aelig;rkt&oslash;jet. N&aelig;rmere beskrivelse findes ved hj&aelig;lp af "Overordnet beskrivelse af metoden&rdquo;, Bilag 1,</p>',
          created: "2019-08-27T08:51:35.088313",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          }
        },
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
    },
    commitEdges: {
      byId: {
        "e3d55286-a6cb-4273-af2f-4336e033cbe8": {
          trees: {
            "113705f7-7306-4a08-9dff-eb22196fa8a3": {
              categories: {
                "9083fbd9-06b7-45a1-9efe-64b79e32f739": {
                  uid: "9083fbd9-06b7-45a1-9efe-64b79e32f739",
                  commit: "e3d55286-a6cb-4273-af2f-4336e033cbe8",
                  target: {
                    ref: "9b0ea3fd-36bf-45b8-a57d-7874a54b9111",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "40deaf56-3695-478f-9a83-6101d39c0b1b"
                },
                "48730a2f-4583-4e3b-bfab-45ec7f741f1a": {
                  uid: "48730a2f-4583-4e3b-bfab-45ec7f741f1a",
                  commit: "e3d55286-a6cb-4273-af2f-4336e033cbe8",
                  target: {
                    ref: "61c79348-11d8-4aee-adc0-1ffea3098ee2",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "9f6ee49b-1520-4bfe-b779-57db2dbf81cb"
                },
                "8c71d042-7248-4189-9cf4-b907e512840b": {
                  uid: "8c71d042-7248-4189-9cf4-b907e512840b",
                  commit: "e3d55286-a6cb-4273-af2f-4336e033cbe8",
                  target: {
                    ref: "b2c7a483-2cde-4681-90bf-2032d03c1489",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "cc768b37-8937-4a20-8955-5135323e128e"
                },
                "193f28e5-a9e1-4465-952c-619893bdf8b6": {
                  uid: "193f28e5-a9e1-4465-952c-619893bdf8b6",
                  commit: "e3d55286-a6cb-4273-af2f-4336e033cbe8",
                  target: {
                    ref: "ad2a8281-a714-4444-8dd4-bc543b2e8606",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "972e2acf-4cde-475d-815c-5ec10bf2c0d8"
                },
                "66831733-28a2-4f51-81fa-98320f72d787": {
                  uid: "66831733-28a2-4f51-81fa-98320f72d787",
                  commit: "e3d55286-a6cb-4273-af2f-4336e033cbe8",
                  target: {
                    ref: "ee493c97-5eba-4e53-92d1-1dda20588ad6",
                    commit: null
                  },
                  heads: {
                    master: true,
                    user: true
                  },
                  branchId: "598f049e-d9c7-4508-943d-695be66cf73f"
                }
              },
              parent: null,
              trees: ["7d46cb74-ee32-4c2c-adbb-8285f05ac027"],
              descriptions: ["af6dd29b-fcfd-45f1-875a-951cd428b33b"]
            },
            null: {
              trees: ["113705f7-7306-4a08-9dff-eb22196fa8a3"]
            },
            "7d46cb74-ee32-4c2c-adbb-8285f05ac027": {
              parent: "113705f7-7306-4a08-9dff-eb22196fa8a3",
              metricScores: ["d59b4890-a016-424c-8a42-9a4954dc1a72"]
            }
          }
        }
      }
    }
  }
});
