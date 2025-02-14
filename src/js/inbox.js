const  Inbox = function() {
    const main = document.querySelector(".home");
    main.innerHTML = '';
    main.innerHTML = `
        <h3 class="current-page" >Inbox</h3>
        <div class="add-new-task">
            <i class="fa-solid fa-plus"></i>
            <p>New Task</p>
        </div> 
    `;
    
}

Inbox();

export default Inbox;

