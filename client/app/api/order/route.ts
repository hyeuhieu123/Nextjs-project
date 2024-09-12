import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const orderFilePath = path.resolve(process.cwd(), '../server/order.json');
const orderProductFilePath = path.resolve(process.cwd(), '../server/order_product.json');

export async function GET(req: NextRequest) {
    try {
        if (!fs.existsSync(orderFilePath)) {
            const emptyResponse = {
                status_code: 200,
                data: [],
                message: 'No orders found'
            };
            return NextResponse.json(emptyResponse, { status: 200 });
        }

        const orderData = fs.readFileSync(orderFilePath, 'utf8');
        const orders = JSON.parse(orderData);

        if (!fs.existsSync(orderProductFilePath)) {
            const successResponse = {
                status_code: 200,
                data: orders,
                message: 'Orders retrieved successfully'
            };
            return NextResponse.json(successResponse, { status: 200 });
        }

        const orderProductData = fs.readFileSync(orderProductFilePath, 'utf8');
        const orderProducts = JSON.parse(orderProductData);

        const ordersWithProducts = orders.map((order: any) => {
            const products = orderProducts.filter((op: any) => op.orderId === order.id);
            return {
                ...order,
                products
            };
        });

        const successResponse = {
            status_code: 200,
            data: ordersWithProducts,
            message: 'Orders retrieved successfully'
        };

        return NextResponse.json(successResponse, { status: 200 });
    } catch (error) {
        console.error('Error retrieving orders:', error);
        const errorResponse = {
            status_code: 500,
            data: null,
            message: 'Failed to retrieve orders'
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { fullName, address, city, country, postCode, paymentMethod, status, products } = body;

        if (!fullName || !address || !city || !country || !postCode || !paymentMethod || !status || !Array.isArray(products)) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        let orders = [];
        if (fs.existsSync(orderFilePath)) {
            const data = fs.readFileSync(orderFilePath, 'utf8');
            orders = JSON.parse(data);
        }

        const newOrder = {
            id: orders.length + 1,
            fullName,
            address,
            city,
            country,
            postCode,
            paymentMethod,
            status,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        orders.push(newOrder);

        fs.writeFileSync(orderFilePath, JSON.stringify(orders, null, 2), 'utf8');

        const orderProducts = products.map(p => ({
            id: Date.now() + p.productId,
            productId: p.productId,
            orderId: newOrder.id,
            quantity: p.quantity,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }));

        let orderProductData = [];
        if (fs.existsSync(orderProductFilePath)) {
            const data = fs.readFileSync(orderProductFilePath, 'utf8');
            orderProductData = JSON.parse(data);
        }

        orderProductData.push(...orderProducts);

        fs.writeFileSync(orderProductFilePath, JSON.stringify(orderProductData, null, 2), 'utf8');

        const successResponse = {
            status_code: 201,
            data: newOrder,
            message: 'Order created successfully'
        };

        return NextResponse.json(successResponse, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
