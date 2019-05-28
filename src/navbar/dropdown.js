import React from "react";
import {Link} from "react-router-dom";


class DropDownItem extends React.Component {

    renderItem( item, keyIndex ) {
        const label = item.get('label')
        const to = item.get('to')
        const onClick = item.get('onClick')
        if (!(label == undefined)) {
            if (onClick) {
                return (<a key={keyIndex} onClick={onClick} className="dropdown-item">{label}</a>);
            } else {
                return (<Link key={keyIndex} to={to} className="dropdown-item">{label}</Link>);
            }
        } else {
            return (<div key={keyIndex} className="dropdown-divider"></div>);
        }
    }

    renderItems() {
        let {items} = this.props
        if (!items) { return null }
        return items.map( (item, i) => this.renderItem(item, i) );
    }

    render() {
        let {label, extraDropdownClass} = this.props
        return (
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {label}
              </a>
              <div className={`dropdown-menu ${extraDropdownClass}`} aria-labelledby="navbarDropdown">
                {this.renderItems()}
              </div>
            </li>
          );
    };
}

export { DropDownItem };