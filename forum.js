// Sample forum data
const sampleTopics = [
    {
        id: 1,
        title: "Welcome to Zen OS Zebu! Share your first impressions",
        author: "zendev",
        category: "general",
        replies: 23,
        views: 156,
        lastActivity: "2 hours ago",
        lastAuthor: "newuser"
    },
    {
        id: 2,
        title: "Installation fails on UEFI systems - need help",
        author: "techhelp",
        category: "support",
        replies: 8,
        views: 45,
        lastActivity: "4 hours ago",
        lastAuthor: "zendev"
    },
    {
        id: 3,
        title: "Custom i3 configuration for better productivity",
        author: "poweruser",
        category: "customization",
        replies: 15,
        views: 89,
        lastActivity: "6 hours ago",
        lastAuthor: "devguru"
    },
    {
        id: 4,
        title: "Contributing to Zen OS development - getting started",
        author: "contributor",
        category: "development",
        replies: 12,
        views: 67,
        lastActivity: "1 day ago",
        lastAuthor: "zendev"
    },
    {
        id: 5,
        title: "Zen OS Zebu Release Candidate 2 is now available!",
        author: "zenteam",
        category: "announcements",
        replies: 34,
        views: 245,
        lastActivity: "1 day ago",
        lastAuthor: "betauser"
    },
    {
        id: 6,
        title: "Best development tools and setup for Zen OS",
        author: "developer",
        category: "development",
        replies: 19,
        views: 102,
        lastActivity: "2 days ago",
        lastAuthor: "coder123"
    },
    {
        id: 7,
        title: "WiFi adapter not working after installation",
        author: "newbie",
        category: "support",
        replies: 6,
        views: 38,
        lastActivity: "2 days ago",
        lastAuthor: "techsupport"
    },
    {
        id: 8,
        title: "Sharing my custom Zen OS theme collection",
        author: "designer",
        category: "customization",
        replies: 28,
        views: 134,
        lastActivity: "3 days ago",
        lastAuthor: "stylemaster"
    }
];

// Initialize forum
document.addEventListener('DOMContentLoaded', function() {
    renderTopics(sampleTopics);
    initializeEventListeners();
});

