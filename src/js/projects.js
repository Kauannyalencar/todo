import { tasks } from "./tasks";
const chooseProject = document.querySelector("#choose-project")

const projectsContainer = document.querySelector(".my-projects");

export const projectsList = [
    {
        title: "Inbox",
        id: 0,
        todos: tasks
    }
]


class Projects {
    constructor() {
        this.handleProject = new ManageProject()
    }

    createUi() {
        projectsContainer.innerHTML = '';
        projectsList.forEach((project) => {
            if (project.title == "Inbox") return;
            const projectNameReg = project.title.replace(/\s+/g, '').toLocaleLowerCase();
            projectsContainer.innerHTML += ` <div class="project box" data-page=${projectNameReg} id=${project.id} data-title="${project.title}">
                   <h3 id=${projectNameReg}>${project.title}</h3>
                      <ul class="project-icons">
                         <li class="delete-${project.id}"><i id=${project.id} class="fa-solid fa-trash-can delete"></i></li>
                     </ul>
                   </div>
                 `
        })
        const boxProject = document.querySelectorAll(".project")
        const deleteBtns = document.querySelectorAll(".delete")

        boxProject.forEach(project=>{
            project.addEventListener("click", () => {
                this.handleProject.updateTitleHome(Number(project.id))
            })
        })

        deleteBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                this.handleProject.deleteProject(Number(btn.id))
            })
        })
    }

    addProjectToOption() {
        chooseProject.innerHTML = ""

        projectsList.forEach((project) => {

            const projectNameReg = project.title.replace(/\s+/g, '').toLocaleLowerCase();
            chooseProject.innerHTML += `
                <option value=${projectNameReg}>${project.title}</option>
            `
        })
    }

}

export class Project extends Projects {
    constructor(title, id) {
        super()
        this.title = title;
        this.id = id;
        this.todos = [];
    }

}

export class ManageProject {
    deleteProject(project) {
        const projectId = projectsList.findIndex(item => item.id === project);
        // projectId is the index to start and 1 is the number of items to remove.
        projectsList.splice(projectId, 1);
        newProject.createUi()
    }

    AddTaskToProject(project) {
        const filteredTasks = tasks.filter((task) => {
            const projectTask = task.project === project
            return projectTask;
        })

        return filteredTasks;
    }

    showProjectTasks(project) {

        const filteredProject = projectsList.filter(item => {
            const currentProject = item.title.toLocaleLowerCase() == project;
            return currentProject;
        })
        console.log(filteredProject);
        return filteredProject;
    }

    updateTitleHome(title){

        const pageTitle = document.querySelector(".current-page");
        pageTitle.innerHTML = '';

        pageTitle.innerHTML = `
        <h3 class="current-page" >${title}</h3>
    `
    }

}

const newProject = new Projects()
newProject.createUi()

export default Projects;