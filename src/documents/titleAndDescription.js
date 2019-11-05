import React from "react";
import Octicon from "react-octicon";

export class TitleAndDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDescription: false
    };
  }

  renderDescription(description) {
    if (this.state.showDescription) {
      return <div dangerouslySetInnerHTML={{ __html: description.get("text") }} />;
    } else {
      return null;
    }
  }

  renderTitle(description) {
    return (
      <div>
        <div className="col-sm-11">
          <h5>{description.get("title")}</h5>
          <i>Assingee</i>
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
    return (
      <React.Fragment>
        {this.renderTitle(this.props.description)}
        {this.renderDescription(this.props.description)}
      </React.Fragment>
    );
  }
}