// Render topics list
function renderTopics(topics) {
    const topicsList = document.getElementById('topicsList');
    topicsList.innerHTML = '';

    if (topics.length === 0) {
        topicsList.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                <h3>No topics found</h3>
                <p>Be the first to start a discussion!</p>
            </div>
        `;
        return;
    }

    topics.forEach(topic => {
        const topicElement = createTopicElement(topic);
        topicsList.appendChild(topicElement);
    });
}

// Create topic element
function createTopicElement(topic) {
    const topicDiv = document.createElement('div');
    topicDiv.className = 'topic-item';
    topicDiv.innerHTML = `
        <div class="topic-avatar">${topic.author.charAt(0).toUpperCase()}</div>
        <div class="topic-content">
            <div class="topic-title">
                <a href="#" onclick="viewTopic(${topic.id})">${topic.title}</a>
            </div>
            <div class="topic-meta">
                Started by <strong>${topic.author}</strong> in 
                <span class="topic-category">${getCategoryName(topic.category)}</span>
            </div>
        </div>
        <div class="topic-stats">
            <div class="topic-replies">${topic.replies}</div>
            <div>replies</div>
            <div class="topic-views">${topic.views}</div>
            <div>views</div>
        </div>
        <div class="topic-activity">
            <div>${topic.lastActivity}</div>
            <div>by <strong>${topic.lastAuthor}</strong></div>
        </div>
    `;
    return topicDiv;
}

// Get category display name
function getCategoryName(category) {
    const categoryNames = {
        'general': 'General Discussion',
        'support': 'Help & Support',
        'development': 'Development',
        'customization': 'Customization',
        'announcements': 'Announcements'
    };
    return categoryNames[category] || category;
}

// Initialize event listeners
function initializeEventListeners() {
    // Category filtering
    const categoryLinks = document.querySelectorAll('[data-category]');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            
            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            
            // Filter topics
            filterTopics(category);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.getElementById('searchBtn');
    
    searchBtn.addEventListener('click', () => {
        searchTopics(searchInput.value);
    });
    
    searchInput.addEventListener('input', () => {
        searchTopics(searchInput.value);
    });

    // Sort functionality
    const sortSelect = document.querySelector('.sort-select');
    sortSelect.addEventListener('change', (e) => {
        sortTopics(e.target.value);
    });

    // Modal functionality
    initializeModals();
}

// Filter topics by category
function filterTopics(category) {
    let filteredTopics = sampleTopics;
    
    if (category !== 'all') {
        filteredTopics = sampleTopics.filter(topic => topic.category === category);
    }
    
    renderTopics(filteredTopics);
}

// Search topics
function searchTopics(query) {
    if (!query.trim()) {
        renderTopics(sampleTopics);
        return;
    }
    
    const filteredTopics = sampleTopics.filter(topic =>
        topic.title.toLowerCase().includes(query.toLowerCase()) ||
        topic.author.toLowerCase().includes(query.toLowerCase())
    );
    
    renderTopics(filteredTopics);
}

// Sort topics
function sortTopics(sortBy) {
    let sortedTopics = [...sampleTopics];
    
    switch (sortBy) {
        case 'Most Popular':
            sortedTopics.sort((a, b) => b.replies - a.replies);
            break;
        case 'Newest First':
            sortedTopics.sort((a, b) => b.id - a.id);
            break;
        case 'Most Replies':
            sortedTopics.sort((a, b) => b.replies - a.replies);
            break;
        default: // Latest Activity
            // Already in latest activity order
            break;
    }
    
    renderTopics(sortedTopics);
}

// Initialize modals
function initializeModals() {
    const loginBtn = document.getElementById('loginBtn');
    const newTopicBtn = document.getElementById('newTopicBtn');
    const loginModal = document.getElementById('loginModal');
    const newTopicModal = document.getElementById('newTopicModal');
    
    // Login modal
    loginBtn.addEventListener('click', () => {
        showModal(loginModal);
    });
    
    // New topic modal
    newTopicBtn.addEventListener('click', () => {
        showModal(newTopicModal);
    });
    
    // Close modals
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            hideModal(e.target.closest('.modal'));
        });
    });
    
    // Cancel buttons
    document.getElementById('cancelLoginBtn').addEventListener('click', () => {
        hideModal(loginModal);
    });
    
    document.getElementById('cancelTopicBtn').addEventListener('click', () => {
        hideModal(newTopicModal);
    });
    
    // Close on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
    });
    
    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('newTopicForm').addEventListener('submit', handleNewTopic);
}

// Show modal
function showModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Hide modal
function hideModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    // Simulate login
    setTimeout(() => {
        // Update UI to show logged in state
        const userPanel = document.querySelector('.user-panel');
        userPanel.innerHTML = `
            <div class="user-avatar">JD</div>
            <div class="user-info">
                <div class="username">John Doe</div>
                <div class="user-status">Active member</div>
            </div>
            <button class="btn btn-secondary btn-small" onclick="logout()">Logout</button>
        `;
        
        hideModal(document.getElementById('loginModal'));
        
        // Show success message
        showNotification('Successfully logged in!', 'success');
    }, 1000);
}

// Handle new topic
function handleNewTopic(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const title = e.target.querySelector('input[type="text"]').value;
    const category = e.target.querySelector('select').value;
    const content = e.target.querySelector('textarea').value;
    
    if (!title || !category || !content) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate creating new topic
    setTimeout(() => {
        const newTopic = {
            id: sampleTopics.length + 1,
            title: title,
            author: 'John Doe',
            category: category,
            replies: 0,
            views: 1,
            lastActivity: 'just now',
            lastAuthor: 'John Doe'
        };
        
        sampleTopics.unshift(newTopic);
        renderTopics(sampleTopics);
        
        hideModal(document.getElementById('newTopicModal'));
        e.target.reset();
        
        showNotification('Topic created successfully!', 'success');
    }, 1000);
}

// Logout function
function logout() {
    const userPanel = document.querySelector('.user-panel');
    userPanel.innerHTML = `
        <div class="user-avatar">ZU</div>
        <div class="user-info">
            <div class="username">Guest User</div>
            <div class="user-status">Not logged in</div>
        </div>
        <button class="btn btn-primary btn-small" id="loginBtn">Login</button>
    `;
    
    // Re-initialize login button
    document.getElementById('loginBtn').addEventListener('click', () => {
        showModal(document.getElementById('loginModal'));
    });
    
    showNotification('Logged out successfully', 'info');
}

// View topic (placeholder)
function viewTopic(topicId) {
    showNotification('Topic view feature coming soon!', 'info');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        z-index: 10001;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);