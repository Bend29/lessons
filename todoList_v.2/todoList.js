const tasks = [
    {
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: true,
        body:
            'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a940asd95c1288e0',
        completed: false,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
    {
        _id: 'asdweaaaseddawd',
        completed: true,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt',
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
    let themes = {
        default: 'default',
        dark: 'dark',
        light: 'light'
    };

    let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';


    //elements UI
    const listContainer = document.querySelector('.tasks-list-section .list-group');
    const form = document.forms['addTask'];
    const inputTitle = form.elements['title'];
    const inputBody = form.elements['body'];
    const themeSelect = document.getElementById('themeSelect');
    const filters = document.querySelector('.js-filters-nav');
    const filterBtn = filters.querySelectorAll('.js-filter-btn');
    const formWrapper = document.querySelector('.js-form');
    const formInput = document.querySelector('.js-form-input');
    let listItem;

    /**
     * Рендер имеющихся задач в массиве
     * @param tasksList
     */
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
        destroyListTasks();
        listContainer.appendChild(fragment);
        sortTasks();
        filterTasks();
        setMessage();
    }

    /**
     * HTML-шаблон для рендера задачи
     * @param _id - {string} - id задачи
     * @param title - {string} - заголовок задачи
     * @param body - {string} - текст задачи
     * @param completed - {boolean} - статус выполнения задачи
     * @returns {HTMLLIElement} - возвращаемый HTML-элемент
     */
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
        span.classList.add('list-item-title');
        span.textContent = title;

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
        return li;
    }

    /**
     *
     */
    function destroyListTasks() {
        listItem = document.querySelectorAll('.js-item-list');
        if (listItem.length) {
            listItem.forEach(function (key, value) {
                listItem[value].remove();
            });
        }
    }

    /**
     * Показываем ошибку
     * @param parentInput - элемент, на который вешаем класс ошибки
     */
    function showError(parentInput) {
        parentInput.classList.add('has-error');
    }

    /**
     * Скрываем ошибку
     * @param parentInput - элемент, с которого снимаем класс ошибки
     */
    function hideError(parentInput) {
        parentInput.classList.remove('has-error');
    }

    /**
     * Обработка события клика отправки данных для создания новой задачи
     * @param e
     * @returns {boolean}
     */
    function onFormSubmitHandler(e) {
        e.preventDefault();
        const titleValue = inputTitle.value;
        const bodyValue = inputBody.value;
        checkInputValue();
        if (!titleValue || !bodyValue) {
            return false;
        }

        const task = createNewTask(titleValue, bodyValue);
        const listItemTask = listItemTemplate(task);
        listContainer.insertAdjacentElement('afterbegin', listItemTask);
        setMessage();
        form.reset();
        filterTasks();
    }

    /**
     * Проверяем значение полей
     */
    function checkInputValue() {
        const input = document.querySelectorAll('.js-form-input');
        input.forEach(function (key, value) {
            const formGroup = input[value].closest('.js-form-group');
            if (!input[value].value) {
                showError(formGroup);
            } else {
                hideError(formGroup)
            }
        });
    }

    /**
     * Создание задачи и добавление объекта в массив
     * @param title {string} - заголовок задачи
     * @param body {string} - текст задачи
     * @returns {{completed: boolean, _id: string, title: *, body: *}} возвращает объект с полученными значениями
     */
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

    /**
     * Удаление задачи из массива объектов
     * @param id - {string} - id задачи
     * @returns {boolean} подтверждение удаления
     */
    function deleteTask(id) {
        delete objOfTask[id];
    }

    /**
     * Обработчик клика по кнопке удаления задачи
     * @param target
     */
    function onDeleteHandler({target}) {
        if (target.classList.contains('js-delete-btn')) {
            const parent = target.closest('[data-task-id]');
            const id = parent.dataset.taskId;
            deleteTask(id);
            renderAllTasks(objOfTask);
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

    /**
     * Установка аттрибута
     * @param elem {object} - Эл-т, которому устанавливаем аттрибут
     * @param value {boolean} - значение аттрибута
     */
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
            renderAllTasks(objOfTask);
            sortTasks();
        }
    }

    /**
     * Обработка события клика по селекту
     */
    function onThemeSelectHandler() {
        const selectedTheme = themeSelect.value;
        setTheme(selectedTheme);
        lastSelectedTheme = selectedTheme;
        localStorage.setItem('app_theme', selectedTheme);
    }

    /**
     * Обработка события клика по фильтрам
     * @param target - эл-т, по которому кликнули
     */
    function filterTasksHandler({target}) {
        filterBtn.forEach(function (key, value) {
            filterBtn[value].classList.remove('active');
        });
        target.classList.add('active');
        filterTasks();
    }

    /**
     * Фильтры задач по выполнению (все/выполненные/невыполненные)
     */
    function filterTasks() {
        listItem = document.querySelectorAll('.js-item-list');
        const dataValue = filters.querySelector('.js-filter-btn.active').getAttribute('data-filter');
        listItem.forEach(function (key, value) {
            if (listItem[value].getAttribute('data-task-completed') === dataValue || dataValue === 'all') {
                listItem[value].classList.remove('invisible');
            } else {
                listItem[value].classList.add('invisible');
            }
        });
    }

    /**
     * Установка темы
     * @param name {string} - строка с названием темы
     */
    function setTheme(name) {
        Object.entries(themes).forEach(([key, value]) => {
            document.body.classList.remove(value);
        });
        document.body.classList.add(themes[name]);
    }

    /**
     * Если нет созданных задач, выводим текст
     * @returns {Element} - {string} - текст
     */
    function setMessage() {
        const textMessage = document.querySelector('.js-text-message');
        listItem = document.querySelectorAll('.js-item-list');
        if (!listItem.length) {
            textMessage.classList.remove('d-none');
            filters.classList.add('d-none');
        } else {
            textMessage.classList.add('d-none');
            filters.classList.remove('d-none');
        }
        return textMessage;
    }

    /**
     * Сортируем задачи по выполнению (выполненные убираем в конец списка)
     */
    function sortTasks() {
        listItem = document.querySelectorAll('.js-item-list');
        listItem.forEach(function (key, value) {
            if (listItem[value].classList.contains('completed')) {
                listContainer.appendChild(listItem[value]);
            }
        });
    }

    function init() {
        setTheme(lastSelectedTheme);
        renderAllTasks(objOfTask);

        //events
        form.addEventListener('submit', onFormSubmitHandler);
        listContainer.addEventListener('click', onDeleteHandler);
        listContainer.addEventListener('click', onCompletedHandler);
        themeSelect.addEventListener('change', onThemeSelectHandler);
        filters.addEventListener('click', filterTasksHandler);
        formInput.addEventListener('keyup', checkInputValue);
    }

    init();

})(tasks);
