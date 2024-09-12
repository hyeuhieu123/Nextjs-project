export interface IOrder {
    id: number;
    fullName: string;
    address: string;
    city: string;
    country: string;
    postCode: string;
    status: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
    products: Product[];
}

interface Product {
    id: number;
    productId: number;
    orderId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}
