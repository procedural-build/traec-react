import React from "react";
import Octicon from "react-octicon";
import { toggleShowDescription } from "../tasks/utils/cardUtils";

export class TitleAndDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDescription: false
    };
    this.toggleShowDescription = toggleShowDescription.bind(this);
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
      <div className="col-sm-11 pl-0">
        <h5 className="">{description.get("title")}</h5>
        <i>{this.props.Assingee}</i>
        <div dangerouslySetInnerHTML={{ __html: description.get("text") }} />
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
