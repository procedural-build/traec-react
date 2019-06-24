import React from "react";
import { mount, shallow } from "enzyme";
import Im from "traec/immutable";
import CompanyItem from "../../../src/user/userCompanies/companyItem";
import * as utils from "traec-react/utils";
import * as sweetalert from "traec-react/utils/sweetalert";
import { Link } from "react-router-dom";
import { BSBtnDropdown } from "traec-react/utils/bootstrap/";

describe("SideBar", () => {
  let wrapper;
  const company = Im.fromJS({
    meta_json: {
      description: "Commercial sector business unit",
      company_size: "251-500",
      paid: true,
      company_type: "Client",
      industry_sector: "",
      client_sector: "Private Sector"
    },
    suburb: "London",
    parentid: "96483b95-0ada-4487-af11-716ecdeaa43a",
    name: "Commercial Sector (client impact)",
    creator: {
      first_name: "",
      last_name: "",
      email: "admin@ods-track.com",
      username: "admin"
    },
    postcode: "SE1 7EU",
    uid: "abd85e10-5643-4c13-a5d6-859d7480cec8",
    state: "",
    address: "1 Lambeth Palace Road",
    country: "UNITED KINGDOM",
    projects: [
      {
        uid: "a6cd2661-fc72-4ac7-aae3-f9e0cab11f99",
        name: "National Physical Laboratory "
      }
    ],

    childids: [],
    address2: "Waterloo"
  });
  const dispatch = jest.fn();
  utils.isSuperuser = jest.fn(() => true);
  sweetalert.confirmDelete = jest.fn();
  const user = {};
  beforeEach(
    () =>
      (wrapper = shallow(
        <CompanyItem index={0} indentLevel={0} company={company} allCompanies={null} dispatch={dispatch} user={user} />
      ))
  );

  it("should render a <div />", () => {
    expect(wrapper.find("div").length).toEqual(2);
  });

  it("should contain the company link", () => {
    expect(wrapper.find("Link").get(0).props.to).toEqual("/company/" + company.get("uid"));
  });

  it("should have a dropdown", () => {
    expect(wrapper.containsMatchingElement(<BSBtnDropdown />)).toBe(true);
  });
});
