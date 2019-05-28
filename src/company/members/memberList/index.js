import Im from 'traec/immutable';
import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Traec from 'traec'

import { BSCard, BSBtn, BSBtnDropdown } from 'traec-react/utils/bootstrap';

import { objToList } from 'traec-react/utils'
import InviteForm, {inviteFields} from './form';
import {companyPermissionRender} from 'traec/utils/permissions/company'
import MemberItem from './item'


class MemberList extends React.Component { 

    constructor(props) {
        super(props)

        const companyId = props.companyId
        this.fetch = new Traec.Fetch('company_invite', 'post', {companyId})
        let {fetchParams, stateParams} = this.fetch.params

        this.state = {
            formParams: {
                fetchParams, 
                stateParams,
                initFields: {}
            }
        }

        // Data required from the API for this Component
        this.requiredFetches = [
            new Traec.Fetch('company_member', 'list')
        ]

        // Bindings for actions
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        Traec.fetchRequired.bind(this)()
    }

    componentDidUpdate() {
        Traec.fetchRequired.bind(this)()
    }

    /* ACTIONS */

    onClick(e) {
        e.preventDefault();
        this.fetch.toggleForm()
    }

    /* RENDERING */

    render(){
        let {companyId, members, dispatch} = this.props
        let itemList = objToList(members)
            .sortBy(i => i.getIn(['user', 'first_name']))
            .map((member, i) => (
                <MemberItem key={i} index={i} dispatch={dispatch} member={member} companyId={companyId}/>
            ));

        return (
            <div className="row">
                <BSCard 
                    widthOffset="col-sm-12"
                    title="Members"
                    button={companyPermissionRender(
                        companyId, true, [],
                        (<BSBtn onClick={this.onClick} text="Send Invite" />)
                    )}
                    body={itemList}
                    form={<InviteForm 
                        companyId={companyId}
                        stateParams={this.state.formParams.stateParams} 
                        fetchParams={this.state.formParams.fetchParams}
                        fields={inviteFields}
                    />}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let {companyId} = ownProps
    let company = state.getInPath(`entities.companies.byId.${companyId}`)
    const members = state.getInPath(`entities.companyObjects.byId.${companyId}.members`)
    return ({
        company,
        members,
        isAuthenticated: state.getInPath('auth.isAuthorized')
    })
}


const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberList);