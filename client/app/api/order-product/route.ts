import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const orderProductFilePath = path.resolve(process.cwd(), '../server/order_product.json');

export async function GET(req: NextRequest) {
    try {
        if (!fs.existsSync(orderProductFilePath)) {
            const emptyResponse = {
                status_code: 200,
                data: [],
                message: 'No order products found'
            };
            return NextResponse.json(emptyResponse, { status: 200 });
        }

        const data = fs.readFileSync(orderProductFilePath, 'utf8');
        const orderProducts = JSON.parse(data);

        const successResponse = {
            status_code: 200,
            data: orderProducts,
            message: 'Order products retrieved successfully'
        };

        return NextResponse.json(successResponse, { status: 200 });
    } catch (error) {
        console.error('Error retrieving order products:', error);
        const errorResponse = {
            status_code: 500,
            data: null,
            message: 'Failed to retrieve order products'
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { productId, orderId, quantity } = body;

        if (!productId || !orderId || quantity == null) {
            return NextResponse.json({ error: 'Product ID, Order ID, and quantity are required' }, { status: 400 });
        }

        let orderProducts = [];
        if (fs.existsSync(orderProductFilePath)) {
            const data = fs.readFileSync(orderProductFilePath, 'utf8');
            orderProducts = JSON.parse(data);
        }

        const newOrderProduct = {
            id: orderProducts.length + 1,
            productId,
            orderId,
            quantity,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        orderProducts.push(newOrderProduct);

        fs.writeFileSync(orderProductFilePath, JSON.stringify(orderProducts, null, 2), 'utf8');

        const successResponse = {
            status_code: 201,
            data: newOrderProduct,
            message: 'Order product created successfully'
        };

        return NextResponse.json(successResponse, { status: 201 });
    } catch (error) {
        console.error('Error creating order product:', error);
        return NextResponse.json({ error: 'Failed to create order product' }, { status: 500 });
    }
}
