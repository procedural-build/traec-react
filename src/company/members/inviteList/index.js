import React from "react";
import ReactDOM from "react-dom";
import Traec from 'traec'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BSCard } from 'traec-react/utils/bootstrap';
import InviteItem from './item'


class InviteList extends React.Component { 

    constructor(props) {
        super(props)

        this.state = {}

        // Data required from the API for this Component
        this.requiredFetches = [
            new Traec.Fetch('company_invite', 'list')
        ]
    }

    componentDidMount() {
        Traec.fetchRequired.bind(this)()
    }

    componentDidUpdate() {
        Traec.fetchRequired.bind(this)()
    }

    render(){
        let {invites, companyId, dispatch} = this.props
        if (!invites || !invites.size) { return null }

        // Get the list of Invite components
        let itemList = invites.toList()
            .sortBy( (obj, i) => obj.get('created') )
            .map((invite, i) => (
                <InviteItem 
                    key={i} 
                    index={i} 
                    item={invite} 
                    companyId={companyId}
                    dispatch={dispatch}
                />
            ))
        
        return (
            <div className="row">
                <BSCard 
                    widthOffset="col-sm-12"
                    title="Outstanding Invitations"
                    button={null}
                    body={itemList}
                    form={null}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let {companyId} = ownProps
    let company = state.getInPath(`entities.companies.byId.${companyId}`)
    let invites = state.getInPath(`entities.companyObjects.byId.${companyId}.invites`)

    return ({
        company,
        invites,
        isAuthenticated: state.getInPath('auth.isAuthorized')
    })
}



const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteList);