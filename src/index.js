import $ from 'jquery';
import './assets/style.css';
import App from './components/app';

/*
1. What is the user story?
2. What event is triggered?
3. Update the Data model (if needed)
4. Render with the updated data model
*/

const renderProjects = (projects, activeProjectIndex) => {
  const projectContainer = $('#projects');
  projectContainer.empty();
  projects.forEach((project, index) => {
    projectContainer.append(
      `<li class="project" data-id=${index}>${project.getName()}</li>`
    );
  });
  $('.project').removeClass('active');
  $(`.project[data-id=${activeProjectIndex}]`).addClass('active');
};

const renderTodos = (activeProject) => {
  const todoContainer = $('#todos');

  todoContainer.empty();
  activeProject.getTodos().forEach((todo, index) => {
    const { title, priority, dueDate, description } = todo.getInfo();

    todoContainer.append(
      `<li class="todo" data-id=${index}>
      <div class="todoTopContent">
      <p>${title}</p>
      <p> <span class="${priority}">${priority}</span>
      <span>${dueDate}</span></p>

      </div>
      
     
      <p class="todo-description">${description}</p>
      </li>`
    );
  });

  $('#activeProject').text(activeProject.getName());
};

const renderSelectedTodo = (todo) => {
  const info = todo.getInfo();
  $('.activeTodo').show();
  $('.activeTodo input[name=title]').val(info.title);
  $('.activeTodo #todoDescription').text(info.description);
  $('.activeTodo select#priority').val(info.priority);
  $('.activeTodo input[name=dueDate]').val(info.dueDate);
};

const main = () => {
  const app = new App();
  renderProjects(app.getAllProjects(), app.getActiveProjectIndex());
  renderTodos(app.getActiveProject());

  const handleSelectTodo = (event) => {
    const index = $(event.currentTarget).data('id');
    const todos = app.getActiveProject().getTodos();
    const selectedTodo = todos[index];
    renderSelectedTodo(selectedTodo);
  };

  const handleChangeActiveProject = (event) => {
    const index = $(event.target).data('id');
    app.setActiveProjectIndex(index);
    renderProjects(app.getAllProjects(), app.getActiveProjectIndex());
    renderTodos(app.getActiveProject());
    $('.activeTodo').hide();
    $('.todo').on('click', handleSelectTodo);
    $('.project').on('click', handleChangeActiveProject);
  };

  const handleAddProjectShowForm = () => {
    const form = $('#newProjectForm');
    form.toggleClass('hidden');
  };

  const handleAddTodoShowForm = () => {
    const form = $('#todoForm');
    form.toggleClass('hidden');
  };

  const handleAddNewProject = (event) => {
    event.preventDefault();
    const form = $(event.target);
    const projectName = form.serializeArray()[0].value;
    app.addNewProject(projectName);
    renderProjects(app.getAllProjects(), app.getActiveProjectIndex());
    // Reset form input
    form[0].reset();
    // Hide form
    form.toggleClass('hidden');

    $('.project').on('click', handleChangeActiveProject);
  };

  const handleAddNewTodo = (event) => {
    event.preventDefault();
    const form = $(event.target);
    const todo = form.serializeArray();
    const activeProject = app.getActiveProject();
    activeProject.addTodo(
      todo[0].value,
      todo[1].value,
      todo[3].value,
      todo[2].value
    );
    renderTodos(activeProject);
    $('.todo').on('click', handleSelectTodo);
    form[0].reset();
    form.toggleClass('hidden');
  };

  // change active project
  $('.project').on('click', handleChangeActiveProject);

  // select a todo
  $('.todo').on('click', handleSelectTodo);

  // click add new project button
  $('#newProjectBtn').on('click', handleAddProjectShowForm);

  // submit new project form
  $('#newProjectForm').on('submit', handleAddNewProject);

  $('#newTodoBtn').on('click', handleAddTodoShowForm);

  $('#todoForm').on('submit', handleAddNewTodo);

  $('.activeTodo').hide();
};

$(main);
