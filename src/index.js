import $ from 'jquery';
import './assets/style.css';
import App from './components/app';
import Todo from './components/todo';

const renderProjects = (projects, activeProjectIndex) => {
  const projectContainer = $('#projects');
  projectContainer.empty();
  projects.forEach((project, index) => {
    projectContainer.append(
      `<li class="project project${index}" data-id=${index}>${project.getName()}</li>`,
    );
  });
  $('.project').removeClass('active');
  $(`.project[data-id=${activeProjectIndex}]`).addClass('active');
};

const renderTodos = (activeProject) => {
  const todoContainer = $('#todos');

  todoContainer.empty();
  activeProject.getTodos().forEach((todo, index) => {
    const {
      title, priority, dueDate, description,
    } = todo.getInfo();

    todoContainer.append(
      `<li class="todo" data-id=${index}>
      <div class="todoTopContent">
      <p>${title}</p>
      <p><span class="${priority}">${priority}</span>
      <span>${dueDate}</span> <span data-id=${index} class="delete">Delete</span></p>
      </div>
      <p class="todo-description">${description}</p>
      </li>`,
    );
  });

  $('#projectTodos').text(activeProject.getName());
};

const renderSelectedTodo = (todo, index) => {
  const info = todo.getInfo();
  $('#editActiveTodoFormContainer').show();
  $('#editActiveTodoFormContainer input[name=title]').val(info.title);
  $('#editActiveTodoFormContainer #todoDescription').text(info.description);
  $('#editActiveTodoFormContainer select#priority').val(info.priority);
  $('#editActiveTodoFormContainer input[name=dueDate]').val(info.dueDate);
  $('#editActiveTodoFormContainer input[type=hidden]').val(index);
};

const main = () => {
  const app = App.loadFromLocalStorage();
  renderProjects(app.getAllProjects(), app.getActiveProjectIndex());
  renderTodos(app.getActiveProject());

  const handleAddTodoShowForm = () => {
    $('#editActiveTodoFormContainer').hide();
    const formContainer = $('#newTodoForm');
    formContainer.removeClass('hidden');
  };

  const handleSelectTodo = (event) => {
    $('#newTodoForm').addClass('hidden');
    const index = $(event.currentTarget).data('id');
    const todos = app.getActiveProject().getTodos();
    const selectedTodo = todos[index];
    renderSelectedTodo(selectedTodo, index);
  };

  const handleTodoDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const index = $(event.target).data('id');
    app.removeTodoAt(index);
    renderTodos(app.getActiveProject());
    $('.todo').on('click', handleSelectTodo);
    $('.delete').on('click', handleTodoDelete);
  };

  const handleChangeActiveProject = (event) => {
    const index = $(event.currentTarget).data('id');
    app.setActiveProjectIndex(index);
    renderProjects(app.getAllProjects(), app.getActiveProjectIndex());
    renderTodos(app.getActiveProject());
    $('#editActiveTodoFormContainer').hide();
    $('.todo').on('click', handleSelectTodo);
    $('.delete').on('click', handleTodoDelete);
    $('.project').on('click', handleChangeActiveProject);
  };

  const handleAddProjectShowForm = () => {
    const form = $('#newProjectForm');
    form.removeClass('hidden');
  };

  const handleAddNewProject = (event) => {
    event.preventDefault();
    const form = $(event.target);
    const projectName = form.serializeArray()[0].value;
    app.addNewProject(projectName);
    renderProjects(app.getAllProjects(), app.getActiveProjectIndex());

    form[0].reset();

    form.addClass('hidden');

    $('.project').on('click', handleChangeActiveProject);
  };

  const handleAddNewTodo = (event) => {
    event.preventDefault();
    const form = $(event.target);
    const todo = form.serializeArray();
    app.addTodo(todo[0].value, todo[1].value, todo[3].value, todo[2].value);
    renderTodos(app.getActiveProject());
    $('.todo').on('click', handleSelectTodo);
    $('.delete').on('click', handleTodoDelete);
    form[0].reset();
    $('#newTodoForm').addClass('hidden');
  };

  const handleEditTodo = (event) => {
    event.preventDefault();
    const form = $(event.target);
    const todoUpdates = form.serializeArray();
    const index = Number(todoUpdates[4].value);
    const activeProject = app.getActiveProject();
    const updatedTodo = new Todo(
      todoUpdates[0].value,
      todoUpdates[1].value,
      todoUpdates[3].value,
      todoUpdates[2].value,
    );

    app.updateTodo(updatedTodo, index);
    form[0].reset();
    $('#editActiveTodoFormContainer').hide();
    renderTodos(activeProject);
    $('.todo').on('click', handleSelectTodo);
    $('.delete').on('click', handleTodoDelete);
  };

  $('.project').on('click', handleChangeActiveProject);

  $('.todo').on('click', handleSelectTodo);

  $('#newProjectBtn').on('click', handleAddProjectShowForm);

  $('#newProjectForm').on('submit', handleAddNewProject);

  $('#newTodoBtn').on('click', handleAddTodoShowForm);

  $('#todoForm').on('submit', handleAddNewTodo);

  $('#editActiveTodoForm').on('submit', handleEditTodo);

  $('.delete').on('click', handleTodoDelete);

  $('#editActiveTodoFormContainer').hide();

  window.$ = $;
};

$(main);
