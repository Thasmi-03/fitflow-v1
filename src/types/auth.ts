// User roles in the system
export type Role = 'admin' | 'styler' | 'partner';

// User object structure
export interface User {
    id: string;
    email: string;
    role: Role;
    isApproved: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// Authentication response from login/register
export interface AuthResponse {
    message: string;
    token?: string;
    user: User;
}

// Registration request payload
export interface RegisterRequest {
    email: string;
    password: string;
    role: Role;
}

// Login request payload
export interface LoginRequest {
    email: string;
    password: string;
}

// Auth context type
export interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, role: Role) => Promise<AuthResponse>;
    logout: () => void;
    clearError: () => void;
}

// Pending user (for admin approval)
export interface PendingUser {
    id: string;
    email: string;
    role: Role;
    isApproved: boolean;
    createdAt: string;
}
