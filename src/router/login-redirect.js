import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class LoginRedirect extends React.Component {
  render_spinner() {
    return (
      <div className="text-center">
        <div className="lds-dual-ring" />
      </div>
    );
  }

  render() {
    let { isAuthenticated, authStatus } = this.props;
    const nextUrl = this.props.location.pathname;

    if (!isAuthenticated) {
      if (authStatus == "pending") {
        return this.render_spinner();
      } else if (!authStatus || authStatus == "failed") {
        // Redirect the user to login if they are not Authenticated
        if (
          !(
            nextUrl == "/" ||
            nextUrl.startsWith("/accounts/login") ||
            nextUrl.startsWith("/accounts/password/reset") ||
            nextUrl.startsWith("/accounts/activate") ||
            nextUrl.startsWith("/accounts/register")
          )
        ) {
          console.log("REDIRECTING TO LOGIN", nextUrl);
          return (
            <Redirect
              to={{
                pathname: `/accounts/login`,
                state: { nextUrl: `${nextUrl}` }
              }}
            />
          );
        }
      } else {
        //pass through to render_routes below
      }
    } else {
      if (authStatus === "confirmed" && nextUrl === "/") {
        return <Redirect to={`/accounts/profile/`} />;
      }
    }
    return this.props.mainswitch;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.getInPath("auth.isAuthenticated"),
    authStatus: state.getInPath("auth.status")
  };
};

const mapDispatchToProps = dispatch => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginRedirect);
