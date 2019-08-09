import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Traec from "traec";
import Moment from "moment";
import * as d3 from "d3";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";
import { cluster, stratify } from "d3-hierarchy";
import d3Tip from "d3-tip";

export default class IndividualReportBarPlot extends React.Component {
  constructor(props) {
    super(props);
    this.DrawBarChart = this.DrawBarChart.bind(this);
    this.state = {
      recipient: props.recipient
    };
    this.requiredFetches = [new Traec.Fetch("project_email_recipient", "read")];
    // action bindings
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
    this.DrawBarChart(this.state.recipient);
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
    this.DrawBarChart(this.state.recipient);
  }

  componentWillUnmount() {
    d3.select(".barChart").selectAll("*").remove;
  }

  DrawBarChart(recipient) {
    d3.select(".barChart").selectAll("*").remove;

    //Function to get nested values within object, perhaps this can be replaced with Immutable syntax?
    Object.byString = function(o, s) {
      if (s === undefined) {
        s = "0";
      }
      s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
      s = s.replace(/^\./, ""); // strip a leading dot
      var a = s.split(".");
      for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
          o = o[k];
        } else {
          return;
        }
      }
      return o;
    };
    var monthDateList = []; // List to hold all date values that wil be keys in the dateTypeMap (Used for easier access to drawing d3 charts)

    var dateTypeMap = {}; // Main object to store dates(by month) and the types of emails as well as their count. This splits into several lists for easier access for d3 to make the DOM
    var dateList = []; // List to hold all date values that wil be keys in the dateTypeMap (Used for easier access to drawing d3 charts)
    var LEGEND = []; // List to hold all types of emails sent (Used to easier display and coordinate data in d3; We split this into its own list so that there are no duplicate types and that color modifications can be made more easily)
    let emailTypeList = []; // List to hold the types of emails in the DB. Used for the x axis, so the types will repeat in order to display the correct Email type at the right x position
    let yValueArray = []; // Holds the number of emails of each type sent, used for y axis
    let barplotCoordinateObject = {}; // Holds the x and y data for d3 to display data.

    let sentItems = recipient.get("sent");

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

    for (let item of sentItems) {
      let dateValue = item.get("date").slice(0, 7);

      let typeValue = item.get("email_type");
      if (!emailTypeList.includes(typeValue)) {
        emailTypeList.push(typeValue);
      }
      let currentDateTypeMap = dateTypeMap[dateValue];
      if (!currentDateTypeMap) {
        dateTypeMap[dateValue] = { [typeValue]: 1 };
        dateList.push(dateValue);
        if (dateValue.slice(0, 4) == 2019) {
          //Only analyze emails with 2019 date
          if (dateValue.slice(5, 6) == 0) {
            dateValue = dateValue.slice(6, 7);
            monthDateList.push(month[dateValue - 1]);
          } else {
            dateValue = dateValue.slice(5, 7);
            monthDateList.push(month[dateValue - 1]);
          }
        } else {
          console.log("Wrong year");
        }
      } else {
        Object.assign(currentDateTypeMap, { [typeValue]: (currentDateTypeMap[typeValue] || 0) + 1 });
      }
    }

    for (let v = 0; v < emailTypeList.length; v++) {
      //Push email types into the legend
      LEGEND.push(emailTypeList[v]);
    }

    let emailData = {};
    let emailTypes = recipient.getInPath(`sent_summary.email_types`);

    for (let [emailType, num] of emailTypes.entries()) {
      if (!emailData[emailType]) {
        emailData[emailType] = num;
      } else {
        emailData[emailType] += num;
      }
    }

    for (let i = 0; i < dateList.length; i++) {
      for (let j = 0; j < LEGEND.length; j++) {
        let valueToBeStringified = dateList[i] + "." + LEGEND[j];
        yValueArray.push(Object.byString(dateTypeMap, valueToBeStringified));
      }
    }

    /*  replace non existing email types with 0 (removed for now for better spacing on graphs) */
    // for (let i = 0; i < yValueArray.length; i++) {
    //   if (yValueArray[i] === undefined) {
    //   yValueArray[i] = 0;
    //   }
    // }

    yValueArray = yValueArray.filter(d => {
      return d != null;
    });

    /* Potentially need this in the future */

    // var duplicateFactor = emailTypeList.length;

    // for (let i = 0; i < duplicateFactor; i++) {
    //   emailTypeList.push(emailTypeList[i]);
    // }

    var svg = d3.select(".barChart");
    var margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 200
    };

    var colorLegend = d3
      .scaleOrdinal()
      .domain(function(d) {
        return d.x;
      })
      .range(["blue", "red", "orange", "gold", "green"]);

    var width = 1600;
    var height = 500;
    var color = d3.scaleOrdinal(["red", "orange", "gold", "green", "blue"]);

    // color.domain(LEGEND)

    // color.domain(function(d) {
    //  return emailTypeList[d];
    // });

    var x = d3
        .scaleBand()
        .rangeRound([0, width / 1.9])
        .padding(0.0),
      y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var ymaxdomain = d3.max(yValueArray);
    let yTicks = 5;

    if (ymaxdomain <= 5) {
      yTicks = ymaxdomain++;
    } else if (ymaxdomain > 5 && ymaxdomain < 21) {
      yTicks = ymaxdomain;
      ymaxdomain += 4;
    } else if (ymaxdomain >= 21) {
      ymaxdomain += 5;
      yTicks = 15;
    }

    x.domain(monthDateList);
    y.domain([0, ymaxdomain]);

    for (let i = 0; i < yValueArray.length; i++) {
      barplotCoordinateObject[i] = yValueArray[i];
    }
    let data = Object.entries(barplotCoordinateObject).map(([key, value]) => ({
      x: key,
      y: value
    }));

    var x1 = d3
      .scaleBand()
      .rangeRound([0, width / 2])
      .padding(0.0)
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

    // var legend = svg
    //   .append("g")
    //   .attr("class", "legend")
    //   //.attr("x", w - 65)
    //   //.attr("y", 50)
    //   .attr("height", 100)
    //   .attr("width", 100)
    //   .attr("transform", "translate(200,50)");

    // svg
    //   .selectAll("legend")
    //   .data(LEGEND)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", 10)
    //   .attr("cy", function(d, i) {
    //     return 100 + i * 25;
    //   }) // 100 is where the first dot appears. 25 is the distance between dots
    //   .attr("r", 7)
    //   .style("fill", function(d) {
    //     return colorLegend(d);
    //   });

    // svg
    //   .selectAll("legend")
    //   .data(LEGEND)
    //   .enter()
    //   .append("text")
    //   .attr("x", 30)
    //   .attr("y", function(d, i) {
    //     return 100 + i * 25;
    //   }) // 100 is where the first dot appears. 25 is the distance between dots
    //   .style("fill", function(d) {
    //     return colorLegend(d);
    //   })
    //   .text(function(d) {
    //     return d;
    //   })
    //   .attr("text-anchor", "left")
    //   .style("alignment-baseline", "middle");

    // return <svg width="1500" height="700" className="barChart" style={{ paddingTop: 5 + "em" }} />;
  }

  render() {
    return <svg width="1500" height="700" className="barChart" style={{ paddingTop: 5 + "em" }} />;
  }
}
