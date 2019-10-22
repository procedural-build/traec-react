import React from "react";
import { connect } from "react-redux";
import { BSCard } from "traec-react/utils/bootstrap";
import { postPasswordResetConfirm } from "../_redux/actionCreators";
import LoginForm from "../form";
import { renderItem, renderNonFieldErrors } from "./utils";

class PasswordResetConfirmPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      token: null,
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
    this.props.dispatch(postPasswordResetConfirm(post));
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
        <p>Your password reset is complete. You may now log in with your new password.</p>
        <LoginForm show_create_account={false} />
      </React.Fragment>
    );
  }

  render() {
    let { status } = this.props;

    let title = "Enter a new password";
    let body = this.renderBody();

    // If we have submitted the form then show a confirmation
    if (status === "confirmed") {
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
  status: state.getInPath("auth.registration.password_reset.status"),
  errors: state.getInPath("auth.registration.password_reset.errors")
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetConfirmPage);
