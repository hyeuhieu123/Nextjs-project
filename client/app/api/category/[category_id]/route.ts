import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const categoryFilePath = path.resolve(process.cwd(), '../server/category.json');

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        let categories = [];
        if (fs.existsSync(categoryFilePath)) {
            const data = fs.readFileSync(categoryFilePath, 'utf8');
            categories = JSON.parse(data);
        }

        const category = categories.find((category: any) => category.id === parseInt(id));

        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        const successResponse = {
            status_code: 200,
            data: category,
            message: 'Category fetched successfully'
        };

        return NextResponse.json(successResponse, { status: 200 });
    } catch (error) {
        console.error('Error fetching category:', error);
        return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, name, description } = body;

        if (!id || (!name && !description)) {
            return NextResponse.json({ error: 'ID, and either name or description are required' }, { status: 400 });
        }

        let categories = [];
        if (fs.existsSync(categoryFilePath)) {
            const data = fs.readFileSync(categoryFilePath, 'utf8');
            categories = JSON.parse(data);
        }

        const categoryIndex = categories.findIndex((category: any) => category.id === id);
        if (categoryIndex === -1) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        const updatedCategory = {
            ...categories[categoryIndex],
            name: name || categories[categoryIndex].name,
            description: description || categories[categoryIndex].description,
            updatedAt: new Date().toISOString()
        };

        categories[categoryIndex] = updatedCategory;

        fs.writeFileSync(categoryFilePath, JSON.stringify(categories, null, 2), 'utf8');

        const successResponse = {
            status_code: 200,
            data: updatedCategory,
            message: 'Category updated successfully'
        };

        return NextResponse.json(successResponse, { status: 200 });
    } catch (error) {
        console.error('Error updating category:', error);
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        let categories = [];
        if (fs.existsSync(categoryFilePath)) {
            const data = fs.readFileSync(categoryFilePath, 'utf8');
            categories = JSON.parse(data);
        }

        const categoryIndex = categories.findIndex((category: any) => category.id === parseInt(id));
        if (categoryIndex === -1) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        const deletedCategory = categories.splice(categoryIndex, 1);

        fs.writeFileSync(categoryFilePath, JSON.stringify(categories, null, 2), 'utf8');

        const successResponse = {
            status_code: 200,
            data: deletedCategory[0],
            message: 'Category deleted successfully'
        };

        return NextResponse.json(successResponse, { status: 200 });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
