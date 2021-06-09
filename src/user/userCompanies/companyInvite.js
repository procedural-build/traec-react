import React from "react";

import { connect } from "react-redux";
import Traec from "traec";

import { BSCard } from "traec-react/utils/bootstrap";
import BaseFormConnected from "traec-react/utils/form";
import CompanyInviteItem from "./companyInviteItem";

export const companyFields = {
  name: { value: "", class: "col", endRow: true },
  address: { value: "", class: "col", endRow: true },
  address2: { value: "", class: "col", endRow: true },
  suburb: { value: "", class: "col" },
  postcode: { value: "", class: "col" },
  state: { value: "", class: "col" },
  country: { value: "", class: "col", endRow: true }
};

class CompanyInvites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formParams: {
        stateParams: {},
        fetchParams: {},
        initFields: {}
      },
      fetchedInvites: false
    };

    // Data required from the API for this Component
    this.requiredFetches = [new Traec.Fetch("company_invite_all", "list")];
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
  }

  render() {
    let { items } = this.props;
    if (!items || !items.size) {
      return (
        <div className="col-sm-12">
          <p>No outstanding Company Invites</p>
        </div>
      );
    }

    const itemList = items
      .toList()
      .map((item, i) => (
        <CompanyInviteItem
          key={i}
          index={i}
          invite={item}
          dispatch={this.props.dispatch}
          onAcceptReject={this.acceptRejectReload}
        />
      ));

    return (
      <BSCard
        id="company-invite-list"
        widthOffset="col-sm-12"
        title="Company Invites"
        //button={<BSBtn onClick={this.onClick} text="Create a Company" />}
        body={itemList}
        form={
          <BaseFormConnected
            stateParams={this.state.formParams.stateParams}
            fetchParams={this.state.formParams.fetchParams}
            fields={companyFields}
          />
        }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  items: state.getInPath("entities.companyInvites.byId"),
  isAuthenticated: state.getInPath("auth.isAuthenticated")
});

export default connect(mapStateToProps)(CompanyInvites);
