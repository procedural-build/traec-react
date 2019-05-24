import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Traec from 'traec'

import { BSCard, BSBtn } from 'AppSrc/utils/bootstrap';

import InviteForm, {inviteFields} from './form';
import {projectPermissionRender} from 'traec/utils/permissions/project'
import MemberItem from './item'


class MemberList extends React.Component { 

    constructor(props) {
        super(props)

        const projectId = props.projectId
        this.fetch = new Traec.Fetch('project_invite', 'post', {projectId})
        let {fetchParams, stateParams} = this.fetch.params

        this.state = {
            formParams: {
                fetchParams, 
                stateParams,
                initFields: {}
            }
        }

        this.requiredFetches = [
            new Traec.Fetch('project_member', 'list')
        ]

        // action bindings
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        this.fetch.toggleForm()
    }

    componentWillMount() {
        Traec.fetchRequired.bind(this)()
    }

    render(){
        let {projectId, members, dispatch} = this.props
        if (!members) { return null }

        let itemList = members.toList()
            .sortBy(i => i.getInPath('project_discipline.name'))
            .map((member, i) => (
                <MemberItem key={i} index={i} dispatch={dispatch} member={member} projectId={projectId} />
            ));

        return (
            <div className="row">
                <BSCard 
                    widthOffset="col-sm-12"
                    title="Members"
                    button={
                        projectPermissionRender(
                            projectId,
                            true, [],
                            <BSBtn onClick={this.onClick} text="Send Invite" />
                        )
                    }
                    body={itemList}
                    form={<InviteForm 
                        projectId={projectId}
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
    let {projectId} = ownProps
    let project = state.getInPath(`entities.projects.byId.${projectId}`)
    const members = state.getInPath(`entities.projectObjects.byId.${projectId}.members`)
    return ({project, members,})
}


const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberList);