'use client'

import Image from "next/image";
import { useRouter } from "@/shared/hooks/use-nextIntl";

import { useGetProduct, useGetProductyId } from "@/server/_actions/product-action";
import { formatCurrencyVN } from "@/shared/utils/format-money";
import { IProduct } from "@/server/_types/product-type";
import { useAppDispatch, useAppSelector } from "@/store";

import useLocalStorage from "@/shared/hooks/use-localStorage";

import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { setCartLocalStorage } from "@/store/app-slice";
import { Separator } from "@/shared/components/ui/separator";


export default function Page({ params }: { params: { productId: string } }) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [cart, setCart] = useLocalStorage<any>("carts", null);

    const { cartLocalStorage } = useAppSelector((state) => state.app)

    const { data: products } = useGetProduct()
    const { data: product, isLoading, error } = useGetProductyId(Number(params.productId));

    function handleAddCart(cart: IProduct) {
        const existingProductIndex = cartLocalStorage.findIndex(item => item.product.id === cart.id);

        if (existingProductIndex !== -1) {
            const updatedCart = cartLocalStorage.map((item, index) =>
                index === existingProductIndex
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            dispatch(setCartLocalStorage(updatedCart));
            setCart(updatedCart);
        } else {
            const newCart = [...cartLocalStorage, { product: cart, quantity: 1 }];
            dispatch(setCartLocalStorage(newCart));
            setCart(newCart);
        }
    }

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
                <Separator className="w-full" />
                <div className="w-full col-span-2">
                    <h3 className="text-xl font-bold md:text-3xl">Related Products</h3>
                    <div className="w-full flex flex-wrap justify-start items-start gap-3">
                        {products?.filter((item) => +item.category.id === +product.category.id)?.map((item, i) => {
                            return (
                                <Card
                                    key={i}
                                    onClick={() => router.push(`/product/${item.id}`)}
                                    className="flex flex-col flex-grow-0 flex-shrink-0 p-0 m-0 w-[150px] h-[150px] md:w-[250px] md:h-[250px] lg:w-[250px] lg:h-[300px] hover:border-1 hover:shadow-2xl hover:border-bg-black cursor-pointer transition-all duration-300 ease-in-out"
                                >
                                    <CardHeader className="relative w-full h-full p-0 m-0 overflow-hidden rounded-none">
                                        <Image
                                            width={500}
                                            height={500}
                                            alt={item.name}
                                            src={item.imageUrl}
                                            priority={true}
                                            className="object-cover w-full h-full"
                                        />
                                        <div className="absolute bottom-0 max-w-lg px-2 py-1 text-xs bg-white left-2">
                                            {formatCurrencyVN(+item.price)}
                                        </div>
                                    </CardHeader>
                                    <CardDescription className="flex flex-col items-start justify-start w-full gap-2 px-3 py-2">
                                        <h2 className="text-base text-black dark:text-white md:text-xl">{item.name}</h2>
                                        <p className="text-xs text-neutral-400 md:text-sm text-wrap">{item.description}</p>
                                    </CardDescription>
                                </Card>
                            )
                        })}
                    </div>
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
                        <Button type="button" onClick={() => handleAddCart(product)}>+Add to cart</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
