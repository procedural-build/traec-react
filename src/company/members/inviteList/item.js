import React from "react";
import ReactDOM from "react-dom";
import Traec from 'traec'
import {BSBtnDropdown } from 'AppSrc/utils/bootstrap';


export default class InviteItem extends React.Component {

    constructor(props) {
        super(props)
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(e) {
        e.preventDefault();
        let {companyId} = this.props
        let inviteId = this.props.item.get('uid')
        new Traec.Fetch('company_invite', 'delete', {companyId, inviteId}).dispatch()
    }

    dropDownLinks() {
        return ([
            { name: "Delete", onClick: this.deleteItem },
        ])
    }

    render () {
        const i = this.props.index
        const item = this.props.item

        return (
            <div className="row" key={i} style={{backgroundColor: (i+1) % 2 ? "#ddd" : ""}}>
                <div className="col-sm-6" >
                    {item.get('email')}
                </div>
                <div className="col-sm-5" >
                    {item.getIn(['auth', 'name'])}
                </div>
                <div className="col-sm-1">
                    <BSBtnDropdown links={this.dropDownLinks()}/>
                </div>
            </div>       
        );
    }
}