import React from "react";
import { connect } from "react-redux";
import { BSCard } from "traec-react/utils/bootstrap";
import { postPasswordReset } from "../_redux/actionCreators";
import { renderItem, renderNonFieldErrors } from "./utils";

class PasswordResetPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderItem = renderItem.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const post = {
      email: this.state.email
    };
    this.props.dispatch(postPasswordReset(post));
  }

  renderDone() {
    return (
      <React.Fragment>
        <p>
          An email with further instructions has been sent to your email address. Follow the instructions and link in
          that email.
        </p>
        <p>
          If you have not recieved an email please check your junk email to ensure that it has not been filtered out.
        </p>
      </React.Fragment>
    );
  }

  renderBody() {
    return (
      <React.Fragment>
        <p>
          Forgotten your password? Enter your e-mail address below, and we'll e-mail instructions for setting a new one.
        </p>
        <form className="form" onSubmit={this.onSubmit}>
          {renderNonFieldErrors(this.props.errors)}
          {this.renderItem("email", "Enter email")}

          <div className="form-group">
            <button className="btn btn-sm btn-primary btn-block" type="submit">
              Request a password reset
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }

  render() {
    let { status } = this.props;
    let title = "Enter your email address";
    let body = this.renderBody();

    // If we have submitted the form then show a confirmation
    if (status === "pending") {
      title = "Check your email";
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
)(PasswordResetPage);
