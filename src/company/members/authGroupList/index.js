import React from "react";
import { connect } from 'react-redux';
import Traec from 'traec'

import { BSCard, BSBtn } from 'AppSrc/utils/bootstrap';
import CompanyAuthGroupForm from './form'
import AuthGroupItem from './item'


class AuthGroupList extends React.Component { 

    constructor(props) {
        super(props)

        const companyId = props.companyId
        this.fetch = new Traec.Fetch('company_authgroup', 'post', {companyId})
        let {fetchParams, stateParams} = this.fetch.params

        this.state = {
            showForm: false,
            formParams: {
                fetchParams, 
                stateParams,
                initFields: {}
            }
        }

        // Data required from the API for this Component
        this.requiredFetches = [
            new Traec.Fetch('company_authgroup', 'list')
        ]

        // Bindings for actions
        this.onClick = this.onClick.bind(this);
        this.showFormHandler = this.showFormHandler.bind(this)
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

    showFormHandler(e, showForm) {
        this.setState({showForm})
    }

    /* RENDERING */

    render_form() {
        if (!this.state.showForm) { return null }
        let {companyId, dispatch} = this.props
        return (
            <CompanyAuthGroupForm 
                item={null}
                companyId={companyId}
                showFormHandler={this.showFormHandler}
                fetchHandler={new Traec.Fetch('company_authgroup', 'post', {companyId})}
                dispatch={dispatch}
            />
        )
    }

    render(){
        let {companyId, dispatch, authgroups} = this.props
        if (!authgroups) { return null }

        let itemList = authgroups.toList()
            .sortBy( (obj, i) => obj.get('name') )
            .map((item, i) => (
                <AuthGroupItem 
                    key={i} index={i} 
                    item={item} companyId={companyId}
                    dispatch={dispatch} 
                />
            ))
        //
        return (
            <React.Fragment>
            <div className="row">
                <BSCard 
                    widthOffset="col-sm-12"
                    title="Authority Groups"
                    button={<BSBtn onClick={e => this.showFormHandler(e, !this.state.showForm)} text="Add an Authority Group" />}
                    body={itemList}
                    form={this.render_form()}
                />
            </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let {companyId} = ownProps
    let company = state.getInPath(`entities.companys.byId.${companyId}`)
    let authgroups = state.getInPath(`entities.companyObjects.byId.${companyId}.authgroups`)
    return ({
        company,
        authgroups,
        isAuthenticated: state.getIn('auth.isAuthorized'.split('.'))
    })
}



const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthGroupList);