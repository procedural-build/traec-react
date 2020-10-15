import React from "react";
import { ReportLink } from "./utils";
import { emailTypes } from "../emailTypes";
import { getEmailSettingType } from "../settings/emailSettingRow";

export const EmailRecipient = props => {
  let { recipient, projectId, companyId, compute } = props;
  let total = 0;

  let emailRecipientType = getEmailSettingType(projectId, companyId, compute);

  let cols = emailTypes(emailRecipientType).map((emailType, i) => {
    let num = recipient.getInPath(`sent_summary.email_types.${emailType}`) || 0;
    total += parseInt(num) || 0;
    return (
      <div key={i} className="col-sm-1 text-center">
        {num}
      </div>
    );
  });

  cols.push(
    <div key={cols.length} className="col-sm-1 text-center">
      {total}
    </div>
  );

  return (
    <div>
      <div className="row">
        <div className="col-sm-5">
          <ReportLink companyId={companyId} projectId={projectId} recipient={recipient} />
        </div>
        {cols}
      </div>
      <hr className="m-1 p-0" />
    </div>
  );
};
