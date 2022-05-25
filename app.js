// wokr with add todo modal
const openModal = document.querySelector('.open-modal__todo');
const showModal = document.querySelector('.modal');
const showModalContent = document.querySelector('.modal__content');
const closeModal = document.querySelector('.modal__close');
const modalBody = document.querySelector('.modal__body');
// wokr with add todo modal
const showeditModal = document.querySelector('.editModal');
const showeditModalContent = document.querySelector('.editModal__content');
const closeeditModal = document.querySelector('.editModal__close');
const editmodalBody = document.querySelector('.editmodal__body');

// work with add todo
const addBtnModal = document.querySelector('.modal__btn');
const addInputModal = document.querySelector('.modal__input'); 
const todoList = document.querySelector('.todo-list_ul');
const doneList = document.querySelector('.done-list_ul');

var idLi = 0;
var editLi = null;
let items = todoList.children;

function deleteLi() {
    todoList.addEventListener('click', (e)=> {
        if (e.target.classList.contains('deleteBtn')) {
            e.target.parentElement.remove();
        }    
    });
}

function deleDonelist() {
    const delAllbtn = document.querySelector('.deleteAllBtn');
    delAllbtn.addEventListener('click', ()=> {
        while (doneList.firstChild) {
            doneList.removeChild(doneList.firstChild);            
        }
    }); 
}

function popupOpen() {
    openModal.addEventListener('click', (e) => {  
        e.preventDefault();
        addInputModal.value = '';
        showModal.classList.add('open');    
        showModalContent.classList.add('openModalContetn');
    });
}
//закрываем модалку при кликах
closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    popupClosed();  
});  

modalBody.addEventListener('click', (e) => {
    if (!e.target.closest('.modal__content')) {
        popupClosed();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        popupClosed();
    }
}); 

function popupClosed() {    
    showModal.classList.remove('open');    
    showModalContent.classList.remove('openModalContetn');
}
//закрываем редактирование при кликах
closeeditModal.addEventListener('click', (e) => {
    e.preventDefault();
    editModalClosed();
});  

editmodalBody.addEventListener('click', (e) => {
    if (!e.target.closest('.editModal__content')) {
        editModalClosed();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        editModalClosed();
    }
  });

function editModalClosed() {  
    showeditModal.classList.remove('open');    
    showeditModalContent.classList.remove('openeditModalContetn');   
}
//добавляем туду
addBtnModal.addEventListener('click', (event) => {
    event.preventDefault();
    const newTodoLi = addInputModal.value;
    if (addInputModal.value != '' && addInputModal.value != null && 
        addInputModal.value != undefined ) {

        let li = document.createElement('li');
        let span = document.createElement('span');
        let delbtn = document.createElement('button');
        let editbtn = document.createElement('button');

        todoList.appendChild(li);
        li.appendChild(span);
        li.appendChild(delbtn);
        li.appendChild(editbtn);

        li.classList.add('todo-list__li');
        li.id = idLi++;
        span.classList.add('li__span');
        span.innerHTML += `${newTodoLi}`;

        delbtn.classList.add('deleteBtn');
        delbtn.innerHTML = `&times;`;

        editbtn.classList.add('editBtn');
        editbtn.innerHTML = `...`;

        addInputModal.value = '';
    } else {
        alert('Вы ничего не ввели');
        }

    let elemsli = todoList.children;
    for (let li of elemsli) {
        li.setAttribute('draggable', true);
    }

    //edit todo
    const editInput = document.querySelector('.editModal__input');
    const edite = document.querySelectorAll('.editBtn');
    const submit = document.querySelector('.editModal__btn');

    edite.forEach(e => {
        e.addEventListener('click', function() {               
            showeditModal.classList.add('open');    
            showeditModalContent.classList.add('openEditModalContetn');

            let li = this.parentElement;   
            editLi = li; 
            
            editInput.value = li.querySelector('.li__span').innerHTML;

            submit.addEventListener('click', function() {
                editLi.querySelector('.li__span').innerHTML = editInput.value;
                showeditModal.classList.remove('open');    
                showeditModalContent.classList.remove('openeditModalContetn'); 
            });
        });
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
deleteLi();
deleDonelist();
popupOpen();

//search
document.querySelector('.input__search-form').oninput = function () {
    let value = this.value.trim();
    let list = document.querySelectorAll('.body li');
    if (value != '') {
        list.forEach(function (elem) {
            if (elem.innerText.search(value) == -1) {
                elem.classList.add('hide');
            }
            else {
                elem.classList.remove('hide');
            }
        });
    } else {
        list.forEach(function (elem) {         
              elem.classList.remove('hide');      
        });
        }
};    



deleteLi();
deleDonelist();
popupOpen();