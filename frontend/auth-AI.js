const Auth = {
    init() {
        this.checkAuthGuard();
    },

    setSession(authData) {
        localStorage.setItem('ps_token', authData.token);
        localStorage.setItem('ps_user', JSON.stringify({
            id: authData.id,
            username: authData.username,
            email: authData.email,
            role: authData.role
        }));
    },

    getUser() {
        const user = localStorage.getItem('ps_user');
        return user ? JSON.parse(user) : null;
    },

    getToken() {
        return localStorage.getItem('ps_token');
    },

    logout() {
        localStorage.removeItem('ps_token');
        localStorage.removeItem('ps_user');
        window.location.href = '/login-AI.html';
    },

    redirectByRole(role) {
        switch (role) {
            case 'ROLE_ADMIN':
                window.location.href = '/admin/dashboard-AI.html';
                break;
            case 'ROLE_TEACHER':
                window.location.href = '/teacher/dashboard-AI.html';
                break;
            case 'ROLE_STUDENT':
                window.location.href = '/student/dashboard-AI.html';
                break;
            default:
                this.logout();
        }
    },

    checkAuthGuard() {
        const currentPath = window.location.pathname;
        const user = this.getUser();
        const token = this.getToken();

        if (currentPath.includes('login-AI.html') || currentPath === '/') {
            if (token && user) {
                this.redirectByRole(user.role);
            }
            return;
        }

        if (!token || !user) {
            window.location.href = '/login-AI.html';
            return;
        }

        // Role-based directory guard
        if (currentPath.includes('/admin/') && user.role !== 'ROLE_ADMIN') {
            alert('Access Denied: Admin privileges required.');
            this.redirectByRole(user.role);
        } else if (currentPath.includes('/teacher/') && user.role !== 'ROLE_TEACHER' && user.role !== 'ROLE_ADMIN') {
            alert('Access Denied: Teacher privileges required.');
            this.redirectByRole(user.role);
        } else if (currentPath.includes('/student/') && user.role !== 'ROLE_STUDENT' && user.role !== 'ROLE_ADMIN') {
            alert('Access Denied: Student privileges required.');
            this.redirectByRole(user.role);
        }
    }
};