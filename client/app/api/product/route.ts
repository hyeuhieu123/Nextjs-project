import { NextRequest, NextResponse } from 'next/server';
import { IBaseResponse } from '@/server/_types/base';
import fs from 'fs';
import path from 'path';

const categoryFilePath = path.resolve(process.cwd(), '../server/category.json');
const productFilePath = path.resolve(process.cwd(), '../server/product.json');

const getAllCategories = () => {
    if (!fs.existsSync(categoryFilePath)) {
        return [];
    }

    const data = fs.readFileSync(categoryFilePath, 'utf8');
    return JSON.parse(data);
};

const getAllProducts = () => {
    if (!fs.existsSync(productFilePath)) {
        return [];
    }

    const data = fs.readFileSync(productFilePath, 'utf8');
    return JSON.parse(data);
};

const getCategoryById = (categoryId: number, categories: any[]) => {
    return categories.find((category: any) => category.id === categoryId);
};

export async function GET(req: NextRequest) {
    try {
        const categories = getAllCategories();
        const products = getAllProducts();

        const productsWithCategories = products.map((product: any) => {
            const category = getCategoryById(product.categoryId, categories);
            return {
                ...product,
                category: category || null
            };
        });

        const successResponse: IBaseResponse<typeof productsWithCategories> = {
            status_code: 200,
            data: productsWithCategories,
            message: 'Products with category information retrieved successfully'
        };

        return NextResponse.json(successResponse, { status: 200 });
    } catch (error) {
        console.error('Error retrieving products and categories:', error);
        const errorResponse: IBaseResponse<null> = {
            status_code: 500,
            data: null,
            message: 'Failed to retrieve products and categories'
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { categoryId, name, description, price, imageUrl } = body;

        if (!categoryId || !name || !description || !price || !imageUrl) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        let products = [];
        if (fs.existsSync(productFilePath)) {
            const data = fs.readFileSync(productFilePath, 'utf8');
            products = JSON.parse(data);
        }

        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1, // Generate new ID
            categoryId: Number(categoryId),
            name,
            description,
            price,
            imageUrl,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        products.push(newProduct);

        fs.writeFileSync(productFilePath, JSON.stringify(products, null, 2), 'utf8');

        const successResponse = {
            status_code: 201,
            data: newProduct,
            message: 'Product created successfully'
        };

        return NextResponse.json(successResponse, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
