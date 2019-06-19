import React from "react";
import { shallow } from "enzyme";
import { SideBar } from "../../src/sideBar";
import { Link } from "react-router-dom";
import Octicon from "react-octicon";

describe("SideBar", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<SideBar />)));

  it("should render a <div />", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });
});
