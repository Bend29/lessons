const tasks = [];

(function (arrOfTasks) {
    const objOfTask = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {});


    //elements UI
    const listContainer = document.querySelector('.tasks-list-section .list-group');

    const form = document.forms['addTask'];
    const inputTitle = form.elements['title'];
    const inputBody = form.elements['body'];


    renderAllTasks(objOfTask);

    //events
    form.addEventListener('submit', onFormSubmitHandler);
    listContainer.addEventListener('click', onDeleteHandler);

    function renderAllTasks(tasksList) {
        if (!tasksList) {
            console.error('Передайте список задач');
            return;
        }

        const fragment = document.createDocumentFragment();

        Object.values(tasksList).forEach(task => {
            const li = listItemTemplate(task);
            fragment.appendChild(li);
        });

        listContainer.appendChild(fragment);

    }

    function listItemTemplate({_id, title, body} = {}) {
        const li = document.createElement('li');
        li.classList.add(
            'list-group-item',
            'd-flex',
            'align-items-center',
            'flex-wrap',
            'mt-2'
        );

        li.setAttribute('data-task-id', _id);
        const span = document.createElement('span');
        span.textContent = title;
        span.style.fontWeight = 'bold';

        const button = document.createElement('button');
        button.textContent = 'Delete task';
        button.classList.add(
            'btn',
            'btn-danger',
            'ml-auto',
            'delete-btn'
        );

        const article = document.createElement('p');
        article.textContent = body;
        article.classList.add(
            'mt-2',
            'w-100'
        );
        li.appendChild(span);
        li.appendChild(button);
        li.appendChild(article);

        return li;
    }

    function onFormSubmitHandler(e) {
        e.preventDefault();
        const titleValue = inputTitle.value;
        const bodyValue = inputBody.value;

        if (!titleValue || !bodyValue) {
            alert('Заполните поля');
            return false;
        }
        const task = createNewTask(titleValue, bodyValue);
        const listItem = listItemTemplate(task);
        listContainer.insertAdjacentElement('afterbegin', listItem);
        form.reset();
    }

    function createNewTask(title, body) {
        const newTask = {
            title,
            body,
            completed: false,
            _id: `task-${Math.random()}`
        };
        objOfTask[newTask._id] = newTask;
        return {...newTask};
    }

    function deleteTask(id) {
        const {title} = objOfTask[id];
        const isConfirm = confirm(`Удалить задачу ${title}?`);
        if(!isConfirm) return isConfirm;
        delete objOfTask[id];
        return isConfirm;
    }

    function deleteTaskFromHtml(confirmed, el) {
        if(!confirmed) return;
        el.remove();
    }

    function onDeleteHandler ({target}) {
        if(target.classList.contains('delete-btn')) {
            const parent = target.closest('[data-task-id]');
            const id = parent.dataset.taskId;
            const confirmed = deleteTask(id);
            deleteTaskFromHtml(confirmed, parent);
        }
    }

})(tasks);
