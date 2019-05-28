import React from "react";
import ReactDOM from "react-dom";
import Traec from 'traec'

import { BSBtnDropdown } from 'traec-react/utils/bootstrap';
import CompanyAuthGroupForm from './form'


export default class AuthGroupItem extends React.Component {

    constructor(props) {
        super(props)

        const authGroupId = props.item.get('uid')

        this.fetch = new Traec.Fetch('company_authgroup', 'put')
        let {stateParams, fetchParams} = this.fetch.params

        this.state = {
            showForm: false,
            formParams: {
                stateParams,
                fetchParams,
                initFields: {}
            }
        }

        this.dropDownLinks = this.dropDownLinks.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.showFormHandler = this.showFormHandler.bind(this)
    }

    deleteItem(e) {
        e.preventDefault();
        this.fetch.toggleForm()
    }

    editItem(e) {
        e.preventDefault();
        this.setState({showForm: !this.state.showForm})
    }

    dropDownLinks() {
        return ([
            { name: "Edit", onClick: this.editItem },
            //{ name: "Delete", onClick: this.deleteItem },
        ])
    }

    showFormHandler(e, showForm) {
        this.setState({showForm})
    }

    render_form() {
        if (!this.state.showForm) { return null }
        return (
            <div className="row">
                <div className="col-sm-12">
                    <CompanyAuthGroupForm 
                        item={this.props.item}
                        companyId={this.props.companyId}
                        showFormHandler={this.showFormHandler}
                        fetchHandler={this.fetch}
                        dispatch={this.props.dispatch}
                    />
                </div>
            </div>
        )
    }

    render () {
        const i = this.props.index
        const item = this.props.item

        return (
            <React.Fragment>
                <div className="row" key={i} style={{backgroundColor: (i+1) % 2 ? "#ddd" : ""}}>
                    <div className="col-sm-8" >
                        <p className="m-0 p-0">
                            {item.get('name')}
                        </p>
                    </div>
                    <div className="col-sm-4">
                        <BSBtnDropdown links={this.dropDownLinks()}/>
                    </div>
                </div>       
                {this.render_form()}
            </React.Fragment>
        );
    }
}