import React from 'react'


export class RightArrow extends React.Component {
    render() {
        return (<span>&#10132;</span>)
    }
}


export class Spinner extends React.Component {

    constructor(props) {
        super(props) 

        this.interval = setInterval(() => this.setState({showSpinner: false}), 10000);

        this.state = {
            showSpinner: true   
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
      }

    render_title() {
        let {title} = this.props
        if (title) {
            return (<h5>{title}</h5>)
        }
        return null
    }

    render_explanation() {
        let {explanation} = this.props
        if (explanation) {
            return (<p>{explanation}</p>)
        }
        return null
    }

    render_spinner() {
        if (!this.state.showSpinner) { return null }
        return (<div className="lds-dual-ring"></div>)
    }

    render() {
        return ( 
            <div className="text-center">
                {this.render_title()}
                {this.render_explanation()}
                {this.render_spinner()}
            </div>
        )
    }
}



export const loading = function(explanation) {

    if (explanation === 'dashboard'){
        explanation = "Loading Dashboard Data.  This may take a while if it is the first time you are accessing this project and/or work package."
    } else if (explanation === 'report'){
        explanation = "Loading Report"
    }

    return (
        <Spinner
            title="Loading..."
            explanation={explanation}
        />
    )
}