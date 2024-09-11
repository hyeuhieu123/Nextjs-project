import { Separator } from "@/shared/components/ui/separator";
import { ChevronsDownIcon } from "lucide-react";
import Link from "next/link";

const FooterSection = () => {
  return (
    <footer id="footer">
      <div className="p-10 border bg-card border-secondary">
        <div className=" gap-x-12 gap-y-8 mg-20 flex justify-center">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">SẢN PHẨM</h3>
            <ul className="flex flex-col gap-y-2 text-sm">
              <i>Giày</i>

              <i>Quần áo </i>

              <i>Phụ kiện</i>

              <i>Hàng mới về</i>

              <i>Release Dates</i>

              <i>Top sellers</i>
              <i>Member exclusives</i>
              <i>Outlet</i>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold uppercase">Thể thao</h3>
            <ul className="flex flex-col gap-y-2 text-sm">
              <i>Chạy</i>

              <i>Đánh gôn </i>

              <i>Gym & Training</i>

              <i>Bóng đá</i>

              <i>Bóng Rổ</i>

              <i>Quần vợt</i>
              <i>Ngoài trời</i>
              <i>Bơi lội</i>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold uppercase">Bộ sưu tầm </h3>
            <ul className="flex flex-col gap-y-2 text-sm">
              <i>Pharrell Williams</i>

              <i>Ultra Boost </i>

              <i>Pureboost</i>

              <i>Predator</i>

              <i>Superstar</i>

              <i>Stan Smith</i>
              <i>NMD</i>
              <i>Adicolor</i>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold uppercase">
              Thông tin về <br />
              Công ty
            </h3>
            <ul className="flex flex-col gap-y-2 text-sm">
              <i>Giới Thiệu Về Chúng Tôi</i>

              <i>Cơ Hội Nghề Nghiệp </i>

              <i>Tin tức</i>

              <i>adidas stories</i>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold uppercase">HỖ TRỢ</h3>
            <ul className="flex flex-col gap-y-2 text-sm">
              <i>Trợ Giúp</i>

              <i>Công cụ tìm kiếm cửa hàng</i>

              <i>Biểu Đồ Kích Cỡ</i>

              <i>Thanh toán</i>
              <i>Giao hàng</i>
              <i>Trả Hàng & Hoàn Tiền</i>
              <i>khuyến mãi</i>
              <i>Sơ đồ trang web</i>
              <i>Trợ Giúp Dịch Vụ Khách Hàng</i>
              <i>
                <img
                  src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/vn_footer_logo_1_2d3cf77993.jpg"
                  alt=""
                />
              </i>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold uppercase">
              Theo dõi <br />
              chúng tôi
            </h3>
            <ul className="flex flex-col gap-y-2 text-sm">
              <i>
                <img
                  src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/NE_Wfacebook_image_footer_tcm337_875964_78c1a9acbc.png"
                  alt=""
                />
              </i>
              <i>
                <img
                  src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/NE_Winstagram_logo_footer_tcm221_875968_97cba77886.png"
                  alt=""
                />
              </i>
              <i>
                {" "}
                <img
                  src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/NEW_Black_icon_Twitter_logo_transparent_PNG_tcm337_875966_4d1f590104.png"
                  alt=""
                />
              </i>
              <i>
                <img
                  src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/NE_Wpinterest_logo_footer_tcm337_875965_02ac1428e6.png"
                  alt=""
                />
              </i>
              <i>
                <img
                  src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/NE_Wtiktok_black_share_icon1189_tcm221_875969_892f4e5559.png"
                  alt=""
                />
              </i>
              <i>
                <img
                  src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/NE_Wyoutube_icon_footer_tcm337_875967_a9b811ec3d.png"
                  alt=""
                />
              </i>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />
        {/* <div className="bg-black h-full w-full">
          <ul className="text-white ">
            <i>Cài Đặt Cookie</i>
            <i>Chính sách Bảo mật</i>
            <i>Điều Khoản và Điều Kiện</i>
            <i> XUẤT BẢN BỞI</i>
            <i>© 2020 Công ty TNHH adidas Việt Nam</i>
          </ul>
        </div> */}
      </div>
      <div className="bg-black h-full w-full p-7 text-xs flex  justify-center ">
        <ul className="text-gray-300 flex  space-x-5">
          <i>Cài Đặt Cookie</i>
          <i>Chính sách Bảo mật</i>
          <i>Điều Khoản và Điều Kiện</i>
          <i> XUẤT BẢN BỞI</i>
          <i>© 2020 Công ty TNHH adidas Việt Nam</i>
        </ul>
      </div>
    </footer>
  );
};

export default FooterSection;
