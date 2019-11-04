import { documentsState } from "../../testData/documents";
import { getDocumentsFromState } from "../../../src/user/userDocuments";

describe("get documents from state", () => {
  it("Should give back the documents", () => {
    let actualResult = getDocumentsFromState(documentsState);
    let expectedResult = [{ title: "Doc 1", status: null }, { title: "Doc 2", status: null }];
    expect(actualResult).toEqual(expectedResult);
  });
});
