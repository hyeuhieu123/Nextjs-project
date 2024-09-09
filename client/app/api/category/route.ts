import { NextRequest, NextResponse } from 'next/server';
import { IBaseResponse } from '@/server/_types/base';
import fs from 'fs';
import path from 'path';

const categoryFilePath = path.resolve(process.cwd(), '../server/category.json');

export async function GET(req: NextRequest) {
    try {
        if (!fs.existsSync(categoryFilePath)) {
            const emptyResponse: IBaseResponse<[]> = {
                status_code: 200,
                data: [],
                message: 'No categories found'
            };
            return NextResponse.json(emptyResponse, { status: 200 });
        }

        const data = fs.readFileSync(categoryFilePath, 'utf8');
        const categories = JSON.parse(data);

        const successResponse: IBaseResponse<typeof categories> = {
            status_code: 200,
            data: categories,
            message: 'Categories retrieved successfully'
        };

        return NextResponse.json(successResponse, { status: 200 });
    } catch (error) {
        console.error('Error retrieving categories:', error);
        const errorResponse: IBaseResponse<null> = {
            status_code: 500,
            data: null,
            message: 'Failed to retrieve categories'
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, description } = body;

        if (!name || !description) {
            return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
        }

        let categories = [];
        if (fs.existsSync(categoryFilePath)) {
            const data = fs.readFileSync(categoryFilePath, 'utf8');
            categories = JSON.parse(data);
        }

        const newCategory = {
            id: categories.length + 1,
            name,
            description,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        categories.push(newCategory);

        fs.writeFileSync(categoryFilePath, JSON.stringify(categories, null, 2), 'utf8');

        const successResponse = {
            status_code: 201,
            data: newCategory,
            message: 'Category created successfully'
        };

        return NextResponse.json(successResponse, { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}
