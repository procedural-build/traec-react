import { myDocumentsState } from "../../testData/documents";
import { mapStateToProps } from "../../../src/user/userDocuments";
import Im from "traec/immutable";

describe("mapStateToProps", () => {
  it("should give correct data", () => {
    let ownProps = {};
    let actualResult = mapStateToProps(myDocumentsState, ownProps);
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
      documents: [
        {
          title: "Doc 1",
          status: Im.Map({
            uid: "f84b9324-ea4e-4ede-bb95-7a0655f8b2b5",
            name: "OK for Submission",
            color: "#99EB99"
          }),
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
          company: "BIG"
        }
      ],
      singleTracker: false
    };
    expect(actualResult).toEqual(expectedResult);
  });

  it("should only return from one tracker", () => {
    let ownProps = { trackerId: "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02" };
    let actualResult = mapStateToProps(myDocumentsState, ownProps);
    let expectedResult = {
      trackerIds: Im.Map({
        "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02": "9ef2f2ef-3099-48dc-89e2-86fd80f6ce02"
      }),
      projectIds: Im.Map({
        "3a6f1905-2efb-400a-b305-3243f9ff657e": "3a6f1905-2efb-400a-b305-3243f9ff657e",
        "730c60ce-509c-4909-a360-2841798eab7c": "730c60ce-509c-4909-a360-2841798eab7c",
        "7c3fc288-9f40-463f-acac-dca47b74de33": "7c3fc288-9f40-463f-acac-dca47b74de33"
      }),
      documents: [
        {
          title: "Doc 1",
          status: Im.Map({
            uid: "f84b9324-ea4e-4ede-bb95-7a0655f8b2b5",
            name: "OK for Submission",
            color: "#99EB99"
          }),
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
          company: "BIG"
        }
      ],
      singleTracker: true
    };
    expect(actualResult).toEqual(expectedResult);
  });

  it("should return empty when no trackers", () => {
    let ownProps = {};
    let state = myDocumentsState;
    state = state.deleteIn(["entities", "trackers"]);
    state = state.deleteIn(["entities", "user"]);
    let actualResult = mapStateToProps(state, ownProps);
    let expectedResult = {
      trackerIds: Im.Map({}),
      projectIds: Im.Map({
        "3a6f1905-2efb-400a-b305-3243f9ff657e": "3a6f1905-2efb-400a-b305-3243f9ff657e",
        "730c60ce-509c-4909-a360-2841798eab7c": "730c60ce-509c-4909-a360-2841798eab7c",
        "7c3fc288-9f40-463f-acac-dca47b74de33": "7c3fc288-9f40-463f-acac-dca47b74de33"
      }),
      documents: [],
      singleTracker: false
    };
    expect(actualResult).toEqual(expectedResult);
  });
});
