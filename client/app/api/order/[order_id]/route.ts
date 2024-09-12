import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const orderFilePath = path.resolve(process.cwd(), '../server/order.json');
const orderProductFilePath = path.resolve(process.cwd(), '../server/order_product.json');

export async function PATCH(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();

        const body = await req.json();
        const { fullName, address, city, country, postCode, paymentMethod, status, products } = body;

        if (!fullName || !address || !city || !country || !postCode || !paymentMethod || !status || !Array.isArray(products)) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        if (!fs.existsSync(orderFilePath)) {
            return NextResponse.json({ error: 'Orders file not found' }, { status: 404 });
        }

        const data = fs.readFileSync(orderFilePath, 'utf8');
        const orders = JSON.parse(data);
        const orderIndex = orders.findIndex((o: any) => o.id === Number(id));

        if (orderIndex === -1) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        orders[orderIndex] = {
            ...orders[orderIndex],
            fullName,
            address,
            city,
            country,
            postCode,
            paymentMethod,
            status,
            updatedAt: new Date().toISOString()
        };

        fs.writeFileSync(orderFilePath, JSON.stringify(orders, null, 2), 'utf8');

        let orderProductData = [];
        if (fs.existsSync(orderProductFilePath)) {
            const data = fs.readFileSync(orderProductFilePath, 'utf8');
            orderProductData = JSON.parse(data);
        }

        orderProductData = orderProductData.filter((op: any) => op.orderId !== Number(id));

        const newOrderProducts = products.map(p => ({
            id: Date.now() + p.productId,
            productId: p.productId,
            orderId: Number(id),
            quantity: p.quantity,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }));

        orderProductData.push(...newOrderProducts);

        fs.writeFileSync(orderProductFilePath, JSON.stringify(orderProductData, null, 2), 'utf8');

        const successResponse = {
            status_code: 200,
            data: orders[orderIndex],
            message: 'Order updated successfully'
        };

        return NextResponse.json(successResponse, { status: 200 });
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
