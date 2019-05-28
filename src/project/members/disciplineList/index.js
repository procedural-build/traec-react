import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Traec from 'traec'

import { BSCard, BSBtn } from 'traec-react/utils/bootstrap';

import {disciplineFields} from './form'
import DisciplineForm from './form'
import {projectPermissionRender} from 'traec/utils/permissions/project'
import DisciplineItem from './item'


class DisciplineList extends React.Component { 

    constructor(props) {
        super(props)

        const projectId = props.projectId
        this.fetch = new Traec.Fetch('project_discipline', 'post', {projectId})
        let {fetchParams, stateParams} = this.fetch.params

        this.state = {
            formParams: {
                fetchParams, 
                stateParams,
                initFields: {}
            }
        }

        this.requiredFetches = [
            new Traec.Fetch('project_discipline', 'list')
        ]

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        this.fetch.toggleForm()
    }

    componentDidMount() {
        Traec.fetchRequired.bind(this)()
    }

    render(){
        let {projectId, dispatch, disciplines, tree} = this.props
        if (!disciplines) { return null }

        let rootChildren = [...tree['root'].children]
        let rootItems = Traec.Im.fromJS(rootChildren.map(id => tree[id].obj))

        let itemList = rootItems
            .sortBy(i => i.get('name'))
            .filter(i => !i.get('approver'))
            .map((discipline, i) => (
                <DisciplineItem 
                    key={i} 
                    index={i} 
                    item={discipline} 
                    tree={tree}
                    projectId={projectId}
                    dispatch={dispatch}
                />
            ))

        return (
            <div className="row">
                <BSCard 
                    widthOffset="col-sm-12"
                    title="Project Suppliers"
                    button={
                        projectPermissionRender(
                            projectId,
                            true, [],
                            <BSBtn onClick={this.onClick} text="Add a Supplier" />
                        )
                    }
                    body={itemList}
                    form={<DisciplineForm
                        projectId={this.props.projectId} 
                        stateParams={this.state.formParams.stateParams} 
                        fetchParams={this.state.formParams.fetchParams}
                        fields={disciplineFields}
                    />}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let {projectId} = ownProps
    let project = state.getInPath(`entities.projects.byId.${projectId}`)
    let disciplines = state.getInPath(`entities.projectObjects.byId.${projectId}.disciplines`)
    // Make a tree of the discipline approval heirarchy
    let tree = {}
    if (disciplines) {
        for (let [itemId, item] of disciplines) {
            let approverId = item.get('approver') || "root"
            // Add the item to the tree
            let treeItem = tree[itemId] || {obj: item, children: new Set()}
            Object.assign(treeItem, {obj: item})
            Object.assign(tree, {[itemId]: treeItem})
            // Add this to the children set of the parent
            treeItem = tree[approverId] || {obj: null, children: new Set()}
            treeItem.children.add(itemId)
            Object.assign(tree, {[approverId]: treeItem})
        }   
    }
    // Return this
    return ({project, disciplines, tree})
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisciplineList);