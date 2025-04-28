import React from "react";


const ZaloButton = () => {
  return (
    <a
      href="https://zalo.me/0367155132" // Thay your-phone-number bằng số Zalo của bạn
      className="fixed bottom-4 right-0  text-white transform transition-all hover:scale-110 z-50"
    >
      {/* Sử dụng hình ảnh Zalo hoặc biểu tượng khác */}
      <img width="80" height="80" src="https://img.icons8.com/clouds/100/zalo.png" alt="zalo"/>
    </a>
  );
};

export default ZaloButton;
