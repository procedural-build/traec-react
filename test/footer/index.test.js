import React from "react";
import { shallow } from "enzyme";
import { TraecFooter } from "../../src/footer";
import TestRenderer from "react-test-renderer";
jest.mock("react-router-dom", () => ({ Link: "Link" }));

describe("Footer", () => {
  it("should render three <Link />s", () => {
    const wrapper = shallow(<TraecFooter />);
    expect(wrapper.find("Link").length).toEqual(3);
    expect(wrapper.find("Link").get(0).props.to).toEqual("/news");
    expect(wrapper.find("Link").get(1).props.to).toEqual("/about");
    expect(wrapper.find("Link").get(2).props.to).toEqual("/help");
  });

  it("should match snapshot", () => {
    const testRenderer = TestRenderer.create(<TraecFooter />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
