const tasks = [
    {
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: true,
        body:
            'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095c1288e0',
        completed: false,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
];

(function (arrOfTasks) {

    const objOfTask = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;

    }, {});

    // цвета для тем
    const themes = {
        default: {
            '--base-text-color': '#212529',
            '--header-bg': '#007bff',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#007bff',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': '#0069d9',
            '--default-btn-border-color': '#0069d9',
            '--danger-btn-bg': '#dc3545',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#bd2130',
            '--danger-btn-border-color': '#dc3545',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#80bdff',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
        },
        dark: {
            '--base-text-color': '#212529',
            '--header-bg': '#343a40',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#58616b',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': '#292d31',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow':
                '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#b52d3a',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#88222c',
            '--danger-btn-border-color': '#88222c',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        },
        light: {
            '--base-text-color': '#212529',
            '--header-bg': '#fff',
            '--header-text-color': '#212529',
            '--default-btn-bg': '#fff',
            '--default-btn-text-color': '#212529',
            '--default-btn-hover-bg': '#e8e7e7',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow':
                '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#f1b5bb',
            '--danger-btn-text-color': '#212529',
            '--danger-btn-hover-bg': '#ef808a',
            '--danger-btn-border-color': '#e2818a',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        },
    };

    let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';
    setTheme(lastSelectedTheme);

    //elements UI
    const listContainer = document.querySelector('.tasks-list-section .list-group');
    const form = document.forms['addTask'];
    const inputTitle = form.elements['title'];
    const inputBody = form.elements['body'];
    const themeSelect = document.getElementById('themeSelect');
    const filters = document.querySelector('.js-filters-nav');
    const filterBtn = filters.querySelectorAll('.js-filter-btn');

    renderAllTasks(objOfTask);

    //events
    form.addEventListener('submit', onFormSubmitHandler);
    listContainer.addEventListener('click', onDeleteHandler);
    listContainer.addEventListener('click', onCompletedHandler);
    themeSelect.addEventListener('change', onThemeSelectHandler);
    filters.addEventListener('click', filterTasksHandler);

    function renderAllTasks(tasksList) {
        if (!tasksList) {
            console.error('Передайте список задач');
            return;
        }

        const fragment = document.createDocumentFragment();

        Object.values(tasksList).forEach(task => {
            const li = listItemTemplate(task);
            fragment.appendChild(li);
            if (task.completed === true) {
                li.classList.add('completed');
                checkTaskOfCompleted(li.dataset.taskId, li);
            }
        });

        listContainer.appendChild(fragment);
        filterTasks();
        setMessage();
    }

    function listItemTemplate({_id, title, body, completed} = {}) {
        const li = document.createElement('li');
        li.classList.add(
            'item-list',
            'js-item-list',
            'list-group-item',
            'align-items-center',
            'flex-wrap',
            'mt-2'
        );

        li.setAttribute('data-task-id', _id);
        if (completed === true) {
            setAttributeCompleted(li, 'is-completed');
        } else {
            setAttributeCompleted(li, 'not-completed');
        }


        const span = document.createElement('span');
        span.textContent = title;
        span.style.fontWeight = 'bold';
        span.style.width = '75%';

        const button = document.createElement('button');
        button.textContent = 'Delete task';
        button.classList.add(
            'btn',
            'btn-danger',
            'js-delete-btn'
        );

        const checkButton = document.createElement('button');
        checkButton.textContent = 'Сompleted';
        checkButton.classList.add(
            'btn',
            'ml-auto',
            'btn-success',
            'mr-2',
            'js-completed-btn'
        );

        const article = document.createElement('p');
        article.textContent = body;
        article.classList.add(
            'mt-2',
            'w-100'
        );

        li.appendChild(span);
        li.appendChild(checkButton);
        li.appendChild(button);
        li.appendChild(article);
        setMessage();

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
        setMessage();
        form.reset();
        filterTasks();

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
        if (!isConfirm) return isConfirm;
        delete objOfTask[id];

        return isConfirm;
    }

    function deleteTaskFromHtml(confirmed, el) {
        if (!confirmed) return;
        el.remove();
        setMessage();
    }

    function onDeleteHandler({target}) {
        if (target.classList.contains('js-delete-btn')) {
            const parent = target.closest('[data-task-id]');
            const id = parent.dataset.taskId;
            const confirmed = deleteTask(id);
            deleteTaskFromHtml(confirmed, parent);
        }
    }

    /**
     * меняем значение ключа completed
     * @param id - id задачи
     * @param value - значение true/false
     */
    function changeCompletion(id, value) {
        objOfTask[id].completed = value;

    }

    /**
     * в зависимости от наличия класса меняем значение ключа completed
     * @param id - id задачи
     */

    function checkTaskOfCompleted(id, element) {
        element.classList.contains('completed') ? changeCompletion(id, true) : changeCompletion(id, false);
    }

    function setAttributeCompleted(elem, value) {
        elem.setAttribute('data-task-completed', value);
        filterTasks();
    }

    /**
     * обработчик клика по кнопке отметки о выполнении
     * @param target - параметр event
     */
    function onCompletedHandler({target}) {
        if (target.classList.contains('js-completed-btn')) {
            const parent = target.closest('[data-task-id]');
            const id = parent.dataset.taskId;
            parent.classList.toggle('completed');
            checkTaskOfCompleted(id, parent);
            if (parent.classList.contains('completed')) {
                setAttributeCompleted(parent, 'is-completed');
            } else {
                setAttributeCompleted(parent, 'not-completed');
            }

        }
    }

    function onThemeSelectHandler() {
        const selectedTheme = themeSelect.value;
        const isConfirmed = confirm(`Вы действительно хотите изменить тему на ${selectedTheme}?`);
        if (!isConfirmed) {
            themeSelect.value = lastSelectedTheme;
            return
        }
        setTheme(selectedTheme);
        lastSelectedTheme = selectedTheme;
        localStorage.setItem('app_theme', selectedTheme);
    }


    function filterTasksHandler({target}) {
        for (let i = 0; i < filterBtn.length; i++) {
            filterBtn[i].classList.remove('active');
        }
        target.classList.add('active');
        filterTasks();
    }

    function filterTasks() {
        const listItem = document.querySelectorAll('.js-item-list');
        const dataValue = filters.querySelector('.js-filter-btn.active').getAttribute('data-filter');
        for (let i = 0; i < listItem.length; i++) {
            if (listItem[i].getAttribute('data-task-completed') !== dataValue) {
                listItem[i].style.display = 'none';
            } else {
                listItem[i].style.display = 'flex';
            }
            if(dataValue === 'all') {
                listItem[i].style.display = 'flex';
            }
        }
    }

    function setTheme(name) {
        const selectedThemeObj = themes[name];
        Object.entries(selectedThemeObj).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    }

    function setMessage() {
        const textMessage = document.querySelector('.js-text-message');
        const listItem = document.querySelectorAll('.js-item-list');
        if (!listItem.length) {
            textMessage.textContent = 'Создайте задачу';
            filters.style.display = 'none'
        } else {
            textMessage.textContent = '';
            filters.style.display = 'block';
        }
        return textMessage;
    }


})(tasks);
