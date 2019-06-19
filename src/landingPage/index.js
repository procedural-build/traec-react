import React from "react";
import ReactMarkdown from "react-markdown";

export class TraecLandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <StaticContent content={this.props.content} />;
  }
}

export const StaticContent = function(content = null) {
  if (!content) {
    content =
      "ODS Track makes gathering, review, follow-up, emailing, analysis, compilation and submission of documents for certification easy.";
  }
  return (
    <React.Fragment>
      <ReactMarkdown source={content.content} />
    </React.Fragment>
  );
};
