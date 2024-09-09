import { ICategory } from "./category-type";

export interface IProduct {
    id: number;
    categoryId: number;
    category: ICategory
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string
}
