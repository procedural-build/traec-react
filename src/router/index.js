import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginRedirect from "traec-react/router/login-redirect";
import AccountsRouter from "../auth/router";
import UserProfile from "../user/userProfile";
import NavBar from "../navBar";

export default class AppRouter extends React.Component {
  render() {
    let { mainSwitch, navBarBrand, NavBarComponent = NavBar } = this.props;
    let UserProfileComponent = this.props.UserProfile || UserProfile;

    return (
      <React.Fragment>
        <NavBarComponent brand={navBarBrand} />
        <Switch>
          {/* Pass through a special router which checks login and directs if not / */}
          <Route
            path="/accounts"
            render={routeProps => <AccountsRouter {...routeProps} UserProfile={UserProfileComponent} />}
          />

          {/* Pass through a special router which checks login and directs if not / */}
          <Route
            render={props => (
              <LoginRedirect
                mainswitch={mainSwitch}
                {...props} // Unpack the props passed by the router into the component
              />
            )}
          />
        </Switch>
      </React.Fragment>
    );
  }
}
