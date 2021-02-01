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

const main = () => {
  const app = new App();
  renderProjects(app.getAllProjects(), app.getActiveProjectIndex());
};

$(main);
