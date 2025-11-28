import apiClient from './client';
import { User, PendingUser } from '@/types/auth';

export const getPendingUsers = async (): Promise<{ count: number; users: PendingUser[] }> => {
    const response = await apiClient.get<{ count: number; users: PendingUser[] }>('/api/admin/pending');
    return response.data;
};

export const approveUser = async (userId: string): Promise<{ message: string; user: User }> => {
    const response = await apiClient.put<{ message: string; user: User }>(`/api/admin/approve/${userId}`);
    return response.data;
};