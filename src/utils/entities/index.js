import React from "react";

export class RightArrow extends React.Component {
  render() {
    return <span>&#10132;</span>;
  }
}

export class Spinner extends React.Component {
  constructor(props) {
    super(props);

    this.interval = setInterval(() => this.setState({ showSpinner: false }), 10000);

    this.state = {
      showSpinner: true
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderTitle() {
    let { title } = this.props;
    if (title && this.state.showSpinner) {
      return <h5>{title}</h5>;
    }
    return null;
  }

  renderExplanation() {
    let { explanation } = this.props;
    if (explanation) {
      return <p>{explanation}</p>;
    }
    return null;
  }

  renderTimedOutComment() {
    let { timedOutComment } = this.props;
    if (this.state.showSpinner || !timedOutComment) {
      return null;
    }
    return <div>{timedOutComment}</div>;
  }

  renderSpinner() {
    if (!this.state.showSpinner) {
      return null;
    }
    return <div className="lds-dual-ring" />;
  }

  render() {
    return (
      <div className="text-center">
        {this.renderTitle()}
        {this.renderExplanation()}
        {this.renderSpinner()}
        {this.renderTimedOutComment()}
      </div>
    );
  }
}

export const loading = function(explanation) {
  if (explanation === "dashboard") {
    explanation =
      "Loading Dashboard Data.  This may take a while if it is the first time you are accessing this project and/or work package.";
  } else if (explanation === "report") {
    explanation = "Loading Report";
  }

  return <Spinner title="Loading..." explanation={explanation} />;
};
