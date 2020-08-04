import React from "react";
import Traec from "traec/index";

export class TargetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setCardTarget(target) {
    let fetch = new Traec.Fetch("tracker_commit_target", "post", {
      trackerId: this.props.trackerId,
      commitId: this.props.commitId
    });
    fetch.updateFetchParams({
      preFetchHook: data => {
        return { ...data, metric: this.props.metric, value: target, date: new Date() };
      }
    });
    fetch.dispatch();
  }

  onChange(e) {
    this.setState({ target: e.target.value }, () => console.log("target", this.state.target));
  }

  onSubmit(e) {
    e.preventDefault();
    this.setCardTarget(this.state.target);
    this.props.toggleForm(e);
  }

  renderClose() {
    return (
      <button type="button" onClick={this.props.toggleForm} className="btn btn-sm btn-default col-2">
        Close
      </button>
    );
  }

  renderSubmit() {
    return (
      <button type="button" onClick={this.onSubmit} className="btn btn-sm btn-default col-2 ml-2 mr-2">
        Submit
      </button>
    );
  }

  renderForm() {
    return <input type="number" className="form-control col-4" placeholder="Set Target" onChange={this.onChange} />;
  }

  render() {
    if (!this.props.showForm) {
      return null;
    }
    return (
      <div className="col-sm-12 pt-2 pb-2">
        <div className="row">
          {this.renderForm()}
          <span className="col-3" />
          {this.renderSubmit()}
          {this.renderClose()}
        </div>
      </div>
    );
  }
}
