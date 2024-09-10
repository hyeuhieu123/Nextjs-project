'use client'

import Image from "next/image";

import { useGetProductyId } from "@/server/_actions/product-action";
import { formatCurrencyVN } from "@/shared/utils/format-money";

import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

export default function Page({ params }: { params: { productId: string } }) {
    const { data: product, isLoading, error } = useGetProductyId(Number(params.productId));

    if (!product) return <></>
    return (
        <div className="container grid items-start justify-start w-full h-screen grid-cols-1 gap-2 mt-20 md:grid-cols-5">
            <div className="grid items-start justify-start w-full h-full col-span-1 gap-5 border-r md:grid-cols-2 border-neutral-300 md:col-span-4">
                <div className="w-full h-[500px] col-span-2 md:col-span-1 overflow-hidden">
                    <Image
                        width={800}
                        height={800}
                        alt={product.name}
                        src={product.imageUrl}
                        priority={true}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="flex flex-col items-start justify-start w-full h-full col-span-2 md:col-span-1 gap-3">
                    <h3 className="text-lg">{product.category.name}</h3>
                    <h2 className="text-xl font-bold md:text-3xl">{product.name}</h2>
                    <Badge className="px-4">{formatCurrencyVN(+product.price)}</Badge>
                    <p className="text-xs md:text-base">{product.description}</p>
                </div>
                <div className="w-full col-span-2">
                    <h3 className="text-xl font-bold md:text-3xl">Customer Reviewers</h3>
                </div>
            </div>
            <div className="w-full h-full col-span-1">
                <Card>
                    <CardContent className="flex flex-col items-center justify-start w-full gap-3 py-6">
                        <div className="flex items-center justify-between w-full">
                            <p>Price</p>
                            <p>{formatCurrencyVN(+product.price)}</p>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <p>Status</p>
                            <p>Active</p>
                        </div>
                        <Button>+Add to cart</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
