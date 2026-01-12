// Product related types
export interface Rating {
    id: string;
    rating: number;
    review: string;
    user: {
        name: string;
        image: any;
    };
    productId: string;
    createdAt: string;
    updatedAt: string;
    product: {
        name: string;
        category: string;
        id: string;
    };
}

export interface Store {
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
    user: {
        id: string;
        name: string;
        email: string;
        image: any;
    };
}

export interface Product {
    id: string;
    name: string;
    description: string;
    mrp: number;
    price: number;
    images: any[];
    category: string;
    storeId: string;
    inStock: boolean;
    store: Store;
    rating: Rating[];
    createdAt: string;
    updatedAt: string;
}

// Filter related types
export interface FilterState {
    categories: string[];
    locations: string[];
    minRating: number;
    priceRange: {
        min: number;
        max: number;
    };
}

export type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface SortOptionItem {
    label: string;
    value: SortOption;
}

// Redux state types
export interface ProductState {
    list: Product[];
}
