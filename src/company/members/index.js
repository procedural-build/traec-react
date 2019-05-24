import React from "react";
import {Link} from "react-router-dom";
import { connect } from 'react-redux';

import {RightArrow, Spinner} from 'AppSrc/utils/entities'
import {companyPermissionRender} from 'traec/utils/permissions/company'

import MemberList from './memberList';
import InviteList from './inviteList';
import AuthGroupList from './authGroupList';


class CompanyMembers extends React.Component {

    render(){
        const {companyId, company} = this.props
        if (!company) { return null }
        return (
            <React.Fragment>
                <h3>Company Members</h3>
                <p>{company.get('name')}</p>

                {/*Render the members panel if allowed */}
                {companyPermissionRender(
                    companyId, false, ['READ_COMPANY_MEMBER'],
                    (<MemberList companyId={companyId} />)
                )}

                {/*Render the invites panel if allowed */}
                {companyPermissionRender(
                    companyId, true, [],
                    (<InviteList companyId={companyId} />)
                )}
                
                {/*Render the authGroup panel if allowed */}
                {companyPermissionRender(
                    companyId, true, [],
                    (<AuthGroupList companyId={companyId}/>)
                )}
                
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const {companyId} = ownProps.match.params
    let company = state.getIn(`entities.companies.byId.${companyId}`.split('.'))
    return { companyId, company}
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyMembers);