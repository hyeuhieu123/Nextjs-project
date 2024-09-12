'use client'

import Image from "next/image";
import { useRouter } from "@/shared/hooks/use-nextIntl";

import { Card, CardDescription, CardHeader } from "@/shared/components/ui/card";
import { formatCurrencyVN } from "@/shared/utils/format-money";

import { useGetProduct } from "@/server/_actions/product-action";

const Page = () => {
    const router = useRouter()
    const categoryExample = 'Adidas Edit'

    const { data: products } = useGetProduct()

    return (
        <div className="container flex items-center justify-center w-full h-screen gap-2 mt-20">
            <div className="w-full flex flex-wrap justify-start items-start gap-3">
                {products?.filter((item) => item.category.name === categoryExample)?.map((item, i) => {
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
    );
}

export default Page;
