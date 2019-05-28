import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Traec from 'traec'

import { BSBtnDropdown } from 'traec-react/utils/bootstrap';
import {projectPermissionRender} from 'traec/utils/permissions/project'
import {confirmDelete} from 'traec-react/utils/sweetalert';


export default class MemberItem extends React.Component {

    constructor(props) {
        super(props)

        this.deleteMember = this.deleteMember.bind(this);
    }

    deleteMember(e) {
        e.preventDefault();
        let {projectId, member} = this.props
        let memberName = this.get_member_name()

        confirmDelete({
            text: `This will delete project member ${memberName}.  Are you sure you would like to proceed?`,
            onConfirm: () => {
                new Traec.Fetch('project_member', 'delete', {projectId, memberId: member.get('uid')}).dispatch()
            }
        })
    }

    dropDownLinks() {
        return ([
            { name: "Delete", onClick: this.deleteMember },
        ])
    }

    get_member_name() {
        let {member: item} = this.props
        return `${item.getIn(['user', 'first_name'])} ${item.getIn(['user', 'last_name'])}`
    }

    render () {
        let {index: i, member: item, projectId} = this.props
        return (
            <div className="row" key={i} style={{backgroundColor: (i+1) % 2 ? "#ddd" : ""}}>
                <div className="col-sm-4" >
                    {this.get_member_name()}
                </div>
                <div className="col-sm-4" >
                    {item.getIn(['user', 'email'])}
                </div>
                <div className="col-sm-2" >
                    {item.getIn(['project_discipline', 'name'])}
                </div>
                <div className="col-sm-2">
                    {projectPermissionRender(
                        projectId,
                        true, [],
                        <BSBtnDropdown links={this.dropDownLinks()}/>
                    )}
                </div>
            </div>       
        );
    }
}