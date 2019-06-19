import React from "react";
import { shallow } from "enzyme";
import { Footer } from "../../src/footer";

describe("Footer", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Footer />)));

  it("should render three <div />s", () => {
    expect(wrapper.find("div").length).toEqual(3);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
