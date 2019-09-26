import { constructDataTree } from "../src/utils/constructDataTree";
//import {TestState} from "./testData/state";
import Im from "traec/immutable";

describe("Construct Data Tree", () => {
  it("Test Case A", () => {
    let allCommitIds = new Set();
    let trackerId = "67d0cbdd-796c-41b3-aed5-f3ce5837bec8";
    let rootMasterId = TestStateA.getInPath(`entities.trackers.byId.${trackerId}.root_master`);
    let rootCommitId = TestStateA.getInPath(`entities.refs.byId.${rootMasterId}.latest_commit.root_commit`);
    let data =
      rootCommitId && rootMasterId ? constructDataTree(TestStateA, rootMasterId, rootCommitId, allCommitIds) : null;

    expect(data.toJS()).toEqual(resultStateA);
  });
});

export const TestStateA = Im.fromJS({
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
          category: "ECO",
          parentmetric: null,
          name: "ECO",
          description: "",
          fuel: ""
        },
        "b72a40cf-e1ce-4b26-a679-4ff4fcd1ce18": {
          uid: "b72a40cf-e1ce-4b26-a679-4ff4fcd1ce18",
          unit: "Number",
          category: "ECO 2",
          parentmetric: null,
          name: "Test 2",
          description: "",
          fuel: ""
        },
        "1854eaba-60dd-40f6-9cec-4a205a55417b": {
          uid: "1854eaba-60dd-40f6-9cec-4a205a55417b",
          unit: "Number",
          category: "ECO 1",
          parentmetric: null,
          name: "T1",
          description: "",
          fuel: ""
        },
        "b11c7281-40f1-4f7c-9696-bd8eaa1abf67": {
          uid: "b11c7281-40f1-4f7c-9696-bd8eaa1abf67",
          unit: "Number",
          category: "ECO 1.2",
          parentmetric: null,
          name: "T1.2",
          description: "",
          fuel: ""
        },
        "6297dc32-6002-4247-baab-f13bd25c8ff6": {
          uid: "6297dc32-6002-4247-baab-f13bd25c8ff6",
          unit: "Number",
          category: "ECO 1.1",
          parentmetric: null,
          name: "T1.1",
          description: "",
          fuel: ""
        },
        "8edd0df6-80ff-48f3-bc8f-f1decba111b2": {
          uid: "8edd0df6-80ff-48f3-bc8f-f1decba111b2",
          unit: "Number",
          category: "ECO 2.1",
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

const resultStateA = {
  name: "master",
  refId: "72384461-e033-44d0-a57e-366ed1b11ad0",
  children: [
    {
      name: "ECO",
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
              name: "ECO 1",
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
                      name: "ECO 1.2",
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
                      name: "ECO 1.1",
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
              name: "ECO 2",
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
                      name: "ECO 2.1",
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
