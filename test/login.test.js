import React from "react";
import { shallow } from "enzyme";
import { LoginForm, LoginField } from "../src/auth/form";
import TestRenderer from "react-test-renderer";

describe("Login Form Visuals", () => {
  const wrapper = shallow(<LoginForm dispatch={jest.fn()} />);

  it("should contain a form", () => {
    expect(wrapper.find("form").length).toBe(1);
  });

  it("should contain a Username", () => {
    expect(wrapper.find("button").length).toBe(1);
  });

  it("should redirect if authenticated", () => {
    const wrapperAuth = shallow(<LoginForm dispatch={jest.fn()} isAuthenticated={true} />);
    expect(wrapperAuth.find("Redirect").length).toBe(1);
    expect(wrapperAuth.find("Redirect").props().to).toBe("/accounts/profile");
  });
});

describe("Login Fields", () => {
  it("should render an input form with Username", () => {
    const wrapper = shallow(
      <LoginField attribute="username" placeholder="Username" onChange={jest.fn()} value="MyUser" errors={null} />
    );
    expect(wrapper.find("input").length).toBe(1);
    expect(wrapper.find("input").props().value).toBe("MyUser");
    expect(wrapper.find("input").props().type).toBe("text");
    expect(wrapper.find("input").props().placeholder).toBe("Username");
  });

  it("should render an input form with password", () => {
    const wrapper = shallow(
      <LoginField
        attribute="password"
        placeholder="Password"
        onChange={jest.fn()}
        helpBlock={jest.fn()}
        fieldType="password"
        value="myPW"
        errors={null}
      />
    );
    expect(wrapper.find("input").length).toBe(1);
    expect(wrapper.find("input").props().value).toBe("myPW");
    expect(wrapper.find("input").props().type).toBe("password");
    expect(wrapper.find("input").props().placeholder).toBe("Password");
  });

  it("should render an error", () => {
    const wrapper = shallow(
      <LoginField
        attribute="password"
        placeholder="Password"
        onChange={jest.fn()}
        helpBlock={jest.fn()}
        fieldType="password"
        value="myPW"
        errors={new Map().set("password", ["Failed to log in"])}
      />
    );
    expect(wrapper.find("input").length).toBe(1);
    expect(wrapper.find("input").props().value).toBe("myPW");
    expect(wrapper.find("input").props().type).toBe("password");
    expect(wrapper.find("input").props().placeholder).toBe("Password");

    expect(wrapper.find("div.invalid-feedback").length).toBe(1);
  });
});
