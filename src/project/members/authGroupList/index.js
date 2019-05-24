import Im from 'traec/immutable';
import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Traec from 'traec'

import { BSCard, BSBtn } from 'AppSrc/utils/bootstrap';

import {ProjectAuthGroupForm} from './form'
import {projectPermissionRender} from 'traec/utils/permissions/project'
import AuthGroupItem from './item'


class AuthGroupList extends React.Component { 

    constructor(props) {
        super(props)

        const projectId = props.projectId
        this.fetch = new Traec.Fetch('project_authgroup', 'post', {projectId})
        let {fetchParams, stateParams} = this.fetch.params
        this.state = {
            showForm: false,
            formParams: {
                fetchParams, 
                stateParams,
                initFields: {}
            }
        }

        this.requiredFetches = [
            new Traec.Fetch('project_authgroup', 'list')
        ]

        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        Traec.fetchRequired.bind(this)()
    }

    componentDidUpdate() {
        Traec.fetchRequired.bind(this)()
    }

    onClick(e) {
        e.preventDefault();
        this.fetch.toggleForm()
    }

    render_form() {
        if (!this.state.showForm) { return null }
        return (
            <ProjectAuthGroupForm 
                item={null}
                projectId={this.props.projectId}
                showFormHandler={(e) => this.setState({showForm: !this.state.showForm})}
                fetchHandler={this.fetch}
                dispatch={this.props.dispatch}
            />
        )
    }

    render_main() {
        let {authgroups, projectId, dispatch} = this.props
        if (!authgroups) {return null}

        let itemList = authgroups.toList()
            .sortBy( (obj, i) => obj.get('name') )
            .map((item, i) => (
                <AuthGroupItem key={i} index={i} item={item}
                    projectId={projectId}
                    dispatch={dispatch} 
                />
            ))
        //
        return (
            <div className="row">
                <BSCard 
                    widthOffset="col-sm-12"
                    title="Authority Groups"
                    button={<BSBtn onClick={e => this.setState({showForm: !this.state.showForm})} text="Add an Authority Group" />}
                    body={itemList}
                    form={this.render_form()}
                />
            </div>
        );
    }

    render(){
        // Check the User permissions for this company
        return projectPermissionRender(
            this.props.projectId,
            true, [],
            this.render_main()
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let {projectId} = ownProps
    let project = state.getInPath(`entities.projects.byId.${projectId}`)
    let authgroups = state.getInPath(`entities.projectObjects.byId.${projectId}.authgroups`)
    let isAuthenticated = state.getInPath('auth.isAuthenticated')
    return ({project, authgroups, isAuthenticated })
}



const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthGroupList);