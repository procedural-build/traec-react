import React from "react";

export const RenderErrorMessage = function(props) {
  return (
    <div>
      <h3>Something went wrong</h3>
      <h3>{`Please report the following error: ${props.error}`}</h3>
    </div>
  );
};

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorMessage: null,
      errorInfo: null,
      errorValue: null
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error,
      errorMessage: error.message,
      errorValue: error.valueOf ? error.valueOf() : error.valueOf,
      errorInfo: info
    });
    console.error(info);
  }

  render() {
    let { hasError } = this.state;

    let defaultMsg = (
      <div>
        <p>
          <b>Please try reloading the page first</b>. If the error persists then report the error using the "Report an
          Error" box in the bottom-right of the screen.
        </p>
        <p>
          When reporting please select the checkbox "Include data about your current environment, like the browser and
          page URL.". This helps us understand your feedback better
        </p>
      </div>
    );

    let { title = "Error loading component", msg = defaultMsg } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div className="alert alert-warning">
          <h3>{title}</h3>
          {msg}
        </div>
      );
    }
    return this.props.children;
  }
}
