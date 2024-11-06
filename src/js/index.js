import { addDays, startOfDay } from "date-fns";
import '../css/styles.css'
import Inbox from './inbox'
import Today from "./today";
import Upcoming from './upcoming'
import Projects, { Project, projectsList, ManageProject } from './projects'
import { Task, TaskRenderer, tasks } from './tasks';

const newProjectForm = document.querySelector(".new-project")
const form = document.getElementById("task-form")
const [title, description, date] = form.elements;
const projetSet = form.querySelector("select#choose-project")
const projectPriority = form.querySelector("select#priority")
const btnAddProject = document.querySelector(".add-project")
const cancelProject = document.querySelector(".cancel-project")
// const editProject = document.querySelector(".") 

// Toggle modal visibility
function toggleElements(el) {
    el == form.parentElement || newProjectForm;
    el.style.display = el.style.display == "block" ? "none" : "block"
    // el.classList.toggle("hidden")
}



// Abre o modal task
document.addEventListener("click", (event) => {
    const target = event.target;
 
    if (target.textContent === "New Task") {
        toggleElements(form.parentElement)
    } else if (target.classList.contains("add-new-project")) {
        toggleElements(newProjectForm)
    }

    const pages = document.querySelectorAll(".box");

    pages.forEach((page) => {
        page.addEventListener("click", () => {
            togglePage(page.dataset.page)
            console.log(page);
            
        })
    })
})


class handleTasksPage {
    constructor(project) {
        this.taskRender = new TaskRenderer();
        this.filter;
        this.today = startOfDay(new Date());
        this.taskProject = project;
    }

    inboxPage() {
        Inbox();
        if (tasks.length) {
            this.taskRender.createUI(tasks)
            Inbox();
        }
        //Todas as tasks
    }

    todayPage() {
        //Somente de hoje
        const filter = this.taskRender.todayFilter("Today");
        this.taskRender.createUI(filter)
        Today();
    }

    upcomingPage() {
        // Dos próximos dias
        const nextDays = addDays(this.today, 2)
        this.filter = this.taskRender.upComingFilter(nextDays);
        this.taskRender.createUI(this.filter)
        Upcoming();

    }

    projectsPage() {
        //todos os projetos
        this.filter = this.taskRender.projectTasks(this.taskProject);
        const project = new ManageProject()
        project.updateTitleHome(project.showProjectTasks(this.taskProject))
        this.taskRender.createUI(this.filter)
        
    }

    // taskToProject() {
    //     this.projectTask = new ManageProject()
    //     this.projectTask.AddTaskToProject(this.taskProject)

    // }
}

function togglePage(page) {
    console.log(page);

    const changePage = new handleTasksPage(page)
    switch (page) {
        case "Upcoming":
            changePage.upcomingPage();
            break;
        case "Today":
            changePage.todayPage();
            break;
        case "Inbox":
            changePage.inboxPage();
            break;
        default:
            changePage.projectsPage(page);
            break;
    }

}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const taskObj = new Task(title.value, description.value, date.value, projectPriority.value, projetSet.value);

    toggleElements(form.parentElement)
    tasks.push(taskObj);
    const projectTask = new handleTasksPage(taskObj.project)
    
    projectTask.inboxPage()
})

btnAddProject.addEventListener("click", (e) => {
    e.preventDefault();
    const projectName = document.querySelector("#project-name");
    toggleElements(newProjectForm)
    const project = new Project(projectName.value, projectsList.length === 0 ? 1 : projectsList[projectsList.length - 1].id + 1)
    projectsList.push(project);
    project.createUi()
    project.addProjectToOption();

    projectName.value = ''

})

cancelProject.addEventListener("click", () => toggleElements(newProjectForm));

