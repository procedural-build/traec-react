import React from "react";
import ReactDOM from "react-dom";

import DatePicker from 'react-date-picker'
import Octicon from 'react-octicon';
import Moment from 'moment';


export class DateRangePicker extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showDropdown: false,
            fromDateValue: null,
            toDateValue: null
        }

        this.toggleShowDropdown = this.toggleShowDropdown.bind(this)
    }

    toggleShowDropdown(e) {
        e.preventDefault()
        //console.log("TOGGLING SHOW DATE PICKER DROPDOWN")
        this.setState({showDropdown: !this.state.showDropdown})
    }

    floatStyle() {
        return (this.props.floatStyle || "float-right")
    }

    render_calendars() {
        if (!this.state.showDropdown) { return null }
        return (
            <div className="dropdown transform-calendar-left" style={{backgroundColor: "white", borderColor: "black", position:"absolute", zIndex:"100"}}>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <DatePicker
                                    onChange={value => this.props.onChange({target: {
                                            value: value,
                                            name: "fromDate"
                                        }})}
                                    value={this.props.fromDateValue}
                                    calendarClassName="transform-calendar-left"
                                />
                            </td>
                            <td>
                                <DatePicker
                                    onChange={value => this.props.onChange({target: {
                                            value: value,
                                            name: "toDate"
                                        }})}
                                    value={this.props.toDateValue}
                                    calendarClassName="transform-calendar-left"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <a href="#" className="float-right" onClick={this.toggleShowDropdown}>Close</a>
            </div>
        )
    }

    render() {
        let {fromDateValue, toDateValue} = this.props
        //console.log("RENDERING COMPONNET")
        return (
            <div className="float-right" aria-label="date-range-menu">
                <a onClick={this.toggleShowDropdown}>
                    <Octicon name="calendar" /> {Moment(fromDateValue).format("MMM Do YY")} to {Moment(toDateValue).format("MMM Do YY")} <span className="caret"></span>
                </a>
                {this.render_calendars()}
            </div>  
        );
    }  
}
