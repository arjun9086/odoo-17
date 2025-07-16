/** @odoo-module **/
import { Component, useState, onMounted } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { loadJS } from "@web/core/assets";

const actionRegistry = registry.category("actions");
export class EmployeeDashboard extends Component {
    static template = "employee_dashboard.EmployeeDashboard";
     setup() {
        this.orm = useService("orm");
        this.action = useService("action");
        this.state = useState({ data: null });
        onMounted(async () => {
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js");
            const data = await this.orm.call("hr.employee.dashboard", "get_employee_dashboard_data");
            this.state.data = data;
            this.renderAttendanceChart();
            this.renderExperienceChart();
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
    renderAttendanceChart() {
        const ctx = document.getElementById("attendanceChart");
        const data = this.props.attendance_data || {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            values: [8, 7, 6, 9, 8],
        };
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Hours Worked",
                    data: data.values,
                    backgroundColor: "#4B77BE",
                    borderRadius: 6,
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1 },
                    },
                },
            },
        });
    }
    renderExperienceChart() {
    const ctx = document.getElementById("experienceChart");
    const experienceData = this.props.experience_data || {
        labels: ["Company A", "Company B", "Company C"],
        values: [2, 1, 3],
    };

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: experienceData.labels,
            datasets: [{
                label: "Years of Experience",
                data: experienceData.values,
                backgroundColor: "#F39C12",
                borderRadius: 6,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 },
                },
            },
        },
    });
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
