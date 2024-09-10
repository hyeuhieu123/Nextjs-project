'use client'

import Banner from "@/shared/components/banner";

import ProductSection from "./_sections/product";
import StorySection from "./_sections/story";
import PromoteSection from "./_sections/promote";
import WhatHostSection from "./_sections/what-host";
import FooterSection from "./_sections/footer";

import useBreakPoint from "@/shared/hooks/use-breakpoint";

export default function Home() {
    const breakpoint = useBreakPoint()

    return (
        <>
            <Banner
                data={{
                    title: 'ADIDAS Z.N.E.',
                    description: '',
                    image: 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_1920,w_1920/Banner_a4bb4fcaa6.jpg',
                }}
                textBtn="Tìm hiểu thêm"
            />
            <ProductSection />
            <Banner
                data={{
                    title: 'Addidas TERREX | National Geographic',
                    description: 'Khám phá Bộ sưu tập adidas TERREX | National Geographic mới.',
                    image: breakpoint === "xs" ? 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_600,w_600/outdoor_FW_24_nat_geo_launch_reverse_seasonality_a_HP_banner_hero_v2_m_90d1157328.png' : 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_1920,w_1920/outdoor_FW_24_nat_geo_launch_reverse_seasonality_a_HP_banner_hero_v2_d_9349a2918d.png',
                }}
                textBtn="Tìm hiểu thêm"
                className="mt-24"
            />
            <WhatHostSection />
            <StorySection />
            <PromoteSection />
            <FooterSection />
        </>
    );
}
