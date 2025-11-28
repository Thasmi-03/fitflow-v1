import apiClient from './client';
import { Clothes, CreateClothesInput, UpdateClothesInput } from '@/types/clothes';

export const getClothes = async (): Promise<{ clothes: Clothes[] }> => {
    const response = await apiClient.get('/clothes');
    return response.data;
};

export const getClothesById = async (id: string): Promise<{ clothes: Clothes }> => {
    const response = await apiClient.get(`/clothes/${id}`);
    return response.data;
};

export const addClothes = async (data: CreateClothesInput): Promise<{ clothes: Clothes }> => {
    const response = await apiClient.post('/clothes', data);
    return response.data;
};

export const updateClothes = async (id: string, data: Partial<CreateClothesInput>): Promise<{ clothes: Clothes }> => {
    const response = await apiClient.put(`/clothes/${id}`, data);
    return response.data;
};

export const deleteClothes = async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/clothes/${id}`);
    return response.data;
};
