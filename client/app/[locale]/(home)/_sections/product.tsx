'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

import { useRouter } from "@/shared/hooks/use-nextIntl";
import { useGetCategory } from "@/server/_actions/category-action";
import { useGetProduct } from "@/server/_actions/product-action";
import { formatCurrencyVN } from "@/shared/utils/format-money";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Card, CardDescription, CardHeader } from "@/shared/components/ui/card";

const ProductSection = () => {
    const { data: categories } = useGetCategory()
    const { data: products } = useGetProduct()

    const router = useRouter()
    const [currentTab, setCurrentTab] = useState(categories && categories[0]!.name.toLowerCase());

    const handleTabChange = (value: string) => {
        setCurrentTab(value);
    };

    useEffect(() => {
        if (categories) {
            setCurrentTab(categories[0].name.toLowerCase())
        }
    }, [categories])

    return (
        <section className="container w-full min-h-[250px] md:min-h-[350px] h-full my-5 md:my-10">
            {categories &&
                <Tabs
                    value={currentTab}
                    onValueChange={handleTabChange}
                    className="w-full h-full"
                >
                    <TabsList className="w-full h-full space-x-2 overflow-x-auto bg-transparent">
                        {categories.map((item, i) => {
                            return (
                                <TabsTrigger
                                    key={i}
                                    value={item.name.toLowerCase()}
                                    className="rounded-none w-full text-black dark:text-white text-base px-1 border border-black/50 data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black"
                                >
                                    {item.name}
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>
                    <TabsContent
                        value={currentTab as string}
                        className="relative flex items-start justify-start w-full h-full gap-2 ml-2 overflow-x-auto whitespace-nowrap md:gap-4"
                    >
                        {products?.filter((item) => item.category.name.toLowerCase() === currentTab)?.map((item, i) => {
                            return (
                                <Card
                                    key={i}
                                    onClick={() => router.push(`/product/${item.id}`)}
                                    className="flex flex-col flex-grow-0 flex-shrink-0 p-0 m-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[300px] lg:h-[350px] hover:border-1 hover:shadow-2xl hover:border-bg-black cursor-pointer transition-all duration-300 ease-in-out"
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
                    </TabsContent>
                </Tabs>
            }
        </section>
    );
}

export default ProductSection;
