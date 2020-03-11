import React, { Component } from "react";
import { saveToRedux } from "../utils/cardUtils";
import { connect } from "react-redux";

export class TaskScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false,
      value: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.saveToRedux = saveToRedux.bind(this);
  }

  render() {
    return (
      <div className="row">
        <h6 className="col-2">Score: </h6>
        {this.renderValue()}
        <div className="col-4">{this.props.metricTarget ? <h6>{`Target: ${this.props.metricTarget}`}</h6> : null}</div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.treeId !== this.props.treeId) {
      this.setState({ value: 0 });
    }

    if (this.props.hasChildren && this.props.loadedChildren) {
      this.handleChildScoreUpdates();
    } else if (this.props.scoreValues && !this.state.value) {
      let value = this.props.scoreValues.first().get("value");
      if (value) {
        this.setState({ value });
      }
    }
  }

  handleChildScoreUpdates() {
    if (this.props.scoreFromChildren && this.props.scoreFromChildren !== this.state.value) {
      this.setState(
        {
          isSaved: false,
          value: this.props.scoreFromChildren
        },
        () => {
          this.saveToRedux();
        }
      );
    }
  }

  renderValue() {
    let calculated = this.props.hasChildren;
    let isValid = isNaN(this.state.value);

    let value = null;
    if (calculated) {
      value = <h6>{this.state.value}</h6>;
    } else {
      value = (
        <input
          type="number"
          className={`form-control m-0 p-0 ${isValid ? "is-invalid" : ""}`}
          name={"value"}
          value={this.state.value === null ? "" : this.state.value}
          onChange={e => this.handleInputChange(e)}
          onBlur={this.handleBlur}
        />
      );
    }
    return <div className="col-3">{value}</div>;
  }

  handleBlur(e) {
    e.preventDefault();
    this.saveToRedux();
  }

  handleInputChange(e) {
    e.preventDefault();
    let calculated = this.props.hasChildren;

    if (isNaN(e.target.value)) {
      return null;
    }

    if (!calculated) {
      this.setState({
        isSaved: false,
        value: e.target.value
      });
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default TaskScore = connect(
  null,
  mapDispatchToProps
)(TaskScore);
