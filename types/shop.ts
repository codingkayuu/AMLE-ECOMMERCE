// Shop related types
export interface Shop {
    id: string;
    userId: string;
    name: string;
    description: string;
    username: string;
    address: string;
    status: string;
    isActive: boolean;
    logo: any;
    email: string;
    contact: string;
    createdAt: string;
    updatedAt: string;
    category?: string;
    location?: string;
    rating?: number;
    isFeatured?: boolean;
    user: {
        id: string;
        name: string;
        email: string;
        image: any;
    };
}

export interface ShopFilterState {
    categories: string[];
    locations: string[];
    minRating: number;
}
