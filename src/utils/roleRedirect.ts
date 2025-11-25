import { Role } from '@/types/auth';

/**
 * Get the dashboard URL based on user role
 */
export const getRoleDashboardUrl = (role: Role): string => {
    switch (role) {
        case 'admin':
            return '/admin/dashboard';
        case 'styler':
            return '/styler/dashboard';
        case 'partner':
            return '/partner/dashboard';
        default:
            return '/';
    }
};
