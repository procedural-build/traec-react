import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {fetchToState, toggleForm} from 'traec/redux/actionCreators'
import { BaseForm } from 'traec-react/utils/form'
import {objToList} from 'traec-react/utils'


// Project field definitions
export const inviteFields = {
    email: { inputType: "email", value:'', class: 'col-sm-8 mb-1', label: '', placeholder: 'Email'},
    auth: {
        value:'', class: 'col-sm-4 mb-1', label: '', placeholder: 'Authority Group', inputType: "select",
        defaultValue: '', header: 'Choose an Authority Group'
    },
    //auth: {value:'', class: 'col mb-1', label: '', placeholder: 'AuthGroup'}
}


class InviteForm extends BaseForm {

    static getDerivedStateFromProps(nextProps, prevState) {
        // Update the selection list for discipline drop-down
        let newState = prevState
        // Get the dropdown menu options for Disciplines
        if (nextProps.authgroups) { 
            InviteForm.setSelectOptions(newState.formFields.auth, nextProps.authgroups)
        }
        // Get the dropdown menu items for Auth Groups
        /*if (nextProps.authgroups) { 
            InviteForm.setSelectOptions(newState.formFields.auth, nextProps.authgroups)
        }*/
        return newState
    }
    
    static setSelectOptions(state, items) {
        let options = []
        if (items) {
            options = objToList(items).map( (item, i) => {
                return (<option key={i} value={item.get('uid')}>{item.get('name')}</option>)
            })
            if (state.value == '') {
                options = options.unshift(
                    <option key={-1} value={""} disabled={true}>{state.header}</option>
                )
            }
        }
        Object.assign(state, {inputType: 'select', options })
    }
}

InviteForm.propTypes = {
    newItem: PropTypes.object,
    showForm: PropTypes.bool,
}

const mapStateToProps = (state, ownProps) => {
    const {companyId} = ownProps
    let authgroups = state.getInPath(
        `entities.companyObjects.byId.${companyId}.authgroups`
    )
    const s = ownProps.stateParams
    return ({
        authgroups,
        newItem: state.getInPath(`entities.${s.formObjPath}`),
        showForm: state.getInPath(`entities.${s.formVisPath}`)
    })
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        postForm: (body, params) => { dispatch(fetchToState(params, body)) },
        toggleForm: () => { dispatch(toggleForm(ownProps.stateParams)) },
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteForm);