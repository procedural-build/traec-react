import React from "react";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import { getAllOps } from "traec/utils/metricOperations";
import Octicon from "react-octicon";
// import "./tooltips.css";

export const renderOps = (ops, baseMetrics) => {
  for (let op of ops) {
    let metricIds = op.metricList ? op.metricList.match(/[0-9a-f-]{36}/g) || [] : [];
    let renderedMetrics = metricIds
      .map(id => baseMetrics.get(id))
      .filter(i => i != null)
      .map((bm, i) => (
        <li key={i}>
          {bm ? (
            <span className="tooltip_parent">
              {bm.get("name")}
              <span className="tooltiptext">{bm.get("uid").substring(0, 8)}</span>
            </span>
          ) : null}
        </li>
      ));
    Object.assign(op, {
      metricIds,
      renderedMetrics
    });
  }
  return ops;
};

export const getMetricsFromIndicator = ({ indicator, baseMetrics }) => {
  let text = indicator.getInPath("operation.text");
  let ops = getAllOps(text);
  // Get the overall factor
  let factor = ops[0].factor;
  // Append the list of metricComponents to the operations
  ops = renderOps(ops, baseMetrics);
  return { factor, ops };
};

export function TargetValueDisplay({ targetValue, raThreshold, greenBelow }) {
  if (!targetValue) {
    return null;
  }
  let arrowUp = raThreshold ? raThreshold < targetValue : !greenBelow;
  let arrow = arrowUp ? <Octicon name="arrow-up" /> : <Octicon name="arrow-down" />;
  return (
    <React.Fragment>
      {arrow} {targetValue} {raThreshold ? `| ${raThreshold}` : null}
    </React.Fragment>
  );
}

export function OperationMetrics({ ops, numerator = true }) {
  let lists = [];
  let validOps = ops.filter(i => i.exponent > 0 == numerator && i.renderedMetrics.length);
  let multipleSets = validOps.length > 1;
  let counter = 0;
  for (let op of validOps) {
    lists.push(
      <React.Fragment key={counter}>
        {multipleSets ? (
          <p className="m-0 p-0">
            <b>{Math.sign(op.factor) > 0 ? "Add" : "Subtract"}</b>
          </p>
        ) : null}
        <ul style={{ margin: 0, padding: 0 }}>{op.renderedMetrics}</ul>
      </React.Fragment>
    );
    counter += 1;
  }

  if (!numerator && lists.length == 0) {
    lists = "1";
  }

  return <React.Fragment>{lists}</React.Fragment>;
}

export function IndicatorEqn({ ops, outOfScope }) {
  // Render 'Out of Scope' on indicators in the indicator panel that are not displayed in the project overview panel -- Jira: ASS-260
  return outOfScope ? (
    <ul style={{ margin: 0, padding: 0, color: "grey" }}>
      Out of Scope
      <OperationMetrics ops={ops} />
    </ul>
  ) : (
    <React.Fragment>
      <ul style={{ margin: 0, padding: 0 }}>
        <OperationMetrics ops={ops} />
      </ul>
      <hr style={{ margin: "0.25em", padding: 0, border: null, borderBottom: "1px solid black" }} />
      <ul style={{ margin: 0, padding: 0 }}>
        <OperationMetrics ops={ops} numerator={false} />
      </ul>
    </React.Fragment>
  );
}

export default function IndicatorRow({ baseMetrics, indicator, dropDownLinks, setTargetComponent }) {
  if (!baseMetrics) {
    return null;
  }
  let { factor, ops } = getMetricsFromIndicator({ indicator, baseMetrics });

  let metricTarget = indicator.get("metricTarget");
  let targetValue = metricTarget ? metricTarget.get("value") : null;
  let raThreshold = metricTarget ? metricTarget.getInPath("meta_json.thresholdLow") : null;
  let greenBelow = metricTarget ? metricTarget.getInPath("meta_json.greenBelow") : null;

  // Useful for injecting into the UI for debugging
  let idStr = indicator.get("uid").substring(0, 8);

  // If the indicator is not setup for the project overview panel, the indicator in the indicators panel
  // will be greyed out and defined as 'Out of Scope'-- Jira: ASS-260

  for (let op of ops) {
    if (op.renderedMetrics.length == 0) {
      var outOfScope = true;
    }
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-4">
          <span className="align-middle tooltip_parent" style={{ color: outOfScope ? "grey" : "#333" }}>
            {indicator.getInPath("resultBaseMetric.name")}
            <span className="tooltiptext">{idStr}</span>
          </span>
        </div>
        <div className="col-sm-2 align-middle" style={{ color: outOfScope ? "grey" : "#333" }}>
          {indicator.getInPath("resultBaseMetric.category")}
        </div>
        <div className="col-sm-1 align-middle" style={{ color: outOfScope ? "grey" : "#333" }}>
          {factor ? parseFloat(factor).toFixed(2) : factor}
        </div>
        <div className="col-sm-3 align-middle">
          <IndicatorEqn ops={ops} outOfScope={outOfScope} />
        </div>
        <div className="col-sm-1 align-middle" style={{ color: outOfScope ? "grey" : "#333" }}>
          <TargetValueDisplay targetValue={targetValue} raThreshold={raThreshold} greenBelow={greenBelow} />
        </div>
        <div className="col-sm-1 align-middle">
          <BSBtnDropdown
            links={dropDownLinks}
            header={
              <span>
                <Octicon name="gear" />
              </span>
            }
          />
        </div>
      </div>
      {/*this.render_add_form(indicator, factor, numIds, denIds)*/}
      {setTargetComponent}
      <hr />
    </React.Fragment>
  );
}
