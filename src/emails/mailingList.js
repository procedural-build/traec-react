import React, { useEffect } from "react";
import { connect } from "react-redux";
import Traec from "traec";

const MailingList = props => {
  let { mailReceiver, userId, user } = props;

  useEffect(() => {
    Traec.fetchRequired.bind({
      props,
      requiredFetches: [new Traec.Fetch("mailReceiver", "read")]
    })();
  });

  const updateMail = e => {
    if (mailReceiver) {
      new Traec.Fetch("mailReceiver", "delete", { mailReceiverId: mailReceiver.get("uid") }).dispatch();
    } else {
      let fetch = new Traec.Fetch("mailReceiver", "post");
      fetch.updateFetchParams({
        body: { user: userId, email: user.get("email") }
      });
      fetch.dispatch();
    }
  };

  return (
    <div>
      <h3>Subscribe to newsletter</h3>
      <input type="checkbox" onClick={e => updateMail(e)} checked={!!mailReceiver} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let { userId } = ownProps;
  let mailReceiver = state.getInPath("entities.user.mailReceiver");
  mailReceiver = mailReceiver ? mailReceiver.first() : mailReceiver;

  let user = state.getInPath("auth.user");

  return {
    userId,
    user,
    mailReceiver
  };
};

export default connect(mapStateToProps)(MailingList);
