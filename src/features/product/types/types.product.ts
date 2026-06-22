export interface Category {
    id: number;
    name: string;
}

export interface ProductType {
    id: number;
    name: string;
}

export interface Size {
    id: number;
    name: string;
}

export interface ProductImage {
    id: number;
    image: string;
    alt_text: string | null;
}

export interface ProductColor {
    id: number;
    name: string;
    color_code: string;
    sizes: Size[];
    images: ProductImage[];
}

export interface Product {
    id: number;
    name: string;
    category: Category;
    product_type: ProductType;
    price: string;
    description: string;
    is_featured: boolean;
    material: string;
    colors: ProductColor[];
    created_at: string;
    updated_at: string;
}