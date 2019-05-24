import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from "react-router-dom";
import { Icon } from "AppSrc/dashboards/icons";
import { BSCard, BSBtn } from 'AppSrc/utils/bootstrap'

import { postPasswordResetConfirm } from "AppSrc/auth/_redux/actionCreators"
import LoginForm from 'AppSrc/auth/form'


class PasswordResetConfirmPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            uid: null,
            token: null,
            new_password1: "",
            new_password2: ""
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        let {uid, token} = this.props.match.params
        this.setState({uid, token})
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const post = this.state
        this.props.dispatch(postPasswordResetConfirm(post));
    }

    render_non_field_errors() {
        const attr = "non_field_errors"
        const errors = this.props.errors
        if (errors && errors.has(attr)) {
            //console.log("NON_FIELD_ERRORS", errors)
            return (
                <div className="alert alert-danger form-control-sm">
                    {errors.get(attr)}
                </div>
            )
        }
        return ""
    }

    render_item(attr, placeholder, help_block, fieldType="text") {
        // Get the validity and error message of this field
        const errors = this.props.errors
        const validClass = (errors && errors.has(attr)) ? "is-invalid" : ""
        const error = (validClass) ? <div className="invalid-feedback">{errors.get(attr).join(' ')}</div> : null
        // Render
        return (
            <div className="form-group">
                <input className={`form-control form-control-sm ${validClass}`} 
                    placeholder={placeholder} type={fieldType} name={attr} 
                    onChange={this.onChange} value={this.state[attr]}
                />
                {error}
                {help_block}
            </div>
        );
    }

    render_body() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.render_non_field_errors()}
                {this.render_item("new_password1", "New Password", "", "password")}
                {this.render_item("new_password2", "New Password (again)", "", "password")}

                <div className="form-group">
                    <button className="btn btn-sm btn-primary btn-block" type="submit">Set new password</button>
                </div>
            </form>
        );
    }

    render_done() {
        return (
            <React.Fragment>
            <p>Your password reset is complete.  You may now log in with your new password.</p>
            <LoginForm 
                show_create_account={false}
            />
            </React.Fragment>
        )
    }

    render() {
        let {status} = this.props 
        //console.log("STATUS", status)
        let title = "Enter a new password"
        let body = this.render_body()
        // If we have submitted the form then show a confirmation
        if (status == "confirmed") {
            title = "Password reset Complete"
            body = this.render_done()
        }
        return (
            <div className="container">
                <div className="col-sm-8 offset-sm-2">
                    <BSCard 
                        title = {title}
                        body = {body}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.getIn('auth.isAuthenticated'.split('.')),
    status: state.getIn('auth.registration.password_reset.status'.split('.')),
    errors: state.getIn('auth.registration.password_reset.errors'.split('.'))
})

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetConfirmPage);