import { differenceInDays, isToday, format, parseISO, isAfter } from "date-fns";

export const tasks = [
    {
        title: "Estudar",
        description: "REACT",
        date: new Date(2024, 9, 30).toLocaleDateString(),
        id: 1,
        projectPriority: "Medium",
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
        taskContainer.innerHTML += filteredTasks.map(task =>
            `<div class="task">
    <header class="task-header">
        <h1>${task.title}</h1>
        <span class="date">${this.actualData}</p>
    </header>
    <div class="due-date">
        <span>${task.date}</span>
    </div>
    <div class="btns-task">
        <ul>
            <li><i class="fa-solid fa-check"></i></li>
            <li><i class="fa-solid fa-trash-can"></i></li>
        </ul>
    </div>
    <span class="priority-task">${task.projectPriority}</span>
    </div> 
        `
        ).join("")
    }

    todayFilter(){
        const filteredTasks = tasks.filter((task)=>{
         const taskDate = parseISO(task.date)
         return isToday(taskDate)   
        })
        return filteredTasks;
    }

    upComingFilter(filter){
        const filteredTasks = tasks.filter((task)=>{
            const taskDate = parseISO(task.date)
            return isAfter(taskDate, filter)   
           })
           return filteredTasks;
    }
    
    projectTasks(filter){
        const filteredTasks = tasks.filter((task)=>{
            
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
    constructor() {

    }


    delete() {

    }

    edit() {

    }
}



