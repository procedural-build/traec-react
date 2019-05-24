import React from "react";
import ReactDOM from "react-dom";

import {companyPermissionRender} from 'traec/utils/permissions/company'
import CompanyTreeRow from './treeRow'


class CompanyTree extends React.Component {

    get_root_company(company, companyList) {
        // Get the root company from a list of companies
        let parentId = company.get('parentid')
        if ( !parentId ) { return company } 
        let parent = companyList.get(parentId)
        if (!parent) { 
            return company
        } else {
            // RECURSE up the tree until we get to the top
            return this.get_root_company(parent, companyList)
        }
    }

    render_main() {
        let {company, companyList, fromHere} = this.props
        if (!company || !companyList) { return (<p>No company defined</p>) }

        let rootCompany = fromHere ? company : this.get_root_company(company, companyList)
 
        return (
            <div className="container-fluid m-0 p-0">
                <h5>Business Units</h5>
                <CompanyTreeRow 
                    company={rootCompany} 
                    companyList={this.props.companyList} 
                    currentId={this.props.currentId}
                />
            </div>
        );
    }

    render(){
        // Check the User permissions for this company
        return companyPermissionRender(
            this.props.currentId,
            false, ['READ_COMPANY_COMPANY'],
            this.render_main()
        )
    }
}

export { CompanyTree, CompanyTreeRow };