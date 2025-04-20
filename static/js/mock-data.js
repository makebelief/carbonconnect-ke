// Mock data for CarbonConnect Kenya
const mockData = {
    // User profile data
    profile: {
        success: true,
        user: {
            id: 1,
            username: "John Farmer",
            email: "john@example.com",
            role: "farmer",
            created_at: "2025-01-15T08:30:00Z"
        },
        credit_balance: 125.50
    },
    
    // Dashboard statistics
    dashboard: {
        success: true,
        stats: {
            project_count: 3,
            activity_count: 12,
            approved_activities: 8,
            current_balance: 125.50
        }
    },
    
    // Projects data
    projects: {
        success: true,
        projects: [
            {
                id: 1,
                name: "Maize Agroforestry",
                type: "agroforestry",
                description: "Integrating trees with maize crops to enhance carbon sequestration",
                location: "Nakuru County",
                coordinates: [-0.303099, 36.080026],
                created_at: "2025-01-20T10:15:00Z",
                status: "active"
            },
            {
                id: 2,
                name: "Sustainable Rice Farming",
                type: "sustainable_agriculture",
                description: "Implementing water-saving techniques in rice cultivation",
                location: "Mwea, Kirinyaga",
                coordinates: [-0.636041, 37.353271],
                created_at: "2025-02-05T14:30:00Z",
                status: "active"
            },
            {
                id: 3,
                name: "Forest Conservation Project",
                type: "conservation",
                description: "Protecting existing forest land from deforestation",
                location: "Mt. Kenya Region",
                coordinates: [-0.152363, 37.316160],
                created_at: "2025-03-10T09:45:00Z",
                status: "active"
            }
        ]
    },
    
    // Activities data
    activities: {
        success: true,
        activities: [
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
            },
            {
                id: 4,
                project_id: 3,
                project_name: "Forest Conservation Project",
                description: "Conducted forest boundary patrol",
                evidence_url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600",
                coordinates: [-0.152363, 37.316160],
                created_at: "2025-03-25T10:45:00Z",
                status: "approved",
                credits_earned: 30.0
            },
            {
                id: 5,
                project_id: 3,
                project_name: "Forest Conservation Project",
                description: "Removed invasive species from 2 hectares",
                evidence_url: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600",
                coordinates: [-0.153363, 37.317160],
                created_at: "2025-03-28T13:20:00Z",
                status: "pending",
                credits_earned: 0
            }
        ]
    },
    
    // Credit history
    credits: {
        success: true,
        balance: 125.50,
        history: [
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
        ]
    },
    
    // Verification queue (for verifiers)
    verification: {
        success: true,
        queue: [
            {
                id: 3,
                project_id: 2,
                project_name: "Sustainable Rice Farming",
                farmer_name: "John Farmer",
                description: "Implemented alternate wetting and drying technique",
                evidence_url: "https://images.unsplash.com/photo-1536867520774-5b5f3f9c1eac?w=600",
                coordinates: [-0.636041, 37.353271],
                created_at: "2025-03-20T14:30:00Z",
                status: "pending"
            },
            {
                id: 5,
                project_id: 3,
                project_name: "Forest Conservation Project",
                farmer_name: "John Farmer",
                description: "Removed invasive species from 2 hectares",
                evidence_url: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600",
                coordinates: [-0.153363, 37.317160],
                created_at: "2025-03-28T13:20:00Z",
                status: "pending"
            }
        ]
    },
    
    // Users list (for admins)
    users: {
        success: true,
        users: [
            {
                id: 1,
                username: "John Farmer",
                email: "john@example.com",
                role: "farmer",
                created_at: "2025-01-15T08:30:00Z",
                status: "active"
            },
            {
                id: 2,
                username: "Mary Verifier",
                email: "mary@example.com",
                role: "verifier",
                created_at: "2025-01-10T11:45:00Z",
                status: "active"
            },
            {
                id: 3,
                username: "Admin User",
                email: "admin@carbonconnect.co.ke",
                role: "admin",
                created_at: "2025-01-01T00:00:00Z",
                status: "active"
            }
        ]
    }
};

// Mock API interceptor
function setupMockAPI() {
    // Store the original fetch function
    const originalFetch = window.fetch;
    
    // Override the fetch function
    window.fetch = function(url, options) {
        console.log(`Mock API: Intercepted request to ${url}`);
        
        // Return mock data based on the URL
        if (url === '/api/profile') {
            return mockResponse(mockData.profile);
        } else if (url === '/api/dashboard') {
            return mockResponse(mockData.dashboard);
        } else if (url === '/api/projects') {
            return mockResponse(mockData.projects);
        } else if (url === '/api/activities') {
            return mockResponse(mockData.activities);
        } else if (url === '/api/credits') {
            return mockResponse(mockData.credits);
        } else if (url === '/api/verification') {
            return mockResponse(mockData.verification);
        } else if (url === '/api/users') {
            return mockResponse(mockData.users);
        } else if (url.startsWith('/api/activities/create') && options && options.method === 'POST') {
            // Handle activity creation
            console.log('Mock API: Creating new activity');
            return mockResponse({ success: true, message: 'Activity created successfully' });
        } else if (url.startsWith('/api/projects') && options && options.method === 'POST') {
            // Handle project creation
            console.log('Mock API: Creating new project');
            return mockResponse({ success: true, message: 'Project created successfully' });
        } else if (url.startsWith('/api/withdraw') && options && options.method === 'POST') {
            // Handle withdraw
            console.log('Mock API: Processing withdrawal');
            return mockResponse({ success: true, message: 'Withdrawal processed successfully' });
        } else if (url.startsWith('/api/verify') && options && options.method === 'POST') {
            // Handle verification
            console.log('Mock API: Processing verification');
            return mockResponse({ success: true, message: 'Verification processed successfully' });
        }
        
        // If no mock data is available, use the original fetch
        console.log('Mock API: No mock data available, using original fetch');
        return originalFetch(url, options);
    };
    
    console.log('Mock API: Setup complete');
}

// Helper function to create a mock response
function mockResponse(data) {
    return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data)
    });
}

// Initialize mock API immediately
(function() {
    console.log('Setting up mock API immediately...');
    setupMockAPI();
    
    // Also set up when DOM is loaded (as a fallback)
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, ensuring mock API is set up...');
        // Force load dashboard data
        setTimeout(function() {
            console.log('Forcing data load...');
            if (typeof loadDashboardStats === 'function') {
                loadDashboardStats();
            }
            if (typeof loadRecentActivities === 'function') {
                loadRecentActivities();
            }
        }, 500);
    });
})();
