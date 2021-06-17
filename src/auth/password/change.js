import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { BSCard } from "traec-react/utils/bootstrap";
import { postPasswordChange } from "../_redux/actionCreators";
import { renderItem, renderNonFieldErrors } from "./utils";

class PasswordChangePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      new_password1: "",
      new_password2: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderItem = renderItem.bind(this);
  }

  componentDidMount() {
    let { uid, token } = this.props.match.params;
    this.setState({ uid, token });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const post = this.state;
    this.props.dispatch(postPasswordChange(post));
  }

  renderBody() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {renderNonFieldErrors(this.props.errors)}
        {this.renderItem("new_password1", "New Password", "", "password")}
        {this.renderItem("new_password2", "New Password (again)", "", "password")}

        <div className="form-group">
          <button className="btn btn-sm btn-primary btn-block" type="submit">
            Set new password
          </button>
        </div>
      </form>
    );
  }

  renderDone() {
    return (
      <React.Fragment>
        <p>You have successfully changed your password. You must use this new password to login in the future.</p>
        <Link className="btn btn-sm btn-primary" to="/accounts/profile">
          Return My Profile
        </Link>
      </React.Fragment>
    );
  }

  render() {
    let { status, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <Redirect to="/accounts/password/reset" />;
    }

    let title = "Enter a new password";
    let body = this.renderBody();

    // If we have submitted the form then show a confirmation
    if (status === "success") {
      title = "Password reset Complete";
      body = this.renderDone();
    }

    return (
      <div className="container">
        <div className="col-sm-8 offset-sm-2">
          <BSCard title={title} body={body} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.getInPath("auth.isAuthenticated"),
  status: state.getInPath("auth.registration.password_change.status"),
  errors: state.getInPath("auth.registration.password_change.errors")
});

export default connect(mapStateToProps)(PasswordChangePage);
