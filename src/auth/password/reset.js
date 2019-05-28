import React from "react";
import { connect } from 'react-redux';
import { BSCard } from 'traec-react/utils/bootstrap'
import { postPasswordReset } from "../_redux/actionCreators"


class PasswordResetPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            email: ""
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const post = {
            email: this.state.email
        }
        this.props.dispatch(postPasswordReset(post));
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

    render_done() {
        return (
            <React.Fragment>
            <p>An email with further instructions has been sent to your email address.  Follow the instructions and link in that email.</p>
            <p>If you have not recieved an email please check your junk email to ensure that it has not been filtered out.</p>
            </React.Fragment>
        )
    }

    render_body() {
        return (
            <React.Fragment>
            <p>Forgotten your password? Enter your e-mail address below, and we'll e-mail instructions for setting a new one.</p>
            <form className="form" onSubmit={this.onSubmit}>
                {this.render_non_field_errors()}
                {this.render_item("email", "Enter email")}

                <div className="form-group">
                    <button className="btn btn-sm btn-primary btn-block" type="submit">Request a password reset</button>
                </div>
            </form>
            </React.Fragment>
        )
    }

    render() {
        let {status} = this.props 
        let title = "Enter your email address"
        let body = this.render_body()
        // If we have submitted the form then show a confirmation
        if (status == "pending") {
            title = "Check your email"
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
    isAuthenticated: state.getInPath('auth.isAuthenticated'),
    status: state.getInPath('auth.registration.password_reset.status'),
    errors: state.getInPath('auth.registration.password_reset.errors')
})

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetPage);