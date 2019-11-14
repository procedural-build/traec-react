import React from "react";
import Octicon from "react-octicon";
import { toggleShowDescription } from "../tasks/utils/cardUtils";

export class TitleAndDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDescription: true
    };
    this.toggleShowDescription = toggleShowDescription.bind(this);
  }

  renderDescription(description) {
    if (this.state.showDescription) {
      return <div dangerouslySetInnerHTML={{ __html: description.toJS()[0].text }} />;
    } else {
      return null;
    }
  }

  renderTitle(description) {
    return (
      <div className="row">
        <div className="col-sm-11">
          <h5>{description.toJS()[0].title}</h5>
        </div>
        <div className="col-sm-1">
          <Octicon
            name={this.state.showDescription ? "chevron-up" : "chevron-down"}
            onClick={this.toggleShowDescription}
          />
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.description) {
      return null;
    }
    return (
      <React.Fragment>
        {this.renderTitle(this.props.description)}
        {this.renderDescription(this.props.description)}
      </React.Fragment>
    );
  }
}
