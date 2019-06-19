import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { BSBtnDropdown } from "traec-react/utils/bootstrap/";
import Traec from "traec";
import { isSuperuser } from "traec-react/utils";
import { counter } from "./company";
import { confirmDelete } from "traec-react/utils/sweetalert";

export default class CompanyItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteCompany(e) {
    e.preventDefault();
    let { company } = this.props;
    let companyId = company ? company.get("uid") : null;
    if (!companyId) {
      return null;
    }
    let companyName = company.get("name");
    confirmDelete({
      text: `This will delete the company: ${companyName}.  Are you sure you would like to proceed?`,
      onConfirm: () => {
        new Traec.Fetch("company", "delete", { companyId }).dispatch();
      }
    });
  }

  renderMenu() {
    if (!isSuperuser(this.props.user)) {
      return null;
    }
    return <BSBtnDropdown links={[{ name: "Delete", onClick: this.deleteCompany.bind(this) }]} />;
  }

  renderChildren() {
    let { company, allCompanies, dispatch, indentLevel, index, user } = this.props;
    if (!company) {
      return null;
    }
    let childIds = company.get("childids");
    if (!childIds) {
      return null;
    }
    let subCompanies = childIds.map((childId, i) => {
      let child = allCompanies.get(childId);
      if (!child) {
        return null;
      }
      return (
        <CompanyItem
          key={i}
          index={index}
          indentLevel={indentLevel + 1}
          company={child}
          allCompanies={allCompanies}
          dispatch={dispatch}
          user={user}
        />
      );
    });
    return <React.Fragment>{subCompanies}</React.Fragment>;
  }

  render() {
    let { company, indentLevel, index: i } = this.props;
    let rowNum = counter.row++;
    return (
      <React.Fragment>
        <div className="row" key={i} style={{ backgroundColor: (rowNum + 1) % 2 ? "#ddd" : "" }}>
          <div className="col-sm-12">
            <span style={{ marginLeft: `${indentLevel * 1}em` }}>
              <Link to={"/company/" + company.get("uid")}>{company.get("name")}</Link>
            </span>
            {this.renderMenu()}
          </div>
        </div>
        {this.renderChildren()}
      </React.Fragment>
    );
  }
}
