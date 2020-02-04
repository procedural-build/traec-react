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
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, errorMessage: error.message, errorValue: error.valueOf() });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
