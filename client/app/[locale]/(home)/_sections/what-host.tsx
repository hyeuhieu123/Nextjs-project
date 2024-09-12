'use client'

import EmblaCarousel from "@/shared/components/embla";

const OPTIONS = { loop: true }
const SLIDES = [
    {
        image: "https://brand.assets.adidas.com/image/upload/f_gif,fl_lossy,q_auto/originals_fw24_adicolor_hp_ct_september_d_b69664ef7d.gif",
        title: "Khám phá adicolor",
        description: "A stunning performance in the Agravic Speed Ultra."
    },
    {
        image: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_400,w_400/outdoor_FW_24_UTMB_Reactive_Global_launch_hp_teaser_d_d5aebf7027.png",
        title: "Khám phá adicolor",
        description: "A stunning performance in the Agravic Speed Ultra."
    },
    {
        image: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_400,w_400/outdoor_fw24_terrex_adventure_wardrobe_launch_trail_hp_carousel_teaser_d_4edf7d9148.jpg",
        title: "Khám phá adicolor",
        description: "A stunning performance in the Agravic Speed Ultra."
    },
    {
        image: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_400,w_400/fw24_sl_72_launch_hp_tc_d_58a47cf235.jpg",
        title: "Khám phá adicolor",
        description: "A stunning performance in the Agravic Speed Ultra."
    },
    {
        image: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_400,w_400/teaser_carousel_6f80f7710b.jpg",
        title: "Khám phá adicolor",
        description: "A stunning performance in the Agravic Speed Ultra."
    }
]

const WhatHostSection = () => {
    return (
        <section className="container w-screen my-5 md:my-10">
            <h1 className="mb-2 text-xl font-bold md:text-3xl">WHAT&apos;S HOT</h1>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </section>
    );
}

export default WhatHostSection;
