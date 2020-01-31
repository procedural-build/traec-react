import React, { Component } from "react";
import { connect } from "react-redux";
import Traec from "traec";

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Chart = props => {
  let { data } = props;
  if (!data) return "";

  let dataKeys = [];
  data.map(d =>
    Object.keys(d).map(key => {
      if (key !== "name" && !dataKeys.includes(key)) {
        dataKeys.push(key);
      }
    })
  );

  console.log(dataKeys);
  console.log(data);
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {dataKeys.map((key, index) => (
        <Bar key={index} dataKey={key} />
      ))}
    </BarChart>
  );
};

class DocumentSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    let { trackerId } = this.props;
    this.requiredFetches = [new Traec.Fetch("tracker_documents", "list", { trackerId })];
  }

  fetchCommitEdges() {
    let { refs, trackerId } = this.props;
    if (refs) {
      refs.map(ref => {
        let commitId = ref.getInPath("latest_commit.uid");
        let fetch = new Traec.Fetch("tracker_commit_edge", "read", { trackerId, commitId });
        fetch.dispatch();
      });
    }
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
    this.fetchCommitEdges();
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
    this.fetchCommitEdges();
  }

  convertTrackerDataToChartData(data) {
    let subCategories = data.get("subCategories");
    let documents = data.get("documents");
    let chartData = [];
    if (subCategories) {
      subCategories.map(category => {
        let accumulatedData = this.convertTrackerDataToChartData(category);
        if (accumulatedData) {
          if (Array.isArray(accumulatedData)) {
            accumulatedData.map(d => chartData.push(d));
          } else {
            chartData.push(accumulatedData);
          }
        }
      });
    } else if (documents) {
      let element = {};
      element.name = data.get("title");
      documents.map(document => {
        let statusName = document.getInPath("status.name") ? document.getInPath("status.name") : "Nothing Recieved";
        let occurences = element[statusName];
        element[statusName] = occurences ? occurences + element[statusName] : 1;
      });
      return element;
    }

    return chartData.length > 0 ? chartData : null;
  }

  render() {
    let { trackerData } = this.props;
    if (!trackerData) return "";
    console.log(trackerData.toJS());
    return (
      <div>
        {trackerData.valueSeq().map((data, index) => {
          return (
            <div key={index}>
              <h2>{data.get("title")}</h2>
              <Chart data={this.convertTrackerDataToChartData(data)} />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let refs = state.getInPath(`entities.refs.byId`);
  let documentStatuses = state.getInPath("entities.docStatuses.byId");
  let descriptions = state.getInPath("entities.descriptions.byId");
  let commitEdges = state.getInPath("entities.commitEdges.byId");
  let commitBranches = state.getInPath("entities.commitBranches.commit");
  let trackerData = Traec.Im.Map({});
  if (commitEdges) {
    trackerData = getTrackerData(refs, commitEdges, documentStatuses, descriptions);
  }
  return {
    refs,
    documentStatuses,
    descriptions,
    commitEdges,
    commitBranches,
    trackerData
  };
};

export default DocumentSummary = connect(mapStateToProps)(DocumentSummary);

function getTrackerData(allRefs, commitEdges, documentStatuses, descriptions) {
  let refsWithDepth2 = allRefs.filter(ref => ref.get("depth") === 2);
  let data = recurseRef(refsWithDepth2, allRefs, commitEdges, documentStatuses, descriptions);
  return data;
}

function recurseRef(parentRefs, allRefs, commitEdges, documentStatuses, descriptions) {
  let data = parentRefs.map(ref => {
    let subData = Traec.Im.Map({});
    if (!ref) return subData;
    let latestCommit = ref.getInPath("latest_commit.uid");
    let treeRootId = ref.getInPath("latest_commit.tree_root.uid");

    let commitEdge = commitEdges.get(latestCommit);
    if (!commitEdge) return subData;

    let documents = commitEdge.getInPath(`documents`);
    if (documents) {
      subData = subData.set("documents", getDocumentData(documents, documentStatuses, descriptions));
    }

    let subCategories = commitEdge.getInPath(`trees.${treeRootId}.categories`);

    if (subCategories) {
      subCategories = getSubRefs(subCategories, allRefs);
      subData = subData.set(
        "subCategories",
        recurseRef(subCategories, allRefs, commitEdges, documentStatuses, descriptions)
      );
    }

    subData = subData.set("title", getTitle(commitEdge, treeRootId, descriptions));
    return subData;
  });

  return data;
}

function getDocumentData(documents, documentStatuses, descriptions) {
  return documents.map(document => {
    let documentData = Traec.Im.Map({});
    let documentStatusId = document.get("status");
    let documentDescriptionIds = document.get("descriptions");
    documentData = documentData.set("status", documentStatuses.getInPath(`${documentStatusId}.status`));

    if (!documentDescriptionIds) return documentData;

    documentData = documentData.set("title", descriptions.get(documentDescriptionIds.first()).get("title"));
    return documentData;
  });
}

function getTitle(commitEdge, treeRootId, descriptions) {
  let descriptionIds = commitEdge.getInPath(`trees.${treeRootId}.descriptions`);
  if (!descriptionIds) return subData;
  let description = descriptions.get(descriptionIds.first());
  return description.get("title");
}

function getSubRefs(subCategories, refs) {
  return subCategories.map(subCategory => refs.get(subCategory.getInPath("target.ref")));
}
