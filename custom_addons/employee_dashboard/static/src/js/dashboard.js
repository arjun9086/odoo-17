/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

const actionRegistry = registry.category("actions");
export class EmployeeDashboard extends Component {
    static template = "employee_dashboard.EmployeeDashboard";
    setup() {
        this.orm = useService("orm");
        this.action = useService("action");
        this.state = useState({ data: null });
        onMounted(async () => {
            const data = await this.orm.call("hr.employee.dashboard", "get_employee_dashboard_data");
            this.state.data = data;
        });
    }
    onCardClick(ev) {
        const type = ev.currentTarget.dataset.type;
        if (type === "attendance") {
            this.action.doAction("hr_attendance.hr_attendance_action");
        } else if (type === "leave") {
            this.action.doAction("hr_holidays.hr_leave_action_my");
        } else if (type === "project") {
            this.action.doAction("project.open_view_project_all");
        } else if (type === "task") {
            this.action.doAction("project.action_view_all_task");
        }
        else if (type==="personal_information"){
            this.action.doAction('hr.hr_employee_public_action');
        }
    }
}
actionRegistry.add("employee_dashboard_tag", EmployeeDashboard);


///**@odoo-module **/
//import { registry } from "@web/core/registry";
//import { Component } from  "@odoo/owl";
//import { useService } from "@web/core/utils/hooks";
//
//const actionRegistry = registry.category("actions");
//class EmployeeDashboard extends Component {
//static.template = "employee_dashboard.EmployeeDashboard";
//
//}
////EmployeeDashboard.template = "employee_dashboard.EmployeeDashboard";
//actionRegistry.add("employee_dashboard_tag", EmployeeDashboard);
