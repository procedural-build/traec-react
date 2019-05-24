import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Recaptcha from 'react-recaptcha';
import Cookies from 'js-cookie';
import { postRegistration } from "../_redux/actionCreators"

/* TODO: This may be changed to make use of a csrftoken
const csrftoken = Cookies.get('csrftoken');
xhr.setRequestHeader("X-CSRFToken", csrftoken);  // For AJAX request
<input type='hidden' name='csrfmiddlewaretoken' value={$csrftoken} />

For now we have switched off csrftoken checks on the server for 
registration and activation api endpoints only.
*/

// GOOGLE DEVELOPMENT SITE KEY
//const gRecaptchaSiteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
// sustainabilitytool.net SITE KEY
//const gRecaptchaSiteKey = "6LesrYYUAAAAAOSE244oWzmKo18m0YFuC-o4U9il"

const getRecaptchaSiteKey = () => {
    const hostname = location.hostname
    if (hostname.endsWith('sustainabilitytool.net')) {
        return '6LesrYYUAAAAAOSE244oWzmKo18m0YFuC-o4U9il'
    } else if (hostname.endsWith('sustainabilitytool.com')) {
        return '6LfJt4sUAAAAAIGNjKs8OeA3gmDAYXmeiUHMtp2o'
    } else if (hostname.endsWith('ods-track.com')) {
        return '6LdViicUAAAAADRyFSQpSwJ3OBPjwC_jcrJizqsx'
    } else {
        return '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    }
}

class RegistrationForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password1: '',
            password2: '',
            errors: null,
            gRecaptchaResponse: "123"
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.verifyRecaptchaCallback = this.verifyRecaptchaCallback.bind(this);
    }

    onChange(e) {
        if (e.target.name == 'email') {
            this.setState({
                [e.target.name]: e.target.value,
                username: e.target.value
            });
        } else {
            this.setState({[e.target.name]: e.target.value});
        }
    }

    onSubmit(e) {
        console.log("Registration form submitted")
        e.preventDefault();

        const post = {
            name: "",
            username: this.state.username,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2,
            gRecaptchaSiteKey: getRecaptchaSiteKey(),
            gRecaptchaResponse: this.state.gRecaptchaResponse,
        }

        // Call action when form submitted
        //console.log(this.props.postLogin);
        this.props.dispatch(postRegistration(post));
    }

    componentWillMount() {
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
                    disabled={attr == 'username' ? 'disabled' : ''}
                    placeholder={placeholder} type={fieldType} name={attr} 
                    onChange={this.onChange} value={this.state[attr]}
                />
                {error}
                {help_block}
            </div>
        );
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

    verifyRecaptchaCallback(response) {
        //console.log("HERE IS THE VERIFICATON CALLBACK")
        //console.log(response);
        this.setState({gRecaptchaResponse: response});
    };

    render() {
        let isAuthWarning = this.props.isAuthenticated ? <p>Logged in</p> : ""
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.render_non_field_errors()}
                {this.render_item("first_name", "First Name")}
                {this.render_item("last_name", "Last Name")}
                {this.render_item("email", "E-mail")}
                {this.render_item("username", "Username")}
                {this.render_item("password1", "Password", "", "password")}
                {this.render_item("password2", "Password (again)", "", "password")}

                <Recaptcha 
                    sitekey={getRecaptchaSiteKey()}
                    verifyCallback={this.verifyRecaptchaCallback}
                />

                <div className="form-group">
                    <button className="btn btn-sm btn-primary btn-block" type="submit">Register</button>
                </div>
            </form>
        );
    }
}

RegistrationForm.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.getIn('auth.isAuthenticated'.split('.')),
    errors: state.getIn('auth.registration.errors'.split('.')),
    redirect: state.getIn('auth.registration.redirect'.split('.')),
})

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

