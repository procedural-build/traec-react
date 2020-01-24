import Im from "traec/immutable";

export const documentsState = Im.fromJS({
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
            created: "2019-09-05T19:54:51.853377",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "5591f342-b9cf-4764-852b-a0eb105ccad1",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "0f49b3f3-2aff-4ef2-8141-508693c183ca",
            root_commit: "094b10d9-d134-424e-85ea-09fe46f985f1",
            previous: "6037b7f7-6c70-4881-8ab8-dcb78f4f6a94",
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
        "c47ea328-6bef-45f5-b467-de9b668b6a49": {
          uid: "c47ea328-6bef-45f5-b467-de9b668b6a49",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "3dec0b5d-47b2-4f6e-8561-85de1bc40d08",
              name: "root"
            },
            is_staging: true,
            created: "2019-09-07T12:43:08.904112",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "c303e7b8-82a2-4642-b422-c5859ca977d3",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "c47ea328-6bef-45f5-b467-de9b668b6a49",
            root_commit: "d199be64-78c7-4a11-ac80-66ce66648516",
            previous: "d199be64-78c7-4a11-ac80-66ce66648516",
            tracker: "acc13680-6967-4f11-8f71-3c812ff795ae",
            due_date: null,
            project: "b275763a-361a-47aa-b2ec-307c5f1849e2",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "acc13680-6967-4f11-8f71-3c812ff795ae",
          depth: 1,
          project: "b275763a-361a-47aa-b2ec-307c5f1849e2"
        }
      }
    },
    docStatus: {
      byId: {
        "0a39491c-a460-4e0b-937d-f060b8d16908": {
          uid: "0a39491c-a460-4e0b-937d-f060b8d16908",
          status: null,
          current_object: {
            uid: "f3e6d178-37f1-4ffc-8359-9eb04e6543d6",
            filename: "export.csv",
            created: "2019-10-07T13:44:39.159089",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            virus_checked: true,
            commit: "34855f1e-c1f9-49c2-af25-6207f21be1f7"
          },
          due_date: null,
          discipline_id: "c1c91f73-caec-43d2-afb4-84301f6f16f5"
        },
        "ff1e846f-35f4-4b8d-a02a-0f0a81de7ae2": {
          uid: "ff1e846f-35f4-4b8d-a02a-0f0a81de7ae2",
          status: null,
          current_object: null,
          due_date: null,
          discipline_id: "c1c91f73-caec-43d2-afb4-84301f6f16f5"
        }
      }
    },
    user: {
      documents: {
        byId: {
          "172a6449-eaf5-417d-99db-a6a9e5761c99": {
            uid: "172a6449-eaf5-417d-99db-a6a9e5761c99",
            status: "0a39491c-a460-4e0b-937d-f060b8d16908",
            description: "1696e80c-a96c-487c-bb04-0128883867c6"
          },
          "f7f61611-70f5-4f94-b325-2b5e6e63ce22": {
            uid: "f7f61611-70f5-4f94-b325-2b5e6e63ce22",
            status: "ff1e846f-35f4-4b8d-a02a-0f0a81de7ae2",
            description: "f58388e9-8740-4740-99e7-ef35f0d66ccf"
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
    descriptions: {
      byId: {
        "1696e80c-a96c-487c-bb04-0128883867c6": {
          uid: "1696e80c-a96c-487c-bb04-0128883867c6",
          title: "Doc 1",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-10-01T16:33:41.218298"
        },
        "f58388e9-8740-4740-99e7-ef35f0d66ccf": {
          uid: "f58388e9-8740-4740-99e7-ef35f0d66ccf",
          title: "Doc 2",
          text: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-10-07T14:35:18.315100"
        }
      }
    },
    projects: {
      byId: {
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
        },
        "b275763a-361a-47aa-b2ec-307c5f1849e2": {
          meta_json: {},
          NLA: null,
          suburb: "",
          app_host: null,
          created: "2019-09-07T12:42:13.618512",
          name: "Commits",
          client: "",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          closed: false,
          postcode: "",
          uid: "b275763a-361a-47aa-b2ec-307c5f1849e2",
          state: "",
          address: "",
          country: "",
          trackers: [
            {
              uid: "acc13680-6967-4f11-8f71-3c812ff795ae",
              name: "dgnb_tool"
            }
          ],
          company: {
            uid: "ed63b358-d3e5-4db1-af52-f15de1d52c31",
            name: "Test",
            depth: 1
          },
          default_workflow: "643c7177-4025-4f2f-9e8f-332456f823b4",
          host_site: 1
        }
      }
    },
    trackers: {
      byId: {
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
        },
        "acc13680-6967-4f11-8f71-3c812ff795ae": {
          created: "2019-09-07T12:42:13.717912",
          alt_root_masters: {},
          name: "dgnb_tool",
          from_template: null,
          is_template: false,
          uid: "acc13680-6967-4f11-8f71-3c812ff795ae",
          project: {
            uid: "b275763a-361a-47aa-b2ec-307c5f1849e2",
            name: "Commits"
          },
          is_public: false,
          root_master: "c47ea328-6bef-45f5-b467-de9b668b6a49"
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
              uid: "b275763a-361a-47aa-b2ec-307c5f1849e2",
              name: "Commits"
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

export const myDocumentsState = Im.fromJS({
  entities: {
    trackers: {
      byId: {
        "537560d0-44a1-4662-993e-94c5795cb64c": {
          created: "2019-09-04T11:48:56.962304",
          alt_root_masters: {},
          name: "dgnb_tool",
          errors: null,
          from_template: null,
          is_template: false,
          uid: "537560d0-44a1-4662-993e-94c5795cb64c",
          project: {
            uid: "3a6f1905-2efb-400a-b305-3243f9ff657e",
            name: "ENV Demo"
          },
          is_public: false,
          root_master: "473a1322-2391-412d-a7a7-e5514cf94902"
        }
      }
    },
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
        "0b0a235e-3dee-45de-bd9d-e8d9634849a0": {
          uid: "0b0a235e-3dee-45de-bd9d-e8d9634849a0",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "8ee39f2e-dee5-4914-a612-fa105de6ac2f",
              name: "cd31507b9f6d2e9309fd1681ac09b1eb66e2b878"
            },
            is_staging: true,
            created: "2019-09-04T12:25:29.113019",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "2a55799d-f3b3-4c94-8728-ab05fff142c8",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "0b0a235e-3dee-45de-bd9d-e8d9634849a0",
            root_commit: "2a55799d-f3b3-4c94-8728-ab05fff142c8",
            previous: null,
            tracker: "537560d0-44a1-4662-993e-94c5795cb64c",
            due_date: null,
            project: "3a6f1905-2efb-400a-b305-3243f9ff657e",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "537560d0-44a1-4662-993e-94c5795cb64c",
          depth: 4,
          project: "3a6f1905-2efb-400a-b305-3243f9ff657e"
        },
        "171c10d9-22b4-491f-a89b-a8967c2aa434": {
          uid: "171c10d9-22b4-491f-a89b-a8967c2aa434",
          name: "master",
          latest_commit: {
            meta_json: {},
            tree_root: {
              uid: "d82627e1-b4db-416d-a917-3bd85f877c3a",
              name: "fc9434eefcd188a45d07f46ed78c8d01e1b7bdf2"
            },
            is_staging: true,
            created: "2019-09-04T12:25:52.633927",
            creator: {
              first_name: "",
              last_name: "",
              email: "admin@ods-track.com",
              username: "admin"
            },
            uid: "9fcd463b-6171-4fe9-b6a5-107e5c133e59",
            discipline: null,
            reporting_period: null,
            status: null,
            ref: "171c10d9-22b4-491f-a89b-a8967c2aa434",
            root_commit: "9fcd463b-6171-4fe9-b6a5-107e5c133e59",
            previous: null,
            tracker: "537560d0-44a1-4662-993e-94c5795cb64c",
            due_date: null,
            project: "3a6f1905-2efb-400a-b305-3243f9ff657e",
            forced_by: null,
            comment: "(staging)"
          },
          tracker: "537560d0-44a1-4662-993e-94c5795cb64c",
          depth: 4,
          project: "3a6f1905-2efb-400a-b305-3243f9ff657e"
        }
      }
    },
    projectObjects: {
      byId: {
        "3a6f1905-2efb-400a-b305-3243f9ff657e": {
          disciplines: {
            "d5c4af7c-4428-43c0-8a21-a6a438db7e49": {
              uid: "d5c4af7c-4428-43c0-8a21-a6a438db7e49",
              name: "Administrator",
              approver: null,
              auth: {
                uid: "27188a14-55dd-4d66-97a8-096c31081a3d",
                is_admin: true,
                name: "Admin",
                policy_json: {}
              },
              project: {
                uid: "3a6f1905-2efb-400a-b305-3243f9ff657e",
                name: "ENV Demo"
              },
              base_uid: "c1c91f73-caec-43d2-afb4-84301f6f16f5"
            },
            "58257d94-0f38-4a64-9385-88dcdde86388": {
              uid: "58257d94-0f38-4a64-9385-88dcdde86388",
              name: "admin@ods-track.com",
              approver: null,
              auth: {
                uid: "27188a14-55dd-4d66-97a8-096c31081a3d",
                is_admin: true,
                name: "Admin",
                policy_json: {}
              },
              project: {
                uid: "3a6f1905-2efb-400a-b305-3243f9ff657e",
                name: "ENV Demo"
              },
              base_uid: "63348e8b-0082-4545-951e-3778ae5354d7"
            }
          }
        }
      }
    },
    user: {
      documents: {
        byId: {
          "044485fb-ef08-43c8-bd26-527ea87d22d4": {
            uid: "044485fb-ef08-43c8-bd26-527ea87d22d4",
            status: null,
            description: "4e886c66-3f5b-4964-b704-77ad334c89cf",
            trackerId: "537560d0-44a1-4662-993e-94c5795cb64c",
            refId: "0b0a235e-3dee-45de-bd9d-e8d9634849a0"
          },
          "0a71439a-ab60-44e0-ad19-e602af88dfbc": {
            uid: "0a71439a-ab60-44e0-ad19-e602af88dfbc",
            status: "a4d8d36f-74d1-4356-a642-bc62d2bf8630",
            description: "32cb8d4d-6889-45a3-a272-79d0a2677645",
            trackerId: "537560d0-44a1-4662-993e-94c5795cb64c",
            refId: "171c10d9-22b4-491f-a89b-a8967c2aa434"
          }
        }
      }
    },
    descriptions: {
      byId: {
        "4e886c66-3f5b-4964-b704-77ad334c89cf": {
          uid: "4e886c66-3f5b-4964-b704-77ad334c89cf",
          title: "fefwe",
          text: "<p>a</p>",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-10-21T10:44:12.779376"
        },
        "32cb8d4d-6889-45a3-a272-79d0a2677645": {
          uid: "32cb8d4d-6889-45a3-a272-79d0a2677645",
          title: "somrhing",
          text: "<p>fwk&aelig;lgfekew n&nbsp;</p>\n<p>&nbsp;</p>\n<p>#vsdkn</p>\n<p>#klnl</p>",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          created: "2019-10-28T09:37:47.113079"
        }
      }
    },
    docStatuses: {
      byId: {
        "a4d8d36f-74d1-4356-a642-bc62d2bf8630": {
          uid: "a4d8d36f-74d1-4356-a642-bc62d2bf8630",
          status: {
            uid: "f84b9324-ea4e-4ede-bb95-7a0655f8b2b5",
            name: "OK for Submission",
            color: "#99EB99"
          },
          current_object: "5e436020-80f3-410d-9be1-8f62cf968c97",
          due_date: null,
          discipline_id: null
        }
      }
    },
    docObjects: {
      byId: {
        "5e436020-80f3-410d-9be1-8f62cf968c97": {
          uid: "5e436020-80f3-410d-9be1-8f62cf968c97",
          filename: "AirTestVentCalc.xls",
          created: "2019-10-28T09:38:06.442965",
          creator: {
            first_name: "",
            last_name: "",
            email: "admin@ods-track.com",
            username: "admin"
          },
          virus_checked: true,
          commit: "9fcd463b-6171-4fe9-b6a5-107e5c133e59"
        }
      }
    }
  }
});
