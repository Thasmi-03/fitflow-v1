export type SkinTone = 'fair' | 'light' | 'medium' | 'tan' | 'deep' | 'dark';
export type Occasion = 'casual' | 'formal' | 'party' | 'wedding' | 'business' | 'sports' | 'beach';

export interface Clothes {
    id: string;
    name: string;
    category: string;
    size: string;
    color: string;
    price?: number; // Optional, mainly for partners
    description: string;
    imageUrl?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    // New fields for suggestions and matching
    skinTone?: SkinTone[];
    occasion?: Occasion[];
    // Partner-specific fields
    stock?: number;
    sales?: number;
}

export interface CreateClothesInput {
    name: string;
    category: string;
    size: string;
    color: string;
    price?: number;
    description: string;
    imageUrl?: string;
    skinTone?: SkinTone[];
    occasion?: Occasion[];
    stock?: number;
}

export interface UpdateClothesInput extends Partial<CreateClothesInput> {
    id: string;
}

export interface DressSuggestion {
    id: string;
    clothes: Clothes;
    matchScore: number;
    reason: string;
    analystNote?: string;
}

export interface OutfitMatch {
    id: string;
    name: string;
    items: Clothes[];
    occasion: Occasion;
    createdAt: string;
}
