import React, { useEffect } from "react";
import { ErrorBoundary } from "traec-react/errors/handleError";
import Traec from "traec";
import { connect } from "react-redux";

const AcceptProjectInvites = props => {
  useEffect(() => {
    Traec.fetchRequired.bind({
      props,
      requiredFetches: [new Traec.Fetch("project_invite_all", "list")]
    })();
  }, []);

  return (
    <div>
      <ErrorBoundary>
        Hello World!
        {props.projectInvites}
      </ErrorBoundary>
    </div>
  );
};

const mapStatToProps = (state, ownProps) => {
  let user = state.getInPath(`auth.user`);
  let projectInvites = state.getInPath(`entities.projectInvites.byId`);

  return {
    user,
    projectInvites
  };
};

export default connect(mapStatToProps)(AcceptProjectInvites);
