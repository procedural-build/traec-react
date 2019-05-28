import React from "react";
import ReactDOM from "react-dom";
import Traec from 'traec'

import { BSBtnDropdown } from 'traec-react/utils/bootstrap';
import {projectPermissionRender} from 'traec/utils/permissions/project'
import {confirmDelete} from 'traec-react/utils/sweetalert'
import DisciplineForm, {disciplineFields} from './form'


export default class DisciplineItem extends React.Component {

    constructor(props) {
        super(props)

        let {item, projectId} = props
        const itemId = item.get('uid')
        this.fetch = new Traec.Fetch('project_discipline', 'put', {projectId, projectDisciplineId: itemId})
        this.fetch.updateFetchParams({
            preFetchHook: (body) => {
                body.approver = body.approver || null 
                return body
            }
        })

        this.state = {
            formParams: {
                ...this.fetch.params
            }
        }

        // action bindings
        this.dropDownLinks = this.dropDownLinks.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this)
    }

    stateParams() {
        const project = this.props.item.project
        const basePath = `${project.uid}.members`
        return ({
            objPath: `entities.members.items`,
            formVisPath: `${basePath}.SHOW_FORM`
        })
    }

    deleteItem(e) {
        e.preventDefault();
        let {projectId} = this.props
        let projectDisciplineId = this.props.item.get('uid')

        confirmDelete({
            text: `This will delete the Project Supplier: ${this.props.item.get('name')}.  Are you sure you would like to proceed?`,
            onConfirm: () => {
                new Traec.Fetch('project_discipline', 'delete', {projectId, projectDisciplineId}).dispatch()
            }
        })
    }

    editItem(e) {
        e.preventDefault();
        let {item, projectId} = this.props
        const itemId = item.get('uid')

        let fetch = new Traec.Fetch('project_discipline', 'put', {projectId, projectDisciplineId: itemId})
        fetch.updateFetchParams({
            preFetchHook: (body) => {
                body.approver = body.approver || null 
                return body
            },
            //postSuccessHook: () => {location.reload()}
        })
        this.setState({formParams: {...fetch.params}})

        fetch.toggleForm()
    }

    dropDownLinks() {
        return ([
            { name: "Edit", onClick: this.editItem },
            { name: "Delete", onClick: this.deleteItem },
        ])
    }

    render_edit_form() {
        let {item} = this.props
        disciplineFields.name.value = item.get('name')
        disciplineFields.auth.value = item.getInPath('auth.uid') || ""
        disciplineFields.approver.value = item.get('approver') || ""
        return (
            <DisciplineForm
                projectId={this.props.projectId} 
                itemId={item.get('uid')}
                stateParams={this.state.formParams.stateParams} 
                fetchParams={this.state.formParams.fetchParams}
                fields={disciplineFields}
            />
        )
    }

    render_children() {
        let {tree, item, projectId, dispatch, indent = 0} = this.props
        let childIds = [...tree[item.get('uid')].children]
        let children = Traec.Im.fromJS(childIds.map(id => tree[id].obj))
        return children
            .sortBy(i => i.get('name'))
            .map((child, i) =>{
                return (
                    <DisciplineItem 
                        key={i} 
                        index={i} 
                        item={child} 
                        tree={tree}
                        projectId={projectId}
                        dispatch={dispatch}
                        indent = {indent + 1}
                    />
                )
            })
    }

    render () {
        let {index: i, item, projectId, indent = 0} = this.props


        return (
            <React.Fragment>
                <div className="row" key={i} style={{backgroundColor: (i+1) % 2 ? "#ddd" : ""}}>
                    <div className="col-sm-6">
                        <span style={{marginLeft: `${indent*1.5}em`}}>
                            {item.get('name')}
                        </span>
                    </div>
                    <div className="col-sm-4" >
                            {item.getIn(['auth', 'name'])}
                    </div>
                    <div className="col-sm-2">
                        {projectPermissionRender(
                            projectId,
                            true, [],
                            <BSBtnDropdown links={this.dropDownLinks()}/>
                        )}
                    </div>
                </div>
                {this.render_edit_form()}
                {this.render_children()}
            </React.Fragment>
        );
    }
}