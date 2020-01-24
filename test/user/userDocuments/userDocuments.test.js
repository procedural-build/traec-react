import Im from "traec/immutable";
import {UserDocuments} from "../../../src/user/userDocuments" 
import {shallow} from "enzyme";


let props;
befoerEach(() => {
  props = {
    disciplines: Im.Map({
      "d5c4af7c-4428-43c0-8a21-a6a438db7e49": Im.Map({
        uid: "d5c4af7c-4428-43c0-8a21-a6a438db7e49",
        name: "Administrator",
        approver: null,
        auth: Im.Map({
          uid: "27188a14-55dd-4d66-97a8-096c31081a3d",
          is_admin: true,
          name: "Admin",
          policy_json: Im.Map({})
        }),
        project: Im.Map({
          uid: "3a6f1905-2efb-400a-b305-3243f9ff657e",
          name: "ENV Demo"
        }),
        base_uid: "c1c91f73-caec-43d2-afb4-84301f6f16f5"
      }),
      "58257d94-0f38-4a64-9385-88dcdde86388": Im.Map({
        uid: "58257d94-0f38-4a64-9385-88dcdde86388",
        name: "admin@ods-track.com",
        approver: null,
        auth: Im.Map({
          uid: "27188a14-55dd-4d66-97a8-096c31081a3d",
          is_admin: true,
          name: "Admin",
          policy_json: Im.Map({})
        }),
        project: Im.Map({
          uid: "3a6f1905-2efb-400a-b305-3243f9ff657e",
          name: "ENV Demo"
        }),
        base_uid: "63348e8b-0082-4545-951e-3778ae5354d7"
      }),
      uid: Im.Map({
        name: "Unassigned"
      })
    }),
    docStatuses: Im.Map({
      "a4d8d36f-74d1-4356-a642-bc62d2bf8630": Im.Map({
        uid: "a4d8d36f-74d1-4356-a642-bc62d2bf8630",
        status: Im.Map({
          uid: "f84b9324-ea4e-4ede-bb95-7a0655f8b2b5",
          name: "OK for Submission",
          color: "#99EB99"
        }),
        current_object: "5e436020-80f3-410d-9be1-8f62cf968c97",
        due_date: null,
        discipline_id: null
      })
    }),
    documents: Im.Map({
      "044485fb-ef08-43c8-bd26-527ea87d22d4": Im.Map({
        uid: "044485fb-ef08-43c8-bd26-527ea87d22d4",
        status: null,
        description: "4e886c66-3f5b-4964-b704-77ad334c89cf",
        trackerId: "537560d0-44a1-4662-993e-94c5795cb64c",
        refId: "0b0a235e-3dee-45de-bd9d-e8d9634849a0"
      }),
      "0a71439a-ab60-44e0-ad19-e602af88dfbc": Im.Map({
        uid: "0a71439a-ab60-44e0-ad19-e602af88dfbc",
        status: "a4d8d36f-74d1-4356-a642-bc62d2bf8630",
        description: "32cb8d4d-6889-45a3-a272-79d0a2677645",
        trackerId: "537560d0-44a1-4662-993e-94c5795cb64c",
        refId: "171c10d9-22b4-491f-a89b-a8967c2aa434"
      })
    })
  };
})

describe("UserDocument.areDocumentsLoading", () => {

  it("Should return false", () => {
    const wrapper = shallow(<UserDocuments {...props}/>)
    expect(wrapper.instance().areDocumentsLoading()).toEqual(true);
  })
})