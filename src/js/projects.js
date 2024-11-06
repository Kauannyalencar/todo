import { tasks } from "./tasks";
const chooseProject = document.querySelector("#choose-project")

const projectsContainer = document.querySelector(".my-projects");

export const projectsList = [
    {
        title: "Gym",
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
            projectsContainer.innerHTML += ` <div class="project box" data-page=${projectNameReg}>
                   <h3 >${project.title}</h3>
                      <ul class="project-icons">
                         <li class="delete-${project.id}"><i id=${project.id} class="fa-solid fa-trash-can delete"></i></li>
                     </ul>
                   </div>
                 `
        })
        const deleteBtns = document.querySelectorAll(".delete")

        deleteBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                this.handleProject.deleteProject(Number(btn.id))
            })
        })
    }

    addProjectToOption() {
        chooseProject.innerHTML = ""
        console.log(projectsList);

        chooseProject.innerHTML = ""
        projectsList.forEach((project) => {
            if (project.title == "Inbox") return;
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
    
    updateTitleHome(actualPage){
        const main = document.querySelector(".home");
        main.innerHTML = '';
console.log(actualPage);

        main.innerHTML += actualPage.map(page => `
        <h3 class="current-page" >${page.title}</h3>
        <div class="add-new-task">
            <i class="fa-solid fa-plus"></i>
            <p>New Task</p>
        </div> 
    `)
    }

}

const newProject = new Projects()
newProject.createUi()

export default Projects;