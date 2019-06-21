import React from "react";
import { shallow } from "enzyme";
import { ProjectMembers } from "../../src/members/projectMembers";
import { CompanyMembers } from "../../src/members/companyMembers";
import { MemberList } from "../../src/members/memberList";
import { InviteList } from "../../src/members/inviteList";
import { DisciplineList } from "../../src/members/disciplineList";
import { CompanyAuthGroupForm } from "../../src/members/authGroupList/companyForm";
import { ProjectAuthGroupForm } from "../../src/members/authGroupList/projectForm";
import { AuthGroupList } from "../../src/members/authGroupList";
import { Link } from "react-router-dom";
import Octicon from "react-octicon";
import Im from "traec/immutable";

import TestRenderer from "react-test-renderer";
jest.mock("react-router-dom", () => ({ Link: "Link" }));

describe("ProjectMembers", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<ProjectMembers />)));

  it("should render a <div />", () => {
    expect(wrapper.find("div").length).toEqual(0);
  });

  it("should render a <h3 />", () => {
    expect(wrapper.find("h3").length).toEqual(0);
  });

  it("should match snapshot", () => {
    const testRenderer = TestRenderer.create(<ProjectMembers />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});

describe("CompanyMembers", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<CompanyMembers />)));

  it("should render a <div />", () => {
    expect(wrapper.find("div").length).toEqual(0);
  });

  it("should render a <h3 />", () => {
    expect(wrapper.find("h3").length).toEqual(0);
  });

  it("should match snapshot", () => {
    const testRenderer = TestRenderer.create(<CompanyMembers />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});

describe("MemberList", () => {
  let wrapper;

  const dispatch = jest.fn();
  const member = {};
  const companyId = jest.fn();
  const projectId = jest.fn();
  beforeEach(
    () =>
      (wrapper = shallow(
        <MemberList key={0} index={0} dispatch={dispatch} member={member} companyId={companyId} projectId={projectId} />
      ))
  );

  it("should contain MemberList", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("should match snapshot", () => {
    const testRenderer = TestRenderer.create(
      <MemberList key={0} index={0} dispatch={dispatch} member={member} companyId={companyId} projectId={projectId} />
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});

describe("InviteList", () => {
  let wrapper;
  const dispatch = jest.fn();
  const invites = {};
  const companyId = jest.fn();
  const projectId = jest.fn();

  beforeEach(
    () =>
      (wrapper = shallow(
        <InviteList dispatch={dispatch} invites={invites} companyId={companyId} projectId={projectId} />
      ))
  );

  it("should contain InviteList", () => {
    expect(wrapper.find("div").length).toEqual(0);
  });

  it("should match snapshot", () => {
    const testRenderer = TestRenderer.create(
      <InviteList dispatch={dispatch} invites={invites} companyId={companyId} projectId={projectId} />
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});

describe("DisciplineList", () => {
  let wrapper;
  const key = jest.fn();
  const index = jest.fn();
  const projectId = jest.fn();
  const discipline = jest.fn();
  const tree = jest.fn();
  const dispatch = jest.fn();

  beforeEach(
    () =>
      (wrapper = shallow(
        <DisciplineList
          key={key}
          index={index}
          item={discipline}
          tree={tree}
          projectId={projectId}
          dispatch={dispatch}
        />
      ))
  );
  it("should contain DisciplineList", () => {
    expect(wrapper.find("div").length).toEqual(0);
  });

  it("should match snapshot", () => {
    const testRenderer = TestRenderer.create(
      <DisciplineList key={key} index={index} item={discipline} tree={tree} projectId={projectId} dispatch={dispatch} />
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});

describe("ProjectAuthGroupForm", () => {
  let wrapper;
  const item = jest.fn();
  const projectId = jest.fn();
  const showFormHandler = jest.fn();
  const fetchHandler = jest.fn();
  const dispatch = jest.fn();

  beforeEach(
    () =>
      (wrapper = shallow(
        <AuthGroupList
          item={item}
          projectId={projectId}
          showFormHandler={showFormHandler}
          fetchHandler={fetchHandler}
          dispatch={dispatch}
        />
      ))
  );

  it("should contain ProjectAuthGroupForm", () => {
    expect(wrapper.find("div").length).toEqual(0);
  });

  it("should match snapshot", () => {
    const testRenderer = TestRenderer.create(
      <AuthGroupList
        item={item}
        projectId={projectId}
        showFormHandler={showFormHandler}
        fetchHandler={fetchHandler}
        dispatch={dispatch}
      />
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});

describe("CompanyAuthGroupForm", () => {
  let wrapper;
  const item = jest.fn();
  const companyId = jest.fn();
  const showFormHandler = jest.fn();
  const fetchHandler = jest.fn();
  const dispatch = jest.fn();

  beforeEach(
    () =>
      (wrapper = shallow(
        <AuthGroupList
          item={item}
          companyId={companyId}
          showFormHandler={showFormHandler}
          fetchHandler={fetchHandler}
          dispatch={dispatch}
        />
      ))
  );

  it("should contain CompanyAuthGroupForm", () => {
    expect(wrapper.find("div").length).toEqual(0);
  });

  it("should match snapshot", () => {
    const testRenderer = TestRenderer.create(
      <AuthGroupList
        item={item}
        companyId={companyId}
        showFormHandler={showFormHandler}
        fetchHandler={fetchHandler}
        dispatch={dispatch}
      />
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});

describe("AuthGroupList", () => {
  let wrapper;
  const key = jest.fn();
  const index = jest.fn();
  const item = jest.fn();
  const projectId = jest.fn();
  const dispatch = jest.fn();

  beforeEach(
    () =>
      (wrapper = shallow(
        <AuthGroupList key={key} index={index} item={item} projectId={projectId} dispatch={dispatch} />
      ))
  );

  it("should contain AuthGroupList", () => {
    expect(wrapper.find("div").length).toEqual(0);
  });

  it("should match snapshot", () => {
    const testRenderer = TestRenderer.create(
      <AuthGroupList key={key} index={index} item={item} projectId={projectId} dispatch={dispatch} />
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
