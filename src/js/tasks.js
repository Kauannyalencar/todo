import { differenceInDays, isToday, format, parseISO, isAfter } from "date-fns";

export const tasks = [
    {
        title: "Estudar",
        description: "REACT klje csjb oncqspb jbdsjob obsadih  docnbsjbSOABBCSU ewfbjdbads jasdbkkabd",
        date: new Date(2024, 9, 30).toLocaleDateString(),
        id: 1,
        projectPriority: "medium",
        project: "gym"
    },
];
export class TaskRenderer {
    constructor() {
        this.createData = new Date();
    }

    handleDate() {
        this.now = new Date()
        this.differenceDate = differenceInDays(this.now, this.createData)

        if (isToday(this.createData)) {
            this.actualData = "Today"

        } else if (this.differenceDate == 1) {
            this.actualData = "1 day ago";

        } else {
            this.actualData = ` ${format
                (this.createData, "dd/MM/yyyy")}`
        }

    }

    createUI(filteredTasks) {
        this.handleDate()

        const taskContainer = document.querySelector(".tasks-container")
        taskContainer.innerHTML = '';
      
        taskContainer.innerHTML += filteredTasks.map(task => {
            console.log(task.description.length);
            
            const showMoreButton = task.description.length > 50 ? '<span class="show-more">Show more</span>' : ''; // Conditional button
            return `<div class="task">
    <header class="task-header">
        <h1 class="task-title">${task.title}</h1>
        <span class="date">${this.actualData}</span>
        <div class="description-container">
             <p class="description">${task.description.substring(0, 50)}${showMoreButton}</p> 
             <p class="full-description hidden">${task.description}${showMoreButton}</p>

        </div>
    </header>
    <div class="due-date">
        <span>${task.date}</span>
    </div>
    <div class="btns-task">
        <ul>
            <li ><i class="fa-solid fa-check complete-btn" id=${task.id}></i></li>
            <li><i class="fa-solid fa-trash-can delete-task"></i></li>
        </ul>
    </div>
    <span class="priority-task ${task.projectPriority}" data-project="${task.project}">${task.projectPriority}</span>
    </div> 
        `
        }).join("")

        const deleteBtns = document.querySelectorAll(".delete-task")
        deleteBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                todo.delete(Number(btn.id))
            })
        })

        
        const showMoreButtons = document.querySelectorAll('.show-more');
        showMoreButtons.forEach(button => {
            button.addEventListener('click', () => {
                const descriptionContainer = button.closest('.description-container');
                const shortDescription = descriptionContainer.querySelector('.description');
                const fullDescription = descriptionContainer.querySelector('.full-description');

                shortDescription.classList.toggle('hidden');
                fullDescription.classList.toggle('hidden');
            })
        })
    }

    todayFilter() {
            const filteredTasks = tasks.filter((task) => {
                const taskDate = parseISO(task.date)
                return isToday(taskDate)
            })
        return filteredTasks;
        }

    upComingFilter(filter) {
            const filteredTasks = tasks.filter((task) => {
                const taskDate = parseISO(task.date)
                return isAfter(taskDate, filter)
            })
        return filteredTasks;
        }

    projectTasks(filter) {
            const filteredTasks = tasks.filter((task) => {
                const projectTask = task.project === filter
                return projectTask;
            })

        return filteredTasks;
        }

}

export class Task extends TaskRenderer {
    constructor(title, description, date, priority, project) {
        super();
        this.title = title;
        this.description = description;
        this.date = date;
        this.id = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1;
        this.projectPriority = priority;
        this.project = project;
    }

}

export class Todo {
    constructor(task) {
        this.taskObj = new TaskRenderer()

    }

    delete(task) {
        const taskId = tasks.findIndex(item => item.id == task)

        tasks.splice(taskId, 1)
        this.taskObj.createUI(tasks);
    }

}

const initDOM = new TaskRenderer()
initDOM.createUI(tasks)

const todo = new Todo()
