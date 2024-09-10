import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const productFilePath = path.resolve(process.cwd(), '../server/product.json');

const searchProducts = (query: string) => {
    if (!fs.existsSync(productFilePath)) {
        return [];
    }

    const data = fs.readFileSync(productFilePath, 'utf8');
    const products = JSON.parse(data);

    return products.filter((product: any) =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
};

export async function GET(req: NextRequest) {
    try {
        const query = req.nextUrl.searchParams.get('query') || '';
        const products = searchProducts(query);

        const successResponse = {
            status_code: 200,
            data: products,
            message: 'Products retrieved successfully'
        };

        return NextResponse.json(successResponse, { status: 200 });
    } catch (error) {
        console.error('Error retrieving products:', error);
        const errorResponse = {
            status_code: 500,
            data: null,
            message: 'Failed to retrieve products'
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}
