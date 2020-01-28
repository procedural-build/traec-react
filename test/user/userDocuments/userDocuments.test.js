import Im from "traec/immutable";
import UserDocuments from "../../../src/user/userDocuments";
import React from "react";
import { Provider } from "react-redux";
import { myDocumentsState } from "../../testData/documents";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";

const mockStore = configureStore([]);

xdescribe("UserDocument.areDocumentsLoading", () => {
  beforeEach(() => {
    let store = mockStore(myDocumentsState);
    let props = { trackerId: "537560d0-44a1-4662-993e-94c5795cb64c" };
    const component = renderer.create(
      <Provider store={store}>
        <UserDocuments {...props} />
      </Provider>
    );
  });

  it("should render with given state from Redux store", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
