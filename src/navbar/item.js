import React from "react";
import { Link } from "react-router-dom";
import Octicon from 'react-octicon';


class MenuItem extends React.Component {

  renderIcon( item ) {
    let iconName = item.get('octicon')
    if (!iconName) {return null}
    return (<Octicon name={iconName}/>);
  }


  render() {
    let {item} = this.props

    if (!item.get('label')) { return (<hr />) }

    return (
      <li className="nav-item">
        <Link to={item.get('to')} className="nav-link">
          <span>{this.renderIcon(item)} {item.get('label')}</span>
        </Link>
      </li>
    );
  }
}

export { MenuItem };
