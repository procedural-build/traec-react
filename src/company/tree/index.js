import React from "react";
import ReactDOM from "react-dom";

import { CompanyPermission } from "traec/utils/permissions/company";
import CompanyTreeRow from "./treeRow";

/**
 * CompanyTree Component:
 * @namespace CompanyTree
 * @memberof CompanyPage
 * @example
 * return <CompanyTree company={company} companyList={companyList} currentId={companyId} />
 *
 */
class CompanyTree extends React.Component {
  get_root_company(company, companyList) {
    // Get the root company from a list of companies
    let parentId = company.get("parentid");
    if (!parentId) {
      return company;
    }
    let parent = companyList.get(parentId);
    if (!parent) {
      return company;
    } else {
      // RECURSE up the tree until we get to the top
      return this.get_root_company(parent, companyList);
    }
  }

  render() {
    let { company, companyList, fromHere, currentId: companyId } = this.props;
    if (!company || !companyList) {
      return <p>No company defined</p>;
    }

    let rootCompany = fromHere ? company : this.get_root_company(company, companyList);

    return (
      <CompanyPermission companyId={companyId} requiresAdmin={false} requiredActions={["READ_COMPANY_COMPANY"]}>
        <div className="container-fluid m-0 p-0">
          <h5>Business Units</h5>
          <CompanyTreeRow company={rootCompany} companyList={this.props.companyList} currentId={this.props.currentId} />
        </div>
      </CompanyPermission>
    );
  }
}

export { CompanyTree, CompanyTreeRow };
