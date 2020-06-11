import React from "react";
import { BSCard } from "traec-react/utils/bootstrap";

class RegistrationConfirmationCard extends React.Component {
  render_body() {
    return (
      <div>
        <p>An activation email has been sent. Check your email and click the link to verify your email address.</p>
        {/*<BSBtn text="Send again"/>*/}
      </div>
    );
  }

  render() {
    return <BSCard title="Check your email" body={this.render_body()} />;
  }
}

export { RegistrationConfirmationCard };
