import React from "react";
import ReactDOM from "react-dom";

import CompanyAuthGroupForm from '../../../company/members/authGroupList/form'


export const authGroupFields = {
    name: { value:'', class: 'col mb-1', label: '', placeholder: 'Name'},
}


export class ProjectAuthGroupForm extends CompanyAuthGroupForm {

    constructor(props) {
        super(props)

        this.operations = ["CREATE", "READ", "UPDATE", "DELETE"]
        this.viewObjectTypes = {
            "TRACKER_REF": "Work Packages",
            "PROJECT_MEMBER": "Project Users",
            "PROJECT_REPORT": "Project Dashboard",
            "TRACKER_REF_SCORE_VALUE": "Project Reporting"
        }
    }

    submitData(e) {
        e.preventDefault()
        let {projectId, fetchHandler} = this.props
        // Construct the auth object that will be sent
        let actions = []
        if (!this.state.is_admin) {
            for (let [action, isAction] of Object.entries(this.state.actions)) {
                if (isAction) { actions.push(action) }
            }
        }
        let data = {
            name: this.state.name,
            is_admin: this.state.is_admin,
            policy_json: { actions }
        }
        // The fetchHandler to use should be passed in as a prop
        fetchHandler.update({projectId, authGroupId: this.state.uid})
        fetchHandler.updateFetchParams({body: data})
        fetchHandler.dispatch()
    }

}