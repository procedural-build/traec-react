import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Traec from "traec";
import * as d3 from "d3";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";
import { cluster, stratify } from "d3-hierarchy";
import { fromJS } from "immutable";
import d3Tip from "d3-tip";

export default class ReportBarPlot extends React.Component {
  constructor(props) {
    super(props);
    this.DrawBarChart = this.DrawBarChart.bind(this);

    this.state = {
      emails: props.emails
    };

    this.requiredFetches = [
      new Traec.Fetch("project_email", "list"),
      new Traec.Fetch("project_email_recipient", "list"),
      new Traec.Fetch("company_email_recipient", "list"),
      new Traec.Fetch("company_email", "list")
    ];

    // action bindings
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
    this.DrawBarChart(this.state.emails);
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
  }

  componentWillUnmount() {
    d3.select(".barChart").selectAll("*").remove;
  }

  DrawBarChart(emails) {
    d3.select(".barChart").selectAll("*").remove;
    if (!emails) {
      return null;
    }
    let emailData = {}; // Main object to store dates(by month) and the types of emails as well as their count. This splits into several lists for easier access for d3 to make the DOM
    var dateList = []; // List to hold all date values that wil be keys in the dateTypeMap (Used for easier access to drawing d3 charts)
    let emailTypeList = []; // List to hold the types of emails in the DB. Used for the x axis, so the types will repeat in order to display the correct Email type at the right x position
    let yValueArray = []; // Holds the number of emails of each type sent, used for y axis
    let barplotCoordinateObject = {}; // Holds the x and y data for d3 to display data.

    var LEGEND = ["undefined", "company_invite", "project_invite", "overdue", "project_ref_submitted"];
    //Todo, make LEGEND above dynamic

    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    for (var mail of emails.toList()) {
      let minDate = mail.get("min_date").slice(0, 7);
      let maxDate = mail.get("max_date").slice(0, 10);
      let emailTypes = mail.getInPath(`email_types`);

      if (minDate.slice(0, 4) == 2019) {
        //Only analyze emails with 2019 date for now, todo in the future: add dropdown to select year
        if (minDate.slice(5, 6) == 0) {
          minDate = minDate.slice(6, 7);
          dateList.push(month[minDate - 1]);
        } else {
          minDate = minDate.slice(5, 7);
          dateList.push(month[minDate - 1]);
        }
      } else {
        console.log("Wrong year");
      }
      emailData[minDate] = { [emailTypes]: null };
    }

    let emailDataMapped = Object.entries(emailData).map(([key, value]) => ({
      months: key,
      emailType: value
    }));

    for (let i = 0; i < emailDataMapped.length; i++) {
      var currentData = Object.values(emailDataMapped[i]); //Get the emailTypes with their values
      currentData = Object.keys(currentData[1]); //Update the currentData with the emailType object
      for (let j = 0; j < LEGEND.length; j++) {
        let currentEmailTypeString = LEGEND[j]; //Different email types to iterate the array
        currentEmailTypeString = currentEmailTypeString.toString();
        let currentStringLength = currentEmailTypeString.length; //Get Length of string of each email type
        if (currentData[0].includes(currentEmailTypeString)) {
          emailTypeList.push(currentEmailTypeString);
          let beginningSliceValue = currentData[0].indexOf(currentEmailTypeString); //Find beginning index to slice the emailcount of each type
          let yValue = currentData[0].slice(
            currentStringLength + beginningSliceValue,
            currentStringLength + beginningSliceValue + 7
          ); //Can only handle 4 digit numbers on y axis for now(+5 for 2 digit, +6 for 3 digit, +7 for 4 digit, etc.)
          yValue = yValue.replace(/\D/g, ""); //Remove non integer values from the string
          yValueArray.push(parseInt(yValue));
        }
      }
    }
    yValueArray = yValueArray.filter(d => {
      return d != 0;
    });

    for (let i = 0; i < yValueArray.length; i++) {
      barplotCoordinateObject[i] = yValueArray[i];
    }

    let data = Object.entries(barplotCoordinateObject).map(([key, value]) => ({
      x: key,
      y: value
    }));

    var svg = d3.select(".barChart");
    var margin = {
      top: 20,
      right: 5,
      bottom: 5,
      left: 200
    };
    var colorLegend = d3
      .scaleOrdinal()
      .domain(LEGEND)
      // .range(["black"]);
      .range(["red", "orange", "gold", "green", "blue"]);

    var width = 1800;
    var height = 500 + margin.top + margin.bottom + 20;
    let yTicks = 5; //default number of yaxis ticks is 5, which is increased depending on number of emails
    var color = d3.scaleOrdinal(["red", "orange", "gold", "green", "blue"]);

    var x = d3
        .scaleBand()
        .rangeRound([0, width / 1.9])
        .padding(0.0),
      y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var ymaxdomain = d3.max(yValueArray);

    if (ymaxdomain <= 5) {
      yTicks = ymaxdomain++;
    } else if (ymaxdomain > 5 && ymaxdomain < 21) {
      yTicks = ymaxdomain;
      ymaxdomain += 4;
    } else if (ymaxdomain >= 21) {
      ymaxdomain += 5;
      yTicks = 15;
    }

    x.domain(dateList);

    y.domain([0, ymaxdomain]);

    var x1 = d3
      .scaleBand()
      .rangeRound([0, width / 2]) //Bar size
      .padding(0.0) //Padding between bars of same month
      .domain(
        data.map(function(d) {
          return d.x;
        })
      );

    var groups = g
      .selectAll(null)
      .data(data)
      .enter()
      .append("g");

    var bars = groups
      .selectAll(null)
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        //Need to figure out how to add custom spacing between month blocks in a better way
        // if (i > 4 && i <= 9) {
        //   //I will leave it for now, but it can be upgraded in the future so that the charts are actually dynamic
        //   return x1(d.x) + 10;
        // } else if (i > 9 && i <= 14) {
        //   return x1(d.x) + 20;
        // } else if (i > 14 && i <= 19) {
        //   return x1(d.x) + 30;
        // } else if (i > 19 && i <= 24) {
        //   return x1(d.x) + 40;
        // } else if (i > 24 && i <= 29) {
        //   return x1(d.x) + 50;
        // } else if (i > 29 && i <= 34) {
        //   return x1(d.x) + 60;
        // } else {
        return x1(d.x);
        // }
      })
      .attr("y", function(d) {
        return y(d.y);
      })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) {
        return height - y(d.y);
      })
      .attr("fill", function(d) {
        return color(d.x);
      });

    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5, "s"));

    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(yTicks, "s"))
      .append("text")
      .attr("x", 0)
      .attr("y", 0 - margin.top / 2)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Email types sent per month");

    var tip = d3Tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>" + emailTypeList[d.x] + ": " + d.y + "</strong>";
      });

    svg.call(tip);

    bars.on("mouseover", tip.show).on("mouseout", tip.hide);

    //LEGEND
    //Disabled because it does not coordinate with the colours on the graph if not all email types are present.

    // let size = 18;
    // var legend = svg
    //   .append("g")
    //   .attr("class", "legend")
    //   //.attr("x", w - 65)
    //   //.attr("y", 50)
    //   .attr("height", 100)
    //   .attr("width", 100)
    //   .attr("transform", "translate(200,0)");

    // svg
    //   .selectAll("legend")
    //   // .data(LEGEND)
    //   .data(emailTypeList)
    //   .enter()
    //   .append("rect")
    //   .attr("x", 10)
    //   .attr("y", function(d, i) {
    //     return 100 + i * (size + 5);
    //   }) // 100 is where the first dot appears. 25 is the distance between dots
    //   .attr("width", size)
    //   .attr("height", size)
    //   .style("fill", function(d) {
    //     return color(d);
    //   });

    // svg
    //   .selectAll("legend")
    //   // .data(LEGEND)
    //   .data(emailTypeList)
    //   .enter()
    //   .append("text")
    //   .attr("x", 30)
    //   .attr("y", function(d, i) {
    //     return 100 + i * (size + 5) + size / 2;
    //   }) // 100 is where the first dot appears. 25 is the distance between dots
    //   .style("fill", function(d) {
    //     return colorLegend(d);
    //   })
    //   .text(function(d) {
    //     return d;
    //   })
    //   .attr("text-anchor", "left")
    //   .style("alignment-baseline", "middle");

    // return <svg width="1800" height="700" className="barChart" style={{ paddingTop: 5 + "em" }} />;
  }

  render() {
    return <svg width="1800" height="700" className="barChart" style={{ paddingTop: 5 + "em" }} />;
  }
}
