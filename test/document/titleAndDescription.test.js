import React from "react";
import { TitleAndDescription } from "traec-react/documents/titleAndDescription";
import Im from "traec/immutable";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

const data = Im.fromJS({
  title: "I am a title for the TitleDescription component",
  text: "I am text for the titleDescription component"
});
describe("TitleAndDescription cards", () => {
  it("should render the card", () => {
    const wrapper = shallow(<TitleAndDescription description={data} />);
    expect(wrapper.find("h2").text()).toEqual("I am a title for the TitleDescription component");
  });
});
