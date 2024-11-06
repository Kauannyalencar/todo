
function Today() {
    const main = document.querySelector(".home");
    main.innerHTML = '';
    main.innerHTML = `
        <h3 class="current-page" >Today</h3>
        <div class="add-new-task">
            <i class="fa-solid fa-plus"></i>
            <p>New Task</p>
        </div> 
    `;
}

export default Today;