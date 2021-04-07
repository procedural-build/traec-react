import React from "react";
import { connect } from "react-redux";
import { CompanyPermission } from "traec/utils/permissions/company";
import Traec from "traec";
import MemberList from "./memberList";
import InviteList from "./inviteList";
import AuthGroupList from "./authGroupList";
import { ErrorBoundary } from "../errors";

export class CompanyMembers extends React.Component {
  render() {
    const { companyId, company, children } = this.props;
    if (!company) {
      return null;
    }
    return (
      <React.Fragment>
        <h3>Company Members</h3>
        <p>{company.get("name")}</p>

        {/*Render the members panel if allowed */}
        <ErrorBoundary>
          <CompanyPermission companyId={companyId} requiresAdmin={false} requiredActions={["READ_COMPANY_MEMBER"]}>
            <MemberList companyId={companyId} />
          </CompanyPermission>
        </ErrorBoundary>

        {/*Render the invites panel if allowed */}
        <ErrorBoundary>
          <CompanyPermission companyId={companyId} requiresAdmin={true}>
            <InviteList companyId={companyId} />
          </CompanyPermission>
        </ErrorBoundary>

        {/*Render the authGroup panel if allowed */}
        <ErrorBoundary>
          <CompanyPermission companyId={companyId} requiresAdmin={true}>
            <AuthGroupList companyId={companyId} />
          </CompanyPermission>
        </ErrorBoundary>
        {children}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { companyId } = Traec.utils.getFullIds(state, ownProps.match.params);
  let company = state.getInPath(`entities.companies.byId.${companyId}`);
  return { companyId, company };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CompanyMembers);
