import React from "react";
import Recaptcha from "react-recaptcha";
import { isIP } from "./index";

export const TraecRecaptcha = props => {
  let { show, setRecaptcha, setRecaptchaInstance, recaptchaExtra } = props;

  if (!show) {
    return null;
  }

  return (
    <div className="row mb-1">
      <div className="col-sm-6">
        <Recaptcha
          ref={e => {
            setRecaptchaInstance(e);
          }}
          sitekey={getRecaptchaSiteKey()}
          render="explicit"
          verifyCallback={response => {
            setRecaptcha(response);
          }}
          onloadCallback={() => {
            console.log("ONLOAD CALLBACK");
          }}
        />
      </div>
      <div className="col-sm-6">{recaptchaExtra}</div>
    </div>
  );
};

export const ReloadRecaptcha = props => {
  let { setRecaptchaInstance, recaptchaInstance } = props;

  if (!recaptchaInstance) {
    return null;
  }

  return (
    <div className="m-0 p-0 mb-3">
      <a
        style={{ cursor: "pointer" }}
        onClick={() => {
          recaptchaInstance.reset();
          setRecaptchaInstance(null);
        }}
      >
        Reload reCaptcha
      </a>
    </div>
  );
};

export const getRecaptchaSiteKey = () => {
  const hostname = location.hostname;
  if (hostname.endsWith("sustainabilitytool.net")) {
    return "6LesrYYUAAAAAOSE244oWzmKo18m0YFuC-o4U9il";
  } else if (hostname.endsWith("sustainabilitytool.com")) {
    return "6LfJt4sUAAAAAIGNjKs8OeA3gmDAYXmeiUHMtp2o";
  } else if (hostname.endsWith("ods-track.com")) {
    return "6LdViicUAAAAADRyFSQpSwJ3OBPjwC_jcrJizqsx";
  } else if (hostname.endsWith("abate.dk")) {
    return "6Lc1i8gUAAAAAIhmFXMivq-k_my-9t4JxejzWpor";
  } else if (hostname.endsWith("procedural.build")) {
    return "6LcpY-MUAAAAAGsdHWQsRy7VJN1iydQD95e1RRnA";
  } else if (isIP(hostname)) {
    return "localsite";
  } else {
    return "6LcbH3wUAAAAANJthLG_viHtCcXrDnXJ_kzH8Nga";
  }
};
