import React from "react";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
        <div className="logo">
          <img
            src="/asset/images/kisspng-adidas-originals-logo-three-stripes-brand-5af81ac3bd8a87.0027690115262092197764.png"
            alt="Logo"
            className="h-10"
          />
        </div>
        <ul className="flex space-x-4">
          <li className="hover:text-gray-600">NAM</li>
          <li className="hover:text-gray-600">NỮ</li>
          <li className="hover:text-gray-600">TRẺ EM</li>
          <li className="hover:text-gray-600">THỂ THAO</li>
          <li className="hover:text-gray-600">CÁC NHÃN HIỆU</li>
          <li className="hover:text-gray-600">SẮP & MỚI RA MẮT</li>
          <li className="hover:text-gray-600">GIẢM GIÁ</li>
        </ul>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="border rounded-l px-2 py-1"
            />
            <i className="fa-solid fa-magnifying-glass bg-gray-200 p-2 rounded-r"></i>
          </div>
          <div className="relative">
            <i className="fa-solid fa-user fa-xl"></i>
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg p-4 hidden">
              <p>Đăng nhập</p>
            </div>
          </div>
          <div className="relative">
            <i className="fa-sharp fa-solid fa-heart fa-xl"></i>
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg p-4 hidden"></div>
          </div>
          <div className="relative">
            <a href="/pages/checkout.html">
              <i className="fa-solid fa-cart-shopping fa-lg"></i>
            </a>
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg p-4 hidden">
              <h1 id="cartCheck"></h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="relative">
        <div className="video w-full h-[500px]">
          <video loop autoPlay muted className="w-full h-full object-cover">
            <source src="/asset/video/football_ss24_eurocopa_Copa_Combined_onsite_mh_d_00a64b2320.mp4" />
          </video>
        </div>
        <div className="banner absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold">2024 NATIONAL SOCCER KITS</h1>
          <p>Time to show your colors and gear up for a summer of soccer</p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded flex items-center space-x-2">
            <span>SHOP NOW</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </header>

      {/* Product Container */}
      <div className="product-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {/* Add product items here */}
      </div>

      {/* Middle Banner */}
      <div className="middle flex justify-center items-center my-10 space-x-4">
        <img
          src="/asset/images/4251140_Onsite_SS_24_ORTUS_PART_2_YEEZY_SEA_15_MAR_Masthead_DT_2880x1280_D_37ed0a4db9.jpg"
          alt="YEEZY"
          className="w-1/2"
        />
        <div className="banner text-center">
          <h1 className="text-3xl font-bold">YEEZY</h1>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded">
            XEM THÊM <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* Slideshow */}
      <div className="slide-show py-10">
        <h1 className="text-2xl font-bold text-center">WHAT'S HOT</h1>
        <div className="slide flex space-x-4 p-4">
          {/* Add slide items here */}
        </div>
      </div>

      {/* Second Slideshow */}
      <div className="slide-show py-10">
        <h1 className="text-2xl font-bold text-center">
          CLICK AND SHOP YOUR COUNTRY'S GEAR
        </h1>
        <div className="slide2-container flex space-x-4 p-4">
          <div className="slide2-item w-1/4">
            <video loop autoPlay muted className="w-full">
              <source src="/asset/video/slideshow2/outdoor_ss24_terrex_free_hiker_global_launch_hp_teasercard_d_2bbafc06e6.mp4" />
            </video>
            <h4 className="text-center mt-2">Argentina 2024™ Kits</h4>
            <p className="text-center">
              Đã đến lúc chuẩn bị cho khoảnh khắc bóng đá lớn nhất nước Mỹ.
            </p>
          </div>
          {/* Add more slide2-item elements */}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-10">
        <div className="columns grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="col">
            <h3 className="text-lg font-bold">SẢN PHẨM</h3>
            <ul>
              <li>Giày</li>
              <li>Quần áo</li>
              <li>Phụ kiện</li>
              <li>Hàng mới về</li>
              <li>Release Date</li>
              <li>Member exclusives</li>
              <li>Outlet</li>
            </ul>
          </div>
          <div className="col">
            <h3 className="text-lg font-bold">THỂ THAO</h3>
            <ul>
              <li>Chạy</li>
              <li>Đánh gôn</li>
              <li>Tập luyện</li>
              <li>Bóng đá</li>
              <li>Bóng rổ</li>
              <li>Quần vợt</li>
              <li>Ngoài trời</li>
              <li>Bơi lội</li>
            </ul>
          </div>
          <div className="col">
            <h3 className="text-lg font-bold">BỘ SƯU TẦM</h3>
            <ul>
              <li>IVY PARK</li>
              <li>Giày adidas Pharrell Williams</li>
              <li>Giày Ultra Boost</li>
              {/* Add more list items */}
            </ul>
          </div>
          <div className="col">
            <h3 className="text-lg font-bold">THÔNG TIN VỀ CÔNG TY</h3>
            <ul>
              <li>Giới thiệu về chúng tôi</li>
              <li>Cơ hội nghề nghiệp</li>
              <li>Tin tức</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
