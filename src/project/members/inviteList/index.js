import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Traec from 'traec'

import { BSCard } from 'traec-react/utils/bootstrap';
import InviteItem from './item'


class InviteList extends React.Component { 

    constructor(props) {
        super(props)

        this.requiredFetches = [
            new Traec.Fetch('project_invite', 'list')
        ]
    }

    componentDidMount() {
        Traec.fetchRequired.bind(this)()
    }

    componentDidUpdate() {
        Traec.fetchRequired.bind(this)()
    }

    render(){
        let {invites, projectId, dispatch} = this.props
        if (!invites) { return null }

        let itemList = invites.toList()
            .sortBy( (obj, i) => obj.get('created') )
            .map((invite, i) => (
                <InviteItem 
                    key={i} 
                    index={i} 
                    item={invite} 
                    projectId={projectId}
                    dispatch={dispatch}
                />
            ));
        if (!itemList.size) {return ""}
        return (
            <div className="row">
                <BSCard 
                    widthOffset="col-sm-12"
                    title="Outstanding Invitations"
                    button={null}
                    body={itemList}
                    form={null}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let {projectId} = ownProps
    let project = state.getInPath(`entities.projects.byId.${projectId}`)
    let invites = state.getInPath(`entities.projectObjects.byId.${projectId}.invites`)
    let disciplines = state.getInPath(`entities.projectObjects.byId.${projectId}.disciplines`)
    // Append on project discipline objects
    if (invites && disciplines) {
        for (let [key, invite] of invites) {
            let disciplineId = invite.get('project_discipline')
            invites = invites.setInPath(`${key}.project_discipline`, disciplines.get(disciplineId))
        }
    }
    return ({
        project,
        invites
    })
}



const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteList);