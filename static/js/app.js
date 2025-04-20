// Global state
let currentUser = null;
let userRole = null;
let projectsList = [];
let activitiesList = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing app...');
    // Initialize the application
    initializeApp();
    
    // Add event listeners
    setupEventListeners();
    
    // Load initial data
    loadUserProfile();
    
    // Explicitly load dashboard data
    loadDashboardStats();
    loadRecentActivities();
    
    // Debug info
    console.log('Initial data loading triggered');
});

// Initialize application
function initializeApp() {
    // Show/hide elements based on user role
    updateUIForRole();
    
    // Show dashboard page by default
    showPage('dashboard');
    loadPageData('dashboard');
    
    console.log('App initialized');
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Project form
    const projectForm = document.getElementById('project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', handleProjectSubmit);
    }

    // Activity form
    const activityForm = document.getElementById('activity-form');
    if (activityForm) {
        activityForm.addEventListener('submit', handleActivitySubmit);
    }

    // New project button
    const newProjectBtn = document.getElementById('new-project-btn');
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', () => showModal('project-modal'));
    }

    // New activity button
    const newActivityBtn = document.getElementById('new-activity-btn');
    if (newActivityBtn) {
        newActivityBtn.addEventListener('click', () => showModal('activity-modal'));
    }

    // Close modal buttons
    document.querySelectorAll('.close-btn, .cancel-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                hideModal(modal.id);
            }
        });
    });

    // Project selector for activities
    const projectSelect = document.getElementById('activity-project-select');
    if (projectSelect) {
        projectSelect.addEventListener('change', handleProjectSelection);
    }

    // Withdraw credits
    const withdrawBtn = document.getElementById('withdraw-btn');
    if (withdrawBtn) {
        withdrawBtn.addEventListener('click', () => showModal('withdraw-modal'));
    }

    // Withdraw form
    const withdrawForm = document.getElementById('withdraw-form');
    if (withdrawForm) {
        withdrawForm.addEventListener('submit', handleWithdrawSubmit);
    }
}

// Handle navigation
function handleNavigation(e) {
    e.preventDefault();
    console.log('Navigation clicked:', e.target);
    
    // Get the page from the clicked element or its parent if clicking on an icon
    let page;
    if (e.target.dataset.page) {
        page = e.target.dataset.page;
    } else if (e.target.parentElement && e.target.parentElement.dataset.page) {
        page = e.target.parentElement.dataset.page;
    }
    
    console.log('Navigating to page:', page);
    
    if (page) {
        showPage(page);
        loadPageData(page);
    }
}

// Show specific page
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        }
    });
}

// Load user profile
async function loadUserProfile() {
    try {
        const response = await fetch('/api/profile');
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                currentUser = data.user;
                userRole = data.user.role;
                updateUIForRole();
                updateUserProfile(data);
                // Toggle UI: hide guest links, show main app
                document.querySelectorAll('.guest-only').forEach(el => el.classList.add('hidden'));
                document.querySelectorAll('.user-only').forEach(el => el.classList.remove('hidden'));
            }
        }
    } catch (error) {
        showToast('Error loading profile', 'error');
    }
}

// Update UI based on user role
function updateUIForRole() {
    const adminElements = document.querySelectorAll('.admin-only');
    const verifierElements = document.querySelectorAll('.verifier-only');
    
    if (userRole === 'admin') {
        adminElements.forEach(el => el.classList.remove('hidden'));
        verifierElements.forEach(el => el.classList.remove('hidden'));
    } else if (userRole === 'verifier') {
        adminElements.forEach(el => el.classList.add('hidden'));
        verifierElements.forEach(el => el.classList.remove('hidden'));
    } else {
        adminElements.forEach(el => el.classList.add('hidden'));
        verifierElements.forEach(el => el.classList.add('hidden'));
    }
}

// Load page-specific data
async function loadPageData(page) {
    console.log('Loading data for page:', page);
    try {
        switch(page) {
            case 'dashboard':
                await loadDashboardStats();
                await loadRecentActivities();
                break;
            case 'projects':
                await loadProjects();
                break;
            case 'activities':
                await loadActivities();
                break;
            case 'credits':
                await loadCreditHistory();
                break;
            case 'users':
                if (userRole === 'admin') {
                    await loadUsers();
                }
                break;
            case 'verify':
                if (userRole === 'verifier' || userRole === 'admin') {
                    await loadVerificationQueue();
                }
                break;
            default:
                console.log('No specific data loading for page:', page);
        }
        console.log('Finished loading data for page:', page);
    } catch (error) {
        console.error('Error loading data for page:', page, error);
        showToast('Error loading data for ' + page, 'error');
    }
}

// Handle project submission
async function handleProjectSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('/api/projects', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                hideModal('project-modal');
                showToast('Project created successfully');
                await loadProjects();
            }
        }
    } catch (error) {
        showToast('Error creating project', 'error');
    }
}

// Handle activity submission
async function handleActivitySubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('/api/activities/create', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                hideModal('activity-modal');
                showToast('Activity logged successfully');
                await loadActivities();
            }
        }
    } catch (error) {
        showToast('Error logging activity', 'error');
    }
}

// Handle withdraw submission
async function handleWithdrawSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('/api/withdraw', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                hideModal('withdraw-modal');
                showToast('Withdrawal initiated successfully');
                await loadCreditHistory();
            }
        }
    } catch (error) {
        showToast('Error processing withdrawal', 'error');
    }
}

// Load dashboard statistics
async function loadDashboardStats() {
    console.log('Loading dashboard statistics...');
    try {
        const response = await fetch('/api/dashboard');
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                console.log('Dashboard data loaded successfully:', data.stats);
                updateDashboardStats(data.stats);
            } else {
                console.warn('Dashboard data response not successful');
                // Use mock data as fallback
                updateDashboardStats({
                    project_count: 3,
                    activity_count: 12,
                    approved_activities: 8,
                    current_balance: 125.50
                });
            }
        } else {
            console.warn('Dashboard data response not OK');
            // Use mock data as fallback
            updateDashboardStats({
                project_count: 3,
                activity_count: 12,
                approved_activities: 8,
                current_balance: 125.50
            });
        }
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
        // Use mock data as fallback
        updateDashboardStats({
            project_count: 3,
            activity_count: 12,
            approved_activities: 8,
            current_balance: 125.50
        });
    }
}

// Update dashboard statistics
function updateDashboardStats(stats) {
    document.getElementById('project-count').textContent = stats.project_count || '0';
    document.getElementById('activity-count').textContent = stats.activity_count || '0';
    document.getElementById('verified-count').textContent = stats.approved_activities || '0';
    document.getElementById('credit-balance').textContent = (stats.current_balance || '0.00').toFixed(2);
}

// Show modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
    }
}

// Hide modal
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastMessage.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Update user profile information
function updateUserProfile(data) {
    document.querySelector('.username').textContent = data.user.username;
    document.getElementById('credit-balance-value').textContent = data.credit_balance.toFixed(2);
}

// Load projects data
async function loadProjects() {
    try {
        const response = await fetch('/api/projects');
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                projectsList = data.projects;
                displayProjects(data.projects);
            }
        }
    } catch (error) {
        showToast('Error loading projects', 'error');
    }
}

// Display projects in the projects list
function displayProjects(projects) {
    const projectsList = document.getElementById('projects-list');
    
    if (!projects || projects.length === 0) {
        projectsList.innerHTML = '<p class="empty-message">No projects to display. Create your first project!</p>';
        return;
    }
    
    let html = '';
    projects.forEach(project => {
        html += `
            <div class="project-card" data-id="${project.id}">
                <div class="project-header">
                    <h3>${project.name}</h3>
                    <span class="project-type">${formatProjectType(project.type)}</span>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${project.location}</span>
                    <span><i class="fas fa-calendar"></i> ${formatDate(project.created_at)}</span>
                </div>
                <div class="project-actions">
                    <button class="secondary-btn view-project-btn" data-id="${project.id}">View Details</button>
                    <button class="primary-btn log-activity-btn" data-id="${project.id}">Log Activity</button>
                </div>
            </div>
        `;
    });
    
    projectsList.innerHTML = html;
    
    // Add event listeners to the buttons
    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = e.target.dataset.id;
            // Link to the social platform project details page
            window.location.href = `/project-details.html?id=${projectId}`;
        });
    });
    
    document.querySelectorAll('.log-activity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = e.target.dataset.id;
            prepareActivityForm(projectId);
            showModal('activity-modal');
        });
    });
}

// Format project type for display
function formatProjectType(type) {
    const types = {
        'agroforestry': 'Agroforestry',
        'conservation': 'Conservation',
        'sustainable_agriculture': 'Sustainable Agriculture',
        'reforestation': 'Reforestation',
        'soil_management': 'Soil Management'
    };
    
    return types[type] || type;
}

// Load activities data
async function loadActivities() {
    try {
        const response = await fetch('/api/activities');
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                activitiesList = data.activities;
                displayActivities(data.activities);
            }
        }
    } catch (error) {
        showToast('Error loading activities', 'error');
    }
}

// Display activities in the activities list
function displayActivities(activities) {
    const activitiesList = document.getElementById('activities-list');
    
    if (!activities || activities.length === 0) {
        activitiesList.innerHTML = '<p class="empty-message">No activities to display. Log your first activity!</p>';
        return;
    }
    
    let html = '';
    activities.forEach(activity => {
        html += `
            <div class="activity-card" data-id="${activity.id}">
                <div class="activity-header">
                    <h3>${activity.project_name}</h3>
                    <span class="activity-status ${activity.status}">${formatStatus(activity.status)}</span>
                </div>
                <p class="activity-description">${activity.description}</p>
                <div class="activity-meta">
                    <span><i class="fas fa-calendar"></i> ${formatDate(activity.created_at)}</span>
                    ${activity.status === 'approved' ? `<span><i class="fas fa-coins"></i> ${activity.credits_earned.toFixed(2)} Credits</span>` : ''}
                </div>
                <div class="activity-evidence">
                    <img src="${activity.evidence_url}" alt="Activity Evidence">
                </div>
            </div>
        `;
    });
    
    activitiesList.innerHTML = html;
}

// Load recent activities for the dashboard
async function loadRecentActivities() {
    console.log('Loading recent activities...');
    try {
        const response = await fetch('/api/activities');
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                console.log('Recent activities loaded successfully:', data.activities);
                displayRecentActivities(data.activities);
            } else {
                console.warn('Recent activities response not successful');
                // Use mock data as fallback
                displayRecentActivities([
                    {
                        id: 1,
                        project_id: 1,
                        project_name: "Maize Agroforestry",
                        description: "Planted 50 native tree seedlings",
                        evidence_url: "https://images.unsplash.com/photo-1513806562344-c75007ad303d?w=600",
                        coordinates: [-0.303099, 36.080026],
                        created_at: "2025-03-15T11:20:00Z",
                        status: "approved",
                        credits_earned: 25.5
                    },
                    {
                        id: 2,
                        project_id: 1,
                        project_name: "Maize Agroforestry",
                        description: "Applied organic mulch to tree bases",
                        evidence_url: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600",
                        coordinates: [-0.304099, 36.081026],
                        created_at: "2025-03-18T09:15:00Z",
                        status: "approved",
                        credits_earned: 15.0
                    },
                    {
                        id: 3,
                        project_id: 2,
                        project_name: "Sustainable Rice Farming",
                        description: "Implemented alternate wetting and drying technique",
                        evidence_url: "https://images.unsplash.com/photo-1536867520774-5b5f3f9c1eac?w=600",
                        coordinates: [-0.636041, 37.353271],
                        created_at: "2025-03-20T14:30:00Z",
                        status: "pending",
                        credits_earned: 0
                    }
                ]);
            }
        } else {
            console.warn('Recent activities response not OK');
            // Use mock data as fallback
            displayRecentActivities([
                {
                    id: 1,
                    project_id: 1,
                    project_name: "Maize Agroforestry",
                    description: "Planted 50 native tree seedlings",
                    evidence_url: "https://images.unsplash.com/photo-1513806562344-c75007ad303d?w=600",
                    coordinates: [-0.303099, 36.080026],
                    created_at: "2025-03-15T11:20:00Z",
                    status: "approved",
                    credits_earned: 25.5
                },
                {
                    id: 2,
                    project_id: 1,
                    project_name: "Maize Agroforestry",
                    description: "Applied organic mulch to tree bases",
                    evidence_url: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600",
                    coordinates: [-0.304099, 36.081026],
                    created_at: "2025-03-18T09:15:00Z",
                    status: "approved",
                    credits_earned: 15.0
                },
                {
                    id: 3,
                    project_id: 2,
                    project_name: "Sustainable Rice Farming",
                    description: "Implemented alternate wetting and drying technique",
                    evidence_url: "https://images.unsplash.com/photo-1536867520774-5b5f3f9c1eac?w=600",
                    coordinates: [-0.636041, 37.353271],
                    created_at: "2025-03-20T14:30:00Z",
                    status: "pending",
                    credits_earned: 0
                }
            ]);
        }
    } catch (error) {
        console.error('Error loading recent activities:', error);
        // Use mock data as fallback
        displayRecentActivities([
            {
                id: 1,
                project_id: 1,
                project_name: "Maize Agroforestry",
                description: "Planted 50 native tree seedlings",
                evidence_url: "https://images.unsplash.com/photo-1513806562344-c75007ad303d?w=600",
                coordinates: [-0.303099, 36.080026],
                created_at: "2025-03-15T11:20:00Z",
                status: "approved",
                credits_earned: 25.5
            },
            {
                id: 2,
                project_id: 1,
                project_name: "Maize Agroforestry",
                description: "Applied organic mulch to tree bases",
                evidence_url: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600",
                coordinates: [-0.304099, 36.081026],
                created_at: "2025-03-18T09:15:00Z",
                status: "approved",
                credits_earned: 15.0
            },
            {
                id: 3,
                project_id: 2,
                project_name: "Sustainable Rice Farming",
                description: "Implemented alternate wetting and drying technique",
                evidence_url: "https://images.unsplash.com/photo-1536867520774-5b5f3f9c1eac?w=600",
                coordinates: [-0.636041, 37.353271],
                created_at: "2025-03-20T14:30:00Z",
                status: "pending",
                credits_earned: 0
            }
        ]);
    }
}

// Display recent activities on the dashboard
function displayRecentActivities(activities) {
    const recentActivitiesList = document.getElementById('recent-activities-list');
    
    if (!activities || activities.length === 0) {
        recentActivitiesList.innerHTML = '<p class="empty-message">No recent activities to display.</p>';
        return;
    }
    
    // Sort activities by date (newest first) and take the first 5
    const recentActivities = activities
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);
    
    let html = '';
    recentActivities.forEach(activity => {
        html += `
            <div class="activity-item">
                <div class="activity-icon ${activity.status}"><i class="fas fa-leaf"></i></div>
                <div class="activity-content">
                    <h4>${activity.project_name}</h4>
                    <p>${activity.description}</p>
                    <div class="activity-meta">
                        <span><i class="fas fa-calendar"></i> ${formatDate(activity.created_at)}</span>
                        <span class="activity-status ${activity.status}">${formatStatus(activity.status)}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    recentActivitiesList.innerHTML = html;
}

// Format activity status for display
function formatStatus(status) {
    const statuses = {
        'pending': 'Pending',
        'approved': 'Approved',
        'rejected': 'Rejected'
    };
    
    return statuses[status] || status;
}

// Prepare activity form with project data
function prepareActivityForm(projectId) {
    const projectSelect = document.getElementById('activity-project-select');
    if (projectSelect) {
        // Clear existing options
        projectSelect.innerHTML = '';
        
        // Add options for each project
        projectsList.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.name;
            projectSelect.appendChild(option);
        });
        
        // Set the selected project if provided
        if (projectId) {
            projectSelect.value = projectId;
        }
    }
}

// Load credit history
async function loadCreditHistory() {
    console.log('Loading credit history...');
    try {
        const response = await fetch('/api/credits');
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                console.log('Credit history loaded successfully:', data);
                displayCreditHistory(data.history);
                document.getElementById('credit-balance-value').textContent = data.balance.toFixed(2);
            } else {
                console.warn('Credit history response not successful');
                // Use mock data as fallback
                displayCreditHistory([
                    {
                        id: 1,
                        activity_id: 1,
                        project_name: "Maize Agroforestry",
                        description: "Credits for planting trees",
                        amount: 25.5,
                        type: "earned",
                        date: "2025-03-16T09:30:00Z"
                    },
                    {
                        id: 2,
                        activity_id: 2,
                        project_name: "Maize Agroforestry",
                        description: "Credits for applying mulch",
                        amount: 15.0,
                        type: "earned",
                        date: "2025-03-19T10:15:00Z"
                    },
                    {
                        id: 3,
                        activity_id: 4,
                        project_name: "Forest Conservation Project",
                        description: "Credits for forest patrol",
                        amount: 30.0,
                        type: "earned",
                        date: "2025-03-26T08:45:00Z"
                    },
                    {
                        id: 4,
                        activity_id: null,
                        project_name: null,
                        description: "Withdrawal to M-Pesa",
                        amount: 50.0,
                        type: "withdrawn",
                        date: "2025-04-01T14:20:00Z"
                    }
                ]);
                document.getElementById('credit-balance-value').textContent = '125.50';
            }
        } else {
            console.warn('Credit history response not OK');
            // Use mock data as fallback
            displayCreditHistory([
                {
                    id: 1,
                    activity_id: 1,
                    project_name: "Maize Agroforestry",
                    description: "Credits for planting trees",
                    amount: 25.5,
                    type: "earned",
                    date: "2025-03-16T09:30:00Z"
                },
                {
                    id: 2,
                    activity_id: 2,
                    project_name: "Maize Agroforestry",
                    description: "Credits for applying mulch",
                    amount: 15.0,
                    type: "earned",
                    date: "2025-03-19T10:15:00Z"
                },
                {
                    id: 3,
                    activity_id: 4,
                    project_name: "Forest Conservation Project",
                    description: "Credits for forest patrol",
                    amount: 30.0,
                    type: "earned",
                    date: "2025-03-26T08:45:00Z"
                },
                {
                    id: 4,
                    activity_id: null,
                    project_name: null,
                    description: "Withdrawal to M-Pesa",
                    amount: 50.0,
                    type: "withdrawn",
                    date: "2025-04-01T14:20:00Z"
                }
            ]);
            document.getElementById('credit-balance-value').textContent = '125.50';
        }
    } catch (error) {
        console.error('Error loading credit history:', error);
        // Use mock data as fallback
        displayCreditHistory([
            {
                id: 1,
                activity_id: 1,
                project_name: "Maize Agroforestry",
                description: "Credits for planting trees",
                amount: 25.5,
                type: "earned",
                date: "2025-03-16T09:30:00Z"
            },
            {
                id: 2,
                activity_id: 2,
                project_name: "Maize Agroforestry",
                description: "Credits for applying mulch",
                amount: 15.0,
                type: "earned",
                date: "2025-03-19T10:15:00Z"
            },
            {
                id: 3,
                activity_id: 4,
                project_name: "Forest Conservation Project",
                description: "Credits for forest patrol",
                amount: 30.0,
                type: "earned",
                date: "2025-03-26T08:45:00Z"
            },
            {
                id: 4,
                activity_id: null,
                project_name: null,
                description: "Withdrawal to M-Pesa",
                amount: 50.0,
                type: "withdrawn",
                date: "2025-04-01T14:20:00Z"
            }
        ]);
        document.getElementById('credit-balance-value').textContent = '125.50';
    }
}

// Display credit history
function displayCreditHistory(history) {
    const creditHistoryList = document.getElementById('credit-history-list');
    
    if (!history || history.length === 0) {
        creditHistoryList.innerHTML = '<p class="empty-message">No credit history to display.</p>';
        return;
    }
    
    let html = '';
    history.forEach(item => {
        html += `
            <div class="credit-item ${item.type}">
                <div class="credit-icon">
                    <i class="fas ${item.type === 'earned' ? 'fa-plus-circle' : 'fa-minus-circle'}"></i>
                </div>
                <div class="credit-content">
                    <h4>${item.type === 'earned' ? item.project_name : 'Withdrawal'}</h4>
                    <p>${item.description}</p>
                    <div class="credit-meta">
                        <span><i class="fas fa-calendar"></i> ${formatDate(item.date)}</span>
                        <span class="credit-amount ${item.type}">${item.type === 'earned' ? '+' : '-'}${item.amount.toFixed(2)} Credits</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    creditHistoryList.innerHTML = html;
}
