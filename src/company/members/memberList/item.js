import React from "react";
import ReactDOM from "react-dom";
import Traec from 'traec'
import { BSBtnDropdown } from 'AppSrc/utils/bootstrap';

import {companyPermissionRender} from 'traec/utils/permissions/company'
import {confirmDelete} from 'AppSrc/utils/sweetalert' 


export default class MemberItem extends React.Component {

    constructor(props) {
        super(props)

        this.editMember = this.editMember.bind(this);
        this.deleteMember = this.deleteMember.bind(this);
    }

    stateParams() {
        const company = this.props.item.company
        const basePath = `${company.uid}.members`
        return ({
            formObjPath: `entities.members.items`,
            formVisPath: `${basePath}.SHOW_FORM`
        })
    }

    editMember(e) {
        e.preventDefault();
    }

    deleteMember(e) {
        e.preventDefault();
        let {companyId, member} = this.props

        let memberName = this.get_member_name()

        confirmDelete({
            text: `This will delete project member ${memberName}.  Are you sure you would like to proceed?`,
            onConfirm: () => {
                new Traec.Fetch('company_member', 'delete', {companyId, memberId: member.get('uid')}).dispatch()
            }
        })
    }

    dropDownLinks() {
        return ([
            //{ name: "Edit", onClick: this.editMember },
            { name: "Delete", onClick: this.deleteMember },
        ])
    }

    get_member_name() {
        let {member: item} = this.props
        return `${item.getIn(['user', 'first_name'])} ${item.getIn(['user', 'last_name'])}`
    }

    render () {
        let {companyId, member: item, index: i} = this.props

        return (
            <div className="row" key={i} style={{backgroundColor: (i+1) % 2 ? "#ddd" : ""}}>
                <div className="col-sm-4" >
                    {item.getIn(['user', 'first_name'])} {item.getIn(['user', 'last_name'])}
                </div>
                <div className="col-sm-4" >
                    {item.getIn(['user', 'email'])}
                </div>
                <div className="col-sm-2" >
                    {item.getIn(['auth', 'name'])}
                </div>
                <div className="col-sm-2">
                    {companyPermissionRender(
                        companyId, true, [],
                        (<BSBtnDropdown links={this.dropDownLinks()}/>)
                    )}
                </div>
            </div>       
        );
    }
}