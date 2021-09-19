import React from "react";
import { connect } from "react-redux";
import Traec from "traec";
import { BSBtn, BSCard, BSModal } from "traec-react/utils/bootstrap";
import BaseFormConnected from "traec-react/utils/form";
import CompanyItem from "./companyItem";
import { isSuperuser } from "traec-react/utils";

export const companyFields = {
  name: { value: "", class: "col", endRow: true },
  address: { value: "", class: "col", endRow: true },
  address2: { value: "", class: "col", endRow: true },
  suburb: { value: "", class: "col" },
  postcode: { value: "", class: "col" },
  state: { value: "", class: "col" },
  country: { value: "", class: "col", endRow: true }
};

export const counter = { row: 0 };

class UserCompanies extends React.Component {
  constructor(props) {
    super(props);

    let fetch = new Traec.Fetch("company", "post");
    fetch.updateFetchParams({
      postSuccessHook: () => {
        $(`#addNewCompany`).modal("hide");
      }
    });

    this.state = {
      formParams: fetch.params
    };

    // Data required from the API for this Component
    this.requiredFetches = [new Traec.Fetch("company", "list")];

    // action bindings
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  onClick(e) {
    e.preventDefault();
    $(`#addNewCompany`).modal("show");
  }

  renderAddCompanyButton() {
    if (isSuperuser(this.props.user)) {
      return <BSBtn id="add-company" onClick={this.onClick} text="Create a Company" />;
    }
  }

  render() {
    let { items, dispatch, user, show } = this.props;
    let { formParams } = this.state;

    if (!show) {
      return null;
    }

    let itemList = items?.size ? (
      items
        .toList()
        .sortBy((obj, i) => obj.get("created"))
        .filter(obj => obj.get("parentid") == null)
        .filter(obj => obj.get("name"))
        .map((item, i) => (
          <CompanyItem
            key={i}
            index={i}
            indentLevel={0}
            company={item}
            allCompanies={items}
            dispatch={dispatch}
            user={user}
          />
        ))
    ) : (
      <div>No companies found</div>
    );

    counter.row = 0;
    return (
      <BSCard
        id="user-companies"
        widthOffset="col-sm-12"
        title="My Company Memberships"
        button={this.renderAddCompanyButton()}
        body={itemList}
        form={
          <BSModal
            id={"addNewCompany"}
            title={"Add a company"}
            body={
              <BaseFormConnected params={formParams} fields={companyFields} forceShowForm={true} hideUnderline={true} />
            }
          />
        }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  items: state.getInPath("entities.companies.byId"),
  newItem: state.getInPath("entities.projects.newItem"),
  isAuthenticated: state.getInPath("auth.isAuthenticated"),
  user: state.getInPath("auth.user")
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCompanies);
