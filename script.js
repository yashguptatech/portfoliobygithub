// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// GitHub Data Fetching
const GITHUB_USERNAME = 'yashguptatech';
const GITHUB_API = 'https://api.github.com';

// Featured repositories to highlight (based on stars and relevance)
const FEATURED_REPOS = [
    'Portfolio-website',
    'yashguptatech.github.io',
    'mentoring-portal',
    'Bank-MergeCo',
    'Stan-Lee',
    'Steganography-c',
    'thelastinglatch',
    'YogaPostureDetection',
    'HappySadCNNImageclassifier',
    'face-recognition',
    'CNNClassifier',
    'mashvision'
];

// Fetch and display GitHub projects
async function fetchGitHubProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    try {
        // Fetch user's repositories
        const response = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        
        // Filter and sort repositories
        const filteredRepos = repos
            .filter(repo => !repo.fork && !repo.archived)
            .sort((a, b) => {
                // Prioritize featured repos
                const aFeatured = FEATURED_REPOS.includes(a.name);
                const bFeatured = FEATURED_REPOS.includes(b.name);
                
                if (aFeatured && !bFeatured) return -1;
                if (!aFeatured && bFeatured) return 1;
                
                // Then sort by stars
                if (b.stargazers_count !== a.stargazers_count) {
                    return b.stargazers_count - a.stargazers_count;
                }
                
                // Then by update date
                return new Date(b.updated_at) - new Date(a.updated_at);
            })
            .slice(0, 12); // Show top 12 projects
        
        // Update stats
        updateStats(repos);
        
        // Clear loading message
        projectsContainer.innerHTML = '';
        
        // Create project cards
        filteredRepos.forEach(repo => {
            const projectCard = createProjectCard(repo);
            projectsContainer.appendChild(projectCard);
        });
        
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        projectsContainer.innerHTML = `
            <div class="loading">
                Unable to load projects. Please visit my 
                <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">GitHub profile</a> 
                to see my work.
            </div>
        `;
    }
}

// Create project card element
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const description = repo.description || 'A project showcasing my development skills';
    const language = repo.language || 'Code';
    const stars = repo.stargazers_count;
    const forks = repo.forks_count;
    
    // Extract topics for tags
    const topics = repo.topics || [];
    const tagsHTML = topics.length > 0 
        ? topics.slice(0, 4).map(topic => `<span class="tag">${topic}</span>`).join('')
        : `<span class="tag">${language}</span>`;
    
    card.innerHTML = `
        <div class="project-header">
            <h3>${repo.name}</h3>
            <div class="project-meta">
                ${stars > 0 ? `<span><i class="fas fa-star"></i> ${stars}</span>` : ''}
                ${forks > 0 ? `<span><i class="fas fa-code-branch"></i> ${forks}</span>` : ''}
                ${language ? `<span><i class="fas fa-circle"></i> ${language}</span>` : ''}
            </div>
        </div>
        <div class="project-content">
            <p class="project-description">${description}</p>
            <div class="project-tags">
                ${tagsHTML}
            </div>
            <div class="project-links">
                <a href="${repo.html_url}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> View Code
                </a>
                ${repo.homepage ? `
                    <a href="${repo.homepage}" target="_blank" class="project-link">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Update statistics
function updateStats(repos) {
    const totalRepos = repos.filter(repo => !repo.fork && !repo.archived).length;
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    
    const repoCountElement = document.getElementById('repo-count');
    const starCountElement = document.getElementById('star-count');
    
    if (repoCountElement) {
        animateNumber(repoCountElement, totalRepos);
    }
    
    if (starCountElement) {
        animateNumber(starCountElement, totalStars);
    }
}

// Animate number counting
function animateNumber(element, target) {
    const duration = 1000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Fetch GitHub projects
    fetchGitHubProjects();
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});
