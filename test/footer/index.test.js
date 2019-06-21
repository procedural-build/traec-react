import React from "react";
import { shallow } from "enzyme";
import { TraecFooter } from "../../src/footer";

describe("Footer", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<TraecFooter />)));

  it("should render three <div />s", () => {
    expect(wrapper.find("div").length).toEqual(6);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
