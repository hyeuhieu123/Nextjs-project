'use client';

import { useUser } from "@clerk/nextjs";
import Image from 'next/image';

import { useGetOrder } from "@/server/_actions/order-action";
import { useGetProduct } from "@/server/_actions/product-action";
import { formatCurrencyVN } from "@/shared/utils/format-money";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";

const Page = () => {
    const { user } = useUser();

    const { data: products } = useGetProduct();
    const { data: orders } = useGetOrder();

    if (!orders || !products) return <></>

    const subtotal = orders
        .filter(order => order.fullName === user?.fullName)
        .flatMap(order =>
            order.products.map(product => {
                const productDetail = products.find(p => p.id === product.productId);
                return productDetail ? Number(productDetail.price) * product.quantity : 0;
            })
        )
        .reduce((total, price) => total + price, 0);

    return (
        <div className="container flex flex-col items-start justify-start w-full h-screen gap-2 mt-20">
            <table className="w-full table-auto">
                <thead className="border-b border-b-neutral-300">
                    <tr>
                        <th className="text-left">Product Name</th>
                        <th className="text-left">Price</th>
                        <th className="text-left">Quantity</th>
                        <th className="text-left">CreatedAt</th>
                        <th className="text-left">Image</th>
                        <th className="text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders
                        .filter(order => order.fullName === user?.fullName)
                        .flatMap(order =>
                            order.products.map((product, index) => {
                                const productDetail = products.find(p => p.id === product.productId);
                                if (!productDetail) return null;

                                return (
                                    <tr key={`${order.id}-${product.productId}`} className="border-b border-b-neutral-200">
                                        <td>{productDetail.name}</td>
                                        <td>{formatCurrencyVN(+productDetail.price)}</td>
                                        <td>{product.quantity}</td>
                                        <td>{(new Date(product.createdAt)).toLocaleDateString()}</td>
                                        <td>
                                            <Image
                                                width={50}
                                                height={50}
                                                alt={productDetail.name}
                                                src={productDetail.imageUrl}
                                                className="w-[50px] h-[50px] object-cover"
                                            />
                                        </td>
                                        <td>
                                            <Badge className={cn("uppercase", order.status === "success" ? "bg-green-400" : "bg-yellow-400")}>{order.status}</Badge>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                </tbody>
            </table>
            <div className="flex justify-end items-end self-end justify-items-end">Subtotal: {formatCurrencyVN(subtotal)}</div>
        </div>
    );
}

export default Page;
