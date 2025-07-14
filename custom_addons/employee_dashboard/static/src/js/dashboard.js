/**@odoo-module **/
import { registry } from "@web/core/registry";
import { Component } from  "@odoo/owl";
const actionRegistry = registry.category("actions");
class EmployeeDashboard extends Component {}
EmployeeDashboard.template = "employee_dashboard.EmployeeDashboard";
//  Tag name that we entered in the first step.
actionRegistry.add("employee_dashboard_tag", EmployeeDashboard);
