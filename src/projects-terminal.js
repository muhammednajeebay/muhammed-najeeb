// Projects Terminal Module
// Handles terminal-style project display with typing animations

class ProjectsTerminal {
  constructor() {
    this.projectsList = document.getElementById('projects-list');
    this.projectDetails = document.getElementById('project-details');
    this.projects = [];
    this.currentProject = null;
    this.typingSpeed = 15; // Fast typing speed (ms per character)
  }

  async init() {
    try {
      const response = await fetch('assets/content.json');
      const data = await response.json();
      this.projects = data.projects || [];
      this.renderProjectsList();
    } catch (error) {
      console.error('Failed to load projects:', error);
      this.projectsList.innerHTML = '<div class="detail-line" style="color: #ff5f56;">Error loading projects...</div>';
    }
  }

  getProjectStatus(project) {
    // Read status directly from project data
    return project.status || 'in-progress';
  }

  renderProjectsList() {
    // Clear existing content
    this.projectsList.innerHTML = '';

    // Render each project
    this.projects.forEach((project, index) => {
      const status = this.getProjectStatus(project);
      const projectItem = document.createElement('div');
      projectItem.className = 'project-item';
      projectItem.dataset.index = index;

      const projectName = document.createElement('div');
      projectName.className = 'project-name';
      projectName.textContent = project.title.replace(/\s*\(.*?\)\s*/g, '').trim();

      const statusBadge = document.createElement('span');
      statusBadge.className = `status-badge ${status}`;
      statusBadge.textContent = `[${status}]`;

      projectItem.appendChild(projectName);
      projectItem.appendChild(statusBadge);

      // Add click handler
      projectItem.addEventListener('click', () => this.showProjectDetails(index));

      this.projectsList.appendChild(projectItem);
    });
  }

  async showProjectDetails(index) {
    const project = this.projects[index];
    if (!project) return;

    // Clear previous details
    this.projectDetails.innerHTML = '';
    this.projectDetails.classList.add('active');

    // Scroll to details
    this.projectDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Create command line
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `
      <span class="prompt">najeeb@portfolio:~$</span>
      <span class="command">project.open("${project.title.replace(/\s*\(.*?\)\s*/g, '').trim()}")</span>
    `;
    this.projectDetails.appendChild(commandLine);


    // Add spacing
    const spacer = document.createElement('div');
    spacer.style.height = '1rem';
    this.projectDetails.appendChild(spacer);

    // Show description
    if (project.description) {
      const descTitle = document.createElement('div');
      descTitle.className = 'detail-command';
      descTitle.textContent = '> Description:';
      this.projectDetails.appendChild(descTitle);

      await this.typeText(project.description, 'detail-output');
    }

    // Show features
    if (project.features && project.features.length > 0) {
      const spacer2 = document.createElement('div');
      spacer2.style.height = '1rem';
      this.projectDetails.appendChild(spacer2);

      const featuresTitle = document.createElement('div');
      featuresTitle.className = 'detail-command';
      featuresTitle.textContent = '> Key Features:';
      this.projectDetails.appendChild(featuresTitle);

      for (const feature of project.features) {
        const featureItem = document.createElement('div');
        featureItem.className = 'detail-item';
        featureItem.textContent = feature;
        this.projectDetails.appendChild(featureItem);
      }
    }

    // Show tech stack as tags
    if (project.tech && project.tech.length > 0) {
      const spacer3 = document.createElement('div');
      spacer3.style.height = '1rem';
      this.projectDetails.appendChild(spacer3);

      const techTitle = document.createElement('div');
      techTitle.className = 'detail-command';
      techTitle.textContent = '> Tech Stack:';
      this.projectDetails.appendChild(techTitle);

      const techStack = document.createElement('div');
      techStack.className = 'tech-stack';
      project.tech.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techStack.appendChild(tag);
      });
      this.projectDetails.appendChild(techStack);
    }

    // Show links
    if (project.links && Object.keys(project.links).length > 0) {
      const linksContainer = document.createElement('div');
      linksContainer.className = 'project-links';

      if (project.links.live) {
        const liveLink = document.createElement('a');
        liveLink.href = project.links.live;
        liveLink.target = '_blank';
        liveLink.className = 'project-link';
        liveLink.innerHTML = '🔗 Live Demo';
        linksContainer.appendChild(liveLink);
      }

      if (project.links.github) {
        const githubLink = document.createElement('a');
        githubLink.href = project.links.github;
        githubLink.target = '_blank';
        githubLink.className = 'project-link';
        githubLink.innerHTML = '📦 GitHub';
        linksContainer.appendChild(githubLink);
      }

      if (project.links.pub) {
        const pubLink = document.createElement('a');
        pubLink.href = project.links.pub;
        pubLink.target = '_blank';
        pubLink.className = 'project-link';
        pubLink.innerHTML = '📚 Pub.dev';
        linksContainer.appendChild(pubLink);
      }

      this.projectDetails.appendChild(linksContainer);
    }

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-details';
    closeButton.textContent = '← Back to list';
    closeButton.addEventListener('click', () => this.closeDetails());
    this.projectDetails.appendChild(closeButton);
  }

  async typeText(text, className) {
    return new Promise((resolve) => {
      const element = document.createElement('div');
      element.className = `detail-line ${className}`;
      this.projectDetails.appendChild(element);

      let index = 0;
      const type = () => {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          setTimeout(type, this.typingSpeed);
        } else {
          resolve();
        }
      };
      type();
    });
  }

  closeDetails() {
    this.projectDetails.classList.remove('active');
    this.projectDetails.innerHTML = '';
    
    // Scroll back to list
    this.projectsList.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Initialize when DOM is ready
export function initProjectsTerminal() {
  const terminal = new ProjectsTerminal();
  terminal.init();
}
