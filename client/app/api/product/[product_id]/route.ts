import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const productFilePath = path.resolve(process.cwd(), '../server/product.json');

const getProductById = (productId: number) => {
    if (!fs.existsSync(productFilePath)) {
        return null;
    }

    const data = fs.readFileSync(productFilePath, 'utf8');
    const products = JSON.parse(data);
    return products.find((product: any) => product.id === productId);
};

export async function GET(req: NextRequest) {
    try {
        const id = parseInt(req.nextUrl.pathname.split('/').pop() as string, 10);
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
        }

        const product = getProductById(id);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const successResponse = {
            status_code: 200,
            data: product,
            message: 'Product retrieved successfully'
        };

        return NextResponse.json(successResponse, { status: 200 });
    } catch (error) {
        console.error('Error retrieving product:', error);
        const errorResponse = {
            status_code: 500,
            data: null,
            message: 'Failed to retrieve product'
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}

const updateProductById = (productId: number, updateData: any) => {
    if (!fs.existsSync(productFilePath)) {
        return null;
    }

    const data = fs.readFileSync(productFilePath, 'utf8');
    let products = JSON.parse(data);

    const index = products.findIndex((product: any) => product.id === productId);
    if (index === -1) {
        return null;
    }

    products[index] = { ...products[index], ...updateData, updatedAt: new Date().toISOString() };
    fs.writeFileSync(productFilePath, JSON.stringify(products, null, 2), 'utf8');

    return products[index];
};

export async function PATCH(req: NextRequest) {
    try {
        const id = parseInt(req.nextUrl.pathname.split('/').pop() as string, 10);
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
        }

        const body = await req.json();
        const updatedProduct = updateProductById(id, body);

        if (!updatedProduct) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const successResponse = {
            status_code: 200,
            data: updatedProduct,
            message: 'Product updated successfully'
        };

        return NextResponse.json(successResponse, { status: 200 });
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}


const deleteProductById = (productId: number) => {
    if (!fs.existsSync(productFilePath)) {
        return null;
    }

    const data = fs.readFileSync(productFilePath, 'utf8');
    let products = JSON.parse(data);

    const index = products.findIndex((product: any) => product.id === productId);
    if (index === -1) {
        return null;
    }

    const [deletedProduct] = products.splice(index, 1);
    fs.writeFileSync(productFilePath, JSON.stringify(products, null, 2), 'utf8');

    return deletedProduct;
};

export async function DELETE(req: NextRequest) {
    try {
        const id = parseInt(req.nextUrl.pathname.split('/').pop() as string, 10);
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
        }

        const deletedProduct = deleteProductById(id);

        if (!deletedProduct) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const successResponse = {
            status_code: 200,
            data: deletedProduct,
            message: 'Product deleted successfully'
        };

        return NextResponse.json(successResponse, { status: 200 });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
