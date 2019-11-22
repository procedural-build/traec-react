import React, { Component } from "react";
import BootstrapSplitPane from "traec-react/utils/bootstrap/splitbs";
import { Link, Switch, Route } from "react-router-dom";

const Cluster = props => {
  return <a>Cluster</a>;
};

const ClusterId = props => {
  return <a>Cluster ID</a>;
};

class Explorer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let links = [
      {
        to: "/cluster",
        label: "id",
        component: null,
        children: [
          {
            to: "/cluster/clusterId",
            label: "clusterId",
            component: null
          }
        ]
      }
    ];
    let routes = [
      {
        path: "/cluster",
        component: Cluster
      },
      {
        path: "/cluster/clusterId",
        component: ClusterId
      }
    ];

    return (
      <div className="container-fluid">
        <div className="row" style={{ minHeight: "400px" }}>
          <BootstrapSplitPane
            localStorageKey={`explorer-grid-split`}
            allowZero={true}
            pane1ClassName={"page-sidebar"}
            onCollapseHook={() => {
              this.setState({ showSideBar: false });
            }}
            onExpandHook={() => {
              this.setState({ showSideBar: true });
            }}
            onDragFinished={draggedSize => {
              this.setState({ draggedSize });
            }}
            pane1Style={{
              borderRight: "1px solid grey",
              minHeight: "800px"
            }}
            pane2Style={{
              margin: 0,
              padding: 0
            }}
          >
            <div>
              {links.map((link, i) => {
                return (
                  <div key={i}>
                    <p>
                      <Link to={link.to}>{link.label}</Link>
                    </p>
                    {link.children ? <RecursiveLink links={link.children} /> : null}
                  </div>
                );
              })}
            </div>
            <div>
              {routes.map((route, i) => {
                <Route exact={route.exact} path={route.path} component={route.component} />;
              })}
              <Route component={Cluster}></Route>
            </div>
            {/* {clusters.valueSeq().map((cluster, i) => {
                    return (
                      <div key={i}>
                        <Link to={`/cluster/${cluster.get("uid")}`}>{cluster.get("uid")}</Link>
                        <Route path={`/cluster/:clusterId`} component={NodeLinkList} />
                      </div>
                    );
                  })}
                  <div className="pt-2 pl-4">
                    <Route exact path="/cluster/:clusterId/node/:nodeId" component={NodeDescription} />
                    <Route exact path="/cluster/:clusterId" component={ClusterDescription} />
                  </div> */}
          </BootstrapSplitPane>
        </div>
      </div>
    );
  }
}

export default Explorer;

const RecursiveLink = props => {
  return (
    <React.Fragment>
      {props.links.map((link, i) => {
        return (
          <div key={i}>
            <p>
              <Link to={link.to}>{link.label}</Link>
            </p>
            {link.children ? <RecursiveLink links={link.children} /> : null}
          </div>
        );
      })}
    </React.Fragment>
  );
};
