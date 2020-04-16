import React from "react";
import ReactDOM from "react-dom";
import Traec from "traec";

import Sidebar from "AppSrc/sidebar";
import { Footer } from "AppSrc/footer";
import { connect } from "react-redux";

import { setNavBarItems } from "traec/redux/actionCreators";
import { setSidebarItems } from "AppSrc/sidebar/actionCreators";

import {
  companyPermissionRender,
  getCompanyPermissions,
  companyPermissionFilter,
  companyPermissionCheck
} from "traec/utils/permissions/company";
import { CompanyTree } from "./tree";
// import { CompanyRouter } from "./router";

import BootstrapSplitPane from "../utils/bootstrap/splitbs";

/**
 * Company Page:
 * @namespace CompanyPage
 * @example
 * * <Route path="/company/:companyId" component={Company} />
 */
class CompanyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      setNavBar: false,
      setSideBar: false,
      showSideBar: true
    };

    // Data required from the API for this Component
    this.requiredFetches = [new Traec.Fetch("company", "list")];

    // Action bindings
    this.navbarLinks = this.navbarLinks.bind(this);
    this.sidebarLinks = this.sidebarLinks.bind(this);
  }

  componentDidMount() {
    let { companyId } = this.props;
    companyPermissionCheck(companyId, false, []);
    Traec.fetchRequired.bind(this)();
    this.setNavBar();
  }

  componentDidUpdate(prevProps) {
    let { companyId } = this.props;
    companyPermissionCheck(companyId, false, []);
    Traec.fetchRequired.bind(this)();

    if (companyId && companyId != prevProps.companyId) {
      this.setState({
        setSideBar: false,
        setNavBar: false
      });
    }

    this.setSideBar();
    this.setNavBar();
  }

  setNavBar(forceUpdate = false) {
    let navBarLinks = this.navbarLinks();
    if ((!this.state.setNavBar && navBarLinks) || forceUpdate) {
      this.setState({ setNavBar: true });
      this.props.dispatch(setNavbarItems(navBarLinks));
    }
  }

  setSideBar(forceUpdate = false) {
    let sideBarLinks = this.sidebarLinks();
    if ((!this.state.setSideBar && sideBarLinks) || forceUpdate) {
      this.setState({ setSideBar: true });
      this.props.dispatch(setSidebarItems(sideBarLinks));
    }
  }

  navbarLinks() {
    let { companyId } = this.props;
    let companyBase = `/company/${companyId}`;

    let items = [
      {
        label: "Company",
        requiresAdmin: false,
        to: [
          { label: "Company Dashboard", to: companyBase, octicon: "home" },
          {
            label: "Members",
            to: `${companyBase}/members`,
            octicon: "organization",
            requiresAdmin: false,
            requiredActions: ["READ_COMPANY_MEMBER"]
          }
        ]
      },
      {
        label: "Admin",
        requiresAdmin: true,
        to: [
          { label: "Indicators", to: `${companyBase}/indicators`, octicon: "issue-closed", requiresAdmin: true },
          { label: "Settings", to: `${companyBase}/details`, octicon: "gear", requiresAdmin: true },
          { label: null },
          { label: "Email Settings", to: `${companyBase}/email/settings`, octicon: "inbox", requiresAdmin: true },
          { label: "Email Statistics", to: `${companyBase}/email/report`, octicon: "mail", requiresAdmin: true }
        ]
      }
    ];
    return companyPermissionFilter(companyId, items);
  }

  render_main() {
    let { companyId, company, companyList } = this.props;
    if (!company) {
      return "";
    }

    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <BootstrapSplitPane
              localStorageKey={`explorer-grid-split-${companyId}`}
              pane1ClassName={"page-sidebar"}
              onCollapseHook={() => {
                this.setState({ showSideBar: false });
              }}
              onExpandHook={() => {
                this.setState({ showSideBar: true });
              }}
              pane1Style={{
                borderRight: "1px solid grey",
                minHeight: "800px"
              }}
            >
              <div>{this.render_sidebar()}</div>
              {/* <div>
                <CompanyRouter companyId={companyId} company={company} />
              </div> */}
            </BootstrapSplitPane>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
  render_sidebar() {
    let { companyId, companyList, company } = this.props;
    let companyBase = `/company/${companyId}`;

    if (!this.state.showSideBar) {
      return null;
    }
    return (
      <React.Fragment>
        <Sidebar />
        <hr />
        <CompanyTree company={company} companyList={companyList} currentId={companyId} />
      </React.Fragment>
    );
  }
  sidebarLinks() {
    let { companyId } = this.props;
    let companyBase = `/company/${companyId}`;
    let items = [
      { label: "Company Dashboard", to: companyBase, octicon: "home" },
      {
        label: "Members",
        to: `${companyBase}/members`,
        octicon: "organization",
        requiresAdmin: false,
        requiredActions: ["READ_COMPANY_MEMBER"]
      },
      { label: "Indicators", to: `${companyBase}/indicators`, octicon: "issue-closed", requiresAdmin: true },
      { label: "Settings", to: `${companyBase}/details`, octicon: "gear", requiresAdmin: true }
    ];
    return companyPermissionFilter(companyId, items);
  }
  render() {
    // Check the User permissions for this company
    return companyPermissionRender(this.props.companyId, false, ["READ_COMPANY_REPORT"], this.render_main(), true);
  }
}

const mapStateToProps = (state, ownProps) => {
  let { companyId } = Traec.utils.getFullIds(state, ownProps.match.params);

  let company = state.getInPath(`entities.companies.byId.${companyId}`);
  let companyList = state.getInPath("entities.companies.byId");
  let userPermissions = getCompanyPermissions(state, companyId);

  return { companyId, company, companyList, userPermissions };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage);
