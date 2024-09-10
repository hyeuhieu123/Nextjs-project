import { Separator } from "@/shared/components/ui/separator";
import { ChevronsDownIcon } from "lucide-react";
import Link from "next/link";

const FooterSection = () => {
    return (
        <footer id="footer" className="container">
            <div className="p-10 border bg-card border-secondary">
                <div className=" gap-x-12 gap-y-8 mg-20 flex justify-center">
                  

                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold">SẢN PHẨM
                        </h3>
                        <div>
                            <i>Giày</i>
                        </div>
            <i>Quần áo </i>
                        <div>
                       <i>Phụ kiện</i>     
                        </div>
        <i>Hàng mới về</i>
                        <div>
                      <i>Release Dates</i>     
                        </div>
                        <div><i>Top sellers</i></div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold uppercase">Thể thao</h3>
                        <div>
                            <i>Chạy</i>
                        </div>
                        <div>
                            <i>Gym & Training</i>
                        </div>
                        <div>
                            <i>Bóng đá</i>
                        </div>
                        <div>
                            <i>Bóng rổ </i>
                        </div>
                        <div>
                            <i>Quần vợt</i>
                        </div>
                        <div>
                            <i>Ngoài trời </i>
                        </div>
                        <div>
                            <i>Bơi lội</i>
                        </div>

                       
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold uppercase">Bộ sưu tầm </h3>
                        <div>
                           <i>Ultra Boost</i>
                        </div>

                        <div>
                           <i>PureBoost</i>
                        </div>

                        <div>
                           <i>Predator</i>
                        </div>  <div>
                           <i>Superstar</i>
                        </div>  <div>
                           <i>NMD</i>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold uppercase">Thông tin về <br />Công ty</h3>
                        <div>
                           <i>Giới Thiệu Về Chúng Tôi</i>
                        </div>

                        <div>
                          <i>Cơ Hội Nghề Nghiệp</i>
                        </div>

                        <div>
                         <i>adidas stories
                         </i>
                        </div>
                    </div>
                </div>

                <Separator className="my-6" />
             
            </div>
        </footer>
    );
}

export default FooterSection;
