import React from "react";
import ReactMarkdown from "react-markdown";

const HowItWorks = function() {
  const input =
    "ODS Track makes gathering, review, follow-up, emailing, analysis, compilation and submission of documents for certification easy.";
  return <ReactMarkdown source={input} />;
};

export class StaticContent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HowItWorks />
      </React.Fragment>
    );
  }
}
