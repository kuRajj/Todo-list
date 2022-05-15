// wokr with modal
const openModal = document.querySelector('.open-modal__todo');
const showModal = document.querySelector('.modal');
const showModalContent = document.querySelector('.modal__content');
const closeModal = document.querySelector('.modal__close');
const modalBody = document.querySelector('.modal__body');

// work with add todo
const addBtnModal = document.querySelector('.modal__btn');
const addInputModal = document.querySelector('.modal__input'); 
const todoList = document.querySelector('.todo-list_ul');
const doneList = document.querySelector('.done-list_ul');

// let toDoArr = [];
var idLi = 0;

function popupOpen() {
    openModal.addEventListener('click', (e) => {  
        e.preventDefault();  
        showModal.classList.add('open');    
        showModalContent.classList.add('openModalContetn');
    });
}

function popupClosed() {    
    closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        showModal.classList.remove('open');    
        showModalContent.classList.remove('openModalContetn');
    });  

    modalBody.addEventListener('click', (e) => {
        if (!e.target.closest('.modal__content')) {
            showModal.classList.remove('open');    
            showModalContent.classList.remove('openModalContetn');
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            showModal.classList.remove('open');    
            showModalContent.classList.remove('openModalContetn');
        }
      });
}
popupOpen();
popupClosed();

addBtnModal.addEventListener('click', (event) => {
    event.preventDefault();
    const newTodoLi = addInputModal.value;
    
    todoList.innerHTML += `
        <li class="todo-list__li" id="${idLi++}">
            ${newTodoLi}
            <button name="delete"  class="deleteBtn">&times;</button>
        </li>
    `;

    addInputModal.value = '';

    let elemsli = todoList.children;
    for (let li of elemsli) {
        li.setAttribute('draggable', true);
    }

    //delete one li
    const del = document.querySelectorAll('.deleteBtn');
    del.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
        });
    });
    //delete all li
    const delAllbtn = document.querySelector('.deleteAllBtn');
    delAllbtn.addEventListener('click', () => {
        while (doneList.firstChild) {
            doneList.removeChild(doneList.firstChild);
        }
    });    

    //dragAndDrop 

    const dragAndDrop = () => {
        let lisTodo = todoList.children;

        const dragStart = function() {
            setTimeout(() => {
                this.classList.add('hide');
            }, 0);
            
        };

        const dragEnd = function () {
            this.classList.remove('hide');
        };

        //li из Todo
        for (let liTodo of lisTodo) {
        //что делать с каждым li из Todo          
            liTodo.addEventListener('dragstart', dragStart);
            liTodo.addEventListener('dragend', dragEnd);
        }

        const done = document.querySelector('.done');

        const dragOver = function (event) {
            event.preventDefault();
        };

        const dragEnter = function () {
            this.classList.add('hovered');
        };


        const dragLeave = function () {
            this.classList.remove('hovered');
        };

        const dragDrop = function () {
            const activeLi = todoList.querySelector('.hide');
            doneList.appendChild(activeLi);
            this.classList.remove('hovered'); 
        };        
        
        done.addEventListener('dragover', dragOver);
        done.addEventListener('dragenter', dragEnter);
        done.addEventListener('dragleave', dragLeave);
        done.addEventListener('drop', dragDrop);
    };
    dragAndDrop();
});



