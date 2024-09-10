'use client'
import Image from 'next/image';

import { cn } from "@/shared/lib/utils";

import { Button } from '@/shared/components/ui/button';

export interface PropsBanner {
    data: { title: string; description: string; image: string; video?: string };
    handleClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    textBtn?: string;
    className?: string
    styleList?: any
}
const Banner = (props: PropsBanner) => {
    const { data, textBtn, handleClick, className, styleList = 'default' } = props;

    return (
        <div className={cn("mt-10 md:mt-0 relative flex items-center justify-between w-screen h-[250px] md:h-[450px] lg:h-[650px]", className)}>
            <div className='flex flex-col items-start justify-center w-full h-full gap-5 px-4 mx-auto tracking-wide text-white md:px-8'>
                <div className={cn('mt-2 text-2xl font-semibold leading-5 md:mt-5 md:text-4xl md:leading-10 capitalize text-black bg-white p-2 rounded-sm')}>
                    {data.title}
                </div>
                {textBtn && (
                    <Button variant="custom" onClick={handleClick}>{textBtn}</Button>
                )}
            </div>
            <div className='absolute top-0 left-0 w-full h-full -z-10'>
                <Image
                    src={data.image as string}
                    width={1980}
                    height={700}
                    alt={data.title}
                    priority={true}
                    className={cn('object-cover w-full h-full object-top md:object-center')}
                />
            </div>
        </div>
    );
};

export default Banner;
