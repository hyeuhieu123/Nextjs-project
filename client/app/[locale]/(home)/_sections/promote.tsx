import { Button } from "@/shared/components/ui/button";

const PromoteSection = () => {
    return (
        <section className="w-screen bg-[#ede734] flex flex-wrap justify-center items-center gap-4 p-10">
            <span className="text-2xl font-semibold text-black md:text-3xl">TRỞ THÀNH HỘI VIÊN & HƯỞNG ƯU ĐÃI 15%</span>
            <Button variant="custom">ĐĂNG KÝ MIỄN PHÍ</Button>
        </section>
    );
}

export default PromoteSection;
