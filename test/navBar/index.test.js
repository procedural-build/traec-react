import React from "react";
import { shallow } from "enzyme";
import { NavBar } from "../../src/navBar";
import DropdownLogin from "../../src/navBar/loginDropdown";

describe("NavBar", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<NavBar />)));

  it("should render three <div />s", () => {
    expect(wrapper.find("div").length).toEqual(3);
  });

  it("should render a <nav />", () => {
    expect(wrapper.find("nav").length).toEqual(1);
  });

  it("should render a <button />", () => {
    expect(wrapper.find("button").length).toEqual(1);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should contain dropdownLogin", () => {
    expect(wrapper.containsMatchingElement(<DropdownLogin />)).toEqual(true);
  });
});
