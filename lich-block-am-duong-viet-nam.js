// Lấy code âm dương từ HO NGOC DUC và https://www.xemlicham.com/
// Phát triển thẻ dành cho Home Assistant của Nguyễn Tiến Khải - khaisilk1910
// Lunar Calendar Custom Card for Home Assistant
// HA custom card:
//   type: custom:lich-block-am-duong-viet-nam
//   background: transparent
//   background_opacity: 0.6 #0 là có màu nền, 1 là màu nền trong suốt hoàn toàn
//   grid_options:
//     columns: full

(function(){
  'use strict';

  // ===== Utilities =====
  const PI = Math.PI;
  function INT(d){ return Math.floor(d); }


  // ===== Data tables (Hồ Ngọc Đức) =====
  const ABOUT = "Âm lịch Việt Nam Home Assistant - Ver 20Aug2025 © 2025 Nguyễn Tiến Khải";


  // TK19: Years 1800-1899 (kept for completeness, used for <1900)
  const TK19 = [
    0x30baa3, 0x56ab50, 0x422ba0, 0x2cab61, 0x52a370, 0x3c51e8, 0x60d160, 0x4ae4b0, 0x376926, 0x58daa0,
    0x445b50, 0x3116d2, 0x562ae0, 0x3ea2e0, 0x28e2d2, 0x4ec950, 0x38d556, 0x5cb520, 0x46b690, 0x325da4,
    0x5855d0, 0x4225d0, 0x2ca5b3, 0x52a2b0, 0x3da8b7, 0x60a950, 0x4ab4a0, 0x35b2a5, 0x5aad50, 0x4455b0,
    0x302b74, 0x562570, 0x4052f9, 0x6452b0, 0x4e6950, 0x386d56, 0x5e5aa0, 0x46ab50, 0x3256d4, 0x584ae0,
    0x42a570, 0x2d4553, 0x50d2a0, 0x3be8a7, 0x60d550, 0x4a5aa0, 0x34ada5, 0x5a95d0, 0x464ae0, 0x2eaab4,
    0x54a4d0, 0x3ed2b8, 0x64b290, 0x4cb550, 0x385757, 0x5e2da0, 0x4895d0, 0x324d75, 0x5849b0, 0x42a4b0,
    0x2da4b3, 0x506a90, 0x3aad98, 0x606b50, 0x4c2b60, 0x359365, 0x5a9370, 0x464970, 0x306964, 0x52e4a0,
    0x3cea6a, 0x62da90, 0x4e5ad0, 0x392ad6, 0x5e2ae0, 0x4892e0, 0x32cad5, 0x56c950, 0x40d4a0, 0x2bd4a3,
    0x50b690, 0x3a57a7, 0x6055b0, 0x4c25d0, 0x3695b5, 0x5a92b0, 0x44a950, 0x2ed954, 0x54b4a0, 0x3cb550,
    0x286b52, 0x4e55b0, 0x3a2776, 0x5e2570, 0x4852b0, 0x32aaa5, 0x56e950, 0x406aa0, 0x2abaa3, 0x50ab50
  ];


  // TK20: Years 1900-1999
  const TK20 = [
    0x3c4bd8, 0x624ae0, 0x4ca570, 0x3854d5, 0x5cd260, 0x44d950, 0x315554, 0x5656a0, 0x409ad0, 0x2a55d2,
    0x504ae0, 0x3aa5b6, 0x60a4d0, 0x48d250, 0x33d255, 0x58b540, 0x42d6a0, 0x2cada2, 0x5295b0, 0x3f4977,
    0x644970, 0x4ca4b0, 0x36b4b5, 0x5c6a50, 0x466d50, 0x312b54, 0x562b60, 0x409570, 0x2c52f2, 0x504970,
    0x3a6566, 0x5ed4a0, 0x48ea50, 0x336a95, 0x585ad0, 0x442b60, 0x2f86e3, 0x5292e0, 0x3dc8d7, 0x62c950,
    0x4cd4a0, 0x35d8a6, 0x5ab550, 0x4656a0, 0x31a5b4, 0x5625d0, 0x4092d0, 0x2ad2b2, 0x50a950, 0x38b557,
    0x5e6ca0, 0x48b550, 0x355355, 0x584da0, 0x42a5b0, 0x2f4573, 0x5452b0, 0x3ca9a8, 0x60e950, 0x4c6aa0,
    0x36aea6, 0x5aab50, 0x464b60, 0x30aae4, 0x56a570, 0x405260, 0x28f263, 0x4ed940, 0x38db47, 0x5cd6a0,
    0x4896d0, 0x344dd5, 0x5a4ad0, 0x42a4d0, 0x2cd4b4, 0x52b250, 0x3cd558, 0x60b540, 0x4ab5a0, 0x3755a6,
    0x5c95b0, 0x4649b0, 0x30a974, 0x56a4b0, 0x40aa50, 0x29aa52, 0x4e6d20, 0x39ad47, 0x5eab60, 0x489370,
    0x344af5, 0x5a4970, 0x4464b0, 0x2c74a3, 0x50ea50, 0x3d6a58, 0x6256a0, 0x4aaad0, 0x3696d5, 0x5c92e0
  ];


  // TK21: Years 2000-2099
  const TK21 = [
    0x46c960, 0x2ed954, 0x54d4a0, 0x3eda50, 0x2a7552, 0x4e56a0, 0x38a7a7, 0x5ea5d0, 0x4a92b0, 0x32aab5,
    0x58a950, 0x42b4a0, 0x2cbaa4, 0x50ad50, 0x3c55d9, 0x624ba0, 0x4ca5b0, 0x375176, 0x5c5270, 0x466930,
    0x307934, 0x546aa0, 0x3ead50, 0x2a5b52, 0x504b60, 0x38a6e6, 0x5ea4e0, 0x48d260, 0x32ea65, 0x56d520,
    0x40daa0, 0x2d56a3, 0x5256d0, 0x3c4afb, 0x6249d0, 0x4ca4d0, 0x37d0b6, 0x5ab250, 0x44b520, 0x2edd25,
    0x54b5a0, 0x3e55d0, 0x2a55b2, 0x5049b0, 0x3aa577, 0x5ea4b0, 0x48aa50, 0x33b255, 0x586d20, 0x40ad60,
    0x2d4b63, 0x525370, 0x3e49e8, 0x60c970, 0x4c54b0, 0x3768a6, 0x5ada50, 0x445aa0, 0x2fa6a4, 0x54aad0,
    0x4052e0, 0x28d2e3, 0x4ec950, 0x38d557, 0x5ed4a0, 0x46d950, 0x325d55, 0x5856a0, 0x42a6d0, 0x2c55d4,
    0x5252b0, 0x3ca9b8, 0x62a930, 0x4ab490, 0x34b6a6, 0x5aad50, 0x4655a0, 0x2eab64, 0x54a570, 0x4052b0,
    0x2ab173, 0x4e6930, 0x386b37, 0x5e6aa0, 0x48ad50, 0x332ad5, 0x582b60, 0x42a570, 0x2e52e4, 0x50d160,
    0x3ae958, 0x60d520, 0x4ada90, 0x355aa6, 0x5a56d0, 0x462ae0, 0x30a9d4, 0x54a2d0, 0x3ed150, 0x28e952
  ];

  // TK22: Years 2100-2199
  const TK22 = [
    0x4eb520, 0x38d727, 0x5eada0, 0x4a55b0, 0x362db5, 0x5a45b0, 0x44a2b0, 0x2eb2b4, 0x54a950, 0x3cb559,
    0x626b20, 0x4cad50, 0x385766, 0x5c5370, 0x484570, 0x326574, 0x5852b0, 0x406950, 0x2a7953, 0x505aa0,
    0x3baaa7, 0x5ea6d0, 0x4a4ae0, 0x35a2e5, 0x5aa550, 0x42d2a0, 0x2de2a4, 0x52d550, 0x3e5abb, 0x6256a0,
    0x4c96d0, 0x3949b6, 0x5e4ab0, 0x46a8d0, 0x30d4b5, 0x56b290, 0x40b550, 0x2a6d52, 0x504da0, 0x3b9567,
    0x609570, 0x4a49b0, 0x34a975, 0x5a64b0, 0x446a90, 0x2cba94, 0x526b50, 0x3e2b60, 0x28ab61, 0x4c9570,
    0x384ae6, 0x5cd160, 0x46e4a0, 0x2eed25, 0x54da90, 0x405b50, 0x2c36d3, 0x502ae0, 0x3a93d7, 0x6092d0,
    0x4ac950, 0x32d556, 0x58b4a0, 0x42b690, 0x2e5d94, 0x5255b0, 0x3e25fa, 0x6425b0, 0x4e92b0, 0x36aab6,
    0x5c6950, 0x4674a0, 0x31b2a5, 0x54ad50, 0x4055a0, 0x2aab73, 0x522570, 0x3a5377, 0x6052b0, 0x4a6950,
    0x346d56, 0x585aa0, 0x42ab50, 0x2e56d4, 0x544ae0, 0x3ca570, 0x2864d2, 0x4cd260, 0x36eaa6, 0x5ad550,
    0x465aa0, 0x30ada5, 0x5695d0, 0x404ad0, 0x2aa9b3, 0x50a4d0, 0x3ad2b7, 0x5eb250, 0x48b540, 0x33d556
  ];

  const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
  const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
  // Mảng emoji riêng
  const CHI_EMOJI = ["🐭","🐂","🐯","🐱","🐲","🐍","🐴","🐐","🐵","🐔","🐶","🐷"];
  const TUAN = ["Chủ Nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"];
  const TUAN_EN = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const GIO_HD = ["110100101100","001101001011","110011010010","101100110100","001011001101","010010110011"]; // Ty..Hoi

  const TIETKHI = [
    "Xuân Phân","Thanh Minh","Cốc Vũ","Lập Hạ","Tiểu Mãn","Mang Chủng",
    "Hạ Chí","Tiểu Thử","Đại Thử","Lập Thu","Xử Thử","Bạch Lộ",
    "Thu Phân","Hàn lộ","Sương Giáng","Lập đông","Tiểu Tuyết","Đại Tuyết",
    "Đông Chí","Tiểu Hàn","Đại Hàn","Lập Xuân","Vũ Thủy","Kinh Trập"
  ];

  const NGAY_LE_DL = [
    "1/1","9/1","3/2","14/2","27/2","8/3","20/3","22/3","26/3","31/3","1/4","30/4","1/5","7/5","12/5","19/5","1/6","18/6","21/6","28/6","11/7","27/7","28/7","19/8","2/9","10/9","1/10","10/10","13/10","16/10","17/10","20/10","31/10","9/11","19/11","20/11","23/11","28/11","29/11","1/12","19/12","25/12","22/12"
  ];
  const NGAY_LE_DL_STRING = [
    "Tết Dương lịch","Truyền thống học sinh, sinh viên Việt Nam","Thành lập Đảng Cộng Sản Việt Nam","Lễ tình nhân","Thầy thuốc Việt Nam","Quốc tế Phụ nữ","Quốc tế Hạnh phúc","Nước sạch Thế giới","Thành lập Đoàn TNCS Hồ Chí Minh","Lễ Phục Sinh","Cá tháng Tư","Giải phóng Miền Nam","Quốc tế Lao động","Chiến thắng Điện Biên Phủ","Ngày của Mẹ","Ngày sinh Chủ tịch Hồ Chí Minh","Quốc tế Thiếu Nhi","Ngày của Cha","Báo chí Việt Nam","Gia đình Việt Nam","Dân số thế giới","Thương binh liệt sĩ","Thành lập công đoàn Việt Nam","Kỷ niệm Cách mạng Tháng 8 thành công","Quốc Khánh","Thành lập Mặt trận Tổ quốc Việt Nam","Quốc tế người cao tuổi","Ngày giải phóng Thủ Đô","Doanh nhân Việt Nam","Ngày Lương thực thế giới","Ngày quốc tế xóa nghèo","Phụ nữ Việt Nam (20.10.1930)","Halloween","Pháp luật Việt Nam","Quốc tế Nam giới","Nhà giáo Việt Nam","Thành lập Hội chữ thập đỏ Việt Nam","Lễ Tạ Ơn","Black Friday","Thế giới phòng chống AIDS","Toàn quốc kháng chiến","Lễ Giáng Sinh","Thành lập Quân đội nhân dân Việt Nam"
  ];
  const NGAY_LE_AL = ["1/1","15/1","3/3","10/3","15/4","5/5","7/7","15/7","15/8","9/9","10/10","15/10","23/12"];
  const NGAY_LE_AL_STRING = ["Tết Nguyên Đán","Tết Nguyên Tiêu","Tết Hàn Thực, Tiết Thanh Minh","Giỗ tổ Hùng Vương","Lễ Phật Đản","Tết Đoan Ngọ","Lễ Thất Tịch","Lễ Vu Lan","Tết Trung Thu","Tết Trùng Cửu","Tết Trùng Thập","Tết Hạ Nguyên","Ông Táo Về Trời"];


// ===== SVG Tết =====
// 1 - Cậu bé áo xanh cầm bao lì xì
// 2 - Cô bé áo xanh cầm bao lì xì
// 3 - Cậu bé áo vàng cầm bao lì xì bánh chưng
// 4 - Cậu bé áo xanh cầm pháo
// 5 - Cô bé áo vàng cầm bánh chưng
// 6 - Bánh chưng dưa hấu 
// 7 - Bánh chưng bánh tét
// 8 - Bánh chưng xúc xích canh
// 9 - Hoa đào
// 10 - Hoa mai
	const svg_tet = [
    `<img src="/local/images/lich-block-am-duong-viet-nam/Asset 10@3840x.png" style="width:100%; height:100%;">`,
    `<img src="/local/images/lich-block-am-duong-viet-nam/Asset 9@3840x.png" style="width:100%; height:100%;">`,
    `<img src="/local/images/lich-block-am-duong-viet-nam/Asset 8@3840x.png" style="width:100%; height:100%;">`,
    `<img src="/local/images/lich-block-am-duong-viet-nam/Asset 7@3840x.png" style="width:100%; height:100%;">`,
    `<img src="/local/images/lich-block-am-duong-viet-nam/Asset 6@3840x.png" style="width:100%; height:100%;">`,
    `<img src="/local/images/lich-block-am-duong-viet-nam/Asset 5@3840x.png" style="width:100%; height:100%;">`,
    `<img src="/local/images/lich-block-am-duong-viet-nam/Asset 4@3840x.png" style="width:100%; height:100%;">`,
    `<img src="/local/images/lich-block-am-duong-viet-nam/Asset 3@3840x.png" style="width:100%; height:100%;">`,
    `<img src="/local/images/lich-block-am-duong-viet-nam/Asset 2@3840x.png" style="width:100%; height:100%;">`,
    `<img src="/local/images/lich-block-am-duong-viet-nam/Asset 1@3840x.png" style="width:100%; height:100%;">`
  ];
// ===== SVG Tết =====
// 1 - Cậu bé áo xanh cầm bao lì xì
// 2 - Cô bé áo xanh cầm bao lì xì
// 3 - Cậu bé áo vàng cầm bao lì xì bánh chưng
// 4 - Cậu bé áo xanh cầm pháo
// 5 - Cô bé áo vàng cầm bánh chưng
// 6 - Bánh chưng dưa hấu 
// 7 - Bánh chưng bánh tét
// 8 - Bánh chưng xúc xích canh
// 9 - Hoa đào
// 10 - Hoa mai



// ===== SVG 12 Con Giáp =====
	const svg_12congiap = [
		'<svg width="800px" height="800px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet"><path d="M10.77 56.62c-.18 0-.37-.05-.54-.15l-5.83-4.1c-.51-.3-.68-.96-.38-1.47c.3-.51.96-.69 1.47-.38l5.83 4.11c.51.3.68.96.38 1.47c-.21.33-.57.52-.93.52z" fill="#6ba3ab"></path><path d="M1.75 57.47c-.58 0-1.06-.46-1.07-1.04c-.02-.59.45-1.09 1.04-1.1l8.61 1.12c.6-.03 1.09.45 1.1 1.04c.02.59-.45 1.09-1.04 1.1l-8.61-1.12h-.03z" fill="#6ba3ab"></path><path d="M2.83 63.18a1.075 1.075 0 0 1 .11-2.02l7.66-2.27a1.075 1.075 0 1 1 .62 2.06l-7.66 2.27c-.25.07-.51.05-.73-.04z" fill="#6ba3ab"></path><path d="M86.86 97.6s-5.82-1.28-10.35 0s-6.49 4.53-5.67 6.42c.76 1.74 6.19-.15 11.78-.15s15.26-.23 16.92-1.28c1.66-1.06.3-7.18.3-7.18L86.86 97.6z" fill="#fdd3b1"></path><path d="M39.27 97.38s-1.28.6-2.64 1.74c-1.44 1.2-3.17 2.87-2.04 4.31s3.4.6 3.4.6s-.3 1.13 1.96 1.59c2.27.45 7.18-2.42 7.18-2.42l-7.86-5.82z" fill="#fdd3b1"></path><path d="M106.95 81.66s4.76.45 10.5 4.53c5.43 3.86 11.75 10.93 9.14 21.45c-2.64 10.65-14.43 16.69-28.93 15.86c-13.89-.8-28.28-9.4-35.81-8.84c-12.16.91-15.79 7.86-16.85 7.33c-1.06-.53.53-8.91 10.65-11.94c8.37-2.5 15.41-1.06 24.85 1.89c9.44 2.95 29.16 7.95 35.96-2.79c7.4-11.71-4.83-16.39-8.61-18.21c-3.77-1.8-.9-9.28-.9-9.28z" fill="#fdd3b1"></path><path d="M53.85 34.15s.19-2.44-1.28-5.14c-1.18-2.17-3.02-4.91-8.01-5.36c-11.15-1.01-13.92 11.41-14.05 14.65c-.15 3.78.98 8.38.98 8.38l16.69-1.81l5.67-10.72z" fill="#6da3af"></path><path d="M42.52 77.74s-.37 9.24-.53 11.94c-.3 5.14-3.85 5.51-4 7.86c-.23 3.52 5.44 1.74 5.44 1.74l10.65-13.45l-11.56-8.09z" fill="#6da3af"></path><path d="M56.87 91.63S42.44 101 43.73 102.05c1.06.87 2.6 1.69 5.06 1.44c2.87-.3 9.9-3.02 12.46-5.44c1.67-1.57 3.25-4.23 3.25-4.23s4.61 1.36 7.78 1.51c3.17.15 7.86-.23 7.86-.23s7.48 8.91 18.66 6.42s11.26-12.84 11.26-12.84L99.33 67.54L77.05 58.1L56.87 78.87v12.76z" fill="#6da3af"></path><path d="M60.27 54.92s4.37-2.62 6.95-6.82c2.19-3.56 2.93-8.35.3-12.82c-2.78-4.72-7.79-5.62-11.63-4.54c-7.22 2.03-8.31 9.6-8.31 9.6s-2.19-1.81-7.03-1.74c-4.83.08-10.95 2.12-16.24 5.29c-5.29 3.17-6.35 4.91-10.05 6.72c-3.7 1.81-5.74 1.89-5.89 3.85c-.15 1.96.6 4.76 3.55 7.71c2.95 2.95 8.84 4.83 10.95 5.51s4.83 1.89 7.78 2.12c2.95.23 5.06.23 5.06.23s.98 3.1 4.23 7.1c3.25 4 8.91 8.84 8.91 8.84s-.83 5.59-1.89 7.1c-1.06 1.51-6.42 5.14-4.31 8.01s7.18.68 11.1-1.13s5.44-2.19 7.25-4.46c1-1.25 2.42-4.15 2.42-4.15s2.64.91 6.95 1.59c4.31.68 7.71.38 7.71.38s-7.4-8.76-6.87-16.39c.53-7.63 5.14-13.52 9.44-14.13c4.31-.6-1.98 4.85-3.17 7.18c-1.51 2.95-4.08 10.12.53 17.45s12.76 13.27 20.77 11.94c7.71-1.28 11.41-6.27 11.71-13.14c.21-4.69-.23-18.89-5.59-26.44c-5.36-7.55-12.97-12.36-24.75-11c-10.19 1.15-19.88 6.14-19.88 6.14z" fill="#b5c2c8"></path><path d="M62.08 37.17c-3.59-3.05-8.86-.05-10.12 4.78c-1.26 4.83.44 8.92 6.95 6.3c5.49-2.22 6.2-8.51 3.17-11.08z" fill="#ffd3b0"></path><path d="M9.56 59.38l4.13-4.03s-.81-1.56-2.97-2.27s-2.72.81-2.57 3.03c.15 2.21.95 3.12 1.41 3.27z" fill="#ffd3b0"></path><path d="M37.37 54.84c-1.04 1.8-2.68 2.47-4.14 1.94c-1.36-.49-1.43-2.76-.39-4.56c1.04-1.8 2.39-2.63 4.17-2.01c1.36.48 1.39 2.83.36 4.63z" fill="#2d2b2e"></path><path d="M51.31 63.91c1.04 1.71-3.01 4.37-5.84 5.59c-5.29 2.27-9.77 2.57-17.63.96c-7.24-1.49-12.44-4.18-15.36-6.6c-1.93-1.6-3.02-3.22-2.77-3.88c.66-1.71 2.75 1.37 4.08 2.37c2.97 2.22 6.06 3.09 7.72 3.16c3.21.12 6.43-2.15 7.44-1.09c1.91 2.01-3.83 3.02-3.83 3.02s6.35 1.91 10.53 1.41s8.61-2.06 10.83-3.53c2.21-1.46 4.12-2.57 4.83-1.41z" fill="#6ba3ab"></path><path d="M14.44 55.5c.79 1.01-1.31 2.72-2.22 3.47c-.91.76-2.01 2.17-2.52 1.01c-.5-1.16-.3-1.51 1.41-3.07c1.72-1.56 2.43-2.57 3.33-1.41z" fill="#2d2b2e"></path></svg>',

		'<svg width="800px" height="800px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet"><path d="M119.88 74.83s-2.21-4.43-2.67-7.6c-.56-3.87-1.29-6.06-1.62-8.66c-.44-3.44-1.55-5-2.11-5.91l-.42 5.21s-2.28 4.91.07 10.28c3.14 7.17 3.24 6.76 3.24 6.76l3.51-.08z" fill="#858585"></path><path d="M115.1 87.08c-2.33-3.14-2.87-5.56-2.25-8.94c.63-3.46 1.89-6.18 5.28-5.98c2.39.14 4.01 2.11 3.45 5.98c-.36 2.45-2.02 3.62-1.41 6.12c.84 3.45 3.15 3.82 3.6 4.65c.45.82-5.31 2.7-8.67-1.83z" fill="#5d6265"></path><path d="M52.17 84.83L41.4 89.05s3.24 4.15 3.38 5.56c.14 1.41.14 8.24-.07 9.08c-.21.84-3.45 5.49-2.39 6.69c1.06 1.2 4.29 1.62 7.04 1.34s4.79-2.46 4.93-3.45c.14-.99.28-6.97.42-8.45s1.9-11.97 1.9-11.97l-4.44-3.02z" fill="#858585"></path><path d="M95.32 85.25l-7.18 4.01s.63 3.38.21 5.28s-2.39 3.87-1.48 5c.92 1.13 4.58 1.06 6.41.92s3.66-1.13 3.94-2.11c.28-.99.35-12.67.35-12.67l-2.25-.43z" fill="#858585"></path><path d="M57.52 59L27.39 72.3l-11.54-5.63s-.36 2.32-.21 3.73c.28 2.6 1.69 10.14 12.53 11.76c10.84 1.62 18.86-3.73 18.86-3.73l20.48-10.7L57.52 59z" fill="#858585"></path><path d="M47.66 25.37s-11.91-1.5-19.29 5.35s-7 17.08-7 19.9s.38 4.69-.66 6.48c-1.04 1.78-4.87 5.14-4.94 9.64c-.06 3.58 29.05 3.12 29.05 3.12s5.11-.47 7.85-3c2.74-2.53 4.09-5.68 4.09-5.68s1.35 5.09-2.69 8.66c-2.74 2.42-6.4 2.56-6.4 2.56s-.47 3.85-5.01 7.13c-3.84 2.78-8.41 2.82-8.41 2.82S36.5 88.72 47 91.63c10.49 2.91 13.9 2.72 13.9 2.72s1.51 9.57 1.61 11.36c.09 1.78-.66 10.61-.19 11.45c.47.84 3.5 3.28 6.43 3c2.93-.28 4.16-3.47 4.16-4.79c0-1.31-.47-7.98-.57-9.29c-.09-1.31.85-9.85.85-9.85s4.82.47 10.78-1.22c5.96-1.69 9.26-6.48 13.52-6.66s7.37 3.47 7.28 7.41c-.09 3.94-1.89 7.79-1.13 8.92s2.55 1.88 5.2 1.78c2.65-.09 4.92-1.41 5.2-2.44c.28-1.03.57-12.67.66-14.55c.09-1.88 2.65-12.86 3.03-19.99c.38-7.13-1.04-15.58-4.54-19.8c-3.5-4.22-7.94-6.01-9.64-6.48c-1.7-.47-7.1-.9-8.79-1.69c-8.04-3.75-11.63-14.36-26.66-18.3c-8.49-2.22-18.09 1.4-20.44 2.16z" fill="#adadb7"></path><path d="M28 60.29c-9.85-.56-12.15 4.13-12.39 7.7c-.28 4.22 3.73 10.61 11.08 12.01c8.92 1.69 17.13-.66 18.11-8.92C45.74 63.2 34 60.63 28 60.29z" fill="#dfdfdf"></path><path d="M48.65 53.34c0 2.23-1.41 4.13-2.86 4.04c-1.42-.09-2.58-1.81-2.58-4.04s1.17-3.82 2.58-4.04c1.83-.28 2.86 1.81 2.86 4.04z" fill="#333"></path><ellipse cx="25.48" cy="50.29" rx="2.47" ry="3.8" fill="#333"></ellipse><ellipse transform="rotate(-26.285 35.013 72)" cx="35.02" cy="72" rx="3.19" ry="2.26" fill="#333"></ellipse><ellipse transform="rotate(-42.212 22.257 69.927)" cx="22.26" cy="69.93" rx="2.2" ry="3.19" fill="#333"></ellipse><path d="M39.92 25.63s-2.8-3.4-9.67-2.04c-4.84.96-7.19 5.33-9.67 8.26c-2.06 2.44-5.65 3.05-7.51 1.13c-1.38-1.43-1.16-2.88-.91-3.96c.56-2.37 3.12-3.68 3.25-4.58c.19-1.31-5.89-1.69-8.8 2.82s-1.9 12.39 2.6 15.2c4.5 2.82 9.01 4.32 15.02-.94s10.68-11.94 11.94-13.21c2.39-2.4 3.75-2.68 3.75-2.68z" fill="#b79277"></path><path d="M47.71 26.5s2.88-1.76 6.99-1.08c4.65.77 9.15 7.09 10.65 8.78c1.5 1.69 5.91 6.87 12.58 4.81c2.99-.93 4.17-3 4.62-5.36c.55-2.9-.04-5.2-.39-6.31c-.29-.92-1.34-2.63-.07-3.54c.87-.63 2.39.14 3.24 1.55c.84 1.41 2.75 7.44 1.81 11.57S80.76 49.4 72.59 49.31s-18.96-3.47-23.37-8.73s-4.14-12.11-1.51-14.08z" fill="#b79277"></path><path d="M21.43 47.24s-1.77.93-4.39 1.09c-2.7.16-5.95-.29-9.36-3.7c-1.69-1.69-3.03-5.23-3.33-7.34c-.68-4.71 1.64-8.92 1.64-8.92s-.72 13.34 10.28 13.9c7.41.38 12.86-8.17 14.92-10.04s3-1.31 3-1.31s-2.34 5.3-5.26 8.26c-2.96 3-6.62 4.62-7.04 5.12c-.41.48-.46 2.94-.46 2.94z" fill="#895a4e"></path><path d="M48.27 26.22c.65-.67-5.26 1.22-4.6 7.32c.66 6.1 8.96 12.81 14.64 15.3c6.85 3 17.08 4.22 23.56.19c6.48-4.04 7.88-12.48 6.76-17.36c-1.13-4.88-4.13-8.35-5.73-7.88c-.94.28.8 2.05 1.92 5.02c.78 2.05.9 5.11.7 6.8c-.42 3.68-1.78 6.28-3.59 8.19c-2.33 2.45-6.03 4.13-11.83 3.73c-4.87-.34-9.42-2.13-12.91-4.26c-4.23-2.57-7.19-5.75-8.27-7.19c-1.96-2.64-3.84-6.58-.65-9.86z" fill="#895a4e"></path></svg>',

		'<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 763.66 411.99"><g id="flipped-wrapper" transform="scale(-1,1) translate(-763.66,0)"> <defs> <style> .cls-1 { fill: #fcb1a4; } .cls-2 { fill: url(#linear-gradient-61); } .cls-3 { fill: url(#linear-gradient-15); } .cls-4 { fill: url(#linear-gradient-13); } .cls-5 { fill: url(#linear-gradient-28); } .cls-6 { fill: url(#linear-gradient-65); } .cls-7 { fill: url(#linear-gradient-69); } .cls-8 { fill: url(#linear-gradient-53); } .cls-9 { fill: url(#linear-gradient-42); } .cls-10 { fill: url(#linear-gradient-46); } .cls-11 { fill: url(#linear-gradient-70); } .cls-12 { fill: url(#linear-gradient-60); } .cls-13 { fill: url(#linear-gradient-2); } .cls-14 { fill: url(#linear-gradient-87); } .cls-15 { fill: url(#linear-gradient-64); } .cls-16 { fill: url(#linear-gradient-56); } .cls-17 { fill: url(#linear-gradient-43); } .cls-18 { fill: url(#linear-gradient-25); } .cls-19 { fill: url(#linear-gradient-82); } .cls-20 { fill: url(#linear-gradient-10); } .cls-21 { fill: url(#linear-gradient-12); } .cls-22 { fill: url(#linear-gradient-40); } .cls-23 { fill: url(#linear-gradient-27); } .cls-24 { fill: url(#linear-gradient-68); } .cls-25 { fill: #82797f; } .cls-26 { fill: url(#linear-gradient-37); } .cls-27 { fill: url(#linear-gradient-75); } .cls-28 { fill: url(#linear-gradient-55); } .cls-29 { fill: #fff; } .cls-30 { fill: url(#linear-gradient-39); } .cls-31 { fill: url(#linear-gradient-89); } .cls-32 { fill: #e37c6f; } .cls-33 { fill: url(#linear-gradient-52); } .cls-34 { fill: #b6a9b1; } .cls-35 { fill: url(#linear-gradient-58); } .cls-36 { fill: url(#linear-gradient-47); } .cls-37 { fill: url(#linear-gradient-26); } .cls-38 { fill: url(#linear-gradient-74); } .cls-39 { fill: url(#linear-gradient-72); } .cls-40 { fill: url(#linear-gradient-4); } .cls-41 { fill: url(#radial-gradient-5); } .cls-42 { fill: #944f08; } .cls-43 { fill: url(#linear-gradient-35); } .cls-44 { fill: url(#linear-gradient-30); } .cls-45 { fill: url(#linear-gradient-76); } .cls-46 { fill: url(#radial-gradient); } .cls-47 { fill: url(#radial-gradient-3); } .cls-48 { fill: url(#linear-gradient-73); } .cls-49 { fill: url(#linear-gradient-71); } .cls-50 { fill: url(#linear-gradient-44); } .cls-51 { fill: url(#linear-gradient-49); } .cls-52 { fill: url(#linear-gradient-3); } .cls-53 { fill: url(#linear-gradient-34); } .cls-54 { fill: #ffffd2; } .cls-55 { fill: url(#linear-gradient-5); } .cls-56 { fill: #d47c1e; } .cls-57 { fill: url(#linear-gradient-38); } .cls-58 { fill: url(#linear-gradient-91); } .cls-59 { fill: url(#linear-gradient-22); } .cls-60 { fill: url(#linear-gradient-24); } .cls-61 { fill: url(#linear-gradient-54); } .cls-62 { fill: url(#linear-gradient-92); } .cls-63 { fill: url(#linear-gradient-90); } .cls-64 { fill: url(#linear-gradient-33); } .cls-65 { fill: url(#linear-gradient-79); } .cls-66 { fill: url(#linear-gradient-78); } .cls-67 { fill: url(#linear-gradient-51); } .cls-68 { fill: url(#linear-gradient-8); } .cls-69 { fill: url(#linear-gradient-66); } .cls-70 { fill: url(#linear-gradient-57); } .cls-71 { fill: url(#linear-gradient-77); } .cls-72 { fill: url(#linear-gradient-88); } .cls-73 { fill: url(#radial-gradient-2); } .cls-74 { fill: url(#linear-gradient-14); } .cls-75 { fill: url(#linear-gradient-62); } .cls-76 { fill: url(#linear-gradient-29); } .cls-77 { fill: url(#linear-gradient-20); } .cls-78 { fill: url(#radial-gradient-4); } .cls-79 { fill: url(#linear-gradient-67); } .cls-80 { fill: url(#linear-gradient-17); } .cls-81 { fill: url(#linear-gradient-50); } .cls-82 { fill: url(#linear-gradient-7); } .cls-83 { fill: url(#linear-gradient-9); } .cls-84 { fill: #c4aca0; } .cls-85 { fill: url(#linear-gradient-59); } .cls-86 { fill: url(#linear-gradient-11); } .cls-87 { fill: url(#linear-gradient-19); } .cls-88 { fill: url(#linear-gradient-80); } .cls-89 { fill: url(#linear-gradient-6); } .cls-90 { fill: url(#linear-gradient-83); } .cls-91 { fill: url(#linear-gradient-36); } .cls-92 { fill: url(#linear-gradient-21); } .cls-93 { fill: #c5c790; } .cls-94 { fill: url(#linear-gradient-45); } .cls-95 { fill: url(#linear-gradient-85); } .cls-96 { fill: url(#linear-gradient-81); } .cls-97 { fill: #351200; } .cls-98 { fill: url(#linear-gradient-84); } .cls-99 { fill: url(#radial-gradient-6); } .cls-100 { fill: url(#linear-gradient-48); } .cls-101 { fill: url(#linear-gradient-32); } .cls-102 { fill: url(#linear-gradient-86); } .cls-103 { fill: url(#linear-gradient-41); } .cls-104 { fill: url(#linear-gradient-16); } .cls-105 { fill: url(#linear-gradient); } .cls-106 { fill: url(#linear-gradient-23); } .cls-107 { fill: url(#linear-gradient-31); } .cls-108 { fill: url(#linear-gradient-63); } .cls-109 { fill: #f0a212; } .cls-110 { fill: #fc9592; } .cls-111 { fill: url(#linear-gradient-18); } </style> <linearGradient id="linear-gradient" x1="114.18" y1="408.51" x2="116.85" y2="248.85" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#994e08"/> <stop offset="1" stop-color="#d47c1e"/> </linearGradient> <linearGradient id="linear-gradient-2" x1="83.65" y1="220.59" x2="88.97" y2="360.29" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#ffffd2"/> <stop offset="1" stop-color="#d47c1e"/> </linearGradient> <linearGradient id="linear-gradient-3" x1="637.49" y1="218.75" x2="742.76" y2="430.63" xlink:href="#linear-gradient"/> <linearGradient id="linear-gradient-4" x1="316.56" y1="221.21" x2="421.67" y2="432.75" xlink:href="#linear-gradient"/> <linearGradient id="linear-gradient-5" x1="596.52" y1="395.77" x2="587.21" y2="373.16" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#fff"/> <stop offset="1" stop-color="#d47c1e"/> </linearGradient> <linearGradient id="linear-gradient-6" x1="688.28" y1="362.2" x2="721.54" y2="312.98" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#fff"/> <stop offset="1" stop-color="#bd9581"/> </linearGradient> <linearGradient id="linear-gradient-7" x1="398.84" y1="365.18" x2="378.44" y2="315.63" xlink:href="#linear-gradient-5"/> <linearGradient id="linear-gradient-8" x1="116.02" y1="404.17" x2="108.03" y2="382.88" xlink:href="#linear-gradient-5"/> <linearGradient id="linear-gradient-9" x1="653.81" y1="353.17" x2="517.54" y2="250.63" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#9a3d00"/> <stop offset="1" stop-color="#d47c1e"/> </linearGradient> <linearGradient id="linear-gradient-10" x1="22.56" y1="308.18" x2="11.91" y2="325.48" xlink:href="#linear-gradient-6"/> <linearGradient id="linear-gradient-11" x1="625.97" y1="105.09" x2="556.79" y2="133.47" xlink:href="#linear-gradient-9"/> <linearGradient id="linear-gradient-12" x1="624.42" y1="212.64" x2="584.51" y2="178.94" xlink:href="#linear-gradient-5"/> <radialGradient id="radial-gradient" cx="325.99" cy="440.29" fx="325.99" fy="440.29" r="149.22" gradientTransform="translate(214.16 113.3) scale(.44)" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#fff"/> <stop offset=".97" stop-color="#e8ba89"/> </radialGradient> <radialGradient id="radial-gradient-2" cx="-106.1" cy="221.25" fx="-106.1" fy="221.25" r="318.51" gradientTransform="translate(214.16 113.3) scale(.44)" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#ffffd2"/> <stop offset="1" stop-color="#d47c1e"/> </radialGradient> <linearGradient id="linear-gradient-13" x1="396.86" y1="237.76" x2="406.62" y2="124.24" xlink:href="#linear-gradient-5"/> <linearGradient id="linear-gradient-14" x1="524.04" y1="291.15" x2="547.98" y2="287.61" xlink:href="#linear-gradient-5"/> <linearGradient id="linear-gradient-15" x1="416.47" y1="152.66" x2="382.77" y2="293.67" xlink:href="#linear-gradient-6"/> <linearGradient id="linear-gradient-16" x1="671.74" y1="278.34" x2="646.91" y2="193.2" xlink:href="#linear-gradient-6"/> <linearGradient id="linear-gradient-17" x1="627.04" y1="196.93" x2="623.46" y2="233.5" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#762f00"/> <stop offset="1" stop-color="#b06719"/> </linearGradient> <linearGradient id="linear-gradient-18" x1="388.98" y1="173.58" x2="407.6" y2="70.7" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#edc792"/> <stop offset=".49" stop-color="#ffd47c"/> <stop offset="1" stop-color="#c57200"/> </linearGradient> <radialGradient id="radial-gradient-3" cx="405.18" cy="-112.6" fx="405.18" fy="-112.6" r="272.65" gradientTransform="translate(214.16 113.3) scale(.44)" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#ba5d0a"/> <stop offset="1" stop-color="#d47c1e"/> </radialGradient> <linearGradient id="linear-gradient-19" x1="487.53" y1="15.64" x2="547.83" y2="135.37" xlink:href="#linear-gradient-2"/> <linearGradient id="linear-gradient-20" x1="114.98" y1="404.32" x2="103.92" y2="396.42" gradientUnits="userSpaceOnUse"> <stop offset=".02" stop-color="#000"/> <stop offset=".97" stop-color="#6e4110"/> </linearGradient> <linearGradient id="linear-gradient-21" x1="114.91" y1="404.27" x2="104.56" y2="396.88" gradientUnits="userSpaceOnUse"> <stop offset=".02" stop-color="#000"/> <stop offset="1" stop-color="#d47c1e"/> </linearGradient> <linearGradient id="linear-gradient-22" x1="639.98" y1="355" x2="628.92" y2="347.09" gradientTransform="translate(-106.19 169.1) rotate(-10.85)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-23" x1="639.91" y1="354.95" x2="629.56" y2="347.55" gradientTransform="translate(-106.19 169.1) rotate(-10.85)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-24" x1="668.01" y1="357.15" x2="657.73" y2="349.81" gradientTransform="translate(-106.19 169.1) rotate(-10.85)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-25" x1="667.95" y1="357.1" x2="658.33" y2="350.24" gradientTransform="translate(-106.19 169.1) rotate(-10.85)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-26" x1="1047.2" y1="1087.46" x2="1041.19" y2="1083.16" gradientTransform="translate(2190.37 267.14) rotate(129.5) skewX(-.11)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-27" x1="1047.16" y1="1087.43" x2="1041.57" y2="1083.44" gradientTransform="translate(2190.37 267.14) rotate(129.5) skewX(-.11)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-28" x1="958.57" y1="1105.77" x2="953.74" y2="1102.32" gradientTransform="translate(2112.43 55.46) rotate(118.46) skewX(-.12)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-29" x1="958.56" y1="1105.72" x2="954.12" y2="1102.55" gradientTransform="translate(2112.43 55.46) rotate(118.46) skewX(-.12)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-30" x1="1042.08" y1="1079.86" x2="1036.07" y2="1075.57" gradientTransform="translate(2190.37 267.14) rotate(129.5) skewX(-.11)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-31" x1="1042.04" y1="1079.84" x2="1036.45" y2="1075.84" gradientTransform="translate(2190.37 267.14) rotate(129.5) skewX(-.11)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-32" x1="808.54" y1="1064.36" x2="801.09" y2="1059.04" gradientTransform="translate(1915.91 -187.21) rotate(102.15) skewX(-.1)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-33" x1="808.49" y1="1064.33" x2="801.52" y2="1059.35" gradientTransform="translate(1915.91 -187.21) rotate(102.15) skewX(-.1)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-34" x1="491.13" y1="837.78" x2="483.68" y2="832.46" gradientTransform="translate(1087 -554.24) rotate(52.77) skewX(-.22)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-35" x1="491.08" y1="837.75" x2="484.11" y2="832.77" gradientTransform="translate(1087 -554.24) rotate(52.77) skewX(-.22)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-36" x1="677.51" y1="349.9" x2="669.16" y2="343.94" gradientTransform="translate(-106.19 169.1) rotate(-10.85)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-37" x1="677.46" y1="349.86" x2="669.62" y2="344.26" gradientTransform="translate(-106.19 169.1) rotate(-10.85)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-38" x1="561.47" y1="484.84" x2="551.29" y2="477.57" gradientTransform="translate(-295.41 241.59) rotate(-31.45)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-39" x1="561.44" y1="484.73" x2="551.98" y2="477.97" gradientTransform="translate(-295.41 241.59) rotate(-31.45)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-40" x1="600.24" y1="493.38" x2="591.41" y2="487.07" gradientTransform="translate(-328.69 352.42) rotate(-39.09)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-41" x1="600.22" y1="493.27" x2="592.01" y2="487.41" gradientTransform="translate(-328.69 352.42) rotate(-39.09)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-42" x1="616.66" y1="493.53" x2="610.42" y2="489.07" gradientTransform="translate(-337.34 398.38) rotate(-42.1) skewX(.02)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-43" x1="616.66" y1="493.44" x2="610.86" y2="489.3" gradientTransform="translate(-337.34 398.38) rotate(-42.1) skewX(.02)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-44" x1="628.24" y1="487.18" x2="622" y2="482.72" gradientTransform="translate(-342.78 450.9) rotate(-45.6) skewX(.02)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-45" x1="628.24" y1="487.09" x2="622.44" y2="482.95" gradientTransform="translate(-342.78 450.9) rotate(-45.6) skewX(.02)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-46" x1="141.21" y1="415.79" x2="130.53" y2="408.16" gradientTransform="translate(-30.58 -8.68) rotate(-2.75)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-47" x1="141.14" y1="415.74" x2="131.15" y2="408.6" gradientTransform="translate(-30.58 -8.68) rotate(-2.75)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-48" x1="150.18" y1="410.74" x2="141.39" y2="404.46" gradientTransform="translate(-30.58 -8.68) rotate(-2.75)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-49" x1="150.12" y1="410.7" x2="141.89" y2="404.82" gradientTransform="translate(-30.58 -8.68) rotate(-2.75)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-50" x1="176.48" y1="441.53" x2="170.02" y2="436.92" gradientTransform="translate(-101.27 -19.44) rotate(-9.13)" xlink:href="#linear-gradient-20"/> <linearGradient id="linear-gradient-51" x1="176.44" y1="441.5" x2="170.38" y2="437.17" gradientTransform="translate(-101.27 -19.44) rotate(-9.13)" xlink:href="#linear-gradient-21"/> <linearGradient id="linear-gradient-52" x1="666.68" y1="189.97" x2="666.68" y2="164.47" xlink:href="#linear-gradient-6"/> <linearGradient id="linear-gradient-53" x1="667.59" y1="183.32" x2="666.25" y2="165.14" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#c4aca0"/> <stop offset="1" stop-color="#000"/> </linearGradient> <linearGradient id="linear-gradient-54" x1="668.25" y1="189.97" x2="666.92" y2="174.9" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#82797f"/> <stop offset="1" stop-color="#000"/> </linearGradient> <linearGradient id="linear-gradient-55" x1="686.39" y1="118.24" x2="674.86" y2="125.33" xlink:href="#linear-gradient-9"/> <linearGradient id="linear-gradient-56" x1="638.96" y1="110.84" x2="643.4" y2="124.43" xlink:href="#linear-gradient-9"/> <linearGradient id="linear-gradient-57" x1="687.43" y1="3.18" x2="678.12" y2="81.67" xlink:href="#linear-gradient-2"/> <linearGradient id="linear-gradient-58" x1="609.45" y1="106.53" x2="620.09" y2="154.41" xlink:href="#linear-gradient-6"/> <linearGradient id="linear-gradient-59" x1="724.11" y1="127.93" x2="712.14" y2="171.82" xlink:href="#linear-gradient-6"/> <linearGradient id="linear-gradient-60" x1="646.9" y1="230.73" x2="658.21" y2="115" xlink:href="#linear-gradient-2"/> <linearGradient id="linear-gradient-61" x1="680.99" y1="162.32" x2="678.46" y2="150.51" xlink:href="#linear-gradient-2"/> <linearGradient id="linear-gradient-62" x1="626.92" y1="156.41" x2="630.17" y2="149.91" xlink:href="#linear-gradient-2"/> <linearGradient id="linear-gradient-63" x1="651.8" y1="166.1" x2="654.01" y2="134.17" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#ffffd2"/> <stop offset=".12" stop-color="#fbf5c5"/> <stop offset=".33" stop-color="#f3dda3"/> <stop offset=".62" stop-color="#e7b66d"/> <stop offset=".98" stop-color="#d58023"/> <stop offset="1" stop-color="#d47c1e"/> </linearGradient> <linearGradient id="linear-gradient-64" x1="652.37" y1="164.28" x2="652.67" y2="153.05" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#e37c6f"/> <stop offset="1" stop-color="#e34942"/> </linearGradient> <linearGradient id="linear-gradient-65" x1="656.46" y1="85.09" x2="658.36" y2="90.92" xlink:href="#linear-gradient-9"/> <linearGradient id="linear-gradient-66" x1="671.99" y1="87.09" x2="675.28" y2="97.16" xlink:href="#linear-gradient-9"/> <linearGradient id="linear-gradient-67" x1="669.89" y1="70.67" x2="673.89" y2="55.6" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#af540b"/> <stop offset="1" stop-color="#dc8628"/> </linearGradient> <linearGradient id="linear-gradient-68" x1="677.7" y1="55.71" x2="684.15" y2="31.35" xlink:href="#linear-gradient-67"/> <radialGradient id="radial-gradient-4" cx="1003.16" cy="-26.6" fx="1003.16" fy="-26.6" r="43.84" gradientTransform="translate(214.16 113.3) scale(.44)" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#c5600f"/> <stop offset="1" stop-color="#d47c1e"/> </radialGradient> <linearGradient id="linear-gradient-69" x1="646.28" y1="109.38" x2="638.98" y2="148.29" gradientUnits="userSpaceOnUse"> <stop offset=".02" stop-color="#ebc27f"/> <stop offset="1" stop-color="#d47c1e"/> </linearGradient> <linearGradient id="linear-gradient-70" x1="671" y1="108.96" x2="663.28" y2="150.14" xlink:href="#linear-gradient-69"/> <linearGradient id="linear-gradient-71" x1="714.85" y1="60.23" x2="718.39" y2="87.28" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#f0c374"/> <stop offset="1" stop-color="#fff"/> </linearGradient> <linearGradient id="linear-gradient-72" x1="630.64" y1="52.74" x2="631.09" y2="82.01" xlink:href="#linear-gradient-71"/> <radialGradient id="radial-gradient-5" cx="1083.9" cy="-20.6" fx="1083.9" fy="-20.6" r="13.67" gradientTransform="translate(214.16 113.3) scale(.44)" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#ffff6a"/> <stop offset="1" stop-color="#ffbb26"/> </radialGradient> <radialGradient id="radial-gradient-6" cx="948.89" cy="-37.93" fx="948.89" fy="-37.93" r="10.64" xlink:href="#radial-gradient-5"/> <linearGradient id="linear-gradient-73" x1="609.95" y1="127.38" x2="615.29" y2="151.44" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#fff"/> <stop offset="1" stop-color="#e4d3cb"/> </linearGradient> <linearGradient id="linear-gradient-74" x1="712.03" y1="143.66" x2="702.72" y2="150.31" xlink:href="#linear-gradient-73"/> <linearGradient id="linear-gradient-75" x1="695.58" y1="165.53" x2="700.45" y2="161.54" xlink:href="#linear-gradient-54"/> <linearGradient id="linear-gradient-76" x1="630.14" y1="161.84" x2="635.24" y2="164.27" xlink:href="#linear-gradient-54"/> <linearGradient id="linear-gradient-77" x1="718.4" y1="83.84" x2="737.47" y2="53.68" xlink:href="#linear-gradient-2"/> <linearGradient id="linear-gradient-78" x1="636.35" y1="71.26" x2="632.8" y2="33.12" xlink:href="#linear-gradient-2"/> <linearGradient id="linear-gradient-79" x1="624.64" y1="34.81" x2="641.49" y2="23.72" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#d47412"/> <stop offset="1" stop-color="#bd650a"/> </linearGradient> <linearGradient id="linear-gradient-80" x1="727.46" y1="57.27" x2="742.09" y2="43.96" xlink:href="#linear-gradient-79"/> <linearGradient id="linear-gradient-81" x1="751.5" y1="62" x2="716.62" y2="43.08" xlink:href="#linear-gradient-6"/> <linearGradient id="linear-gradient-82" x1="747.81" y1="58.89" x2="721.89" y2="44.83" gradientUnits="userSpaceOnUse"> <stop offset=".02" stop-color="#dfd3ce"/> <stop offset="1" stop-color="#a7806c"/> </linearGradient> <linearGradient id="linear-gradient-83" x1="619.88" y1="55.42" x2="615.73" y2="48.6" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#ab5e0f"/> <stop offset="1" stop-color="#944f08"/> </linearGradient> <linearGradient id="linear-gradient-84" x1="653.99" y1="34.66" x2="649.85" y2="27.86" xlink:href="#linear-gradient-83"/> <linearGradient id="linear-gradient-85" x1="654.52" y1="34.34" x2="650.39" y2="27.57" xlink:href="#linear-gradient-83"/> <linearGradient id="linear-gradient-86" x1="637.18" y1="44.9" x2="633.04" y2="38.1" xlink:href="#linear-gradient-83"/> <linearGradient id="linear-gradient-87" x1="738.89" y1="66.53" x2="742.73" y2="55.3" xlink:href="#linear-gradient-83"/> <linearGradient id="linear-gradient-88" x1="707.13" y1="65.74" x2="712.43" y2="50.26" xlink:href="#linear-gradient-83"/> <linearGradient id="linear-gradient-89" x1="717.37" y1="69.26" x2="722.67" y2="53.76" xlink:href="#linear-gradient-83"/> <linearGradient id="linear-gradient-90" x1="709.13" y1="66.45" x2="714.44" y2="50.94" xlink:href="#linear-gradient-83"/> <linearGradient id="linear-gradient-91" x1="746.19" y1="79.12" x2="751.49" y2="63.62" xlink:href="#linear-gradient-83"/> <linearGradient id="linear-gradient-92" x1="695.37" y1="167.3" x2="716.65" y2="179.71" xlink:href="#linear-gradient-82"/> </defs> <g id="TIGER"> <g> <path d="M763.56,44.62c-.04-.42-.09-.82-.06-1.13.08-1.02.06-2.13-.07-3.39-.25-2.52-1.01-4.74-2.18-6.41-1.02-1.45-2.34-2.5-3.93-3.12-1.45-.57-3.07-.84-4.96-.84-1.26,0-2.65.13-4.23.39-3.09.51-6.03,1.54-8.9,2.55l-.22.08c-2.61.92-4.77,1.76-6.87,3.58-1.67,1.45-3.06,3.14-4.42,4.79-.39.47-.78.94-1.17,1.4-.75.89-1.5,1.69-2.28,2.44-.84-.95-1.76-1.81-2.66-2.66-.42-.39-.83-.78-1.23-1.18-.68-.67-1.29-1.46-1.96-2.32-1.42-1.83-3.03-3.9-5.62-4.94-1.35-1.18-5.26-4.52-7.49-5.82-1.06-1.61-5.1-7.66-7.58-9.94-.25-.23-.55-.38-.87-.45-.03-.07-.06-.14-.1-.2-.33-.59-.96-.95-1.64-.95-.07,0-.14,0-.21.01-.14.02-.42.05-.78.11-.12-.23-.29-.43-.5-.6-.23-.18-1.53-1.11-4.11-1.11-.33,0-.66.01-.99.04-.15.01-.31.02-.48.02-1.64,0-3.93-.49-5.44-.81-1.03-.22-1.5-.32-1.89-.32-.48,0-.93.15-1.29.42-.77-.28-1.53-.42-2.26-.42-.68,0-1.31.37-1.64.96-.04.07-.07.14-.1.21-.95.04-1.9.1-2.84.17-.56.04-1.2.08-1.9.12-3,.16-7.1.38-10.71,1.52-1.71.54-3.38,1.19-4.86,1.76l-.04.02c-1.78.69-3.79,1.46-4.5,1.46-1.52,0-5.03.66-6.69.99-.19-.26-.4-.53-.6-.82-.32-.43-.63-.87-.94-1.31l-.09-.12c-.5-.7-1.01-1.43-1.54-2.13-2.62-3.5-6.1-6.2-9.45-8.82l-.1-.08c-.37-.29-.74-.57-1.13-.86-.03-.07-.09-.2-.19-.44-.12-.29-.25-.63-.44-.95-1.03-1.74-2.53-3.43-4.35-4.89-.48-.39-1.07-.59-1.69-.59-.51,0-.95.14-1.25.23-.07.02-.14.04-.21.06-1.06.27-2.16.69-3.27,1.25-1.83.92-3.52,2.33-4.9,4.08-2.25,2.86-3.67,6.69-4.36,11.7-.62,4.58-.45,9.17-.22,12.67.05.76.1,1.56.17,2.38-2.03.94-3.9,2.06-5.56,3.07l-.04.02c-1.51.91-3.07,1.85-4.68,2.64-1.49.73-3.37,1.07-5.92,1.07-1.32,0-2.73-.09-3.97-.17h-.05s-.12-.01-.12-.01c-1.39-.09-2.7-.17-4-.17-.12,0-.25,0-.37,0-6.35.08-12,.59-17.27,1.56-5.13.94-9.62,2.84-14.11,5.99-3.34,2.34-6.74,5.23-10.7,9.12l-.13.13c-1.28,1.25-2.12,2.08-3.53,2.98-3.91,2.51-8.04,5.06-12.27,7.58-.82.49-1.64.99-2.47,1.49-4.18,2.54-8.5,5.16-12.96,6.78-4.94,1.79-10.81,2.66-17.95,2.66-4.91,0-9.89-.41-14.13-.82-5.18-.5-10.42-1.34-15.48-2.15l-.28-.04c-2.45-.39-4.99-.8-7.49-1.16-25.71-3.7-52.98-6.23-81.05-7.51-8.18-.37-14.83-.6-20.9-.73-.06-.03-.12-.05-.18-.07h-.05c-.8-.39-1.62-.7-2.41-.98l-.16-.06-.05-.02c-.22-.42-.6-.74-1.06-.9-3.98-1.34-9.6-2.82-16.7-4.41-16.14-3.62-32-3.9-36.48-3.9-.91,0-1.44.01-1.53.01-21.94.66-43.2,4.65-63.19,11.84-31.25,11.25-56.85,30.97-72.07,55.54-4.16,6.72-7.7,13.91-10.8,21.96-1.02,2.61-2,5.29-2.9,7.98-5.39,16.06-8.37,32.96-11.26,49.32-.74,4.21-1.48,8.43-2.21,12.65-.48,2.75-.95,5.5-1.43,8.25l-.06.33v.07c-.26,1.43-.52,2.91-.8,4.34l-.03.15-.04.17-.05.2-.02.09c-.07.29-.14.58-.21.85l-.05.2-.03.14c-.09.33-.18.66-.27.98l-.03.09-.02.06c-.11.37-.21.74-.32,1.1l-.04.13-.05.16c-.08.27-.17.54-.26.81l-.11.32c-.09.27-.19.54-.3.83l-.02.07-.05.15c-.13.34-.26.67-.39.99l-.05.1-.05.12c-.1.25-.21.5-.32.74l-.11.24-.03.06c-.1.22-.21.44-.33.67l-.04.08s-.05.1-.08.15c-.15.29-.3.56-.44.81l-.04.07-.05.08c-.13.22-.27.44-.41.65l-.12.18-.03.05c-.12.18-.24.35-.36.5l-.06.08s-.06.08-.1.13c-.19.24-.35.44-.52.62-.2.22-.34.48-.42.76-.22.23-.43.46-.64.69-2.96,3.14-5.77,5.72-8.12,7.47-6.17,4.57-16.38,7.98-21.87,9.81-1.39.47-2.6.87-3.4,1.18-1.38.53-2.47,1.3-3.34,2.34-.21.26-.35.56-.41.89-1.33,1.67-1.91,3.71-2.42,5.52l-.05.16-.26.91c-.75,2.61-1.53,5.31-1.94,8.09-.37,2.57-.49,5.34-.37,8.72.07,1.87.21,3.72.44,5.49.03.22-.09.67-.2,1.06-.07.25-.14.51-.19.76-.32,1.48-.64,2.95-.96,4.43l-.17.81-.45,2.05-.02.08c-.91,4.16-1.85,8.45-2.67,12.73-3.74.69-7.64,1.05-11.61,1.05-7.25,0-14.55-1.14-21.67-3.39-5.97-1.88-20.32-7.6-24.75-20.09-.66-1.85-1.32-4.59-.75-7.08.34-1.49,1.44-2.76,2.55-3.94,1.64-1.75,3.09-3.36,4.32-5.28l.16-.24c.54-.84,1.15-1.8,1.57-2.95.18-.5.32-1,.47-1.51l.1-.35s.02-.06.05-.13c.12-.32.32-.85.26-1.49-.23-2.7-1.22-7.46-5.25-8.9-.63-.22-1.32-.34-2.06-.34-1.43,0-2.83.42-3.89.78-2.16.73-4.28,1.92-6.49,3.62-9.95,7.67-11.74,21.24-10.25,30.53,1.62,10.09,7.5,19.94,16.15,27.04,6.94,5.7,15.84,10.07,28,13.77,8.51,2.58,17.92,4.01,29.52,4.47-.46,4.17-1.03,10.05-1.14,15.99-.07,3.59.05,7.09.37,10.41.13,1.32.28,2.65.42,3.94v.05c.26,2.24.52,4.55.66,6.82.08,1.43.09,2.88.1,4.46.03,4.76.05,9.68,2.4,14.15.15.29.38.54.65.73.06.09.12.18.2.27,1.03,1.18,2.11,2.15,3.29,2.97.62.43,1.27.78,1.91,1.05.38.16.75.3,1.13.42.2.06.4.1.57.13,1.07,2.02,2.58,3.98,4.58,5.98,3.29,3.28,7.8,3.65,10.9,3.65,1.68,0,3.3-.12,4.9-.25l.31-.02c.75-.06,1.49-.1,2.24-.15h.16c1.59-.11,3.23-.21,4.87-.4.94.95,1.67,1.9,1.68,1.92.43.56,1.1.9,1.8.9.16,0,.32-.02.51-.06.88-.21,1.55-.91,1.71-1.79.23-1.26.32-2.64.27-4.01.13-.18.25-.37.36-.57,1.89.33,3.47.48,4.93.48,1.93,0,3.58-.27,5.02-.83.57.57,1,1.06,1.12,1.21.43.52,1.06.82,1.74.82.04,0,.12,0,.15,0,.15-.01.3-.04.46-.08.03,0,.05-.02.08-.02.82-.27,1.42-.99,1.53-1.83.2-1.51.2-3.14-.03-4.74.1-.22.2-.44.28-.67.15-.04.3-.1.45-.17.79-.4,1.52-.84,2.18-1.34.64.6,1.24,1.32,1.54,1.71.41.54,1.05.87,1.73.87h.11c.18-.01.36-.04.54-.1.81-.26,1.41-.97,1.51-1.83.26-2.09.09-4.32-.45-6.3.18.19.34.38.48.54.4.49.98.78,1.61.78.13,0,.28-.02.39-.04.19-.04.36-.1.55-.19.69-.36,1.13-1.08,1.13-1.88.03-3.17-.95-6.44-2.45-8.13-.03-.04-.07-.07-.1-.11-.24-1.45-.56-2.85-.94-4.17-1.44-4.92-4.06-8.85-7.57-11.37-3.91-2.8-8.28-3.14-13.16-3.27-1.8-.05-3.52-.15-4.89-.86-1.2-.62-2-2.16-2.14-4.11-.09-1.2.58-2.71,1.18-4.05l.07-.15c.54-1.22,1.17-2.44,1.78-3.63l.03-.05.08-.15c.19-.38.39-.75.58-1.13.84-1.65,1.4-3.24,2.01-4.96l.06-.18c.74-2.1,1.67-4.37,2.84-6.92,1.45-3.18,3.04-6.32,4.6-9.39,2.68-5.3,5.45-10.78,7.57-16.52,11.56-3.55,23.34-8.74,35-15.43,5.55-3.18,11.08-6.79,16.45-10.71,2.85-2.08,5.32-3.99,7.54-5.83.8-.66,1.98-1.15,3.13-1.61.32-.13.65-.27.96-.4,1.66-.71,3.41-1.4,4.95-2.01l.11-.04.18-.07c2.91-1.15,5.92-2.33,8.84-3.7,2.79-1.32,5.65-3.02,8.72-5.21,4.43-3.16,8.53-6.8,12.5-10.31l.4-.36c.64-.57,1.28-1.13,1.92-1.7,4.79-4.21,9.78-8.32,14.6-12.3l1.25-1.03c.07-.06.15-.12.22-.18,9.13,3.14,16.77,9.52,22.73,18.97,2.36,3.74,4.57,8.11,6.98,13.75l.77,1.79c2.01,4.69,4.1,9.54,5.24,14.44.67,2.87.98,5.88,1.29,8.8.3,2.87.61,5.84,1.25,8.76.68,3.09,1.67,5.91,2.95,8.38.78,1.49,1.61,2.92,3.21,3.99,4.13,2.76,7.87,5.07,11.44,7.07,1.06.6,2.18,1.19,3.33,1.76.12.06.25.12.38.17,0,0,.04.02.04.02.08.03.2.09.26.12.61.62,1.29,1.28,2.12,2.08,5.67,5.46,13.34,12.36,22.32,17.24,2.05,1.12,4.2,2.02,6.3,2.91l.27.12c.44.18.88.37,1.32.56l.46.2c3.01,1.29,5.72,2.45,8.45,3.6,4.73,1.98,10.61,4.44,16.51,6.18,3.1.92,6.25,1.33,9.31,1.72,2.09.27,4.24.55,6.3.99,1.84.39,3.14,1.05,4.35,2.18.22.21.44.42.68.65,1.33,1.27,2.7,2.58,4.38,3.63,3.66,2.28,8.16,2.32,12.14,2.36.46,0,.92,0,1.36.02.49,0,.99.01,1.48.01,5.68,0,10.75-.54,15.51-1.66,2.5-.59,4.96-1.4,7.3-2.42.7-.3,1.13-.87,1.56-1.5.04-.05.07-.1.09-.13.26-.35.58-.79.87-1.29,1.72.19,3.87,1.03,3.89,1.03.27.1.55.16.83.16.41,0,.82-.11,1.17-.33.16-.1.3-.21.41-.32.6-.58.82-1.44.6-2.24,1.18-.24,2.43-.5,3.64-.84.95-.26,1.61-1.09,1.64-2.08,0-.24.02-.48.02-.74.14-.01.29-.02.45-.02,1.36,0,3.06.46,3.24.51.2.06.4.09.61.09.54,0,1.06-.2,1.46-.56.17-.16.29-.3.36-.41.46-.67.52-1.55.17-2.28-.57-1.19-1.29-2.34-2.13-3.41.71,0,1.58.24,1.86.32.2.07.42.1.63.1.65,0,1.26-.31,1.64-.82.1-.12.18-.27.25-.41.27-.59.29-1.3.03-1.92-1-2.37-2.5-4.53-4.1-5.93-.6-.57-1.2-1-1.79-1.27.06-.46-.02-.94-.23-1.37-1.15-2.31-2.77-4.37-4.46-5.67-1.04-.89-2.05-1.36-3.02-1.42h-.03s-.09-.03-.13-.04c-2.41-3-6.64-4.46-12.94-4.46-1.12,0-2.31.05-3.64.14-4.43.3-8.79,1.07-12.83,1.86-1.35.26-2.7.54-4.05.81l-1.73.35c-.79.16-1.59.32-2.42.47-.25.05-.5.09-.76.14-3.31-1.76-6.77-3.99-10.54-6.83-.86-.65-1.73-1.34-2.56-2.02l-.06-.05c-.94-.76-2.11-1.71-3.28-2.56-1.72-1.25-3.53-2.22-5.27-3.15l-.29-.16c-.34-.18-.68-.37-1.02-.55-3.81-2.09-7.45-4.66-10.56-6.9l-.07-.05c-3.07-2.21-6.23-4.49-8.85-7.16-1.72-1.75-2.13-5.15-2.45-7.88l-.08-.71c-.32-2.58-.51-5.22-.69-7.77-.12-1.77-.27-3.78-.46-5.72-.28-2.91-.62-5.87-.94-8.72l-.02-.17c-.6-5.26-1.21-10.7-1.55-16.07-.17-2.71-.04-5.68.43-9.3.59.27,1.1.52,1.58.76,2.42,1.23,4.76,2.78,7.03,4.29l.84.56c2.75,1.82,5.41,3.35,8.14,4.7,17.29,8.53,37.52,13.04,58.49,13.04,4.01,0,8.06-.17,12.04-.49,13.09-1.08,24.79-3.74,34.79-7.91,5.28-2.21,10.22-5.33,14.66-9.28,2.06-1.83,4.08-3.91,6.18-6.37,1.97-2.3,4.07-4.14,6.6-5.79.51-.33,1.02-.66,1.54-.99,1.48-.94,3-1.91,4.47-3,2.28,5.79,4.09,11.36,5.52,16.97,3.75,14.67,5.35,30.14,4.78,45.95-.09,2.55-.26,5.16-.51,8,0,.08-.03.21-.06.34v.06c-.21,1.03-.44,2.31.29,3.3.39.52.79,1.09,1.31,1.84,1.03,1.49,2.27,3.29,2.97,5.15h-1.23c-.62,0-1.21.31-1.56.8-.2.28-.32.61-.35.94-.3.54-.35,1.18-.14,1.76.7,1.85,2.77,2.54,4.16,2.83-.57,1.79-1.11,3.16-1.55,3.89-.31.52-.61.59-.89.59-.21,0-.37-.05-.37-.05h0c-.21-.08-.44-.12-.66-.12-.7,0-1.34.38-1.66.99-.13.24-.21.51-.22.78-.05.1-.1.21-.13.32-.29.9.03,1.87.79,2.42.07.05.14.1.22.15-.03.03-.05.07-.08.1-.22.3-.34.65-.36,1.02-.05.09-.09.18-.12.28-.3.88,0,1.84.73,2.41.47.36.9.8,1.28,1.3.1.13.21.39.3.6.16.37.36.81.68,1.26-.13.24-.21.51-.22.79-.25.47-.32,1.01-.18,1.54.46,1.76,1.47,3.56,3.02,5.35,1.04,1.21,2.35,2.14,3.62,3.04,1.68,1.19,3.28,2.32,3.86,3.89.11.29.13.84.15,1.36.01.37.03.75.07,1.13.13,1.08.32,2.22.62,3.68.66,3.21,1.45,5.77,2.5,8.08,1.23,2.7,3.11,4.38,5.91,5.28.76.24,1.5.43,2.22.6,2.15.53,3.84.95,4.86,2.53.79,1.23,1.12,2.76,1.47,4.39.3,1.41.62,2.87,1.25,4.28,1.26,2.8,3.79,4.96,5.59,6.33,2.74,2.09,5.8,3.17,8.43,3.96,3.63,1.08,7.26,1.72,10.78,1.92.51.03.97.04,1.38.04,2.23,0,3.99-.4,5.53-1.27.05.02.11.04.16.06,1.38.58,3.14,2.03,3.7,2.54.42.38.96.58,1.52.58.14,0,.28-.01.47-.05.16-.03.29-.08.44-.14.83-.37,1.36-1.19,1.35-2.09,0-1.36-.19-2.77-.53-4.15,2.08.53,4.24,1.07,6.47,1.35,2.64.32,4.81.47,6.82.47.44,0,.88,0,1.32-.02,2.7-.09,4.91-.67,6.73-1.75,1.23.57,2.72,1.8,3.21,2.24.41.38.95.58,1.51.58.14,0,.29-.01.42-.04.16-.03.31-.08.48-.15.82-.36,1.34-1.17,1.33-2.06-.02-2.78-.81-5.73-2.14-8.04,1.45-.17,2.67-.61,3.7-1.33.63.53,1.36,1.36,1.75,1.86.4.53,1.01.83,1.66.83.18,0,.37-.02.53-.07.2-.05.38-.13.58-.25.64-.4,1.03-1.14,1.03-1.92-.01-3.24-.78-6.66-2-9.02-.04-4.01-1.53-8.18-4.21-11.77-1.01-1.35-2.22-2.6-3.52-3.63-.54-1.78-1.5-4.21-3.59-5.82-1.47-1.13-3.25-1.75-5.6-1.96-1.19-.11-2.37-.11-3.5-.11-.86,0-1.75,0-2.59-.05-2.31-.14-4.38-.69-6.14-1.65-.61-.33-1.21-.68-1.82-1.02l-.05-.03c-2.09-1.2-4.25-2.43-6.72-3.21l-.55-.17c-1.06-.33-2.07-.64-2.98-1.14-.96-.52-1.89-1.25-2.85-2.22-1.48-1.49-2.69-3.49-3.51-5.78-.27-.75-.54-1.63-.52-2.48.03-.98.38-2.07.73-3.15l.03-.09c.12-.37.26-.75.4-1.14l.04-.11c.61-1.69,1.3-3.61,1.1-5.66-.02-.17-.06-.33-.1-.48.02-.07.04-.14.06-.21l.04-.13c.38-1.27.59-2.4.67-3.46.04-.66-.02-1.3-.08-1.86-.03-.31-.06-.61-.07-.87-.05-1.44-.05-2.93-.05-4.26,0-6.82.08-15.8.82-24.78.63-7.65,1.41-15.44,2.17-22.97l.02-.17.14-1.38.15-1.5c.31-3.15.64-6.41,1.19-9.56.12-.66.27-1.32.43-1.96.16-.67.34-1.42.47-2.19.36-2.03.64-4.22.87-6.69.19-2.07.3-4.14.4-6.14v-.15c1.63-.62,2.98-1.3,4.21-2.12.47-.31.93-.65,1.4-1.03,1.36,1.79,2.63,3.67,3.86,5.48,1.98,2.92,4.02,5.93,6.44,8.68,1.76,2,3.99,3.47,6.14,4.9.46.3.92.61,1.37.92,1.11.76,2.24,1.59,3.23,2.32,1.52,1.11,3.09,2.26,4.74,3.32,5.97,3.79,12.37,6.89,18.58,9.89,5.37,2.6,10.92,5.28,16.09,8.38,2.43,1.46,5.21,3.2,7.46,5.33,1.92,1.83,3.53,4.07,5.14,6.4,3.38,4.9,7.21,9.87,12.43,16.12.94,1.12,1.88,2.25,2.82,3.36l.06.07.39.46c.29.34.6.68.93,1.04.64.69,1.3,1.4,1.6,2.02.43.91.6,1.88.46,2.75-.07.45-.24.97-.44,1.55-.15.46-.31.94-.43,1.45-1.26,5.25-1.45,10.76-.57,16.39.2,1.27.69,2.3,1.14,3.23.18.37.35.72.49,1.08.69,1.7,1.13,3.63,1.32,5.74.23,2.62,0,5.42-.24,8.16-.08.95-.17,1.93-.23,2.9-.01.21-.03.41-.05.65-.07.93-.14,1.88-.06,2.88-.03.1-.11.31-.26.69-.08.2-.15.38-.2.53l-.11.3c-.27.28-.46.6-.61.84-.1.16-.25.41-.35.5-.27.23-.97.4-1.26.42-.89.08-1.61.73-1.81,1.62,0,.04-.02.1-.03.18,0,.07-.01.13-.02.22-.02.54.13,1.08.44,1.52,1.62,2.31,3.46,3.77,5.17,4.12.01.64.03,1.26.05,1.88.02.65.05,1.26.09,1.84-.26.12-.81.26-1.59.26-.14,0-.25,0-.26,0-.04,0-.12,0-.16,0-.78,0-1.5.45-1.86,1.2-.06.11-.1.24-.13.33-.18.59-.13,1.24.15,1.79,1.5,2.97,3.74,5.14,5.89,5.74.99.93,2.06,1.75,3.17,2.43,1.58.98,3.41,1.46,5.59,1.46.81,0,1.69-.07,2.7-.2.22-.03.44-.06.66-.1.69.27,1.35.43,1.86.54.78.16,1.58.25,2.39.25,2.07,0,4.18-.54,6.1-1.57,2.61-1.39,4.78-3.64,6.11-6.33.19-.38.36-.79.52-1.28.04,0,.08,0,.12,0,2.75-.1,8.46-.3,10.25-4.6.83-2.01.89-4.23.94-6.18v-.1c.05-1.64,0-3.41-.15-5.41-.04-.51.02-.83.14-1.54l.04-.22c.39-2.36.77-4.84,1.11-7.37.73-5.37,1.05-10.84.99-16.71-.02-2.43-.1-4.88-.16-7.04v-.16s0-.11,0-.11c-.04-1.51-.09-2.93.2-4.34.07-.36.15-.72.23-1.08l.06-.3c.45-2.05.91-4.16.96-6.41.07-2.81-.93-5.13-1.88-7.08-.64-1.31-1.3-2.64-1.94-3.91l-.07-.15c-1.54-3.08-3.14-6.25-4.46-9.49-.36-.89-.65-1.64-.91-2.36-1.34-3.76-2.1-7.83-2.85-11.79-.19-1.01-.38-2.02-.58-3.03-1-5.04-2.23-10.41-4.42-15.51-1.24-2.88-3.01-5.33-4.73-7.69l-.04-.05c-.51-.71-1.05-1.45-1.55-2.18-1.96-2.84-3.93-5.84-5.67-8.49l-1.46-2.21-.86-1.31c-5-7.59-10.17-15.44-15.99-22.65-1.39-1.73-2.68-3.21-3.95-4.54-.13-.14-.27-.26-.39-.36,0-.43-.01-.86-.02-1.29-.04-2.4-.13-4.85-.26-7.28-.08-1.39-.18-2.81-.3-4.23-.06-.7-.13-1.4-.21-2.09-.01-.1-.03-.22-.07-.38,1.77-3.61,3.53-7.27,5.38-11.18l1.03-2.17c1.77-3.72,3.6-7.56,5.14-11.49.69-.98,1.3-2.03,1.86-3.2.19-.41.39-.82.58-1.23.7-1.5,1.42-3.04,2.27-4.48.74-1.26,1.65-2.48,2.88-3.82.29-.19.6-.39.91-.61.44-.09.83-.33,1.11-.69.16-.2.32-.4.53-.62.16-.15.3-.3.43-.44,1.7-1.56,3.59-1.81,5.77-2.1.66-.09,1.26-.17,1.87-.28,1.04-.19,2.09-.4,3.12-.63,1.81-.12,3.6-.45,4.01-.53.06,0,.12,0,.18-.02.25-.05.51-.12.78-.18l.07-.02c1.22-.29,2.73-.65,3.99-.65,1.82,0,1.98.69,2.1,1.25.22,1.03,1.12,1.74,2.18,1.74.79,0,1.53-.42,1.93-1.09.84-1.41,1.97-2.79,3.18-4.26,1.39-1.7,2.82-3.44,3.91-5.37.29.16.62.25.96.25.83,0,1.57-.52,1.85-1.29.98-2.66,1.32-5.39,1.53-7.71.02-.25.04-.51.06-.77h.01c.08,0,.15,0,.19,0,1.26.03,2.42.68,3.18,1.23.34.24.74.37,1.15.37.59,0,1.15-.26,1.53-.72.39-.47.55-1.07.44-1.68-.33-1.71.11-3.55.57-5.5h0c.24.09.5.15.78.15.86,0,1.63-.55,1.92-1.36l.06-.19c.34-.97.72-2.04,1.03-3.16.03,0,.06,0,.09,0,1.02,0,1.87-.76,1.97-1.78.07-.7.17-1.43.27-2.13v-.06c.25-1.72.5-3.49.39-5.36-.02-.39-.07-.78-.14-1.17.72.09,1.39.12,1.95.14.86,0,1.62-.55,1.91-1.36.18-.5.15-1.04-.06-1.51.08-.11.14-.23.2-.35.32-.74.18-1.59-.37-2.18-.9-.96-1.83-1.87-2.76-2.75.39.18.74.39,1.04.68.37.36.86.55,1.37.55.67,0,1.29-.34,1.65-.9.37-.57.43-1.27.16-1.89-.82-1.89-2.08-3.24-3.47-4.31.7-.04,1.34-.46,1.66-1.09.34-.66.28-1.46-.17-2.06-.69-.94-1.37-1.78-2.08-2.56-.03-.16-.09-.33-.16-.49-.78-1.6-1.85-3.11-3.31-4.66.52-.05,1.06-.13,1.63-.23.98-.17,1.68-1,1.67-2-.02-1-.78-1.85-1.77-1.99-3.01-.38-6.11-2.42-8.37-5.49,1.79-3.44,4.52-6.54,6.93-9.3,1.9-2.17,3.28-4.6,4.12-7.22.36-1.13.6-2.27.83-3.38.23-1.05.44-2.05.74-3,.42-1.33,1.26-2.66,2.07-3.95l.05-.08c.24-.39.49-.78.72-1.16,1.09-1.81,2.44-4.23,3.28-6.93.37-1.19.6-2.48.71-3.84.05-.67-.02-1.3-.08-1.88Z"/> <g> <g> <path d="M132.19,406.3s0,0,0,0c0,0,0,0,0,0h.02ZM730.35,314.1c-.66-1.36-1.34-2.73-2.01-4.05-1.56-3.1-3.17-6.3-4.49-9.56-.37-.91-.66-1.67-.92-2.4-1.36-3.83-2.14-7.94-2.89-11.92-.19-1.01-.38-2.01-.58-3.02-.99-5-2.21-10.32-4.37-15.34-1.2-2.79-2.94-5.19-4.63-7.52-.53-.73-1.08-1.49-1.6-2.24-1.94-2.8-3.84-5.7-5.68-8.5l-1.45-2.21-.86-1.3c-4.99-7.57-10.15-15.41-15.95-22.59-1.38-1.71-2.65-3.17-3.9-4.48-.14-.15-.3-.28-.43-.39-.06-.05-.14-.12-.2-.17,0-.56-.01-1.12-.02-1.68-.04-2.38-.13-4.82-.26-7.25-.08-1.37-.18-2.79-.3-4.2-.06-.69-.13-1.39-.21-2.08-.01-.1-.04-.25-.08-.41-.01-.05-.03-.11-.04-.16,1.79-3.65,3.6-7.39,5.52-11.45.34-.72.69-1.44,1.03-2.17,2.03-4.26,4.13-8.67,5.78-13.18.14-.39.09-.8-.14-1.13-.24-.33-.63-.53-1.04-.53-.47,0-.88.24-1.1.63l-12.53,5.53.05-.16.08-.27.06-.22.08-.27.04-.14.13-.45.04-.16.1-.35.05-.19.06-.22.02-.07.16-.56.08-.28.02-.06.2-.74.03-.09.05-.19.17-.64.06-.21.04-.15s.01-.04.01-.05l.26-.96.03-.11c.09-.35.18-.7.27-1.03l.03-.09.18-.69.11-.42s.01-.05.01-.05l.3-1.17.3-1.2.07-.28.23-.94.29-1.21c1.44-6.06,3.08-13.91,2.74-16.85-.62-5.31-13.89-28.92-15.6-30.98-1.13-1.35-15.63-12.61-25.22-19.71l-.2-.15-.27-.2-.31-.23-.19-.14-.2-.15-.08-.06-.23-.17-.16-.12-.14-.11-.14-.1-.42-.31-.53-.38-.13-.09-.18-.13-.12-.09-.2-.14-.33-.24-.29-.21-.39-.28-.31-.22-.16-.12c-.09-.07-.19-.13-.28-.2l-.31-.22-.16-.11-.13-.09-.09-.07-.22-.16-.25-.18-.06-.04-.45-.31-.08-.06-.13-.09-.11-.08-.22-.15-.21-.14-.14-.09-.22-.15-.08-.05-.07-.05c-.16-.11-.31-.21-.46-.32l-.06-.04-.09-.06c-.11-.07-.21-.14-.31-.2l-.11-.07-.07-.05-.09-.06-.23-.15-.06-.04s-.04-.03-.04-.03l-.3-.19-.09-.06s-.04-.02-.04-.02l-.09-.05-.05-.03-.22-.14-.05-.03-.05-.03c-.1-.06-.21-.13-.32-.19,0,0-.05-.03-.05-.03l-.28-.17-.09-.05c-.07-.04-.15-.08-.19-.11l-.1-.05c-.09-.05-.17-.09-.27-.14-.09-.04-.16-.07-.23-.1l-.07-.03c-.07-.03-.13-.05-.19-.06-.01,0-.07-.02-.09-.02-.13-.03-.24-.04-.35-.04-.23,0-.68,0-9.3,1.59,4.33-6.33,14.16-22.27,14.16-24.53s-6.85-21.98-7.89-23.37c-.78-1.04-8.27-8.39-11.79-11.82-.02-.06-.04-.11-.06-.17-.19-.43-.6-.71-1.07-.71-.1,0-.21.01-.31.04-3.46.95-6.39,2.71-9.22,4.42-1.54.93-3.13,1.89-4.78,2.7-1.61.79-3.62,1.16-6.31,1.16-1.37,0-2.81-.09-4.08-.18h-.08c-1.39-.09-2.7-.18-3.98-.18-.12,0-.24,0-.35,0-6.3.08-11.9.58-17.12,1.54-5.01.92-9.38,2.78-13.77,5.84-3.3,2.31-6.66,5.18-10.59,9.03l-.13.13c-1.31,1.29-2.18,2.14-3.67,3.1-3.94,2.53-8.08,5.08-12.29,7.6-.82.49-1.64.99-2.46,1.49-4.22,2.56-8.58,5.21-13.12,6.85-5.04,1.83-11.01,2.72-18.24,2.72-4.95,0-9.96-.42-14.21-.82-5.19-.5-10.45-1.34-15.53-2.15-2.54-.41-5.17-.83-7.75-1.2-25.68-3.7-52.92-6.22-80.97-7.5-8.25-.38-14.96-.61-21.06-.74-.11-.05-.21-.09-.28-.12-.05-.02-.1-.03-.12-.04-.77-.36-1.57-.66-2.33-.93-.19-.07-.39-.14-.59-.21-.07-.35-.32-.64-.67-.76-3.95-1.32-9.54-2.8-16.61-4.39-16.06-3.6-31.84-3.88-36.29-3.88-.97,0-1.5.01-1.51.01-21.85.66-43.02,4.63-62.92,11.79-31.07,11.18-56.5,30.78-71.62,55.18-4.13,6.67-7.64,13.81-10.73,21.82-1.02,2.6-1.99,5.27-2.89,7.94-5.37,16.01-8.34,32.88-11.22,49.19-.74,4.21-1.48,8.43-2.21,12.64-.48,2.75-.95,5.5-1.43,8.25l-.06.33c-.25,1.46-.52,2.96-.81,4.44l-.03.15-.04.17c-.02.1-.05.2-.07.3-.07.29-.14.58-.22.87l-.05.2-.04.15c-.09.33-.18.67-.27.99l-.03.1-.02.07c-.11.38-.22.75-.33,1.12l-.04.14-.05.15c-.09.28-.18.55-.27.83l-.11.33c-.1.28-.19.56-.3.84l-.02.06-.06.16c-.13.35-.26.69-.4,1.02l-.04.1-.05.11c-.11.26-.22.51-.34.77l-.11.24-.02.05c-.11.23-.22.46-.34.69l-.03.06c-.03.06-.06.12-.09.18-.15.3-.31.59-.47.86l-.04.06-.04.07c-.14.23-.28.46-.43.69-.05.07-.1.15-.16.24-.13.18-.26.36-.39.54-.05.07-.1.14-.16.21-.21.27-.39.48-.56.67-.15.16-.24.37-.25.58-.27.3-.54.59-.82.88-2.99,3.18-5.84,5.8-8.24,7.57-6.28,4.65-16.58,8.09-22.11,9.94-1.45.48-2.59.86-3.37,1.16-1.24.48-2.21,1.16-2.98,2.08-.16.19-.24.43-.23.67-.01.02-.03.03-.04.05-1.3,1.56-1.88,3.58-2.39,5.36l-.05.17-.26.89c-.75,2.59-1.52,5.26-1.91,7.99-.37,2.52-.48,5.24-.37,8.57.06,1.84.21,3.66.43,5.41.05.4-.08.89-.22,1.41-.07.24-.13.48-.18.72-.37,1.75-.75,3.49-1.13,5.24l-.45,2.05c-.96,4.37-1.94,8.88-2.79,13.37-3.98.78-8.14,1.17-12.37,1.17-7.35,0-14.73-1.15-21.94-3.43-6.09-1.92-20.75-7.77-25.32-20.64-.69-1.96-1.39-4.87-.78-7.57.39-1.69,1.58-3.08,2.76-4.35,1.61-1.72,3.04-3.3,4.22-5.15l.16-.25c.54-.84,1.1-1.72,1.48-2.77.17-.49.31-.98.45-1.46l.1-.36c.02-.06.04-.12.07-.19.11-.28.25-.67.21-1.1-.21-2.49-1.1-6.87-4.67-8.14-.53-.19-1.12-.29-1.76-.29-1.3,0-2.61.39-3.61.73-2.06.7-4.1,1.84-6.23,3.49-9.64,7.43-11.37,20.64-9.92,29.7,1.58,9.88,7.35,19.54,15.83,26.5,6.85,5.62,15.65,9.95,27.7,13.61,8.65,2.62,18.29,4.05,30.24,4.47-.54,4.77-1.13,10.79-1.25,16.85-.07,3.56.05,7.03.36,10.3.13,1.32.28,2.66.42,3.95.25,2.26.52,4.59.66,6.89.09,1.46.09,2.94.1,4.5.03,4.66.05,9.47,2.29,13.76.12.23.31.4.53.5.05.12.11.22.2.32.98,1.13,2.01,2.05,3.13,2.83.57.39,1.16.72,1.75.97.35.15.7.28,1.05.4.17.05.35.08.54.12.09.02.23.04.34.07,1.04,2.07,2.56,4.08,4.62,6.14,3.06,3.04,7.33,3.4,10.28,3.4,1.66,0,3.27-.12,4.84-.24l.31-.02c.8-.06,1.6-.11,2.41-.16,1.72-.1,3.49-.21,5.24-.44,1.14,1.09,2.05,2.29,2.07,2.31.26.34.67.55,1.1.55.1,0,.19,0,.31-.04.54-.12.95-.56,1.05-1.1.24-1.3.32-2.72.23-4.12.31-.39.56-.82.75-1.28,1.6.3,3.52.59,5.43.59,2.05,0,3.77-.32,5.22-.98.83.78,1.47,1.53,1.61,1.69.26.32.65.5,1.06.5.02,0,.07,0,.09,0,.07,0,.19-.02.32-.06.51-.16.88-.59.95-1.12.21-1.51.18-3.15-.07-4.76.21-.42.39-.87.54-1.33.03,0,.05,0,.07,0,.22,0,.43-.05.63-.15.98-.49,1.85-1.06,2.6-1.69.86.68,1.77,1.74,2.22,2.32.24.32.62.51,1.02.51.02,0,.04,0,.06,0,.11,0,.22-.02.32-.06.48-.15.84-.58.9-1.09.3-2.44-.02-5.1-.84-7.21.31-.14.64-.31.95-.49.56.45,1.16,1.12,1.48,1.5.23.29.56.45.92.45.07,0,.16,0,.22-.02.1-.02.2-.05.31-.11.4-.21.66-.63.66-1.1.03-2.92-.89-6.02-2.23-7.54-.08-.09-.17-.18-.26-.27-.24-1.51-.56-2.97-.97-4.34-1.38-4.73-3.89-8.5-7.24-10.9-3.71-2.66-7.93-2.98-12.67-3.11-1.9-.05-3.74-.16-5.27-.96-1.48-.76-2.45-2.57-2.61-4.83-.1-1.42.62-3.04,1.25-4.47l.07-.15c.56-1.26,1.21-2.52,1.83-3.73.22-.43.44-.85.65-1.28.82-1.6,1.37-3.18,1.96-4.86l.06-.18c.75-2.13,1.69-4.42,2.87-7,1.45-3.17,3.05-6.33,4.6-9.39,2.74-5.42,5.58-11.01,7.69-16.87,11.64-3.54,23.49-8.75,35.24-15.48,5.52-3.17,11.03-6.76,16.37-10.66,2.84-2.08,5.29-3.97,7.5-5.79.9-.74,2.15-1.25,3.35-1.75.32-.13.64-.26.94-.39,1.64-.7,3.34-1.37,4.98-2.02l.11-.04.18-.07c2.9-1.14,5.9-2.32,8.79-3.68,2.75-1.29,5.56-2.97,8.58-5.13,4.39-3.13,8.47-6.75,12.43-10.25.77-.69,1.55-1.37,2.33-2.05,4.78-4.2,9.78-8.33,14.62-12.32l1.25-1.03c.2-.17.4-.33.61-.49,9.53,3.15,17.49,9.71,23.65,19.49,2.38,3.79,4.62,8.2,7.04,13.87.25.59.51,1.19.77,1.79,2.03,4.73,4.13,9.62,5.29,14.59.68,2.91,1,5.96,1.31,8.91.3,2.85.6,5.79,1.23,8.67.66,3.02,1.63,5.77,2.88,8.17.75,1.44,1.49,2.71,2.92,3.67,4.11,2.75,7.84,5.05,11.39,7.04,1.08.6,2.19,1.19,3.29,1.74.13.06.25.12.38.17.23.1.4.18.5.27.61.62,1.29,1.29,2.14,2.1,5.64,5.42,13.25,12.27,22.13,17.1,2.02,1.1,4.16,2,6.22,2.87.53.22,1.07.45,1.6.68l.46.2c2.76,1.18,5.61,2.41,8.43,3.59,4.71,1.97,10.57,4.42,16.43,6.15,3.02.89,6.15,1.3,9.17,1.69,2.11.27,4.28.56,6.38,1,2.01.43,3.44,1.15,4.77,2.4.23.21.45.43.68.65,1.29,1.24,2.63,2.52,4.25,3.53,3.46,2.15,7.83,2.19,11.68,2.22.46,0,.92,0,1.37.01.49,0,.98.01,1.47.01,5.61,0,10.62-.54,15.31-1.64,2.45-.58,4.85-1.37,7.15-2.37.49-.21.82-.66,1.18-1.18.05-.07.09-.13.12-.18.35-.46.72-1,1.03-1.58.08,0,.17-.03.25-.06.03,0,.06-.02.08-.03,1.92.14,4.41,1.11,4.43,1.12.16.06.33.1.51.1.25,0,.5-.07.71-.2.09-.06.18-.13.25-.2.4-.38.52-.96.33-1.48-.1-.26-.21-.52-.32-.78,0,0,.01,0,.02,0,1.51-.3,3.08-.61,4.61-1.02.57-.16.97-.66,1-1.27.02-.46.02-.94.02-1.45.04-.02.09-.04.13-.05.04-.02.08-.03.1-.04.1,0,.26,0,.55-.04.17-.02.35-.02.55-.02,1.55,0,3.41.52,3.49.54.12.03.24.05.36.05.32,0,.63-.12.88-.34.1-.09.17-.18.21-.25.28-.42.32-.96.1-1.41-.72-1.51-1.71-2.97-2.86-4.21.11-.05.22-.1.32-.18.1-.05.2-.11.3-.18.08,0,.18-.02.33-.05.15-.03.33-.04.52-.04,1.01,0,2.16.36,2.17.37.12.04.24.06.36.06.39,0,.74-.19.95-.48.06-.08.11-.16.15-.25.17-.37.18-.82.02-1.2-.96-2.26-2.37-4.31-3.89-5.62-.81-.79-1.6-1.24-2.34-1.36.02-.03.04-.06.06-.09.06-.09.1-.18.12-.25.15-.38.12-.82-.06-1.2-1.1-2.2-2.63-4.16-4.23-5.37-.92-.79-1.79-1.2-2.58-1.23l-.11-.02c-.15-.03-.29-.06-.43-.07-2.19-2.96-6.27-4.39-12.46-4.39-1.08,0-2.26.04-3.58.14-4.38.3-8.7,1.06-12.72,1.84-1.35.26-2.7.54-4.04.81l-1.73.35c-.8.16-1.6.32-2.4.47-.36.06-.71.13-1.07.19.01,0,.02,0,.01,0-.02,0-.04,0-.05,0-3.42-1.79-7-4.1-10.91-7.03-.89-.67-1.78-1.39-2.64-2.08-1.04-.85-2.12-1.72-3.24-2.53-1.66-1.2-3.45-2.16-5.17-3.09-.44-.24-.88-.47-1.31-.71-3.85-2.11-7.52-4.7-10.66-6.96l-.07-.05c-3.1-2.23-6.3-4.54-8.96-7.26-1.93-1.96-2.35-5.53-2.7-8.39l-.09-.7c-.32-2.59-.51-5.25-.69-7.82-.13-1.87-.27-3.8-.46-5.69-.29-2.96-.63-5.97-.96-8.88-.6-5.28-1.21-10.74-1.56-16.12-.19-3.04,0-6.44.6-10.64.91.4,1.81.81,2.69,1.26,2.47,1.25,4.83,2.82,7.12,4.34l.84.56c2.72,1.8,5.35,3.32,8.04,4.65,17.17,8.47,37.26,12.95,58.1,12.95,3.97,0,8-.16,11.97-.49,12.99-1.07,24.61-3.71,34.52-7.85,5.19-2.17,10.04-5.24,14.42-9.12,2.02-1.8,4.02-3.85,6.09-6.28,2.03-2.37,4.18-4.26,6.79-5.95.51-.33,1.03-.66,1.54-.99,1.78-1.13,3.61-2.3,5.33-3.66,2.49,6.21,4.45,12.16,5.98,18.16,3.77,14.76,5.38,30.3,4.81,46.21-.09,2.57-.26,5.21-.51,8.04-.01.12-.04.29-.08.48-.17.91-.36,1.93.15,2.62.39.53.8,1.1,1.33,1.87,1.25,1.81,2.81,4.07,3.42,6.42,0,.03.02.06.02.09-.07,0-.15.02-.24.02h-2.18c-.33,0-.65.16-.84.42-.15.21-.22.46-.19.7-.02.02-.03.04-.04.06-.23.33-.29.76-.15,1.13.63,1.66,2.77,2.2,4.47,2.44-.06.21-.12.41-.18.61-.64,2.06-1.24,3.59-1.75,4.44-.41.68-.95,1.02-1.64,1.02-.39,0-.68-.11-.68-.11-.12-.04-.24-.06-.36-.06-.36,0-.71.19-.89.53-.1.19-.14.4-.11.6-.08.11-.14.22-.18.36-.17.53.01,1.11.46,1.43,1.31.94,2.71,1.61,4.06,1.97-.09,0-.19.02-.28.02-.66,0-1.35-.25-2.05-.74-.17-.12-.38-.18-.58-.18-.31,0-.62.14-.81.41-.16.22-.22.48-.18.73-.07.1-.13.21-.17.34-.18.52,0,1.09.43,1.42.54.41,1.03.91,1.46,1.48.15.2.28.48.4.77.17.38.36.81.67,1.21.12.15.24.29.36.44-.02,0-.04.02-.05.03-.32.21-.49.59-.44.97-.23.31-.31.7-.22,1.08.42,1.62,1.38,3.3,2.84,5,.97,1.13,2.24,2.03,3.46,2.89,1.8,1.27,3.5,2.48,4.18,4.3.16.42.18,1.03.2,1.62.01.36.03.72.07,1.08.13,1.06.31,2.18.61,3.61.64,3.14,1.42,5.65,2.44,7.89,1.12,2.46,2.83,3.99,5.38,4.81.72.23,1.45.41,2.16.58,2.24.56,4.18,1.03,5.39,2.92.87,1.36,1.22,2.97,1.59,4.68.3,1.37.6,2.78,1.2,4.11,1.18,2.62,3.6,4.67,5.32,5.99,2.62,2,5.59,3.05,8.15,3.81,3.57,1.06,7.12,1.69,10.58,1.89.49.03.92.04,1.33.04,2.12,0,3.77-.39,5.2-1.21.08-.04.15-.09.22-.13.21.06.41.13.61.21,1.8.76,3.92,2.67,3.94,2.69.26.23.58.36.93.36.09,0,.17,0,.28-.03.09-.02.18-.04.28-.09.51-.22.83-.72.82-1.27,0-1.79-.33-3.65-.92-5.39.44.11.87.22,1.31.33,2.12.54,4.3,1.1,6.54,1.37,2.6.32,4.74.47,6.72.47.43,0,.86,0,1.28-.02,2.74-.1,4.92-.7,6.68-1.85.08.03.16.06.25.09,1.65.7,3.63,2.47,3.64,2.48.25.23.58.36.91.36.09,0,.17,0,.26-.03.1-.02.19-.04.29-.09.5-.22.81-.71.81-1.25-.02-2.85-.92-5.95-2.36-8.18.02-.22.04-.45.05-.68,1.92-.06,3.43-.55,4.61-1.51.04-.04.09-.07.13-.11,0,0,0,0,0,0,.86.52,1.99,1.81,2.46,2.42.24.31.59.49.96.49.11,0,.22-.01.3-.04.11-.03.22-.08.33-.15.38-.24.62-.69.61-1.18-.01-3.18-.79-6.59-2-8.81.02-3.89-1.41-7.95-4.04-11.47-1.03-1.37-2.26-2.62-3.58-3.63-.5-1.71-1.38-4.12-3.37-5.64-1.33-1.02-2.97-1.59-5.15-1.78-1.15-.1-2.31-.1-3.42-.1-.87,0-1.77,0-2.64-.05-2.44-.14-4.63-.73-6.51-1.76-.63-.34-1.26-.7-1.88-1.06-2.05-1.17-4.17-2.39-6.55-3.13l-.55-.17c-1.11-.34-2.15-.67-3.14-1.21-1.04-.57-2.04-1.34-3.06-2.38-1.56-1.58-2.85-3.69-3.71-6.1-.3-.83-.6-1.82-.57-2.81.03-1.1.41-2.26.77-3.38l.03-.11c.13-.42.29-.84.44-1.27.58-1.6,1.23-3.42,1.05-5.27-.02-.19-.08-.37-.14-.57.06-.2.12-.39.18-.59.36-1.21.57-2.28.63-3.27.04-.58-.02-1.15-.08-1.71-.04-.33-.07-.64-.08-.93-.05-1.46-.05-2.96-.05-4.29,0-6.84.08-15.85.82-24.85.63-7.72,1.43-15.57,2.19-23.16l.14-1.38.15-1.5c.31-3.17.64-6.46,1.2-9.63.12-.66.27-1.32.43-2.01.17-.69.34-1.41.46-2.14.35-2.01.63-4.17.86-6.62.19-2.04.3-4.1.4-6.1l.04-.73c1.82-.66,3.25-1.36,4.56-2.23.67-.45,1.33-.95,2.04-1.54,1.57,2.01,3.03,4.16,4.44,6.24,1.96,2.9,4,5.89,6.38,8.59,1.69,1.91,3.86,3.35,5.96,4.75.47.31.93.61,1.38.92,1.1.75,2.2,1.56,3.26,2.34,1.51,1.11,3.07,2.25,4.69,3.29,5.92,3.77,12.3,6.85,18.48,9.84,5.39,2.61,10.97,5.3,16.17,8.43,2.47,1.48,5.3,3.25,7.61,5.45,1.98,1.88,3.62,4.17,5.25,6.54,3.36,4.87,7.18,9.82,12.38,16.06.95,1.15,1.91,2.29,2.87,3.43l.39.46c.28.33.59.67.9,1,.69.74,1.39,1.5,1.75,2.24.51,1.06.7,2.22.54,3.27-.08.52-.27,1.08-.46,1.66-.15.46-.31.92-.42,1.41-1.23,5.14-1.42,10.54-.56,16.05.18,1.14.62,2.07,1.05,2.97.19.39.36.76.52,1.15.72,1.78,1.18,3.8,1.38,6,.24,2.7,0,5.54-.24,8.28-.08.95-.17,1.94-.23,2.9-.01.21-.03.42-.05.63-.07.95-.14,1.93-.04,2.92-.04.19-.23.67-.33.94-.08.18-.14.36-.19.5l-.12.32-.06.17c-.28.23-.46.55-.62.81-.15.25-.33.54-.53.71-.51.43-1.46.6-1.76.62-.51.04-.91.41-1.02.95,0,.03-.01.07-.02.1,0,.05,0,.1-.01.15-.02.34.08.69.28.98,1.68,2.4,3.64,3.83,5.24,3.83h.08c.01.91.03,1.79.06,2.65.03.82.07,1.57.12,2.28-.15.14-.32.27-.5.36-.45.23-1.18.36-2,.36-.18,0-.31,0-.34,0-.02,0-.06,0-.09,0-.45,0-.85.26-1.07.7-.03.07-.06.14-.08.2-.11.37-.08.79.09,1.13,1.43,2.82,3.61,4.91,5.54,5.34.99.95,2.07,1.79,3.19,2.48,1.44.89,3.12,1.33,5.13,1.33.77,0,1.61-.06,2.58-.19.29-.04.58-.09.88-.14.7.3,1.4.47,1.95.59.72.15,1.46.23,2.21.23,1.93,0,3.89-.51,5.69-1.47,2.45-1.31,4.49-3.42,5.74-5.95.24-.49.45-1.03.66-1.75,0,0,0,0,0,0,.24,0,.49-.01.73-.02,2.56-.09,7.9-.28,9.47-4.06.77-1.86.83-3.99.88-5.87v-.08c.04-1.61,0-3.35-.15-5.33-.05-.62.02-1.02.15-1.75l.04-.23c.4-2.37.77-4.84,1.11-7.35.72-5.33,1.04-10.76.98-16.59-.02-2.35-.09-4.73-.16-7.03v-.16s0-.11,0-.11c-.05-1.57-.09-3.05.22-4.54.09-.46.2-.93.3-1.39.44-2.01.89-4.09.94-6.25.06-2.62-.89-4.82-1.79-6.68Z"/> <g> <path class="cls-56" d="M730.24,317.01c-1.77-4.43-7.39-13.3-9.76-22.17-2.37-8.87-3.55-23.95-9.75-31.93-6.21-7.98-21.88-34.59-31.63-44.05,0,0,0-9.46-.88-16.56,0,0,10.05-20.4,12.41-26.9l-15.25,6.73c1.91-5.65,7.55-27.24,6.97-32.16-.59-5.03-13.89-28.68-15.37-30.45-1.48-1.77-35.18-27.79-37.25-27.79-.48,0-4.94.79-11.58,2.03,3.41-4.33,15.42-24.03,15.42-25.97,0-2.07-6.8-21.58-7.69-22.76-.89-1.18-12.12-12.12-12.12-12.12-9.16,2.37-12.42,8.87-19.81,8.28-7.39-.59-22.76-.3-31.63,2.66-8.87,2.96-20.4,15.37-20.4,15.37,0,0-15.37,10.05-26.9,15.96-11.53,5.91-34,3.84-43.46,2.36-9.46-1.48-29.27-4.73-58.53-7.39-29.27-2.66-59.72-3.25-59.72-3.25,0,0-3.25-2.07-20.4-5.91-19.07-4.27-37.54-3.84-37.54-3.84-21.29.64-42.56,4.52-62.61,11.73-28.59,10.29-54.93,28.65-71.1,54.76-16.87,27.24-20.81,58.74-26.52,89.59-1.48,7.98-2.96,22.17-8.57,28.38l.2.09c-3.38,3.71-6.75,6.92-9.66,9.08-7.98,5.91-21.88,9.75-25.72,11.23-3.84,1.48-4.14,4.73-6.21,12.12-2.07,7.39-.59,17.44-.59,17.44-3.25,15.37-5.03,21.88-6.8,35.18-1.48,12.12-3.55,26.01-2.36,38.43.59,5.03,1.18,10.05,1.18,15.37,0,4.14,0,9.46,2.07,13.3l.59.59c1.77,2.07,4.14,3.84,6.8,4.14,1.18,2.37,4.14,5.91,6.21,7.39,4.44,2.66,11.53,1.48,16.85,1.18,3.25-.3,6.5,0,7.98-2.96.15-.31.25-.69.31-1.12,2.91.57,6.6,1.09,9.74.23,3.42-1,4.91-3.09,5.35-5.65l.12.26,1.03-.22c3.34-1.77,4.97-3.8,5.27-6.78l.06-.02c.89-.29,2.07-1.18,2.96-1.48-.3-9.76-3.84-20.69-15.08-22.17-5.62-.89-13.01,1.48-14.19-6.8-.59-3.55,3.84-10.05,5.03-13.3,4.14-13.01,11.53-22.76,16.26-35.77l.16-.32.43.02c21.29-7.09,41.68-18.03,59.13-32.52,7.1-3.55,14.78-5.62,21.58-9.46,8.57-5.02,15.67-12.12,23.06-18.33,4.59-3.72,9.03-7.6,13.54-11.28.32.21.51.34.51.34,18.18,5.76,26.61,21.28,33.26,37.69,2.66,6.65,4.43,10.2,5.32,16.85.89,7.98,1.33,17.29,6.21,23.95,0,0,9.76,6.65,16.41,9.76,0,0,15.08,15.52,27.49,20.84s26.16,11.53,33.7,12.86c7.54,1.33,12.86,1.33,15.52,3.55,2.66,2.22,5.32,6.21,11.09,6.65,5.76.44,19.51,1.33,30.6-3.55,0,0,1.62-1.63,2.15-3.32l.51.22c3.55-1.33,7.54-1.77,10.64-2.66.08-2.17-.03-4.1-.33-5.8,1.73-.49,3.46-2.19,4.76-2.63-1.86-6.89-3.87-10.61-7.56-12.49-2.75-11.86-27.94-4.36-38.56-2.58,0,0-3.55-1.77-9.31-5.77-5.76-3.99-7.09-6.21-13.3-9.31-6.21-3.11-20.84-13.75-22.17-16.41-1.33-2.66-2.22-7.09-2.66-15.08-.44-7.98-3.11-29.27-3.11-33.7s.89-10.2.89-10.2l.11-.63c.46.21.92.43,1.37.63,5.62,2.37,10.05,6.21,15.37,9.16,30.75,15.96,72.43,18.92,104.95,6.8,9.46-3.55,16.55-9.16,22.76-16.56,4.73-5.32,9.16-6.21,14.19-10.64l.37-.3c9.91,23.34,13.34,51.76,10.71,76.72,0,0,2.66,3.55,3.99,6.21,1.33,2.66,1.77,4.88-.44,4.88h-2.22s.44,1.33,4.88,1.77c0,0-1.33,5.32-2.66,7.54-1.33,2.22-3.55,1.33-3.55,1.33,0,0,4.88,3.55,7.98,1.33,0,0-3.1,5.76-7.54,2.66,0,0,1.77,1.33,2.22,2.66.44,1.33,2.22,3.1,5.32,3.99,0,0-1.33,2.66-4.88,0,0,0,.89,3.55,4.43,6.21,3.55,2.66,6.21,4.43,6.21,7.09s1.77,11.97,4.43,15.08c2.66,3.1,8.42,1.77,11.09,5.32,2.66,3.55,1.77,8.87,4.88,11.97,3.1,3.1,4.88,4.88,11.08,6.65,6.21,1.77,13.75,2.66,15.96.89,0,0,4.47-2.53,6.14-5.35l-.08,1.21c3.84.89,7.09,2.07,11.23,2.37,4.14.29,10.05.89,13.01-2.96,1.49-1.78,1.85-4.31,1.62-6.87l.45.67c5.32.3,7.39-2.96,7.1-8.57-.21-4.94-3.24-10.35-7.48-13.39l.09-.21c-3.25-11.23-12.12-3.84-20.69-8.57-3.03-1.67-5.32-3.25-8.57-4.14-6.5-1.48-10.35-7.39-11.53-12.42-.89-3.79,3.25-9.46,2.07-12.12,0,0,1.18-3.25.89-4.73-.3-1.48,0-24.24.89-32.52.89-8.28,2.66-31.04,3.84-35.77,1.18-4.73,1.77-15.96,1.77-15.96l.12-.64c3.11-1.06,5.59-2.8,7.82-4.84l.04.16c4.43,5.32,7.69,11.53,12.12,16.26,3.25,2.96,7.69,5.32,11.23,8.28,13.6,9.46,29.27,14.19,42.57,23.36,4.73,3.25,7.09,7.09,10.35,11.82,5.03,7.1,10.94,13.89,16.56,20.69,0,0,1.48,2.66.59,5.03-.89,2.37-2.07,8.57-1.77,12.12.3,3.55.3,6.5,1.18,7.98.89,1.48,2.37,5.32,2.37,9.75s-.89,12.12-.59,13.3l-2.66,7.39s1.77,1.18,3.55.59c0,0,0,.13,0,.36h0s0,0,0,0c0,1.28.04,5.62.29,7.62,0,0-2.96,1.18-3.25,2.07s3.55,3.25,3.55,3.25c0,0,3.55,3.84,6.5,4.14,2.96.3,5.32-.3,5.32-.3,0,0,2.66,1.48,6.5.59,3.8-.88,7.88-4.64,8.54-8.72,0,0,.02,0,.03,0l-.02-.04s.01-.07.02-.1c0,0,7.98.29,9.76-2.66,1.77-2.96.89-12.12.89-12.12,0,0,1.48-8.28,2.07-15.08.59-6.8,0-17.44,0-20.1s2.66-8.87.89-13.3ZM78.98,315.24c-14.63,3.1-33.7.44-46.56-7.1-7.09-4.43-13.75-10.64-15.52-19.07-1.77-9.31,3.55-9.31,7.54-16.41.89-.89,1.33-3.1,1.77-4.43,0,0-.44-6.21-3.99-7.1-3.55-.89-11.53,3.11-15.52,9.76-3.99,6.65-6.65,17.29-2.22,29.27,4.43,11.97,13.3,21.29,28.82,27.94,15.52,6.65,27.49,8.42,43.01,8.87l2.66-21.73Z"/> <g> <path class="cls-105" d="M117.11,250.79c-7.98,5.91-21.88,9.75-25.72,11.23-3.84,1.48-4.14,4.73-6.21,12.12-2.07,7.39-.59,17.44-.59,17.44-3.25,15.37-5.03,21.88-6.8,35.18-1.48,12.12-3.55,26.01-2.36,38.43.59,5.03,1.18,10.05,1.18,15.37,0,4.14,0,9.46,2.07,13.3l.59.59c1.77,2.07,4.14,3.84,6.8,4.14,1.18,2.37,4.14,5.91,6.21,7.39,4.44,2.66,11.53,1.48,16.85,1.18,3.25-.3,6.5,0,7.98-2.96.15-.31.25-.69.31-1.12,2.91.57,6.6,1.09,9.74.23,3.42-1,4.91-3.09,5.35-5.65l.12.26,1.03-.22c3.34-1.77,4.97-3.8,5.27-6.78l.06-.02c.89-.29,2.07-1.18,2.96-1.48-.3-9.76-3.84-20.69-15.08-22.17-5.62-.89-13.01,1.48-14.19-6.8-.59-3.55,3.84-10.05,5.03-13.3,4.14-13.01,11.53-22.76,16.26-35.77l.16-.32.43.02c7.26-2.42,14.4-5.29,21.37-8.59-7.16-15.38-24.31-44.11-32.37-57.41-2.26,2.27-4.46,4.23-6.44,5.7Z"/> <path class="cls-13" d="M84.59,291.59c-3.25,15.37-5.03,21.88-6.8,35.18-1.48,12.12-3.55,26.01-2.36,38.43.3,2.58.61,5.16.83,7.79.34-14.71,6.54-32.6,9.41-44.51,4.39-18.28,25.33-48.99,6.35-61.17-1.18-.76-2.56-1.48-4.08-2.13-.99,1.96-1.59,4.81-2.76,8.97-2.07,7.39-.59,17.44-.59,17.44Z"/> <path class="cls-52" d="M617.02,259.37c13.6,9.46,29.27,14.19,42.57,23.36,4.73,3.25,7.09,7.09,10.35,11.82,5.03,7.1,10.94,13.89,16.56,20.69,0,0,1.48,2.66.59,5.03-.89,2.37-2.07,8.57-1.77,12.12.3,3.55.3,6.5,1.18,7.98.89,1.48,2.37,5.32,2.37,9.75s-.89,12.12-.59,13.3l-2.66,7.39s1.77,1.18,3.55.59c0,0,0,.13,0,.36h0s0,0,0,0c0,1.28.04,5.62.29,7.62,0,0-2.96,1.18-3.25,2.07s3.55,3.25,3.55,3.25c0,0,3.55,3.84,6.5,4.14,2.96.3,5.32-.3,5.32-.3,0,0,2.66,1.48,6.5.59,3.8-.88,7.88-4.64,8.54-8.72,0,0,.02,0,.03,0l-.02-.04s.01-.07.02-.1c0,0,7.98.29,9.76-2.66,1.77-2.96.89-12.12.89-12.12,0,0,1.48-8.28,2.07-15.08.59-6.8,0-17.44,0-20.1s2.66-8.87.89-13.3-7.39-13.3-9.76-22.17c-2.37-8.87-3.55-23.95-9.75-31.93-6.21-7.98-21.88-34.59-31.63-44.05,0,0,0-6.36-.49-12.56-.6-.06-1.09-.1-1.43-.15-3.1-.44-30.16,8.42-30.16,8.42l-20.84,1.33-8.87,3.1-13.75,5.32c-1.79,1.79-7.63,8.2-9.81,10.61,4.39,5.29,7.62,11.45,12.03,16.14,3.25,2.96,7.69,5.32,11.23,8.28Z"/> <path class="cls-40" d="M304.15,223.37l-22.62,3.99-20.81,16.18c12.59,7.32,19.36,20.35,24.89,34,2.66,6.65,4.43,10.2,5.32,16.85.89,7.98,1.33,17.29,6.21,23.95,0,0,9.76,6.65,16.41,9.76,0,0,15.08,15.52,27.49,20.84s26.16,11.53,33.7,12.86c7.54,1.33,12.86,1.33,15.52,3.55,2.66,2.22,5.32,6.21,11.09,6.65,5.76.44,19.51,1.33,30.6-3.55,0,0,1.62-1.63,2.15-3.32l.51.22c3.55-1.33,7.54-1.77,10.64-2.66.08-2.17-.03-4.1-.33-5.8,1.73-.49,3.46-2.19,4.76-2.63-1.86-6.89-3.87-10.61-7.56-12.49-2.75-11.86-27.94-4.36-38.56-2.58,0,0-3.55-1.77-9.31-5.77-5.76-3.99-7.09-6.21-13.3-9.31-6.21-3.11-20.84-13.75-22.17-16.41-1.33-2.66-2.22-7.09-2.66-15.08-.44-7.98-3.11-29.27-3.11-33.7s.89-10.2.89-10.2l.11-.63c.46.21.92.43,1.37.63,3.47,1.46,6.48,3.48,9.54,5.51-13.87-13.36-44.8-25.54-44.8-25.54l-15.97-5.32Z"/> <path class="cls-55" d="M612.24,367.3c-3.41,2.76.81,7.43,1.36,11.59-3.81-4.12-7.63-9.62-12.5-2.93-2.13,2.94-.52,6.14-2.12,9.16-1.07,2.03-5.21,4.49-6.52,5.92-1.72-3.24-2.47-9.56-6.17-10.62-1.98-.57-8.82,2.83-10.61,4.02-6.17,4.13-7.68,10.53-15.02,10.14,1.93,1.62,4.1,2.82,8.3,4.02,6.21,1.77,13.75,2.66,15.96.89,0,0,4.47-2.53,6.14-5.35l-.08,1.21c3.84.89,7.09,2.07,11.23,2.37,4.14.29,10.05.89,13.01-2.96,1.49-1.78,1.85-4.31,1.62-6.87l.45.67c5.32.3,7.39-2.96,7.1-8.57-.21-4.94-3.24-10.35-7.48-13.39l.07-.15c-1.89-.28-3.57-.09-4.75.86Z"/> <path class="cls-89" d="M696.6,385.66c.27-.32.51-1.19.77-1.61,3.87,2.26,14.69.34,11.39-6.15,17.61,1.43,2.8-24.34,1.91-33.34-.76-7.69,1.31-14.43-2.81-21.13-4.27-6.94-12.25-10.98-20.45-10.14l-2-.67c-.24.15-.47.3-.7.47.6.72,1.2,1.44,1.79,2.15,0,0,1.48,2.66.59,5.03-.89,2.37-2.07,8.57-1.77,12.12.3,3.55.3,6.5,1.18,7.98.89,1.48,2.37,5.32,2.37,9.75s-.89,12.12-.59,13.3l-2.66,7.39s1.77,1.18,3.55.59c0,0,0,.13,0,.36h0s0,0,0,0c0,.43,0,1.21.03,2.13.04,0,.08,0,.12,0,.54,4.14,1.1,12.59,7.3,11.76Z"/> <path class="cls-82" d="M439.39,351.99c.97,2.13.57,4.98-.87,7.07-3.35.55-6.89-.02-9.69-1.78-1.28,5.93-20.39,7.14-26.11,5.92-5.2-1.11-8.39-5.31-12.6-7.35-5.5-2.67-13.31-4.45-19.32-5.32l-25.27-11.97c-3.26,2.29-7.12,4.54-10.48,7.21,2.02,1.25,4.05,2.34,6.01,3.18,12.42,5.32,26.16,11.53,33.7,12.86,7.54,1.33,12.86,1.33,15.52,3.55,2.66,2.22,5.32,6.21,11.09,6.65,5.76.44,19.51,1.33,30.6-3.55,0,0,1.62-1.63,2.15-3.32l.51.22c3.55-1.33,7.54-1.77,10.64-2.66.08-2.17-.03-4.1-.33-5.8,1.73-.49,3.46-2.19,4.76-2.63-1.8-6.7-3.76-10.4-7.26-12.33.5,4.31,2.4,9.04-3.04,10.05Z"/> <path class="cls-68" d="M137.44,379.23c.14.88-.22,2.03-.07,2.99-1.92-2.11-4.32-1.97-6.57-.32.46,1.7.03,4.07.41,5.8-4.92-6.4-14.4-1.59-15.17,5.19-.39-9.52-16.33.1-19.94,1.55-9.88,3.96-15.53-3.13-19.49-10.94.08,3.52.44,7.39,2.04,10.37l.59.59c1.77,2.07,4.14,3.84,6.8,4.14,1.18,2.37,4.14,5.91,6.21,7.39,4.44,2.66,11.53,1.48,16.85,1.18,3.25-.3,6.5,0,7.98-2.96.15-.31.25-.69.31-1.12,2.91.57,6.6,1.09,9.74.23,3.42-1,4.91-3.09,5.35-5.65l.12.26,1.03-.22c3.34-1.77,4.97-3.8,5.27-6.78l.06-.02c.89-.29,2.07-1.18,2.96-1.48-.11-3.5-.63-7.15-1.78-10.46-.96.17-1.88.28-2.72.24Z"/> <path class="cls-83" d="M562.35,201.54c.34,20.28-9.98,37.91-8.04,63.11,1.56,20.33,3.57,35.67,5.29,54.52,1.53,16.72-4.25,43.83,8.08,51.98,5.8,3.84,17.3,8.83,24.15,5.62,7.54-3.54,7.62-14.42,14.61-17.13-3.16.02-6.66.08-10.11-1.83-3.03-1.67-5.32-3.25-8.57-4.14-6.5-1.48-10.35-7.39-11.53-12.42-.89-3.79,3.25-9.46,2.07-12.12,0,0,1.18-3.25.89-4.73-.3-1.48,0-24.24.89-32.52.26-2.43.6-6.12.97-10.23-3.56-3.86-3.68-16.53-6.04-21.59-8.4-17.94-2.76-42.83-12.64-58.53Z"/> <path class="cls-20" d="M16.9,289.08c-1.77-9.31,3.55-9.31,7.54-16.41.89-.89,1.33-3.1,1.77-4.43,0,0-.44-6.21-3.99-7.1-3.55-.89-11.53,3.11-15.52,9.76-3.99,6.65-6.65,17.29-2.22,29.27,4.43,11.97,13.3,21.29,28.82,27.94,3.05,1.31,5.97,2.43,8.81,3.39,6.66-4.58,12.08-10.15,14.13-15.63-8.63-1.14-17.08-3.75-23.83-7.71-7.09-4.43-13.75-10.64-15.52-19.07Z"/> <path class="cls-86" d="M554.34,137.86c-2.66,19.51,2.66,28.38,2.66,28.38-2.66-8.87,7.98-45.23,15.08-51.44,7.1-6.21,8.87-8.87,13.3-7.1,4.43,1.77,2.66,23.95,0,39.02-2.66,15.08-3.55,49.67-3.55,49.67l16.85,3.55s6.21-3.55,10.64-5.32c4.43-1.77,13.3-12.41,19.51-22.17,6.21-9.76,10.64-29.27,10.64-32.81s.89-23.95,0-27.49c-.41-1.62.86-6.78,2.44-12.15-6.26-4.63-11.42-8.25-12.2-8.25-.48,0-4.94.79-11.58,2.03,3.41-4.33,15.42-24.03,15.42-25.97,0-2.07-6.8-21.58-7.69-22.76-.89-1.18-12.12-12.12-12.12-12.12-9.16,2.37-12.42,8.87-19.81,8.28-3.93-.31-10.11-.38-16.38.08-7.46,12.94-17.65,38.49-20.58,53.14-3.55,17.74,0,23.95-2.66,43.46Z"/> <path class="cls-21" d="M613.76,220.34l7.1-3.55,17.74-13.3s7.1-16.85,7.98-19.51c.89-2.66,2.66-23.95,2.66-23.95l-6.21-18.62s-15.96-18.62-17.74-21.28c-1.77-2.66-21.29-7.1-24.83,0-3.55,7.09,12.42,31.04,14.19,41.68,1.77,10.64-8.87,15.08-8.87,15.08,1.77-8.87-5.32-32.81-5.32-32.81,0,0-5.32,17.74-9.76,27.49-4.43,9.76-10.64,34.59-14.19,39.02-3.55,4.43-4.44,21.28-.89,32.81,3.55,11.53,6.21,26.61,6.21,26.61l.29.09c.62-6.31,1.26-11.9,1.78-13.98,1.18-4.73,1.77-15.96,1.77-15.96l.12-.64c3.11-1.06,5.59-2.8,7.82-4.84l.04.16c.12.14.25-.43.37-.29,4.11-4.39,9.98-9.98,9.98-9.98l9.76-4.21Z"/> <path class="cls-46" d="M297.15,277.1l-10.88,2.04c2.3,5.66,3.86,9.16,4.68,15.25.89,7.98,1.33,17.29,6.21,23.95,0,0,9.76,6.65,16.41,9.76,0,0,15.08,15.52,27.49,20.84,7.42,3.18,15.32,6.68,22.08,9.26,4.34-3.01,10.96-6.2,19.16-5.71,15.08.88,36.36-7.98,36.36-7.98l-7.64-6.79c-2.84.58-5.4,1.13-7.44,1.47,0,0-3.55-1.77-9.31-5.77-5.76-3.99-7.09-6.21-13.3-9.31-6.21-3.11-20.84-13.75-22.17-16.41-1.33-2.66-2.22-7.09-2.66-15.08-.24-4.29-1.12-12.43-1.88-19.72l-26.94,1.54c-7.1,3.55-30.15,2.66-30.15,2.66Z"/> <path class="cls-73" d="M286.05,197.49c.27-5.04.18-10.1.42-15.14.24-4.97.62-9.93.92-14.89.39-6.54.76-13.22.3-19.81-9.19,21.63-17.35,45.73-23.35,54.96-11.53,17.74-26.61-11.53-29.27-20.4-2.66-8.87,0-69.18,19.51-86.91,18.53-16.85,70.67-28.89,94.86-30.82-2.97-1-8.05-2.46-16.51-4.36-19.07-4.27-37.54-3.84-37.54-3.84-21.29.64-42.56,4.52-62.61,11.73-28.59,10.29-54.93,28.65-71.1,54.76-16.87,27.24-20.81,58.74-26.52,89.59-1.48,7.98-2.96,22.17-8.57,28.38l.2.09c-3.38,3.71-6.75,6.92-9.66,9.08-7.98,5.91-21.88,9.76-25.72,11.23-1.11.43-1.92,1.01-2.56,1.79,1.14.15,13.02,1.54,26.51-2.67,14.19-4.43,26.61,21.29,17.74,26.61-7.87,4.72-17.13,42.24-13.55,54.37,4.25-10.62,10.34-19.45,14.44-30.71l.16-.32.43.02c21.29-7.09,41.68-18.03,59.13-32.52,7.1-3.55,14.78-5.62,21.58-9.46,8.57-5.03,15.67-12.12,23.06-18.33,4.59-3.72,9.03-7.6,13.54-11.28.32.22.51.34.51.34.19.06.36.12.55.18l20.3-14.38,10.14-2.25c1.17-8.32,2.25-16.64,2.7-25.04Z"/> <path class="cls-4" d="M509.55,220.34s2.75-9.25,3.56-15.36l-3.41,4.72c-.94-5.63-4.01-24.04-7.69-46.12-4.44-26.61-32.82-46.12-70.06-52.33-37.25-6.21-97.56-7.98-117.07-3.55-8.7,1.98-17.41,17.55-25.4,35.76.96,7.66.62,15.49.16,23.17-.31,5.22-.73,10.43-.96,15.65-.23,5.05-.12,10.1-.42,15.14-.48,8.24-1.54,16.42-2.69,24.59l3.59-.8,24.83,4.43s17.74,7.09,23.95,12.42c3.16,2.71,10,5.65,16.06,9.17v-.04c.46.21.92.42,1.38.63,5.62,2.37,10.05,6.21,15.37,9.17,30.75,15.96,72.43,18.92,104.95,6.8,9.46-3.55,16.55-9.16,22.76-16.55,4.66-5.24,9.03-6.18,13.96-10.44-1.12-3.76-3.2-11.55-2.87-16.46Z"/> <path class="cls-74" d="M513.03,236.3c9.91,23.34,13.34,51.76,10.71,76.72,0,0,2.66,3.55,3.99,6.21,1.33,2.66,1.77,4.88-.44,4.88h-2.22s.44,1.33,4.88,1.77c0,0-1.33,5.32-2.66,7.54-1.33,2.22-3.55,1.33-3.55,1.33,0,0,4.88,3.55,7.98,1.33,0,0-3.1,5.76-7.54,2.66,0,0,1.77,1.33,2.22,2.66.44,1.33,2.22,3.1,5.32,3.99,0,0-1.33,2.66-4.88,0,0,0,.89,3.55,4.43,6.21,3.55,2.66,6.21,4.43,6.21,7.09s1.77,11.97,4.43,15.08c1.19,1.39,3,1.89,4.87,2.33-.42-4.76,4.25-8.5,2.22-11.2-2.66-3.55.89-11.53.89-22.17s0-34.59-3.55-44.34c-3.55-9.76-1.77-27.49-1.77-40.8s-5.32-35.47-5.32-35.47c0,0-13.3,15.96-17.74,7.98-4.43-7.98-7.98-25.72-7.98-25.72l-.43.6c-.81,6.11-3.56,15.36-3.56,15.36-.33,4.91,1.76,12.7,2.87,16.46.08-.07.15-.13.23-.2l.37-.3Z"/> <path class="cls-56" d="M144.16,216.35c5.32-8.87,18.62-37.25,18.62-37.25,6.21-6.65,15.08-34.14,15.08-34.14,4.88-22.17,14.19-40.35,14.19-40.35-8.42,9.76-17.74,39.02-20.84,51-3.1,11.97-9.31,22.62-17.74,37.25-6.21,10.79-15.55,23.5-20.03,29.44-1.29,6.92-3.19,14.4-6.87,18.46l.2.09c-.43.47-.86.93-1.28,1.39,6.49-3.12,18.67-25.86,18.67-25.86Z"/> <path class="cls-3" d="M289.17,221.23l24.83,4.43s17.74,7.09,23.95,12.42c3.16,2.71,10,5.65,16.06,9.17v-.04c.46.21.92.42,1.38.63,5.62,2.37,10.05,6.21,15.37,9.17,30.75,15.96,72.43,18.92,104.95,6.8,9.46-3.55,16.55-9.16,22.76-16.55,4.66-5.24,9.03-6.18,13.96-10.44-1.07-3.61-3.03-10.93-2.9-15.85-.26-.39-.42-.61-.42-.61,0,0-5.32,5.32-20.4,21.28-15.08,15.96-55.87,22.17-86.03,17.74-30.16-4.43-68.29-31.04-81.59-40.8-13.3-9.75-32.81-13.3-32.81-13.3l-.77,1.37c-.53,5.14-1.21,10.27-1.93,15.39l3.59-.8Z"/> <path class="cls-104" d="M724.18,316.57s-12.86-7.54-15.08-8.43c-2.19-.87,11.17-3.05,13.22-7.8-.71-1.81-1.35-3.66-1.84-5.5-2.37-8.87-3.55-23.95-9.75-31.93-6.21-7.98-21.88-34.59-31.63-44.05,0,0,0-9.46-.88-16.56,0,0,10.05-20.4,12.41-26.9l-15.25,6.73c.92-2.73,2.71-9.17,4.25-15.65l-32.63,21.2,1.15,3.21s-6.65,7.32-8.65,13.97c-1.51,5.02,3.43,15.36,6.23,21.55,3.07,2.56,7.19,6.11,8.4,7.72,0,0-6.65,2-9.98,1.33,0,0-2.66,13.3-11.31,15.96-6.46,1.99-12.17,5.45-15.48,8.19,13.51,9.29,29.02,14.02,42.21,23.11,4.73,3.25,7.09,7.09,10.35,11.82,4.77,6.73,10.33,13.2,15.69,19.65l11.09,2.41s7.51,1.74,9.73,9.72c0,0,.44,9.75,3.1,10.64,2.66.89,6.65,3.1,13.75-1.77,0,0,6.65-7.98.89-18.62Z"/> <path class="cls-80" d="M639.51,204.86c2-6.65,8.65-13.97,8.65-13.97l-1.15-3.21-.84.55s-10.55,15.85-15.55,17.25c-7.1,2-13.75,7.54-13.75,7.54l-14.19,12.19s16.21-7.72,24.86-5.06c8.65,2.66,14.63,3.33,14.63,3.33,0,0,1.56,1.25,3.57,2.92-2.8-6.19-7.74-16.52-6.23-21.55Z"/> <path class="cls-111" d="M342.38,179.55c2.21-11.96,1.68-21.4-1.58-32.13-3.23-10.64-.94-23.12-4.61-33.41-11.2,7.15-19.35,22.66-23.13,35.12.35-20.48-13.29-36.12-7.25-56.42.27,4.99,3.17,10.09,5.32,14.05,1.04-8.79,3.95-32.52,17.94-30.13,6.21,1.06,10.01,8.14,16.85,8.91,7.48.85,14.42-3.49,21.29-5.12,15.33-3.63,27.61-.22,41.01,4.93,6.94,2.66,13.83.71,21.07,2.17,6.71,1.36,11.21,6.77,17.74,7.78,9.83,1.52,22.58-5.1,28.43,7.05,5.44,11.3-5.34,21.59-4.28,31.97.58,5.75,4.82,6.84,8,11.29,3.58,5.01,3.9,9.29,4.21,15.32.57,10.99.54,22.68-.18,33.61-6.87-6.41-8.35-6.3-16.68-2.57-11.45,5.13-8.35.69-13.08-8.18-3.98-7.46-7.66-6.61-14.37-10.62-9.2-5.49-11.95-7.45-14.45,5.42-2.61-6.98-3.38-18.7-13.97-13.47-9.87,4.88-7.98,16.97-20.4,16.2-10.81-.67-13.84-4.85-24.83,1.53-4.43,2.57-18.3,9.4-18.62,12.66l-4.43-15.96Z"/> <path class="cls-56" d="M143.72,235.42l-5.32,7.98c9.76,7.27.36,18.24,2.61,27.49,2.15,8.83,11.19,15.77,19.42,18.53.45-8.48,2.98-20.52,1.07-29.17-2.42-10.9-13.49-15.41-17.78-24.83ZM152,268.83c-3.68-.3-4.16-8.33-4.98-11.21,2.84,2.76,5.28,6.34,6.16,10.32l-1.18.88ZM441.93,173.54c-7.13,13.48-8.92,31.71,1.55,44.15l4.44,26.61c.23-18.77,8.86-36.58,8.87-55.92,0-20.4,3.81-40.56,3.59-60.88-5.75,15.58-10.67,31.33-18.45,46.05ZM188.06,219.46c-.57-13.22-9.53-34.7-14.19-47-.57,14.04-10.75,39.03-5.54,51.46,1.05,2.52,4.37,5.19,4.7,7.91.46,3.77-2.92,6.31-2.92,9.58,0,7.1,4.83,9.77,11.75,12.63l12.42,8.87c0-5.26-.42-14.5-2.66-21.29-2.93-8.84-3.15-12.91-3.54-22.17ZM178.31,220.05c-6.02-5.25-4.64-14.27-3.19-21.49.82,4.55,3.12,8.74,4.31,13.23.77,2.89-.61,5.94.35,8.85l-1.48-.59ZM421.31,135.91c-5.49,13.7-20.15,24.29-24.61,40.09-4.48,15.87.38,31.24,9.54,44.34l4.43,13.3c-.72-17.9,12-35.31,15.77-52.54,3.4-15.55-6.52-29.33-5.13-45.19ZM408.89,204.97l-2.07-2.66c-.99-2.72-2.45-4.32-2.07-7.39.35-2.85,2.05-5.46,2.6-8.35.67-3.5.41-7.18,1.31-10.65.95-3.66,3.45-7.14,5.42-10.25-2.09,13.11-1.26,26.8-5.2,39.29ZM215.56,152.96c-3.25-11.83-8.99-22.18-13.15-33.65,5.01,21.22-.22,40.57-7.47,62.01-4.18,12.37-4.63,18.48.87,30.35,3.97,8.58,6.27,18.93,9.11,27.3l14.19-.89c0-10.22-.04-19.59,2.86-29.27,3.06-10.21,6.77-19.38,4.04-30.15-2.3-9.08-8.02-16.91-10.44-25.7ZM215.27,194.32c-.67,5.86-4.33,11.41-4.44,17.16l-1.18-6.5c-1.59-3.75,2.2-10.42,2.37-14.79.17-4.33-1.8-7.88-2.07-12.16,2.31,4.96,6.07,9.82,5.33,16.29ZM336.22,105.37c-4.16,9.02-9.18,16.37-14.92,24.52-6.89,9.77-7.29,16.59-7.29,28.38l-1.77,34.59c.85-5.89,7.85-7.91,11.33-12.42,3.56-4.62,6.08-11.41,8.4-16.85,7.54-17.61,3.96-39.22,4.26-58.22Z"/> <path class="cls-47" d="M290.94,64.25c17.74,2.66,52.33,8.87,52.33,8.87,0,0,25.72,0,50.55.89,24.83.89,54.1,9.76,79.82,12.42,17.84,1.85,36.53-6.98,46.61-14.04-1.78.99-3.54,1.94-5.22,2.8-11.53,5.91-34,3.84-43.46,2.36-9.46-1.48-29.27-4.73-58.53-7.39-29.27-2.66-59.72-3.25-59.72-3.25,0,0-3.25-2.07-20.4-5.91-19.07-4.27-37.54-3.84-37.54-3.84-21.29.64-42.56,4.52-62.61,11.73-16.78,6.04-32.79,14.86-46.42,26.4,9.51-5.52,32.1-18.07,47.83-22.17,20.4-5.32,39.02-11.53,56.76-8.87Z"/> <path class="cls-87" d="M515.32,100.62c.64,7.26,0,14.88,0,22.17,0,7.69.36,12.68,3.77,19.33,4.35,8.5,2.82,7.52-.86,17.03-5.52,14.22-4.68,34.03-4.68,49.66v-2.66c8.36-13.8,21.54-20.37,27.73-36.36,4.98-12.87,6.48-26.53,5.77-40.8-1.39-27.72,1.15-56.38,17.69-79.18,1.19-1.63,4.43-4.73,7.26-7.99-3.56.46-6.93,1.12-9.67,2.03-8.87,2.96-20.4,15.37-20.4,15.37,0,0-15.37,10.05-26.9,15.96-.26.14-.54.26-.82.39-.35.97-.65,1.93-.88,2.86-1.98,7.87,1.32,14.5,1.99,22.17Z"/> </g> <path d="M218.22,101.5c1.48,3.55.89,5.32,1.77,9.16.89,3.84,1.77,7.1,2.66,9.46.89,2.37,2.66,6.8,2.66,8.28s2.96,14.19,2.96,14.19v-12.42c0-7.58-2.85-15.15-.89-22.47,4.43-16.56,5.62-19.51,5.62-21.29s.29-2.07-.3-5.32c-.59-3.25-2.07-1.48-.89-4.43,1.18-2.96,3.55-4.43,6.21-6.8,1.19-1.06,2.55-2.58,3.69-3.95-3.01.92-5.99,1.9-8.95,2.97-3.38,1.22-6.73,2.55-10.04,4-.02.08-.05.16-.08.24-1.18,3.25-2.66,2.66-3.55,6.5-.89,3.84-3.25,8.87-2.66,12.42.59,3.55.3,5.91,1.77,9.46ZM226.79,85.24c2.07-5.62,2.66-7.39,2.66-7.39,0,0,.3,9.76.59,12.12.29,2.37-.89,7.98-2.96,14.78-2.07,6.8-2.07,9.46-2.07,9.46,0,0-2.07-10.05-2.07-14.19s1.77-9.16,3.84-14.78ZM16.9,297.06c.35-1.23.98-2.32,1.62-3.19-.71-1.51-1.26-3.11-1.62-4.79-1.77-9.31,3.55-9.31,7.54-16.41.89-.89,1.33-3.1,1.77-4.43,0,0-.44-6.21-3.99-7.1-3.55-.89-11.53,3.11-15.52,9.76-3.99,6.65-6.65,17.29-2.22,29.27.43,1.15.9,2.28,1.41,3.39.85-.13,2.16-.28,3.47-.28,2.22,0,6.65-3.1,7.54-6.21ZM124.21,320.12c-2.66-.44-8.42-1.33-10.64-5.32-2.22-3.99-4.43-7.54-4.43-11.53s1.33-6.21-.44-7.54c-1.77-1.33-3.55-4.88-7.54-4.44-3.99.45-5.76,3.1-8.43,0-2.66-3.1-5.76-4.88-5.76-9.75s2.66-6.21,5.32-6.21,8.87,2.22,8.87,2.22c0,0-.44-2.66-1.77-4.43-1.33-1.77-1.33-3.99-5.77-2.66-4.43,1.33-5.32,3.55-7.09,1.33-.16-.2-.34-.4-.53-.59-.24.91-.5,1.88-.8,2.96-2.07,7.39-.59,17.44-.59,17.44-.27,1.29-.53,2.51-.79,3.69,1.39-.66,4.04-1.48,4.04,1.78,0,4.43,4.43,5.76,8.43,7.98,3.99,2.22,7.09,4.88,7.98,7.54.89,2.66,6.65,6.65,6.65,6.65,0,0-7.54-.89-12.42,0-4.88.89-6.21,3.1-9.31,1.33-3.1-1.77-7.98-7.54-7.98-7.54,0,0-.4-.4-.98-.95-.89,4.47-1.65,8.95-2.42,14.7-.39,3.24-.83,6.6-1.24,10.03,1.03-4.67,1.8-11.25,2.28-16.15.91,1.25,2.77,2.85,6.35,2.58,5.76-.44,7.09-.89,16.41-.89s11.97,0,15.08,2.66c2.21,1.89,5.53,5.57,7.27,7.54,2.1-4.14,4.31-8.21,6.35-12.49-2.15.18-4.71.3-6.08.07ZM147.27,292.18s-5.32-.89-8.87-2.22c-3.55-1.33-6.65-4.43-8.87-7.98-2.22-3.55-7.98-7.54-7.98-7.54,0,0,4.88,7.1,5.76,10.2.89,3.11,2.22,7.54,4.88,11.09,2.66,3.55,4.88,4.43,7.54,7.54,1.58,1.84,1.28,4.15.78,5.73,4.27-1.58,8.49-3.31,12.65-5.2-.77-1.82-1.46-3.63-1.46-3.63l-4.43-7.98ZM44.27,313.25l5,7.31s-.44,4.88-1.33,6.65c-.89,1.77-5.32,4.43-5.32,4.43,0,0,0,0,0,0,11.36,3.78,21.42,4.96,33.7,5.32l2.66-21.73c-10.59,2.25-23.51,1.47-34.71-1.99ZM140.17,208.15c.67,1.55,2.88,9.98,2.88,9.98l3.99-7.32s-1.55-5.32-2.66-7.32c-1.11-2-1.33-3.55-1.33-5.54s.22-10.2.22-10.86.89,1.55,1.77,4.66c.89,3.1,1.55,4.43,1.55,5.99s1.77,3.33,2.88,3.99c1.11.67,2,.89,2,.89l1.77-3.55s-2-2.88-3.33-4.88c-1.33-2-2.88-3.77-3.77-8.2-.89-4.43-.67-10.64-1.33-13.08-.43-1.57-.22-4.23-.48-6.28-2.92,11.52-5.03,23.31-7.12,35.09,1.03.55,1.84.9,1.84.9,0,0,.44,3.99,1.11,5.54ZM32.42,308.14c-4.18-2.61-8.21-5.85-11.18-9.78-3.97-.14-4.83,2.9-5.67,7.57-.58,3.2-3.84,3.92-6.01,4.04,4.28,6.19,10.36,11.44,18.7,15.75,1.88-.13,3.72-.28,3.72-.28,0,0,4.88-6.65,4.88-9.31,0-2.16-.87-5.19-1.2-6.26-1.11-.54-2.19-1.12-3.23-1.72ZM158.8,179.99c.44,2.22.89,7.54.89,7.54l6.21-11.75-1.33-5.1s-2.22,1.77-4.88-2.22c-2.66-3.99-2.66-7.98-3.1-12.42-.44-4.43-.89-6.65-.44-12.86.39-5.49.78-7.51.87-11.27-1.13,2.19-2.19,4.41-3.18,6.64.19,3.54.33,7.43.09,8.63-.44,2.22-3.99,7.09-3.99,9.31s-.89,7.1,2.22,12.42c3.1,5.32,6.21,8.87,6.65,11.09ZM152.14,155.6c.22-1.33,2.22-5.54,2.22-5.54,0,0,1.55,15.3,2.22,16.63.66,1.33,1.55,2.88,2.66,3.99s1.55,3.55,1.55,3.55c0,0-1.11.44-2-.44-.89-.89-3.55-3.99-4.21-5.76-.66-1.77-2.66-11.09-2.44-12.42ZM176.09,142.74c1.11,1.55,0,6.65,0,6.65l2.66-9.98s-3.77-3.99-3.99-5.1c-.22-1.11.44-5.77.89-7.1.44-1.33,3.33-5.32,3.77-5.99.44-.66,1.55-1.55,2.22-1.33.66.22,1.55,4.88,1.55,4.88l2.44-6.43s-2.44-1.33-3.55-2.44c-1.11-1.11.67-5.32,1.55-7.98.89-2.66,6.43-9.76,8.87-12.86,1.76-2.23,6.5-7.92,9.02-10.93-8.83,5.63-17.04,12.19-24.31,19.68.44,4.26.93,11,.21,14.75-1.11,5.76-3.99,10.64-4.43,13.97-.44,3.33-.22,5.99.67,6.87.89.89,1.33,1.77,2.44,3.33ZM304.24,87.02c1.18,8.87,2.96,10.35,2.37,13.6-.59,3.25-1.77,4.43-.3,8.28,1.48,3.84,3.55,10.35,3.55,10.35,0,0,.89-17.44,2.07-21.29,1.18-3.84,1.77-7.1,4.14-7.69,2.36-.59,6.8-2.07,8.28-4.73,1.48-2.66.89-1.48,4.14-6.5,3.25-5.03,5.91-7.1,5.91-9.76s-1.77-2.96,0-5.03c.67-.78,1.63-1.6,2.57-2.32-1.26-.3-2.59-.61-4.04-.93-1.23-.28-2.46-.53-3.68-.77-.82.88-1.82,2.13-1.65,2.84.3,1.18.59,4.14-1.18,7.1-1.77,2.96-.89,3.55-3.84,5.91-2.96,2.36-3.25,2.07-5.03,5.91-1.77,3.84-2.96,4.43-2.96,4.43,0,0,.3-5.03,1.18-6.5.89-1.48,2.66-1.48,4.73-6.8,2.07-5.32.59-3.84,2.36-7.39,1.77-3.55,3.55-5.32,3.55-5.32l1.44-.44c-2.11-.39-4.18-.73-6.21-1.02.1.79-.02,1.64-.84,2.05-1.77.89-2.37.59-5.62,5.03-3.25,4.43-2.96,4.43-6.21,10.05-3.25,5.62-5.91,2.07-4.73,10.94ZM386.72,209.7s-3.25,4.14-4.14,5.32c-.89,1.18-3.55,8.57-5.32,11.83-1.77,3.25-6.8,7.09-8.28,7.98-1.48.89-5.62,1.18-7.98,2.66-2.37,1.48-10.35-1.18-15.67-1.77-5.32-.59-14.19-.89-14.19-.89,0,0,11.23,6.8,14.49,9.16,3.25,2.36,9.17,4.14,9.17,4.14,0,0,.07.15.2.41.13.06.26.12.39.18,5.62,2.37,10.05,6.21,15.37,9.16,4.37,2.27,8.96,4.26,13.72,6-1.12-1.32-7.24-8.61-7.51-11.03-.3-2.66-2.66-7.98-2.66-7.98,0,0,2.37-.59,2.37-3.25s1.77-3.25,3.84-4.73c2.07-1.48,2.66-4.44,3.55-7.69.89-3.25.3-7.09.59-10.94.3-3.84,2.07-8.57,2.07-8.57ZM427.22,74.3c1.77.89,4.73,0,4.73,2.37s3.25,2.37,4.14,3.25c.89.89,4.43,9.16,5.32,12.12.89,2.96,2.36,10.64,1.77,15.96-.59,5.32,2.37-4.43,3.55-10.05,1.18-5.62,2.66-11.53,5.03-14.49,2.37-2.96,4.43-3.55,5.32-3.84.71-.24,4.45-2.18,6.97-3.25-9.02-1.39-22.33-3.31-39.7-5.11.83,1.19,1.93,2.57,2.87,3.04ZM384.06,136.98c.3,2.66,1.18,16.56-.3,18.92-1.48,2.36-2.96-8.28-2.96-9.16s0-10.35-.59-11.23c-.59-.89-.59,4.14-3.25,7.98-2.66,3.84-5.32,4.73-5.91,14.19-.59,9.46,0,17.44.89,22.76.89,5.32,4.73,23.06,4.73,23.06,0,0,1.77-10.35,1.77-15.37s.89-13.01,2.36-16.55c1.48-3.55,3.55-5.91,4.43-6.8.89-.89,3.25-1.18,6.21-15.67,2.96-14.49,3.55-13.01,5.62-20.99,2.07-7.98.89-8.87,6.5-19.81,5.62-10.94,6.5-14.49,8.57-17.15,2.07-2.66,2.96-9.46,2.96-9.46,0,0-3.84,8.57-8.28,12.42-4.43,3.84-8.57,8.87-12.71,15.37-4.14,6.5-8.57,15.37-9.76,17.15-1.18,1.77-.59,7.69-.3,10.35ZM480.14,125.45c1.48-2.96,3.84-5.91,5.32-8.28,1.48-2.36.3.3,5.32-7.69,5.03-7.98,1.77-7.1,7.39-10.05,5.62-2.96,10.35-7.1,10.35-8.28s-1.77-3.84-2.96-7.69c-.86-2.81.02-4.04,1.59-5.66-3.57.75-7.49,1.13-11.45,1.27.11,1.25-.7,3.11-.49,4.98.22,1.97,1.78,2.76,2.05,4.61.21,1.42-.99,4.28-1.46,5.44-3.01,7.52-14.38,13.4-15.08,1.48-.3-5.03,1.77-3.84,3.55-6.8,1.77-2.96.89-4.43,1.18-6.5.16-1.11,1.09-2.31,2.05-3.23-1.89-.07-3.74-.18-5.49-.31-.5,2.04-1.38,5.23-2.47,7.98-1.77,4.43-3.55,3.25-4.14,9.16-.59,5.91-1.48,7.98.88,10.05,2.37,2.07,5.03,2.96,5.03,2.96,0,0-2.66,7.98-5.03,11.83-2.36,3.84-3.84,2.96-3.84,8.28s.59,8.28-.3,12.42c-.89,4.14-.89,14.19-.89,14.19,0,0,3.55-11.53,5.03-18.03,1.48-6.5,2.37-9.16,3.84-12.12ZM560.55,197.29c.29,6.5,2.37,8.28,3.84,14.19,1.48,5.91.29,7.39.29,16.26s.59,12.12.59,12.12l.89-4.73c1.77-4.73.3-10.64.59-13.3.29-2.66-1.48-12.71-2.36-19.51-.89-6.8-2.37-21.58-2.37-25.72s-2.96-6.5-5.03-11.83-1.18-13.01,1.18-23.06c2.37-10.05,2.07-19.81,2.36-24.24.3-4.43.3-5.91.89-15.08.59-9.16,7.39-17.15,10.35-21.58,2.96-4.43,3.84-2.36,7.69-6.5,3.84-4.14,4.43-5.32,10.05-13.6,5.62-8.28,8.57-11.53,11.23-15.37,1.13-1.64,2.48-4.83,3.65-7.96-1.8,1.16-3.45,2.26-5.23,2.98-.97,3.34-3.55,5.42-6.4,9.7-2.96,4.43-5.62,7.39-8.57,11.53-2.96,4.14-3.25,5.62-6.8,10.35-3.55,4.73-5.91,3.55-7.39.89-1.48-2.66,2.07-4.73,5.03-10.64,2.96-5.91,5.62-8.28,9.16-13.01,2.1-2.8,4.61-5.9,6.62-8.16-1.76-.06-3.75-.09-5.87-.06-3.8,5.89-10.63,16.53-13.76,22.11-4.14,7.39-5.62,14.19-6.21,19.81-.59,5.62-3.55,8.57-5.03,16.26-1.48,7.69-2.96,20.69-1.77,25.13,1.18,4.44-.29,13.3-.29,13.3,0,0-2.96,10.94-3.25,19.21-.3,8.28,1.48,12.71,3.84,18.62s1.77,15.37,2.07,21.88ZM535.72,121.6s0-4.14,1.48-15.08c1.48-10.94.89-8.28,1.48-14.78.59-6.5,1.48-8.57,3.25-13.01,1.77-4.44,3.55-7.98,4.43-13.89.84-5.62,2.48-9.1,3.66-13.24-4.61,3.87-8.09,7.62-8.09,7.62,0,0-.04.03-.11.07-1.04,1.89-2.98,5.57-4.03,8.5-1.48,4.14-2.37,6.21-2.66,11.53-.29,5.32.89,1.77-.89,10.64-1.77,8.87-2.07,8.57-1.18,13.6.89,5.03,2.66,18.03,2.66,18.03ZM362.19,317.01c-.89,1.48-3.55,3.25-5.32,4.43-1.77,1.18-9.46,1.18-8.57,1.48,1.77.59,7.69.59,11.23-.3,3.55-.89,6.21-1.77,8.57-2.66,2.07-.78,1.88-1.55,2.59-2.33-2.01-1.41-3.99-2.88-5.76-4.26-1.21.98-2.12,2.59-2.74,3.63ZM319.62,133.73c0-1.18-4.14,4.43-5.32,7.39-1.18,2.96-1.18,5.91-2.07,11.23-.89,5.32-2.07,9.16-3.55,10.64-1.48,1.48-2.07,7.98-2.07,7.98,0,0,0,5.03-.59,7.69-.59,2.66.89,5.32,2.96,8.57,2.07,3.25,2.07,4.73,2.66,7.09.59,2.37,2.66,6.8,2.66,6.8,0,0,.3-7.98,1.18-10.64.89-2.66.89-5.02,1.77-6.5.89-1.48,2.36-2.66,2.96-4.14.59-1.48.89-7.1.89-7.1,0,0,1.48-5.62-1.18-10.64-2.66-5.03-3.55-5.91-3.84-9.16-.29-3.25,0-7.98.59-11.23.59-3.25,2.96-6.8,2.96-7.98ZM331.44,123.97c-.3,6.21,3.84,9.76.59,13.01-3.25,3.25-3.84,3.84-5.32,5.91-1.48,2.07-1.77,7.09-1.48,11.23.3,4.14-.89,6.5.59,8.87,1.48,2.37,2.37,3.55,1.77,5.32-.59,1.77-2.66,11.83-2.66,11.83,0,0,4.14-7.1,5.03-9.46.89-2.37,3.55-5.32,4.73-7.98,1.18-2.66,3.25-7.09,2.96-8.57-.3-1.48-.3-3.84.89-14.78,1.18-10.94-1.18-14.19,1.77-17.44,2.96-3.25,3.55-7.69,3.55-7.69,0,0-.59-15.67-.89-19.22-.3-3.55-3.25-7.09-3.25-7.09,0,0-.3,6.21-1.48,9.46-1.18,3.25-.89,6.21-2.96,10.05-2.07,3.84-3.55,10.35-3.84,16.55ZM316.94,217.67c-.18.01-.28.02-.28.02.08.02.18,0,.28-.02ZM359.23,116.58c2.07-1.77,5.03-5.91,7.69-10.94,2.66-5.03,2.07-4.73,4.73-7.39,2.66-2.66,2.37-1.48,7.39-4.14,5.03-2.66,4.73-5.32,9.46-11.53,4.73-6.21,1.48-5.91,1.48-10.35,0-1.33-.24-2.63-.59-3.82-8.7-.52-16.66-.87-22.87-1.1-.96,2.37-2.29,5.87-3.44,9.65-2.07,6.8-3.55,8.57-4.43,12.42-.89,3.84-1.18,4.43-.59,9.16.59,4.73-2.66,8.57-3.84,12.12-1.18,3.55,0,10.35,0,10.35,0,0,2.96-2.66,5.03-4.44ZM373.71,84.65c1.48-3.55,3.84-4.73,5.32-7.39,1.48-2.66,2.07-5.32,2.07-5.32,0,0,.59,5.03.59,7.69s-.59,3.25-1.18,6.21c-.59,2.96-5.32,4.43-5.91,5.32l-3.55,4.14s1.18-7.1,2.66-10.64ZM321.09,274.44c2.07.3,2.37,1.77,4.73,3.25,2.37,1.48,4.43,3.25,5.32,3.84,0,0,3.25-1.18,5.03-1.48,1.77-.3,4.73-1.48,7.39-1.77,2.66-.3,7.98,0,10.35.29.27.03.58.03.93,0-.86-8.28-1.82-16.99-1.82-19.65,0-.04,0-.07,0-.1-.87.51-1.78,1.16-2.07,1.73-.59,1.18-6.5,6.21-8.57,7.69-2.07,1.48-5.62,2.07-9.46,2.07s-5.62,2.07-7.69,2.66c-2.07.59-6.21,1.18-4.14,1.48ZM331.44,258.18c5.03-2.36,2.96-2.96,4.73-4.14,1.77-1.18,2.66-1.77.59-1.77s-6.8.89-8.28,1.18c-1.48.29-6.5,1.77-10.94,1.18-4.43-.59-.89-2.07-4.73-3.84-3.84-1.77-6.21-2.96-9.46-4.14-3.25-1.18-7.39,1.18-9.46,2.37-2.07,1.18-6.21,2.07-7.69,1.77,0,0,5.32,2.36,9.16,3.25,3.84.89,5.62.3,10.05-.3,4.43-.59,5.62.59,8.28.89,2.66.29,4.43,4.14,6.8,5.03,2.37.89,5.91.89,10.94-1.48ZM334.85,186.45c-.25,2.72-.28,2.84,1.58,5.25,1.69,2.19,4.5,5.22,3.29,8.25-1.18,2.95-2.07,5.03-4.14,5.62-2.07.59-2.96.29-5.91.89-2.96.59-5.91.89-6.8,2.96-.84,1.95-4.3,7.84-5.93,8.26,1.13-.07,5.48-.36,8.3-.87,3.25-.59,5.32-2.07,9.16-.59,3.84,1.48,7.09-.89,7.09-.89,0,0,.59-4.43,1.18-5.62.59-1.18,4.73-4.43,7.39-4.14,2.66.29,4.14-3.25,4.14-3.25,0,0-1.48-3.25-2.07-8.87-.59-5.62-1.18-8.28-1.18-12.12s1.48-6.21,1.18-10.94c-.3-4.73.29-7.39-.59-10.05-.89-2.66-.89-5.91-.89-5.91,0,0-1.48,5.62-3.55,9.16-2.07,3.55-3.55,5.62-6.8,10.35-2.52,3.67-5.06,8.14-5.46,12.52ZM521.23,89.09c.59-5.32-.59-3.25,2.37-12.42.92-2.86,1.7-5.4,2.33-7.54-2.39,1.41-4.85,2.81-7.24,4.12-.14.53-.27,1.08-.41,1.65-1.77,7.39-1.77,8.57-2.07,15.37-.29,6.8,1.18,7.1-1.48,12.42-2.66,5.32-8.57,17.74-8.57,22.17,0,0,.89-4.73,5.32-11.83,4.43-7.1,6.5-7.69,7.69-12.71,1.18-5.03,1.48-5.91,2.07-11.23ZM542.52,284.79c3.25-1.77,8.87-9.46,8.87-9.46,0,0,.89,1.48.3-6.21-.59-7.69-.59-12.71-1.77-15.96-1.18-3.25-2.07-10.35-2.07-10.35,0,0-.3,12.12,0,19.81.29,7.69,1.77,11.82,0,13.89-1.77,2.07-7.69,6.21-7.69,6.21,0,0-2.07,4.14-5.32,6.21-1.97,1.25-6.84,1.31-10.4,1.17.1,2.25.15,4.49.16,6.73,2.48-.82,5.46-1.95,7.28-3.17,3.55-2.36,7.39-7.09,10.64-8.87ZM580.65,221.82c-4.14-5.32-6.21-5.91-7.39-12.12s0-7.69-.89-12.42c-.89-4.73-2.36-11.24-3.25-15.37-.89-4.14-2.96-11.83-2.96-11.83,0,0,1.18,14.78,2.96,24.83,1.77,10.05,2.07,13.6,3.25,18.03,1.18,4.44,5.62,12.12,6.8,13.6,1.18,1.48,2.96,10.05,2.96,10.05l3.18,8.81c.24-2.96.36-5.26.36-5.26l.12-.64c1.01-.35,1.95-.77,2.85-1.25-1.26-2.96-2.67-6.38-3.27-8.17-1.18-3.55-.59-2.96-4.73-8.28ZM547.54,173.64s-3.55,5.03-4.73,11.53c-1.18,6.5,0,11.23-2.96,16.26-2.96,5.03-.89,19.51-3.25,31.04-2.37,11.53,1.48,13.01-.59,19.21-2.07,6.21-5.03,13.01-5.03,13.01,0,0,5.32-8.87,6.8-12.42,1.48-3.55.3-7.69,2.07-18.03,1.77-10.35,2.66-18.62,2.37-24.54-.3-5.91,0-10.35,1.48-13.01,1.48-2.66,3.84-23.06,3.84-23.06ZM535.13,173.64c5.62-14.19,7.69-17.15,10.05-25.72,2.36-8.57,4.44-25.42,4.14-26.31-.3-.89-2.37,8.87-5.62,17.44-3.25,8.57-3.84,11.23-7.68,17.44s-4.73,3.25-5.91,11.82c-1.18,8.57-3.84,13.6-3.84,22.47s.3,8.57-2.66,12.42c-2.96,3.84-4.73,5.62-5.62,10.05-.89,4.44-4.43,9.76-3.55,14.49,0,0,.59-5.03,4.14-8.87,3.55-3.84,2.66-5.32,4.73-9.76,2.07-4.43,3.55-5.62,4.73-10.94,1.18-5.32,1.48-10.35,7.09-24.54ZM590.7,81.99c3.84-9.76,5.32-12.42,9.76-18.92,4.43-6.5,3.84-5.62,7.39-10.35,3.55-4.73.59-4.43,5.03-6.21,4.43-1.77,6.8-3.55,6.8-3.55,0,0-1.18-2.66-2.07-3.84-.89-1.18-2.96.3-2.96.3,0,0-5.32,4.14-7.98,9.16-2.66,5.03-4.73,10.64-9.17,15.67-4.43,5.03-7.09,7.69-8.57,11.53-1.48,3.84-2.96,5.32-3.25,11.53-.3,6.21-1.48,14.78-3.84,16.85,0,0,6.21-4.44,6.8-8.87.59-4.43-1.77-3.55,2.07-13.3ZM567.65,310.21c-2.36,2.36-6.8,6.21-7.69,6.21s.59,2.66.3,5.03c-.3,2.37-5.62,2.37-10.64,2.07s-5.32-.3-7.98-3.25c-2.66-2.96-3.84-2.36-6.5-2.36-1.72,0-5.53.62-8.02,1.05.23.4.44.79.63,1.16.1.2.19.4.28.59,7.1-2.7,12.2-.83,10.06,1.03-1.18,1.03-5.41,1.91-9.38,2.54-.21.45-.65.71-1.41.71h-2.22s.43,1.27,4.59,1.74c2.77-.9,6.13-1.98,8.71-2.63,4.73-1.18,3.84,0,5.91,1.18,2.07,1.18,8.87,3.55,13.01,3.55s2.66-2.96,4.73-4.44c2.07-1.48,3.84-4.14,5.03-6.8,1.18-2.66,1.48-5.32,4.14-6.5,2.66-1.18,2.07-7.09,2.07-7.09,0,0-3.25,3.84-5.62,6.21ZM716.61,276.76c-.51-2.01-1.08-3.98-1.75-5.86-.04.04-3.85,4.14-5.32,5.32-1.48,1.18-2.96-.29-3.84-.59-.52-.17-2.26.57-4.38,1.69-1.5.79-3.19,1.77-4.78,2.75-3.84,2.37-8.87,7.69-8.87,7.69,13.3-10.05,17.44-9.16,20.99-9.46,2.27-.19,5.74-.98,7.96-1.53ZM601.64,206.45c.3-5.32-.89-14.49.89-18.33,1.77-3.84,5.62-3.84,4.73-12.42-.89-8.57-.89-9.17-2.07-15.08-1.18-5.91-.59-3.55-3.25-11.23-2.66-7.69-4.73-17.15-4.73-17.15,0,0-.59,7.98.59,13.3,0,0,1.48,4.14,3.55,9.16,2.07,5.03,2.36,5.03,2.66,10.35.3,5.32,2.96,8.57,0,13.6-2.96,5.03-3.55,8.57-3.55,8.57,0,0-4.14-5.91-5.62-9.16-1.48-3.25-2.07-4.43-2.07-9.46v-16.26s-3.25,11.82-3.25,16.55.89,8.57,2.37,12.71c1.48,4.14,2.66,4.14,2.66,12.42s0,13.6,1.77,16.56c1.77,2.95,3.25,5.91,2.96,10.05-.29,4.14-1.48,9.75-1.48,9.75l5.03-5.32s-1.48-13.3-1.18-18.62ZM718.78,286.96l-2.44,1.68s-2.37,4.43-3.55,5.03c-1.18.59-6.21.59-10.94,0-4.73-.59-5.32.59-5.32.59l-5.91,3.25s5.62-1.18,8.28-2.07c2.66-.89,7.39-.29,11.23,0,3.84.29,3.25-1.18,6.5-3.55.96-.7,1.94-1.11,2.85-1.37-.24-1.14-.47-2.33-.71-3.56ZM692.69,261.44c2.36-2.07,3.55-6.8,3.55-6.8,0,0-2.96,4.14-5.32,5.03-2.36.89-6.5,3.55-6.5,3.55,0,0-2.36,2.07-3.25,4.44-.89,2.36-.89,4.73-2.66,6.8-1.77,2.07-6.21,7.09-6.21,7.09.59-.3,11.23-5.62,13.6-6.8,2.37-1.18,2.37-3.84,2.95-7.69.59-3.84,1.48-3.55,3.84-5.62ZM659.88,234.83c4.14-.29,6.21-1.48,10.05-3.55,3.84-2.07,5.91-3.55,10.05-4.73,1.51-.43,3.52-.47,5.47-.34-.28-.36-.55-.71-.83-1.06-.45-.02-.91-.05-1.4-.08-5.03-.3-11.23,4.43-13.3,4.73-2.07.3-6.5,1.18-9.76,2.37-3.25,1.18-7.98,2.07-14.49.59-6.5-1.48-8.57-.89-8.57-.89,2.36.89.89,3.84.59,7.69-.3,3.84-5.02,7.39-6.8,7.69-1.77.29-4.14.29-11.23.89-7.09.59-7.09,2.66-9.46,2.66s-7.09-3.55-7.09-3.55l-.16.47c.9,1.18,1.83,2.31,2.82,3.37,3.25,2.96,7.69,5.32,11.23,8.28,1.47,1.02,2.97,1.99,4.48,2.91.4.1.78.21,1.13.34,4.14,1.48,10.35-.3,12.42-4.44,2.07-4.14.59-5.32,2.96-7.09,2.36-1.77,3.84-3.55,4.73-6.5.89-2.96,2.66-5.91,4.14-7.98,1.48-2.07,8.87-1.48,13.01-1.77ZM668.45,280.65c2.66-.59,6.5-4.14,8.28-7.69,1.77-3.55-1.18-4.44-1.48-7.39s1.77-1.48,8.28-6.5,5.32-6.5,6.8-10.05c1.48-3.55,3.25-7.09,3.25-7.09,0,0-2.36.59-4.43,3.84-2.07,3.25-2.66,4.14-4.73,6.8-2.07,2.66-4.43,4.44-7.39,6.5-2.96,2.07-4.44,2.37-7.69,5.62-3.25,3.25-4.44,2.96-7.98,2.96s-5.32,0-8.87,1.48c-2.5,1.04-5.57,3.83-7.18,5.4,2.35,1.18,4.69,2.39,6.98,3.68.5-.46,3.01-2.78,4.34-4.64,1.48-2.07,4.73-3.25,6.5-3.25h5.62s-5.03,2.07-7.69,4.43c-2.15,1.91-4.11,4.79-4.78,5.82,1.12.69,2.22,1.41,3.3,2.16,2.56,1.76,4.42,3.69,6.11,5.83.46-1.35.56-2.86-.2-4.06-1.48-2.37.29-3.25,2.96-3.84ZM484.57,233.06c-2.07-2.36-2.37-6.21-4.73-17.44-2.37-11.23-4.73-9.76-5.62-12.42-.89-2.66,0-10.64,0-10.64,0,0-3.25,9.75-4.43,16.85-1.18,7.09.29,13.01,1.77,22.17,1.48,9.17-.59,13.01-.59,13.01,0,0,6.8,7.09,10.94,10.35,2.61,2.05,2.75,4.21,2.5,5.53,4.06-2.47,7.65-5.44,10.95-8.88-1.33-3.46-3.21-8.68-3.4-11.14-.29-3.84-5.32-5.03-7.39-7.39ZM261.08,183.69c0-3.25.59-4.43.59-10.35s-1.18-8.57.89-20.99c2.07-12.42,4.14-18.03,5.32-20.69,1.18-2.66,2.07-7.39,2.37-9.16.3-1.77,0-10.05.59-15.37.59-5.32,2.07-12.42,2.07-12.42,0,0-4.43,10.64-6.21,19.81-1.77,9.16-2.96,12.71-4.14,14.78-1.18,2.07-5.03,6.21-5.03,6.21,0,0-.59,4.14-1.48,9.46-.89,5.32-2.36,6.21-3.25,12.42-.89,6.21-2.07,10.05-.59,14.19,1.48,4.14,5.03,3.55,2.96,8.87-2.07,5.32-2.37,6.5-2.37,6.5l-.89,9.76s-2.36,8.87-.89,12.71c0,0,2.96-7.39,4.43-12.12,1.48-4.73,5.62-10.35,5.62-13.6ZM287.1,242.22s-3.55,1.18-3.55-2.96,6.21-9.76,6.21-9.76c0,0,6.5-1.18,8.28-.89,1.77.3,5.03-1.77,6.5-1.77s6.21.3,7.98,1.18c1.77.89,7.1.3,7.1.3l-14.78-10.94s.44,5.03,3.99,7.98c0,0-1.92-.15-4.88-3.11,0,0-4.29-4.43-6.06-4.88,0,0,1.04,3.84,1.92,4.88,0,0-1.77-1.18-3.4-3.4,0,0-2.96-3.25-4.29-2.96,0,0-.93.27-2.32.68l.25-.08c-4.43-1.77.3-6.5-.3-12.71-.59-6.21-.3-7.39.89-17.74,1.18-10.35.89-6.21,1.77-12.12.89-5.91.3-6.8-.59-11.53-.89-4.73-.3-7.39.59-13.3.89-5.91,2.37-7.98,2.37-7.98,0,0-.89-2.96-2.96-6.5-2.07-3.55-1.18-6.21-1.48-11.83-.3-5.62-3.55-15.96-3.55-15.96,0,0,.3,7.39.59,11.23.3,3.84.59,7.98,1.18,9.46.59,1.48.59,3.25,1.18,7.98.59,4.73-1.18,6.21-1.48,9.16-.3,2.96-2.07,5.62-3.55,9.76-1.48,4.14-1.48,16.26-1.77,17.44-.3,1.18,0,5.62,1.18,9.16,1.18,3.55-1.18,12.12-2.96,17.44-1.77,5.32-3.84,11.53-3.84,11.53l-4.72,12.09c-.38.11-.6.18-.6.18,0,0-15.82,14.34-17.59,15.37-.89.52-1.68,1.38-2.23,2.11.1.07.16.11.16.11,9.24,2.93,15.95,8.38,21.2,15.18.21-2.19,1.11-4.87,3.49-5.42,3.84-.89,8.87-2.37,8.87-2.37l1.18-5.03ZM258.42,103.28c3.55-7.98,2.07-7.98,2.37-10.94.3-2.96,2.07-6.5,7.1-12.12,5.03-5.62,5.32-2.96,8.87-5.32,3.55-2.36-.59-2.07-2.66-2.66-2.07-.59,4.14-1.18,5.62-4.43,1.48-3.25,3.55-2.07,9.16-3.84,5.62-1.77,7.69-.59,12.12-.89,4.43-.3,2.37-2.07,5.03-3.25,1.42-.63,4.5-1.34,7.08-1.87-10.29-.96-17.72-.79-17.72-.79-11.92.36-23.84,1.74-35.54,4.14,2.69.73,9.28,2.6,9.52,3.54.3,1.18-4.14.89-8.87,1.48-4.73.59-3.55,1.77-8.28,8.87-4.73,7.1-5.62,15.96-7.39,22.17-1.77,6.21,0,7.98.59,10.64.59,2.66.29,8.28-.3,13.3-.59,5.03.59,15.96.59,15.96,0,0,4.73-15.08,6.8-20.4,2.07-5.32,2.37-5.62,5.91-13.6ZM310.75,280.65c5.91-1.48,5.91.59,9.46.89,3.55.29,7.1,1.18,7.1,1.18l-2.96-3.25s-1.77-1.77-3.55-3.25c-1.77-1.48-5.62-.59-9.76-1.77-4.14-1.18-6.8-2.96-9.76-5.32-2.96-2.36-9.16-1.48-13.89-2.36-1.84-.35-4.18-.02-6.35.51,1.66,3.33,3.15,6.78,4.57,10.28,1.04,2.61,1.95,4.74,2.72,6.77.27-.03.55-.07.83-.11,3.84-.59,7.39-.89,11.23-1.48,3.84-.59,4.43-.59,10.35-2.07ZM242.16,226.85c-.3-6.8-3.84-8.28-5.62-13.6-1.77-5.32-1.77-12.71-2.36-19.22-.59-6.5-4.43-15.67-3.25-12.12,1.18,3.55.59,10.05,0,19.21-.59,9.17.59,4.73.89,11.23.29,6.5,0,11.82-.89,18.92-.89,7.1.3,7.98.59,12.42.3,4.43-3.84,10.35-3.55,9.46.29-.89-1.77-3.55-3.84-5.91-2.07-2.36-1.48-4.73-.89-12.71.59-7.98-1.18-25.13-1.77-28.08-.59-2.96-.3-7.98,1.48-14.78,1.77-6.8-.59-8.87-1.77-15.96-1.18-7.09-4.14-10.05-6.21-19.51-2.07-9.46-2.37-11.83-3.84-17.74-1.48-5.91-6.8-19.81-6.8-19.81,0,0,3.84,22.47,4.14,29.27.3,6.8-2.96,15.08-5.32,24.24-2.37,9.16-7.09,20.1-7.39,21.88-.29,1.77,1.48,10.94,4.14,16.55,2.66,5.62-.3,22.76,1.18,27.2,1.48,4.43,5.91,10.05,9.46,14.78,3.55,4.73,4.14,6.8,5.62,9.76.62,1.23.25,3.85-.37,6.49,8.34-5,15.31-11.93,22.55-18.02,1.44-1.16,2.85-2.34,4.26-3.52-.22-2.23-.42-4.63-.42-7.12,0-6.8.3-6.5,0-13.3ZM214.96,205.27c-1.48,6.5-2.37,6.8-3.55,11.23-1.18,4.43-.89,8.28-.89,8.28,0,0-1.77-12.12-1.77-14.19s-4.73-3.84-2.07-11.23c2.66-7.39,4.43-9.46,2.95-14.78-1.48-5.32-1.48-11.82-1.18-17.15.3-5.32,1.77-10.05,1.77-10.05,0,0,.59,7.39.89,12.71.29,5.32,1.48,5.62,4.14,11.53,2.66,5.91,1.18,6.21,2.07,11.53.89,5.32-.89,5.62-2.37,12.12ZM506.15,129.29s-3.55,9.76-4.43,20.1c-.89,10.35-4.43,11.82-4.43,21.28s.59,13.3-.89,22.47c-1.48,9.16.89,16.26,1.77,22.76.89,6.5,0,13.6,2.37,16.56.58.73,2.07-8.28,2.96-19.81.89-11.53,1.18-14.78.59-26.31-.59-11.53-.59-19.22-.89-27.49-.3-8.28.89-8.57,1.18-15.37.3-6.8,1.77-14.19,1.77-14.19ZM192.05,240.74c-.89-3.11-2.66-5.32-4.88-7.98-2.22-2.66-1.33-7.1,0-12.42,1.33-5.32-.89-7.98-2.66-10.64-1.77-2.66-4.88-11.53-5.76-15.96-.89-4.44-3.55-15.08-3.55-15.08,0,0,0,6.21-.44,8.87-.44,2.66-2.22,5.32-3.1,10.2-.89,4.88-1.33,11.53-2.22,17.29-.89,5.76,1.33,4.88,3.55,7.1,2.22,2.22,3.1,3.99,3.55,7.54.44,3.55-2.66,8.87-3.55,12.86-.89,3.99,2.66,3.55,6.21,9.31,3.55,5.76,4.88,5.32,9.76,8.42,4.88,3.1,5.76,7.1,5.76,7.1,0,0-1.33-11.09-1.77-16.41-.44-5.32,0-7.09-.89-10.2ZM178.31,223.89c-1.33-2.22-2.22-3.99-4.43-7.54-2.22-3.55-.44-11.09,0-16.41.44-5.32,2.66-7.54,2.66-7.54,0,0,.89,8.43,2.66,12.42,1.77,3.99,3.1,6.65,3.1,10.64s-1.33,4.43-1.33,6.21.89,4.44.89,9.31,1.33,9.31,1.33,9.31c-2.66-3.1-3.55-14.19-4.88-16.41ZM431.95,121.31c1.18-5.32,1.77-12.12,1.77-12.12,0,0-9.46,14.78-13.01,22.47-3.55,7.69-5.62,13.3-6.5,16.56-.89,3.25-6.5,9.16-11.23,14.49-4.73,5.32-6.21,9.76-6.21,19.81s.88,22.76.88,22.76c2.96,2.96,2.07,10.05,2.07,10.05h-2.07s2.37,3.25,3.84,5.03c1.48,1.77,3.25,12.71,2.96,19.51-.29,6.8-4.73,14.49-4.73,14.49,0,0,2.37,10.05,1.78,11.83-.59,1.77-5.91,1.18-5.91,1.18l.4.15c10.89,2.87,22.34,4.43,33.75,4.61-.13-.64-.2-1.26-.15-1.81.3-3.25-3.55-9.76-5.62-15.08-2.07-5.32-6.5-15.08-6.5-15.08,0,0-3.25-8.28-2.66-12.71.59-4.43-.59-5.32-1.18-6.5-.59-1.18-.3-4.73,1.18-8.28,1.48-3.55,3.84-3.84,4.43-5.03.59-1.18,1.77-6.5,2.07-13.6.29-7.09,3.84-19.21,3.84-19.21,0,0-.88-15.96-2.36-19.22-1.48-3.25,0-1.48,3.25-13.89,3.25-12.42,4.73-15.08,5.91-20.4ZM418.95,162.11c-.29,4.73,0,5.91-2.66,18.62-2.66,12.71-1.18,17.44-2.37,21.58-1.18,4.14-5.62,15.37-5.62,15.37,0,0-2.37-7.39-4.43-13.6-2.07-6.21-1.18-13.01.59-19.51,1.77-6.5.59-8.28,4.14-15.96,3.55-7.69,7.69-13.01,7.98-15.96,0,0,2.66,4.73,2.37,9.46ZM303.36,295.14c1.48,2.36,2.96,4.43,5.03,5.91,2.07,1.48,2.96,1.18,7.39.89,4.43-.29,5.62-1.18,10.35-2.66,4.73-1.48,6.21,0,9.46,0s3.25-.59,4.14-.89c.89-.3,5.03-1.18,5.91-4.14.89-2.96,0,0,1.48-1.77,1.48-1.77,5.03-2.96,6.8-3.55.45-.15,1.14-.28,1.91-.4-.08-.92-.17-1.89-.27-2.92-1.39.33-2.78.69-3.41.95-1.48.59-2.07,1.77-4.44,2.66-2.37.89-3.55,1.77-5.62,1.18-2.07-.59-4.14.59-6.5,1.48-2.36.89-6.8,1.77-10.94,2.37-4.14.59-6.5-.29-8.57-.89-2.07-.59-6.21-2.96-9.16-4.43-2.96-1.48-10.35-.89-10.35-.89,0,0,5.32,4.73,6.8,7.09ZM176.98,266.9c-3.1-2.22-9.31-3.99-13.3-7.09-3.99-3.1-3.1-5.77-3.55-8.87-.44-3.1-7.09-7.98-10.2-13.75-3.1-5.76-4.88-6.21-4.88-8.43s-7.1-.89-7.1-.89c-1.33,2.22-8.43,11.53-8.43,11.53,0,0,3.55,1.77,6.65,5.32,3.1,3.55,3.55,5.77,4.43,10.2.89,4.43,0,7.54.89,14.63.89,7.09,3.99,4.43,7.09,9.31,3.1,4.88,4.44,5.76,7.98,8.87,3.55,3.1,5.76,5.32,5.76,5.32,0,0-1.77-7.98-3.1-12.86-1.33-4.88,0-5.77.44-12.86.44-7.1-3.1-11.09-3.1-11.09,0,0,3.1,2.66,6.21,6.65,3.1,3.99,3.55,6.21,4.43,9.76.89,3.55.44,5.76,2.22,10.2,1.77,4.44,1.33,2.22,4.43,6.21.75.97,1.25,1.89,1.56,2.72,3.92-2.48,7.76-5.1,11.47-7.88-.06-.06-.11-.11-.17-.17-3.55-3.1-6.65-14.63-9.76-16.85ZM153.47,273.56c-2.66-2.66-4.43-2.66-5.76-6.65-1.33-3.99-1.33-6.21-2.22-10.2-.89-3.99-4.43-11.53-4.43-11.53,0,0,3.99,5.76,5.76,7.98s3.99,4.43,5.77,7.1c1.77,2.66,2.22,3.99,2.66,7.54.44,3.55,1.33,11.09,1.33,11.09,0,0-.44-2.66-3.1-5.32ZM456.19,242.52c-2.07-13.6-3.25-17.44-3.55-21.87-.29-4.43.89-7.1,1.77-12.71.89-5.62,3.25-14.49,2.07-27.2s-.59-19.22.59-26.9c1.18-7.69,3.55-21.88,3.55-22.76s2.37-9.46,2.37-9.46c0,0-4.44,9.46-5.62,14.78-1.18,5.32-.3,9.76-2.96,18.92-2.66,9.16-3.84,14.48-4.73,20.1-.89,5.62-2.07,5.91-4.43,8.57l-1.77-2.36s-1.77,2.36-.3,7.98c1.48,5.62,6.21,21.88,6.21,25.42s.59,6.8.59,6.8c0,0-2.07-5.62-4.73-9.46-2.66-3.84-7.09-16.56-7.09-16.56l-.89-3.55s-.89,5.91-1.18,10.05c-.3,4.14-.89,4.14-1.18,11.53-.3,7.39-2.96,11.53-1.18,16.85,1.77,5.32,7.69,13.01,7.98,16.55.3,3.55-.89,4.14-.89,4.14,0,0-5.03-3.84-6.8-8.28,0,0-.89,2.37.59,5.03l-1.18.59s.59,7.1,1.48,8.87c.89,1.77,2.36,4.14,1.77,5.91-.59,1.77-.59,4.73,2.96,7.69.26.22.53.45.8.69,8.55-.51,16.96-1.82,24.98-3.94-1.31-2.83-3.89-8.41-5.38-11.82-2.07-4.73-1.77,0-3.84-13.6ZM338.24,327.66c-3.25-2.96-4.43-5.03-5.62-6.21-1.18-1.18-1.77-2.07-3.25-2.07s-1.77,1.18-4.73-.59c-2.96-1.77-3.25-1.48-5.62-4.73-2.3-3.16-4.32-4.64-4.42-4.72.09.07.7.6-1.78.88-2.66.3-4.43-1.18-6.5-1.18s-8.57.89-8.57.89c1.77.59,5.62.89,10.64,3.55,5.03,2.66,4.73,2.96,7.69,5.32,2.96,2.37,4.14.89,5.62,3.84,1.48,2.96,2.96,2.96,1.18,5.03-1.77,2.07-2.96,2.37-5.32,3.84-.1.06-.21.12-.31.18,2.19,2.06,5.21,4.77,8.61,7.5.16-2.15.46-4.67.27-6.2-.3-2.37,1.18-4.43.59-5.91-.59-1.48-2.07-4.43-.29-4.14,1.77.29,2.07,0,4.73,2.36,2.66,2.36,2.07,2.37,5.32,3.84,3.25,1.48,4.43,1.18,7.39,1.48,2.96.3-2.37,0-5.62-2.96ZM382.56,324.95c.67.73,1.55,1.5,2.69,2.12,3.25,1.77,1.18,2.07,2.07,6.21.89,4.14,0,5.03-.3,6.5-.3,1.48-2.07,2.96-5.32,3.84-3.25.89-5.32,1.48-8.28,2.07-.5.1-.92.17-1.28.23-1.81.26-2.22.02-3.45-.23-1.48-.3-3.25.89-5.62,1.77-2.37.89-3.25,1.48-8.28,2.37-2.47.44-6.58.58-10.23.63,3.69,1.59,7.43,3.21,11.03,4.72,2.87-.55,4.91-1.4,6.29-2.39,2.07-1.48,2.66-.89,5.03-1.77,2.37-.89,2.07-1.18,3.25-2.66,1.18-1.48,5.32-2.36,7.1-2.66,1.77-.3,3.25-.3,7.69-1.18,4.43-.89,4.14-1.48,6.5-3.25,2.37-1.77,1.77-2.07,2.96-4.73.53-1.18.99-1.66,1.53-1.96-.54-.36-1.09-.74-1.68-1.14-5.23-3.62-6.81-5.78-11.7-8.47ZM610.84,151.65c1.32,3.3,4.22,5.64,5.69,8.81,1.6,3.47.97,6.02,1.44,9.81.99,7.84,6.27,10.08,10.17,15.8,1.77,2.6,1.75,5.99,4.64,8,2.55,1.78,6.21.58,9.05,2.26.43,2.19.23,4.61-.55,6.54l9.98-15.3c1.05-1.67.38-2.87,3.08-3.31-1.12-4.52-5.46-7.37-7.75-11.47-3.48-6.24-2.58-13.18-4.48-19.82-3.71-12.99-21.58-16.09-31.32-24.39-1.13,7.24-2.82,15.95.04,23.08Z"/> <path class="cls-97" d="M617.04,366.48c.05,0,.1-.05.08-.12-.55-1.93-1.4-3.96-3.04-5.22-1.35-1.04-2.95-1.43-4.62-1.58-2-.17-4.03-.04-6.03-.15-2.42-.14-4.8-.72-6.94-1.88-2.72-1.48-5.27-3.18-8.25-4.12-1.34-.42-2.62-.77-3.87-1.45-1.23-.67-2.31-1.56-3.29-2.55-1.79-1.81-3.09-4.09-3.94-6.47-.37-1.03-.66-2.08-.63-3.18.04-1.28.46-2.56.85-3.76.62-1.93,1.66-4.05,1.45-6.14-.02-.17-.21-.63-.19-.71.1-.28.18-.55.26-.84.3-.99.52-2.01.59-3.05.05-.82-.13-1.72-.16-2.55-.05-1.44-.05-2.88-.05-4.32,0-8.3.15-16.66.83-24.93.67-8.19,1.51-16.38,2.33-24.56.38-3.73.71-7.5,1.36-11.19.24-1.39.66-2.76.9-4.15.38-2.17.65-4.34.85-6.54.21-2.3.32-4.58.44-6.88.02-.36-.54-.36-.56,0-.16,3.11-.49,6.25-.8,9.35-.21,2.12-.37,4.29-.84,6.37-.26,1.18-.44,2.37-.61,3.57-1.2,8.54-1.82,17.17-2.61,25.75-.71,7.65-1.27,15.25-1.48,22.93-.11,4.02-.18,8.05-.2,12.07,0,1.17-.02,2.33.02,3.5.05,1.41-.05,2.65-.46,4.03-.09.32-.57,1.15-.44,1.49.38.99.11,2.07-.17,3.05-.63,2.24-1.73,4.36-2.04,6.69-.28,2.14.46,4.17,1.35,6.09,1.01,2.18,2.47,4.14,4.25,5.75,1.94,1.74,4.17,2.66,6.64,3.35,3.13.88,5.78,2.78,8.66,4.21,3.87,1.93,8.16,1.25,12.32,1.45,1.62.08,3.21.39,4.58,1.3,1.79,1.18,2.7,3.3,3.32,5.26-2.06-1.44-4.44-2.37-6.98-2.38-1.41,0-2.78.42-4.2.41-2.41,0-4.55-1.43-6.44-2.79-.04-.03-.08.04-.04.07,1.62,1.2,3.34,2.32,5.32,2.81,1.12.28,2.27.15,3.4-.02,4.19-.63,7.96,1.09,10.93,4.02,3.38,3.33,5.4,7.97,5.33,12.72-.03,1.86-.39,3.88-1.67,5.31-1.31,1.46-3.39,1.73-5.25,1.64-.03,0-.05,0-.08.01-.23-4.02-1.93-8.03-4.04-11.36-1.12-1.77-2.56-3.31-4.36-4.39-1.94-1.17-4.19-1.46-6.4-1.67-1.7-.17-3.45-.37-4.96-1.24-1.66-.94-3.03-2.43-4.38-3.75-.03-.03-.07.02-.04.04,1.51,1.53,3,3.08,4.9,4.13,1.83,1.01,3.98,1.22,6.01,1.5,2.35.33,4.54,1.29,6.3,2.88,1.84,1.66,3.07,3.9,4.11,6.11,2.11,4.45,3.86,11.09-.1,15.03-1.93,1.92-4.89,2.27-7.48,2.31-2.8.04-5.66-.21-8.39-.83-2.46-.56-4.86-1.32-7.32-1.9-.09-.02-.16,0-.23.03.92-1.26,1.3-2.62,1.18-4.3-.17-2.43-.83-4.85-1.52-7.17-.61-2.05-1.3-4.13-2.31-6.03-.92-1.74-2.99-2.63-4.68-3.43-.97-.46-1.98-.88-2.99-1.25-.59-.37-1.13-.81-1.59-1.44-.74-1.03-1.03-2.36-1.24-3.58,0-.02-.04-.01-.03,0,.14,1.8.89,3.98,2.37,5.2-.05.17,0,.38.22.46,1.86.69,3.7,1.51,5.41,2.54,1.86,1.12,2.48,2.85,3.21,4.81.91,2.44,1.62,4.97,2.12,7.52.48,2.46.71,4.58-.97,6.62-1.39,1.69-3.29,3.02-5.17,4.13-2.16,1.27-4.81,1.06-7.23.83-6.46-.6-13.4-2.29-18.19-6.88-.98-.94-1.94-1.86-2.6-3.06-.76-1.38-1.07-3.01-1.42-4.54-.54-2.35-1.18-5.18-3.21-6.73-2.02-1.54-4.6-1.77-6.96-2.47-2.91-.86-4.14-3-5.14-5.68-.9-2.39-1.49-4.9-1.94-7.41-.32-1.78-.13-3.89-.89-5.54-1.26-2.74-4.69-4.29-6.83-6.21-1.33-1.19-2.54-2.86-3.15-4.6,1.52.88,3.66,1.43,4.65-.45.08-.15,0-.32-.15-.37-1.95-.59-4-1.61-5.01-3.48-.42-.78-.82-1.45-1.34-2.06,2.61.79,5.12-.89,6.49-3.4.11-.21-.12-.48-.34-.34-2.05,1.33-4.69.52-6.74-.68,1.44-.06,2.52-1.28,3.15-2.64.98-2.08,1.61-4.37,2.18-6.6.04-.17-.08-.3-.24-.32-.96-.11-3.56-.34-4.41-1.25,1.18.07,3.01.28,3.42-.94.79-2.35-1.59-5.51-2.77-7.35-.65-1-1.33-1.98-2.03-2.94-.3-.41-.07-.95-.02-1.45.1-1.04.19-2.08.27-3.12.29-3.78.43-7.57.45-11.35.1-15.37-1.93-30.83-6.13-45.62-1.04-3.66-2.25-7.28-3.59-10.85-1.32-3.5-3.03-6.87-4.13-10.45-2.01-6.54-.77-13,.73-19.5,1.87-8.1,2.93-16.29,3.81-24.55.8-7.53,1.36-15.08,2.64-22.55,2.04-11.87,6.26-22.99,13.11-32.93.01-.02-.02-.04-.03-.02-4.1,5.79-7.43,12.02-9.82,18.7-2.3,6.44-3.63,13.17-4.57,19.93-1.06,7.62-1.62,15.31-2.54,22.95-.53,4.38-1.16,8.75-2,13.08-.71,3.68-1.71,7.29-2.39,10.98-1.14,6.18-.62,12.04,1.86,17.84.32.75.64,1.51.95,2.26-.06-.05-.14-.07-.22,0-2.3,2-4.9,3.51-7.48,5.09-2.51,1.54-4.8,3.29-6.8,5.45-1.97,2.12-3.86,4.26-6.02,6.21-2.17,1.96-4.5,3.72-6.96,5.3-5.03,3.23-10.58,5.33-16.27,7.06-5.64,1.72-11.43,2.96-17.26,3.83-23.87,3.55-49.05.61-71.48-8.28-2.79-1.11-5.55-2.3-8.25-3.62-2.83-1.38-5.43-3.12-8.04-4.86-2.63-1.75-5.29-3.5-8.16-4.85-3.06-1.44-6.09-2.99-9.08-4.58-6.12-3.26-12.05-6.92-17.93-10.59-5.99-3.73-11.8-7.72-17.64-11.67-2.1-1.42-4.21-2.84-6.3-4.28-.11-.07-.2.1-.1.17,11.25,8.51,23.06,16.02,35.14,23.28,2.96,1.78,6,3.42,9.08,4.97,2.98,1.49,6.13,2.62,9.1,4.12,2.83,1.43,5.43,3.21,8.06,4.96,2.57,1.7,5.17,3.22,7.93,4.58,21.33,10.52,45.95,14.3,69.54,12.36,11.59-.95,23.44-3.27,34.21-7.77,5.19-2.17,9.93-5.21,14.14-8.95,2.15-1.91,4.13-4,6-6.18,2.07-2.42,4.33-4.41,7.01-6.14,2.66-1.73,5.36-3.31,7.77-5.41.03-.03.04-.06.05-.09,2.63,6.39,4.85,12.89,6.56,19.61,3.86,15.13,5.4,30.89,4.84,46.49-.1,2.7-.28,5.4-.51,8.1-.05.55-.47,1.96-.13,2.41.46.62.91,1.26,1.35,1.9,1.42,2.06,2.93,4.29,3.57,6.74.14.55.21,1.22-.18,1.69-.43.53-1.62.31-2.22.32h-1.01c-.15,0-.3.16-.24.32.57,1.5,3.35,1.78,4.81,1.92-.38,1.49-.83,2.97-1.34,4.42-.68,1.94-1.86,4.98-4.48,3.99-.28-.1-.4.3-.19.45,2.03,1.45,4.99,2.71,7.43,1.74-1.56,2.25-4.15,3.53-6.74,1.83-.27-.18-.5.24-.25.43.62.48,1.18,1.04,1.65,1.67.45.6.6,1.36,1.06,1.96,1.15,1.48,2.82,2.37,4.57,2.94-1.05,1.48-3.18.49-4.37-.35-.19-.13-.42.09-.37.28.44,1.71,1.49,3.28,2.62,4.59,2.3,2.67,6.52,4.03,7.82,7.5.33.87.21,2.01.32,2.93.14,1.18.36,2.36.59,3.53.54,2.62,1.26,5.23,2.37,7.67,1.01,2.2,2.46,3.52,4.77,4.27,2.97.96,6.23,1.03,8.09,3.91,1.71,2.67,1.58,6.07,2.86,8.92,1.02,2.26,3.06,4.11,5.01,5.6,2.33,1.78,5.04,2.82,7.83,3.65,3.35,1,6.86,1.65,10.35,1.85,2.09.12,4.14.02,5.97-1.04,1.77-1.03,3.46-2.28,4.88-3.75.21-.22.41-.45.59-.68-.03.16.03.33.23.38,2.97.7,5.9,1.6,8.93,1.98,2.58.32,5.24.53,7.84.44,2.26-.08,4.57-.54,6.44-1.88,1.74-1.25,2.79-3.28,3.04-5.38.07-.63.1-1.27.1-1.9.02,0,.03.01.05.01,1.72.07,3.53-.16,4.91-1.28,1.37-1.11,2-2.75,2.27-4.44.73-4.6-.93-9.35-3.67-13.01-1.05-1.4-2.33-2.69-3.79-3.74ZM724.93,331.86c-.21.71-.38,1.62-.95,2.12-3.34,2.95-9.02,6.24-13.4,3.51-4.5-2.8-2.96-9.6-4.59-13.89-1.74-4.56-7.11-5.23-10.92-7.19-.01,0-.02.01-.01.02,2.14,1.14,4.49,1.79,6.61,2.95,2.41,1.31,3.8,3.7,4.3,6.32.49,2.53.46,5.13,1.05,7.65.51,2.16,1.85,3.76,3.8,4.8,3.96,2.1,8.92-.38,12.18-2.69.41-.29.83-.73,1.3-.92.24-.1.57-.31.67-.57.57-1.58,1.06-3.17,1.41-4.81.57-2.67.56-5.35-.13-7.99-.45-1.7-1.24-3.27-2.17-4.76-.03-.05-.1,0-.08.04,1.3,2.81,2.07,5.71,2.08,8.81,0,1.49-.23,2.96-.55,4.41-.17.74-.38,1.47-.59,2.19ZM298.67,217.91c1.32.67,2.41,1.74,3.46,2.76,2.05,2.02,4.01,4.17,6.82,5.1.1.04.19-.11.11-.18-1.25-1.14-2.24-2.46-3-3.98-.79-1.55-1.16-3.21-1.71-4.84-.04-.12-.2-.07-.18.05.37,2.11,1.22,4.24,2.33,6.06.53.87,1.19,1.65,1.9,2.38.01.04.03.06.04.09-.26-.11-.52-.22-.78-.34-.44-.22-.85-.48-1.26-.75-3.07-2.07-5.06-5.61-8.63-6.96-.08-.03-.13.05-.12.12.24,1.25.69,2.38,1.3,3.48.22.4.58,1.05.91,1.26-.66-.41-1.24-.94-1.8-1.47-1.75-1.67-3.12-3.68-5.32-4.8-.05-.02-.09.04-.04.07,2.94,1.6,4.54,4.77,7.36,6.55.1.06.17-.07.11-.15-.62-.8-1.14-1.64-1.58-2.55-.26-.55-.45-1.13-.61-1.72-.19-.68.34-.34.69-.16ZM266.35,227.58c.88-.79,1.77-1.56,2.67-2.32.88-.74,2.04-1.95,3.19-2.25,2.25-.6,4.44-1.43,6.61-2.27,4.38-1.7,8.73-3.49,13.41-4.16.43-.06.33-.81-.1-.75-6.42.79-12.2,3.87-18.29,5.85-.73.24-1.47.45-2.21.65-.46.12-.97.71-1.34,1-1.32,1.02-2.58,2.13-3.82,3.24-2.48,2.23-4.85,4.57-7.35,6.77-2.54,2.24-5.28,4.24-7.89,6.39-2.73,2.24-5.42,4.54-8.13,6.82-5.08,4.28-10.1,8.61-15.17,12.9-5.06,4.29-10.36,8.32-16.37,11.18-3.09,1.47-6.3,2.68-9.49,3.93-1.4.55-2.8,1.11-4.18,1.7-.74.32-1.48.64-2.21.97-.7.32-1.66.61-2.26,1.1-10.07,8.34-21.02,15.51-32.64,21.49-8.47,4.36-17.28,8.02-26.22,11.29,0,0,0,.01,0,.01,12.23-3.71,23.98-9.04,35.06-15.4,5.62-3.22,11.05-6.78,16.28-10.6,2.53-1.85,5.04-3.76,7.46-5.76,1.28-1.05,3.03-1.64,4.54-2.29,1.69-.73,3.4-1.4,5.11-2.07,3-1.18,6-2.36,8.92-3.73,2.98-1.4,5.75-3.13,8.43-5.04,5.19-3.71,9.89-8.04,14.67-12.24,5.2-4.56,10.55-8.97,15.89-13.37,2.63-2.17,5.39-4.18,8.01-6.36,2.56-2.13,4.96-4.44,7.43-6.67ZM141.95,386.68c-.21-2.23-.61-4.45-1.24-6.61-1.19-4.06-3.38-7.87-6.86-10.37-3.59-2.57-7.86-2.81-12.11-2.92-1.93-.05-3.96-.16-5.71-1.07-2.07-1.07-2.99-3.44-3.15-5.65-.12-1.72.73-3.57,1.4-5.1.76-1.72,1.66-3.38,2.51-5.06.81-1.6,1.38-3.22,1.97-4.92.85-2.41,1.84-4.76,2.91-7.08,4.07-8.88,9.07-17.25,12.37-26.48.04-.1-.12-.14-.15-.04-4.53,12.06-12.14,22.69-16.23,34.95-1.42,4.26-4.76,8.07-5.23,12.63-.2,1.91.43,4.04,1.58,5.56.99,1.3,2.5,1.98,4.06,2.31,2.74.59,5.59.24,8.36.56,3.78.45,7.18,2.04,9.75,4.88,2.34,2.57,3.71,5.91,4.55,9.24.45,1.79.72,3.62.89,5.45.02.23.19,2.28.05,2.27-.31-.04-.81.35-1.06.49-.43.23-.85.47-1.29.68.04-1.62-.39-3.3-.75-4.84-.39-1.66-.98-3.29-1.6-4.87-1.13-2.9-2.68-6.73-5.54-8.34-1.59-.89-3.4-.96-5.18-.89-2.74.11-4.94-.19-7.02-2.15-.06-.05-.14.03-.08.08,1.29,1.26,2.71,2.04,4.51,2.26,1.94.23,3.87-.21,5.8.22,3.56.79,5.33,4.57,6.66,7.6,1.37,3.12,2.63,6.63,2.59,10.08-.02,1.62-.32,3.18-1.21,4.56-.95,1.48-2.52,2.45-4.01,3.3-.42.24-.05.86.38.65,2.83-1.42,4.98-3.63,5.39-6.84.92-.36,2.21-.92,2.82-1.63.17-.19.03-.72.02-.95-.03-.65-.08-1.29-.14-1.93ZM125.28,376.94c-1.74-1.23-3.8-1.54-5.88-1.63-1.94-.09-3.91,0-5.69-.9-1.62-.82-2.73-2.41-3.63-3.93-.05-.08-.17,0-.13.07,1.02,1.8,2.28,3.48,4.23,4.31,1.55.66,3.33.62,4.98.76,2.46.22,4.68.88,6.5,2.61,1.88,1.79,3.1,4.29,4.05,6.67.85,2.16,1.49,4.44,2.01,6.7.5,2.19.81,4.52.26,6.73-1.49,5.94-9.26,5.41-14.12,4.59.29-1.97-.26-4.2-.57-6.09-.35-2.17-.57-4.35-1.06-6.5-.87-3.83-2.71-8.66-6.77-10.1-1.22-.43-2.48-.43-3.76-.46-1.73-.03-3.22-.37-4.59-1.46-2.1-1.66-3.21-4.48-4.07-6.92-.02-.04-.08-.03-.07.02.75,2.3,1.68,4.59,3.31,6.42,1.85,2.07,4.21,2.17,6.8,2.32,5.64.33,7.74,6.87,8.67,11.5.43,2.14.64,4.32.98,6.48.23,1.46.56,3.17.32,4.69-.18.05-.24.31-.08.41-.22.94-.69,1.78-1.59,2.41-1.05.73-2.46.87-3.7.98-1.38.12-2.77.19-4.15.29-2.85.21-5.69.49-8.55.38-2.8-.1-5.57-.66-7.71-2.56-1.94-1.72-3.83-3.91-5.07-6.2-.03-.05-.09-.08-.14-.08-2.66-.05-5.06-2.17-6.71-4.06-.1-.12-.27.05-.17.17.88,1.01,1.84,1.9,2.94,2.66.49.34,1.02.64,1.57.87.32.14.65.26.98.37.33.11,1.19.12,1.36.47,1.11,2.28,2.75,4.31,4.54,6.09,3.77,3.76,9.76,3.21,14.64,2.84,2.59-.2,5.23-.27,7.8-.62,2.09-.28,4.08-1.38,4.68-3.53.03-.09.05-.19.07-.29,4.53.93,10.72,1.75,13.8-2.47,2.51-3.43,1.34-8.23.26-11.96-1.21-4.19-2.8-9.39-6.55-12.04ZM76.81,384.13c-.11-3.43-.04-6.84-.3-10.26-.27-3.59-.8-7.16-1.04-10.75-.23-3.56-.19-7.14-.04-10.71.32-7.21,1.24-14.38,2.14-21.54.76-6,1.62-11.97,2.77-17.91,1.1-5.68,2.39-11.32,3.62-16.97.18-.84.36-1.69.54-2.53.12-.56.46-1.38.38-1.95-.06-.38-.1-.77-.14-1.15-.24-2.21-.36-4.44-.36-6.67-.01-5.8,1.3-11.62,3.27-17.06.66-1.83,1.68-3.32,3.48-4.16,1.52-.71,3.21-1.14,4.8-1.67,4.95-1.66,9.87-3.44,14.57-5.73,4.67-2.28,8.67-5.27,12.39-8.87,7.86-7.62,14.72-16.6,19.79-26.29,7.78-14.87,16.17-29.4,23.63-44.43,2.59-5.22,5.42-10.59,6.87-16.26.06-.25-.32-.35-.38-.1-.67,2.64-1.92,5.21-3.03,7.69-1.66,3.71-3.47,7.35-5.3,10.98-4.26,8.45-8.76,16.78-13.27,25.1-3.33,6.13-6.67,12.26-9.95,18.43-2.79,5.24-6.3,10.1-10.01,14.72-1.03,1.28-2.09,2.54-3.17,3.79,2.27-3.36,3.48-7.41,4.48-11.29,1.35-5.27,2.05-10.67,3.04-16.02,2.61-14.02,4.85-28.11,8.13-42,3.33-14.07,7.89-27.89,14.75-40.66,6.26-11.67,14.63-22.06,24.37-31.01,20.07-18.46,45.57-29.86,71.91-36.06,24.47-5.76,49.62-6.94,74.34-2.21,6.02,1.15,12.02,2.63,17.89,4.39,1.99.6,4.06,1.2,5.92,2.14.75.38,1.74.21,2.56.23,3.9.1,7.79.23,11.68.37,27.71,1.04,55.34,3.25,82.82,6.98,17.93,2.43,36,6.57,54.16,4,10.96-1.55,20.4-8.21,29.63-13.92,2.77-1.71,5.52-3.45,8.25-5.23,1.85-1.21,3.43-3.44,5.05-4.94,4.36-4.03,9.22-8.12,14.83-10.28,6.01-2.32,12.95-2.68,19.31-2.97,3.04-.14,6.1-.15,9.15-.07,2.41.07,4.78.43,7.16-.08,2.39-.51,4.53-1.99,6.54-3.3,3.09-2.02,6.18-3.78,9.76-4.78.21-.06.12-.39-.09-.33-5.18,1.42-9.09,4.73-13.82,7.05-4.47,2.2-10.39.85-15.23.91-5.67.07-11.37.5-16.96,1.52-5,.92-9.21,2.77-13.37,5.68-3.75,2.63-7.19,5.72-10.46,8.92-1.41,1.38-2.34,2.31-3.96,3.35-4.06,2.6-8.17,5.14-12.31,7.61-5.04,3.01-10.22,6.41-15.75,8.42-10.22,3.71-22.26,2.97-32.89,1.95-7.82-.75-15.57-2.24-23.34-3.36-26.82-3.86-53.81-6.26-80.87-7.49-7.14-.32-14.28-.6-21.42-.75.34,0-.25-.17-.42-.25-.73-.34-1.49-.62-2.25-.9-4.08-1.48-8.32-2.54-12.53-3.56-12.6-3.07-25.43-4.74-38.4-5.03-10.9-.24-21.89.98-32.62,2.76-26.74,4.42-52.91,14.16-74.73,30.45-9.81,7.32-18.57,16.01-25.87,25.84-8.17,10.99-14.04,23.49-18.37,36.43-5.34,15.92-8.28,32.55-11.19,49.05-1.23,6.96-2.42,13.93-3.64,20.89-1.13,6.45-2.34,13.89-6.62,19.11-2.27,2.51-4.67,4.92-7.22,7.14-7.71,6.7-17.72,9.59-27.18,12.88-1.43.5-2.75,1.09-3.74,2.28-1.2,1.44-1.73,3.39-2.24,5.16-.82,2.88-1.71,5.79-2.14,8.75-.4,2.77-.45,5.59-.36,8.39.06,1.78.2,3.55.43,5.32.11.82-.25,1.66-.42,2.46-.37,1.75-.75,3.5-1.13,5.24-1.18,5.43-2.4,10.84-3.4,16.31-1.1,6-1.86,12.05-2.61,18.1-.14,1.12-.27,2.25-.4,3.38-6.39-.19-12.77-.63-19.08-1.69-6.25-1.05-12.37-2.77-18.31-4.99-10.76-4.02-21.2-9.71-28.19-19.07-6.88-9.2-10.05-21.23-6.92-32.45,1.43-5.13,4.09-9.79,8.25-13.17,1.89-1.54,4.09-2.81,6.42-3.56,1.75-.56,3.75-.85,5.2.51,1.3,1.22,1.81,3.21,2.11,4.9.07.38.18.8.07,1.17-.41,1.27-.65,2.61-1.37,3.75-1.25,2.02-2.68,3.85-4.31,5.59-1.22,1.3-2.44,2.6-3.18,4.24-1.95,4.36.02,9.94,2.22,13.81,2.7,4.74,6.93,8.46,11.4,11.48,6.91,4.67,15.33,7.18,23.49,8.49,8.21,1.32,16.77,1.38,24.92-.39.17-.04.1-.29-.07-.26-11.55,2.32-23.87,1.31-35.07-2.23-10.62-3.35-22.05-10.23-25.96-21.26-.9-2.54-1.42-5.46-.81-8.13.44-1.91,1.7-3.41,3.01-4.81,1.48-1.59,2.93-3.17,4.1-5.01.59-.93,1.16-1.78,1.54-2.82.21-.58.36-1.17.53-1.75.08-.28.27-.63.24-.93-.23-2.69-1.19-6.27-4.01-7.28-1.48-.53-3.3-.03-4.71.45-2.16.73-4.15,1.95-5.94,3.33-8.51,6.56-11.17,18.56-9.54,28.74,1.63,10.18,7.59,19.41,15.48,25.88,7.88,6.47,17.68,10.48,27.35,13.42,10.1,3.06,20.56,4.15,31.07,4.46-.69,5.93-1.25,11.87-1.36,17.84-.07,3.4.04,6.8.36,10.19.35,3.63.86,7.23,1.08,10.88.35,5.9-.56,12.41,2.29,17.85.06.11.23.01.17-.1-1.53-2.99-1.86-6.38-1.96-9.69ZM192.47,104.15c-5.33,7.61-8.12,16.74-10.8,25.54-2.96,9.68-5.73,19.41-8.52,29.13-.05.17.21.24.26.07,3.17-9.34,5.64-18.95,8.45-28.41,2.68-9.01,5.5-18.35,10.66-26.3.02-.03-.03-.06-.05-.03ZM431.21,357.01c-.77-1.39-1.61-2.75-2.61-3.99-.84-1.06-1.91-1.56-3.21-1.89-2.78-.7-6.2-.77-9-.11-.19.04-.11.34.08.29,1.7-.4,3.56-.39,5.29-.35,1.96.05,4.59.21,6.1,1.63,1.37,1.28,2.34,3.17,3.25,4.79,1.04,1.85,2.02,3.79,2.67,5.81.22.68.38,1.32.17,2.01-.34,1.19-1.23,2.29-2.08,3.17-.43.45-1.75.72-2.35.94-.69.25-1.39.47-2.09.69-1.51.46-3.06.82-4.61,1.13-5.44,1.08-11.04,1.28-16.57,1.08-2.07-.08-4.21-.11-6.26-.47-2.59-.45-4.78-1.91-6.7-3.65-1.34-1.22-2.53-2.71-4.15-3.56-1.81-.96-3.98-1.25-5.98-1.56-2.92-.45-5.95-.66-8.81-1.41-2.23-.59-4.43-1.16-6.62-1.9-5.9-2.02-11.65-4.52-17.37-6.99-5.3-2.29-10.72-4.37-15.63-7.46-4.38-2.75-8.46-5.99-12.38-9.36-2.64-2.28-5.2-4.64-7.68-7.09-.6-.59-.94-.92-1.71-1.3-2.33-1.13-4.59-2.43-6.81-3.76-2.99-1.79-5.94-3.66-8.82-5.62-.32-.22-.63-.97-.84-1.3-.36-.58-.68-1.19-.99-1.8-.71-1.41-1.25-2.91-1.7-4.42-.88-2.89-1.36-5.91-1.74-8.9-.36-2.83-.54-5.69-.98-8.51-.44-2.85-1.23-5.62-2.23-8.33-1.95-5.27-4.16-10.49-6.57-15.56-3.06-6.44-6.75-12.65-11.63-17.89-5.01-5.38-11.29-9.32-18.3-11.53-.05-.02-.08.06-.02.08,10.46,3.42,18.51,10.74,24.3,19.95,2.79,4.44,5.06,9.2,7.11,14.01,2.29,5.37,4.78,10.85,6.11,16.55,1.34,5.78,1.27,11.79,2.54,17.59.6,2.74,1.49,5.42,2.79,7.91.7,1.34,1.35,2.47,2.59,3.3,3.69,2.46,7.45,4.83,11.32,6.99,1.07.6,2.15,1.17,3.24,1.72.41.2.83.32,1.15.64.7.71,1.41,1.4,2.12,2.08,6.62,6.37,13.82,12.54,21.91,16.95,2.49,1.35,5.14,2.39,7.74,3.5,2.96,1.27,5.91,2.54,8.88,3.78,5.35,2.24,10.75,4.47,16.33,6.12,5.05,1.49,10.34,1.58,15.47,2.68,2.07.44,3.71,1.2,5.25,2.66,1.52,1.44,2.97,2.93,4.76,4.05,3.61,2.25,8.43,2.02,12.54,2.08,5.54.09,11.12-.33,16.53-1.6,2.39-.56,4.73-1.33,6.98-2.31.33-.14.7-.76.9-1.03.59-.79,1.2-1.68,1.39-2.67.19-.99-.43-2.25-.78-3.13-.65-1.62-1.46-3.19-2.31-4.71ZM443.98,342.54c-.55-.43-1.13-.79-1.75-1.09-1.85-6.74-10.73-6.76-16.38-6.37-4.24.29-8.43,1.02-12.6,1.83-1.92.37-3.84.77-5.77,1.16-.8.16-1.6.32-2.41.47-.36.07-.73.13-1.09.2-.1.02-.51-.01-.23.12-.04-.02-.07-.04-.11-.06-3.99-2.05-7.8-4.6-11.38-7.29-1.99-1.5-3.86-3.14-5.87-4.61-2.01-1.46-4.21-2.54-6.38-3.73-3.75-2.05-7.3-4.53-10.76-7.02-3.16-2.28-6.42-4.62-9.16-7.42-2.34-2.38-2.68-6.54-3.06-9.67-.56-4.49-.71-9.04-1.15-13.54-.82-8.34-1.98-16.67-2.52-25.03-.25-3.87.15-7.89.73-11.71.04-.25-.34-.35-.38-.1-.57,3.71-1.12,7.49-.95,11.26.16,3.55.57,7.1.93,10.64.47,4.64.96,9.28,1.4,13.92.42,4.4.61,8.83,1.05,13.23.23,2.3.54,4.6,1.11,6.84.32,1.26.7,2.72,1.48,3.78.78,1.05,1.82,1.93,2.8,2.78,1.5,1.3,3.07,2.52,4.65,3.72,3.6,2.73,7.31,5.32,11.16,7.68,1.77,1.08,3.63,1.99,5.44,3.01,2.24,1.25,4.26,2.81,6.25,4.42,4.09,3.31,8.46,6.3,13.05,8.87.38.22.77.43,1.16.63.39.2.86.02,1.27-.06,1.71-.31,3.41-.68,5.12-1.03,4.13-.87,8.26-1.68,12.44-2.3,4.02-.59,8.26-.93,12.29-.23,3.29.57,6.32,2.18,7.4,5.41-3.02-1.34-6.7-1.45-9.84-1.32-.18,0-.18.27,0,.28,4.05.19,8.37.29,11.69,2.93,3.28,2.61,4.56,7.07,5.66,10.95-1.45.68-2.6,1.9-4.1,2.52-.5-2.53-1.5-4.91-3.3-6.89-3.01-3.3-7.87-4.55-12.17-4.86-.09,0-.12.15-.02.17,4.2.78,8.6,1.71,11.69,4.9,3.16,3.26,3.61,8.16,3.51,12.49-3.45.96-7.01,1.44-10.35,2.74-.23.09-.14.45.1.37,3.48-1.19,7.15-1.55,10.68-2.51.15-.04.25-.18.25-.33.07-1.91,0-3.87-.34-5.76,1.61-.57,2.91-1.76,4.52-2.36.16-.06.27-.22.22-.4-1.08-4.14-2.52-8.87-6.02-11.63ZM731.14,320.75c.05-2.28-.72-4.21-1.69-6.22-2.21-4.55-4.62-8.98-6.52-13.67-.33-.81-.64-1.62-.94-2.44-1.73-4.87-2.5-10.02-3.5-15.08-1.02-5.15-2.22-10.3-4.3-15.13-1.53-3.54-3.96-6.45-6.13-9.59-2.44-3.54-4.78-7.14-7.14-10.73-5.34-8.09-10.66-16.26-16.75-23.82-1.23-1.52-2.5-3-3.85-4.41-.33-.35-.91-.67-.92-1.03,0-.63-.01-1.27-.02-1.9-.04-2.4-.13-4.81-.26-7.21-.08-1.39-.17-2.78-.29-4.17-.06-.69-.13-1.37-.2-2.05-.02-.21-.21-.74-.13-.92,1.9-3.87,3.77-7.75,5.61-11.65,2.37-5.02,4.87-10.05,6.78-15.26.11-.31-.38-.44-.49-.14-2.63,7.19-6.23,14.1-9.56,20.98-.94,1.94-1.89,3.89-2.84,5.82,0,.02-.01.04-.02.06-1.02,1.71-2.1,3.39-3.12,5.1-1.31,2.19-2.27,4.58-3.77,6.66-2.99,4.13-7.72,6.89-12.08,9.33-.01,0,0,.03.01.02,4.46-2.38,8.95-4.89,12.24-8.82,1.7-2.02,2.78-4.29,4.05-6.58.91-1.64,1.83-3.26,2.61-4.96.05.6.24,1.32.28,1.72.14,1.5.25,3.01.33,4.52.14,2.44.22,4.89.26,7.34.02.89-.28,2.16.39,2.82,1.33,1.32,2.56,2.73,3.76,4.17,3.03,3.64,5.79,7.51,8.5,11.39,5.38,7.73,10.39,15.71,15.68,23.5,2.09,3.08,4.51,5.94,6.1,9.33,2.29,4.87,3.38,10.27,4.45,15.51,1.02,5.04,1.81,10.14,3.51,15,.36,1.03.76,2.04,1.17,3.04,1.81,4.39,4.09,8.57,6.23,12.81,1.15,2.28,2.05,4.36,1.99,6.97-.05,2.62-.83,5.16-1.3,7.72-.27,1.49-.14,3.02-.09,4.52.08,2.42.16,4.84.19,7.26.08,5.74-.29,11.37-1.07,17.06-.31,2.27-.67,4.53-1.05,6.79-.12.72-.16,1.22-.11,1.94.14,1.87.19,3.74.12,5.61-.06,1.85-.07,4.43-1.34,5.92-1.29,1.51-3.9,1.82-5.74,2.02-1.17.13-2.36.18-3.53.14-.09,0-.21.07-.22.17,0,.04-.02.07-.03.11-.29-.08-.62-.21-.9-.25-.39-.06-.77-.15-1.15-.24-.88-.21-1.75-.52-2.57-.9-1.46-.68-2.72-1.72-3.61-3.07-1-1.5-1.27-3.23-1.53-4.97-.27-1.8-.48-3.61-.81-5.41-.61-3.31-1.9-6.41-4.04-9.03-.3-.37-.63-.72-.96-1.06-.37-.39-.35-.76-.41-1.27-.14-1.22-.29-2.42-.38-3.65-.17-2.35-.22-4.72-.34-7.07,0-.17-.25-.17-.26,0-.13,2.5-.18,4.98-.02,7.48.07,1.11.21,2.22.37,3.33.13.89,1.08,1.47,1.64,2.11,2.75,3.13,3.67,7.05,4.16,11.08.42,3.41.29,6.97,2.63,9.74.93,1.11,2.23,1.94,3.56,2.47.79.31,1.59.54,2.42.71.31.06.62.11.93.15.44.06.82,0,1.23,0-.92,4.72-5.52,8.4-10.23,8.71-1.46.09-3.12-.14-4.43-.83,0,0-.01,0-.02,0,.09-.08.09-.24-.02-.33-3.76-2.77-5.34-8.1-4.41-12.62.25-1.23.5-2.46.54-3.72.05-1.42-.35-2.89-.62-4.27-.66-3.43-1.44-6.83-2.02-10.27,0-.03-.05-.02-.05.01.5,3.61,1.29,7.16,1.92,10.75.32,1.83.62,3.54.35,5.39-.21,1.45-.65,2.8-.96,4.2-.43,2,.24,4.38.97,6.23.73,1.84,2,3.93,3.98,4.6-.15.03-.3.08-.41.1-1.15.21-2.32.27-3.49.25-2.3-.04-4.07-1.09-5.8-2.52-.64-.53-1.2-1.3-1.89-1.73,0,0-.01,0-.02-.01-1.07-.67-2.18-1.41-3.03-2.35-.91-1.01,2.04-2.11,2.8-2.41.1-.04.21-.13.19-.25-.31-2.64-.29-5.33-.29-7.98,0-.01,0-.02,0-.04.32-1.19.32-2.48.56-3.69.14-.66.54-1.21.71-1.84.1-.36.04-.84.06-1.22.13-2.18.4-4.41.4-6.6,0,0,0,0,0,0-.06,2.23-.58,4.4-.8,6.6-.04.43.02.95-.2,1.34-.34.59-.51,1.27-.64,1.93-.22,1.06-.3,2.17-.41,3.25h0c-.85.23-1.61.15-2.43-.12-.25-.08-.49-.2-.72-.33,0,0,0,0,0,0,.12-.35.25-.7.38-1.05.57-1.59,1.14-3.18,1.72-4.76.16-.44.32-.89.48-1.33.12-.33-.03-.9-.02-1.25.02-2.21.25-4.41.4-6.61.35-5.12.48-10.27-1.89-14.99-1.24-2.46-1.17-5.2-1.37-7.9-.2-2.67.12-5.33.59-7.96.2-1.12.46-2.22.76-3.32.31-1.12.71-2.11.67-3.3-.09-2.37-1.39-3.74-2.82-5.46-4.56-5.49-9.17-10.94-13.38-16.71-3.36-4.59-6.17-9.49-10.77-12.99-5.11-3.89-11.08-6.8-16.82-9.62-9.6-4.73-19.58-8.99-28.17-15.47-2.04-1.54-4.21-2.89-6.3-4.36-2.29-1.6-4.15-3.36-5.88-5.55-3.38-4.26-6.14-8.98-9.6-13.18.47-.43.94-.87,1.39-1.32,2.85-2.82,5.38-5.91,8.25-8.71.06.09.18.16.3.1,3.87-1.76,7.68-3.51,11.76-4.73,2.09-.63,4.26-1.1,6.44-1.2,2.56-.12,5.07.53,7.48,1.31,3.43,1.12,6.72,2.66,10.25,3.47.88.2,1.81.46,2.72.41.41-.03-.3-.37-.32-.38-.06-.03-.11.06-.05.09.52.24.17.15-.16.07-.51-.12-1.01-.22-1.52-.34-.93-.22-1.88-.44-2.79-.74-4.07-1.35-8.02-3.24-12.27-3.98-3.79-.66-7.63.21-11.24,1.36-3.44,1.1-6.85,2.51-10.12,4.08.03-.03.06-.06.09-.09,3.26-3.07,6.52-6.12,9.9-9.05,3.63-3.15,7.51-5.93,11.59-8.46.04-.03,0-.09-.04-.07-7.74,4.45-14.43,10.42-20.95,16.45-1.63,1.51-3.29,2.98-4.83,4.58-1.38,1.45-2.72,2.94-4.1,4.39-2.83,2.98-6.1,5.92-10.04,7.33-.12.04-.07.24.06.2,1.88-.62,3.59-1.33,5.25-2.43.97-.65,1.87-1.38,2.73-2.16,4.08,5.01,7.16,10.76,11.44,15.62,1.97,2.23,4.72,3.84,7.15,5.51,2.68,1.83,5.19,3.86,7.93,5.61,11.03,7.02,23.43,11.53,34.63,18.25,2.74,1.64,5.47,3.37,7.79,5.58,2.08,1.98,3.76,4.34,5.39,6.69,3.83,5.55,8.01,10.81,12.33,15.99,1.08,1.3,2.17,2.59,3.26,3.89.89,1.06,2.18,2.2,2.78,3.45.57,1.19.83,2.55.62,3.86-.17,1.05-.65,2.1-.9,3.14-1.24,5.16-1.36,10.42-.54,15.66.23,1.45.97,2.57,1.51,3.9.81,2,1.26,4.14,1.45,6.28.33,3.74-.22,7.61-.47,11.34-.07,1.13-.21,2.3-.09,3.43.04.36-.4,1.29-.59,1.83-.68,1.88-1.36,3.77-2.03,5.65-.04.11.03.24.12.3,1.01.65,2.24.91,3.42.69,0,1.42.03,2.84.08,4.26.03,1,.08,2.01.17,3.01.03.32.37.08-.08.27-.43.18-.84.38-1.26.59-1.09.56-2.46,1.32-1.45,2.56.5.61,1.19,1.09,1.82,1.55.38.27,1.17.7,1.39.93,1.11,1.2,2.41,2.26,3.79,3.11,2.15,1.33,4.6,1.32,7.05.99.33-.04.66-.1.98-.17.07-.02.11-.03.14-.04,0,0,0,0,0,0,.64.32,1.34.51,2.03.66,2.46.52,5.02.03,7.22-1.14,2.27-1.21,4.17-3.21,5.31-5.51.25-.5.43-1.03.58-1.56.04-.13.31-.74-.03-.75.04,0,.07,0,.1,0,.53.01,1.06,0,1.59-.02,2.86-.1,7.3-.37,8.58-3.44.71-1.71.76-3.77.8-5.59.05-1.74-.02-3.49-.15-5.23-.06-.81.05-1.32.2-2.22.41-2.43.77-4.87,1.1-7.32.74-5.48,1.03-10.91.97-16.44-.02-2.39-.09-4.78-.16-7.17-.05-1.67-.1-3.24.24-4.89.51-2.48,1.15-4.91,1.22-7.45Z"/> <g> <g> <path class="cls-77" d="M116.11,410.11c-.12,0-.23-.05-.3-.15-.02-.03-1.84-2.43-3.61-3.62-.68-.45-1.32-.68-1.83-.86-.84-.29-1.63-.57-1.63-1.72,0-.02,0-.04,0-.07.18-1.01,1.17-6.07,3.05-6.07.94,0,1.85.5,2.63,1.44,1.92,2.3,2.78,6.82,2.06,10.74-.03.15-.14.27-.28.3-.03,0-.06,0-.09,0h0Z"/> <path class="cls-92" d="M109.11,403.76s1.02-5.76,2.68-5.76c3.09,0,5.35,6.17,4.32,11.73,0,0-1.85-2.47-3.7-3.7-1.85-1.24-3.29-.82-3.29-2.26Z"/> <path class="cls-93" d="M115,401.6c.44.92.52,1.8.19,1.95-.33.16-.44-.62-.88-1.54-.43-.92-1.03-1.64-.7-1.8.33-.16.95.46,1.39,1.39Z"/> </g> <g> <path class="cls-59" d="M591.48,402.71c-.11.02-.23,0-.32-.09-.02-.02-2.26-2.04-4.23-2.87-.75-.32-1.42-.42-1.96-.5-.88-.13-1.71-.26-1.93-1.38,0-.02,0-.04,0-.07-.02-1.03,0-6.18,1.85-6.54.93-.18,1.91.14,2.86.92,2.32,1.9,4.02,6.17,4.04,10.16,0,.15-.09.29-.22.35-.03.01-.05.02-.08.02h0Z"/> <path class="cls-106" d="M583.42,397.79s-.09-5.85,1.54-6.16c3.03-.58,6.42,5.06,6.45,10.71,0,0-2.28-2.08-4.33-2.94-2.05-.87-3.39-.19-3.66-1.6Z"/> <path class="cls-93" d="M588.79,394.57c.6.82.85,1.67.55,1.88-.3.22-.55-.53-1.15-1.35-.6-.83-1.32-1.42-1.03-1.63.3-.21,1.02.28,1.62,1.1Z"/> </g> <g> <path class="cls-60" d="M619.27,399.16c-.11.02-.22,0-.3-.08-.02-.02-2.1-1.9-3.93-2.67-.7-.29-1.32-.39-1.82-.46-.82-.12-1.59-.24-1.79-1.29,0-.02,0-.04,0-.06-.01-.96,0-5.75,1.72-6.08.86-.16,1.78.13,2.66.85,2.15,1.77,3.73,5.74,3.76,9.44,0,.14-.08.27-.21.32-.02.01-.05.02-.08.02h0Z"/> <path class="cls-18" d="M611.77,394.59s-.08-5.44,1.43-5.73c2.82-.54,5.96,4.7,6,9.95,0,0-2.12-1.93-4.03-2.73-1.91-.8-3.15-.17-3.4-1.49Z"/> <path class="cls-93" d="M616.76,391.59c.56.77.79,1.55.51,1.75-.27.2-.51-.49-1.07-1.26-.56-.77-1.23-1.32-.95-1.52.28-.2.95.26,1.51,1.02Z"/> </g> <g> <path class="cls-37" d="M684.98,380.15c.04-.08.11-.13.17-.13.02,0,1.71.12,2.86-.45.44-.22.77-.54,1.03-.8.43-.43.83-.83,1.33-.15.01.01.02.03.03.04.38.73,2.21,4.43,1.54,5.78-.34.67-.88,1.03-1.57,1.04-1.69.01-3.95-2.04-5.39-4.88-.05-.11-.07-.26-.03-.38,0-.02.02-.05.03-.07h0Z"/> <path class="cls-23" d="M690.24,378.88s2.13,4.14,1.54,5.33c-1.1,2.21-4.59.18-6.63-3.84,0,0,1.73.13,2.93-.46,1.2-.6,1.54-1.87,2.16-1.02Z"/> <path class="cls-93" d="M689.07,384.38c-.56-.23-.97-.69-.91-1.02.05-.33.43.05.98.29.55.24,1.08.23,1.03.56-.05.33-.54.41-1.1.17Z"/> </g> <g> <path class="cls-5" d="M683.31,368.54c.02-.09.07-.15.12-.15.01,0,1.45-.13,2.32-.86.34-.28.56-.66.75-.97.31-.51.61-1,1.09-.34,0,.01.02.03.03.04.37.7,1.98,3.86,1.55,5.06-.2.58-.56.92-1.05,1.03-1.19.25-3.1-1.04-4.73-3.37-.06-.1-.1-.24-.1-.37,0-.02,0-.05,0-.07h0Z"/> <path class="cls-76" d="M687.51,366.52s1.92,3.58,1.54,4.64c-.66,1.84-3.31.81-5.56-2.43,0,0,1.46-.12,2.36-.88.91-.77,1.05-2.16,1.66-1.34Z"/> <path class="cls-93" d="M687.11,371.69c-.43-.11-.78-.42-.78-.7,0-.29.33-.02.76.09.43.11.81.03.8.31-.01.27-.36.4-.78.3Z"/> </g> <g> <path class="cls-44" d="M694.08,381.04c.04-.08.11-.13.17-.13.02,0,1.71.12,2.86-.45.44-.22.77-.54,1.03-.8.43-.43.83-.83,1.33-.15,0,.01.02.03.03.04.38.73,2.21,4.43,1.54,5.78-.34.67-.88,1.03-1.57,1.04-1.69.01-3.95-2.04-5.39-4.88-.05-.11-.06-.26-.03-.38,0-.02.02-.04.03-.07h0Z"/> <path class="cls-107" d="M699.34,379.77s2.13,4.14,1.54,5.33c-1.11,2.21-4.59.18-6.63-3.84,0,0,1.73.13,2.93-.46,1.2-.6,1.54-1.87,2.16-1.02Z"/> <path class="cls-93" d="M698.17,385.27c-.56-.23-.96-.69-.91-1.02.05-.33.43.05.98.29.55.23,1.08.23,1.03.56-.05.33-.54.41-1.1.17Z"/> </g> <g> <path class="cls-101" d="M702.46,376.43c0-.09.04-.17.12-.19.02,0,2-.7,2.97-1.75.37-.4.55-.84.7-1.2.24-.58.47-1.13,1.41-.76.02,0,.04.02.05.03.83.46,4.99,2.86,4.99,4.36,0,.75-.41,1.33-1.18,1.66-1.89.81-5.6.08-8.81-1.75-.12-.07-.22-.2-.25-.32,0-.03,0-.05,0-.07h0Z"/> <path class="cls-64" d="M707.66,372.82s4.73,2.64,4.74,3.97c0,2.48-5.06,2.34-9.63-.25,0,0,2.03-.7,3.04-1.8,1.01-1.1.67-2.38,1.86-1.92Z"/> <path class="cls-93" d="M709.44,378.22c-.76.06-1.48-.15-1.6-.47-.13-.31.51-.16,1.27-.21.76-.06,1.34-.31,1.47,0,.13.32-.38.62-1.14.68Z"/> </g> <g> <path class="cls-53" d="M712.67,338.12c.05.15.13.3.21.46.17.34.39.77.45,1.31.17,1.42-.59,3.37-.6,3.39-.03.08,0,.16.07.22.02.01.04.03.06.04.12.06.28.07.4.02,3.48-1.25,6.46-3.58,7.07-5.54.19-.61.14-1.15-.15-1.59-2.38,1.1-4.91,1.79-7.51,1.68Z"/> <path class="cls-43" d="M713.05,338.12c.17.42.55.95.65,1.75.17,1.48-.61,3.47-.61,3.47,4.59-1.65,7.85-5,6.78-6.76-2.17.96-4.46,1.57-6.82,1.54Z"/> <path class="cls-93" d="M718.71,339.38c-.45.61-1.08,1.02-1.4.91-.32-.11.22-.49.67-1.1.45-.61.64-1.22.96-1.11.32.11.22.69-.23,1.3Z"/> </g> <g> <path class="cls-91" d="M626.46,390.23c-.08.02-.15,0-.21-.08-.01-.02-1.47-1.9-2.74-2.67-.49-.3-.92-.39-1.27-.46-.57-.12-1.11-.24-1.25-1.29,0-.02,0-.04,0-.06,0-.96,0-5.75,1.2-6.08.6-.17,1.24.13,1.85.85,1.5,1.77,2.6,5.74,2.62,9.44,0,.14-.06.27-.15.32-.02.01-.04.02-.05.02h0Z"/> <path class="cls-26" d="M621.23,385.66s-.06-5.44,1-5.73c1.97-.54,4.16,4.7,4.18,9.95,0,0-1.48-1.93-2.81-2.73-1.33-.8-2.2-.17-2.37-1.49Z"/> <path class="cls-93" d="M624.71,382.66c.39.77.55,1.55.36,1.75-.19.2-.35-.49-.75-1.26-.39-.77-.86-1.32-.66-1.52.19-.2.66.26,1.05,1.02Z"/> </g> <g> <path class="cls-57" d="M440.21,366.61c-.1.06-.22.07-.34.03-.03-.01-2.83-1.12-4.97-1.2-.82-.03-.55-.1-1.08.01-.87.19-1.69.36-2.29-.62-.01-.02-.02-.04-.03-.06-.38-.96-2.17-5.79-.57-6.77.8-.49.91-.33,2.07.07,2.84.97,5.93,4.37,7.36,8.09.05.14.02.3-.09.4-.02.02-.04.04-.07.05h0Z"/> <path class="cls-30" d="M431.86,364.64s-2.14-5.45-.72-6.31c2.63-1.61,6.86,2.69,8.88,7.96,0,0-2.87-1.14-5.09-1.23-2.22-.09-2.31.8-3.06-.43Z"/> <path class="cls-93" d="M434.86,359.96c.8.63,1.27,1.37,1.04,1.66-.23.29-.67-.36-1.47-.99-.8-.63-1.66-1-1.43-1.29.23-.29,1.06-.01,1.86.62Z"/> </g> <g> <path class="cls-22" d="M452.01,360.63c-.08.07-.18.1-.29.07-.03,0-2.58-.74-4.42-.55-.71.07-.48-.03-.93.15-.73.3-1.41.58-2.05-.32-.01-.02-.02-.04-.03-.06-.44-.9-2.57-5.46-1.3-6.64.63-.59.74-.44,1.79-.2,2.56.59,5.63,3.57,7.3,7.07.06.13.05.29-.03.41-.01.02-.03.04-.05.06h0Z"/> <path class="cls-103" d="M444.58,359.74s-2.49-5.12-1.38-6.16c2.07-1.93,6.23,1.79,8.6,6.76,0,0-2.61-.76-4.53-.57-1.92.2-1.89,1.09-2.69-.03Z"/> <path class="cls-93" d="M446.6,354.72c.77.52,1.26,1.2,1.1,1.52-.16.32-.62-.27-1.39-.79-.77-.52-1.55-.78-1.39-1.1.16-.31.91-.15,1.68.37Z"/> </g> <g> <path class="cls-9" d="M454.3,354.39c-.05.07-.12.1-.2.08-.02,0-1.88-.6-3.19-.36-.5.1-.35-.01-.66.17-.5.31-.98.59-1.48-.22,0-.02-.02-.03-.03-.05-.36-.83-2.11-5.05-1.26-6.2.42-.58.51-.44,1.27-.26,1.86.46,4.21,3.15,5.57,6.39.05.12.05.28,0,.39-.01.02-.02.04-.04.06h0Z"/> <path class="cls-17" d="M448.95,353.83s-2.04-4.73-1.29-5.75c1.39-1.9,4.54,1.45,6.48,6.04,0,0-1.9-.62-3.27-.36-1.37.26-1.3,1.1-1.92.07Z"/> <path class="cls-93" d="M450.14,349.03c.57.46.96,1.08.86,1.39-.1.3-.46-.23-1.03-.69-.57-.46-1.15-.68-1.05-.98.1-.3.64-.17,1.22.29Z"/> </g> <g> <path class="cls-50" d="M448.26,345.48c-1.57-3.15-4.07-5.68-5.95-6.04-.77-.14-.86-.27-1.25.33-.2.31-.21.83-.11,1.42,2.35.68,4.64,2.39,5.74,4.58.76.08,1.36.23,1.38.23.08.02.15-.02.2-.09.01-.02.02-.04.03-.06.04-.12.03-.27-.03-.39Z"/> <path class="cls-94" d="M446.49,345.42c.87.07,1.59.25,1.59.25-2.22-4.47-5.57-7.62-6.84-5.63-.16.25-.15.7-.05,1.23,2.13.68,4.18,2.2,5.3,4.15Z"/> <path class="cls-93" d="M443.78,340.84c.6.43,1.02,1.02.94,1.33-.08.31-.47-.2-1.07-.63-.6-.42-1.19-.61-1.11-.92.08-.31.63-.21,1.24.22Z"/> </g> <g> <path class="cls-10" d="M131.79,405.36c-.11,0-.22-.04-.3-.13-.02-.02-1.88-2.26-3.65-3.32-.68-.41-1.3-.59-1.8-.74-.82-.25-1.6-.48-1.65-1.58,0-.02,0-.04,0-.06.13-.99.84-5.91,2.66-6,.91-.04,1.81.39,2.61,1.26,1.96,2.13,3,6.45,2.48,10.26-.02.14-.12.26-.26.3-.03,0-.05.01-.08.01h0Z"/> <path class="cls-36" d="M124.75,399.57s.71-5.6,2.31-5.68c2.98-.14,5.45,5.71,4.71,11.11,0,0-1.9-2.3-3.74-3.4-1.84-1.1-3.21-.64-3.28-2.03Z"/> <path class="cls-93" d="M130.32,397.21c.46.87.58,1.71.27,1.88-.31.17-.45-.58-.92-1.45-.46-.87-1.07-1.53-.76-1.7.31-.17.94.4,1.4,1.27Z"/> </g> <g> <path class="cls-100" d="M140.17,399.08c-.09,0-.17-.04-.23-.11-.02-.02-1.48-1.94-2.86-2.85-.53-.35-1.02-.51-1.41-.63-.64-.21-1.25-.41-1.29-1.36,0-.02,0-.04,0-.05.1-.85.66-5.06,2.08-5.14.71-.04,1.42.34,2.04,1.08,1.53,1.83,2.35,5.52,1.94,8.79-.01.12-.1.22-.2.26-.02,0-.04,0-.07.01h0Z"/> <path class="cls-51" d="M134.65,394.12s.56-4.8,1.81-4.87c2.33-.12,4.27,4.89,3.69,9.52,0,0-1.49-1.97-2.93-2.91-1.45-.95-2.52-.55-2.57-1.74Z"/> <path class="cls-93" d="M139.02,392.1c.36.75.46,1.46.21,1.61-.25.14-.36-.5-.72-1.24-.36-.75-.84-1.31-.59-1.46.25-.14.74.35,1.1,1.09Z"/> </g> <g> <path class="cls-81" d="M143.97,392.18c-.06.01-.12-.01-.17-.07-.01-.01-1.15-1.42-2.15-2.02-.39-.23-.73-.32-1-.38-.45-.11-.88-.21-.98-.97,0-.01,0-.03,0-.04,0-.69.06-4.11,1.02-4.3.48-.09.99.14,1.46.69,1.18,1.33,2.01,4.21,1.98,6.86,0,.1-.05.19-.12.22-.01,0-.03.01-.04.02h0Z"/> <path class="cls-67" d="M139.86,388.69s.02-3.89.86-4.06c1.57-.31,3.26,3.53,3.22,7.29,0,0-1.16-1.44-2.21-2.07-1.05-.63-1.75-.21-1.87-1.16Z"/> <path class="cls-93" d="M142.66,386.69c.3.57.42,1.13.27,1.27-.16.14-.28-.37-.58-.93-.3-.57-.67-.98-.51-1.11.16-.14.53.21.83.78Z"/> </g> </g> </g> </g> <g> <g> <path d="M762.68,44.73c-.05-.47-.1-.92-.07-1.31.07-.97.06-2.03-.06-3.23-.24-2.37-.94-4.44-2.03-5.99-.92-1.31-2.11-2.25-3.53-2.81-1.35-.53-2.86-.78-4.64-.78-1.22,0-2.55.12-4.09.38-3.03.5-5.93,1.52-8.75,2.51l-.22.08c-2.52.88-4.6,1.7-6.58,3.42-1.62,1.41-2.99,3.07-4.32,4.68-.39.48-.78.95-1.18,1.42-.99,1.17-1.99,2.2-3.02,3.14-.96-1.19-2.09-2.25-3.18-3.29-.43-.4-.85-.8-1.26-1.2-.73-.71-1.36-1.54-2.04-2.41-1.44-1.86-2.94-3.78-5.39-4.71-.7-.61-5.35-4.66-7.64-5.93-.85-1.29-5.06-7.66-7.56-9.95-.19-.17-.43-.27-.68-.27-.08,0-.16.01-.25.03l-.09.02c.04-.22,0-.45-.12-.65-.18-.32-.51-.51-.87-.51-.04,0-.08,0-.11,0-.12.01-.78.09-1.56.28.06-.36-.07-.73-.36-.96-.12-.09-1.22-.92-3.57-.92-.3,0-.6.01-.91.04-.18.01-.37.02-.56.02-1.73,0-4.07-.5-5.63-.83-1-.21-1.42-.3-1.71-.3-.45,0-.84.22-1.06.58-.71-.32-1.57-.58-2.48-.58-.36,0-.7.19-.88.51-.11.19-.15.42-.12.63-.91.03-2.13.09-3.51.19-.56.04-1.21.08-1.93.12-2.95.16-6.99.37-10.49,1.48-1.71.54-3.38,1.19-4.85,1.76-2.03.78-3.94,1.52-4.82,1.52-1.65,0-5.96.86-7.05,1.08-.3-.39-.62-.81-.95-1.27-.35-.48-.69-.96-1.03-1.44-.5-.7-1.01-1.42-1.53-2.12-2.54-3.4-5.98-6.07-9.3-8.66l-.09-.07c-.37-.29-.75-.58-1.15-.88l-.09-.07c-.1-.09-.26-.49-.36-.73-.11-.28-.23-.56-.38-.83-.97-1.65-2.4-3.26-4.14-4.65-.33-.26-.71-.4-1.14-.4-.37,0-.71.1-.98.19-.08.03-.17.05-.25.07-1.01.26-2.05.66-3.09,1.18-1.71.87-3.3,2.19-4.6,3.84-2.15,2.73-3.52,6.42-4.17,11.28-.61,4.5-.44,9.04-.22,12.5.07,1.08.15,2.33.29,3.56.13,1.16.29,2.18.49,3.12.5,2.35,1.41,4.82,2.86,7.78.82,1.67,1.73,3.32,2.61,4.92,1.71,3.11,3.48,6.31,4.58,9.72-2.14,2.19-5.37,4.38-8.47,4.38-.92,0-1.79-.2-2.58-.58-.14-.07-.32-.11-.47-.11-.41,0-.8.24-.98.61-.18.36-.14.79.12,1.14.46.61.92,1.22,1.44,1.81-.66-.08-1.36-.29-2.08-.61,0,0,0,0-.02,0l-.23-.2c-.18-.16-.44-.26-.69-.26-.43,0-.82.27-.98.67-.12.32-.06.71.14.99-.12.08-.22.18-.31.3-.21.3-.25.67-.13,1.01.28.75.43,1.44.47,2.13,0,.06-.02.13-.04.2-.08.39-.22,1.03.22,1.55.23.26.45.51.69.74-1.27,2.95-4.65,8.64-6.84,8.64h-.02c-.16,0-.61-.03-1.15-.78-.22-.31-.58-.49-.96-.49-.55,0-1.02.39-1.12.94-.24,1.36-.15,2.73-.06,4.06.13,1.98.26,3.85-.76,5.45-.55.35-1.06.76-1.51,1.19-.34.33-.44.82-.27,1.25.16.39.5.66.91.72-.06.14-.08.3-.07.46.07,1.3.72,2.31,1.29,3.21.7,1.08,1.11,1.79.9,2.73-.17.74-.79,1.16-1.79,1.78-.93.58-1.98,1.23-2.5,2.42-.14.31-.13.67.03.98-.5.36-.95.73-1.33,1.06-.36.31-.49.8-.33,1.25.17.45.6.76,1.09.76.06,0,.16,0,.22-.02.49-.1,1.01-.15,1.55-.15.13,0,.26,0,.39,0-.1,2.7-.6,4.26-2.43,4.32-.57.02-1.02.44-1.09,1.01-.06.56.29,1.07.83,1.21,1.1.29,2.05.96,3.07,1.66.24.17.48.33.72.5-.63-.05-1.26-.16-1.87-.33-.09-.02-.21-.04-.31-.04-.5,0-.93.34-1.07.82-.13.48.07,1,.49,1.25,1.89,1.15,3.81,1.81,5.73,1.97-.07.17-.09.36-.07.55.07.5.45.9.94.97.95.14,2,.22,3.18.24-1.4,1.33-3.22,2-5.44,2-.33,0-.67-.01-1.02-.04-.03,0-.07,0-.09,0-.53,0-.99.38-1.1.91-.11.53.15,1.05.64,1.26,1.06.46,2.19.7,3.28.92.67.14,1.29.27,1.89.45.72.21,1.53.47,2.09.89,0,0,.04.04.05.04l.04.03.03.02c.09.09.16.17.2.25-.01.1-.1.44-.79,1.1-.33.32-.44.8-.27,1.22.17.42.59.71,1.05.71.16,0,.32-.03.47-.1.08-.04.17-.08.25-.12-.03.16-.05.32-.07.48-.07.46-.13.9-.21,1.29-.06.33.03.67.24.93.21.26.53.4.86.4.28,0,.55-.11.76-.3.06.05.12.1.18.14l.36.23c2.71,1.72,5.26,3.35,6.07,6.4.06.23.2.44.38.58.14.55.33,1.09.58,1.62.18.38.57.62.99.62.35,0,.66-.16.86-.41.53,1.38,1.35,2.53,2,3.37.22.28.54.44.89.44.33,0,.65-.15.87-.4.23-.26.33-.61.29-.94-.02-.12-.03-.24-.04-.36.86,1.23,1.88,2.36,2.82,3.41.28.31.56.62.83.92.02.02.03.03.05.05-.05.05-.09.1-.13.15-.35.44-.67.89-.99,1.35-.66.95-1.22,1.95-1.77,2.92l-.04.07c-.54.95-1.1,1.94-1.68,2.88-.45.74-.3,1.59-.2,2.21.02.11.04.21.05.31.19,1.44.52,2.99,1.03,4.74,1.09,3.76,2.66,6.86,4.68,9.21,1.13,1.31,2.45,2.31,3.95,2.98,1.23.55,2.5.73,3.73.9.31.05.61.09.91.14.32,1.36.13,2.55-.59,3.68-.21.32-.24.72-.08,1.07.16.34.47.58.83.64,2.24.35,3.82,1.16,4.96,2.56.07.08.14.15.23.21.66,1.77,1.79,3.3,3.44,4.67.2.17.46.26.73.26.34,0,.66-.15.87-.41.16.13.33.25.49.37.73.53,1.5.98,2.24,1.42.89.53,1.72,1.03,2.49,1.63.2.16.45.25.71.25.39,0,.74-.2.95-.52.21-.33.23-.73.06-1.09-.05-.1-.1-.21-.14-.32.82.5,1.69.91,2.53,1.32,1.2.58,2.34,1.12,3.32,1.87.19.14.42.22.66.22.39,0,.75-.21.95-.54.51.28,1.03.53,1.54.75.15.07.3.1.46.1.5,0,.94-.32,1.09-.81.11-.36.03-.75-.19-1.03.27.06.55.12.83.17.68.11,1.38.16,2.13.16,1.75,0,3.49-.29,5.17-.57,1.59-.27,3.09-.52,4.59-.54.06,0,.12,0,.18-.01.19.15.43.24.69.24.34,0,.66-.16.88-.42.21-.26.29-.6.22-.93-.07-.33-.15-.98-.18-1.52.11.05.21.11.32.16.51.25.99.49,1.44.78.18.12.39.18.6.18.44,0,.84-.26,1.02-.67.18-.41.11-.88-.19-1.22-.09-.1-.18-.2-.25-.31.71.09,1.41.11,2.09.11.45,0,.85-.27,1.03-.69.17-.42.08-.89-.24-1.21l-.19-.19s.04-.02.07-.04c.18-.09.35-.18.53-.27.59-.29,1.19-.6,1.77-1.01.72-.53,1.13-1.21,1.18-1.96h.19s.02,0,.02,0c.11.04.26.07.38.07.16,0,.32-.04.46-.1.14.05.28.08.43.08.56,0,1.02-.4,1.1-.95.17-1.24,1.18-2.19,2.24-3.19.17-.16.34-.32.5-.48,1.76-1.72,3.09-3.58,4.18-5.87.19-.41.39-.82.58-1.23.71-1.52,1.45-3.09,2.3-4.55.78-1.34,1.76-2.63,3.06-4.05.35-.23.75-.49,1.16-.78.29-.01.56-.15.75-.39.18-.23.37-.45.59-.7.16-.15.31-.3.44-.45,1.91-1.78,4.03-2.06,6.28-2.35.6-.08,1.21-.16,1.82-.27,1.07-.19,2.13-.41,3.15-.64,1.83-.12,3.65-.46,4-.52h-.05s.11-.01.11-.01h.07c.26-.06.54-.12.83-.19,1.26-.3,2.84-.67,4.2-.67,2.23,0,2.75.99,2.96,1.95.13.62.67,1.05,1.31,1.05.48,0,.93-.25,1.18-.66.88-1.46,2.03-2.87,3.25-4.35,1.68-2.05,3.4-4.14,4.47-6.52,0,.28.11.54.31.74.2.2.48.32.77.32.46,0,.87-.29,1.03-.72.95-2.57,1.28-5.22,1.48-7.48.05-.52.08-1.05.11-1.57.08,0,.2-.02.35-.02.18,0,.34,0,.48.02.09,0,.16,0,.22,0,1.48.03,2.81.77,3.67,1.39.19.14.41.21.64.21.33,0,.64-.15.86-.41.22-.26.31-.61.25-.95-.37-1.9.09-3.83.58-5.87.14-.58.28-1.16.39-1.73.04-.18.07-.37.1-.55,0,.2,0,.41,0,.61,0,.64.5,1.14,1.14,1.14.49,0,.93-.31,1.08-.77l.06-.18c.44-1.25.92-2.61,1.25-4.02.2.16.45.26.7.26.57,0,1.04-.42,1.09-.99.07-.73.18-1.48.28-2.21.24-1.68.48-3.41.38-5.2-.05-.8-.2-1.58-.44-2.34,1.1.27,2.16.35,3.14.37.48,0,.92-.31,1.08-.78.16-.45.02-.96-.35-1.26-.03-.02-.06-.05-.09-.07.26-.11.48-.32.6-.59.18-.41.1-.89-.21-1.22-1.23-1.32-2.56-2.56-3.85-3.77-.31-.29-.62-.58-.93-.88-.14-.13-.27-.26-.41-.39.14.03.29.05.43.08,1.63.31,3.17.59,4.28,1.64.21.2.48.31.76.31.37,0,.71-.19.92-.5.21-.32.24-.71.09-1.06-1.38-3.17-4.04-4.66-6.61-6.1-.28-.16-.56-.31-.84-.47.03,0,.05,0,.08,0,1.46.1,2.84.19,4.03.88.17.1.36.15.56.15.42,0,.81-.24,1-.61.19-.37.15-.8-.09-1.14-.72-.99-1.45-1.88-2.21-2.7,0-.17-.04-.33-.11-.49-1.11-2.28-2.73-4.12-4.56-5.82h.09c1.04,0,2.17-.11,3.44-.32.55-.09.94-.56.93-1.11-.01-.57-.44-1.05-1.01-1.13-3.42-.44-6.86-2.77-9.29-6.28,1.84-3.73,4.73-7.03,7.3-9.96,1.82-2.07,3.14-4.4,3.94-6.91.34-1.09.58-2.21.81-3.29.23-1.08.45-2.09.76-3.09.45-1.43,1.32-2.81,2.16-4.15.26-.41.52-.82.76-1.22,1.06-1.77,2.38-4.13,3.19-6.74.35-1.13.57-2.35.67-3.65.05-.6-.02-1.16-.08-1.71ZM597.23,93.54c.07,0,.14,0,.21,0,.71,0,1.32.12,1.84.36-.24.05-.47.08-.69.08-.52,0-.95-.14-1.35-.43Z"/> <g> <g> <path class="cls-33" d="M672.3,158.56c-2.07,0-10.35,1.48-13.3,1.77-2.96.29-22.17,8.28-22.17,8.28l-3.84,8.28c.89,2.07.89,3.84-.29,5.62,2.07.29,4.43,1.18,5.62,2.96h.24s.06.29.06.29c.59,1.77,1.77,3.25,3.25,4.43-.59-1.18-.89-2.36-1.18-3.55,1.77,3.84,5.03,4.44,7.98,6.8-.59-1.18-.88-2.66-1.48-3.84l.13-.25.46.54c2.07,2.36,5.62,2.96,8.28,5.03-.97-1.46-2.13-2.92-2.85-4.54.46.24.78.4.78.4.89,2.37,2.96,3.55,5.03,4.43-1.77-1.18-3.25-2.66-3.55-4.73,4.73,5.62,10.94,2.07,17.15,2.07l.89.3c-.29-1.18-.29-2.37,0-3.55.89.59,2.37,1.18,3.25,1.77-.89-.89-1.18-2.07-1.77-2.96,1.48.89,2.95.89,4.43.89-.3-.29-.89-.89-1.18-1.18,1.61-1.34,5.16-1.95,4.05-4.03l2.75-.11c.3-2.96,4.14-4.14,6.5-8.87,2.09-4.18,3.55-8.87,9.17-13.6,0,0-26.31-2.66-28.38-2.66Z"/> <path class="cls-8" d="M691.51,174.82c2.09-4.18,3.55-8.87,9.17-13.6,0,0-26.31-2.66-28.38-2.66s-10.35,1.48-13.3,1.77c-2.96.29-22.17,8.28-22.17,8.28l-3.84,8.28c.86,1.99.88,3.72-.18,5.43,2.5-1.75,4.91-.18,7.84-.37,1.73-.11,3.06-.81,5.05-.61,2.16.22,4.32.42,6.43.83,3.48.66,8.1,3.03,11.31,2.71,4.03-.41,7.63-1.14,11.75-1.33,2.47-.12,4.33-2.32,6.42-3.6,2.15-1.32,3.77-4.46,6.62-3.9.24,1.2-.25,2.67-.85,3.99,1.31-1.28,2.92-2.77,4.14-5.21Z"/> <path class="cls-61" d="M633.34,182.5c-.65-.14-.21-.46-.04-.91.21-.53.33-1.06.39-1.62.11-1.07-.29-2.13-.7-3.09,0-.01-.03,0-.03.01.74,1.93.74,3.78-.38,5.56-.04.06,0,.16.07.17,2.2.34,4.15,1.17,5.58,2.91.07.08.2-.02.15-.11-1.07-1.71-3.15-2.52-5.04-2.91ZM647.25,189.55c-.05-.09-.21-.03-.16.07.47,1.14.81,2.33,1.29,3.46-2.72-1.99-6.19-3.18-7.61-6.5-.05-.12-.23-.03-.21.09.25,1.06.56,2.1.99,3.1-1.27-1.12-2.29-2.43-2.89-4.03-.03-.07-.13-.04-.11.03.61,1.83,1.75,3.28,3.23,4.5.1.08.24-.02.18-.14-.41-.88-.7-1.78-.95-2.7.74,1.19,1.61,2.17,2.8,3.02,1.54,1.11,3.27,1.9,4.76,3.07.11.08.25-.02.19-.14-.58-1.25-.87-2.61-1.5-3.83ZM652.85,189.26c-.04-.09-.16-.02-.15.06.24,1.18.93,2.27,1.58,3.26.4.61.83,1.2,1.25,1.8.02.03.04.05.06.08-.02-.02-.04-.03-.07-.05-.28-.2-.58-.37-.88-.55-2.29-1.34-4.98-2.04-6.87-4-.02-.02-.06.01-.04.04,2.19,2.5,5.65,3.15,8.24,5.1.09.07.21-.06.15-.15-1.24-1.84-2.4-3.55-3.28-5.6ZM672.59,192.39c-2.92.01-5.77.77-8.67,1.04-3.31.31-6.17-.45-8.41-3.02-.07-.08-.18,0-.17.1.28,1.69,1.25,2.96,2.5,4.01-1.63-.85-3.09-1.99-3.86-3.75-.01-.03-.06,0-.05.02.88,2.34,2.77,3.57,4.98,4.54.16.07.28-.13.13-.23-.98-.67-1.86-1.4-2.57-2.36-.3-.41-.52-.88-.7-1.35-.33-.86-.13-.5.35-.02,1.29,1.28,2.96,2.03,4.74,2.32,3.88.62,7.83-.9,11.72-.96.21,0,.22-.34,0-.34ZM681.79,182.97c-.13-.05-.2.13-.13.22.54.64.95,1.38.36,2.13-.33.41-.85.68-1.3.93-.88.48-1.8.88-2.59,1.5-.05.04-.04.12,0,.16.2.2.39.39.59.59.39.39.6.41-.07.41-1.3,0-2.5-.23-3.65-.86-.08-.04-.18.04-.13.12.52.83.84,1.72,1.39,2.51-.91-.51-1.86-.92-2.74-1.47-.06-.04-.15,0-.17.07-.27,1.22-.26,2.39.01,3.61.03.13.22.07.2-.05-.09-.43-.59-3.66.38-3.1.89.51,1.85.9,2.72,1.45.12.07.23-.09.14-.18-.49-.54-.81-1.12-1.13-1.76-.15-.3-.31-.59-.47-.88.08.13.36.2.47.24,1.22.46,2.43.52,3.72.53.09,0,.14-.12.08-.18l-1.01-1.01c-.16-.16,1.03-.76,1.13-.82.74-.38,1.5-.72,2.18-1.21,1.02-.74.94-1.66.35-2.54.65.18,1.34.22,1.98.45.13.05.22-.16.09-.22-.76-.34-1.62-.3-2.39-.61ZM700.64,161.16c-4.26,3.19-6.55,7.89-8.76,12.57-1.12,2.37-2.63,4.26-4.49,6.09-1.12,1.1-2.29,2.23-2.49,3.86-.01.12.2.15.22.03.25-1.83,1.79-3.04,3.04-4.26,1.7-1.65,2.96-3.45,3.98-5.58.94-1.97,1.82-3.97,2.92-5.86,1.52-2.6,3.53-4.67,5.67-6.75.05-.05-.02-.14-.08-.1Z"/> </g> <g> <g> <path class="cls-56" d="M755.66,115.91c-2.88-3.1-6.43-5.77-8.87-9.09,2.44,2.88,7.32,1.55,9.98,4.21-2.22-5.32-7.98-5.1-11.31-9.53,2.22,2.22,6.65.67,9.54,2.44-.91-1.24-1.85-2.35-2.86-3.35.27.02.42.03.42.03-1.77-3.77-4.88-5.99-7.98-8.65,2,1.55,5.32,1.33,7.76.89-4.21-.44-9.31-4.43-11.09-8.43l-1.33-8.65s-2.66-.44-4.66-.67c2.44-5.32,2.44-12.64,2.22-13.75-.22-1.11-12.27-10.72-12.27-10.72-.99-3.64-4.16-5.66-6.52-8.3-2.11-2.37-3.61-5.62-6.79-6.78l-7.91-5.47s-.04.02-.11.07c-1.99-2.02-4.33-4.28-4.33-4.28l-5.54-2.88-6.21-3.33s-11.97-.89-12.64-.89-14.41,2.66-15.08,2.88c-.67.22-10.64,1.77-10.64,1.77l-6.21-.44-1.55.89-18.4,29.71c-.83.39-.86,2.25-.44,4.84-2.74,3.63-9.12,7.67-13.53,5.36.89,1.11,1.77,2.44,3.11,3.33l.05.06c-1.81.4-3.7.17-5.36-.72,1.71,1.66,3.65,2.88,6.2,2.88-2.22.67-4.66-.22-6.65-1.55.44,1.11.66,2.44.44,3.55.43.54.86.97,1.31,1.32h-.21c-.89,2.89-6.87,13.53-10.2,8.66-.67,3.33,1.11,7.1-1.11,9.98,0,0,.07,0,.2.02-.65.36-1.25.81-1.75,1.31,2-.44,4.43-.44,5.77,1.33l.03-.08c-.02.32-.03.53-.03.53-1.55.89-3.55,1.11-4.88-.22,0,2,2.66,3.55,2.22,5.99-.44,2.44-3.77,2.88-4.44,4.66,1.55-.66,3.33-.66,4.88-.22-2.66-.22-4.66,1.11-6.43,2.66,1.33-.29,2.85-.19,4.37.17l-1.04.06c0,2.66-.22,6.21-3.55,6.21,2.88.66,4.66,3.77,7.98,3.77-2,.67-4.44.89-6.65.22,2.88,1.77,5.99,2.44,9.09,1.33-.89.89-1.77,1.55-2.88,2,1.33.22,3.55.22,4.66.22l.2.91c-.13-.02-.2-.03-.2-.03-1.77,2.88-5.1,3.55-8.2,3.33,2,.89,11.53,1.55,7.09,5.54,1.11-.44,1.77-1.11,2.44-2l.13.03c-.53,1.67-.77,3.52-1.01,4.85.89-1.33,2-2.22,3.33-2.44-.89.67-1.11,1.55-1.77,2.44,3.1,2,5.99,3.55,6.87,7.32l.19-.18c.1.7.33,1.43.7,2.17.22-1.55.67-2.88,1.55-3.99-.44,2.88.44,5.1,2.22,7.32-.22-1.33,0-2.66.67-3.77.66,2,4.88,6.87,4.88,6.87l.94-.55c-.03.41-.05.82-.05,1.22v.22c-2.22,2.44-3.55,5.54-5.32,8.2.22,5.32,3.33,14.63,8.43,17.07,2.44,1.11,5.1.67,7.54,2l2.66.44,2-.44,1.77-2.44,3.1-1.11,8.05-.82c.92.6,2.01,1.26,2.37,1.26.67,0,4.88,3.1,4.88,3.1,0,0,2.44,2.44,3.32,2.44s5.1-.44,9.09,0c3.99.44,8.65-2.66,8.65-2.66,3.04-1.41,6.24-4.05,8.59-7.24l.5.14c4.66-5.99,10.2-7.1,11.97-10.64l9.3-1.89c2.33.14,5.78-.55,5.78-.55,2.88-.66,8.65-2.66,9.54,1.77,2.54-4.45,8.33-8.7,8.83-14.11l.7.14c.44,1.11.44,2.44.44,3.77,1.11-3.33,1.33-5.99,1.55-9.53,2.22-.67,4.66,0,6.43,1.33-1.11-5.1,2.88-9.76.22-14.85l.44-1.11c2.44,2.22,2.66,5.1,2.66,8.2,1.55-4.43,2.88-8.65-.22-12.64,2.44,2.44,3.55,4.43,3.33,7.98.38-4.03,1.6-7.89-.81-11.45.1-.06.15-.08.15-.08,1.55.89,3.33,1.11,5.1,1.11-1.01-.79-1.86-1.86-2.76-2.85l.54.41c.89.22,1.77.44,2.44.44ZM607.11,66.47s0,0,.01,0c-.08-.08-.16-.15-.23-.23l.22.22Z"/> <path class="cls-28" d="M680.57,102.69s-2.37,6.21-2.66,9.76c0,0-1.77-4.14-1.77-6.21,0,0-1.18,5.91,1.77,12.12,2.96,6.21,4.44,9.46,4.73,11.23.3,1.77,6.8,5.91,6.8,5.91,0,0-1.48-3.55-2.07-7.09-.59-3.55-.29-6.8-.29-6.8l1.18-5.32-7.69-13.6Z"/> <path class="cls-16" d="M645.39,100.62s.3,5.91-1.48,10.05c-1.77,4.14-6.5,11.53-7.39,13.01-.89,1.48-2.37,2.36-2.37,2.36,0,0,1.48-2.66,2.66-6.5,0,0-2.96-6.5-2.96-10.94l11.53-7.98Z"/> <path class="cls-70" d="M681.76,82.88l-2.66-4.73,5.32-4.14s2.66-1.18,3.55-1.18,2.37,3.84,4.43,4.43l3.25-1.18s0-8.28-1.18-10.94l-1.18-3.84,3.25-2.07s7.39.59,9.16,1.77c1.77,1.18,9.75,9.16,9.75,9.16l5.03,4.73s-.3-5.03-2.07-7.69c-1.77-2.66-3.84-9.16-6.8-10.35-2.96-1.18,12.42,2.66,12.42,2.66,0,0,8.08,2.78,10.47,4.37.71-1.07,1.47-2.22,2.25-3.45-2.64-2.7-11.53-9.79-11.53-9.79-.99-3.64-4.16-5.66-6.52-8.3-2.11-2.37-3.61-5.62-6.79-6.78l-7.91-5.47s-.04.02-.11.07c-1.99-2.02-4.33-4.28-4.33-4.28l-5.54-2.88-6.21-3.33s-11.97-.89-12.64-.89-14.41,2.66-15.08,2.88c-.67.22-10.64,1.77-10.64,1.77l-6.21-.44-1.55.89-15.51,25.04c.76-.22,1.37-.35,1.76-.35,2.37,0,11.83.59,11.83.59-11.23,6.5-13.6,11.83-15.37,14.78-1.77,2.96,2.66,1.18,2.66,1.18l6.8-5.91c4.73-4.43,18.92-7.39,18.92-7.39,0,0,.59,1.48-1.18,4.43-1.77,2.96-7.68,12.42-5.91,11.53,1.77-.89,5.91,1.77,5.91,1.77l1.77,2.07-.3,4.14s-4.44,3.84-6.8,7.98c-1.05,1.85-1.35,4.1-1.34,6.04l.31.17s6.21-2.66,14.19-2.66c6.94,0,20.24,7.37,23.6,9.3l1.09-4.57-2.36-9.16Z"/> <path class="cls-29" d="M755.66,115.91c-2.88-3.1-6.43-5.77-8.87-9.09,2.44,2.88,7.32,1.55,9.98,4.21-2.22-5.32-7.98-5.1-11.31-9.53,2.22,2.22,6.65.67,9.54,2.44-.91-1.24-1.85-2.35-2.86-3.35.27.02.42.03.42.03-1.77-3.77-4.88-5.99-7.98-8.65,2,1.55,5.32,1.33,7.76.89-4.21-.44-9.31-4.43-11.09-8.43l-1.33-8.65s-2.66-.44-4.66-.67c1.29-2.81,1.9-6.18,2.15-8.89-1.15-.86-2.05-1.57-2.45-1.97-1.48-1.48-10.94-4.73-10.94-4.73,0,0-15.37-3.84-12.42-2.66,2.96,1.18,5.03,7.69,6.8,10.35,1.77,2.66,2.07,7.69,2.07,7.69l-5.03-4.73s-7.98-7.98-9.75-9.16c-1.77-1.18-9.16-1.77-9.16-1.77l-3.25,2.07,1.18,3.84c1.18,2.66,1.18,10.94,1.18,10.94l-3.25,1.18c-2.07-.59-3.55-4.43-4.43-4.43s-3.55,1.18-3.55,1.18l-5.32,4.14,2.66,4.73,2.36,9.16-1.48,6.21c-2.66,5.91-2.96,14.19-2.96,14.19,0,0,3.58-.65,7.24-1.35l-.14.17-.89,1.48-.3,6.21v2.96s2.07.89,3.84-1.18c1.78-2.07,5.32-2.37,5.32-2.37,0,0,2.66.89,5.92-2.37,3.25-3.25,5.32-4.43,5.32-4.43,0,0,2.37-2.07,2.66-2.96.07-.22.2-.54.35-.92l2.02,1.21s1.18,3.25.59,6.21c-.59,2.96-3.55,2.96-5.62,6.8-2.07,3.84-6.8,5.91-6.8,5.91h-4.43l1.48,2.37c0,5.03-6.21,10.35-6.21,10.35l1.77,3.25-2.07,5.32c-1.03,3.62,2.22,7.46,3.06,8.37,0,.14.12.58.49,1.68.2.6.13,1.48-.1,2.48.15-.88.21-1.73.1-2.48l-2.96-4.73-1.48,2.07s-4.44,0-6.21,1.77c-1.77,1.77-5.02,1.77-6.21,2.96-1.18,1.18-5.91,1.77-5.91,1.77,0,0,3.55-5.62,3.55-11.23l-5.62,4.43-7.69,3.84h-18.03l-5.62-5.62-3.25-4.43-2.37-3.25s-1.18,6.21.89,11.23l-1.77.89-2.07-.89-2.96-4.43s-.26-1.78-2.19-1.8c-1.65,2.2-2.83,4.74-4.32,6.97.22,5.32,3.33,14.63,8.43,17.07,2.44,1.11,5.1.67,7.54,2l2.66.44,2-.44,1.77-2.44,3.1-1.11,8.05-.82c.92.6,2.01,1.26,2.37,1.26.67,0,4.88,3.1,4.88,3.1,0,0,2.44,2.44,3.32,2.44s5.1-.44,9.09,0c3.99.44,8.65-2.66,8.65-2.66,3.04-1.41,6.24-4.05,8.59-7.24l.11.03c.06-.17.1-.26.1-.26,0,0,.13.12.34.32,4.65-5.94,10.16-7.05,11.93-10.59l9.3-1.89c2.33.14,5.78-.55,5.78-.55,2.88-.66,8.65-2.66,9.54,1.77,2.54-4.45,8.33-8.7,8.83-14.11l.7.14c.44,1.11.44,2.44.44,3.77,1.11-3.33,1.33-5.99,1.55-9.53,2.22-.67,4.66,0,6.43,1.33-1.11-5.1,2.88-9.76.22-14.85l.44-1.11c2.44,2.22,2.66,5.1,2.66,8.2,1.55-4.43,2.88-8.65-.22-12.64,2.44,2.44,3.55,4.43,3.33,7.98.38-4.03,1.6-7.89-.81-11.45.1-.06.15-.08.15-.08,1.55.89,3.33,1.11,5.1,1.11-1.01-.79-1.86-1.86-2.76-2.85l.54.41c.89.22,1.77.44,2.44.44ZM607.11,66.47s0,0,.01,0c-.08-.08-.16-.15-.23-.23l.22.22ZM623.52,149.62l.54-.31c.32-1.65.93-4.5,1.53-6.12l.3-5.03,1.48-3.55s3.25-6.5,4.73-6.8l-1.48-2.36s-.59-5.62-4.14-8.28c0,0-3.55-1.77-3.84-4.14-.3-2.37-2.37-7.1-2.37-7.1l-1.18-2.07s5.32-6.8,5.91-7.98l1.48.59s-1.48,4.73-1.48,5.62.59,3.25.59,3.25c0,0,2.07,2.07,3.84,1.48,1.77-.59,3.84.89,3.84.89,1.48,5.03,4.73,9.76,4.73,9.76l2.36-7.69-1.01-2.69,3.67-.26s2.37-3.84,2.37-12.71c0,0-1.48-6.21.89-10.35,2.36-4.14,6.8-7.98,6.8-7.98l.3-4.14-1.77-2.07s-4.14-2.66-5.91-1.77c-1.77.89,4.14-8.57,5.91-11.53,1.77-2.96,1.18-4.43,1.18-4.43,0,0-14.19,2.96-18.92,7.39l-6.8,5.91s-4.43,1.77-2.66-1.18c1.77-2.96,4.14-8.28,15.37-14.78,0,0-9.46-.59-11.83-.59-.39,0-1,.13-1.76.35l-2.9,4.67c-.83.39-.86,2.25-.44,4.84-2.74,3.63-9.12,7.67-13.53,5.36.89,1.11,1.77,2.44,3.11,3.33l.05.06c-1.81.4-3.7.17-5.36-.72,1.71,1.66,3.65,2.88,6.2,2.88-2.22.67-4.66-.22-6.65-1.55.44,1.11.66,2.44.44,3.55.43.54.86.97,1.31,1.32h-.21c-.89,2.89-6.87,13.53-10.2,8.66-.67,3.33,1.11,7.1-1.11,9.98,0,0,.07,0,.2.02-.65.36-1.25.81-1.75,1.31,2-.44,4.43-.44,5.77,1.33l.03-.08c-.02.32-.03.53-.03.53-1.55.89-3.55,1.11-4.88-.22,0,2,2.66,3.55,2.22,5.99-.44,2.44-3.77,2.88-4.44,4.66,1.55-.66,3.33-.66,4.88-.22-2.66-.22-4.66,1.11-6.43,2.66,1.33-.29,2.85-.19,4.37.17l-1.04.06c0,2.66-.22,6.21-3.55,6.21,2.88.66,4.66,3.77,7.98,3.77-2,.67-4.44.89-6.65.22,2.88,1.77,5.99,2.44,9.09,1.33-.89.89-1.77,1.55-2.88,2,1.33.22,3.55.22,4.66.22l.2.91c-.13-.02-.2-.03-.2-.03-1.77,2.88-5.1,3.55-8.2,3.33,2,.89,11.53,1.55,7.09,5.54,1.11-.44,1.77-1.11,2.44-2l.13.03c-.53,1.67-.77,3.52-1.01,4.85.89-1.33,2-2.22,3.33-2.44-.89.67-1.11,1.55-1.77,2.44,3.1,2,5.99,3.55,6.87,7.32l.19-.18c.1.7.33,1.43.7,2.17.22-1.55.67-2.88,1.55-3.99-.44,2.88.44,5.1,2.22,7.32-.22-1.33,0-2.66.67-3.77.66,2,4.88,6.87,4.88,6.87Z"/> <path class="cls-35" d="M609.33,63.81c.89,1.11,1.77,2.44,3.11,3.33l.05.06c-1.81.4-3.7.17-5.36-.72,1.71,1.66,3.65,2.88,6.2,2.88-2.22.67-4.66-.22-6.65-1.55.44,1.11.66,2.44.44,3.55.43.54.86.97,1.31,1.32h-.21c-.89,2.89-6.87,13.53-10.2,8.66-.67,3.33,1.11,7.1-1.11,9.98,0,0,.07,0,.2.02-.65.36-1.25.81-1.75,1.31,2-.44,4.43-.44,5.77,1.33l.03-.08c-.02.32-.03.53-.03.53-1.55.89-3.55,1.11-4.88-.22,0,2,2.66,3.55,2.22,5.99-.44,2.44-3.77,2.88-4.44,4.66,1.55-.66,3.33-.66,4.88-.22-2.66-.22-4.66,1.11-6.43,2.66,1.33-.29,2.85-.19,4.37.17l-1.04.06c0,2.66-.22,6.21-3.55,6.21,2.88.66,4.66,3.77,7.98,3.77-2,.67-4.44.89-6.65.22,2.88,1.77,5.99,2.44,9.09,1.33-.89.89-1.77,1.55-2.88,2,1.33.22,3.55.22,4.66.22l.2.91c-.13-.02-.2-.03-.2-.03-1.77,2.88-5.1,3.55-8.2,3.33,2,.89,11.53,1.55,7.09,5.54,1.11-.44,1.77-1.11,2.44-2l.13.03c-.53,1.67-.77,3.52-1.01,4.85.89-1.33,2-2.22,3.33-2.44-.89.67-1.11,1.55-1.77,2.44,3.1,2,5.99,3.55,6.87,7.32l.19-.18c.1.7.33,1.43.7,2.17.22-1.55.67-2.88,1.55-3.99-.44,2.88.44,5.1,2.22,7.32-.22-1.33,0-2.66.67-3.77.66,2,4.88,6.87,4.88,6.87l.54-.31c.32-1.65.93-4.5,1.53-6.12l.3-5.03.43-1.02-.13-1.05-5.91-10.64-5.03-5.91v-8.28l-1.77-2.36.3-1.18s-4.43-5.32-4.73-9.16c-.3-3.84,1.18-11.83,1.18-11.83l2.37-7.39,4.43-7.09s1.05-8.18,1.42-9.83c-2.91,1.83-6.39,2.83-9.11,1.4Z"/> <path class="cls-85" d="M689.74,170.09s.13.12.33.31c4.65-5.94,10.16-7.05,11.93-10.59l9.3-1.89c2.33.14,5.78-.55,5.78-.55,2.88-.66,8.65-2.66,9.54,1.77,2.54-4.45,8.33-8.7,8.83-14.11l.7.14c.44,1.11.44,2.44.44,3.77,1.11-3.33,1.33-5.99,1.55-9.53,2.22-.67,4.66,0,6.43,1.33-1.11-5.1,2.88-9.76.22-14.85l.44-1.11c2.44,2.22,2.66,5.1,2.66,8.2,1.55-4.43,2.88-8.65-.22-12.64,2.44,2.44,3.55,4.43,3.33,7.98.38-4.03,1.6-7.89-.81-11.45.1-.06.15-.08.15-.08,1.55.89,3.33,1.11,5.1,1.11-1.01-.79-1.86-1.86-2.76-2.85l.54.41c.89.22,1.77.44,2.44.44-2.88-3.1-6.43-5.77-8.87-9.09,2.44,2.88,7.32,1.55,9.98,4.21-2.22-5.32-7.98-5.1-11.31-9.53,2.22,2.22,6.65.67,9.54,2.44-.91-1.24-1.85-2.35-2.86-3.35.27.02.42.03.42.03-1.77-3.77-4.88-5.99-7.98-8.65,2,1.55,5.32,1.33,7.76.89-4.21-.44-9.31-4.43-11.09-8.43l-.02-.16-3.3-.21-10.05,3.25s-8.87,10.35-8.57,11.53c.3,1.18,3.55,2.96,3.55,2.96,0,0-.59,6.8-.89,7.69-.3.89-4.14,7.39-4.14,7.39l-3.25,10.35-2.37,4.73-6.8,1.77s-.88,2.66-3.25,4.14c-2.37,1.48-3.84,7.39-3.84,7.39l-5.91-.59h-.94l-1.73,4.43c-1.03,3.62,2.22,7.46,3.06,8.37,0,.14.12.58.49,1.68.2.6.13,1.48-.1,2.48.15-.88.21-1.73.1-2.48l-2.96-4.73-.4.56,2.77,3.87c1.16,4.16-1.67,9.23-2.95,11.24Z"/> <path class="cls-12" d="M631.5,146.14s.89-4.43.3-6.5v-2.66s5.61-11.23,8.87-15.96c3.25-4.73,6.8-10.35,8.57-10.35s18.63-.89,20.4,1.18c1.77,2.07,5.03,18.62,6.5,21.29,1.48,2.66,3.55,4.14,3.84,7.39,0,0-1.78-.89-2.07.3-.29,1.18-1.77,3.84-1.77,3.84,0,0-1.48,7.1-2.96,8.28-1.48,1.18-10.94,6.21-12.71,5.91-1.77-.3-12.42-.89-13.89-.89s-10.35-2.66-10.35-2.66l-2.96-3.84-1.77-5.32Z"/> <path class="cls-2" d="M676.44,161.22c1.18-1.18,4.43-1.18,6.21-2.96,1.77-1.77,6.21-1.77,6.21-1.77l1.18-1.48c-.92-2.81-1.48-7.39-7.1-5.85-4.3,1.18-7.15,2.53-9.35,6.44-.97,4.08-3.06,7.39-3.06,7.39,0,0,4.73-.59,5.91-1.77Z"/> <path class="cls-75" d="M625.59,153.53l2.96,4.43,2.07.89,1.32-.66c-1.76-4.31-.96-13.42-4.59-12.66-2.13.45-2.54,4.67-3.16,6.29,0,.01,0,.02-.01.03,1.23.4,1.42,1.68,1.42,1.68Z"/> <path class="cls-108" d="M632.39,147.18s.89-4.88,2.22-5.32c1.33-.44,6.21,0,9.31,2.66,3.1,2.66,11.53,1.33,15.52,0,3.99-1.33,8.43-3.55,11.53-2.22,3.1,1.33,3.55,6.21,1.78,9.76-1.78,3.55-16.41,7.54-16.41,7.54,0,0-8.87.89-11.08.44-2.22-.44-6.21-1.77-6.21-1.77l-6.65-11.09Z"/> <path class="cls-54" d="M637.49,152.7c-.14-.8-.24-1.71-.4-2.72-.09-.07-.1-.07-.02.02,4.3.56,5.29,2.05,11.72,1.83,4.21-.14,10-1.15,14.86-.67-.25,0-3.09,2.97-3.55,3.33-1.07.82-2.54,1.36-3.81,1.79-4.47,1.51-9.23,1.93-13.88,1.12-3.73-.65-4.48-2.17-4.92-4.7Z"/> <path class="cls-84" d="M665.79,178.07c-.89,0-2.66-1.18-4.14-2.96-1.48-1.77-3.55-3.25-6.21-3.84-2.66-.59-8.57-.89-13.01-.3-4.43.59-4.43,3.25-5.32,4.43-.89,1.18-2.66,0-5.91-.3-2.48-.23-5.46-1.3-6.75-1.81.92,1.08,1.94,1.94,3.05,2.47,2.44,1.11,5.1.67,7.54,2l2.66.44,2-.44,1.77-2.44,3.1-1.11,8.05-.82c.92.6,2.01,1.26,2.37,1.26.67,0,4.88,3.1,4.88,3.1,0,0,2.44,2.44,3.32,2.44s5.1-.44,9.09,0c3.99.44,8.65-2.66,8.65-2.66.38-.17.75-.37,1.13-.58-1.36.42-5.77,1.69-7.41,1.69-1.77,0-7.98-.59-8.87-.59Z"/> <path class="cls-84" d="M620.56,143.48c-3.25-4.14-2.96-.59-3.55-2.66-.59-2.07-2.96-2.36-2.96-2.36,0,0-1.77-3.84-4.73-5.03-.86-.34-1.42-.79-1.79-1.29-.39.53-.64,1.13-1.09,1.73,3.1,2,5.99,3.55,6.87,7.32l.19-.18c.1.7.33,1.43.7,2.17.22-1.55.67-2.88,1.55-3.99-.44,2.88.44,5.1,2.22,7.32-.22-1.33,0-2.66.67-3.77.66,2,4.88,6.87,4.88,6.87l.54-.31c.09-.48.21-1.05.34-1.67-.85-.73-2.14-1.99-3.83-4.15Z"/> <path class="cls-84" d="M603.34,130.99c1.11-.44,1.77-1.11,2.44-2l.13.03c-.53,1.67-.77,3.52-1.01,4.85.67-1,1.45-1.74,2.36-2.15-.61-1.11-.51-2.39-.89-3.32-.59-1.48-5.91-3.25-5.91-3.25l-4.07.44c6.21,1.11,9.94,2.7,6.95,5.39Z"/> <path class="cls-84" d="M726.62,159.15c2.54-4.45,8.33-8.7,8.83-14.11l.7.14c.44,1.11.44,2.44.44,3.77,1.11-3.33,1.33-5.99,1.55-9.53,2.22-.67,4.66,0,6.43,1.33-1.11-5.1,2.88-9.76.22-14.85l.44-1.11c2.44,2.22,2.66,5.1,2.66,8.2,1.55-4.43,2.88-8.65-.22-12.64,2.44,2.44,3.55,4.43,3.33,7.98.38-4.03,1.6-7.89-.81-11.45.1-.06.15-.08.15-.08,1.55.89,3.33,1.11,5.1,1.11-1.01-.79-1.86-1.86-2.76-2.85l.54.41c.89.22,1.77.44,2.44.44-2.88-3.1-6.43-5.77-8.87-9.09,2.44,2.88,7.32,1.55,9.98,4.21-2.22-5.32-7.98-5.1-11.31-9.53,2.22,2.22,6.65.67,9.54,2.44-.91-1.24-1.85-2.35-2.86-3.35.27.02.42.03.42.03-1.77-3.77-4.88-5.99-7.98-8.65,1.84,1.43,4.82,1.35,7.18.98-.08-.01-.16-.02-.24-.02-1.48,0-8.87-1.77-8.87-1.77,1.18,2.07,3.55,5.03,3.55,5.03l-2.66-.59c2.66.59,6.8,5.62,6.8,5.62-1.77.3-5.62,0-5.62,0,.59,2.66,6.21,6.21,6.21,6.21-1.77,0-5.03-1.48-5.03-1.48.59,4.14,5.32,9.76,5.32,9.76l-5.03-2.36c3.25,1.48,3.84,8.28,3.84,8.28-1.48-2.07-5.03-1.18-5.03-1.18,3.25,2.37,3.25,5.62,3.25,5.62-.89-2.96-6.21-3.25-6.21-3.25,3.84,4.73.59,15.67.59,15.67-2.37-1.77-5.32,0-5.32,0,0,3.25-2.07,5.91-2.07,5.91-1.48,5.32-8.87,11.82-8.87,11.82-2.66-3.84-12.71,1.18-12.71,1.18l-.2.5c1.85-.15,3.6-.5,3.6-.5,2.88-.66,8.65-2.66,9.54,1.77Z"/> <path class="cls-32" d="M635.16,149.06s2.11.33,3.88,2.11c1.77,1.77,3.66,3.33,6.32,3.22,2.66-.11,9.53-.22,9.98-.22s3.77-.55,4.88-1.33c1.11-.78,2-1.77,2.77-1.77s2.66-.11,3.32.66l.67,2,.22,2.55-1.22,2.55-3.33,1.88-4.43,1.22-5.77,2.55-2.88,2.99s-3.44-.44-4.77-2c-1.33-1.55-4.54-5.76-4.54-5.76l-2.99-2.88s-2.33-1.11-3.1-4.21c-.78-3.1,1-3.55,1-3.55Z"/> <path class="cls-15" d="M656.04,158.26c-7.69,2.96-15.37-.89-15.37-.89l-2.73.09,2.32,2.24s3.21,4.21,4.54,5.76c1.33,1.55,4.77,2,4.77,2l2.88-2.99,5.77-2.55,4.43-1.22,3.33-1.88,1.22-2.55c-1.26-1.4-11.16,2-11.16,2Z"/> <g> <path class="cls-110" d="M638.3,153.38c1.63.89,2.81,2.51,5.02,3.1,2.22.59,7.98,1.63,13.75-.44,5.63-2.02,8.72-2.07,9.96-1.65l-.06-.67-.67-2c-.66-.78-2.55-.66-3.32-.66s-1.66,1-2.77,1.77c-1.11.78-4.43,1.33-4.88,1.33s-7.32.11-9.98.22c-2.66.11-4.54-1.44-6.32-3.22-1.77-1.77-3.88-2.11-3.88-2.11,0,0-1.77.44-1,3.55.07.28.16.54.25.79l.34-.16s1.92-.74,3.55.15Z"/> <path class="cls-1" d="M637.26,156.82l.67.64,2.73-.09s7.69,3.84,15.37.89c0,0,9.9-3.4,11.16-2l-.16-1.88c-1.24-.41-4.33-.37-9.96,1.65-5.76,2.07-11.53,1.03-13.75.44-2.22-.59-3.4-2.22-5.02-3.1-1.63-.89-3.55-.15-3.55-.15l-.34.16c.93,2.5,2.86,3.43,2.86,3.43Z"/> </g> <path class="cls-6" d="M656.77,82.43c-2.53,2.2-5.36,5.4-5.68,8.79,5.9,3.31,9.68-8.29,11.01-11.45l-5.32,2.66Z"/> <path class="cls-69" d="M668.31,83.32c.7,3.07,2,14.79,5.67,13.21,7.74-3.33-1.51-11.87-3.45-14.99l-2.22,1.77Z"/> <path class="cls-79" d="M669.19,62.92c-2.13,5.34-10.02-.09-7.67-4.12,1.38-2.36,10.91-5.2,13.35-6.46,1.56,4.06,8.34,8.11,8.05,12.82-.27,4.5-9.59,5.67-10.63-.01l-3.1-2.22Z"/> <path class="cls-24" d="M670.82,48.29c-.76-.5.85-1.13,1.77-2.07,1-1.02,2.17-1.96,1.71-3.55-.63-2.21-4.63-2.87-6.42-3.29,1.74-1.87,10.65.14,9.44-4.98-.59-2.51-7.26-4.34-9.66-4.12,2.53-1.06,7.29-.73,9.94-.32,1.72.26,3.92,1.72,2.69-1.47-.6-1.57-3.33-2.5-4.5-3.25,4.91-3.19,6.44,2.69,10.98,3.26,2.27.28,4.44-1.09,6.5-.23,1.58.65,3.71,3.29,5.01,4.31-2.29-.23-4.6-.63-7.03-.48,1.2,2.09,5.79,4.11,7.85,6.11-2.21-.14-6.65-.69-8.78.04-4.57,1.57,3.57,4.42,5.21,6.52-2.41,1.09-5.73-1.8-8.52-1.27-3.53.67-5.2,4.22-5.85,7.46l-10.35-2.66Z"/> <path class="cls-78" d="M674.51,111.26c-1.91-5.23,2.54-9.64,5.27-13.57-2.69,2.04-6.19,3.4-9.54,4.57-.51-.51-1.12-.85-1.94-.76-2.03.22-5.53-1.69-7.54-1.77-2.3-.1-6.87.83-9.9.34-1.14-3.13-2.32-6.68-3.05-9.62-.03,2.45.3,5.53.51,8.63-.62,4.84-3.3,16.54-7.06,19.72l-2.22,4.88c6.32-5.36,9.71-7.51,16.41-7.1,7.09.44,17.3,6.21,21.73,11.53,0-4.79-2.09-11.29-2.9-17.07l.24.22Z"/> <path class="cls-7" d="M634.6,148.06c.94-8.7,8.18-5.46,13.81-6.21-4.87-1.5-6.86-6.35-12.48-3.4-4.51,2.37-7.21,10.13-.89,12.27l-.44-2.66Z"/> <path class="cls-11" d="M667.42,154.27c2.81-2.51,1.48-6.02-1.33-9.02-2.72-2.9-8.07-3.68-11.83-3.55,4.44-3.25,9.66-4.77,15.96-.3,3.83,2.72,5.32,8.87,2.07,10.64l-4.88,2.22Z"/> <path class="cls-49" d="M715.74,79c6.83,4.65,21.03,3.73,24.86,12.17-1.36-5.33-2.16-9.12-7.11-12.28-2.19-1.39-4.33-1.94-6.11-4.09-1.68-2.03-1.56-3.71-4.08-5.23-1.31-.79-2.91-1.12-4.49-1.66,1.42,2.75,1.67,6.99,1.67,6.99l-5.03-4.73s-7.98-7.98-9.75-9.16c-1.77-1.18-9.16-1.77-9.16-1.77l-3.25,2.07,1.18,3.84c.28.62.49,1.56.65,2.63,3.64,1.46,8.43,1.58,11.77,4.05,3.06,2.25,5.71,5.05,8.85,7.18Z"/> <path class="cls-39" d="M621.59,66.01c-2.58,2.68-6.29,3.33-8.62,6.25-2.16,2.7-3.06,6.83-4.11,10.04,2.61-4.98,6.74-5.12,11.12-7.52,3.44-1.88,5.42-4.41,9.22-5.75,3.52-1.25,7.03-2.72,10.63-4,2.61-.93,5.36-1.3,7.9-2.25,1.41-2.46,3.08-5.16,3.89-6.51,1.77-2.96,1.18-4.43,1.18-4.43,0,0-14.19,2.96-18.92,7.39l-6.8,5.91s-4.43,1.77-2.66-1.18c.74-1.23,1.58-2.87,3.11-4.82-2.98,2.44-5.78,5.04-9.19,7.25.92-.24,2.24-.13,3.26-.37Z"/> <path d="M680.63,141.02c-.41-.84-1.96-2.57-3.09-1.91-.9.52-.43,2.86-1.32,3.78l-.22,1.77c1.71-.82,2.37-4.29,4.63-3.64ZM649.9,24.34s8.65.44,11.75-.67c3.1-1.11,13.3-2.44,17.29-2.44s5.76,1.33,6.43,1.77c.66.44,1.77,1.77,1.77,1.77,0,0,2.44-1.33,3.77-1.33s6.43,2.44,7.76,3.33c1.33.89,4.44,3.77,5.54,4.21,1.11.44,7.54,4.43,7.54,4.43,0,0-5.54-4.88-7.76-5.99,0,0-4.88-7.54-7.54-9.98l-2.66.66,1.33-1.77s-2,.22-3.11.89l.45-1.77s-1.11-.89-3.77-.67c-2.66.22-7.32-1.11-7.98-1.11s.22,1.55.22,1.55c0,0-1.77-1.55-3.77-1.55l.67,1.11s-2.22,0-5.1.22c-2.88.22-7.98.22-12.2,1.55-4.21,1.33-8.2,3.33-9.98,3.33s-7.09,1.11-7.09,1.11l.89,1.55s4.43,0,5.54-.22ZM625.96,121.68c1.11,2,2.88,5.1,3.1,6.87.22,1.77.67,3.1.67,3.1.45-1.11,2.66-3.77,2.66-3.77l-.89-1.55s-.67-4.44-1.77-6.21c-1.11-1.77-3.33-3.55-3.33-3.55,0,0,1.77,2.88,2.88,4.88,1.11,2,.22,3.99.22,3.99-.66-2-3.55-3.77-3.55-3.77ZM707.77,54.05c1.33-1.77-3.55-5.76-5.99-7.09-2.44-1.33-3.99-1.77-6.21-2.66-2.22-.89-4.21-2.66-6.65-2.88-2.44-.22-4.21.22-5.99.44,0,0,2.22.89,4.43,2.22,2.22,1.33,4.43,1.77,6.43,3.77,2,2,2.66,2.88,4.66,4.88,1.99,2,4.21,3.55,4.21,3.55,0,0,3.77-.44,5.1-2.22ZM691.36,65.58c1.33,1.11,3.99,4.21,3.99,4.21,0,0,.44-.89,1.11-4.43.67-3.55.89-5.54.22-6.43-.67-.89-3.11-2.22-4.21-3.33-1.11-1.11-2.88-1.33-4.44,1.33,0,0-1.11,2.88,0,4.66,1.11,1.77,2,2.88,3.33,3.99ZM622.63,134.76c.66,2.66,2.66,6.87,2.44,7.76v2.22s1.77-2.66,1.77-5.32,1.55-5.54,1.55-5.54c0,0-3.33-4.21-3.77-7.1,0,0-.44,0-1.33-1.11-.88-1.11-1.55-2.44-1.55-2.44,0,0-1.55,1.55-2.44,0-.89-1.55-2.66-5.1-3.1-8.2-.44-3.1-1.11-5.32-1.11-5.32-1.11-.22-1.33-2.22-1.33-2.22-2.22,1.33-3.99,4.21-3.99,4.21l3.1-1.33,1.26.36c-1.11,1.14-2.99,2.91-4.58,3.63,0,0,2.44-.22,2.66,1.33.22,1.55.66,7.54,1.11,10.42l1.77-.22-.89,3.99,2-1.77.44,4.21s1.11-2.66,1.77-2.88c.66-.22,3.55,2.66,4.21,5.32ZM607.41,106.08l2.51-3.55c-1.71.82-2.4,1.44-2.51,3.55ZM608.22,102.17c1.77-2,2-5.99,2-5.99,0,0,.22-9.31,3.77-13.97l-.22-1.55s.89-3.33,3.55-5.99l.22-3.55s-5.1,3.1-6.87,6.87c0,0,.44,2-.44,3.77-.89,1.77-3.32,4.88-3.32,7.54s-1.77,5.99-1.77,5.99c0,0,1.11,1.77,1.11,4.88s.44,8.65.44,8.65c0,0-.22-4.66,1.55-6.65ZM638.72,56.79c1.84-.76,3.99-2.67,5.86-2.18l.66-.76c-2.86.03-6.7,1.78-9.46,3.16-4.19,2.09-6.55,4.28-9.44,8.73,2.87-1.65,6.82-2.33,9.83-3.15-1.42-3.48.08-4.78,2.55-5.8ZM673.85,73.57s-1.33,2.44-.44,2.66c.89.22,3.1,3.33,5.54,5.54,2.44,2.22,1.33,3.55,2.66,5.1,1.33,1.55,1.78,2.44,1.55,5.54-.22,3.1-.89,6.87-.89,6.87,0,0,2.88-6.21,3.77-7.54.89-1.33,2-3.33,2-3.33,0,0-2.22.44-2.88-1.77-.67-2.22-1.11-3.1-1.11-3.1l-2.44-4.43s1.11-.89,1.78-2.44c.66-1.55,1.77-3.55,1.77-3.55,0,0-3.77.22-5.77-.22-1.99-.44-5.54.67-5.54.67ZM717.97,77.34s-4.66-1.33-8.65,1.99c0,0,2,.44,1.78,2.44-.22,2,.22,5.54.89,8.2-.83,4.83-5.06,8.18-9.68,8.23-4.35.05-9.25.89-12.87,3.44-2.17,1.53-6.55,11.28-9.6,9.61,0,0-.22,2.22.67,4.43.76,1.9,5.32,6.65,5.32,6.65,0,0-.66-3.55.44-5.99.63-1.39,1.77-2.92,2.63-3.98,1.04.45,6.31,2.59,10.16,1.4,4.29-1.33,5.62-4.73,6.35-6.36.66-1.44,1.08-4.61.96-6.14.57-.25,1.29-.61,2.08-1.14.25,1.01.58,2.71.44,4.03-.22,1.99-2.66,5.54-4.88,7.09-2.22,1.55-3.55,4.88-5.1,5.54-1.55.67-4.21,2.22-4.21,2.22,0,0,3.33.22,5.1.66,1.77.44,2.88.66,2.88.66-.22-.89,1.11-2.88,2.22-3.55,1.11-.67.89-2.66,2.66-3.99,1.77-1.33,3.55-2.44,3.55-2.44.44,2.22-1.11,5.54-3.1,7.32-2,1.77-3.1,4.66-3.1,4.66,0,0,2.88.22,4.66-1.11,1.77-1.33,4.43-7.09,4.43-7.09l-1.33-.22s0-3.55-.67-6.43c-.67-2.88,1.33-5.99,2.22-8.43.89-2.44.44-8.65.44-8.65,0,0,.66-2.66,1.55-3.77.89-1.11.22-6.87,1.77-9.31ZM697.57,87.98c1.11-1.11,3.33-2.66,3.33-2.66,0,0-2-.89-3.33-1.33-1.33-.44-1.11-3.33-1.55-5.54-.44-2.22-.44-2.66-.44-2.66,0,0-3.55.44-4.66-.67-1.11-1.11-4.21-3.1-4.21-3.1,0,0,2.22,3.1,3.55,4.66,1.33,1.55,1.99,1.77,2.88,3.99.89,2.22,2,2.66,2.88,4.44.89,1.77-1.77,3.1-2.44,5.32-.66,2.22-1.77,6.21-1.77,6.21.89-.66,5.54-1.77,5.54-1.77,0,0,1.11-.67,2-1.77.89-1.11,1.55,0,2.44.22.89.22,3.1,1.11,4.21.89,1.11-.22,2.22-3.77,2.22-3.77,0,0-3.99,0-4.21-1.11-.22-1.11-1.33-2.88-1.33-2.88,0,0-3.55,5.32-5.32,6.21-1.77.89-3.99,2-3.99,2l1.33-2.22s1.77-3.33,2.88-4.43ZM691.81,134.54c.88.6,1.97.57,2.64-.18-1.08-.13-2.07-.36-2.86-1.15l.22,1.33ZM700.97,59.52l.59.89c2.44-.05,4.53,2.31,6.56,3.47,2.74,1.57,4.2,3.17,1.45,6.23,3.47,1.49,8.12,3.06,11.16,5.33-2.26-5-4.53-7.68-9.06-10.67-2.99-1.98-7.2-4.56-10.7-5.25ZM703.69,124.59c-2.12,1.58-3.58,1.52-6.12,1.75-1.3.12-1.45.39-2.6-.06-1.07-.41-1.25-1.61-2.49-1.28l-.45-.66c.54,2.09,2.4,4.67,3.77,6.23,2.79-1.7,6.05-3.07,7.89-5.98ZM683.16,57.16s2.44-.66,2.66-1.33c.22-.66.89-3.33-.22-5.1-1.11-1.77-2-4.88-3.1-5.54-1.11-.66-2-1.77-3.55-1.77s-5.54,2-6.87,2.66c-1.33.67-5.32.89-5.77,2-.44,1.11-1.33,2.66-.66,3.55.66.89,4.43,1.11,6.21.67,1.77-.44,3.55-2,4.66-2s.89,2,.89,2c0,0,3.55,4.21,5.76,4.88ZM678.95,27.45c2,.44,4.66,3.1,4.66,3.1,0,0,1.55,0,4.66.44,3.1.44,6.43,1.55,7.54,2.22,1.11.66,8.2,2.66,9.31,3.1,1.11.44,5.1,2.88,5.1,2.88,0,0-4.88-5.99-8.65-7.76-3.77-1.77-4.66-3.77-6.87-3.77s-7.32.44-7.98.89c-.67.44-2,1.77-2.66.89-.66-.89-1.55-4.88-1.55-4.88,0,0-3.99-1.55-4.88-1.33-.89.22-5.54.22-7.32.66-1.77.44-7.32,3.1-9.31,2.88,0,0,3.1,1.55,7.09.44,3.99-1.11,8.87-.22,10.86.22ZM656.11,35.21s7.98-.22,11.53-1.11c3.55-.89,3.77.44,6.65,1.11,1.21.28,2.15.64,2.83.96.54.68,1.25,1.69,1.38,2.37.22,1.11,1.55,2.44,1.55,2.44,0,0,4.88-1.77,7.98-2.22,2.44.89,4.66,1.55,6.88,2,2.22.44,6.65,2.22,8.2,3.33,1.55,1.11,6.21,4.43,6.21,4.43,0,0,1.55-2.44-1.11-5.99-2.66-3.55-4.88-4.21-7.32-5.1-2.44-.89-3.77-1.33-7.1-2.44-3.32-1.11-6.21-.66-7.76-.22-.94.27-.98,1.1-1.27,1.82-1.38.25-3.55.31-5.03-.61.18-.31.31-.7.31-1.21,0-1.77-2-2.66-3.33-3.55-1.33-.89-4.44-.67-5.99-1.11-1.55-.44-5.1-.44-9.98.89-4.88,1.33-4.65,4.21-4.65,4.21ZM696.62,134.03c1.03-.31,1.84-1.48,2.64-2.18-2.34,1.79-5.72.45-7.68-1.53l-1.33-1.77c.67,2.81,1.2,3.08,3.55,4.49,1.44.87,1.34,1.44,2.81.99ZM683.53,173.93c-.59,0-1.33.89-2.36,1.63-1.04.74-5.03,1.48-5.03,1.48,1.33.15,3.4-.15,4.88-.74,1.48-.59,2.66-.59,2.66-.59,1.92-.74,5.32-4.73,5.32-4.73l-2.51,1.63s-2.37,1.33-2.96,1.33ZM689.74,165.36c-1.77.59-2.96.59-3.55,1.48-.59.89-1.04,2.66-2.22,2.51-1.18-.15-1.77-1.03-2.81,0-1.04,1.04-1.92,2.22-2.96,2.37-1.03.15-6.35,1.33-6.35,1.33l.59.15s5.03-.15,6.5-.74c1.48-.59,2.22-1.63,3.1-1.33.89.3,1.18.89,2.66-.44,1.48-1.33,1.92-1.77,2.81-1.48.89.3,2.51-.15,2.51-.15,0,0,2.22-2.51,2.66-5.62,0,0-1.18,1.33-2.96,1.92ZM671.41,70.24c0-1.11.22-2.44.22-3.99s.22-2.44.22-2.44l.89-.89,1.33,4.21s1.33.44,2,0c.67-.44,3.1-1.77,3.77-2.66.67-.89-.66-2.22-.66-2.22,0,0-1.55-3.77-2.44-5.32-.89-1.55-1.77-3.55-1.77-3.55,0,0-3.1,1.33-6.21,2.66-3.1,1.33-4.21,3.55-4.21,3.55l.44,5.1s1.55,1.11,2.66,0,2.88-1.77,2.88-1.77c0,0-.66,2.22-1.77,3.77-1.11,1.55-2.22,1.99-2.44,3.77-.22,1.77.45,4.43.45,4.43.89,0,3.55-2.22,3.55-2.22,0,0,1.11-1.33,1.11-2.44ZM690.33,159.15c-1.18.59-1.77,1.63-2.66,1.92-.89.3-2.37.44-3.99,1.18-1.62.74-1.48,1.77-2.51,1.92-1.04.15-1.92.74-3.11,1.77-1.18,1.03-3.4,1.92-5.03,1.92s-4.43,1.03-4.43,1.03c0,0,4.14-.15,5.47.3,1.33.44,3.1-.3,4.43-1.33,1.33-1.03,1.48-1.33,2.96-1.48,1.48-.15,2.07-1.18,2.95-2.07.89-.89,2.37-.44,3.55-.44s2.07-1.33,3.11-1.92c1.03-.59,1.92-.3,1.92-.3.3-2.22-1.33-5.03-1.33-5.03,0,0-.15,1.92-1.33,2.51ZM688.41,155.31c-.74.59-1.63,1.03-3.4,1.18-1.77.15-1.62.15-3.55,1.33-1.92,1.18-1.92,1.33-3.84,1.63-1.92.3-2.81,1.63-3.7,2.07-.89.44-4.43,1.63-4.43,1.63,0,0,4.29,0,5.32-.44,1.03-.44,1.18-1.33,2.07-1.77.89-.44,2.81-.15,4.14-.59,1.33-.44,1.77-1.33,2.96-2.22,1.18-.89,2.22.15,3.84,0,1.62-.15,3.84-1.48,3.84-1.48l-1.77-2.66s-.74.74-1.48,1.33ZM740.29,113.62s-3.25-2.66-3.84-5.91c-.59-3.25-.3-9.76,0-14.49.19-2.98-1.27-4.67-2.38-5.51.95-.94,2.08-1.58,2.08-1.58-2.96-1.18-7.39-2.36-7.39-2.36l1.48-2.37c-3.84,1.18-6.8,6.5-6.8,6.5h2.37l-.89,2.66,4.73-1.18c-3.25,2.36-4.14,2.96-4.14,2.96l2.66.89s1.48.89,2.07,5.03c.59,4.14.59,8.28-.3,11.23-.89,2.96-1.18,5.32-1.18,5.32.59-1.77,2.66-3.55,2.66-3.55,0,0,1.48,2.96,1.48,6.5s.3,5.91.3,5.91c-2.66,3.84-2.96,8.57-3.84,10.35-.89,1.77-3.55,4.73-3.55,4.73,1.48-.3,4.43-2.07,4.43-2.07,0,0-2.96,3.25-5.62,5.62-2.66,2.37-4.73,2.37-4.73,2.37l1.77,1.48s-5.32.89-9.76,2.96c-1.3.6-2.47,1.29-3.52,2,.91-1.79,2.95-5.58,4.41-6.58,1.92-1.33,4.14-4.58,5.91-7.24,1.77-2.66,2.22-4.14,2.22-4.14l1.18.74c.44-2.66-.74-4.88-.74-4.88.74.15,2.07,1.48,2.07,1.48-.59-3.1-4.58-4.29-5.17-5.91-.59-1.63.44-4.73,1.77-5.32,1.33-.59,2.37-1.03,2.37-1.03l-1.63-.74c1.62-.3,3.1-.74,3.1-.74-1.04-2.96.3-9.46.74-11.68.44-2.22-.44-4.43-.44-4.43,0,0-2.36-1.03-3.99-1.92-1.62-.89-2.81-3.25-2.81-3.25,0,2.22,2.66,4.88,2.96,5.91.3,1.03.45,3.69-.15,5.03-.59,1.33-1.48,3.69-2.37,5.17-.89,1.48-1.77,1.33-1.77,1.33-.44,7.09-2.66,11.09-3.55,12.86-.89,1.77-3.7,5.32-5.62,5.91-1.92.59-4.29-.3-4.29-.3,0,0-1.33,1.48-1.77,5.03-.44,3.55-1.48,5.32-1.48,5.32,0,0,2.66-1.48,3.84-3.4,1.18-1.92.74-2.07,2.51-3.25,1.77-1.18,3.11-1.03,3.7.15.59,1.18,3.11,2.96,3.55,4.88.44,1.92-1.77,2.96-3.4,5.91-1.33,2.41-3.24,6-3.9,7.24-1.19,1.05-2.15,2.08-2.9,2.95-1.77,2.07-2.66,6.5-2.66,6.5,2.96-3.84,6.5-3.55,9.76-4.14,3.25-.59,5.32-1.18,5.32-1.18,0,0-3.55-.3-2.37-1.18,1.18-.89,4.14-2.66,4.14-2.66,0,0,1.48-.59,4.14-.59s4.14-.59,5.32-1.77c1.18-1.18,5.32-3.55,5.32-3.55l-2.07-.89,2.37-1.18c-.3-2.36,2.36-2.96,2.36-2.96,0,0,0-2.07-1.48-2.66-1.48-.59,0-2.66,1.77-3.25,1.77-.59,4.14-1.48,4.14-1.48-2.66-.59-1.18-3.84-1.18-3.84.89-2.96,2.07-10.94,2.96-14.19.89-3.25,2.07-2.96,2.07-2.96l-2.36-.59ZM670.3,41.42c2.66,0,6.65-.89,6.65-.89-.66-.89-6.21-2.66-7.54-2.88-1.33-.22-3.99-.89-10.42,1.33-6.43,2.22-7.98,5.54-7.98,5.54,0,0,3.33-.22,5.54-.44,2.22-.22,5.1-.67,7.76-1.77,2.66-1.11,3.33-.89,5.99-.89ZM698.9,141.71c-2.07,2.96-4.73,2.37-6.21.89-1.48-1.48-2.96-4.43-4.14-5.32-1.18-.89-5.32-3.84-5.32-3.84,0,0,1.48,2.07,2.96,3.84,1.46,1.76,2.05,4.38,2.8,6.49.31.87.55,1.57.63,2.39.03.25.04.51.03.8-.02,1.01-.45,2.66.45,3.44,1.84,1.59,2.52-2.93,2.59-3.95,1.48,1.77,6.8,2.07,6.8,2.07,1.48,1.48,2.66,4.73,2.66,4.73.89-4.73-3.25-11.53-3.25-11.53ZM661.88,48.51c-.66-.44-1.55-.22-4.88.89-3.33,1.11-4.88,1.55-5.54,3.99-.67,2.44-1.11,3.33-1.55,6.65,0,0,2.88-1.33,4.88-1.55,2-.22,4.43-2.22,5.99-3.77,1.55-1.55,2.44-2.88,2.44-3.55s-.67-2.22-1.33-2.66ZM628.4,168.17c-.74.15-1.18-.3-1.92-1.04-.74-.74-1.63-.15-2.37-.3-.74-.15-1.62-.89-1.77-1.48-.15-.59-2.22-1.77-2.22-1.77-.15.74.89,3.55.89,3.55,0,0,1.03.15,2.22.74,1.18.59,0,0,1.18-.15,1.18-.15.74.3,1.33.89.59.59.89.74,1.92.59,1.04-.15,1.18-.3,2.66-.44,1.48-.15,3.7-.44,3.7-.44l-2.37-.15s-2.51-.15-3.25,0ZM632.09,157.97c-.44,0-2.22,0-2.96-.29-.74-.3-1.48-3.55-1.77-4.29-.29-.74-2.95-2.66-2.95-2.66l-1.48,1.63,1.04,1.03s.89,2.66,1.48,3.25c.59.59,1.33.59,1.77,1.03.44.44.44,1.48,1.33,1.48s3.1.15,3.99.44c.89.3,2.81,2.22,2.81,2.22,0,0-2.81-3.84-3.25-3.84ZM624.7,171.71c-.59-.59-2.51-1.77-2.51-1.77l1.92,2.66s1.77.89,2.81,1.33c1.04.44,3.55-.59,3.55-.59l-3.25-.15s-1.92-.89-2.51-1.48ZM631.8,136.98c-.58-.58-1.66.43-1.99.95,1.37-.18,1.35,2.25,2.24,2.99l.08-1.23c-.41-.73.13-2.26-.32-2.71ZM621.01,159.89c.15.74,1.03.74,1.77,1.33.74.59.88,1.18,1.92,1.92,1.03.74,1.03.15,2.22.3,1.18.15.74.74,1.77,1.03,1.04.3,4.29-.15,4.29-.15,0,0-2.36-.44-3.25-.44s-1.63-.44-2.07-1.03c-.44-.59-1.48-.74-2.51-.89-1.03-.15-.74-1.48-1.03-2.36-.29-.89-1.62-1.18-2.07-1.77-.44-.59-.74-2.22-.74-2.22l-1.77,2.51s1.33,1.03,1.48,1.77ZM640.22,105.64c-.44-.74-.44-4.43-.44-6.8s-1.77-8.87-5.47-10.2c0,0-2.37.74-3.4.89-1.03.15-1.92.89-3.55.44-1.62-.44-4.29-.59-3.4-3.1.56-1.59,1.42-3.19,1.94-4.4.79.02,2.18-.02,2.94-.47,1.11-.66,2.44.44,2.66,1.55.22,1.11,1.55,2.22,2.22,2.44.67.22,1.55,1.11,1.55,1.11,0,0,0-1.77.89-1.55.89.22,3.55,3.33,3.55,3.33,0,0-1.11-2.88-1.11-3.99s.89-2.66.89-4.21-.22-4.43.44-5.99c.66-1.55,5.1-5.1,7.98-6.21,2.88-1.11,6.21-3.99,6.21-3.99,0,0-3.99,1.77-6.87,1.55l-2.44.44s0,1.33-1.55,2.22c-1.55.89-5.1,2.88-5.1,2.88,0,0-.89,2-.44,4.88.44,2.88,1.33,6.65,0,7.32-1.33.66-3.99,1.11-4.43-.22-.44-1.33-1.33-5.54-2-6.43,0,0-1.55,1.33-2.22,2.66-.44.87-1.83,1.17-2.73,1.28,0-.09,0-.17,0-.24-.15-1.04.44-5.76,1.48-7.39,1.03-1.63,3.55-3.84,3.55-3.84,0,0-5.03-.3-7.24.89,0,0,.89,1.63.59,2.51-.29.89-.89,6.36-1.04,7.98-.15,1.63-2.96,5.17-3.55,6.65,0,0,2.81,2.81,3.25,4.14.29.87.77,2.19,1.15,3.37-.94,3.13-1.96,2.91-3.44,4.39-1.77,1.77-3.55,3.55-2.44,4.66,1.11,1.11.89,3.55,2,6.21,1.11,2.66,3.99,5.77,3.99,5.77,0,0-1.11-2.44-1.55-4.21-.44-1.77-2.44-5.32-2.88-7.32-.44-2,1.55-3.55,3.1-5.54.8-1.02,1.3-1.99,1.6-2.68.04.14.07.27.1.39.29,1.33-1.48,5.32-2.37,7.54,0,0,1.48,1.63,2.07,2.96.59,1.33,4.58,4.58,4.58,4.58l1.33,1.03s-.23-3.28-.38-5.19c-.02-.27-.05-.52-.06-.72-.15-1.63-1.33-.44-2.22-1.04-.89-.59-1.92-1.92-2.22-2.96-.22-.77.7-3.4,1.25-5.07.21,1.16,1,4.58,3.19,6.4,2.23,1.86,5.59,2.05,6.89,2.07.23.63.47,1.4.65,2.22.44,2.07-.3,6.95.44,9.16,0,0,1.33-3.84,2.36-5.91,1.04-2.07,2.81-5.47,2.81-5.47,0,0-2.66,0-3.1-.74ZM661.21,73.34l.44-2.88c-.89-1.11-3.55-1.33-5.99-1.11-2.44.22-4.21-.22-4.21-.22.45.66.89,5.76.89,5.76l-4.66,2.44s-.89,2.44-2.66,5.54c-1.77,3.1-1.11,4.88-1.11,4.88,1.11,1.11,1.11,6.21,1.11,6.21.22-.89.67-5.76,1.55-6.87.89-1.11.67-.89.89-3.55.22-2.66,2-2.88,4.43-5.54,2.44-2.66,1.77-1.33,3.99-2.88,2.22-1.55,5.32-1.77,5.32-1.77ZM661.62,77.6l-.35-1.14c-2.17,4.71-6.06,7.91-7.01,12.02,2.08-1.72,3.51-3.13,5.77-4.5,3.07-1.86,1.23-3.3,1.59-6.38ZM672.69,91.27c.47-4.19-1.85-8.37-2.23-13.48l-.65.98c-.65,3.04-2.67,3.86-.63,6.53,1.5,1.96,2.28,3.72,3.51,5.97Z"/> <path d="M635.2,149.25s-1.04,2.51-.3,4.88c0,0,.44,1.48.89,1.33.45-.15.89-1.48,1.63-1.33.74.15,2.81,1.48,2.96,3.1l.44,2.37s2.36,3.55,5.62,6.36c0,0,2.07,1.03,2.96.59.89-.44,1.48-4.29,5.91-6.95,4.44-2.66,6.36-1.18,6.36-1.18,0,0-.29,1.77.44,1.77s3.55-1.33,3.84-2.22c.3-.89.74-4.88.74-4.88,0,0,.74.74,2.07.74s4.58-2.96,4.58-2.96l.59-1.04.15,1.92s-1.48,1.33-2.66,2.22c-1.18.89-1.92,2.22-3.11,3.25-1.18,1.03-2.37,2.66-5.03,3.55-2.66.89-2.96.59-5.32,2.22-2.36,1.63-5.62,3.1-6.65,3.99s-1.62,1.92-1.62,1.92v4.58l-1.48.3s.44-4.58-.29-5.62c-.74-1.04-1.77-1.18-3.4-2.66-1.63-1.48-3.84-4.73-5.32-6.36-1.48-1.63-2.96-2.07-3.84-3.1-.89-1.03-1.92-4.73-1.92-4.73,0,0-2.22-3.4-1.92-5.91,0,0,1.92,3.7,3.7,3.84Z"/> <path d="M636.67,149.39c2.53,1.72,4.57,5.32,7.83,5.32,3.63,0,7.28.1,10.88-.33,1.62-.19,3.79-.33,5.26-1.09,1.04-.53,1.54-1.64,2.67-1.98.97-.29,2.34-.12,3.17.49-.88-.65-1.96-1.04-3.06-.99-1.23.06-1.97.93-3.09,1.42-1.28.56-2.71,1.02-4,1.32-1.63.39-3.43.28-5.11.31-2.84.05-6.26.63-8.94-.53-2.13-.92-3.26-3.46-5.61-3.96Z"/> <path d="M634.38,176.89s3.1,1.33,4.43.44c0,0,1.55-3.77,4.21-4.88,2.66-1.11,5.99-.44,5.99-.44,0,0,2.22,0,3.99.22,1.77.22,5.76,3.1,7.1,4.88,1.33,1.77,3.1,2.88,3.1,2.88,0,0,6.65,0,10.64-.22,3.99-.22,6.65-2.22,6.65-2.22,0,0-2.66,2.66-6.43,3.1-3.77.44-8.87-.44-11.53.44,0,0-3.55-1.77-5.32-3.33-1.77-1.55-2.66-2.22-4.88-2.22s-6.95.3-8.5-.15c0,0-2.14,1.7-2.81,2.59-.67.89-3.33,1.11-4.66.89-1.33-.22-2.44-1.99-3.99-2.22l2,.22Z"/> <path class="cls-109" d="M702.15,100.32c-4.73-.89-10.35-.59-13.6,6.21,0,0,3.64,5.96,8.87,4.43,7.1-2.07,4.73-10.64,4.73-10.64Z"/> <path class="cls-41" d="M700.93,100.74c-3.96-.74-8.66-.49-11.37,5.19,0,0,3.04,4.99,7.42,3.71,5.94-1.73,3.96-8.9,3.96-8.9Z"/> <path class="cls-109" d="M630.02,92.04c6.21-2.96,9.46,5.32,7.98,10.35,0,0-3.84,1.77-7.39-2.07-2.55-2.76-.59-8.28-.59-8.28Z"/> <path class="cls-99" d="M630.92,92.54c5.23-2.49,7.97,4.48,6.73,8.72,0,0-3.24,1.49-6.23-1.74-2.15-2.33-.5-6.97-.5-6.97Z"/> <g> <path d="M697.72,103.87c0,1.63-1.32,2.96-2.96,2.96s-2.96-1.32-2.96-2.96,1.32-2.96,2.96-2.96,2.96,1.32,2.96,2.96Z"/> <path class="cls-29" d="M695.8,103.28c0,1.14-.93,2.07-2.07,2.07s-2.07-.93-2.07-2.07.93-2.07,2.07-2.07,2.07.93,2.07,2.07Z"/> </g> <g> <path d="M637.32,96.27c0,1.48-1.05,2.68-2.35,2.68s-2.35-1.2-2.35-2.68,1.05-2.68,2.35-2.68,2.35,1.2,2.35,2.68Z"/> <path class="cls-29" d="M635.79,95.74c0,1.04-.74,1.88-1.65,1.88s-1.65-.84-1.65-1.88.74-1.88,1.65-1.88,1.65.84,1.65,1.88Z"/> </g> <path class="cls-48" d="M623.37,147.62l-1.18-9.02c-.99,1.46-1.1,3.36-.69,5.15l-1.33-5.11.83-2.11c-1.46,1.07-2.56,3.07-1.92,4.88l.75-1.91c.01,2.08.71,4.2,2.06,5.75l-.28-1.08c.37,1.31,1,2.53,1.76,3.45ZM618.64,141.71l-.74-7.24c-.64,2.74-.62,4.75.74,7.24ZM616.87,139.05l.59-5.03c-1.05.96-2.01,4.09-.59,5.03ZM615.09,135.35l1.33-1.63c-.77.15-1.68.83-1.33,1.63ZM614.15,131.53c-1.58.4-2.35,3.01-1.42,4.27l1.07-3.11c-.29,1.22-.25,2.27.11,3.7l.28-4.85v-.03s0,0,0,0v-.15c-.01.06-.03.11-.05.17ZM611.69,133.58l.74-2.51c-.95.48-1.08,1.6-.74,2.51ZM609.33,133.28l3.99-3.1c-1.8-.05-3.24,1.63-3.99,3.1ZM612.58,126.93c-.22.07-.42.17-.61.27l.31-.27c-.87-.08-1.91.32-2.77.97l2.18-3.63c-1.87.34-4.96,4.76-3.99,6.65l.15-.25s0,.07,0,.1l3.13-2.71c-1.13,1.45-1.3,3.8-1.8,5.37l3.4-6.5ZM610.66,122.94c-.97-.07-2.74.47-3.77,1.34l3.47-4.59c-2.62,1.7-3.82,3.21-4.58,6.06l.38-.51c-.06.16-.1.33-.09.51l4.58-2.81ZM605.93,122.2l4.73-3.55c-1.77-.91-4.97,1.63-4.73,3.55ZM605.78,119.54l3.25-1.33c-.69-.05-1.76.03-2.49.42l2.35-2.35c-1.85,0-3.96,1.73-3.7,3.7l.66-.65c-.03.07-.05.14-.07.21ZM608,114.95l-6.06,3.25c2.52.22,5.04-1.07,6.06-3.25ZM607.26,114.21l-9.75,1.03c2.05,1.57,8.11,1.04,9.75-1.03ZM607.55,110.52l-7.24,3.55c2.78.29,5.72-1.42,7.24-3.55ZM605.48,110.67l-8.57.59c2.04,1.75,6.77,1.13,8.57-.59ZM604.75,108.15l-5.17,1.92c1.45.62,4.31-.74,5.17-1.92ZM603.71,107.56l-1.92.15c.61.28,1.33.17,1.92-.15Z"/> <path class="cls-38" d="M696.45,159.85c-.06-.45-.24-.98-.59-1.64-1-1.93-2.86-3.14-2.72-5.49l-.22,2.88c2.3,2.17,1.94,5.3,1.53,8.14.06-.09.12-.18.18-.27l-.17.33c2.85-2.29,4.19-4.8,4.21-8.43l-2.23,4.47ZM698.46,161.14c.99-2.62,2.73-4.72,1.11-7.54l-1.11,7.54ZM705.47,146.6c-.33-1.6-1.12-3.18-2.13-4.52l.22,2.44c1.6,2.3.4,6.44-.47,8.79,1.43-1.12,2.18-2.48,2.44-3.91,1.2-2.18,2.63-4.65.68-6.65l-.75,3.86ZM707.33,140.97l.89,3.99c.67-1.33.64-3.47-.89-3.99ZM709.55,140.08l.22,2c.4-.75.35-1.53-.22-2ZM712.01,147.36c1.9-.56,4.01-1.76,5.96-1.96l-3.33-.66c-.93.56-1.99,1.68-2.64,2.62ZM721.52,141.63l-5.32,1.33c.82,1.99,4.37-.27,5.32-1.33ZM721.74,139.86l-3.33.67c.95.86,2.65.49,3.33-.67ZM725.95,134.1l-5.54,4.66c2.36.41,5.53-2.32,5.54-4.66ZM725.95,131.21l-1.11,2.22c.76-.49,1.19-1.31,1.11-2.22Z"/> </g> <g> <path class="cls-27" d="M690.05,170.47c2.13-2.61,4.86-4.5,7.64-6.35,1.6-1.05,3.86-2.31,4.47-4.26.04-.14-.16-.27-.25-.15-1.47,1.88-3.19,3.13-5.15,4.47-2.58,1.75-4.82,3.8-6.73,6.27,0,.01.01.03.03.02h0Z"/> <g> <path class="cls-25" d="M602.19,119.29c-.74.66-1.53,1.22-2.46,1.62-.1.04-.07.21.03.23,1.54.23,3.13.25,4.69.21.14,0,.14-.21,0-.21-1.17-.04-2.35-.03-3.52-.11-.21-.01-.54-.12-.74-.03.32-.14.62-.32.91-.5.62-.38,1.15-.88,1.67-1.38.09-.08,0-.24-.12-.2-2.86.96-5.67.48-8.31-.91,0,0,0,0-.01-.02.25.05.49.09.74.13.51.08,1.03.09,1.55.09,1.24,0,2.48-.25,3.65-.62.11-.04.09-.2-.03-.21-2.97-.09-4.77-2.64-7.39-3.6,2.81-.49,3.09-3.78,3.08-6.27,0-.16-.25-.16-.25,0-.03,2.49-.18,5.98-3.42,6.09-.13,0-.17.2-.03.24,2.25.58,3.81,2.44,5.91,3.34.46.2.95.31,1.45.38.02,0,.04,0,.05,0-.27.08-.54.14-.82.2-1.71.38-3.52.32-5.21-.15-.12-.03-.19.13-.08.2,2.67,1.62,5.65,2.34,8.66,1.51Z"/> <path class="cls-25" d="M610.14,136.21c-.8-.65-1.67-1.21-2.54-1.76-.51-.33-1.05-.44-.64-1.1.41-.67.75-1.31,1.36-1.83.11-.09,0-.24-.13-.22-1.32.28-2.29,1.06-3.09,2.09.46-2.76.85-5.65,2.96-7.67.07-.07-.02-.18-.1-.13-1.19.7-1.86,2.01-2.29,3.48-.38.44-.77.84-1.23,1.2-.28.22-1.17,1.01-.51.31.35-.37.63-.83.7-1.34.12-.83-.59-1.42-1.22-1.8-1.21-.73-2.59-1.02-3.96-1.29,2.17-.05,4.31-.98,5.71-2.66.04-.05-.03-.13-.08-.08-1.55,1.59-3.49,2.56-5.73,2.65-.04,0-.05.03-.04.06-.77-.15-1.53-.31-2.27-.54,2.86-.01,6-.72,7.47-3.43.04-.08-.07-.14-.12-.07-2.02,2.62-4.9,3.51-8.14,3.23-.12-.01-.18.19-.07.24,1.58.69,3.41.84,5.05,1.32.95.28,1.99.62,2.72,1.32.95.9.02,2.02-.7,2.71-.1.1.03.24.14.19.93-.42,1.61-1.02,2.2-1.8-.43,1.57-.59,3.28-.82,4.55-.02.13.14.2.22.09.73-1.04,1.6-1.86,2.78-2.25-.58.63-.94,1.4-1.44,2.12-.04.06-.01.15.05.18,2.93,1.87,5.91,3.64,6.86,7.22.03.11.19.06.17-.05-.5-2.05-1.64-3.64-3.27-4.96Z"/> <path class="cls-25" d="M745.78,90.07c1.69,1.32,3.66,2.37,5.78,2.79-2.34.36-4.96.45-6.93-.98-.1-.07-.22.09-.13.17.09.08.19.16.28.24,0,.01.03.03.05.04,2.89,2.48,5.91,4.85,7.62,8.35.07.15.29.02.22-.13-1.56-3.21-4.2-5.51-6.91-7.75-.04-.03-.08-.07-.13-.1.57.26,1.22.41,1.83.49,1.64.21,3.28.07,4.9-.21.16-.03.1-.23-.03-.25-4.75-.61-8.78-4.3-11.01-8.34-.05-.09-.2-.03-.16.07.86,2.27,2.74,4.15,4.62,5.62Z"/> <path class="cls-25" d="M623.49,149.64s.09-.02.06-.06c-.62-.73-1.21-1.6-1.81-2.37-1.07-1.36-2.36-2.86-2.95-4.52-.04-.12-.21-.16-.28-.04-.59,1.06-.81,2.15-.74,3.32-1.46-2.03-2.2-4.24-1.9-6.79.01-.12-.15-.13-.2-.06-.39.53-.73,1.09-.96,1.71-.16.42-.29.84-.39,1.27-.05.23-.1.46-.14.69-.14-.21-.24-.43-.31-.68-.82-2.29.07-4.22,1.5-5.99.06-.07-.03-.17-.1-.11-2.15,1.91-2.3,4.72-1.13,7.19.03.07.15.05.16-.02.18-1.11.46-2.17,1-3.16.16-.3.34-.87.25-.11-.07.58-.04,1.15.01,1.73.18,1.87,1.17,3.51,2.31,4.96.11.14.27-.02.26-.15-.17-1.19-.01-2.3.5-3.36,1.01,2.47,3.15,4.59,4.86,6.53Z"/> <path class="cls-25" d="M592.51,107.4c2.22-.44,4.51.04,6.61.77.02,0,.03-.02.01-.03-1.98-.85-4.06-1.36-6.2-1.08,1.75-1.43,3.62-2.43,5.97-2.34.13,0,.16-.19.03-.23-1.15-.3-2.28-.37-3.45-.2-.25.04-.5.1-.75.17-.23.06-.64.4-.44.05.28-.49.81-.83,1.26-1.14,1.26-.86,2.99-1.74,3.06-3.49.08-2-1.56-3.25-2.15-5.03-.21-.64.17-.19.48,0,.35.21.8.34,1.21.37,1.07.08,2.1-.17,3.02-.73.11-.07.01-.22-.1-.17-1.6.74-3.33,1.06-4.75-.22-.07-.06-.21-.03-.2.08.12,2.33,2.74,3.71,2.17,6.21-.5,2.21-3.49,2.43-4.35,4.38-.03.07.02.18.11.14,1.22-.47,2.46-.59,3.72-.42-2.06.18-3.8,1.28-5.39,2.67-.11.1,0,.26.13.23Z"/> <path class="cls-25" d="M595.4,92.78c1.98-.46,4.25-.42,5.67,1.24.07.08.17-.03.11-.11-1.33-1.69-3.38-1.8-5.34-1.5,1.84-1.57,4.04-2.14,6.37-1.22.12.05.17-.13.08-.2-1.57-1.12-3.55-.73-5.19.18,1.97-2.81.59-6.31,1.02-9.49,3.66,4.36,9.48-6.12,10.2-8.98,0-.03,0-.05,0-.07.5.38,1.05.69,1.68.94.01,0,.02-.01,0-.02-.74-.33-2.9-1.49-2.74-2.52.08-.48.03-.98-.02-1.46-.03-.25-.16-1.37-.31-1.47,1.89,1.23,4.19,1.94,6.42,1.36.12-.03.1-.22-.03-.22-2.34-.05-4.14-1.12-5.85-2.54,1.1.63,2.58.78,3.78.73,1.83-.07,3.6-.87,4.99-2.03.05-.04-.02-.12-.06-.08-1.12.86-2.34,1.48-3.66,1.79,0-.02-.01-.04-.03-.05-.98-.69-1.73-1.58-2.47-2.52-.17-.22-.79-.67-.23-.42.34.15.7.25,1.06.33,1.59.37,3.29.01,4.8-.52,3-1.06,6.05-3.32,7.71-6.07.04-.07-.06-.13-.11-.06-2.82,3.88-8.89,8.37-13.87,5.95-.07-.03-.17.04-.11.11.91,1.21,1.81,2.4,3.04,3.3-.55.11-1.12.18-1.7.18-1.1,0-2.17-.29-3.17-.73-.08-.03-.15-.08-.22-.12-.1-.08-.19-.17-.29-.25-.04-.03-.09.02-.05.05.05.04.1.07.15.11.08.14.18.28.32.38.31.32.66.63,1.02.9,1.25.94,2.59,1.54,4.14,1.75-.2.03-.39.04-.59.05-.59.03-1.2-.07-1.78-.2-1.22-.27-2.35-.89-3.4-1.56-.08-.05-.2.03-.16.13.3.81.49,1.61.53,2.47.02.31-.25.89-.05,1.12.38.45.78.83,1.21,1.16-.05-.01-.11,0-.13.07-.98,2.55-6.55,13.38-9.97,8.6-.07-.09-.25-.1-.27.04-.58,3.32,1,6.97-1.03,9.98-.01.02-.02.04-.01.06-.59.36-1.13.77-1.58,1.2-.11.11,0,.28.15.25Z"/> <path class="cls-25" d="M735.38,144.29c-.13,5.89-5.71,9.42-8.66,14.02-1.52-3.61-6.7-1.68-9.64-.95-.02,0-.01.03,0,.03,2.88-.64,8.28-2.35,9.19,1.85.07.31.5.33.65.08,2.88-4.81,8.58-8.98,8.67-15.03,0-.14-.21-.14-.22,0Z"/> <path class="cls-25" d="M748.86,115.18c-.09-.09-.24.05-.14.14,1.67,1.7,2.63,3.68,2.79,6.07.12,1.82-.19,3.66-.42,5.46,0-.16-.02-.32-.03-.48-.07-.76-.26-1.51-.53-2.22-.57-1.5-1.68-2.74-2.79-3.86-.07-.07-.19.02-.13.1,2.68,3.73,1.76,7.82.42,11.82-.08-2.81-.58-5.42-2.78-7.43,0,0,0,0,0,0,2.24,2.23,2.52,5.2,2.53,8.2,0,.16.22.18.27.04,1.12-3.21,2.54-7.11,1.08-10.46-.19-.45-.41-.87-.66-1.28.48.54.92,1.1,1.3,1.71.93,1.46,1.21,3.14,1.18,4.83-.03.08-.03.13,0,.16,0,.12,0,.23,0,.35,0,.11.15.1.16,0,.24-2.42.8-4.81.66-7.25-.14-2.34-1.2-4.32-2.88-5.91Z"/> <path class="cls-25" d="M756.86,110.99c-1.68-3.87-5.57-5.01-8.82-7.2-.89-.6-1.62-1.35-2.39-2.07.61.57,1.45.83,2.24,1,2.36.51,4.88.05,7.06,1.32.09.05.21-.05.14-.14-2.39-3.26-5.18-5.91-8.92-7.55-.08-.03-.15.08-.07.12,3.38,1.77,6.28,4.22,8.6,7.25-.16-.21-1.1-.48-1.62-.59-.71-.16-1.44-.2-2.16-.25-1.87-.12-3.95-.06-5.43-1.39-.02-.02-.06,0-.04.03,2.57,3.47,7.07,4.2,9.88,7.35.38.42.68.9.96,1.39.38.67.39.53-.11.15-.83-.62-1.89-.92-2.88-1.16-2.27-.54-4.77-.63-6.43-2.49-.07-.08-.21.02-.15.11,1.29,1.91,3.02,3.5,4.68,5.07.94.89,1.9,1.77,2.83,2.67.18.17.93,1.16,1.14,1.17-.71-.03-1.43-.24-2.12-.41-.03,0-.05,0-.07.01-1-1.1-2.04-2.15-3.47-2.7-.15-.06-.21.17-.06.23,2.31.97,3.58,3.23,5.4,4.83-1.62-.02-3.23-.26-4.69-.98-.03-.01-.05.02-.02.04,1.6.93,3.28,1.19,5.11,1.23.12,0,.2-.17.1-.25-.8-.65-1.48-1.43-2.17-2.2.75.2,1.5.39,2.29.42.11,0,.15-.13.08-.2-1.5-1.61-3.13-3.09-4.73-4.6-.84-.79-1.66-1.61-2.44-2.46-.31-.34-.61-.69-.9-1.04,2.64,1.94,6.55,1.02,9.03,3.37.09.08.2-.02.16-.12Z"/> <path class="cls-45" d="M635.12,177.66c-1.77-1.04-3.76-1.26-5.75-1.61-1.87-.33-3.22-1.1-4.51-2.47-2.35-2.52-3.73-5.95-4.66-9.21-.44-1.55-.74-3.13-.87-4.73-.07-.87.36-1.3.81-2.02.6-.96,1.15-1.95,1.72-2.92.52-.87,1.05-1.72,1.64-2.54.37-.52,1.22-1.16,1.2-1.86-.01-.39-.16-.74-.14-1.14.03-.52.09-1.05.15-1.57.14-1.17.31-2.33.42-3.5,0-.07-.11-.09-.12-.02-.14,1.04-.32,2.08-.46,3.12-.07.52-.13,1.05-.18,1.57-.05.5-.24,1.05-.26,1.53-.01.25-.51.65-.68.86-.33.41-.64.85-.94,1.29-.65.93-1.2,1.93-1.76,2.91-.55.98-1.11,1.95-1.69,2.91-.32.52-.08,1.31,0,1.86.2,1.55.56,3.09,1,4.59.91,3.16,2.32,6.32,4.47,8.84.99,1.16,2.2,2.1,3.59,2.71,2.19.97,4.68.67,6.89,1.63.16.07.29-.15.14-.24Z"/> <path class="cls-25" d="M744.74,125.93c1.76,3.79-.12,7.54-.48,11.4-.08.91-.04,1.82.07,2.73.06.47.15.47-.28.19-.4-.26-.83-.46-1.27-.64-1.48-.63-3.12-.7-4.67-.29-.05.01-.08.06-.08.1-.15,2.21-.31,4.41-.75,6.58-.1.48-.22.96-.34,1.43-.07.29-.26,1.76-.28.72-.02-1.02-.13-2.02-.5-2.98,0-.02-.05-.01-.04,0,.4,1.23.39,2.49.38,3.76,0,.1.13.11.16.02.85-2.31,1.21-4.78,1.42-7.22.06-.64.1-1.28.13-1.93.04-.73,1.58-.56,2.05-.55,1.53.04,3,.7,4.23,1.58.09.07.2-.04.18-.14-.52-2.69.44-5.37.97-7.99.49-2.38.33-4.7-.81-6.87-.04-.08-.16,0-.12.07Z"/> <path class="cls-25" d="M689.81,150.24c-.11-2.06.13-4.11.03-6.17,0-.04-.06-.04-.06,0-.12,1.92-.22,3.84-.24,5.76-.02,1.52-.02,3.19.62,4.61.65,1.43,1.63,2.72,2.2,4.18.57,1.48.53,3.16.27,4.7-1.04,6.08-6.35,11.54-11.73,14.17-.09.04-.01.16.07.13,5.46-2.52,10.24-7.75,11.81-13.6.39-1.44.41-2.86.49-4.34.07-1.39-.86-2.73-1.6-3.81-1.23-1.79-1.75-3.44-1.86-5.62Z"/> </g> <path class="cls-42" d="M711.9,35.63c3.27,1.35,4.68,4.59,6.86,7.11,2.26,2.62,5.14,4.51,6.22,7.98.09.3.57.18.48-.13-.96-3.44-3.95-5.75-6.39-8.15-2.37-2.33-3.84-5.7-7.14-6.92-.07-.03-.1.09-.03.11h0Z"/> </g> <g> <g> <path class="cls-71" d="M761.43,43.41s.89-9.31-5.32-11.09c-6.21-1.77-13.3,1.33-18.62,3.1-5.32,1.77-8.43,8.43-13.3,12.42-4.88,3.99-13.75,7.98-13.75,7.98,3.99,3.1,8.87,6.21,9.76,11.09,1.33,0,3.99-.44,4.88.44.89.89,2.66,1.33,3.1,2.22.44,0-.2,1.38,0,1.77,3.55,7.1,11.08,7.98,13.75,14.19,0,0,2.22-4.88,7.09-10.2,4.88-5.32,4.43-8.87,5.76-13.3,1.33-4.43,7.98-10.64,6.65-18.62Z"/> <path class="cls-66" d="M645.25,25.67s-3.1-3.1-5.77-7.09c-2.66-3.99-11.08-10.2-11.08-10.2-1.33-3.55-4.88-6.21-4.88-6.21-13.75,2.66-12.86,20.4-11.97,31.04.89,10.2,7.98,16.85,10.64,26.16,0,0,9.31-7.98,18.18-10.2,0,0,2.22-6.21,5.76-8.87,3.55-2.66,7.98-6.65,7.98-6.65-1.77-2.22-8.87-7.98-8.87-7.98Z"/> </g> <path class="cls-65" d="M645.25,25.67s-1.65-1.65-3.57-4.08c-.55-.18-1-.31-1.31-.35-2.03-.29-17.53,1.89-29.25,3.92.03,2.87.23,5.64.43,8.05.3,3.45,1.31,6.49,2.62,9.36,2.56.12,10.43.22,15.56-2.71,5.89-3.36,14.96-8.32,23.07-5.04.81-.71,1.32-1.17,1.32-1.17-1.77-2.22-8.87-7.98-8.87-7.98Z"/> <path class="cls-88" d="M756.11,32.33c-6.21-1.77-13.3,1.33-18.62,3.1-5.32,1.77-8.43,8.43-13.3,12.42-3.22,2.64-8.18,5.27-11.18,6.76,2.53.28,10.59.71,16.5-4.1,7.09-5.76,15.08-15.08,23.5-11.53,3.03,1.27,5.94,2.38,8.47,3.18,0-2.6-.57-8.46-5.37-9.83Z"/> <path class="cls-29" d="M620.06,24.71c3.14,6.85,17,3.2,23.87-.45-1.15-1.28-2.87-3.32-4.44-5.68-2.66-3.99-11.08-10.2-11.08-10.2-.39-1.03-.96-1.98-1.58-2.82-.22.18-.43.36-.64.56-4.36,4.03-8.9,12.52-6.12,18.59Z"/> <path class="cls-29" d="M728.17,71.35c3.55,7.1,11.08,7.98,13.75,14.19,0,0,2.22-4.88,7.09-10.2,4.88-5.32,4.43-8.87,5.76-13.3,1.33-4.43,7.98-10.64,6.65-18.62,0,0,.13-1.33-.05-3.08-.76-.55-1.28-.91-1.28-.91-3.1-8.87-19.95,2.66-22.62,7.98-7.98,3.1-7.1,14.63-8.87,21.29l-.5.8s.04.06.05.09c.44,0-.2,1.38,0,1.77Z"/> <path class="cls-96" d="M728.12,69.48s.04.06.05.09c.44,0-.2,1.38,0,1.77,3.55,7.1,11.08,7.98,13.75,14.19,0,0,2.22-4.88,7.09-10.2,4.88-5.32,4.43-8.87,5.76-13.3,1.33-4.43,7.98-10.64,6.65-18.62,0,0,.13-1.33-.05-3.08-.76-.55-1.28-.91-1.28-.91-2.48-7.09-13.75-1.14-19.53,4.25,2.19.42,4.96.66,7.12,1.74-1.99,0-4.43.22-6.21,1.11,2.22,0,4.43.22,6.65,1.11-2.66-.44-5.32-.44-7.76.22,2.44.44,5.1,1.55,6.65,3.55-2.66-.67-5.54-.89-8.2-.44l-1.33.22c2.22.44,4.21,1.77,5.76,3.33-2-.89-4.21-2-6.43-2.22,3.33,1.77,5.1,4.43,5.99,7.98-1.33-2-3.77-3.33-6.21-3.99l-1.55-.89c3.55,2,7.1,5.54,7.32,9.98-.89-2-2.22-3.33-3.99-4.66,1.33,1.55,2.44,3.55,2.66,5.54-1.55-3.1-6.43-5.32-9.75-5.54,2,2.44,3.33,5.99,3.99,9.09-1.11-1.99-2.22-3.99-3.77-5.76.67,1.55,1.33,2.88,1.33,4.43-.89-1.55-1.77-2.88-3.32-3.99l-.09.05c-.22,1.5-.46,2.92-.79,4.16l-.5.8Z"/> <path class="cls-19" d="M731.72,72.83s9.75,0,15.96-13.01c3.63-7.6,2.31-13.99.58-17.99,1.87-1.68,7.83-6.46,11.54-3,0,0,.02-.01.04-.03-2.92-6.11-13.68-.36-19.28,4.87,2.19.42,4.96.66,7.12,1.74-1.99,0-4.43.22-6.21,1.11,2.22,0,4.43.22,6.65,1.11-2.66-.44-5.32-.44-7.76.22,2.44.44,5.1,1.55,6.65,3.55-2.66-.67-5.54-.89-8.2-.44l-1.33.22c2.22.44,4.21,1.77,5.76,3.33-2-.89-4.21-2-6.43-2.22,3.33,1.77,5.1,4.43,5.99,7.98-1.33-2-3.77-3.33-6.21-3.99l-1.55-.89c3.55,2,7.1,5.54,7.32,9.98-.89-2-2.22-3.33-3.99-4.66,1.33,1.55,2.44,3.55,2.66,5.54-1.55-3.1-6.43-5.32-9.75-5.54,2,2.44,3.33,5.99,3.99,9.09-1.11-1.99-2.22-3.99-3.77-5.76.67,1.55,1.33,2.88,1.33,4.43-.89-1.55-1.77-2.88-3.32-3.99l-.09.05c-.22,1.5-.46,2.92-.79,4.16l-.5.8s.04.06.05.09c.44,0-.2,1.38,0,1.77,2.73,5.46,7.82,7.24,11.23,10.6-2.1-2.84-5.21-6.82-7.68-9.12Z"/> <path d="M641.61,21.5c-1.16.3-3.19.78-5.23,1.07-3.1.44-9.75,1.77-9.75,1.77,0,0-5.76-2.66-3.99-5.76,1.77-3.1,5.77-5.32,5.77-5.32,0,0-1.02-3.06.22-4.72-.14-.1-.22-.16-.22-.16-1.33-3.55-4.88-6.21-4.88-6.21-13.75,2.66-12.86,20.4-11.97,31.04,0,.05.01.1.02.16,3.43,4.28,7.31,4.3,12.4,4.72,5.32.44,9.76-3.99,15.08-5.76,3.97-1.32,9.16-1.91,11.55-2.12-2.53-2.25-5.34-4.54-5.34-4.54,0,0-1.69-1.69-3.64-4.17ZM756.11,32.33c-6.21-1.77-13.3,1.33-18.62,3.1-5.32,1.77-8.43,8.43-13.3,12.42-2.45,2.01-5.92,4.01-8.75,5.51,1.49-.22,3.64-.58,5.65-1.08,3.55-.89,5.32-2.66,7.98-4.88,2.66-2.22,7.98-8.42,7.98-8.42,0,0,8.43-3.55,12.42-4.88,3.27-1.09,8.02-.39,10.37,1.11-.8-1.3-1.98-2.39-3.71-2.88Z"/> <g> <path class="cls-90" d="M622.34,59.33c-.02-.08-.05-.15-.07-.22-.06.05-.13.1-.19.16.09.02.17.05.26.07Z"/> <path class="cls-98" d="M650.6,30.27c1.21,1.01,2.39,2.07,3.4,3.26,0,0,0,0,.01,0-.97-1.18-2.08-2.28-3.23-3.33-.04.04-.06.07-.06.07l-.11.02Z"/> <path class="cls-95" d="M654.11,33.66s.01,0,0,0c-.04-.04-.07-.08-.11-.13,0,0,0,0-.01,0,.04.04.07.08.11.13Z"/> <path class="cls-102" d="M654.01,33.53s.07.08.11.13c0,0,0,.01,0,0-.04-.04-.08-.08-.11-.13,0,0,0,0,0,0-2.78,2.5-5.81,4.71-8.62,7.18-2.41,2.12-4,5.33-5.12,8.3-.1.25-2.1.66-2.5.8-1.09.39-2.15.86-3.2,1.35-2.18,1.03-4.27,2.26-6.3,3.57-2.07,1.34-4.1,2.79-5.99,4.38.02.07.05.15.07.22-.09-.02-.17-.05-.26-.07.06-.05.13-.1.19-.16-1.55-5.17-4.46-9.7-6.89-14.48-1.3-2.56-2.4-5.22-3.06-8.02-.24-.99-.39-2-.5-3.02l-.49-.21c.11,1.01.25,2.02.47,3.02.57,2.63,1.6,5.14,2.78,7.55,2.52,5.15,5.83,9.91,7.46,15.46.03.12.17.14.26.07,1.99-1.71,4.16-3.24,6.36-4.67,1.94-1.26,3.96-2.4,6.05-3.4,1.23-.58,2.49-1.09,3.77-1.52.36-.12,1.92-.33,2.05-.68,1.08-2.99,2.74-6.08,5.09-8.26,1.75-1.62,3.79-3,5.61-4.55,1.01-.86,2.01-1.74,3-2.63.16-.14-.06-.37-.23-.25Z"/> <path d="M628.78,8.29c-.49-.37-.67-1.29-1-1.85-.99-1.68-2.39-3.17-3.91-4.38-.45-.36-.97-.08-1.49.06-1,.26-1.97.64-2.89,1.11-1.67.84-3.11,2.1-4.27,3.56-2.41,3.06-3.45,7-3.97,10.79-.55,4.07-.47,8.21-.21,12.3.08,1.17.15,2.34.28,3.51l.49.21c-.14-1.31-.21-2.64-.29-3.95-.47-7.75-.66-17.64,5.17-23.62,1.47-1.51,3.34-2.55,5.34-3.17.16-.05,1.31-.43,1.33-.41.15.12.3.24.44.36.79.67,1.52,1.42,2.19,2.21.94,1.1,1.42,2.3,2.13,3.52.12.21.48.38.66.52l.09-.69s-.07-.05-.1-.08Z"/> <path d="M646.04,26.16c-1.66-1.4-3.02-3.11-4.29-4.86l-.51-.03c.54.73,1.1,1.45,1.7,2.14,1.83,2.09,3.88,3.7,6.01,5.48.54.46,1.1.91,1.65,1.38l.11-.02s.03-.03.06-.07c-1.54-1.4-3.18-2.72-4.73-4.03Z"/> <path class="cls-34" d="M639.2,17.76c-2.48-3.32-5.94-6-9.19-8.53-.37-.29-.74-.57-1.12-.85l-.09.69c1.45,1.09,2.86,2.23,4.25,3.4,1.74,1.47,3.46,3,4.99,4.7,1.16,1.29,2.16,2.72,3.21,4.11l.51.03c-.86-1.18-1.69-2.39-2.55-3.54Z"/> </g> <g> <path class="cls-14" d="M760.14,39.41c-2.49-7.21-12.72-1.11-16.42,1.55-1.45,1.05-2.84,2.21-4.09,3.49-.48.49-.94,1-1.35,1.54-.19.25-.37.51-.54.77-.08.12-.15.24-.22.36-.12.21-.19.03-.36.11-3.9,1.57-5.76,5.41-6.72,9.27-.99,3.98-1.21,8.13-1.92,12.16-.02.13.15.18.2.05,1.39-4.01,1.4-8.45,2.49-12.56.57-2.14,1.41-4.24,2.85-5.94.68-.8,1.5-1.45,2.4-1.98.24-.14.92-.33,1.03-.59.14-.32.32-.62.51-.92,1.97-3.02,5.24-5.36,8.26-7.21,2.95-1.81,6.92-3.86,10.5-3.1,1.59.34,2.72,1.53,3.3,3.01.02.06.11.03.09-.02h0Z"/> <path class="cls-25" d="M737.51,51.09c-.11-.02-.15.13-.05.16,1.05.26,2.01.63,2.95,1.15.87.49,1.79,1.52,2.53,1.85-1.96-.88-3.96-1.85-6.12-2.04-.06,0-.08.08-.03.11,2.81,1.53,4.66,4.01,5.67,7.01.27.79.31.68-.2.09-.44-.52-.98-.94-1.53-1.34-1.22-.89-2.67-1.45-4.12-1.83-.5-.34-1-.65-1.52-.93-.08-.04-.14.07-.07.11,2.8,1.69,5.33,3.96,6.62,7.03.34.81.53,1.68.63,2.56-.06-.51-.65-1.22-.98-1.67-.78-1.06-1.81-1.92-2.86-2.72-.08-.06-.16.06-.1.13,1.26,1.51,2.23,3.21,2.59,5.15-.13-.71-1.43-1.89-2.22-2.47-2.14-1.57-4.75-2.64-7.41-2.86-.11,0-.14.13-.08.2,1.79,2.24,2.89,4.94,3.66,7.68.09.3.61,1.5.12.62-.37-.67-.75-1.32-1.15-1.98-.67-1.11-1.43-2.15-2.27-3.14-.06-.07-.15.02-.12.09.37.84.74,1.68,1.03,2.56.15.47.23.96.28,1.45,0-.05-.47-.69-.58-.85-.7-1.1-1.58-2.04-2.63-2.82-.07-.05-.13.06-.07.11,1.43,1.07,2.41,2.44,3.3,3.97.04.06.14.04.13-.04-.03-.78-.18-1.49-.42-2.24-.12-.38-.28-.74-.43-1.11-.1-.24-.71-1.18-.11-.44,1.29,1.57,2.27,3.38,3.25,5.15.05.09.17.03.15-.07-.39-1.77-.91-3.5-1.62-5.17-.38-.89-.84-1.74-1.34-2.56-.24-.39-.52-.77-.79-1.14-.15-.2.72.03.7.03,3.31.52,6.96,2.37,8.67,5.35.05.09.17.02.16-.07-.25-1.84-1.08-3.56-2.22-5.01-.57-.72.32.26.48.4.41.35.79.72,1.16,1.12.74.79,1.3,1.7,1.76,2.68.03.07.16.04.15-.04-.25-3.81-2.7-6.94-5.76-9.05,2.34.74,4.62,1.94,6.05,3.99.05.07.17.03.15-.06-.61-2.36-1.6-4.47-3.38-6.17-.38-.37-.81-.68-1.24-.99-.27-.19-.55-.35-.83-.52-.72-.43.33-.05.53,0,1.83.4,3.53,1.26,5.23,2.02.09.04.2-.07.11-.15-1.61-1.57-3.56-2.91-5.81-3.34ZM748.15,47.51c-1.9-.73-3.87-1.03-5.9-1.09-.9-.03.25-.21.51-.3.46-.15.92-.24,1.39-.33,1.15-.22,2.34-.27,3.52-.28.1,0,.16-.15.05-.2-2.31-1.1-4.86-1.31-7.34-1.79-.14-.03-.19.18-.06.21,2.34.45,4.75.66,6.97,1.61-.59-.25-2.05.07-2.84.18-1.05.15-2.08.45-3.04.9-.1.05-.05.19.05.19,1.87.01,3.7.21,5.48.74-2.21-.25-4.45-.2-6.61.41-.08.02-.08.15,0,.16,1.21.23,2.37.59,3.49,1.1.51.24.99.53,1.46.85.37.25.69.53,1.01.83-.02-.02.69.6.35.52-2.56-.61-5.25-.75-7.85-.29-.01,0,0,.03,0,.02,2.75-.36,5.5-.15,8.18.5.08.02.12-.07.07-.13-1.31-1.61-3.12-2.57-5.08-3.19-.21-.06-.43-.12-.65-.18-.03,0-.79-.09-.57-.14.78-.18,1.57-.29,2.36-.36,1.65-.14,3.33,0,4.96.26.15.02.2-.17.06-.22Z"/> <path class="cls-72" d="M710.44,55.82s-.02,0,0,.01c.05.04.1.07.14.11,0,0,.01,0,.02,0-.05-.04-.1-.08-.15-.12Z"/> <path class="cls-31" d="M728.39,69.68c-.09-.33-.58-.65-.84-.84-.39-.29-.84-.49-1.26-.72-.49-.27-.87-.67-1.34-.95-.7-.41-1.52-.43-2.31-.43-.58,0-1.16.05-1.74.09-.8.05-.76-.47-.97-1.13-1.39-4.37-5.89-7.11-9.35-9.75,0,0-.01,0-.02,0,3.8,2.93,8.56,5.94,9.56,10.99,0,.03.03.04.06.04,1.36-.02,2.75-.26,4.09.05.62.14,1.14.74,1.67,1.07.64.39,1.33.67,1.9,1.18.51.46.3.95.23,1.48l.24-.31c.05-.23.14-.53.08-.77Z"/> <path class="cls-25" d="M728.09,71.37c.32,1.2,1.5,2.47,2.31,3.38,3.51,3.96,9.18,5.77,11.43,10.83.03.06.13.06.16,0,1.85-4.03,4.83-7.46,7.72-10.76,1.68-1.92,2.97-4.12,3.74-6.55.66-2.09.91-4.29,1.57-6.38.63-2,1.95-3.81,3.02-5.59,1.24-2.07,2.38-4.21,3.09-6.52.35-1.11.54-2.26.63-3.42.08-1.01-.22-2.04-.15-3.02.08-1.02.04-2.04-.06-3.06l-.31.43c.03.36.05.72.06,1.08.03,1.11.07,2.17.12,3.29.24,5.27-3.02,9.69-5.5,14.04-2.18,3.82-2.07,8.36-4.18,12.22-1.56,2.86-4.06,5.08-5.99,7.68-1.31,1.77-2.48,3.71-3.51,5.66-.14.27-.28.53-.4.81.26-.56-.91-1.93-1.25-2.35-1.23-1.54-2.79-2.74-4.39-3.88-1.75-1.25-3.53-2.47-5.07-3.98-.87-.85-1.61-1.8-2.26-2.82-.42-.66-.72-1.21-.56-2.01l-.24.31c-.03.2-.04.4.02.62Z"/> <path class="cls-63" d="M715.14,53.33c-1.57.83-3.17,1.63-4.79,2.36-.19.09-.03.37.17.28.02,0,.04-.02.05-.03-.05-.04-.1-.07-.14-.11,0,0,0-.02,0-.01.05.04.1.08.15.12,1.9-.86,3.78-1.8,5.62-2.8-.14-.06-.27-.11-.4-.17-.22.12-.45.24-.67.36Z"/> <path class="cls-58" d="M759.7,34.77h-.41c.49.66.88,1.42,1.17,2.2.45,1.2.67,2.47.77,3.75l.31-.43c-.19-1.95-.75-3.95-1.85-5.52Z"/> <path d="M756.63,32.31c-2.55-1-5.56-.79-8.2-.35-3.02.5-5.92,1.54-8.8,2.54-2.33.82-4.36,1.58-6.25,3.23-2.03,1.76-3.66,3.95-5.39,5.99-1.81,2.14-3.77,4.01-6.08,5.6-1.95,1.35-4.01,2.52-6.1,3.64.13.05.26.11.4.17,1.35-.73,2.68-1.49,3.99-2.3,2.18-1.34,4.23-2.83,6.03-4.65,1.93-1.96,3.57-4.18,5.41-6.22,1.85-2.06,3.86-3.67,6.5-4.57,2.84-.96,5.64-2.02,8.55-2.72,3.13-.75,6.49-1.06,9.61-.1,1.25.38,2.24,1.19,2.99,2.2h.41c-.75-1.07-1.75-1.93-3.07-2.45Z"/> </g> </g> </g> </g> </g> <path class="cls-29" d="M622.59,166.97c-13.07,1.78-23.45,10.66-35.88,14.34,0,0,0,.02,0,.01,12.46-3.54,22.95-12.21,35.96-14.04.21-.03.12-.35-.09-.32ZM623.07,160.33c-3.46,0-6.93.13-10.38.39,2.56-.6,5.15-1.09,7.74-1.48.11-.02.08-.2-.02-.19-3.22.4-6.45,1.01-9.64,1.83-2.87.25-5.73.59-8.57,1.04-7.18,1.12-14.25,2.83-21.25,4.77,0,0,0,.01,0,0,9.21-2.46,18.51-4.32,27.94-5.3-7.59,2.15-14.88,5.52-21.22,10.12-1.49.23-2.99.4-4.5.48-.01,0-.01.02,0,.02,1.47-.07,2.93-.22,4.39-.42-1.68,1.23-3.31,2.54-4.84,3.95-.02.01,0,.03.02.02,1.6-1.43,3.28-2.76,5.02-4,4.87-.69,9.65-1.96,14.46-3,3.3-.71,6.68-1.33,10.07-1.42,3.33-.09,6.73.35,9.94-.79.15-.05.09-.28-.07-.24-3.41.94-6.8.63-10.29.74-3.13.1-6.27.73-9.32,1.39-4.9,1.06-9.73,2.45-14.67,3.23,6.86-4.84,14.69-8.15,22.83-10.27,4.1-.37,8.22-.58,12.38-.59.19,0,.19-.3,0-.3ZM625.77,152.8c-4.12-1.58-8.82-2.22-13.2-2.54-4.65-.34-9.34-.04-13.9.88-.03,0-.02.06.01.05,4.45-.83,8.98-1,13.48-.67,2.38.17,4.74.5,7.08.95,2.18.42,4.29,1.08,6.44,1.61.19.05.25-.22.08-.29ZM623.12,154.56c-10.51-1.81-21.59-1.26-31.53,2.8-.02,0,0,.04,0,.03,9.89-3.95,21.03-4.29,31.44-2.53.2.03.28-.27.08-.3ZM622.19,170.16c-10.93,1.45-20.51,8.01-29.27,14.26-.01,0,0,.03.01.02,4.39-3.01,8.82-5.97,13.52-8.49,4.99-2.68,10.21-4.53,15.77-5.63.09-.02.07-.17-.02-.16Z"/> <path class="cls-62" d="M683.08,175.86c-.2-.16-.49.13-.29.29,6.73,5.26,14.05,11.51,16.93,19.83.03.08.16.05.13-.04-2.84-8.38-10.04-14.74-16.77-20.08ZM703.51,186.42c-1.74-.95-3.5-1.87-5.26-2.79-3.47-4.35-7.64-8.53-12.79-10.78-.13-.06-.24.13-.11.19,5,2.18,9.06,6.19,12.48,10.37-5.4-2.83-10.79-5.68-15.68-9.35-.21-.15-.4.19-.2.34,5.14,3.89,10.88,6.91,16.6,9.91,3.63,4.58,6.77,9.75,8.78,15.24,0,.03.05.02.04-.01-1.93-5.41-4.92-10.5-8.43-15.03,8.7,4.56,17.36,9.14,23.89,16.78.01.01.04,0,.02-.02-5.29-6.4-12.13-10.91-19.35-14.85ZM710.24,182.48c-4.58-2.77-9.33-5.26-14.2-7.49-4.5-2.05-9.17-4.07-13.94-5.38-.24-.07-.33.29-.1.37,4.66,1.69,9.3,3.32,13.83,5.38,4.76,2.16,9.4,4.6,13.9,7.25,8.77,5.18,17.12,11.32,24.19,18.68.02.02.05,0,.03-.03-6.85-7.45-15.07-13.56-23.71-18.78ZM690.88,161.53c13.87,2.65,28.15,3.53,42.18,1.63.02,0,.01-.03,0-.03-14,1.66-28.27.75-42.08-1.92-.21-.04-.3.28-.09.32ZM689.59,165.96c4.03.06,8.03.05,12.05.36,4.62.35,9.23.96,13.79,1.81,8.35,1.56,16.91,3.94,24.24,8.36.05.03.1-.05.05-.09-7.28-4.59-15.82-6.99-24.2-8.61-4.37-.84-8.79-1.43-13.22-1.8-4.19-.35-8.51-.65-12.71-.35-.2.01-.2.31,0,.31ZM745.05,202.58c-9.08-7.03-18.56-13.57-28.45-19.41-4.89-2.89-9.92-5.55-15.03-8.03-2.58-1.25-5.18-2.44-7.81-3.59-2.66-1.16-5.34-2.38-8.11-3.25-.18-.06-.3.23-.13.31,2.61,1.23,5.34,2.22,7.99,3.37,2.63,1.14,5.22,2.35,7.8,3.59,5.12,2.48,10.12,5.17,15.05,8,9.96,5.71,19.46,12.19,28.65,19.06.04.03.08-.04.05-.06ZM687.73,167.28c8.75,4.47,18.38,6.87,27.82,9.36,9.77,2.58,19.6,5.26,28.58,10.01.01,0,.03-.01.01-.02-17.5-9.86-38.24-10.97-56.24-19.65-.2-.1-.38.2-.18.31Z"/> </g> </g> </g> </g> </g></svg>',

		'<svg width="800px" height="800px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#F18F26" d="M10.478 22.439s.702 2.281-.337 7.993c-.186 1.025-.46 2.072-.599 2.93c-1.757 0-1.851 2.002-1.478 2.002h2.094c1.337 0 2.971-3.334 3.854-7.961s-3.534-4.964-3.534-4.964zm13.042 3.702s2.272 1.22 2.188 4.081c-.033 1.131-.249 2.091-.355 3.024c-1.832 0-1.839 1.985-1.305 1.985h1.856c.923 0 3.001-3.158 3.379-7.281c.379-4.122-5.763-1.809-5.763-1.809z"></path><path fill="#FFCC4E" d="M36 8.447C36 3.525 31.859 1 27 1a1 1 0 1 0 0 2c1.804 0 6.717.934 6.717 5.447c0 2.881-1.567 5.462-3.77 5.982c-.164-.073-.345-.104-.509-.192c-7.239-3.917-13.457.902-15.226-.29c-1.752-1.182-.539-3.255-2.824-5.243c-.33-1.841-1.073-4.477-1.794-4.477c-.549 0-1.265 1.825-1.74 3.656c-.591-1.381-1.363-2.756-1.86-2.756c-.64 0-1.278 2.273-1.594 4.235c-1.68 1.147-2.906 2.809-2.906 4.765c0 2.7 4.05 3.357 5.4 3.411c1.35.054 3.023 3.562 3.585 5.072c1.242 4.367 2.051 8.699 2.698 11.183c-1.649 0-1.804 2.111-1.348 2.111c.713 0 1.953-.003 2.225 0c1.381.014 2.026-4.706 2.026-8.849c0-.212-.011-.627-.011-.627s1.93.505 6.038-.208c2.444-.424 5.03.849 5.746 3.163c.527 1.704 1.399 3.305 1.868 4.484c-1.589 0-1.545 2.037-1.084 2.037c.787 0 1.801.014 2.183 0c1.468-.055.643-7.574 1.03-10.097s1.267-5.578-.229-8.797C34.857 15.236 36 11.505 36 8.447z"></path><circle fill="#292F33" cx="5.994" cy="11.768" r=".9"></circle><path fill="#E75A70" d="M2.984 12.86c-.677.423-.677 1.777-1.015 1.777S.954 13.841.954 12.86c-.001-.981 2.862-.52 2.03 0z"></path><path fill="#FEE7B8" d="M6.578 14.343c-.041.026-.09.036-.142.026c-.018-.004-1.548-.241-2.545.146c-.129.05-.341-.023-.413-.191s.023-.365.152-.415c1.44-.569 2.857-.234 2.934-.218c.139.029.195.19.188.372c-.004.114-.104.235-.174.28zm-.472 2.339a.186.186 0 0 1-.141-.031c-.015-.01-1.331-.83-2.402-.853c-.138-.003-.305-.154-.305-.341c0-.186.165-.335.304-.333c1.552.024 2.724.891 2.789.937c.117.082.104.255.027.424c-.049.107-.189.182-.272.197z"></path><path fill="#F18F26" d="M7.854 7.881s.372-.039.859.033c.217-.46.585-.887.585-.887s.281.668.386 1.179c.025.12.218.117.322.189c0 0 .038-3.463-.863-3.836c.001-.002-.755 1.124-1.289 3.322zM4.399 9.36s.384-.267.883-.574c.217-.624.568-1.333.568-1.333s.307.602.345.81c.21-.114.21-.106.403-.19c0 0-.114-2.286-1.099-2.527c0 0-.732 1.372-1.1 3.814z"></path><path fill="#FD9" d="M18.45 23.644c-2.649.57-2.38 2.782-2.38 2.782s1.93.505 6.038-.208a5.542 5.542 0 0 1 3.107.377c-1.607-3.047-4.315-3.479-6.765-2.951z"></path><path fill="#F18F26" d="M14.686 14.109c.476.676 2.397 2.368 2.745 2.159c.338-.203.59-2.055.342-2.706c-1.329.359-2.385.658-3.087.547zm7.024 2.689c.623.138 1.507-2.979 1.41-4.123c-1.449.017-2.78.256-3.965.537c.335 1.08 1.953 3.452 2.555 3.586zm2.627-4.082c.042.723.982 2.603 1.285 2.737c.307.137 1.685-1.319 1.866-2.061a12.573 12.573 0 0 0-3.151-.676z"></path></svg>',

		'<svg width="800px" height="800px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet"><path d="M103.13 54.42s3.5-.66 6.57-2.96c2.75-2.06 6.77-5.88 5.4-7.32c-1.48-1.55-3.87 2.53-4.43 1.55c-.37-.65 2.32-2.89 3.52-6.34c1.07-3.07-.15-6.11-2.89-2.75c-.85 1.04-1.49 2.17-1.9 1.76c-.44-.44.61-3 1.38-5.39c1.29-4.04-.68-6.72-4.05-1.83c-1.44 2.08-2.09 4.82-3.17 4.62c-.77-.14-.38-1.7-.51-3.25c-.27-3.23-3.36-2.87-4.42 2.83c-.47 2.52-.06 5.43-.63 5.63c-.99.35-.77-3.94-2.39-3.52c-1.18.31-1.62 3.24-1.55 6.34s2.04 8.09 2.04 8.09l2.75 5l4.28-2.46z" fill="#bdce44"></path><path d="M95.46 52.19s-2.21 5.16.82 11.8c2.21 4.85 5.37 8.27 3.5 10.21c-2.77 2.86-12.53-3.33-22.15-.49c-7.49 2.21-11.06 6.47-13.24 14.29c-1.63 5.85-3.24 8.12-5.96 8.92c-2.12.62-5.44.16-7.2-1.45c-3.72-3.42-3.63-7.37-2.23-10.69c1.31-3.11 5.64-6.15 7.65-7.19c5.56-2.89 19.22-7.11 23.09-14.5c3.45-6.59 4.36-14.15 2.25-19.08c-2.11-4.93-5.49-3.17-5.49-3.17l.77 11.68L63.83 66.6L44.47 79.83L41.8 93.91l6.76 11.4l13.94-1.06l14.22-21.4l13.73-.99l13.02-.7l4.93-13.8l-12.94-15.17z" fill="#6d8038"></path><path d="M105.59 40.13c-2.32-1.57-10.23 5.63-10.3 13.73c-.07 8.09 4.81 13.8 5.8 15.42s4.11 7.3.07 9.85c-3.24 2.06-18.37-4.58-26.19.42c-7.81 5-5.16 13.59-12.34 20.53c-2.69 2.61-17.15 5.02-18.35-9.34s16.19-15.06 24.78-21.33c8.59-6.26 11.33-11.54 11.05-18.93c-.28-7.39-2.46-9.71-2.46-9.71l-13.8 5.63l-6.34 10.28s-8.27 3.03-15.58 7.95c-8.61 5.8-10.14 10-10.14 10s-2.02-.63-2.02-1.13s7.09-8.57 6.48-12.11c-.75-4.34-3.14-5.51-4.55-5.65c-1.41-.14-2.21 1.08-1.17 2.67c1.03 1.6 1.55 3 1.36 3.61c-.19.61-.81 1.25-.94.19c-.14-1.17-.99-3.17-1.6-3.99c-.5-.67-2.06-2.63-3.99-2.3s-2.06 2.16-.47 3.66c1.6 1.5 3.14 3.61 2.35 4.55c-.8.94-2.11-2.09-2.96-3.21c-.84-1.13-2.93-1.56-4.18-1.81c-1.31-.26-3.47 1.19-2.21 3.28c.94 1.55 2.21.8 3.75 2.44s1.6 2.25 1.55 2.67c-.05.42-2.96 2.58-3.28 4.55c-.33 1.97.23 3.19-.52 3.89c-.75.7-3.94.56-4.97.89c-1.03.33-2.16 2.96-.19 3.8c1.97.84 5.58.99 7.27.47c1.23-.38 1.6-.94 2.11-.84c.52.09 4.6 3.1 4.6 3.1s-.58 4.34-.49 8.02c.12 4.79 1.55 8.54 1.55 8.54s1.43 2.04.82 2.02c-1.74-.07-6.48-4.79-8.82-5.3c-2.35-.52-4.22-.37-5.12.66c-.82.94-1.12 3.01.52 3.14c1.79.14 2.63-.23 2.63.42c0 .43-.58.78-1.74 1.17c-1.67.56-2.14 1.89-1.74 3.52c.38 1.53 2.49 1.08 3.1.61s.84-.94 1.17-.52c.33.42-1.11 1.5-1.55 2.49c-.89 1.99.36 2.85 1.69 2.96c1.83.14 2.11-2.21 2.96-3.1c.84-.89 1.92-1.6 2.3-1.55c.38.05.23 1.55 1.92 3.38c1.69 1.83 3.99.8 4.36 1.13s-.28 2.77 1.17 4.08s3.8.75 3.8-1.27s.19-2.86.19-2.86s2.84 2.49 6.55 3.8c3.71 1.31 8.78 2.42 8.78 2.42s-.51.91-.4 2.7c.05.73.21 2.96 2.37 2.91c1.55-.03 1.62-3 2.18-3.1c.56-.09-.54 3.87 2.32 4.06c2.86.19 1.95-3.54 2.46-3.64c.52-.09.53 4.84 4.27 3.14c1.97-.89-.66-5.24-.47-5.63c.12-.23 1.97-.52 3.19-1.31c.81-.53 1.31-1.69 1.31-1.69s5.91-1.67 8.35-6.08c3.33-6.02 2.77-13.16 5.4-15.46c2.63-2.3 7.7-.47 10.14-.19c2.44.28 2.67.19 2.82.28c.14.09.42 1.22.19 1.55c-.23.33-6.9 2.72-8.49 5.4c-1.6 2.67-1.37 4.58-1.22 5.3c.33 1.55 1.85 1.76 2.53.47c.67-1.27 1.03-2.39 1.6-2.21c.56.19-.54 2.29-.09 3.28c.66 1.45 2.3 1.22 2.96.7c.66-.52.82-2.58 1.29-2.35c.47.23 0 1.13.87 2.65c.77 1.35 3.31.12 2.93-1.88c-.23-1.22-1.24-2.14.21-3.31s2.63-1.13 4.13-2.06c1.5-.94 1.36-2.3 3.05-1.69c1.69.61 1.74 2.14 3 1.27c1.9-1.31.99-3.94-.61-5.21s-3.94-1.41-4.27-1.55c-.33-.14-.47-1.92-.47-1.92s9.48-3.71 10.56-13.05S104.7 59.07 104 53.02c-.68-6.01 3.62-11.52 1.59-12.89z" fill="#00aa48"></path><path d="M40.64 113.46c1.28.69 2.64 1.29 3.97 1.73c3.82 1.26 7.7 1.97 7.7 1.97s.8-1.64 3.47-2.86c1.51-.69 4.79-1.22 4.79-1.22s-4.83-.14-9.71-.94c-2.1-.34-4.73-1.24-7.12-2.82l-3.1 4.14z" fill="#7bd989"></path><path d="M51.75 66.25c3.05-1.62 5.98-3 8.26-3.99l-2.72-5.43c-2.17.75-5 1.91-8.44 3.71l2.9 5.71z" fill="#7bd989"></path><path d="M36.34 80.43c1.34-2.89 3.25-5.47 5.41-7.57l-3.76-5.36c-3.48 2.91-5.93 6.02-7.56 9.32l5.91 3.61z" fill="#7bd989"></path><path d="M29.75 78.3c-1.68 4.04-2.17 7.32-2.08 12.2l6.66-.38c-.14-2.87.39-5.64 1.37-8.21l-5.95-3.61z" fill="#7bd989"></path><path d="M32.26 105.7c1.19 1.64 2.55 3.12 4 4.61c.77.79 1.79 1.59 2.95 2.32l3.24-4.23c-.83-.66-1.6-1.41-2.3-2.26c-.96-1.17-1.9-2.41-2.75-3.9l-5.14 3.46z" fill="#7bd989"></path><path d="M31.38 104.41c-1.97-3.11-3.34-6.88-3.65-12.36l6.69-.61c.33 4.15 1.19 7.13 2.32 9.5l-5.36 3.47z" fill="#7bd989"></path><path d="M42.91 71.8c.93-.8 1.9-1.52 2.88-2.13c1.49-.93 3.03-1.83 4.57-2.67l-2.82-5.76c-1.48.81-3.32 1.83-5.01 2.89c-1.33.84-2.53 1.69-3.42 2.47l3.8 5.2z" fill="#7bd989"></path><path d="M61.24 61.73c.46-.19.88-.36 1.25-.51c3.38-1.31 4.41-3.33 3.75-4.88c-.66-1.55-3.24-1.17-3.85-.94c-.25.09-1.54.29-3.79.99l2.64 5.34z" fill="#7bd989"></path><linearGradient id="IconifyId17ecdb2904d178eab7802" gradientUnits="userSpaceOnUse" x1="88.642" y1="32.751" x2="46.971" y2="33.877"><stop offset="0" stop-color="#01ab46"></stop><stop offset=".396" stop-color="#128a3c"></stop><stop offset="1" stop-color="#2f502a"></stop></linearGradient><path d="M34.43 24.11s-.42-5.3 3.14-8.12c3.57-2.82 9.2-.94 12.29-.38s7.13.47 10.04-.19c2.91-.66 4.04-1.22 5.82-1.31s4.36-.28 6.62-.47c1.91-.16 5.73-.66 6.34 1.13c.46 1.33-.84 2.67-2.91 3.19c-2.06.52-2.67.75-2.25 1.69s3.85.33 4.6.09c.75-.23 5.12-1.13 5.12 1.41s-3.57 3.28-5.87 3.85c-2.3.56-3.7.23-3.61 1.41c.14 1.88 6.01.09 7.79-.14c1.78-.23 4.04-.56 4.27 1.13s-1.55 3.52-4.93 4.08s-5.58 1.13-5.54 2.02s4.2-.02 5.4-.23c1.55-.28 3.75-.32 3.99 1.27c.56 3.75-6.1 3.1-6.24 4.6c-.13 1.34 5.3-.09 5.96 2.11c.66 2.21-1.41 4.13-4.69 4.41c-2.28.2-10.09-1.36-11.31-.05s2.96 1.61 4.36 1.92c1.88.42 5.02.66 3.61 3.52c-.92 1.88-4.36 1.36-6.87 1.48s-6.97.4-6.97.4l-10.04.47l-8.4-.99l-5.3-1.97l-4.04-1.69l-1.27-1.36l11.68-14.41l-10.79-8.87z" fill="url(#IconifyId17ecdb2904d178eab7802)"></path><path d="M66.88 50.8c0 3.25-2.22 6.86-6.83 6.9c-4.61.04-6.97-2.78-7.71-2.99s-.99 2.67-3.55 2.82c-2.57.14-6.37-3.2-6.86-3.31c-.49-.11-.63 2.53-3.41 2.53c-1.94 0-4.19-3.03-5.67-4.4s-4.12-3.38-4.12-3.38h7.46s2.5-.28 5.63 0c3.04.27 5.53 2.67 10.56 2.57c2.82-.06 4.15-.32 4.15-.32s1.02-3.68 5.67-3.91c4.33-.21 4.68 2.75 4.68 3.49z" fill="#bece44"></path><path d="M51.49 20.75s4.86-1.85 5.47-3.17c.61-1.31 2.53-6.24 5.02-7.13c2.49-.89 3.94 1.6 2.21 3.52s-4.27 3.52-2.86 4.41s4.5-3.47 5.3-4.5s2.63-3.71 4.69-3.66c2.06.05 3.34 3.58-.61 6.85c-4.08 3.38-6.1 4.18-10.79 4.5c-4.69.33-6.95.63-6.95.63l-1.48-1.45z" fill="#ffba02"></path><path d="M27.48 20.96s-2.35-7.79 1.78-11.17s9.53-1.27 12.81.75c3.01 1.85 8.9 1.54 8.68-1.88c-.19-2.96-3.44-2.13-3.71-.8c-.23 1.17-.73 1.92-1.17 1.78c-.5-.15-.81-1.16-.75-1.78c.23-2.67 2.49-3.47 4.27-3.28c1.4.15 3.75 1.17 3.52 4.93s-4.15 4.81-7.93 4.18c-2.99-.5-5.68-2.58-8.39-3.31c-1.66-.44-4-.08-5.43.96c-1.67 1.22-2.11 3.15-2.1 4.74c.01 1.01.2 1.94.29 2.63c.21 1.57 1.97 6.34 1.97 6.34l-3.84-4.09z" fill="#7cdb8b"></path><path d="M54.61 26.5s2.39.52 2.49 3.28s-.33 3-.09 3.1s2.16-1.03 3.19.28c1.3 1.66-1.03 4.36-2.35 5.26c-1.31.89-2.11 1.03-2.3 1.45c-.19.42-1.96 5.87-4.36 6.85c-2.77 1.13-10.75.66-11.83.66s-2.16 1.06-3.17 1.58s-1.99.86-3.17.57c-1.17-.28-2.96-1.6-2.96-1.6L54.61 26.5z" fill="#7cdb8b"></path><path d="M38.61 38.79l2.86.14l1.45-5.12s-3.99-1.36-5.4-1.08s-4.46 1.45-5.44 1.97c-.99.52-1.78 1.83-3.66 1.55c-1.88-.28-5.91-1.03-8.31 1.69c-2.07 2.36-1.69 4.36.09 5.21c1.78.84 4.04-1.83 5.49-2.06c1.45-.23 3.66.8 3.66.8l9.26-3.1z" fill="#d43330"></path><path d="M28.05 32.88s.89 4.08 1.97 4.08s1.08-1.31 1.08-1.31s4.13-1.08 4.93-1.55c.8-.47 1.78-2.39 1.78-2.39l-7.32-.52l-2.44 1.69z" fill="#ffffff"></path><path d="M27.95 44s-.84-1.83-.52-2.63c.33-.8.61-2.25 1.55-2.16c1.03.1 1.17 1.69 1.17 1.69s2.72-2.49 4.83-3.33c1.13-.45 3.05-.61 3.19.28c.14.89-.52 3.43-.52 3.43L27.95 44z" fill="#ffffff"></path><path d="M24.86 40.62c-.35.64-.66 3-.09 4.69c.56 1.69 2.44 4.32 5.35 4.5s8.31-6.01 8.63-6.19c.33-.19 9.48 1.03 12.06-2.63s1.23-10.1 2.53-12.11c1.41-2.16 3.47-.75 3.47-.75s-.23-1.5-1.27-2.53c-1.03-1.03-2.49-.84-2.06-2.06c.42-1.22 3.61-.09 3.8-.99c.19-.89-1.09-1.79-2.55-2.06c-.69-.13-2.43.19-2.52-.23c-.09-.42 1.36-.47 1.41-1.45c.05-.99-3.71-.61-5.26-.42c-1.55.19-3.57 1.08-3.71.7c-.14-.38 2.53-1.78 2.44-2.25s-2.21-.89-5.35.8c-3.14 1.69-7.23 5.82-7.23 5.82l-3.1-.23s-4.32-5.11-7.09-4.46c-2.92.69-3.89 3.52-3.85 7.51s1.74 6.19 6.05 6.99c2.44.45 8.78-.22 10.09-.28c3.43-.16 4.08 1.36 4.27 2.67s-2.35 2.77-3.57 3.05s-2.86.56-4.18 1.45c-1.31.89-2.82 3.38-3.71 3.33c-.89-.05-1.08-1.6-1.55-2.53c-.43-.95-2.17-1.88-3.01-.34z" fill="#02ab47"></path><path d="M48.61 23.45c-.04.39-1.09 3.94-3.8 5.49c-2.71 1.55-5.46 1.09-6.19-1.16c-.82-2.51.56-5.1 3.84-4.65c2.96.42 6.36-1.55 6.15.32z" fill="#79da89"></path><ellipse transform="rotate(-51.325 41.611 26.215)" cx="41.61" cy="26.21" rx="2.24" ry="1.94" fill="#2f2e2f"></ellipse><path d="M24.74 21.69c-.62.56.42 1.98.49 2.79s-.31 2.28.75 2.21c1.06-.07 1.38-1.31 1.16-2.75c-.3-1.94-1.31-3.24-2.4-2.25z" fill="#2f2e2f"></path></svg>',

		'<svg width="800px" height="800px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet"><path d="M48.65 76.52s8.99-6.82 22.43-6.57c19.9.38 24.12 9.85 24.12 9.85l3.19 15.02s6.01 1.78 7.88 1.97c1.88.19 5.54 1.17 9.95-1.92c4.41-3.1 3.28-6.52 5.44-6.43c2.82.12.84 9.57-1.6 12.58c-2.44 3-13.33 8.73-17.93 9.95s-6.01 3.14-10.79 3.24c-4.79.09-16.8-3.14-16.8-3.14l-25.9-12.2V76.52z" fill="#96a820"></path><path d="M58.13 96.23s3.94-7.04 10.98-6.48s9.57 5.54 9.57 5.54l-15.58 5.07l-4.97-4.13z" fill="#70853b"></path><path d="M94.26 105.34c4.97 1.6 6.85 1.41 6.85 1.41s2.91-3.1 4.13-5.73c1.22-2.63 1.36-4.13 1.36-4.13s-1.92-.47-3.71-1.03c-1.78-.56-5.35-2.63-5.35-2.63l-4.13 11.36l.85.75z" fill="#70853b"></path><path d="M50.62 5.71c14.64.7 27.28 13.75 22.95 30.83c-3.24 12.76-14.51 29.64-17.32 33.97c-5.16 7.98-10.7 23.46 4.83 25.11c22.21 2.35 5.81-9.83 16.67-17.34c5.7-3.94 12.19-2.7 16.37.3c5.45 3.92 20.62 46.06-34.91 43.13c-11.54-.61-20.71-6.97-25.76-11.83c-14.95-14.36-3.48-38.3-2.53-40.4C32.18 66.67 44 51.32 43.16 46.4c-.84-4.93-4.93-3.66-10.56-5.63c-5.63-1.97-11.88-8.2-10.14-16.75c1.62-7.96 7.76-19.29 28.16-18.31z" fill="#bed04a"></path><path d="M92.15 114.46s2.72-2.46 3.66-3.21s5.3-4.5 5.3-4.5s6.93-.25 11.73-2.25c5.96-2.49 9.43-8.73 9.9-10.93c.25-1.19-.61 10.7-9.15 16.47c-8.25 5.57-21.44 4.42-21.44 4.42z" fill="#e4dda2"></path><path d="M22.53 86.87c-.33 12.53 9.91 25.73 18.79 29.28c4.93 1.97-15.77-7.67-14.08-28.23c1.34-16.35 17.81-30.27 18.16-39.56c.21-5.63-6.76-6.12-6.76-6.12s2.16 1.62 2.25 3.73c.14 3.38-8.59 15.77-10.42 18.3c-1.81 2.54-7.65 11.9-7.94 22.6z" fill="#e4dda2"></path><path d="M25 30.07l4.32 4.69c.21-.29-4.72 4.71-9.29 8.07c-3.06 2.25-12.48 7.07-12.98 6.59c-.63-.61 2.28-2.53 3.87-3.94c1.21-1.07 4.22-3.78 4.22-3.78s-3.71.4-5.49.4s-6.33.14-5.91-.7c.33-.66 6.88-1.7 9.34-2.7c7.41-3 11.92-8.63 11.92-8.63z" fill="#ee6d33"></path><path d="M42.88 15.21c-2.57 1.79-5.07 1.34-5.88-.16c-.6-1.12-.77-3.24 1.6-5.03c2.09-1.58 4.77-1.1 5.75.26c.82 1.15.48 3.58-1.47 4.93z" fill="#323234"></path><path d="M54.91 26.87c-3.07 1.8-5.56.87-6.62-.76c-.86-1.33-.66-4.53 1.83-5.97c2.58-1.5 5.44-.96 6.54.83c.92 1.5.59 4.53-1.75 5.9z" fill="#323234"></path><path d="M66.67 43.49c-1.83 4.25 1.83 6.22 1.83 6.22s1.43-3.05 2.04-4.43c.75-1.71 1.48-3.84 1.48-3.84s-3.89-1.35-5.35 2.05z" fill="#e4dda2"></path><path d="M64.84 56.46s-2.53-.28-4.79-1.06c-2.05-.71-5.5-3.6-7.6.14c-1.94 3.45 1.31 5.35 3.87 6.41c2.39.99 4.54 1.34 4.54 1.34s1.64-2.75 2.11-3.52s1.87-3.31 1.87-3.31z" fill="#e4dda2"></path><path d="M56.25 70.52s-3.38-.19-5.56-.75c-1.91-.49-5.4-2.82-7.32.21c-1.71 2.7.77 4.84 4.08 5.7c3.66.95 5.77.67 5.77.67s.88-1.79 1.23-2.78c.37-1.01 1.8-3.05 1.8-3.05z" fill="#e4dda2"></path><path d="M51.02 83.37s-4.08.56-6.05.56c-2.04 0-7.2-.48-7.09 4.27c.09 4.08 5.62 3.74 7.04 3.71c2.02-.05 7.29-1 7.29-1s-.9-1.6-1.16-3.84c-.2-1.64-.03-3.7-.03-3.7z" fill="#e4dda2"></path><path d="M55.12 93.84s-.66 2.97-1.62 5.14c-1.06 2.39-3.52 6.48 1.48 8.38c4.62 1.76 6.48-1.55 7.32-5.28c.78-3.47.84-6.3.84-6.3s-2.44-.11-4.46-.57c-1.62-.39-3.56-1.37-3.56-1.37z" fill="#e4dda2"></path><path d="M70.82 95.27s3.31 2.89 4.36 4.36c1.06 1.48 3.47 5.94 7.32 4.01c3.38-1.69.65-6.85-.99-8.73c-1.37-1.57-3.45-3.28-5.42-4.41c-1.32-.75-2.44-.94-2.44-.94s.23 2.06-.38 3.52c-.64 1.57-2.45 2.19-2.45 2.19z" fill="#e4dda2"></path><path d="M75.19 85.53c.34 1.16 1.35 1.21 3.59.28c2.39-.99 5.63-1.48 8.31-1.48c3.17 0 6.26 2.11 7.39 3.03s2.49 1.24 2.7-.52c.21-1.76-1.06-3.73-3.52-5.49c-1.5-1.07-4.18-2.72-7.34-2.79c-3.37-.07-6.48 1.13-8.45 2.39c-1.22.79-3.25 2.68-2.68 4.58z" fill="#e4dda2"></path></svg>',

		'<svg width="800px" height="800px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet"><path d="M17.75 18.55S14.57 11.4 12.49 12s-.3 10.03-.3 10.03l5.56-3.48z" fill="#feaf5f"></path><path d="M101.65 56.28s3.77-1.29 6.45 2.38s1.6 7.93 5.19 12.87c2.26 3.1 5.07 2.26 7.99 1.42c2.99-.85 5.26-.94 5.36.99c.03.58-.73 4.22-3.97 7.55c-3.57 3.67-8.39 6.25-15.58 3.43c-6.58-2.58-8.42-11.17-8.42-11.17l2.98-17.47z" fill="#865b52"></path><path d="M58.46 44.66s7.8-4.65 6.25-9.23c-1.64-4.85-7.64-.69-8.94-2.28c-1.43-1.76 5.86-6.16 1.69-10.72s-8.61 1.9-10.13.1c-1.49-1.77 3.47-5.56.3-9.43s-8.54-.2-10.13.99c-1.17.88-3.38 2.48-6.16 3.08c-2.78.6-7.25-1.09-11.12-1.09s-9.63 2.58-10.82 7.64s-1.89 7.45-2.78 7.84s-3.38 0-3.47 1.79s2.38 2.28 5.76 2.08s8.14-2.58 10.13-5.06s3.67-6.25 3.67-6.25l35.75 20.54z" fill="#865b52"></path><linearGradient id="IconifyId17ecdb2904d178eab9182" gradientUnits="userSpaceOnUse" x1="23.86" y1="70.782" x2="19.916" y2="102.334"><stop offset=".306" stop-color="#b3875d"></stop><stop offset=".567" stop-color="#a87c5b"></stop><stop offset=".926" stop-color="#916656"></stop></linearGradient><path d="M30.56 70.38s-5.26 3.28-7.94 4.07c-2.68.79-6.25-.3-8.74 2.18c-2.48 2.48-1.09 4.77-2.08 7.25c-.99 2.48-4.85 6.23-4.47 9.93c.5 4.86 4.72 7.2 4.72 7.2s4.02-3.82 3.92-7.4s-.1-5.26.4-6.95s2.48-4.67 3.97-5.16c1.49-.5 6.85-.3 9.23-.4s6.85-.5 6.85-.5l-5.86-10.22z" fill="url(#IconifyId17ecdb2904d178eab9182)"></path><linearGradient id="IconifyId17ecdb2904d178eab9183" gradientUnits="userSpaceOnUse" x1="76.399" y1="58.587" x2="72.263" y2="104.09"><stop offset=".476" stop-color="#b3875d"></stop><stop offset=".735" stop-color="#a4785a"></stop><stop offset=".985" stop-color="#916656"></stop></linearGradient><path d="M87.05 59.56L62.63 80.8l-1.27 4.69s3.95-.67 5.24-1.07s3.13-.84 3.13-.84s.63.83 1.04 2.88c.5 2.48.4 4.07.2 4.37c-.55.82-4.37 2.38-5.86 2.48s-5.26-.53-7.05 2.28c-1.39 2.18-.66 3.15-.79 3.67c-.2.79-1.84 1.24-1.24 2.73s8.09.65 8.09.65s.47-2.02.89-2.08c1.04-.15 2.78-.6 3.87-1.99s9.53-1.99 10.42-3.77c1.29-2.58-.2-5.96-.3-9.13s-.1-5.91.15-6.45c2.88-1.69 6.7-5.26 6.7-5.26l6.85-12.01l-5.65-2.39z" fill="url(#IconifyId17ecdb2904d178eab9183)"></path><path fill="#b3875d" d="M28.97 47.94l2.76 5.31l13.43-10.67l-12.32-10.62l-5.36 9.03z"></path><path d="M31.06 51.91c.3 1.04.69 2.38.89 3.57c.2 1.19.3 2.98.3 2.98s-3.92 2.28-4.47 5.96c-.51 3.45.12 9.11 1.71 11.99c1.59 2.88 4.1 5.14 6.7 6.03c2.82.97 6.24 2.85 12.81 3.43c4.57.4 10.92 1.29 18.76-2.68c7.84-3.97 14.22-13.6 15.31-15.59s3.28-5.16 4.37-4.27c1.09.89-1.99 2.98-2.78 7.05c-.79 4.07.26 8.97 6.06 10.72c6.16 1.86 14.12-1.19 15.61-12.81s-5.29-19.73-11.54-22.93c-4.86-2.49-10.24-2.7-13.48-1.79c-1.76.5-3.3 1.89-4.84 2.38c-1.26.41-6.75.58-9.68.4c-3.43-.21-2.66-1.5-5.73-3.49c-3.08-1.99-4.02-1.41-5.19-2.57c-1.51-1.49-7.48-10.22-15.69-15.69c-7.15-4.77-11.17-5.11-11.17-5.11s.67-1.94.2-5.01c-.3-1.94-1.99-5.21-3.08-5.31c-1.04-.1-2.94 2.72-3.43 5.36c-.6 3.23.3 5.36.3 5.36s-.22 6.55-3.95 11.02s11.91 2.23 14.07 3.2c2.16.97 3.86 5.58 3.57 9.61c-.35 5.21-5.71 7.93-5.63 8.19z" fill="#feaf5f"></path><linearGradient id="IconifyId17ecdb2904d178eab9184" gradientUnits="userSpaceOnUse" x1="41.299" y1="112.112" x2="45.998" y2="70.491"><stop offset="0" stop-color="#865b52"></stop><stop offset=".545" stop-color="#feaf5f"></stop></linearGradient><path d="M41.63 82.07s-.74 2.01-1.12 2.31c-.37.3-2.83 3.05-3.95 4.17s-2.53 2.66-3.13 3.18s-3.11 1.89-2.98 4.49c.2 4 2.18 4.39 2.61 6.48c.35 1.73.7 4.15 1.86 6.03c1.34 2.16 3.23 3.3 6.21 3.3s4.74-5.98 4.74-5.98s-2.61-3.72-3.8-3.5c-1.19.22-1.39 1.39-2.08.97c-.81-.49-1.07-2.28-1.29-3.25c-.22-.97-.82-2.13-.45-2.58c.37-.45 4.16-2.44 6.13-3.77c3.3-2.23 11.91-8.94 11.91-8.94s5.97-15.45-5.88-13.55c-10.19 1.63-8.78 10.64-8.78 10.64z" fill="url(#IconifyId17ecdb2904d178eab9184)"></path><linearGradient id="IconifyId17ecdb2904d178eab9185" gradientUnits="userSpaceOnUse" x1="62.057" y1="118.415" x2="96.687" y2="68.959"><stop offset="0" stop-color="#865b52"></stop><stop offset=".136" stop-color="#9f6c55"></stop><stop offset=".421" stop-color="#dd985b"></stop><stop offset=".56" stop-color="#feaf5f"></stop></linearGradient><path d="M95.89 59.36c-2.92-.49-10.97 3.8-11.81 14.84c-.45 5.91-1.27 10.7-1.64 12.26c-.37 1.56-1.04 3.65-1.41 3.95c-.37.3-2.5 1.72-4.19 4.19c-1.74 2.53-1.24 5.19-1.76 5.93s-2.51 2.41-4.19 4.1c-1.14 1.14-4.96.97-6.45 2.68c-1.49 1.71-1.27 3.57-1.27 3.57s-2.88.74-3.7 2.68c-.82 1.94 1.09 4.39 2.73 4.62s5.17.81 5.51.45c1.09-1.19.3-3.72.3-3.72s1.64 0 3.13-2.01s3.5-3.28 5.21-4.69s8.09-6.04 9.31-8.27c1.61-2.95 1.04-5.73 2.16-7.52c1.12-1.79 3.3-3.7 7.4-7.05c3.28-2.68 7.09-5.04 9.78-11.67c3.84-9.53-7.32-14.04-9.11-14.34z" fill="url(#IconifyId17ecdb2904d178eab9185)"></path><radialGradient id="IconifyId17ecdb2904d178eab9186" cx="-.117" cy="70.576" r="51.661" gradientUnits="userSpaceOnUse"><stop offset=".226" stop-color="#865b52"></stop><stop offset=".285" stop-color="#895d52"></stop><stop offset=".336" stop-color="#946554"></stop><stop offset=".385" stop-color="#a67255"></stop><stop offset=".432" stop-color="#c08358"></stop><stop offset=".477" stop-color="#e09a5c"></stop><stop offset=".512" stop-color="#feaf5f"></stop></radialGradient><path d="M33.96 33.37c-1.19.45-2.01.37-1.94 1.34c.07.97 2.98 3.35 2.23 7.89s-3.65 7-6.33 7.89s-5.56.77-5.56.77l-3.82 4.37s.25 3.62-2.18 5.26c-1.8 1.21-2.88.84-2.88.84s-1.6 1.37-3.43.79c-2.38-.74-6.55-3.72-6.11-10.18c.41-5.94 4.82-9.61 5.81-11.86c.46-1.06.25-5.16.25-5.16s5.76-1.39 8.64-4.72c2.05-2.37 3.82-5.86 3.92-7.3c.1-1.44 16.93 5.06 16.93 5.06l-5.53 5.01z" fill="url(#IconifyId17ecdb2904d178eab9186)"></path><path d="M22.89 35.24c.74 1.37.16 3-1.03 3.65c-.98.54-3.05-.06-3.58-1.4c-.62-1.58-.26-2.87.94-3.52c1.2-.64 2.93-.1 3.67 1.27z" fill="#2f2927"></path><path d="M6.98 53.55c-.82.78-.74 2.33.15 3.87s1.94 2.28 2.93 1.64s.55-2.53-.1-4.02s-2.13-2.28-2.98-1.49z" fill="#523226"></path><path d="M14.42 55.34c0-.3-1.49-2.87.22-3.8c1.13-.61 2.38.3 2.27 1.86c-.11 1.5-.78 2.05-.78 2.05s.15.78-.41 3.61c-.42 2.15-1.23 2.42-1.75 2.83c-.39.31-2.35.97-2.05.48c.3-.48 1.79-2.31 2.12-3.98c.25-1.24.38-3.05.38-3.05z" fill="#523226"></path><path d="M15.94 93.83s-1.17 2.2-1.86 3.4c-.97 1.68-2.68 3.23-2.68 3.23s1.9 2.72 4.24 3.69c2.35.97 3.24-3.16 2.94-6.63c-.15-1.75-.52-2.83-1.23-3.39c-.43-.34-1.41-.3-1.41-.3z" fill="#6b4733"></path><path d="M41.33 102.89c.74 1.29 1.52 3.1 1.41 4.86c-.15 2.57-1.82 4.28-1.82 4.28s2.02.61 5.08.48c2.08-.09 3.34-.56 3.67-1.15c.34-.6-.34-3.76-1.94-6.29s-2.94-2.77-3.72-3.02c-1.14-.35-2.68.84-2.68.84z" fill="#6b4733"></path><path d="M60.36 101.99c-2.23-.07-4.47-.74-4.47-.74s-.48 1.45-.63 3.61c-.15 2.08-.26 3.83.6 4.13c.86.3 3.24-.19 5.66-1.82c1.26-.85 2.42-2.68 2.64-3.16c.22-.48.22-2.08.22-2.08s-2.23.12-4.02.06z" fill="#6b4733"></path><path d="M60.13 112.63c-.56.26-1.49 1.97-2.23 3.13c-.74 1.15-1.63 2.81-1.56 3.35c.11.89 1.34 1.45 4.88 1.38c3.54-.07 5.73-1.19 5.99-1.34c.26-.15.67-.82.67-.82s-1.3-1.75-3.65-3.5c-2.35-1.75-4.1-2.2-4.1-2.2z" fill="#6b4733"></path><path d="M39.79 83.78s-1.24-1.17-1.96-2.31c-1.04-1.64-1.41-2.76-1.71-5.29c-.21-1.76.97-5.05-1.45-5.31c-1.82-.2-2.76.87-2.57 4.12c.15 2.67 1.71 5.81 2.01 6.18c.3.37.91.97 2.49 1.71s3.19.9 3.19.9z" fill="#b3875d"></path></svg>',

		'<svg width="800px" height="800px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet"><path d="M66.67 49.49s5.07-2.25 9.57-3.1c4.5-.84 8.17-.7 8.17-.7s3.94-5.77 4.5-8.87s.63-5.98.7-6.48c.17-1.2 8.17-1.27 9.85 3.52c1.69 4.79-.42 10.56-1.83 12.67s-2.96 3.66-2.96 3.66s6.9 6.48 8.45 13.66s1.13 17.74 1.13 17.74s-.42 8.02-4.36 8.59c-3.94.56-8.73-3.03-9.43-3.87c-.7-.84-2.06-3.21-4.36-2.46c-2.6.84-3.27 3.84-3.8 6.48c-.66 3.24-1.64 11.5-1.64 11.5s-4.69 1.88-7.51 1.45c-2.82-.42-6.34-3.8-6.34-3.8s.28-4.22-1.13-5.07s-2.82 1.55-2.82 1.55l-5.63 6.19l-7.74-6.34s-.56-2.82-1.41-4.22c-.84-1.41-2.53-4.5-3.1-6.62c-1.4-5.21-.98-15.2-.98-15.2l-8.59-41.95l2.11-1.97s1.97-10.14 5.07-14.5s5.63-5.49 7.32-6.34s6.9-1.41 6.9 0s-2.39 3.24-3.8 5.49s-2.96 5.49-3.8 8.31S47.43 25 47.43 25l3.05.7s1.69-4.08 3.24-6.19c1.55-2.11 3.73-5 6.41-7.04c2.27-1.73 5.42-3.52 8.94-3.52c3.52 0 8.17.99 7.74 3.59c-.23 1.42-2.89.77-5.56 2.53c-3.25 2.14-6.76 5.7-9.36 11.68s-3.52 8.59-3.52 8.59s6.83 6.41 7.53 8.59s.77 5.56.77 5.56z" fill="#b68859"></path><path d="M35.7 70.14s5.73 3.62 8.26 3.75c3.89.21 9.62-2.09 13.21-6.03s6.55-9.68 6.03-16.68c-.45-6.03-2.51-8.24-2.51-8.24s3.59 3.52 8.8 3.1c5.21-.42 9.43-3.59 11.05-6.76c1.28-2.5 2.46-5.56 1.69-6.12c-.77-.56-3.36 0-3.36 0l-9.81 4.43l-16.82 1.13l-17.6 25.13l1.06 6.29z" fill="#6d4938"></path><path d="M22.18 30.16c-.7.48.35 3.66 2.82 5.56s5.98 2.46 5.98 2.46l5.21-7.11s-12.67-1.83-14.01-.91z" fill="#6d4938"></path><path d="M66.76 97.97s2.86 2.63 6.87 2.28c4.01-.35 7.63-2.93 7.63-2.93s-.8 8.21-.87 9.76c-.07 1.55-.21 6.1-.21 6.1s-5.07 5.44-7.81 4.95c-2.75-.49-6.57-5.3-6.5-6.22c.07-.92.66-5.04.8-7.16c.14-2.11.09-6.78.09-6.78z" fill="#855b52"></path><path d="M56.32 96.72c4.29-.3 7.53-1.95 7.53-1.95s.23 6.01.14 7.6c-.16 2.78-.38 6.1-.66 6.95c-.28.84-9.41 2.04-9.41 2.04s-4.43-3.94-4.43-4.15c0-.21.23-3.21.33-5.44c.07-1.62-.42-6.66-.42-6.66s2.84 1.9 6.92 1.61z" fill="#855b52"></path><path d="M90.04 85.77s3.03.33 5.07.12c2.04-.21 6.26-1.76 7.32-2.46c1.06-.7 1.83-1.83 1.83-1.83s-.42 8.73-.35 10.42c.07 1.69.07 5.7.07 5.7s-3.31 5.35-6.83 5.7c-3.52.35-7.11-6.15-7.11-6.15s.52-3.43.52-5.54c-.01-2.11-.52-5.96-.52-5.96z" fill="#855b52"></path><path d="M72.25 114.39c3.72.33 8-1.69 8-1.69s.35 6.41-.63 8.26c-.84 1.6-3.43 3.33-9.78 2.3c-4.12-.67-4.62-3.11-4.86-4.65c-.23-1.55.84-6.9.84-6.9s1.72 2.26 6.43 2.68z" fill="#46484a"></path><path d="M97.08 99.38c2.96-.1 6.9-1.67 6.9-1.67s.21 6.26-2.18 8.45c-2.75 2.51-9.27 1.74-11.1-.31c-1.83-2.04-.66-8.78-.66-8.78s3.02 2.45 7.04 2.31z" fill="#46484a"></path><path d="M55.97 108.69c3.46.14 7.65-1.1 7.65-1.1s.52 7.56-3 8.87c-3.74 1.4-8.63 1.08-10.56-1.36c-1.39-1.76-.63-8.17-.63-8.17s2.95 1.62 6.54 1.76z" fill="#46484a"></path><path d="M39.71 32.88c.69.41 2.11-3.87 11.19-3.8c10 .07 15.27 4.93 16.05 5c.77.07 6.12 0 7.81-.14c1.69-.14 4.65-1.48 4.58-.49s-1.2 6.41-6.19 7.81c-5 1.41-13.44-1.62-15.06-1.76c-1.62-.14-3.03 0-2.89 2.46c.14 2.46-18.37 13.59-18.37 13.59s-13.54-6.31-13.75-7.09c-.21-.77 1.31-2.82 2.56-4.74c1.58-2.44 2.39-5.14 3.24-6.55c.84-1.41 2.18-3.24 2.18-3.24s-2.63.21-4.36-.54c-1.19-.51-4.15-2.49-4.29-3.19s3.31.07 6.12-.21c2.82-.28 8.09-3.24 8.09-3.24s1.76 1.41 2.25 2.75s.49 3.17.84 3.38z" fill="#855b52"></path><path d="M27.53 66.18s-.81 3.1-.33 6.48c.38 2.65 2.37 5.21 2.72 6.12s.99 3.03.92 3.73c-.07.7.89.87 1.1.35c.26-.63-.02-1.51.7-1.34c.8.19 0 1.74 1.03 1.78c1.08.05.35-1.41 1.13-1.41c.82 0 .09 1.67 1.27 1.64c1.08-.02.07-1.48 1.1-1.45c.84.02.14 1.55 1.31 1.38c.66-.09-.11-1.66.75-1.85c.75-.16.35 1.41 1.22 1.08c.56-.21.75-1.67.54-3.36c-.21-1.69-.84-4.08-1.2-6.01c-.35-1.92-.75-3.97-.77-5.8s-.05-3.97-.05-3.97l-11.44 2.63z" fill="#46484a"></path><path d="M40.44 50.01c.55.05 2.63-2.25 3.57-3.89s3.43-5.26 7.09-5.68c3.76-.43 5.96 1.55 6.85 4.65c.82 2.86.05 6.15-3.71 7.93c-3.62 1.72-5.02 1.03-8.07 1.92c-1.62.47-4.13 1.88-4.27 2.06c-.14.19.83 6.93-4.5 9.85c-4.46 2.44-11.31 1.5-14.83-2.91c-3.86-4.84-3.14-12.11-.28-15.63c2.83-3.48 6.24-4.75 11.26-3.28c5.62 1.65 6.37 4.93 6.89 4.98z" fill="#fff3dd"></path><path d="M55.22 47.57c0 2.06-1.31 3.94-3.89 3.99c-2.21.04-3.07-1.79-3.14-3.85c-.09-2.63 1.79-3.95 3.66-3.99c2.43-.05 3.37 1.79 3.37 3.85z" fill="#2e2e2e"></path><path d="M25.42 52.77s3.66-2.01 4.12-2.25s1.65-.67 2.29.32c.63.99-.39 1.87-1.2 2.22c-.81.35-4.22 2.43-4.22 2.43s-.39 2.57-.04 2.85c.94.75 2.36 1.16 3.52 1.06c1.16-.11 2.08-.6 2.43-.67c.35-.07 1.34-.11 1.55.6c.21.7-.29 1.52-1.16 1.94c-1.04.49-2.08 1.01-3.84.7c-1.37-.24-2.46-.56-3.1-.99c-.63-.42-1.3-1.2-1.3-1.2s-.95 1.16-1.83 1.13c-.88-.04-2.01-.6-2.04-.7c-.04-.11-1.2-1.02-.67-2.01c.53-.99 1.72.35 2.46.46c.74.11 1.2-.39 1.27-.63c.07-.25.04-2.99.04-2.99s-1.58-2.04-1.94-2.39c-.35-.35-1.27-1.51-.32-2.22s1.58 0 1.83.21s2.15 2.13 2.15 2.13z" fill="#2e2e2e"></path></svg>',

		'<svg width="800px" height="800px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet"><path d="M71.45 84.59L62.06 67.6l-23.18 8.87s-1.13 1.45-.89 3.99c.1 1.13.61 4.32.61 4.32l-4.32.66s-6.19 5.16-4.22 13.23c1.5 6.13 3.1 9.39 3.1 9.39l-.84 6.01s13.8 6 27.22 5.63c17.18-.47 23.65-9.57 23.65-9.57L78.5 88.92l-7.05-4.33z" fill="#845a54"></path><path d="M31.66 86.57c-1.99 1.87-2.32 4.83-2.16 5.87c.38 2.44 4.13 9.15 8.26 8.87c4.13-.28 2.16-8.54.84-11.54s-3.75-6.21-6.94-3.2z" fill="#b5885e"></path><path d="M20.49 118.94c-.14 2.05 2.16 1.97 6.48 1.97s14.73-.75 14.73-.75l-.84-5.73s-2.61.18-6.19-1.78c-1.45-.8-1.92-1.83-1.92-1.83s-11.98 4-12.26 8.12z" fill="#b5885e"></path><path d="M51.61 80.46s-4.6-.18-8.03 3.81c-2.18 2.53-6.66 14.69-3.38 16.38c3.28 1.69 5.53-4.27 6.76-7.04c1.13-2.53 3.19-5.44 4.97-6.38c1.78-.94 3.28-1.97 3.28-1.97l-3.6-4.8z" fill="#ffcd88"></path><path d="M43.96 113.31s-1.6 0-3.19.56c-1.6.56-10.51 4.88-10.42 7.23c.09 2.35 5.54 2.35 12.29 2.25c6.76-.09 8.54-1.41 9.1-1.97c.56-.56 2.72-3.47 1.97-3.85c-.74-.37-9.75-4.22-9.75-4.22z" fill="#ffcd88"></path><path d="M69.01 70.23s5.26-4.6 7.32-9.01c2.06-4.41 1.97-8.63 1.97-8.63s9.97-2.63 7.46-14.96c-2.12-10.44-10.56-8.22-10.56-8.22s-5.73-11.92-21.12-15.2s-28.87 4.32-34.54 12.01c-6.57 8.92-5.44 20.37-5.44 20.37s-5.07-.47-7.41 4.04C4.26 55.3 5.09 62.92 9.6 66.4c4.5 3.47 11.54 2.53 11.54 2.53s4.88 5.26 10.51 7.6c5.78 2.41 11.26 2.72 17.93 2.06s12.01-4.13 12.01-4.13s-.28 1.88.94 4.32c.76 1.51 3.38 4.41 3.38 4.41s-4.27-2.25-7.7-2.86c-3.72-.66-6.1-.42-7.51.42c-1.07.64.31 5.73 1.88 6.01c1.6.28 4.22-.47 8.82 1.31c4.6 1.78 10.51 6.01 12.01 6.95c1.5.94 4.55 2.53 4.79 4.6c.18 1.59-2.39 3.66-6.9-.94c-4.32-4.41-8.49-8.63-13.19-9.2c-4.69-.56-7.6.66-9.76 5.35c-2.77 6.03-5.07 13.33-5.54 15.2c-.47 1.88-1.78 2.91-.75 4.69c.72 1.24 8.67 5.87 10.51 5.73c2.35-.19 4.22-4.97 4.79-5.82c.56-.84 1.78-2.63 1.78-2.63s4.13 9.76 12.86 8.92s9.95-6.29 9.95-6.29s6.79.34 13.98-1.71c9.64-2.75 16.23-11.56 18.3-25.69c1.5-10.23-.38-25.15-5.16-37.64c-1.76-4.58-3.83-10.01-5.16-13.8c-3.41-9.66-4.6-16.64.94-18.68c2.82-1.04 4.63.19 5.45 1.8c1.12 2.21 1.31 4.95 4.87 6.36c2.54 1 5.73.19 7.13-2.16c1.76-2.94 1.14-7.24-2.63-12.11c-6.48-8.35-17.27-7.56-23.18-3.1c-6.32 4.76-9.01 11.1-5.91 22.99c2.91 11.17 9.31 25.39 10.7 32.29c1.88 9.29 3.58 32.13-7.98 36.79c-5.35 2.16-9.29 1.31-9.29 1.31s-.94-10.68-4.32-18.4c-3.85-8.81-10.68-12.65-10.68-12.65z" fill="#b5885d"></path><path d="M71.36 35.28c-.16.2.91 3.13 1.31 6.19c.45 3.39.59 6.67.88 6.77c.56.19 8.88-1.89 7.85-9.59s-9.66-3.84-10.04-3.37z" fill="#ffcf8c"></path><path d="M14.58 51.28c-.74-.56-5.55.79-4.97 6.29c.75 7.13 7.79 7.13 8.45 6.66c.34-.24-1-3.49-1.88-6.66c-.85-3.05-1.23-6.02-1.6-6.29z" fill="#ffcf8c"></path><path d="M41.23 36.35c-4.5 1.5-10.79-5.73-16.24 0c-6.67 7.01 1.26 13.31 1.88 18.21c.38 3-1.31 5.26.38 10.32c1.41 4.22 9.24 10.5 23.48 7.61c13.33-2.71 16.46-11.15 16.11-16.46c-.39-5.92-3.17-6.26-3.73-9.26s2.59-14.82-6.57-17.27c-9.49-2.53-10.46 5.24-15.31 6.85z" fill="#ffcf8c"></path><path d="M56.88 43.58c.56 3.38.21 5.63-2.18 6.19c-2.86.67-4.72-1.27-5.28-4.72c-.69-4.21.16-6.19 2.35-6.6c2.7-.5 4.41.88 5.11 5.13z" fill="#000504"></path><path d="M37.88 46.89c.64 3.22.75 6.1-1.83 6.76c-2.47.63-4.52-.95-5.42-4.43c-1.06-4.08-.71-6.44 1.62-7.11c2.4-.7 4.64-.22 5.63 4.78z" fill="#000504"></path><path d="M41.26 52.53c.06 1.62 2.81 3.58 4.42 3.33c1.74-.28 3.38-3.72 2.81-4.74c-.74-1.32-7.28-.07-7.23 1.41z" fill="#000504"></path><path d="M34.68 62.87c.28 2.25 5.07 5.65 13.8 3.94c9.01-1.76 10.35-7.25 10.21-8.59c-.14-1.34-4.72-2.04-12.53-.7c-6.13 1.05-11.71 3.55-11.48 5.35z" fill="#ff6b19"></path></svg>',

		'<svg width="800px" height="800px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet"><path d="M9.7 23.4c1.6 2.7 3.4 3 4.7 1.5c2-2.4-.2-5.5-2.5-6.3c-3.9-1.5-7.3 3-7.3 3s3.7-.5 5.1 1.8" fill="#f29a2e"></path><path d="M55.6 15c-9.1-5.5-19.8-1.2-21.9 9.3c-.5 2.6-1.3 12.4 5.8 9.1c.3.8 1 1.5 1.9 2.3c2.4 1.9 1.1 7 1.1 7s7.2-3.4 4.4-11.6c4.1 0 7 7.3 7 7.3s2.8-7 .8-13.3c3.7-.4 7.2 5 7.2 5s1.8-10.2-6.3-15.1" fill="#e24b4b"></path><g fill="#f4bc58"><path d="M32.1 62h-13c0-1.1 7.6-1.3 7.9-8.8c1.3 8.4 5.1 7.7 5.1 8.8"></path><path d="M19.3 58.1l-8-9.6c.6-.7 5.4 4.8 9.5.4c-3.7 6.1-1 8.5-1.5 9.2"></path></g><g fill="#947151"><path d="M41.4 33.4c0 10.4-7.1 18.8-16 18.8c-8.8 0-16-8.4-16-18.8c0-6.9 1.3-22 6.2-22c15.3 0-3.9 19.9 9.7 19.9c9 0 16.1-8.3 16.1 2.1"></path><path d="M32.7 50.1c0 2.2-3 6.8-5.6 6.8s-5.6-3.1-5.6-5.3c0-2.1 11.2-2.5 11.2-1.5"></path></g><path d="M38.8 31.4C38.6 36 30.7 43 26.3 43s-8-3.7-8-8.2c0-7.6 3.8-3.9 8.2-3.9c4.4 0 12.8-6.8 12.3.5" fill="#3e4347"></path><path d="M8.7 28.9l.6 10.9l2.5-3.1l2.9 3.6l.6-5l4.5 3.3l-.8-4.8l5.4.6l-2.5-3l3.7-2.5s-4.5 1-4.4-1.8c.1-2.8 3-11 1.1-13.4c-1.9-2.4-10.1 0-10.1 0L8.7 28.9" fill="#f4bc58"></path><ellipse cx="8.7" cy="19.5" rx=".6" ry=".3" fill="#3e4347"></ellipse><ellipse cx="14.6" cy="19.9" rx="4.3" ry="4.2" fill="#e24b4b"></ellipse><ellipse cx="14.3" cy="19.5" rx="2.1" ry="1.6" fill="#3e4347"></ellipse><g fill="#e24b4b"><path d="M9.5 34.3c.3 3.9-2.5 5.7-4.6 5.5c-3.4-.3-3.4-5.2-1.9-8.1c2.6-5 9-15.3 9-15.3S9.2 30.8 9.5 34.3"></path><path d="M23.2 13.1v-1.7C23 8 26.6 4.9 26.6 4.9s-6-.9-8.6 4.2c-.3.6-.5 1.3-.7 2c-.1-.5-.3-1-.5-1.6C15.7 6.4 18.3 2 18.3 2s-5.9 1.5-6.9 7.3c-.2 1.2-.2 2.5.1 3.7l-.3-.3c-1.9-1.8-1.4-6.2-1.4-6.2S5.9 10.3 7 15.1c.6 2.8 3.1 5.5 5.2 3.2c.6-.7 2.2-1.8 3.2-2.1c.7-.2 2.5-.1 3.6.8c1 .9 1.8 2.4 3.3 2.4c6.4.3 7.6-8.9 7.6-8.9s-3.3 1.7-6.7 2.6"></path></g></svg>',

		'<svg width="800px" height="800px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#D99E82" d="M31.034 14.374c3.508-.65 3.587-6.297-.051-6.254c-2.847.034-2.56 2.795-2.945 2.252c-.748-1.055-.989-3.769 1.862-4.894c2.461-.971 5.846.996 6.063 4.591c.139 2.302-1.297 6.554-6.453 5.846c-7.222-.991-1.983-.892 1.524-1.541z"></path><path fill="#C1694F" d="M10.321 21.935s1.016 2.352.676 8.242c-.061 1.057-.209 2.136-.242 3.022c-1.812 0-1.652 2.064-1.268 2.064h2.902c.683 0 1.893-3.438 2.212-8.209c.319-4.772-4.28-5.119-4.28-5.119zm11.89-.331s.575 3.528 3.651 6.413c.257 1.163.769 4.232.949 5.195c-1.889 0-1.282 2.047-.731 2.047h2.646c.951 0 1.092-3.442.206-7.694c-.885-4.251-6.721-5.961-6.721-5.961z"></path><path fill="#D99E82" d="M32.202 15.654c-1.253-3.752-7.214-3.628-13.997-2.765c-3.055.389-3.64-4.453-3.64-5.286c0-3.626-3.244-5.455-6.496-4.229c-.779.293-1.402 1.33-1.754 1.872c-1.977 3.037-4.658.015-4.917 2.822c-.313 3.395 1.721 4.534 5.051 4.821c1.892.163 3.459 1.095 3.871 5.044c.154 1.472-.295 5.644 2.388 7.076c.78 2.959 1.836 6.615 2.25 8.475c-2.252.476-1.341 2.179-1.341 2.179s3.151-.043 3.836-.043c.814 0 .191-5.976-.935-9.787c4.764.043 7.828-1.337 8.799-1.762c1.028 2.96 4.152 3.633 4.851 4.892c.433.78 1.878 3.383 2.001 4.496c-1.602.52-1.091 1.732-.909 2.122c1.083-.043 3.22-.043 3.498-.043c1.11 0-1.137-6.904-2.083-8.713c-1.082-2.071.781-7.419-.473-11.171z"></path><path fill="#F4C7B5" d="M16.266 24.464c.044.371.141.891.253 1.369c4.764.043 7.828-1.337 8.799-1.762c-.215-.78-.23-1.27-.171-1.538c-3.394.557-4.548 2.205-8.881 1.931zM6.449 12.889c1.892.163 2.425 1.069 2.838 5.018c.154 1.472.739 5.67 3.421 7.102c-.72-2.788-1.959-12.388-6.259-12.12z"></path><path fill="#F4C7B5" d="M3.153 6.665c-2.793 0-1.909.526-2.002 1.692c-.093 1.166-.074 2.976.776 3.929c1.127 1.262 3.858 1.266 5.215.277s-.424-5.898-3.989-5.898z"></path><path fill="#272B2B" d="M2.503 8.326c-.109.762-.494 1.192-.879 1.133C.864 9.342.232 8.372.232 7.603s.624-.963 1.392-.928c1.043.048 1.002.788.879 1.651z"></path><path fill="#662113" d="M15.167 9.026c.348 2.515-1.157 2.898-2.383 2.898s-3.054-1.25-2.748-3.77c.134-1.107.555-2.193.809-3.175c.336-1.303 1.199-1.732 1.894-1.367c1.665.874 2.203 3.797 2.428 5.414z"></path><circle fill="#292F33" cx="8.069" cy="6.675" r=".928"></circle><path fill="#C1694F" d="M19.035 12.789c.073 1.532.906 3.178 2.733 3.663c1.901.505 4.12.127 4.67-2.475c.091-.43.13-1.224.073-1.514c-2.151-.179-4.73 0-7.476.326z"></path><circle fill="#D99E82" cx="3.053" cy="10.503" r=".488"></circle><circle fill="#D99E82" cx="3.695" cy="9.804" r=".269"></circle><circle fill="#D99E82" cx="4.1" cy="10.503" r=".269"></circle></svg>',

		'<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 280.547 213.481" style="enable-background:new 0 0 280.547 213.481;" xml:space="preserve"><g><g><g><g><g><path style="fill:#6D5451;" d="M52.158,191.54l4.555,1.464c0,0,6.372,7.881,4.777,8.75c-1.599,0.876-3.932,0-3.932,0s1.106,1.619-1.839,1.619c-2.947,0-9.944-0.371-12.154-4.297c-2.213-3.926-2.579-6.954-2.579-6.954L52.158,191.54z"/><path style="fill:#56372F;" d="M55.72,203.936c-3.76,0-10.4-0.592-12.646-4.582c-2.237-3.979-2.632-7.036-2.649-7.165c-0.017-0.154,0.031-0.312,0.131-0.427c0.101-0.122,0.249-0.195,0.401-0.201l11.172-0.586c0.066-0.008,0.139,0.007,0.205,0.025l4.552,1.468c0.107,0.033,0.195,0.1,0.267,0.182c1.298,1.606,5.503,6.989,5.129,8.866c-0.08,0.417-0.328,0.629-0.523,0.735c-0.553,0.303-1.225,0.455-1.999,0.455c-0.529,0-1.034-0.073-1.439-0.159c-0.014,0.148-0.062,0.302-0.139,0.456C57.847,203.635,57.038,203.936,55.72,203.936z M41.654,192.648c0.219,1.052,0.841,3.382,2.4,6.155c2.037,3.617,8.837,4.008,11.665,4.008c1.011,0,1.396-0.213,1.461-0.336c0.062-0.112-0.054-0.354-0.086-0.402c-0.139-0.204-0.128-0.473,0.021-0.663c0.153-0.196,0.414-0.265,0.641-0.184c0.009,0,0.961,0.35,2.002,0.35c0.582,0,1.073-0.1,1.462-0.316c0.218-0.643-1.971-4.201-4.837-7.771l-4.3-1.385L41.654,192.648z"/></g><path style="opacity:0.4;fill:#6D5451;" d="M52.158,191.54l4.555,1.464c0,0,0.172,0.212,0.455,0.578c-1.396,1.684-4.505,2.218-6.411,2.573c-1.487,0.283-4.438,0.301-3.76,2.737c0.419,1.496,4.596,2.813,5.084,2.985c0.911,0.321,2.314,0.805,3.24,0.27c0.588-0.341,0.862-0.844,0.952-1.422c0.156-0.231,0.147-0.539,0.014-0.809c-0.028-0.334-0.095-0.68-0.183-1.024c0.49,0.484,0.964,0.975,1.452,1.376c0.723,0.593,2.215,1.509,2.888,0.314c0.302-0.537,0.354-1.193,0.311-1.847c0.836,1.457,1.314,2.701,0.735,3.018c-1.599,0.876-3.932,0-3.932,0s1.106,1.619-1.839,1.619c-2.947,0-9.944-0.371-12.154-4.297c-2.213-3.926-2.579-6.954-2.579-6.954L52.158,191.54z"/><path style="fill:#56372F;" d="M57.559,202.122c0.062,0,0.124-0.013,0.177-0.047c0.178-0.098,0.243-0.321,0.143-0.499l-2.382-4.298c-0.102-0.179-0.319-0.24-0.498-0.143c-0.177,0.101-0.241,0.319-0.144,0.497l2.385,4.299C57.305,202.053,57.432,202.122,57.559,202.122z"/></g><g><g><path style="fill:#6D5451;" d="M140.148,195.442l4.557,1.467c0,0,6.369,7.884,4.776,8.753c-1.597,0.869-3.929,0-3.929,0s1.106,1.619-1.841,1.619c-2.948,0-9.941-0.371-12.153-4.298c-2.212-3.926-2.578-6.956-2.578-6.956L140.148,195.442z"/><path style="fill:#56372F;" d="M143.712,207.844c-3.759,0-10.4-0.598-12.646-4.583c-2.24-3.979-2.629-7.038-2.647-7.165c-0.018-0.154,0.029-0.313,0.127-0.433c0.104-0.118,0.248-0.191,0.406-0.197l11.167-0.586c0.065-0.008,0.139,0.003,0.204,0.028l4.556,1.466c0.105,0.032,0.194,0.093,0.266,0.18c1.296,1.605,5.501,6.989,5.126,8.864c-0.079,0.415-0.325,0.632-0.52,0.735c-0.556,0.307-1.227,0.461-1.999,0.461c-0.53,0-1.034-0.077-1.441-0.16c-0.015,0.147-0.059,0.299-0.139,0.453C145.836,207.535,145.032,207.844,143.712,207.844z M129.645,196.557c0.222,1.053,0.843,3.376,2.403,6.152c2.034,3.617,8.834,4.006,11.663,4.006c1.014,0,1.396-0.211,1.463-0.338c0.058-0.112-0.053-0.35-0.087-0.396c-0.139-0.207-0.133-0.472,0.021-0.667c0.152-0.189,0.412-0.267,0.639-0.181c0.01,0.003,0.965,0.352,2.004,0.352c0.581,0,1.071-0.107,1.458-0.319c0.222-0.638-1.966-4.198-4.839-7.773l-4.291-1.381L129.645,196.557z"/></g><path style="opacity:0.4;fill:#6D5451;" d="M140.148,195.442l4.107,1.321c-0.964,0.322-2.021,0.537-2.558,0.757c-1.922,0.804-3.986,1.23-5.881,1.993c-3.295,1.32-0.454,3.545,1.526,4.737c1.351,0.82,5.406,3.339,6.873,1.488c0.604-0.764,0.608-1.632,0.372-2.52c0.236,0.194,0.467,0.399,0.698,0.598c0.818,0.674,2.014,1.724,3.15,1.161c0.51-0.25,0.793-0.65,0.935-1.132c0.398,0.898,0.52,1.59,0.109,1.815c-1.597,0.869-3.929,0-3.929,0s1.106,1.619-1.841,1.619c-2.948,0-9.941-0.371-12.153-4.298c-2.212-3.926-2.578-6.956-2.578-6.956L140.148,195.442z"/><path style="fill:#56372F;" d="M145.553,206.025c0.06,0,0.122-0.015,0.177-0.045c0.178-0.1,0.24-0.318,0.143-0.496l-2.386-4.302c-0.097-0.174-0.319-0.239-0.497-0.139c-0.178,0.095-0.239,0.319-0.142,0.494l2.385,4.302C145.299,205.958,145.423,206.025,145.553,206.025z"/></g><g><g><path style="fill:#6D5451;" d="M176.641,191.709l4.558,1.465c0,0,6.367,7.883,4.771,8.751c-1.593,0.868-3.926,0-3.926,0s1.106,1.62-1.842,1.62c-2.946,0-9.944-0.366-12.151-4.299c-2.213-3.926-2.579-6.952-2.579-6.952L176.641,191.709z"/><path style="fill:#56372F;" d="M180.202,204.107c-3.76,0-10.402-0.596-12.643-4.583c-2.241-3.979-2.632-7.035-2.65-7.166c-0.017-0.154,0.031-0.311,0.131-0.426c0.101-0.124,0.245-0.195,0.401-0.2l11.17-0.585c0.063-0.009,0.135,0.005,0.203,0.022l4.555,1.467c0.105,0.036,0.195,0.098,0.265,0.183c1.297,1.605,5.502,6.989,5.132,8.863c-0.083,0.419-0.329,0.633-0.523,0.738c-0.556,0.303-1.224,0.456-1.999,0.456c-0.528,0-1.034-0.074-1.442-0.16c-0.018,0.148-0.059,0.303-0.136,0.455C182.327,203.8,181.523,204.107,180.202,204.107z M166.137,192.819c0.222,1.05,0.844,3.38,2.403,6.149c2.034,3.625,8.834,4.015,11.662,4.015c1.015,0,1.398-0.213,1.464-0.343c0.059-0.11-0.053-0.349-0.089-0.396c-0.136-0.208-0.127-0.474,0.023-0.669c0.151-0.189,0.407-0.263,0.639-0.177c0.011,0,0.963,0.349,2.004,0.349c0.582,0,1.07-0.104,1.46-0.319c0.217-0.639-1.968-4.197-4.839-7.77l-4.296-1.383L166.137,192.819z"/></g><path style="opacity:0.4;fill:#6D5451;" d="M176.641,191.709l3.634,1.17c-2.831,1.576-6.046,3.148-8.946,3.498c-0.655,0.077-1.196,0.886-0.592,1.428c1.634,1.467,6.512,6.048,9.07,4.646c1.622-0.887,1.025-3.039,0.588-4.813c1.591,1.438,2.551,4.18,4.83,4.311c0.305,0.01,0.564-0.014,0.795-0.061c-0.014,0.009-0.029,0.026-0.05,0.035c-1.593,0.868-3.926,0-3.926,0s1.106,1.62-1.842,1.62c-2.946,0-9.944-0.366-12.151-4.299c-2.213-3.926-2.579-6.952-2.579-6.952L176.641,191.709z"/><path style="fill:#56372F;" d="M182.044,202.292c0.06,0,0.118-0.016,0.178-0.045c0.177-0.1,0.242-0.322,0.142-0.499l-2.388-4.299c-0.096-0.177-0.319-0.238-0.497-0.141c-0.177,0.094-0.239,0.317-0.142,0.496l2.386,4.297C181.79,202.225,181.913,202.292,182.044,202.292z"/></g><g><g><path style="fill:#6D5451;" d="M83.029,187.165l4.529,1.434c0,0,6.331,7.721,4.748,8.572c-1.589,0.854-3.906,0-3.906,0s1.097,1.587-1.83,1.587c-2.932,0-9.886-0.36-12.085-4.206c-2.193-3.85-2.56-6.818-2.56-6.818L83.029,187.165z"/><path style="fill:#56372F;" d="M86.57,199.323c-3.736,0-10.34-0.585-12.571-4.492c-2.227-3.903-2.616-6.9-2.635-7.024c-0.018-0.156,0.029-0.311,0.129-0.432c0.102-0.119,0.246-0.194,0.404-0.201l11.102-0.573c0.072-0.006,0.136,0.005,0.202,0.029l4.528,1.438c0.102,0.028,0.195,0.094,0.266,0.177c1.289,1.566,5.467,6.841,5.104,8.691c-0.065,0.324-0.254,0.585-0.526,0.733c-0.55,0.295-1.218,0.448-1.984,0.448c-0.529,0-1.025-0.076-1.431-0.158c-0.018,0.141-0.062,0.283-0.134,0.43C88.692,199.017,87.89,199.323,86.57,199.323z M72.594,188.268c0.224,1.035,0.84,3.302,2.384,6.002c2.022,3.541,8.779,3.925,11.593,3.925c1.011,0,1.39-0.206,1.456-0.331c0.052-0.095-0.049-0.313-0.091-0.369c-0.136-0.201-0.129-0.472,0.019-0.666c0.151-0.194,0.408-0.269,0.641-0.183c0.01,0,0.956,0.344,1.993,0.344c0.577,0,1.065-0.105,1.452-0.312c0.197-0.633-1.974-4.111-4.815-7.591l-4.267-1.352L72.594,188.268z"/></g><path style="opacity:0.4;fill:#6D5451;" d="M83.029,187.165l4.529,1.434c0,0,0.051,0.062,0.133,0.164c-2.113,1.514-9.103,2.377-10.456,2.549c-0.73,0.089-1.106,0.837-0.594,1.431c1.026,1.183,2.429,1.856,3.769,2.631c1.241,0.715,3.001,1.898,4.511,1.762c1.958-0.172,1.975-1.732,1.757-3.37c1.584,1.738,3.565,4.086,4.836,2.434c0.293-0.388,0.384-0.888,0.382-1.413c0.623,1.174,0.907,2.118,0.411,2.386c-1.589,0.854-3.906,0-3.906,0s1.097,1.587-1.83,1.587c-2.932,0-9.886-0.36-12.085-4.206c-2.193-3.85-2.56-6.818-2.56-6.818L83.029,187.165z"/><path style="fill:#56372F;" d="M88.323,197.626c0.063,0,0.122-0.017,0.178-0.047c0.175-0.094,0.239-0.319,0.143-0.497l-2.385-4.298c-0.098-0.177-0.32-0.243-0.498-0.141c-0.178,0.093-0.242,0.318-0.143,0.496l2.386,4.298C88.069,197.556,88.196,197.626,88.323,197.626z"/></g><g><path style="fill:#EB94A4;" d="M241.502,26.174c0,0,6.833,4.144,15.635,2.282c0,0-2.742,12.587-17.793,12.042c-15.05-0.537-31.77-25.558-31.77-25.558s3.542-6.297,15.137-3.075C234.303,15.085,232.796,21.411,241.502,26.174z"/><path style="fill:#EA6A8D;" d="M240.275,41.079c-0.313,0-0.627-0.005-0.952-0.012c-6.392-0.231-13.765-4.66-21.913-13.158c-6.029-6.288-10.262-12.591-10.304-12.655c-0.118-0.175-0.127-0.401-0.023-0.592c0.101-0.173,2.489-4.28,9.507-4.28c1.922,0,4.029,0.318,6.267,0.939c6.859,1.904,9.232,4.846,11.748,7.958c1.757,2.183,3.578,4.435,7.167,6.397c0.066,0.041,4.537,2.695,10.755,2.695l0,0c1.514,0,3.025-0.156,4.492-0.463c0.19-0.038,0.386,0.015,0.519,0.153c0.136,0.133,0.191,0.328,0.15,0.517C257.661,28.704,254.79,41.079,240.275,41.079L240.275,41.079z M208.253,14.941c1.979,2.851,17.419,24.506,31.111,24.998c0.311,0.011,0.601,0.028,0.911,0.017c11.426,0,15.146-8.097,16.059-10.773c-1.256,0.213-2.531,0.32-3.808,0.32l0,0c-6.546,0-11.125-2.733-11.317-2.844c-3.763-2.064-5.655-4.404-7.482-6.67c-2.397-2.974-4.662-5.773-11.171-7.581c-2.141-0.596-4.147-0.897-5.966-0.897C211.233,11.511,208.899,14.066,208.253,14.941z"/></g><path style="opacity:0.4;fill:#F3BBB4;" d="M222.71,11.865c11.593,3.22,10.086,9.546,18.792,14.309c0,0,5.306,3.216,12.588,2.705c-6.185,2.344-14.379,0.517-19.366-3.19c-0.81-0.604-1.591,0.639-1.015,1.315c2.778,3.249,5.395,6.488,6.95,10.515c0.385,0.988,0.757,1.98,1.183,2.946c-0.796,0.052-1.623,0.069-2.498,0.033c-15.05-0.537-31.77-25.558-31.77-25.558S211.115,8.644,222.71,11.865z"/><g><g><g><path style="fill:#F3BBB4;" d="M3.604,36.757c0.592,1.271,2.127,0.462,4.751,1.544c-4.788,5.781-1.118,14.616,5.002,11.546c6.116-3.063,2.383-10.535-0.153-11.689c8.496-6.604,13.339,4.932,13.339,4.932s1.014-1.265,3.327-4.163c-3.611-7.862-12.649-7.677-19.09-3.033C8.598,35.185,3.011,35.491,3.604,36.757z M10.165,46.458c-2.282-2.813,1.301-6.308,1.301-6.308C16.478,43.815,12.45,49.273,10.165,46.458z"/><path style="fill:#F09783;" d="M10.922,51.043c-1.948,0-3.613-1.161-4.565-3.182c-1.121-2.39-1.176-6.106,1.084-9.293c-0.791-0.245-1.461-0.316-2.029-0.381c-0.951-0.103-1.857-0.201-2.317-1.19c-0.148-0.317-0.128-0.642,0.056-0.932c0.637-0.999,3.341-1.106,4.474-1.106c1.183,0,2.276,0.112,3.052,0.317c2.938-2.053,6.296-3.18,9.479-3.18c4.643,0,8.274,2.343,10.23,6.593c0.089,0.195,0.059,0.42-0.072,0.586c-2.315,2.902-3.332,4.163-3.332,4.163c-0.125,0.159-0.319,0.229-0.517,0.206c-0.199-0.029-0.365-0.154-0.442-0.34c-0.029-0.068-2.849-6.625-7.704-6.625c-1.316,0-2.701,0.484-4.117,1.448c1.517,1.213,2.986,3.883,3.035,6.463c0.039,1.779-0.563,4.225-3.626,5.765C12.696,50.81,11.794,51.043,10.922,51.043z M4.165,36.616c0.18,0.288,0.48,0.356,1.371,0.454c0.753,0.083,1.786,0.194,3.033,0.708c0.165,0.066,0.289,0.211,0.332,0.386c0.046,0.175,0.005,0.358-0.11,0.497c-2.431,2.933-2.46,6.491-1.41,8.721c1.108,2.357,3.341,3.155,5.723,1.965c2.539-1.273,3.035-3.278,3.009-4.732c-0.053-2.743-1.927-5.392-3.143-5.942c-0.181-0.08-0.304-0.251-0.327-0.448c-0.023-0.195,0.059-0.389,0.213-0.51c1.845-1.436,3.683-2.161,5.462-2.161c4.518,0,7.35,4.557,8.346,6.48c0.494-0.616,1.328-1.659,2.546-3.184c-1.791-3.637-4.989-5.628-9.055-5.628c-3.031,0-6.247,1.11-9.043,3.127c-0.149,0.106-0.337,0.136-0.506,0.082c-0.665-0.219-1.783-0.348-2.982-0.348C5.651,36.083,4.484,36.402,4.165,36.616z M11.602,47.802c-0.491,0-1.214-0.172-1.875-0.984c-2.063-2.545-0.023-5.732,1.348-7.068c0.195-0.193,0.503-0.216,0.721-0.048c2.585,1.883,2.951,4.261,2.431,5.856C13.787,46.899,12.73,47.802,11.602,47.802z M11.527,40.913c-0.771,0.893-2.492,3.257-0.925,5.191c0.849,1.044,2.109,0.455,2.552-0.898C13.337,44.647,13.73,42.749,11.527,40.913z"/></g></g><path style="opacity:0.6;fill:#D8A182;" d="M10.528,49.799c0,0-1.375-0.489-2.444-3.015c-1.623-3.809,0.793-8.647,5.927-11.872c1.931-1.003-2.174-0.698-5.578,3.958C5.027,43.526,6.875,50.303,10.528,49.799z"/><path style="fill:#FFFFFF;" d="M7.947,48.031c0,0-3.896-5.581,3.517-12.055C7.581,38.488,4.643,43.515,7.947,48.031z"/></g><g><path style="fill:#F3BBB4;" d="M192.227,132.152c0,0-34.298-9.805-37.982-8.141c0,0-13.026,27.959,12.201,71.066c0,0,6.591,2.099,14.918-0.839C180.261,187.65,173.186,162.91,192.227,132.152z"/><path style="fill:#F09783;" d="M172.301,196.367c-3.619,0-5.93-0.721-6.025-0.757c-0.134-0.038-0.244-0.129-0.313-0.247c-13.098-22.379-15.735-40.626-15.641-51.988c0.104-12.357,3.277-19.31,3.414-19.6c0.057-0.124,0.154-0.225,0.278-0.278c0.357-0.163,0.889-0.239,1.629-0.239c7.44,0,35.548,8.009,36.742,8.352c0.166,0.049,0.306,0.174,0.367,0.337c0.064,0.169,0.047,0.354-0.046,0.501c-17.385,28.085-12.861,51.078-11.158,59.741c0.153,0.768,0.283,1.418,0.372,1.958c0.041,0.27-0.111,0.532-0.367,0.625C178.545,195.83,175.437,196.367,172.301,196.367z M166.82,194.6c0.62,0.166,2.64,0.641,5.48,0.641c2.849,0,5.682-0.46,8.425-1.38c-0.08-0.425-0.175-0.91-0.284-1.458c-1.711-8.712-6.244-31.74,10.916-59.912c-4.519-1.271-29.078-8.106-35.715-8.106c-0.5,0-0.802,0.038-0.978,0.083C153.553,127.154,143.347,154.354,166.82,194.6z"/></g><path style="opacity:0.4;fill:#F3BBB4;" d="M154.245,124.012c3.684-1.664,37.982,8.141,37.982,8.141c-3.907,6.313-6.701,12.367-8.687,18.069c-0.013-0.143-0.013-0.278-0.024-0.421c-0.052-0.537-0.496-0.959-1.061-0.81c-9.256,2.473-16.025,11.012-17.489,20.316c-1.422,9.025,2.107,18.299,6.188,26.467c-2.9-0.127-4.707-0.695-4.707-0.695C141.219,151.971,154.245,124.012,154.245,124.012z"/><path style="opacity:0.4;fill:#F3BBB4;" d="M160.771,155.551c-3.099,1.491-5.732,3.379-7.988,5.623c-5.005-23.279,1.462-37.162,1.462-37.162c3.684-1.664,37.982,8.141,37.982,8.141c-2.449,3.956-4.461,7.809-6.11,11.542C177.58,147.414,169.149,151.525,160.771,155.551z"/><g><path style="fill:#F3BBB4;" d="M63.595,150.499c3.116-4.452,4.426-9.019,4.52-14.128c10.801,1.829,24.862,4.868,24.862,4.868s-13.914,19.403-8.972,38.26c1.041,3.962,3.554,9.1,3.554,9.1s-9.731,3.694-15.633-0.865c0,0-5.292-12.527-11.813-28.059C59.977,156.192,61.325,153.722,63.595,150.499z"/><path style="fill:#F09783;" d="M79.6,190.573c-3.265,0-5.961-0.801-8.02-2.392c-0.077-0.06-0.139-0.139-0.175-0.228c0,0-5.292-12.53-11.809-28.061c-0.028-0.065-0.039-0.13-0.045-0.201c-0.143-3.518,1.149-6.06,3.58-9.518c2.917-4.16,4.325-8.55,4.419-13.813c0.006-0.166,0.079-0.319,0.207-0.423c0.123-0.104,0.293-0.15,0.452-0.12c10.687,1.809,24.746,4.836,24.885,4.872c0.187,0.041,0.34,0.17,0.405,0.348c0.07,0.171,0.048,0.373-0.066,0.526c-0.139,0.195-13.699,19.417-8.883,37.792c1.014,3.864,3.488,8.945,3.516,8.995c0.063,0.139,0.073,0.309,0.018,0.456c-0.063,0.146-0.179,0.264-0.326,0.316C87.601,189.187,83.89,190.573,79.6,190.573z M72.388,187.38c1.838,1.376,4.266,2.07,7.212,2.07c3.118,0,5.986-0.799,7.178-1.177c-0.687-1.463-2.465-5.398-3.315-8.632c-4.423-16.874,6.166-34.345,8.581-38.028c-3.081-0.657-14.306-3.017-23.384-4.576c-0.205,5.208-1.676,9.605-4.606,13.781c-2.313,3.3-3.479,5.566-3.378,8.732C66.777,174.089,71.792,185.978,72.388,187.38z"/></g><path style="opacity:0.4;fill:#F3BBB4;" d="M63.595,150.499c3.116-4.452,4.426-9.019,4.52-14.128c10.801,1.829,24.862,4.868,24.862,4.868s-4.085,5.706-7.045,13.934c-7.382-2.646-16.304-0.305-16.542,8.635c-0.261,9.738,5.164,17.643,8.98,26.162c-2.243-0.159-4.541-0.763-6.444-2.235c0,0-5.292-12.527-11.813-28.059C59.977,156.192,61.325,153.722,63.595,150.499z"/><g><path style="fill:#F3BBB4;" d="M13.505,77.744c2.289-25.136,4.482-37.747,28.448-54.173c23.481-16.093,127.083-12.386,145.2-1.554c11.887,8.2,27.342,73.668,23.819,90.299c-6.128,28.948-52.646,41.524-62.588,42.972c-5.387,4.145-5.126,27.705-3.297,42.104c0,0-1.968,0.58-5.294,1.242c-6.663,1.321-10.471-1.009-10.471-1.009c-5.587-4.386-6.812-15.729-17.022-44.165c-20.095-1.241-34.396-1.073-50.007-7.792c-12.521,18.895-6.024,38.157-5.201,47.813c0,0-8.812,4.916-16.029-0.902c-0.01-0.003-6.451-10.957-12.665-30.273c-0.165-2.142,0.077-4.278,1.295-6.123c2.855-2.072,5.78-4.188,6.4-7.429c1.138-5.918-3.396-11.298-6.234-16.056c-4.091-6.866-7.851-14.121-11.31-21.328C16.653,107.412,11.696,97.624,13.505,77.744z"/><path style="fill:#F09783;" d="M135.804,199.602c-4.281,0-6.673-1.436-6.773-1.496c-3.787-2.969-5.585-8.697-9.168-20.119c-1.963-6.256-4.398-14.026-7.97-23.987c-2.654-0.159-5.209-0.3-7.68-0.432c-15.813-0.863-28.339-1.543-41.707-7.198c-9.862,15.222-7.359,30.712-5.699,40.996c0.373,2.322,0.697,4.326,0.847,6.07c0.018,0.219-0.096,0.432-0.288,0.537c-0.148,0.083-3.656,2.012-8.126,2.012c-3.216,0-6.088-0.997-8.528-2.964c-0.195-0.124-6.743-11.559-12.846-30.543c-0.014-0.041-0.023-0.083-0.029-0.13c-0.203-2.631,0.249-4.754,1.384-6.474c0.038-0.061,0.089-0.107,0.142-0.148c2.769-2.011,5.602-4.062,6.179-7.077c0.893-4.646-1.986-9.113-4.524-13.055c-0.574-0.887-1.134-1.756-1.64-2.607c-3.735-6.264-7.444-13.255-11.335-21.373l-0.127-0.266c-2.022-4.204-6.755-14.048-4.973-33.654c2.294-25.157,4.47-37.983,28.69-54.586c10.039-6.879,36.672-10.988,71.238-10.988c34.081,0,65.444,3.962,74.57,9.417c11.922,8.221,27.698,73.817,24.081,90.893c-6.116,28.897-51.615,41.694-62.904,43.397c-4.864,4.074-4.864,26.633-2.972,41.5c0.036,0.271-0.137,0.53-0.399,0.607c-0.079,0.025-2.03,0.596-5.348,1.253C138.508,199.465,137.128,199.602,135.804,199.602z M129.673,197.183c0.008,0,2.228,1.296,6.131,1.296c1.253,0,2.557-0.137,3.879-0.396c2.347-0.465,4.025-0.892,4.788-1.101c-1.478-12.071-2.493-37.472,3.57-42.137c0.077-0.059,0.166-0.098,0.261-0.112c10.875-1.584,56.108-14.139,62.12-42.534c1.633-7.724-0.825-27.034-6.13-48.057c-5.575-22.117-12.262-38.077-17.459-41.664c-8.939-5.338-40.057-9.228-73.961-9.228c-34.348,0-60.742,4.031-70.604,10.789C18.466,40.352,16.326,52.994,14.067,77.795c-1.757,19.295,2.882,28.947,4.866,33.063l0.123,0.271c3.88,8.082,7.568,15.047,11.287,21.285c0.504,0.836,1.056,1.696,1.621,2.571c2.654,4.118,5.663,8.786,4.683,13.877c-0.657,3.43-3.641,5.609-6.54,7.716c-0.942,1.477-1.318,3.322-1.15,5.621c5.884,18.275,11.97,29.025,12.544,30.012c2.246,1.766,4.838,2.648,7.739,2.648c3.423,0,6.314-1.253,7.253-1.708c-0.151-1.614-0.454-3.477-0.8-5.608c-1.703-10.544-4.277-26.476,6.131-42.188c0.15-0.227,0.447-0.313,0.694-0.204c13.348,5.746,25.885,6.427,41.757,7.287c2.586,0.142,5.265,0.29,8.056,0.458c0.225,0.015,0.423,0.163,0.496,0.376c3.646,10.147,6.119,18.038,8.112,24.376C124.451,188.847,126.214,194.471,129.673,197.183L129.673,197.183z"/></g><path style="opacity:0.4;fill:#F3BBB4;" d="M29.859,132.699c2.838,4.758,7.372,10.138,6.234,16.056c-0.62,3.24-3.545,5.357-6.4,7.429c-1.218,1.845-1.46,3.982-1.295,6.123c6.214,19.316,12.655,30.27,12.665,30.273c7.218,5.818,16.029,0.902,16.029,0.902c-0.823-9.656-7.319-28.918,5.201-47.813c15.61,6.719,29.912,6.551,50.007,7.792c10.211,28.437,11.436,39.779,17.022,44.165c0,0,3.808,2.33,10.471,1.009c3.326-0.662,5.294-1.242,5.294-1.242c-1.829-14.399-2.09-37.959,3.297-42.104c9.941-1.448,56.46-14.023,62.588-42.972c3.522-16.631-11.933-82.099-23.819-90.299c-18.117-10.832-121.72-14.539-145.2,1.554C17.986,39.997,15.794,52.608,13.505,77.744c-1.809,19.88,3.149,29.668,5.044,33.627C22.008,118.578,25.768,125.833,29.859,132.699z M33.765,123.255c-5.921-10.151-11.36-20.749-13.566-32.395c-1.934-10.23-0.166-21.943,4.559-31.998c0.048-0.12,0.095-0.242,0.148-0.36c3.069-6.8,7.943-13.584,13.982-18.83C43.93,34.717,49.822,30.53,56.3,27.174c17.524-9.085,37.212-10.785,56.566-9.065c5.09,0.455,10.148,1.188,15.156,2.192c4.233,0.852,8.851,1.686,12.815,3.438c3.172,1.404,5.58,3.231,6.772,6.574c0.626,1.76,0.439,3.876,0.405,5.7c-0.059,3.063-5.613,25.52-3.391,35.62c1.703,7.728,6.393,16.027,11.707,21.907c26.528,29.345,1.555,45.83,1.741,45.174c1.284-4.493,2.153-9.063,2.905-13.657c-0.184,0.213-0.366,0.438-0.544,0.674c-1.484,1.963-2.79,4.086-4.039,6.205c-2.902,4.928-5.478,10.143-7.919,15.311c-2.755,5.834-4.557,11.759-5.195,18.186c-0.59,5.966-0.247,12.002-0.285,17.982c-0.021,3.267,0.197,6.968-2.061,9.597c-1.868,2.179-4.79,0.127-6.324-1.251c-5.962-5.338-8.193-15.452-10.678-22.691c-5.909-17.214-8.581-34.758-6.854-52.949c0.686-7.165,2.058-15.605,5.451-22.659c-0.134,0.143-0.272,0.278-0.402,0.427c-3.379,3.73-6.04,8.262-8.521,12.616c-2.553,4.481-3.91,9.472-5.356,14.386c-1.004,3.399-1.906,7.461-4.105,10.328c-2.9,3.778-8.603,4.286-12.976,4.322c-5.589,0.038-11.528-1.043-16.721-3.119c-0.442-0.174-0.696-0.547-0.587-1.031c1.673-7.402,2.856-14.838,3.313-22.343c-0.884,3.796-2.128,7.526-3.643,11.092c-4.324,10.168-12.402,17.799-17.178,27.663c-4.696,9.709-5.758,22.036-3.769,32.581c0.496,2.627,1.479,5.276,0.229,7.802c-1.117,2.248-4.178,1.339-5.858,0.573c-6.748-3.069-11.858-32.648-10.343-34.189c2.725-4.017,8.025-4.814,8.032-9.898C44.658,138.327,36.835,128.526,33.765,123.255z"/><path style="opacity:0.4;fill:#F3BBB4;" d="M194.945,132.756c-0.042-5.871-2.797-9.565-7.503-12.893c-6.734-4.758-14.279-8.018-20.031-14.091c-5.573-5.883-10.469-12.57-14.125-19.813c-3.911-7.752-5.983-15.331-5.723-24.025c0.289-9.573,1.056-19.618,4.086-28.762c1.779-5.36,5.533-12.641,3.155-18.369c15.152,1.638,27.203,4.14,32.349,7.214c11.887,8.2,27.342,73.668,23.819,90.299c-2.01,9.478-8.348,17.205-16.316,23.36C194.855,134.719,194.957,133.734,194.945,132.756z"/><g><path style="fill:#F3BBB4;" d="M154.487,69.859c3.144,16.579,20.391,44.87,51.134,51.096c43.032,2.95,44.788-14.084,53.283-18.021c13.67,0.413,13.278-34.54,8.438-36.279c-16.196-5.823-23.031-13.723-25.824-21.58c0,0-3.43-8.863-10.596-16.477c-17.85-18.961-44.825-19.534-60.738-5.114C149.605,42.135,152.423,58.987,154.487,69.859z"/><path style="fill:#F09783;" d="M215.073,121.86c-0.002,0-0.002,0-0.002,0c-2.98,0-6.17-0.113-9.483-0.344c-30.056-6.08-48.287-33.808-51.654-51.55c-1.971-10.376-5.267-27.74,15.871-46.897c7.258-6.581,16.922-10.198,27.216-10.198c12.813,0,24.997,5.447,34.309,15.336c7.16,7.608,10.679,16.578,10.71,16.664c3.321,9.333,11.657,16.276,25.492,21.252c3.341,1.201,4.263,13.356,2.676,22.469c-1.677,9.612-5.609,14.909-11.066,14.909h-0.114c-1.913,0.923-3.526,2.593-5.389,4.523C248.005,113.864,240.293,121.86,215.073,121.86z M197.02,13.993c-10.013,0-19.41,3.519-26.459,9.91c-20.669,18.73-17.447,35.71-15.522,45.85c3.311,17.44,21.228,44.686,50.695,50.651c3.217,0.213,6.381,0.331,9.337,0.331c24.743,0,32.264-7.799,37.756-13.492c1.975-2.053,3.684-3.819,5.839-4.821c0.079-0.039,0.171-0.047,0.257-0.051l0.218,0.004c6.543,0,9.047-8.76,9.957-13.979c1.792-10.284,0.054-20.493-1.945-21.216c-14.178-5.089-22.735-12.262-26.168-21.915c-0.028-0.072-3.47-8.84-10.474-16.283C221.415,19.316,209.519,13.993,197.02,13.993z"/></g><path style="opacity:0.4;fill:#F3BBB4;" d="M244.967,56.421c-4.834-7.646-8.564-15.945-14.075-23.158c-8.845-11.579-23.307-18.223-37.8-19.641c12.977-1.2,27.063,3.538,37.83,14.976c7.166,7.614,10.596,16.477,10.596,16.477c2.793,7.857,9.628,15.757,25.824,21.58c0.295,0.102,0.575,0.335,0.834,0.674C259.709,65.773,249.874,64.185,244.967,56.421z"/><path style="opacity:0.4;fill:#F3BBB4;" d="M183.67,69.967c7.79-9.935,19.735-15.354,32.341-16.34c9.715-0.757,22.954-1.628,31.162,4.794c-11.268-0.35-22.503-1.279-33.663,1.004C203.08,61.56,193.23,65.393,183.67,69.967z"/><path style="opacity:0.4;fill:#F3BBB4;" d="M170.184,23.483c7.074-6.409,16.336-9.848,26.006-10.034c-2.876,2.886,0.381,7.717,1.422,11.733c1.277,4.935,1.446,10.749-0.139,15.643c-0.872,2.69-1.573,4.782-4.58,3.375c-1.915-0.901-3.794-1.85-5.782-2.598c-5.149-1.937-14.96-6.649-19.513-0.956c-5.25,6.563-3.867,16.868-3.232,24.644c1.207,14.745,11.077,30.898,25.116,36.645c5.924,2.418,13.928,3.628,19.009-1.294c3.689-3.565,5.158-8.484,5.454-13.475c1.628,3.813,1.33,8.221,0.329,12.25c-0.113,0.443,0.135,0.898,0.584,1.031c4.01,1.157,7.704,2.8,11.872,3.387c1.688,0.24,4.038,0.501,5.59-0.462c1.73-1.077,2.528-2.872,2.6-4.896c0.166-4.525,0.875-8.744,2.204-13.077c2.308-7.519,5.311-16.969,13.842-19.34c5.403-1.502,11.848-1.342,17.074,1.109c4.145,4.673,3.845,36.163-9.135,35.767c-8.495,3.937-10.251,20.971-53.283,18.021c-30.743-6.226-47.99-34.517-51.134-51.096C152.423,58.987,149.605,42.135,170.184,23.483z"/><path style="fill:#9C4802;" d="M234.996,38.488c0,0-5.252-6.101-8.937,0.281C227.193,33.096,231.59,30.4,234.996,38.488z"/><path style="fill:#9C4802;" d="M211.163,37.735c0,0-5.251-6.102-8.939,0.281C203.358,32.343,207.757,29.649,211.163,37.735z"/><g><g><g><path style="fill:#F79797;" d="M242.297,80.012c6.005-11.188,10.43-14.852,17.252-14.474c1.45,0.076,7.95,0.834,9.032,1.059c8.348,3.032,6.383,14.585,5.992,27.076c-0.374,11.966-11.961,11.833-17.555,12.684c-0.407-0.055-13.912,0-14.42,0C234.934,106.356,236.29,91.191,242.297,80.012z"/><path style="fill:#E26180;" d="M242.599,106.919c-1.922,0-3.461-0.887-4.464-2.56c-2.823-4.718-1.212-15.533,3.666-24.62c6.143-11.44,10.689-15.156,17.781-14.764c1.419,0.077,7.94,0.825,9.114,1.07c7.639,2.771,7.189,11.891,6.666,22.456c-0.086,1.697-0.172,3.435-0.225,5.188c-0.349,11.115-10.131,12.27-15.979,12.959c-0.74,0.093-1.436,0.169-2.051,0.263c-0.053,0.007-0.1,0.014-0.15,0.007c-0.107-0.009-0.738-0.024-3.744-0.024c-3.235,0-7.651,0.016-9.614,0.024H242.599z M258.633,66.077c-6.066,0-10.21,3.713-15.842,14.201c-4.63,8.619-6.285,19.165-3.69,23.501c0.8,1.338,1.979,2.014,3.497,2.014l0.992-0.003c1.967-0.007,6.387-0.021,9.622-0.021c2.867,0,3.575,0.009,3.788,0.021c0.609-0.089,1.296-0.172,2.028-0.261c5.836-0.684,14.663-1.726,14.982-11.877c0.052-1.761,0.142-3.504,0.224-5.204c0.501-10.118,0.935-18.86-5.848-21.319c-0.944-0.195-7.384-0.949-8.867-1.029C259.218,66.082,258.925,66.077,258.633,66.077z"/></g></g><g style="opacity:0.4;"><path style="fill:#F79797;" d="M250.779,86.77c2.799-1.998,12.318-19.387,19.082-19.589c6.85,3.726,5.084,14.69,4.712,26.492c-0.374,11.966-11.961,11.833-17.555,12.684c-0.407-0.055-13.912,0-14.42,0c-6.367,0-6.504-10.462-2.934-20.415C241.919,86.358,248.559,88.357,250.779,86.77z"/></g><g style="opacity:0.4;"><path style="fill:#F79797;" d="M245.259,99.605c1.585-1.17,2.161-3.129,2.46-4.983c0.455-2.814,1.548-5.286,2.826-7.723c0.077-0.047,0.165-0.083,0.234-0.13c2.799-1.998,12.318-19.387,19.082-19.589c6.85,3.726,5.084,14.69,4.712,26.492c-0.374,11.966-11.961,11.833-17.555,12.684c-0.407-0.055-13.912,0-14.42,0c-2.589,0-4.147-1.729-4.845-4.445C240.446,101.745,243.086,101.211,245.259,99.605z"/></g><g><g><path style="fill:#F79797;" d="M247.755,91.63c2.634-12.452,9.666-23.733,18.31-24.904c1.798-0.245,3.296,0.131,4.544,0.872c0.748,0.48,1.414,1.05,2.002,1.698c1.41,1.616,2.341,3.71,2.932,5.501c1.55,5.091,1.565,11.84,1.344,18.885c-0.22,7.059-5.141,10.477-11.761,12.063C250.258,108.093,245.185,103.747,247.755,91.63z"/><path style="fill:#E26180;" d="M258.279,106.919c-4.717,0-7.917-1.122-9.792-3.433c-2.04-2.515-2.46-6.435-1.283-11.976c3.43-16.215,11.905-24.412,18.783-25.346c1.783-0.242,3.442,0.076,4.908,0.952c0.795,0.508,1.509,1.11,2.128,1.8c1.253,1.428,2.277,3.35,3.051,5.702c1.65,5.416,1.573,12.688,1.375,19.077c-0.203,6.466-4.304,10.705-12.194,12.599C262.612,106.712,260.28,106.919,258.279,106.919z M267.132,67.211c-0.319,0-0.65,0.024-0.992,0.072c-7.673,1.04-15.008,11.1-17.836,24.458c-1.1,5.191-0.753,8.798,1.059,11.037c2.38,2.935,7.435,3.715,15.673,2.411c7.395-1.776,11.1-5.548,11.288-11.526c0.194-6.302,0.271-13.468-1.321-18.706c-0.726-2.196-1.677-3.979-2.817-5.292c-0.551-0.609-1.185-1.146-1.88-1.591C269.35,67.508,268.277,67.211,267.132,67.211z"/></g></g><g><path style="fill:#F79797;" d="M276.074,91.039c0.294-2.457,0.376-4.748,0.083-7.215c-0.479-4.075-0.807-8.882-3.453-12.229c-2.045-2.593-4.795-4.236-7.633-4.687c0.332-0.073,0.659-0.141,0.993-0.184c1.798-0.245,3.296,0.131,4.544,0.872c0.748,0.48,1.414,1.05,2.002,1.698c1.41,1.616,2.341,3.71,2.932,5.501c1.55,5.091,1.565,11.84,1.344,18.885c-0.055,1.755-0.404,3.287-0.991,4.617C275.276,95.992,275.8,93.326,276.074,91.039z"/></g><g style="opacity:0.4;"><path style="fill:#F79797;" d="M247.755,91.63c2.482-11.748,8.879-22.442,16.853-24.601c-1.916,1.04-3.649,2.736-4.998,4.988c-2.686,4.491-4.771,9.348-5.984,14.45c-0.893,3.76-2.051,7.869-1.782,11.777c0.523,7.681,11.824,6.303,16.674,4.331c4.039-1.646,6.617-4.182,8.221-7.308c-0.867,5.988-5.514,9.015-11.612,10.477C250.258,108.093,245.185,103.747,247.755,91.63z"/></g><path style="fill:#D86666;" d="M273.719,82.102c0,0-1.931,2.575-1.015,7.275c0.609,3.902,0.482,6.249-1.403,5.794C267.724,94.314,269.813,85.889,273.719,82.102z"/><path style="fill:#D86666;" d="M261.56,82.63c0,0-2.191,2.348-1.786,7.119c0.189,3.955-0.19,6.271-2.014,5.617C254.299,94.131,257.272,85.976,261.56,82.63z"/></g><g><path style="fill:#EB94A4;" d="M154.119,30.992l3.088,8.928c0,0,7.015-13.356,16.06-17.004C182.309,19.274,152.47,9.388,154.119,30.992z"/><path style="fill:#EA6A8D;" d="M157.207,40.482c-0.014,0-0.031,0-0.043,0c-0.224-0.018-0.416-0.17-0.49-0.38l-3.086-8.927c-0.015-0.048-0.023-0.095-0.03-0.143c-0.346-4.537,0.633-8.082,2.91-10.539c2.141-2.308,5.463-3.579,9.353-3.579c4.749,0,9.277,1.865,9.691,3.996c0.111,0.594,0.003,1.709-2.035,2.531c-8.749,3.522-15.702,16.607-15.77,16.736C157.608,40.367,157.413,40.482,157.207,40.482z M154.675,30.877l2.652,7.666c1.92-3.33,8.045-13.049,15.73-16.147c0.551-0.218,1.46-0.683,1.348-1.271c-0.242-1.241-3.952-3.086-8.585-3.086c-3.577,0-6.605,1.144-8.525,3.22C155.251,23.463,154.369,26.7,154.675,30.877z"/></g><path style="opacity:0.4;fill:#F3BBB4;" d="M154.119,30.992l3.088,8.928c0,0,7.015-13.356,16.06-17.004C182.309,19.274,152.47,9.388,154.119,30.992z"/><g><path style="fill:#F3BBB4;" d="M157.207,39.92c-2.295-2.368-4.497-6.067-5.736-9.111c-0.187-0.644-0.36-1.294-0.522-1.938c-0.932-3.692-2.694-8.339,0.135-11.684c2.927-3.459,6.878-2.95,10.977-3.32c3.399-3.771,7.239-7.368,11.901-9.491c4.197-1.91,8.765,0.526,11.5,3.541c16.762,18.493,10.938,34.038,8.749,34.219c-5.069,0.422-26.7-19.207-33.425-15.485C158.649,27.829,157.087,37.094,157.207,39.92z"/><path style="fill:#F09783;" d="M194.044,42.705c-2.301,0-6.944-3.033-12.325-6.546c-6.758-4.416-14.418-9.415-18.87-9.415c-0.709,0-1.315,0.133-1.793,0.398c-1.711,0.946-3.364,9.378-3.293,12.599c0.02,0.055,0.029,0.116,0.029,0.179c0.003,0.313-0.243,0.55-0.573,0.563c-0.143,0.008-0.306-0.054-0.415-0.172c-2.173-2.241-4.47-5.884-5.853-9.286c-0.211-0.712-0.388-1.369-0.551-2.014c-0.109-0.439-0.23-0.886-0.354-1.351c-0.927-3.415-2.073-7.659,0.608-10.834c2.563-3.037,5.789-3.204,9.208-3.382c0.636-0.032,1.28-0.066,1.925-0.119c2.924-3.227,6.899-7.172,11.94-9.465c1.061-0.485,2.193-0.727,3.366-0.727c3.001,0,6.282,1.646,8.78,4.404c5.817,6.414,9.514,13.071,10.991,19.782c1.49,6.774,0.198,11.192-0.43,12.776c-0.364,0.932-1.137,2.513-2.177,2.599C194.188,42.705,194.116,42.705,194.044,42.705z M162.849,25.614c4.787,0,12.597,5.1,19.486,9.599c5.013,3.271,9.742,6.365,11.709,6.365l0.12-0.003c0.181-0.041,0.873-0.722,1.467-2.566c0.757-2.341,3.798-14.841-10.59-30.714c-2.287-2.524-5.261-4.032-7.946-4.032c-1.012,0-1.986,0.209-2.899,0.625c-4.934,2.245-8.854,6.18-11.716,9.354c-0.094,0.106-0.228,0.17-0.366,0.184c-0.739,0.063-1.47,0.107-2.19,0.144c-3.306,0.169-6.159,0.323-8.41,2.983c-2.3,2.72-1.28,6.489-0.378,9.815c0.123,0.467,0.247,0.922,0.36,1.364c0.159,0.64,0.334,1.281,0.517,1.922c1.121,2.75,2.889,5.701,4.675,7.838c0.271-3.722,1.672-11.148,3.825-12.337C161.162,25.795,161.948,25.614,162.849,25.614z"/></g><path style="fill:#F09783;" d="M158.897,26.049c2.885-1.212,5.93-0.438,8.649,0.805c0.112,0.05,0.36,0.467,0.103,0.414c-2.432-0.509-4.585-1.266-7.104-0.787c-2.792,0.539-4.484,2.147-5.218,4.852c-0.038,0.148-0.227-0.038-0.221-0.133C155.374,28.579,156.468,27.072,158.897,26.049z"/><path style="fill:#F09783;" d="M160.047,13.853c1.225-0.349,2.22-0.297,3.462-0.388c1.572-0.109,3.009-0.446,4.498-0.941c2.106-0.695,3.924-1.581,5.459-3.115c0.052-0.057,0.165,0.08,0.129,0.133c-1.206,1.732-2.586,2.619-4.593,3.436c-2.737,1.104-5.829,1.543-8.768,1.283C160.098,14.249,159.831,13.918,160.047,13.853z"/><g><path style="fill:#F3BBB4;" d="M208.544,14.762c-0.06-0.023-0.116-0.046-0.175-0.07c-0.825-0.337-1.671-0.65-2.528-0.892c2.304-3.172,6.989-5.025,10.681-5.679c4.607-0.819,9.18,1.002,12.944,3.519c4.52,3.012,7.26,7.837,11.619,11.029c4.653,3.401,9.874,4.587,15.515,5.008c0.319,0.024,0.671,0.47,0.537,0.78c-0.55,1.295-2.249,1.782-3.471,2.206c-2.146,0.743-4.699,0.608-6.858,0.069c-2.446-0.611-5.066-1.298-7.298-2.501c-2.108-1.132-3.994-2.643-5.862-4.126c-4.465-3.548-8.624-7.616-14.63-8.033c-1.818-0.126-4.366-0.362-6.206,0.288C211.462,15.641,210.018,15.152,208.544,14.762z"/><path style="fill:#F09783;" d="M250.329,31.743c-1.183,0-2.444-0.159-3.659-0.465c-2.652-0.662-5.213-1.358-7.427-2.551c-2.099-1.129-3.985-2.624-5.809-4.076l-0.136-0.107c-0.585-0.463-1.165-0.934-1.741-1.403c-3.876-3.163-7.536-6.155-12.579-6.504l-0.382-0.03c-0.789-0.057-1.684-0.118-2.577-0.118c-1.268,0-2.256,0.132-3.019,0.403c-0.15,0.047-0.313,0.038-0.452-0.035c-1.156-0.616-2.474-1.107-4.151-1.55c-0.022-0.006-0.132-0.051-0.156-0.06c-1.072-0.438-1.832-0.703-2.554-0.904c-0.177-0.051-0.319-0.184-0.378-0.36c-0.061-0.173-0.033-0.36,0.077-0.515c2.424-3.342,7.295-5.238,11.038-5.903c4.141-0.738,8.696,0.499,13.355,3.602c2.426,1.621,4.363,3.763,6.234,5.83c1.659,1.833,3.375,3.73,5.401,5.215c3.976,2.903,8.668,4.414,15.225,4.902c0.353,0.023,0.7,0.254,0.913,0.603c0.192,0.313,0.228,0.663,0.103,0.964c-0.604,1.426-2.293,1.997-3.526,2.419l-0.28,0.094C252.804,31.558,251.615,31.743,250.329,31.743z M216.019,15.359c0.931,0,1.851,0.064,2.658,0.125l0.378,0.027c5.403,0.377,9.374,3.617,13.215,6.753c0.573,0.469,1.147,0.938,1.727,1.396l0.139,0.112c1.785,1.419,3.629,2.878,5.641,3.962c2.102,1.129,4.59,1.809,7.167,2.447c2.323,0.588,4.739,0.572,6.54-0.054l0.284-0.1c1.084-0.367,2.436-0.825,2.85-1.783c-0.026,0.047-0.071-0.003-0.098-0.016c-6.738-0.495-11.615-2.075-15.766-5.107c-2.122-1.548-3.878-3.495-5.576-5.369c-1.826-2.02-3.713-4.107-6.023-5.646c-4.412-2.944-8.68-4.116-12.535-3.435c-3.282,0.583-7.455,2.146-9.819,4.831c0.531,0.177,1.106,0.39,1.78,0.661l-0.036,0.597l0.142-0.546c1.662,0.441,2.994,0.931,4.173,1.534C213.708,15.487,214.746,15.359,216.019,15.359z"/></g><path style="opacity:0.4;fill:#F3BBB4;" d="M212.421,9.259c-0.826,0.913-1.461,1.978-1.809,3.204c-0.136,0.47,0.257,1.134,0.808,1.059c11.342-1.502,18.644,5.753,27.74,11.062c5.228,3.048,11.993,6.314,17.845,4.108c-0.647,1.111-2.197,1.576-3.339,1.971c-2.146,0.743-4.699,0.608-6.858,0.069c-2.446-0.611-5.066-1.298-7.298-2.501c-2.108-1.132-3.994-2.643-5.862-4.126c-4.465-3.548-8.624-7.616-14.63-8.033c-1.818-0.126-4.366-0.362-6.206,0.288c-1.35-0.719-2.793-1.207-4.268-1.598c-0.06-0.023-0.116-0.046-0.175-0.07c-0.825-0.337-1.671-0.65-2.528-0.892C207.337,11.742,209.838,10.239,212.421,9.259z"/><g><path d="M233.528,51.668c0.723,2.813,2.3,4.922,3.554,4.73c1.253-0.201,1.665-2.656,0.965-5.471c-0.711-2.824-2.292-4.93-3.535-4.738C233.269,46.405,232.825,48.847,233.528,51.668z"/><path style="fill:#FFFFFF;" d="M233.922,49.569c0.193,0.747,0.615,1.313,0.95,1.259c0.331-0.057,0.442-0.71,0.254-1.461c-0.189-0.747-0.609-1.31-0.941-1.259C233.854,48.165,233.736,48.817,233.922,49.569z"/></g><g><path d="M205.535,54.43c0.72,2.813,2.299,4.922,3.552,4.729c1.253-0.201,1.664-2.656,0.964-5.47c-0.71-2.823-2.288-4.931-3.536-4.735C205.276,49.166,204.831,51.607,205.535,54.43z"/><path style="fill:#FFFFFF;" d="M205.93,52.33c0.19,0.751,0.612,1.313,0.947,1.259c0.33-0.053,0.442-0.708,0.253-1.457c-0.189-0.747-0.608-1.313-0.939-1.26C205.859,50.928,205.741,51.58,205.93,52.33z"/></g><path style="opacity:0.4;fill:#F3BBB4;" d="M151.084,17.187c2.927-3.459,6.878-2.95,10.977-3.32c3.399-3.771,7.239-7.368,11.901-9.491c0.469-0.213,0.946-0.366,1.425-0.477c2.189,1.405,0.502,5.703-0.402,7.412c-1.412,2.679-3.565,3.597-6.53,3.879c-3.811,0.36-8.274,0.071-11.082,3.127c-0.512,0.559-0.14,1.379,0.59,1.432c5.902,0.413,11.82,2.885,17.059,5.509c4.121,2.064,8.088,4.326,11.693,7.196c2.915,2.311,7.214,3.589,7.492-1.566c0.322-5.925-1.62-12.721-5.072-18.482c12.143,16.455,7.086,29.562,5.077,29.731c-5.069,0.422-26.7-19.207-33.425-15.485c-2.137,1.18-3.699,10.444-3.579,13.271c-2.295-2.368-4.497-6.067-5.736-9.111c-0.187-0.644-0.36-1.294-0.522-1.938C150.017,25.179,148.255,20.532,151.084,17.187z"/></g><path style="fill:#C36564;" d="M212.539,99.002c0.028,0.036,0.055,0.072,0.077,0.106c0.355-0.722,0.602-1.479,0.777-2.264c0.5-1.52,0.823-3.102,0.956-4.659c0.645,2.867,0.464,5.809-0.568,8.276c5.009,5.292,12.934,7.64,20.084,7.521c5.926-0.094,13.162-3.369,18.975-1.355c0.058,0.021,0.159,0.206,0.047,0.186c-4.15-0.719-9.126,0.609-13.2,1.43c-4.05,0.813-8.428,1.326-12.501,0.392c-3.984-0.913-8.862-2.253-12.026-5.025c-0.573-0.504-1.318-1.111-2.059-1.798c-1.524,2.555-4.132,4.375-7.864,4.668c-0.004,0-0.013-0.002-0.019-0.002C208.52,105.122,210.997,102.32,212.539,99.002z"/></g><path style="fill:#C36564;" d="M108.726,124.748c0.069-0.201,0.382,0.13,0.365,0.27c-0.728,5.601-1.206,11.156,0.177,16.702c1.177,4.694,2.237,9.212,3.938,13.763c0.059,0.16-0.145,0.084-0.184-0.016c-2.061-5.184-4.232-9.837-5.545-15.29C106.241,135.029,107.093,129.687,108.726,124.748z"/><path style="fill:#C36564;" d="M61.22,146.632c1.737-3.459,4.019-6.62,5.574-10.182c0.094-0.218,0.438,0.154,0.378,0.338c-0.683,1.975-1.625,3.796-2.433,5.726c-0.653,1.577-1.527,3.702-3.018,4.645C61.473,147.313,61.1,146.869,61.22,146.632z"/><path style="fill:#C36564;" d="M147.474,155.814c1.106-3.458,3.063-6.426,5.051-9.427c0.094-0.139,0.324,0.109,0.263,0.234c-0.834,1.708-1.718,3.37-2.631,5.033c-0.815,1.494-1.33,3.119-2.204,4.579C147.787,156.512,147.404,156.03,147.474,155.814z"/><path style="opacity:0.4;fill:#F3BBB4;" d="M186.553,11.438c2.829,4.91,5.075,9.498,5.335,15.327c0.02,0.488-0.551,0.054-0.603-0.216c-0.911-4.591-2.382-9.145-5.079-13.027c-1.365-1.964-3.257-4.844-5.564-6.545C182.847,8.034,184.82,9.606,186.553,11.438z"/><path style="opacity:0.4;fill:#F3BBB4;" d="M219.363,9.43c-0.147-0.077-0.296-0.153-0.45-0.226c3.01-0.478,5.904,1.131,8.523,2.457c1.836,0.932,3.373,2.616,4.862,3.994c0.406,0.373,0.916,1.088,1.442,1.785C229.557,13.959,224.502,11.665,219.363,9.43z"/><path style="opacity:0.4;fill:#F3BBB4;" d="M72.96,25.44c0,0-40.518,10.708-47.351,44.527C25.609,69.967,41.72,39.116,72.96,25.44z"/><path style="opacity:0.4;fill:#F3BBB4;" d="M141.556,152.895c0.491-2.562,1.395-5.015,2.17-7.494c1.053-3.379,2.533-5.355,4.588-8.145c0.255-0.35,0.716,0.266,0.627,0.555c-1.66,5.49-3.885,10.815-5.232,16.398c-1.221,5.061-1.49,10.209-2.516,15.26c-0.112,0.56-0.86-0.08-0.871-0.423C140.187,163.754,140.559,158.085,141.556,152.895z"/><path style="opacity:0.4;fill:#F3BBB4;" d="M180.125,153.982c0.129-0.166,0.426,0.203,0.388,0.342c-1.111,4.063-2.358,8.07-2.974,12.244c-0.846,5.706-0.355,11.292,0.071,17.002c0.028,0.393-0.432,0.027-0.482-0.175C174.671,173.348,173.253,162.584,180.125,153.982z"/><path style="opacity:0.4;fill:#F3BBB4;" d="M57.639,140.412c0.162-0.183,0.491,0.255,0.41,0.426c-1.159,2.502-2.577,4.855-3.484,7.468c-1.156,3.326-1.931,6.717-2.71,10.146c-1.308,5.746-1.396,12.32-1.116,18.159c0.021,0.37-0.434,0.051-0.466-0.169C48.404,163.767,48.787,150.564,57.639,140.412z"/><path style="opacity:0.4;fill:#F3BBB4;" d="M79.665,165.58c0.408-2.685,1.276-4.775,2.847-6.998c0.151-0.216,0.482,0.142,0.441,0.325c-1.142,5.161-1.236,10.535-1.219,15.783c0,0.357-0.515-0.039-0.558-0.202C80.276,171.344,79.162,168.887,79.665,165.58z"/><path style="opacity:0.4;fill:#F3BBB4;" d="M246.429,58.396c0,0-30.252-4.985-56.064,8.975C190.365,67.371,213.525,56.513,246.429,58.396z"/><path style="fill:#F79797;" d="M244.627,79.42c0.863-1.761,1.791-3.499,2.784-5.197c0.893-1.353,1.792-2.645,2.634-3.753c2.327-3.052,5.295-3.82,7.323-3.944C252.496,70.183,248.204,74.525,244.627,79.42z"/></g></svg>'
	];






// ===== Thập nhị trực =====
  const THAP_NHI_TRUC = {
    "Kiến": { tot: "Khai trương, nhậm chức, cưới hỏi, trồng cây, đền ơn đáp nghĩa. Xuất hành đặng lợi, sinh con rất tốt.", xau: "Động thổ, chôn cất, đào giếng, lợp nhà." },
    "Trừ": { tot: "Động đất, ban nền đắp nền, thờ cúng Táo Thần, cầu thầy chữa bệnh bằng cách mổ xẻ hay châm cứu, bốc thuốc, xả tang, khởi công làm lò nhuộm lò gốm, nữ nhân khởi đầu uống thuốc chữa bệnh.", xau: "Đẻ con nhằm ngày này khó nuôi, nên làm Âm Đức cho con, nam nhân kỵ khởi đầu uống thuốc." },
    "Mãn": { tot: "Xuất hành, đi đường thủy, cho vay, thu nợ, mua hàng, bán hàng, nhập kho, đặt táng, kê gác, sửa chữa, lắp đặt máy, thuê thêm người, vào học kỹ nghệ, làm chuồng gà ngỗng vịt.", xau: "Lên quan lãnh chức, uống thuốc, vào làm hành chính, dâng nộp đơn từ." },
    "Bình": { tot: "Nhập vào kho, đặt táng, gắn cửa, kê gác, đặt yên chỗ máy, sửa chữa làm tàu, khai trương tàu thuyền, các việc bồi đắp thêm ( như bồi bùn, đắp đất, lót đá, xây bờ kè.) Lót giường đóng giường, thừa kế tước phong hay thừa kế sự nghiệp, các vụ làm cho khuyết thủng ( như đào mương, móc giếng, xả nước.)", xau: "Không có" },
    "Định": { tot: "Động thổ, san nền, đắp nền, làm hay sửa phòng bếp, lắp đặt máy móc, nhập học, làm lễ cầu thân, nộp đơn dâng sớ, sửa hay làm tàu thuyền, khai trương tàu thuyền, khởi công làm lò. Mua nuôi thêm súc vật.", xau: "Thưa kiện, xuất hành đi xa." },
    "Chấp": { tot: "Lập khế ước, giao dịch, động thổ san nền, cầu thầy chữa bệnh, đi săn thú cá, tìm bắt trộm cướp. Xây đắp nền-tường.", xau: "Dời nhà, đi chơi xa, mở cửa hiệu buôn bán, xuất tiền của." },
    "Phá": { tot: "Trị bệnh, Phá dỡ, Dọn dẹp", xau: "Là ngày Nhật Nguyệt tương xung. Ngày có trực Phá muôn việc làm vào ngày này đều bất lợi." },
    "Nguy": { tot: "Không nên làm gì", xau: "Nói đến Trực Nguy là nói đến sự Nguy hiểm, suy thoái. Chính vì thế ngày có trực Nguy là ngày xấu, tiến hành muôn việc đều hung." },
    "Thành":{ tot: "Lập khế ước, giao dịch, cho vay, thu nợ, mua hàng, bán hàng, xuất hành, đi tàu thuyền, khởi tạo, động thổ, san nền đắp nền, gắn cửa, đặt táng, kê gác, dựng xây kho vựa, làm hay sửa chữa phòng bếp, thờ phụng Táo Thần, lắp đặt máy móc ( hay các loại máy ), gặt lúa, đào ao giếng, tháo nước, cầu thầy chữa bệnh, mua gia súc, các việc trong vụ chăn nuôi, nhập học, làm lễ cầu thân, cưới gả, kết hôn, thuê người, nộp đơn dâng sớ, học kỹ nghệ, làm hoặc sửa tàu thuyền, khai trương tàu thuyền, vẽ tranh, tu sửa cây cối.", xau: "Kiện tụng, tranh chấp." },
    "Thu": { tot: "Cấy lúa, gặt lúa, mua trâu, nuôi tằm, đi săn thú cá, tu sửa cây cối. Động thổ, san nền đắp nền, nữ nhân khởi ngày uống thuốc chưa bệnh, lên quan lãnh chức, thừa kế chức tước hay sự nghiệp, vào làm hành chính, nộp đơn dâng sớ.", xau: "Bắt đầu công việc mới, kỵ đi du lịch, kỵ tang lễ." },
    "Khai": { tot: "Xuất hành, đi tàu thuyền, khởi tạo, động thổ, san nền đắp nền, dựng xây kho vựa, làm hay sửa phòng bếp, thờ cúng Táo Thần, đóng giường lót giường, may áo, lắp đặt cỗ máy dệt hay các loại máy, cấy lúa gặt lúa, đào ao giếng, tháo nước, các việc trong vụ chăn nuôi, mở thông hào rãnh, cầu thầy chữa bệnh, bốc thuốc, uống thuốc, mua trâu, làm rượu, nhập học, học kỹ nghệ, vẽ tranh, tu sửa cây cối.", xau: "An táng, Chôn cất" },
    "Bế": { tot: "Xây đắp tường, đặt táng, gắn cửa, kê gác, làm cầu. Khởi công lò nhuộm lò gốm, uống thuốc, trị bệnh (nhưng chớ trị bệnh mắt), tu sửa cây cối.", xau: "Lên quan nhậm chức, thừa kế chức tước hay sự nghiệp, nhập học, chữa bệnh mắt." }
  };

// ===== Nhị thập bát tú =====
  const NHI_THAP_BAT_TU = {
    "Giác": {
      tenNgay: "Giác Mộc Giao - Đặng Vũ",
      danhGia: "Tốt (Bình Tú)",
      tuongTinh: "Tướng tinh con Giao Long, chủ trị ngày thứ 5.",
      nenLam: "Mọi việc tạo tác đều đặng được vinh xương và tấn lợi. Việc hôn nhân hay cưới gả sinh con quý tử. Công danh thăng tiến, khoa cử đỗ đạt cao.",
      kiengCu: "Chôn cất hoạn nạn phải ba năm. Dù xây đắp mộ phần hay sửa chữa mộ phần ắt có người chết. Vì vậy, để tránh điềm giữ quý bạn nên chọn một ngày tốt khác để tiến hành chôn cất. Sinh con nhằm ngày Sao Giác chiếu thì sẽ khó nuôi. Tốt nhất đặt tên con theo tên của Sao nó mới được an toàn. Không dùng tên sao này có thể dùng tên Sao của tháng hay của năm cũng mang ý nghĩa tương đương.",
      ngoaiLe: "- Sao Giác trúng vào ngày Dần là Đăng Viên mang ý nghĩa được ngôi vị cao cả, hay mọi sự đều tốt đẹp.\n- Sao Giác trúng vào ngày Ngọ là Phục Đoạn Sát: rất kỵ trong việc chôn cất, thừa kế, chia lãnh gia tài, xuất hành và cả khởi công lò nhuộm hoặc lò gốm. Tuy nhiên sao Giác vào ngày này lại nên làm các việc như lấp hang lỗ, xây tường, dứt vú trẻ em, làm cầu tiêu, kết dứt điều hung hại.\n- Sao Giác trúng ngày Sóc tức là Diệt Một Nhật: không nên làm rượu, làm hành chính, lập lò gốm lò nhuộm cũng như thừa kế. Đặc biệt Đại Kỵ đi thuyền.\n- Giác: Mộc Giao (con cá sấu): tức là Mộc tinh, sao tốt. Ý nghĩa đỗ đạt, hôn nhân thành tựu. Đồng thời kỵ cải táng và hung táng.",
      tho: "Giác tinh tọa tác chủ vinh xương\nNgoại tiến điền tài cập nữ lang\nGiá thú hôn nhân sinh quý tử\nVăn nhân cập đệ kiến Quân vương\nDuy hữu táng mai bất khả dụng\nTam niên chi hậu, chủ ôn đậu"
    },
    "Cang": {
      tenNgay: "Cang Kim Long - Ngô Hán",
      danhGia: "Tốt (Bình Tú)",
      tuongTinh: "Tướng tinh con Rồng, chủ trị ngày thứ 6.",
      nenLam: "Công việc liên quan đến cắt may áo màn sẽ đặng nhiều lộc ăn.",
      kiengCu: "Chôn cất bị Trùng tang. Vì vậy, để tránh điềm giữ quý bạn nên chọn một ngày tốt khác để tiến hành chôn cất. Nếu cưới gả e rằng phòng không giá lạnh. Nếu tranh đấu kiện tụng thì lâm bại. Nếu khởi dựng nhà cửa chết con đầu. Trong 10 hoặc 100 ngày sau thì gặp họa, rồi từ đó lần lần tiêu hết ruộng đất, còn nếu làm quan bị cách chức. Sao Cang thuộc vào Thất Sát Tinh, nhằm ngày này sanh con ắt sẽ khó nuôi. Cho nên lấy tên của Sao để đặt cho con thì được yên lành.",
      ngoaiLe: "- Sao Cang nhằm vào ngày Rằm là Diệt Một Nhật: Cữ làm rượu, thừa kế sự nghiệp, lập lò gốm, lò nhuộm hay vào làm hành chính, thứ nhất đi thuyền chẳng khỏi nguy hại (vì Diệt Một có nghĩa là chìm mất).\n- Sao Cang tại Mùi, Hợi, Mẹo thì trăm việc đều tốt. Thứ nhất tại Mùi.\n- Sao Cang: Kim Long (con rồng): Kim tinh, sao xấu. Kỵ gả cưới và xây cất. Đề phòng dễ bị tai nạn.",
      tho: "Can tinh tạo tác Trưởng phòng đường,\nThập nhật chi trung chủ hữu ương,\nĐiền địa tiêu ma, quan thất chức,\nĐầu quân định thị hổ lang thương.\nGiá thú, hôn nhân dụng thử nhật,\nNhi tôn, Tân phụ chủ không phòng,\nMai táng nhược hoàn phùng thử nhật,\nĐương thời tai họa, chủ trùng tang."
    },
    "Đê": {
      tenNgay: "Đê Thổ Lạc - Giả Phục",
      danhGia: "Xấu (Hung Tú)",
      tuongTinh: "Tướng tinh con Lạc Đà, chủ trị ngày thứ 7.",
      nenLam: "Sao Đê đại hung, không hợp để làm bất kỳ công việc trọng đại nào.",
      kiengCu: "Không nên khởi công xây dựng, chôn cất, cưới gả và xuất hành. Kỵ nhất là đường thủy. Ngày này sinh con chẳng phải điềm lành nên làm âm đức cho con. Đây chỉ là liệt kê các việc Đại Kỵ, còn các việc khác vẫn nên kiêng cữ. Vì vậy, nếu quý bạn có dự định các công việc liên quan đến khởi công xây dựng, chôn cất, cưới gả và xuất hành quý bạn nên chọn một ngày tốt khác để thực hiện.",
      ngoaiLe: "- Đê Thổ Lạc tại: Thân, Tý và Thìn trăm việc đều tốt. Trong đó, Thìn là tốt hơn hết bởi Sao Đê Đăng Viên tại Thìn.\n- Đê Thổ Lạc (con nhím): Thổ tinh, sao xấu. Khắc kỵ các việc: khai trương, động thổ, chôn cất và xuất hành.",
      tho: "Đê tinh tạo tác chủ tai hung,\nPhí tận điền viên, thương khố không,\nMai táng bất khả dụng thử nhật,\nHuyền thằng, điếu khả, họa trùng trùng,\nNhược thị hôn nhân ly biệt tán,\nDạ chiêu lãng tử nhập phòng trung.\nHành thuyền tắc định tạo hướng một,\nCánh sinh lung ách, tử tôn cùng."
    },
    "Phòng": {
      tenNgay: "Phòng Nhật Thố - Cảnh Yêm",
      danhGia: "Tốt (Kiết Tú)",
      tuongTinh: "Tướng tinh con Thỏ, chủ trị ngày Chủ Nhật.",
      nenLam: "Mọi việc khởi công tạo tác đều tốt. Ngày này hợp nhất cho việc cưới gả, xuất hành, xây dựng nhà, chôn cất, đi thuyền, mưu sự, chặt cỏ phá đất và cả cắt áo.",
      kiengCu: "Sao Phòng là Đại Kiết Tinh nên không kỵ bất kỳ việc gì. Vì vậy, ngày này nên tiến hành các việc lớn đặc biệt là mua bán như nhà cửa, đất đai hay xe cộ được nhiều may mắn và thuận lợi.",
      ngoaiLe: "- Sao Phòng tại Đinh Sửu hay Tân Sửu đều tốt. Tại Dậu thì càng tốt hơn, vì Sao Phòng Đăng Viên tại Dậu.\n- Trong 6 ngày Kỷ Tỵ, Kỷ Dậu, Đinh Tỵ, Đinh Sửu, Quý Dậu, Tân Sửu Sao Phòng vẫn tốt với mọi việc khác. Ngoại trừ việc chôn cất là rất kỵ.\n- Sao Phòng nhằm vào ngày Tỵ là Phục Đoạn Sát: chẳng nên xuất hành, chôn cất, chia lãnh gia tài, thừa kế cũng như khởi công làm lò nhuộm, lò gốm. Tuy nhiên nên xây tường, lấp hang lỗ, dứt vú trẻ em, làm cầu tiêu, kết dứt điều hung hại.\n- Phòng Nhật Thố (con thỏ): Thái dương, sao tốt. Sao này hưng vượng về tài sản, thuận lợi trong cả việc chôn cất cũng như xây cất.",
      tho: "Phòng tinh tạo tác điền viên tiến,\nHuyết tài ngưu mã biến sơn cương,\nCánh chiêu ngoại xứ điền trang trạch,\nVinh hoa cao quý, phúc thọ khang.\nMai táng nhược nhiên phùng thử nhật,\nCao quan tiến chức bái Quân vương.\nGiá thú: Thường nga quy Nguyệt điện,\nTam niên bào tử chế triều đường."
    },
    "Tâm": {
      tenNgay: "Tâm Nguyệt Hồ - Khấu Tuân",
      danhGia: "Xấu (Hung Tú)",
      tuongTinh: "Tướng tinh con Chồn, chủ trị ngày thứ 2.",
      nenLam: "Hung tú này tạo tác bất kỳ việc chi cũng không hạp.",
      kiengCu: "Khởi công tạo tác việc chi cũng không tránh khỏi hại. Nhất là cưới gả, đóng giường, lót giường, xây cất, chôn cất và tranh tụng. Vì vậy, nên chọn một ngày tốt khác để tiến hành các việc trên, đặc biệt tránh cưới gả nhằm ngày này.",
      ngoaiLe: "- Ngày Dần Sao Tâm Đăng Viên, tốt khi dùng làm các việc nhỏ.\n- Tâm: Nguyệt Hồ (con chồn): Thái âm, sao xấu. Kỵ cưới gả, xây cất, thưa kiện. Kinh doanh ắt thua lỗ.",
      tho: "Tâm tinh tạo tác đại vi hung,\nCánh tao hình tụng, ngục tù trung,\nNgỗ nghịch quan phi, điền trạch thoái,\nMai táng tốt bộc tử tương tòng.\nHôn nhân nhược thị phùng thử nhật,\nTử tử nhi vong tự mãn hung.\nTam niên chi nội liên tạo họa,\nSự sự giáo quân một thủy chung."
    },
    "Vĩ": {
      tenNgay: "Vĩ Hỏa Hổ - Sầm Bành",
      danhGia: "Tốt (Kiết Tú)",
      tuongTinh: "Tướng tinh con Cọp, chủ trị ngày thứ 3.",
      nenLam: "Mọi việc đều tốt. Các vụ khởi tạo, chôn cất, trổ cửa, đào ao giếng, cưới gả, xây cất, khai mương rạch, các vụ thủy lợi, chặt cỏ phá đất là tốt nhất.",
      kiengCu: "Đóng giường, lót giường, đi thuyền, mua sắm. Vì vậy, ngày này không nên tiến hành mua sắm như ô tô, xe máy, nhà đất ...",
      ngoaiLe: "- Sao Vĩ Hỏa Hổ tại Mùi, Hợi, Mẹo (mão) khắc kỵ chôn cất. Tại Mùi là vị trí Hãm Địa của Sao Vỹ. Tại Kỷ Mẹo rất Hung, còn các ngày Mẹo khác có thể tạm dùng được.\n- Sao Vĩ: Hỏa Hổ (con cọp): Hỏa tinh, sao tốt. Mọi sự hưng vượng, thuận lợi trong việc xuất ngoại, xây cất, và hôn nhân.",
      tho: "Vĩ tinh tạo tác đắc thiên ân,\nPhú quý, vinh hoa, phúc thọ ninh,\nChiêu tài tiến bảo, tiến điền địa,\nHòa hợp hôn nhân, quý tử tôn.\nMai táng nhược năng y thử nhật,\nNam thanh, nữ chính, tử tôn hưng.\nKhai môn, phóng thủy, chiêu điền địa,\nĐại đại công hầu, viễn bá danh."
    },
    "Cơ": {
      tenNgay: "Cơ Thủy Báo - Phùng Dị",
      danhGia: "Tốt (Kiết Tú)",
      tuongTinh: "Tướng tinh con Beo, chủ trị ngày thứ 4.",
      nenLam: "Trăm việc khởi tạo đều tốt. Nhất là việc chôn cất, khai trương, xuất hành, tu bổ mồ mã, trổ cửa, các vụ thủy lợi (như tháo nước, khai thông mương rảnh, đào kênh,...)",
      kiengCu: "Các việc lót giường, đóng giường, đi thuyền.",
      ngoaiLe: "- Cơ Thủy Báo tại: Thân, Tý, Thìn trăm việc kỵ. Duy tại Tý có thể tạm dùng.\n- Ngày Thìn Sao Cơ Đăng Viên lẽ ra rất tốt tuy nhiên lại phạm Phục Đoạn. Bởi phạm Phục Đoạn thì rất kỵ xuất hành, chôn cất, chia lãnh gia tài, các vụ thừa kế, khởi công làm lò nhuộm lò gốm. Nên: dứt vú trẻ em, kết dứt điều hung hại, xây tường, lấp hang lỗ, làm cầu tiêu.\n- Cơ: Thủy Báo (con beo): Thủy tinh, sao tốt. Gia đình an lành, yên vui, vượng điền sản, đồng thời sự nghiệp thăng tiến.",
      tho: "Cơ tinh tạo tác chủ cao cường,\nTuế tuế niên niên đại cát xương,\nMai táng, tu phần đại cát lợi,\nĐiền tàm, ngưu mã biến sơn cương.\nKhai môn, phóng thủy chiêu tài cốc,\nKhiếp mãn kim ngân, cốc mãn thương.\nPhúc ấm cao quan gia lộc vị,\nLục thân phong lộc, phúc an khang."
    },
    "Đẩu": {
      tenNgay: "Đẩu Mộc Giải - Tống Hữu",
      danhGia: "Tốt (Kiết Tú)",
      tuongTinh: "Tướng tinh con cua, chủ trị ngày thứ 5.",
      nenLam: "Khởi tạo trăm việc đều rất tốt. Tốt nhất cho xây đắp, sửa chữa phần mộ, tháo nước, hay trổ cửa, các vụ thủy lợi, chặt cỏ phá đất, may cắt áo mão, hoặc kinh doanh, giao dịch, mưu cầu công danh.",
      kiengCu: "Rất kỵ việc đi thuyền. Nên đặt tên con là Đẩu, Giải hay Trại hoặc theo tên của Sao năm hay tháng đó để đặt sẽ dễ nuôi hơn.",
      ngoaiLe: "- Sao Đẩu Mộc Giải tại Tỵ mất sức. Tại Dậu thì tốt. Ngày Sửu Đăng Viên rất tốt nhưng phạm phải Phục Đoạn. Phạm Phục Đoạn thì kỵ việc chôn cất, thừa kế, chia lãnh gia tài, khởi công làm lò nhuộm lò gốm và xuất hành. Nên: dứt vú trẻ em, lấp hang lỗ, làm cầu tiêu, xây tường, kết dứt điều hung hại.\n- Đẩu: Mộc giải (con cua): Mộc tinh, sao tốt. Nên xây cất, sửa chữa, cưới gả và an táng đều tốt.",
      tho: "Đẩu tinh tạo tác chủ chiêu tài,\nVăn vũ quan viên vị đỉnh thai,\nĐiền trạch tiền tài thiên vạn tiến,\nPhần doanh tu trúc, phú quý lai.\nKhai môn, phóng thủy, chiêu ngưu mã,\nVượng tài nam nữ chủ hòa hài,\nNgộ thử cát tinh lai chiến hộ,\nThời chi phúc khánh, vĩnh vô tai."
    },
    "Ngưu": {
      tenNgay: "Ngưu Kim Ngưu - Sái Tuân",
      danhGia: "Xấu (Hung Tú)",
      tuongTinh: "Tướng tinh con Trâu, chủ trị ngày thứ 6.",
      nenLam: "Rất tốt đi thuyền, cắt may áo mão.",
      kiengCu: "Khởi công tạo tác bất kỳ việc gì cũng gặp hung hại. Nhất là việc dựng trại, xây cất nhà, trổ cửa, cưới gả, xuất hành đường bộ, làm thủy lợi, nuôi tằm, gieo cấy, khai khẩn cũng như khai trương. Vì vậy, ngày này không nên tiến hành các công việc trọng đại, nên chọn một ngày tốt khác để tiến hành.",
      ngoaiLe: "- Ngày Ngọ Đăng Viên rất tốt. Ngày Tuất thì yên lành. Ngày Dần là Tuyệt Nhật, không nên động tác việc chi, riêng có ngày Nhâm Dần thì dùng được.\n- Trúng ngày 14 Âm lịch là Diệt Một Sát, kiêng cữ: lập lò nhuộm lò gốm, làm rượu, thừa kế sự nghiệp, vào làm hành chánh, nhất là đi thuyền chẳng thể tránh khỏi rủi ro.\n- Sao Ngưu là một trong Thất Sát Tinh, nếu sanh con thì khó nuôi. Lấy tên Sao tháng, của năm hay của ngày để đặt tên cho con kết hợp làm việc Âm Đức ngay trong tháng sinh mới mong nuôi con khôn lớn được.\n- Ngưu: Kim Ngưu (con trâu): Kim tinh, sao xấu. Kỵ xây cất, hôn nhân.",
      tho: "Ngưu tinh tạo tác chủ tai nguy,\nCửu hoành tam tai bất khả thôi,\nGia trạch bất an, nhân khẩu thoái,\nĐiền tàm bất lợi, chủ nhân suy.\nGiá thú, hôn nhân giai tự tổn,\nKim ngân tài cốc tiệm vô chi.\nNhược thị khai môn, tính phóng thủy,\nNgưu trư dương mã diệc thương bi."
    },
    "Nữ": {
      tenNgay: "Nữ Thổ Bức - Cảnh Đan",
      danhGia: "Xấu (Hung Tú)",
      tuongTinh: "Tướng tinh con Dơi, chủ trị ngày thứ 7.",
      nenLam: "Hợp kết màn hay may áo.",
      kiengCu: "Khởi công tạo tác trăm việc đều có hại. Trong đó hung hại nhất là khơi đường tháo nước, trổ cửa, đầu đơn kiện cáo, chôn cất. Vì vậy, để tránh điềm giữ quý bạn nên chọn một ngày tốt khác để tiến hành chôn cất.",
      ngoaiLe: "- Sao Nữ Thổ Bức tại Mùi, Hợi, Mẹo (mão) đều gọi chung là đường cùng. Ngày Quý Hợi cùng cực đúng mức, vì là ngày chót của 60 Hoa giáp. Ngày Hợi tuy Sao Nữ Đăng Viên song tốt nhất cũng chẳng nên dùng.\n- Ngày Mẹo là Phục Đoạn Sát, rất kỵ trong việc chôn cất, thừa kế sự nghiệp, xuất hành, khởi công làm lò nhuộm lò gốm, chia lãnh gia tài. Nên: dứt vú trẻ em, lấp hang lỗ, làm cầu tiêu, kết dứt điều hung hại, xây tường.\n- Nữ: Thổ Bức (con dơi): Thổ tinh, sao xấu. Khắc kỵ chôn cất cũng như cưới gả. Sao này bất lợi khi sinh đẻ.",
      tho: "Nữ tinh tạo tác tổn bà nương,\nHuynh đệ tương hiềm tựa hổ lang,\nMai táng sinh tai phùng quỷ quái,\nĐiên tà tật bệnh cánh ôn hoàng.\nVi sự đáo quan, tài thất tán,\nTả lị lưu liên bất khả đương.\nKhai môn, phóng thủy phùng thử nhật,\nToàn gia tán bại, chủ ly hương."
    },
    "Hư": {
      tenNgay: "Hư Nhật Thử - Cái Duyên",
      danhGia: "Xấu (Hung Tú)",
      tuongTinh: "Tướng tinh con Chuột, chủ trị ngày Chủ Nhật.",
      nenLam: "Hư có ý nghĩa là hư hoại. Sao Hư mang ý nghĩa không có việc chi hợp.",
      kiengCu: "Tạo tác khởi công trăm việc đều không may. Nhất là việc xây cất nhà cửa, khai trương, cưới gả, trổ cửa, đào kênh rạch hay tháo nước. Vì vậy, nếu quý bạn muốn tiến hành các việc động thổ, xây cất nhà, cưới hỏi,... nên chọn một ngày đại cát khác để thực hiện.",
      ngoaiLe: "- Sao Hư gặp Thân, Tý hay Thìn đều tốt. Tại Thìn Đắc Địa tốt hơn hết. 6 ngày: Giáp Tý, Canh Tý, Mậu Thân, Canh Thân, Bính Thìn, Mậu Thìn rất hợp có thể động sự. Trừ ngày Mậu Thìn ra, còn 5 ngày còn lại kỵ chôn cất.\n- Sao Hư gặp ngày Tý thì Sao Hư Đăng Viên rất tốt. Tuy nhiên lại phạm Phục Đoạn Sát nên Kỵ thừa kế, chia lãnh gia tài sự nghiệp, chôn cất, xuất hành, khởi công làm lò nhuộm lò gốm. Nên: dứt vú trẻ em, kết dứt điều hung hại, lấp hang lỗ, xây tường, làm cầu tiêu.\n- Gặp Huyền Nhật (những ngày 7, 8, 22, 23 Âm Lịch) thì Sao Hư phạm Diệt Một: ắt chẳng tránh khỏi rủi ro nếu lập lò gốm lò nhuộm, thừa kế. Kiêng cữ: làm rượu, vào làm hành chánh, hơn nhất là đi thuyền.\n- Hư: Nhật Thử (con chuột): Nhật tinh, sao xấu. Khắc kỵ xây cất. Gia đạo dễ gặp bất hòa.",
      tho: "Hư tinh tạo tác chủ tai ương,\nNam nữ cô miên bất nhất song,\nNội loạn phong thanh vô lễ tiết,\nNhi tôn, tức phụ bạn nhân sàng,\nKhai môn, phóng thủy chiêu tai họa,\nHổ giảo, xà thương cập tốt vong.\nTam tam ngũ ngũ liên niên bệnh,\nGia phá, nhân vong, bất khả đương."
    },
    "Nguy": {
      tenNgay: "Nguy Nguyệt Yến - Kiên Đàm",
      danhGia: "Xấu (Bình Tú)",
      tuongTinh: "Tướng tinh con Chim Én, chủ trị ngày thứ 2.",
      nenLam: "Lót giường bình yên, chôn cất rất tốt.",
      kiengCu: "Những việc gác đòn đông, dựng nhà, tháo nước, đào mương rạch, đi thuyền hay trổ cửa. Vì vậy, nếu quý bạn có ý định xây dựng nhà cửa thì nên chọn ngày khác để tiến hành.",
      ngoaiLe: "- Sao Nguy Nguyệt Yến tại Tỵ, Dậu và Sửu trăm việc đều tốt. Trong đó, tại Dậu tốt nhất. Ngày Sửu Sao Nguy Đăng Viên: mọi việc tạo tác đều được quý hiển.\n- Nguy: Nguyệt Yến (con én): Nguyệt tinh, sao xấu. Khắc kỵ việc khai trương, an táng và xây dựng.",
      tho: "Nguy tinh bât khả tạo cao đường,\nTự điếu, tao hình kiến huyết quang\nTam tuế hài nhi tao thủy ách,\nHậu sinh xuất ngoại bất hoàn lương.\nMai táng nhược hoàn phùng thử nhật,\nChu niên bách nhật ngọa cao sàng,\nKhai môn, phóng thủy tạo hình trượng,\nTam niên ngũ tái diệc bi thương."
    },
    "Thất": {
      tenNgay: "Thất Hỏa Trư - Cảnh Thuần",
      danhGia: "Tốt (Kiết Tú)",
      tuongTinh: "Tướng tinh con Heo, chủ trị ngày thứ 3.",
      nenLam: "Khởi công trăm việc đều đặng tốt. Tốt nhất là tháo nước, các việc thủy lợi, việc đi thuyền, xây cất nhà cửa, trổ cửa, cưới gả, chôn cất hay chặt cỏ phá đất.",
      kiengCu: "Sao Thất Đại Kiết nên không có bất kỳ việc gì phải cữ.",
      ngoaiLe: "- Sao Thất Đại Kiết tại Ngọ, Tuất và Dần nói chung đều tốt, đặc biệt ngày Ngọ Đăng viên rất hiển đạt.\n- Ba ngày là: Bính Dần, Nhâm Dần và Giáp Ngọ tốt cho xây dựng, chôn cất, song cũng ngày Dần nhưng ngày Dần khác lại không tốt. Bởi sao Thất gặp ngày Dần là phạm vào Phục Đoạn Sát (mọi kiêng cữ như trên).\n- Thất: Hỏa Trư (con lợn): Hỏa tinh, sao tốt. Rất tốt cho việc kinh doanh, hôn nhân, xây cất và chôn cất.",
      tho: "Thất tinh tạo tác tiến điền ngưu,\nNhi tôn đại đại cận quân hầu,\nPhú quý vinh hoa thiên thượng chỉ,\nThọ như Bành tổ nhập thiên thu.\nKhai môn, phóng thủy chiêu tài bạch,\nHòa hợp hôn nhân sinh quý nhi.\nMai táng nhược năng y thử nhật,\nMôn đình hưng vượng, Phúc vô ưu!"
    },
    "Bích": {
      tenNgay: "Bích Thủy Du - Tang Cung",
      danhGia: "Tốt (Kiết Tú)",
      tuongTinh: "Tướng tinh con Rái Cá, chủ trị ngày thứ 4.",
      nenLam: "Khởi công tạo tác mọi việc việc chi cũng tốt. Tốt nhất là việc khai trương, xuất hành, chôn cất, xây cất nhà, trổ cửa, dựng cửa, cưới gả, các vụ thuỷ lợi, tháo nước, chặt cỏ phá đất, cắt áo thêu áo, làm nhiều việc thiện ắt thiện quả sẽ tới mau hơn.",
      kiengCu: "Sao Bích toàn kiết nên không có bất kỳ việc chi phải kiêng cữ.",
      ngoaiLe: "- Sao Bích Thủy Du tại Mùi, Hợi, Mão trăm việc đều kỵ, nhất là trong Mùa Đông. Riêng ngày Hợi là Sao Bích Đăng Viên nhưng phạm phải Phục Đoạn Sát (nên kiêng cữ như trên).\n- Bích: Thủy Du (con rái cá): Thủy tinh, sao tốt. Rất tốt cho những việc như: xây cất, mai táng, hôn nhân. Kinh doanh đặc biệt thuận lợi.",
      tho: "Bích tinh tạo ác tiến trang điền\nTi tâm đại thục phúc thao thiên,\nNô tỳ tự lai, nhân khẩu tiến,\nKhai môn, phóng thủy xuất anh hiền,\nMai táng chiêu tài, quan phẩm tiến,\nGia trung chủ sự lạc thao nhiên\nHôn nhân cát lợi sinh quý tử,\nTảo bá thanh danh khán tổ tiên."
    },
    "Khuê": {
      tenNgay: "Khuê Mộc Lang - Mã Vũ",
      danhGia: "Xấu (Bình Tú)",
      tuongTinh: "Tướng tinh con Chó Sói, chủ trị ngày thứ 5.",
      nenLam: "Tốt cho nhập học, cắt áo, tạo dựng nhà phòng hay ra đi cầu công danh.",
      kiengCu: "Chôn cất, trổ cửa dựng cửa, khai thông đường nước, việc khai trương, đào ao móc giếng, các vụ thưa kiện và đóng giường lót giường. Vì vậy, nếu quý bạn có ý định chôn cất người chết hay khai trường lập nghiệp thì nên chọn một ngày khác để tiến hành.",
      ngoaiLe: "- Sao Khuê là một trong Thất Sát Tinh, nếu đẻ con nhằm ngày này thì nên lấy tên của Sao Khuê cũng có thể lấy tên Sao của năm hay tháng mà đặt cho con dễ nuôi hơn.\n- Sao Khuê Hãm Địa tại Thân nên Văn Khoa thất bại. Tại Ngọ thì chỗ Tuyệt gặp Sanh đắc lợi mưu sự, nhất là gặp Canh Ngọ. Tại Thìn thì tốt vừa vừa.\n- Ngày Thân Sao Khuê Đăng Viên tức Tiến thân danh.\nKhuê: Mộc Lang (con sói): Mộc tinh, sao xấu. Khắc kỵ động thổ, an táng, khai trương cũng như sửa cửa.",
      tho: "Khuê tinh tạo tác đắc trinh tường,\nGia hạ vinh hòa đại cát xương,\nNhược thị táng mai âm tốt tử,\nĐương niên định chủ lưỡng tam tang.\nKhán khán vận kim, hình thương đáo,\nTrùng trùng quan sự, chủ ôn hoàng.\nKhai môn phóng thủy chiêu tai họa,\nTam niên lưỡng thứ tổn nhi lang."
    },
    "Lâu": {
      tenNgay: "Lâu Kim Cẩu - Lưu Long",
      danhGia: "Tốt (Kiết Tú)",
      tuongTinh: "Tướng tinh con Chó, chủ trị ngày thứ 6.",
      nenLam: "Khởi công mọi việc đều rất tốt. Tốt nhất là việc dựng cột, cưới gả, trổ cửa, dựng cửa, cất lầu, làm giàn gác, cắt áo, tháo nước hay các vụ thủy lợi.",
      kiengCu: "Nhất là lót giường, đóng giường và đi đường thủy.",
      ngoaiLe: "- Sao Lâu Kim Cẩu tại Ngày Dậu Đăng Viên ý nghĩa tạo tác đại lợi. Tại Tỵ gọi là Nhập Trù nên rất tốt. Tại Sửu thì tốt vừa vừa.\n- Gặp ngày cuối tháng thì Sao Lâu phạm Diệt Một: Kỵ cữ làm rượu, vào làm hành chánh, lập lò gốm lò nhuộm, thừa kế sự nghiệp và rất kỵ đi thuyền.\n- Lâu: Kim Cẩu (con chó): Kim tinh, sao tốt. Tiền bạc thì dồi dào, học hành đỗ đạt cao, việc cưới gả, xây cất rất tốt.",
      tho: "Lâu tinh thụ trụ, khởi môn đình,\nTài vượng, gia hòa, sự sự hưng,\nNgoại cảnh, tiền tài bách nhật tiến,\nNhất gia huynh đệ bá thanh danh.\nHôn nhân tiến ích, sinh quý tử,\nNgọc bạch kim lang tương mãn doanh,\nPhóng thủy, khai môn giai cát lợi,\nNam vinh, nữ quý, thọ khang ninh."
    },
    "Vị": {
      tenNgay: "Vị Thổ Trĩ - Cảnh Đan",
      danhGia: "Tốt (Kiết Tú)",
      tuongTinh: "Tướng tinh con Chim Trĩ, chủ trị ngày thứ 7.",
      nenLam: "Khởi tạo tạo tác việc gì cũng tốt. Tốt nhất là cưới gả, xây cất, dọn cỏ, gieo trồng, lấy giống.",
      kiengCu: "Đi thuyền",
      ngoaiLe: "Sao Vị mất chí khí tại ngày Dần, nhất là ngày Mậu Dần, rất hung, không nên cưới gả, xây cất nhà cửa. Gặp ngày Tuất sao Vị đăng viên nên mưu cầu công danh tốt, nhưng cũng phạm Phục Đoạn, do đó gặp ngày này nên kỵ chôn cất, xuất hành, cưới gả, xây cất...",
      tho: "Vị tinh tạo tác sự như hà,\nPhú quý, vinh hoa, hỷ khí đa,\nMai táng tiến lâm quan lộc vị,\nTam tai, cửu họa bất phùng tha.\nHôn nhân ngộ thử gia phú quý,\nPhu phụ tề mi, vĩnh bảo hòa,\nTòng thử môn đình sinh cát khánh,\nNhi tôn đại đại bảo kim pha."
    },
    "Mão": {
      tenNgay: "Mão Nhật Kê - Vương Lương",
      danhGia: "Xấu (Hung Tú)",
      tuongTinh: "Tướng tinh con Gà, chủ trị ngày Chủ Nhật.",
      nenLam: "Xây dựng cũng như tạo tác đều tốt.",
      kiengCu: "Chôn Cất thì ĐẠI KỴ. Cưới gã, khai ngòi phóng thủy, khai trương, xuất hành, đóng giường lót giường, trổ cửa dựng cửa kỵ. Các việc khác đều không hay. Vì vậy, ngày này tuyệt đối không tiến hành chôn cất người chết.",
      ngoaiLe: "- Sao Mão Nhật Kê tại Mùi thì mất chí khí. Tại Ất Mão hay Đinh Mão rất tốt. Ngày Mão Đăng Viên nên cưới gả tốt, ngày Quý Mão nếu tạo tác thì mất tiền của.\n- Hợp với 8 ngày là Ất Mùi, Đinh Mùi, Tân Mùi, Ất Mão, Đinh Mão, Tân Mão, Ất Hợi và Tân Hợi.\n- Mão: Nhật Kê (con gà): Nhật tinh, sao xấu. Tốt nhất cho việc xây cất. Khắc kỵ việc cưới gả, an táng, gắn cũng như sửa cửa.",
      tho: "Mão tinh tạo tác tiến điền ngưu,\nMai táng quan tai bất đắc hưu,\nTrùng tang nhị nhật, tam nhân tử,\nMại tận điền viên, bất năng lưu.\nKhai môn, phóng thủy chiêu tai họa,\nTam tuế hài nhi bạch liễu đầu,\nHôn nhân bất khả phùng nhật thử,\nTử biệt sinh ly thật khả sầu."
    },
    "Tất": {
      tenNgay: "Tất Nguyệt Ô - Trần Tuấn",
      danhGia: "Tốt (Kiết Tú)",
      tuongTinh: "Tướng tinh con Quạ, chủ trị ngày thứ 2.",
      nenLam: "Khởi công tạo tác bất kể việc chi đều tốt. Tốt nhất là việc trổ cửa dựng cửa, đào kinh, tháo nước, khai mương, chôn cất, cưới gả, chặt cỏ phá đất hay móc giếng. Những việc khác như khai trương, xuất hành, nhập học, làm ruộng và nuôi tằm cũng tốt.",
      kiengCu: "Việc đi thuyền.",
      ngoaiLe: "- Sao Tất Nguyệt Ô tại Thìn, Thân và Tý đều tốt. Tại Thân hiệu là Nguyệt Quải Khôn Sơn, tức là trăng treo đầu núi Tây Nam nên rất là tốt. Sao Tất Đăng Viên ở ngày Thân việc cưới gả hay chôn cất là 2 việc ĐẠI KIẾT.\n- Tất: Nguyệt Ô (con quạ): Nguyệt tinh, sao tốt. Trăm việc đều được tốt đẹp.",
      tho: "Tất tinh tạo tác chủ quang tiền,\nMãi dắc điền viên hữu lật tiền\nMai táng thử nhật thiêm quan chức,\nĐiền tàm đại thực lai phong niên\nKhai môn phóng thủy đa cát lật,\nHợp gia nhân khẩu đắc an nhiên,\nHôn nhân nhược năng phùng thử nhật,\nSinh đắc hài nhi phúc thọ toàn."
    },
    "Chủy": {
      tenNgay: "Chủy Hỏa Hầu - Phó Tuấn",
      danhGia: "Xấu (Hung Tú)",
      tuongTinh: "Tướng tinh con Khỉ, chủ trị ngày thứ 3.",
      nenLam: " Sao Chủy không nên làm bất kỳ việc chi.",
      kiengCu: "Khởi công tạo tác việc chi cũng không tốt. KỴ NHẤT là chôn cất và các vụ thuộc về chết chôn như sửa đắp mồ mả, làm sanh phần (làm mồ mã để sẵn), đóng thọ đường (đóng hòm để sẵn). Ngày này tuyệt đối không tiến hành chôn cất người chết để tránh gặp điềm dữ.",
      ngoaiLe: "- Sao Chủy Hỏa Hầu tại Tỵ bị đoạt khí, còn Hung thì càng thêm Hung. Tại Dậu rất tốt, vì Sao Chủy Đăng Viên ở Dậu đem khởi động và thăng tiến. Tuy nhiên phạm vào Phục Đoạn Sát (mọi kiêng cữ giống như trên).\n- Tại Sửu là Đắc Địa, mọi việc ắt nên. Rất hợp với ngày Đinh Sửu và ngày Tân Sửu mọi tạo tác Đại Lợi, nếu chôn cất Phú Quý song toàn.\n- Chủy: Hỏa Hầu (con khỉ): Hỏa tinh, sao xấu. Khắc Kỵ xây cất, thưa kiện, hay mai táng. Thi cử gặp nhiều bất lợi.",
      tho: "Chủy tinh tạo tác hữu đồ hình,\nTam niên tất đinh chủ linh đinh,\nMai táng tốt tử đa do thử,\nThủ định Dần niên tiện sát nhân.\nTam tang bất chỉ giai do thử,\nNhất nhân dược độc nhị nhân thân.\nGia môn điền địa giai thoán bại,\nThương khố kim tiền hóa tác cần."
    },
    "Sâm": {
      tenNgay: "Sâm Thủy Viên - Đỗ Mậu",
      danhGia: "Tốt (Bình Tú)",
      tuongTinh: "Tướng tinh con Vượn, chủ trị ngày thứ 4.",
      nenLam: "Nhiều việc khởi công tạo tác tốt như: dựng cửa trổ cửa, xây cất nhà, nhập học, làm thủy lợi, tháo nước đào mương hay đi thuyền.",
      kiengCu: "Cưới gả, đóng giường lót giường, chôn cất hay kết bạn đều không tốt. Vì vậy, để việc cưới gả được trăm điềm tốt quý bạn nên chọn một ngày khác để tiến hành.",
      ngoaiLe: "- Ngày Tuất Sao Sâm Đăng Viên, nên phó nhậm đặng cầu công danh hiển hách.\n- Sâm: Thủy Viên (con vượn): Thủy tinh, sao tốt. Rất tốt cho việc mua bán, kinh doanh, xây cất và thi cử đỗ đạt. Kỵ an táng và cưới gả.",
      tho: "Sâm tinh tạo tác vượng nhân gia,\nVăn tinh triều diệu, đại quang hoa,\nChỉ nhân tạo tác điền tài vượng,\nMai táng chiêu tật, táng hoàng sa.\nKhai môn, phóng thủy gia quan chức,\nPhòng phòng tôn tử kiến điền gia,\nHôn nhân hứa định tao hình khắc,\nNam nữ chiêu khai mộ lạc hoa."
    },
    "Tỉnh": {
      tenNgay: "Tỉnh Mộc Hãn - Diêu Kỳ",
      danhGia: "Tốt (Bình Tú)",
      tuongTinh: "Tướng tinh con Dê Trừu, chủ trị ngày thứ 5.",
      nenLam: "Tạo tác nhiều việc rất tốt như trổ cửa dựng cửa, mở thông đường nước, đào mương móc giếng, đi thuyền, xây cất, nhậm chức hoặc nhập học.",
      kiengCu: "Làm sanh phần, đóng thọ đường, chôn cất hay tu bổ mộ phần.",
      ngoaiLe: "- Sao Tỉnh Mộc Hãn tại Mùi, Hợi, Mão mọi việc tốt. Tại Mùi là Nhập Miếu nên khởi động vinh quang.\n- Tỉnh: Mộc Can (con chim cú): Mộc tinh, sao tốt. Sự nghiệp công danh thành đạt, thăng tiến, việc chăn nuôi và xây cất thuận lợi vô cùng.",
      tho: "Tỉnh tinh tạo tác vượng tàm điền,\nKim bảng đề danh đệ nhất tiên,\nMai táng, tu phòng kinh tốt tử,\nHốt phong tật nhập hoàng điên tuyền\nKhai môn, phóng thủy chiêu tài bạch,\nNgưu mã trư dương vượng mạc cát,\nQuả phụ điền đường lai nhập trạch,\nNhi tôn hưng vượng hữu dư tiền."
    },
    "Quỷ": {
      tenNgay: "Quỷ Kim Dương - Vương Phách",
      danhGia: "Xấu (Hung Tú)",
      tuongTinh: "Tướng tinh con Dê, chủ trị ngày thứ 6.",
      nenLam: "Việc chôn cất, chặt cỏ phá đất hoặc cắt áo đều tốt.",
      kiengCu: "Khởi tạo bất kể việc chi cũng hại. Hại nhất là trổ cửa dựng cửa, tháo nước, việc đào ao giếng, xây cất nhà, cưới gả, động đất, xây tường và dựng cột. Vì vậy, nếu quý bạn đang có ý định động thổ xây nhà hay cưới hỏi thì nên chọn một ngày khác để tiến hành.",
      ngoaiLe: "- Ngày Tý Đăng Viên thừa kế tước phong rất tốt, đồng thời phó nhiệm may mắn.\n- Ngày Thân là Phục Đoạn Sát kỵ những việc thừa kế, chia lãnh gia tài, chôn cất, việc xuất hành, khởi công lập lò gốm, lò nhuộm. Nên: dứt vú trẻ em, xây tường, kết dứt điều hung hại, lấp hang lỗ, làm cầu tiêu.\n- Nhằm ngày 16 Âm Lịch là ngày Diệt Một kỵ lập lò gốm, lò nhuộm, vào làm hành chính, làm rượu, kỵ nhất là đi thuyền.\n- Quỷ: Kim Dương (con dê): Kim tinh, sao xấu. chôn cất thuận lợi trong việc. Ngược lại bất lợi cho việc xây cất và gả cưới.",
      tho: "Quỷ tinh khởi tạo tất nhân vong,\nĐường tiền bất kiến chủ nhân lang,\nMai táng thử nhật, quan lộc chí,\nNhi tôn đại đại cận quân vương.\nKhai môn phóng thủy tu thương tử,\nHôn nhân phu thê bất cửu trường.\nTu thổ trúc tường thương sản nữ,\nThủ phù song nữ lệ uông uông."
    },
    "Liễu": {
      tenNgay: "Liễu Thổ Chương - Nhậm Quang",
      danhGia: "Xấu (Hung Tú)",
      tuongTinh: "Tướng tinh con Gấu Ngựa, chủ trị ngày thứ 7.",
      nenLam: "Không có việc gì tốt.",
      kiengCu: "Khởi công tạo tác việc chi cũng rất bất lợi, hung hại. Hung hại nhất là làm thủy lợi như trổ tháo nước, đào ao lũy, chôn cất, việc sửa cửa dựng cửa, xây đắp. Vì vậy, ngày nay không nên tiến hành bất cứ việc trọng đại gì.",
      ngoaiLe: "- Sao Liễu Thổ Chướng tại Ngọ trăm việc đều tốt. Tại Tỵ thì Đăng Viên: thừa kế hay lên quan lãnh chức đều là hai điều tốt nhất. Tại Dần, Tuất rất suy vi nên kỵ xây cất và chôn cất.\n- Liễu: Thổ Chướng (con cheo): Thổ tinh, sao xấu. Tiền bạc thì hao hụt, gia đình thì không yên, dễ bị tai nạn. Khắc kỵ cưới gả.",
      tho: "Liễu tinh tạo tác chủ tao quan,\nTrú dạ thâu nhàn bất tạm an,\nMai táng ôn hoàng đa bệnh tử,\nĐiền viên thoái tận, thủ cô hàn,\nKhai môn phóng thủy chiêu lung hạt,\nYêu đà bối khúc tự cung loan.\nCánh hữu bổng hình nghi cẩn thận,\nPhụ nhân tùy khách tẩu bất hoàn."
    },
    "Tinh": {
      tenNgay: "Tinh Nhật Mã - Lý Trung",
      danhGia: "Xấu (Bình Tú)",
      tuongTinh: "Tướng tinh con Ngựa, chủ trị ngày Chủ Nhật.",
      nenLam: "Xây dựng phòng mới.",
      kiengCu: "Chôn cất, cưới gả, mở thông đường nước.",
      ngoaiLe: "- Sao Tinh là một trong Thất Sát Tinh, nếu sinh con nhằm ngày này nên lấy tên Sao đặt tên cho trẻ để dễ nuôi, có thể lấy tên sao của năm, hay sao của tháng cũng được.\n- Sao Tinh gặp ngày Dần, Ngọ, Tuất đều tốt. Gặp ngày Thân là Đăng Giá (lên xe): xây cất tốt mà chôn cất nguy.\n- Hợp với 7 ngày: Giáp Dần, Nhâm Dần, Giáp Ngọ, Bính Ngọ, Mậu Ngọ, Bính Tuất, Canh Tuất.",
      tho: "Tinh tú nhật hảo tạo tân phòng,\nTiến chức gia quan cận Đế vương,\nBất khả mai táng tính phóng thủy,\nHung tinh lâm vị nữ nhân vong.Sinh ly, tử biệt vô tâm luyến,\nTự yếu quy hưu biệt giá lang.\nKhổng tử cửu khúc châu nan độ,\nPhóng thủy, khai câu, thiên mệnh thương."
    },
    "Trương": {
      tenNgay: "Trương Nguyệt Lộc - Vạn Tu",
      danhGia: "Tốt (Kiết Tú)",
      tuongTinh: "Tướng tinh con Nai, chủ trị ngày thứ 2.",
      nenLam: "Khởi công tạo tác trăm việc đều tốt. Trong đó, tốt nhất là che mái dựng hiên, xây cất nhà, trổ cửa dựng cửa, cưới gả, chôn cất, hay làm ruộng, nuôi tằm , làm thuỷ lợi, đặt táng kê gác, chặt cỏ phá đất, cắt áo cũng đều rất tốt.",
      kiengCu: "Sửa hay làm thuyền chèo, hoặc đẩy thuyền mới xuống nước.",
      ngoaiLe: "- Tại Mùi, Hợi, Mão đều tốt. Tại Mùi: đăng viên rất tốt nhưng phạm vào Phục Đoạn (Kiêng cữ như trên).\n- Trương: Nguyệt Lộc (con nai): Nguyệt tinh, sao tốt. Việc mai táng và hôn nhân thuận lợi.",
      tho: "Trương tinh nhật hảo tạo long hiên,/nNiên niên tiện kiến tiến trang điền,/n- Mai táng bất cửu thăng quan chức,/nĐại đại vi quan cận Đế tiền,/nKhai môn phóng thủy chiêu tài bạch,/nHôn nhân hòa hợp, phúc miên miên./nĐiền tàm đại lợi, thương khố mãn,/nBách ban lợi ý, tự an nhiên."
    },
    "Dực": {
      tenNgay: "Dực Hỏa Xà - Bi Đồng",
      danhGia: "Xấu (Hung Tú)",
      tuongTinh: "Tướng tinh con Rắn, chủ trị ngày thứ 3.",
      nenLam: "Nếu cắt áo sẽ đặng được tiền tài.",
      kiengCu: "Những việc như chôn cất, xây cất nhà, đặt táng kê gác, gác đòn đông, cưới gã, trổ cửa gắn cửa, các việc thủy lợi. Vì vậy, nếu quý bạn đang muốn tiến hành các việc trên thì nên chọn một ngày đại cát trong tháng để thực hiện.",
      ngoaiLe: "Sao Dực Hỏa Xà tại Thân, Tý, Thìn mọi việc rất tốt. Tại Thìn: Vượng Địa là tốt hơn hết. Tại Tý: Đăng Viên rất tốt nên thừa kế sự nghiệp hay lên quan lãnh chức.\n- Dực: Hỏa Xà (con rắn): Hỏa tinh, sao xấu. Khắc kỵ cưới gả, dựng nhà, hay chôn cất.",
      tho: "Dực tinh bất lợi giá cao đường,/nTam niên nhị tái kiến ôn hoàng,/nMai táng nhược hoàn phùng thử nhật,/nTử tôn bất định tẩu tha hương./nHôn nhân thử nhật nghi bất lợi,/nQuy gia định thị bất tương đương./nKhai môn phóng thủy gia tu phá,/nThiếu nữ tham hoa luyến ngoại lang."
    },
    "Chẩn": {
      tenNgay: "Chẩn Thủy Dẫn - Lưu Trực",
      danhGia: "Tốt (Kiết Tú)",
      tuongTinh: "Tướng tinh con Giun, chủ trị ngày thứ 4.",
      nenLam: "Mọi việc khởi công tạo tác rất tốt lành. Tốt nhất là cưới gả, xây cất lầu gác và chôn cất. Các việc khác như xuất hành, dựng phòng, chặt cỏ phá đất, cất trại, cũng tốt.",
      kiengCu: "Việc đi thuyền.",
      ngoaiLe: "- Sao Chẩn Thủy Dẫn tại Tỵ, Dậu, Sửu đều rất tốt. Tại Sửu: Vượng Địa, tạo tác được thịnh vượng. Tại Tỵ: Đăng Viên là ngôi tôn đại, trăm mưu động ắt thành danh.\n- Chẩn: Thủy Dẫn (con trùng): Thủy tinh, sao tốt. Tốt cho những việc gả cưới, xây dựng cũng như an táng.",
      tho: "Chẩn tinh lâm thủy tạo long cung,\nĐại đại vi quan thụ sắc phong,\nPhú quý vinh hoa tăng phúc thọ,\nKhố mãn thương doanh tự xương long.\nMai táng văn tinh lai chiếu trợ,\nTrạch xá an ninh, bất kiến hung.\nCánh hữu vi quan, tiên đế sủng,\nHôn nhân long tử xuất long cung."
    }
  };

// ===== Ngũ hành nạp âm (60 hoa giáp) =====
  const NGAY_THONG_TIN = {
    "Giáp Tý": { moTa: "Ngày: Giáp Tý - tức Chi sinh Can (Thủy sinh Mộc), ngày này là ngày cát (nghĩa nhật).", chiTiet: ["- Nạp âm: Ngày Hải Trung Kim, kỵ các tuổi: Mậu Ngọ và Nhâm Ngọ.","- Ngày này thuộc hành Kim khắc với hành Mộc, ngoại trừ các tuổi: Mậu Tuất vì Kim khắc nên được lợi.","- Ngày Tý lục hợp với Sửu, tam hợp với Thìn và Thân thành Thủy cục. Xung Ngọ, hình Mão, hại Mùi, phá Dậu, tuyệt Tỵ."] },
    "Ất Sửu": { moTa: "Ngày: Ất Sửu - tức Can khắc Chi (Mộc khắc Thổ), ngày này là ngày cát trung bình (chế nhật).", chiTiet: ["- Nạp âm: Ngày Hải Trung Kim, kỵ các tuổi: Kỷ Mùi và Quý Mùi.","- Ngày này thuộc hành Kim khắc với hành Mộc, ngoại trừ các tuổi: Kỷ Hợi vì Kim khắc mà được lợi.- Ngày Sửu lục hợp với Tý, tam hợp với Tỵ và Dậu thành Kim cục. Xung Mùi, hình Tuất, hại Ngọ, phá Thìn, tuyệt Mùi.","- Tam Sát kỵ mệnh các tuổi Dần, Ngọ, Tuất."] },
    "Bính Dần": { moTa: "Ngày: Bính Dần - tức Chi sinh Can (Mộc sinh Hỏa), ngày này là ngày cát (nghĩa nhật).", chiTiet: ["- Nạp âm: Ngày Lô Trung Hỏa, kỵ các tuổi: Canh Thân và Nhâm Thân.","- Ngày này thuộc hành Hỏa khắc với hành Kim, ngoại trừ các tuổi: Nhâm Thân và Giáp Ngọ thuộc hành Kim nhưng không sợ Hỏa.","- Ngày Dần lục hợp với Hợi, tam hợp với Ngọ và Tuất thành Hỏa cục. Xung Thân, hình Tỵ, hại Tỵ, phá Hợi, tuyệt Dậu."] },
    "Đinh Mão": { moTa: "Ngày: Đinh Mão - tức Chi sinh Can (Mộc sinh Hỏa), ngày này là ngày cát (nghĩa nhật).", chiTiet: ["- Nạp âm: Ngày Lô Trung Hỏa, kỵ các tuổi: Tân Dậu và Quý Dậu.","- Ngày này thuộc hành Hỏa khắc với hành Kim, ngoại trừ các tuổi: Quý Dậu và Ất Mùi thuộc hành Kim nhưng không sợ Hỏa.","- Ngày Mão lục hợp với Tuất, tam hợp với Mùi và Hợi thành Mộc cục. Xung Dậu, hình Tý, hại Thìn, phá Ngọ, tuyệt Thân."] },
    "Mậu Thìn": { moTa: "Ngày: Mậu Thìn - tức Can Chi tương đồng (cùng Thổ), ngày này là ngày cát.", chiTiet: ["- Nạp âm: Ngày Đại Lâm Mộc, kỵ các tuổi: Nhâm Tuất và Bính Tuất.","- Ngày này thuộc hành Mộc khắc với hành Thổ, ngoại trừ các tuổi: Canh Ngọ, Mậu Thân và Bính Thìn thuộc hành Thổ không sợ Mộc - Ngày Thìn lục hợp với Dậu, tam hợp với Tý và Thân thành Thủy cục. Xung Tuất, hình Thìn, hình Mùi, hại Mão, phá Sửu, tuyệt Tuất.","- Tam Sát kỵ mệnh các tuổi Tỵ, Dậu, Sửu."] },
    "Kỷ Tỵ": { moTa: "Ngày: Kỷ Tỵ - tức Chi sinh Can (Hỏa sinh Thổ), ngày này là ngày cát (nghĩa nhật).", chiTiet: ["- Nạp âm: Ngày Đại Lâm Mộc, kỵ các tuổi: Quý Hợi và Đinh Hợi.","- Ngày này thuộc hành Mộc khắc với hành Thổ, ngoại trừ các tuổi: Tân Mùi, Kỷ Dậu và Đinh Tỵ thuộc hành Thổ không sợ Mộc.","- Ngày Tỵ lục hợp với Thân, tam hợp với Sửu và Dậu thành Kim cục. Xung Hợi, hình Thân, hại Dần, phá Thân, tuyệt Tý."] },
    "Canh Ngọ": { moTa: "Ngày: Canh Ngọ - tức Chi khắc Can (Hỏa khắc Kim), là ngày hung (phạt nhật).", chiTiet: ["- Nạp âm: Ngày Lộ Bàng Thổ, kỵ các tuổi: Giáp Tý và Bính Tý.","- Ngày này thuộc hành Thổ khắc với hành Thủy, ngoại trừ các tuổi: Bính Ngọ và Nhâm Tuất thuộc hành Thủy không sợ Thổ.","- Ngày Ngọ lục hợp với Mùi, tam hợp với Dần và Tuất thành Hỏa cục. Xung Tý, hình Ngọ, hình Dậu, hại Sửu, phá Mão, tuyệt Hợi."] },
    "Tân Mùi": { moTa: "Ngày: Tân Mùi - tức Chi sinh Can (Thổ sinh Kim), ngày này là ngày cát (nghĩa nhật).", chiTiet: ["- Nạp âm: Ngày Lộ Bàng Thổ, kỵ các tuổi: Ất Sửu và Đinh Sửu.","- Ngày này thuộc hành Thổ khắc với hành Thủy, ngoại trừ các tuổi: Đinh Mùi, Quý Hợi thuộc hành Thủy không sợ Thổ - Ngày Mùi lục hợp với Ngọ, tam hợp với Mão và Hợi thành Mộc cục. Xung Sửu, hình Sửu, hại Tý, phá Tuất, tuyệt Sửu.","- Tam Sát kỵ mệnh các tuổi Thân, Tý, Thìn."] },
    "Nhâm Thân": { moTa: "Ngày: Nhâm Thân - tức Chi sinh Can (Kim sinh Thủy), ngày này là ngày cát (nghĩa nhật).", chiTiet: ["- Nạp âm: Ngày Kiếm Phong Kim, kỵ các tuổi: Bính Dần và Canh Dần.","- Ngày này thuộc hành Kim khắc với hành Mộc, ngoại trừ các tuổi: Mậu Tuất vì Kim khắc mà được lợi.","- Ngày Thân lục hợp với Tỵ, tam hợp với Tý và Thìn thành Thủy cục. Xung Dần, hình Dần, hình Hợi, hại Hợi, phá Tỵ, tuyệt Mão."] },
    "Quý Dậu": { moTa: "Ngày: Quý Dậu - tức Chi sinh Can (Kim sinh Thủy), ngày này là ngày cát (nghĩa nhật).", chiTiet: ["- Nạp âm: Ngày Kiếm Phong Kim, kỵ các tuổi: Đinh Mão và Tân Mão.","- Ngày này thuộc hành Kim khắc với hành Mộc, ngoại trừ các tuổi: Kỷ Hợi vì Kim khắc mà được lợi.","- Ngày Dậu lục hợp với Thìn, tam hợp với Sửu và Tỵ thành Kim cục. Xung Mão, hình Dậu, hại Tuất, phá Tý, tuyệt Dần."] },
    "Giáp Tuất": { moTa: "Ngày: Giáp Tuất - tức Can khắc Chi (Mộc khắc Thổ), ngày này là ngày cát trung bình (chế nhật).", chiTiet: ["- Nạp âm: Ngày Sơn Đầu Hỏa, kỵ các tuổi: Mậu Thìn và Canh Thìn.","- Ngày này thuộc hành Hỏa khắc với hành Kim, ngoại trừ các tuổi: Nhâm Thân và Giáp Ngọ thuộc hành Kim không sợ Hỏa - Ngày Tuất lục hợp với Mão, tam hợp với Dần và Ngọ thành Hỏa cục. Xung Thìn, hình Mùi, hại Dậu, phá Mùi, tuyệt Thìn.","- Tam Sát kỵ mệnh các tuổi Hợi, Mão, Mùi."] },
    "Ất Hợi": { moTa: "Ngày: Ất Hợi - tức Chi sinh Can (Thủy sinh Mộc), ngày này là ngày cát (nghĩa nhật).", chiTiet: ["- Nạp âm: Ngày Sơn Đầu Hỏa, kỵ các tuổi: Kỷ Tỵ và Tân Tỵ.","- Ngày này thuộc hành Hỏa khắc với hành Kim, ngoại trừ các tuổi: Quý Dậu và Ất Mùi thuộc hành Kim không sợ Hỏa.","-  Ngày Hợi lục hợp với Dần, tam hợp với Mão và Mùi thành Mộc cục. Xung Tỵ, hình Hợi, hại Thân, phá Dần, tuyệt Ngọ."] },
    "Bính Tý": { moTa: "Ngày: Bính Tý - tức Chi khắc Can (Thủy khắc Hỏa), là ngày hung (phạt nhật).", chiTiet: ["- Nạp âm: Ngày Giản Hạ Thủy, kỵ các tuổi: Canh Ngọ và Mậu Ngọ.","- Ngày này thuộc hành Thủy khắc với hành Hỏa, ngoại trừ các tuổi: Mậu Tý, Bính Thân và Mậu Ngọ thuộc hành Hỏa không sợ Thủy.","- Ngày Tý lục hợp với Sửu, tam hợp với Thìn và Thân thành Thủy cục. Xung Ngọ, hình Mão, hại Mùi, phá Dậu, tuyệt Tỵ."] },
    "Đinh Sửu": { moTa: "Ngày: Đinh Sửu - tức Can sinh Chi (Hỏa sinh Thổ), ngày này là ngày cát (bảo nhật).", chiTiet: ["- Nạp âm: Ngày Giản Hạ Thủy, kỵ các tuổi: Tân Mùi và Kỷ Mùi.","- Ngày này thuộc hành Thủy khắc với hành Hỏa, ngoại trừ các tuổi: Kỷ Sửu, Đinh Dậu và Kỷ Mùi thuộc hành Hỏa không sợ Thủy - Ngày Sửu lục hợp với Tý, tam hợp với Tỵ và Dậu thành Kim cục. Xung Mùi, hình Tuất, hại Ngọ, phá Thìn, tuyệt Mùi.","- Tam Sát kỵ mệnh các tuổi Dần, Ngọ, Tuất."] },
    "Mậu Dần": { moTa: "Ngày: Mậu Dần - tức Chi khắc Can (Mộc khắc Thổ), là ngày hung (phạt nhật).", chiTiet: ["- Nạp âm: Ngày Thành Đầu Thổ, kỵ các tuổi: Nhâm Thân và Giáp Thân.","- Ngày này thuộc hành Thổ khắc với hành Thủy, ngoại trừ các tuổi: Bính Ngọ và Nhâm Tuất thuộc hành Thủy không sợ Thổ.","- Ngày Dần lục hợp với Hợi, tam hợp với Ngọ và Tuất thành Hỏa cục. Xung Thân, hình Tỵ, hại Tỵ, phá Hợi, tuyệt Dậu."] },
    "Kỷ Mão": { moTa: "Ngày: Kỷ Mão - tức Chi khắc Can (Mộc khắc Thổ), là ngày hung (phạt nhật).", chiTiet: ["- Nạp âm: Ngày Thành Đầu Thổ, kỵ các tuổi: Quý Dậu và Ất Dậu.","- Ngày này thuộc hành Thổ khắc với hành Thủy, ngoại trừ các tuổi: Đinh Mùi và Quý Hợi thuộc hành Thủy không sợ Thổ.","- Ngày Mão lục hợp với Tuất, tam hợp với Mùi và Hợi thành Mộc cục. Xung Dậu, hình Tý, hại Thìn, phá Ngọ, tuyệt Thân."] },
    "Canh Thìn": { moTa: "Ngày: Canh Thìn - tức Chi sinh Can (Thổ sinh Kim), ngày này là ngày cát (nghĩa nhật).", chiTiet: ["- Nạp âm: Ngày Bạch Lạp Kim, kỵ các tuổi: Giáp Tuất và Mậu Tuất.","- Ngày này thuộc hành Kim khắc với hành Mộc, ngoại trừ các tuổi: Mậu Tuất vì Kim khắc mà được lợi - Ngày Thìn lục hợp với Dậu, tam hợp với Tý và Thân thành Thủy cục. Xung Tuất, hình Thìn, hình Mùi, hại Mão, phá Sửu, tuyệt Tuất.","- Tam Sát kỵ mệnh các tuổi Tỵ, Dậu, Sửu."] },
    "Tân Tỵ": { moTa: "Ngày: Tân Tỵ - tức Chi khắc Can (Hỏa khắc Kim), là ngày hung (phạt nhật).", chiTiet: ["- Nạp âm: Ngày Bạch Lạp Kim, kỵ các tuổi: Ất Hợi và Kỷ Hợi.","- Ngày này thuộc hành Kim khắc với hành Mộc, ngoại trừ các tuổi: Kỷ Hợi vì Kim khắc mà được lợi.","- Ngày Tỵ lục hợp với Thân, tam hợp với Sửu và Dậu thành Kim cục. Xung Hợi, hình Thân, hại Dần, phá Thân, tuyệt Tý."] },
    "Nhâm Ngọ": { moTa: "Ngày: Nhâm Ngọ - tức Can khắc Chi (Thủy khắc Hỏa), ngày này là ngày cát trung bình (chế nhật).", chiTiet: ["- Nạp âm: Ngày Dương Liễu Mộc, kỵ các tuổi: Bính Tý và Canh Tý.","- Ngày này thuộc hành Mộc khắc với hành Thổ, ngoại trừ các tuổi: Canh Ngọ, Mậu Thân và Bính Thìn thuộc hành Thổ không sợ Mộc.","- Ngày Ngọ lục hợp với Mùi, tam hợp với Dần và Tuất thành Hỏa cục. Xung Tý, hình Ngọ, hình Dậu, hại Sửu, phá Mão, tuyệt Hợi."] },
    "Quý Mùi": { moTa: "Ngày: Quý Mùi - tức Chi khắc Can (Thổ khắc Thủy), là ngày hung (phạt nhật).", chiTiet: ["- Nạp âm: Ngày Dương Liễu Mộc, kỵ các tuổi: Đinh Sửu và Tân Sửu.","- Ngày này thuộc hành Mộc khắc với hành Thổ, ngoại trừ các tuổi: Tân Mùi, Kỷ Dậu và Đinh Tỵ thuộc hành Thổ không sợ Mộc - Ngày Mùi lục hợp với Ngọ, tam hợp với Mão và Hợi thành Mộc cục. Xung Sửu, hình Sửu, hại Tý, phá Tuất, tuyệt Sửu.","- Tam Sát kỵ mệnh các tuổi Thân, Tý, Thìn."] },
    "Giáp Thân": { moTa: "Ngày: Giáp Thân - tức Chi khắc Can (Kim khắc Mộc), là ngày hung (phạt nhật).", chiTiet: ["- Nạp âm: Ngày Tuyền Trung Thủy, kỵ các tuổi: Mậu Dần và Bính Dần.","- Ngày này thuộc hành Thủy khắc với hành Hỏa, ngoại trừ các tuổi: Mậu Tý, Bính Thân và Mậu Ngọ thuộc hành Hỏa không sợ Thủy.","- Ngày Thân lục hợp với Tỵ, tam hợp với Tý và Thìn thành Thủy cục. Xung Dần, hình Dần, hình Hợi, hại Hợi, phá Tỵ, tuyệt Mão."] },
    "Ất Dậu": { moTa: "Ngày: Ất Dậu - tức Chi khắc Can (Kim khắc Mộc), là ngày hung (phạt nhật).", chiTiet: ["- Nạp âm: Ngày Tuyền Trung Thủy, kỵ các tuổi: Kỷ Mão và Đinh Mão.","- Ngày này thuộc hành Thủy khắc với hành Hỏa, ngoại trừ các tuổi: Kỷ Sửu, Đinh Dậu và Kỷ Mùi thuộc hành Hỏa không sợ Thủy.","- Ngày Dậu lục hợp với Thìn, tam hợp với Sửu và Tỵ thành Kim cục. Xung Mão, hình Dậu, hại Tuất, phá Tý, tuyệt Dần."] },
    "Bính Tuất": { moTa: "Ngày: Bính Tuất - tức Can sinh Chi (Hỏa sinh Thổ), ngày này là ngày cát (bảo nhật).", chiTiet: ["- Nạp âm: Ngày Ốc Thượng Thổ, kỵ các tuổi: Canh Thìn và Nhâm Thìn.","- Ngày này thuộc hành Thổ khắc với hành Thủy, ngoại trừ các tuổi: Bính Ngọ và Nhâm Tuất thuộc hành Thủy không sợ Thổ - Ngày Tuất lục hợp với Mão, tam hợp với Dần và Ngọ thành Hỏa cục. Xung Thìn, hình Mùi, hại Dậu, phá Mùi, tuyệt Thìn.","- Tam Sát kỵ mệnh các tuổi Hợi, Mão, Mùi."] },
    "Đinh Hợi": { moTa: "Ngày: Đinh Hợi - tức Chi khắc Can (Thủy khắc Hỏa), là ngày hung (phạt nhật).", chiTiet: ["- Nạp âm: Ngày Ốc Thượng Thổ, kỵ các tuổi: Tân Tỵ và Quý Tỵ.","- Ngày này thuộc hành Thổ khắc với hành Thủy, ngoại trừ các tuổi: Đinh Mùi và Quý Hợi thuộc hành Thủy không sợ Thổ.","- Ngày Hợi lục hợp với Dần, tam hợp với Mão và Mùi thành Mộc cục. Xung Tỵ, hình Hợi, hại Thân, phá Dần, tuyệt Ngọ."] },
    "Mậu Tý": { moTa: "Ngày: Mậu Tý - tức Can khắc Chi (Thổ khắc Thủy), ngày này là ngày cát trung bình (chế nhật).", chiTiet: ["- Nạp âm: Ngày Phích Lịch Hỏa, kỵ các tuổi: Nhâm Ngọ và Giáp Ngọ.","- Ngày này thuộc hành Hỏa khắc với hành Kim, ngoại trừ các tuổi: Nhâm Thân và Giáp Ngọ thuộc hành Kim không sợ Hỏa.","- Ngày Tý lục hợp với Sửu, tam hợp với Thìn và Thân thành Thủy cục. Xung Ngọ, hình Mão, hại Mùi, phá Dậu, tuyệt Tỵ."] },
    "Kỷ Sửu": { moTa: "Ngày: Kỷ Sửu - tức Can Chi tương đồng (cùng Thổ), ngày này là ngày cát.", chiTiet: ["- Nạp âm: Ngày Phích Lịch Hỏa, kỵ các tuổi: Quý Mùi và Ất Mùi.","- Ngày này thuộc hành Hỏa khắc với hành Kim, ngoại trừ các tuổi: Quý Dậu thuộc hành Kim không sợ Hỏa - Ngày Sửu lục hợp với Tý, tam hợp với Tỵ và Dậu thành Kim cục. Xung Mùi, hình Tuất, hại Ngọ, phá Thìn, tuyệt Mùi.","- Tam Sát kỵ mệnh các tuổi Dần, Ngọ, Tuất."] },
    "Canh Dần": { moTa: "Ngày: Canh Dần - tức Can khắc Chi (Kim khắc Mộc), ngày này là ngày cát trung bình (chế nhật).", chiTiet: ["- Nạp âm: Ngày Tùng Bách Mộc, kỵ các tuổi: Giáp Thân và Mậu Thân.","- Ngày này thuộc hành Mộc khắc với hành Thổ, ngoại trừ các tuổi: Canh Ngọ, Mậu Thân và Bính Thìn thuộc hành Thổ không sợ Mộc.","- Ngày Dần lục hợp với Hợi, tam hợp với Ngọ và Tuất thành Hỏa cục. Xung Thân, hình Tỵ, hại Tỵ, phá Hợi, tuyệt Dậu."] },
    "Tân Mão": { moTa: "Ngày: Tân Mão - tức Can khắc Chi (Kim khắc Mộc), ngày này là ngày cát trung bình (chế nhật).", chiTiet: ["- Nạp âm: Ngày Tùng Bách Mộc, kỵ các tuổi: Ất Dậu và Kỷ Dậu.","- Ngày này thuộc hành Mộc khắc với hành Thổ, ngoại trừ các tuổi: Tân Mùi, Kỷ Dậu, Đinh Tỵ thuộc hành Thổ không sợ Mộc.","- Ngày Mão lục hợp với Tuất, tam hợp với Mùi và Hợi thành Mộc cục. Xung Dậu, hình Tý, hại Thìn, phá Ngọ, tuyệt Thân."] },
    "Nhâm Thìn": { moTa: "Ngày: Nhâm Thìn - tức Chi khắc Can (Thổ khắc Thủy), là ngày hung (phạt nhật).", chiTiet: ["- Nạp âm: Ngày Trường Lưu Thủy, kỵ các tuổi: Bính Tuất và Giáp Tuất.","- Ngày này thuộc hành Thủy khắc với hành Hỏa, ngoại trừ các tuổi: Mậu Tý, Bính Thân và Mậu Ngọ thuộc hành Hỏa không sợ Thủy - Ngày Thìn lục hợp với Dậu, tam hợp với Tý và Thân thành Thủy cục. Xung Tuất, hình Thìn, hình Mùi, hại Mão, phá Sửu, tuyệt Tuất.","- Tam Sát kỵ mệnh các tuổi Tỵ, Dậu, Sửu."] },
    "Quý Tỵ": { moTa: "Ngày: Quý Tỵ - tức Can khắc Chi (Thủy khắc Hỏa), ngày này là ngày cát trung bình (chế nhật).", chiTiet: ["- Nạp âm: Ngày Trường Lưu Thủy, kỵ các tuổi: Đinh Hợi và Ất Hợi.","- Ngày này thuộc hành Thủy khắc với hành Hỏa, ngoại trừ các tuổi: Kỷ Sửu, Đinh Dậu và Kỷ Mùi thuộc hành Hỏa không sợ Thủy.","- Ngày Tỵ lục hợp với Thân, tam hợp với Sửu và Dậu thành Kim cục. Xung Hợi, hình Thân, hại Dần, phá Thân, tuyệt Tý."] },
    "Giáp Ngọ": { moTa: "Ngày: Giáp Ngọ - tức Can sinh Chi (Mộc sinh Hỏa), ngày này là ngày cát (bảo nhật).", chiTiet: ["- Nạp âm: Ngày Sa Trung Kim, kỵ các tuổi: Mậu Tý và Nhâm Tý.","- Ngày này thuộc hành Kim khắc với hành Mộc, ngoại trừ các tuổi: Mậu Tuất vì Kim khắc mà được lợi.","- Ngày Ngọ lục hợp với Mùi, tam hợp với Dần và Tuất thành Hỏa cục. Xung Tý, hình Ngọ, hình Dậu, hại Sửu, phá Mão, tuyệt Hợi."] },
    "Ất Mùi": { moTa: "Ngày: Ất Mùi - tức Can khắc Chi (Mộc khắc Thổ), ngày này là ngày cát trung bình (chế nhật).", chiTiet: ["- Nạp âm: Ngày Sa Trung Kim, kỵ các tuổi: Kỷ Sửu và Quý Sửu.","- Ngày này thuộc hành Kim khắc với hành Mộc, ngoại trừ các tuổi: Kỷ Hợi vì Kim khắc mà được lợi - Ngày Mùi lục hợp với Ngọ, tam hợp với Mão và Hợi thành Mộc cục. Xung Sửu, hình Sửu, hại Tý, phá Tuất, tuyệt Sửu.","- Tam Sát kỵ mệnh các tuổi Thân, Tý, Thìn."] },
    "Bính Thân": { moTa: "Ngày: Bính Thân - tức Can khắc Chi (Hỏa khắc Kim), ngày này là ngày cát trung bình (chế nhật).", chiTiet: ["- Nạp âm: Ngày Sơn Hạ Hỏa, kỵ các tuổi: Canh Dần và Nhâm Dần.","- Ngày này thuộc hành Hỏa khắc với hành Kim, ngoại trừ các tuổi: Nhâm Thân và Giáp Ngọ thuộc hành Kim không sợ Hỏa.","- Ngày Thân lục hợp với Tỵ, tam hợp với Tý và Thìn thành Thủy cục. Xung Dần, hình Dần, hình Hợi, hại Hợi, phá Tỵ, tuyệt Mão."] },
    "Đinh Dậu": { moTa: "Ngày: Đinh Dậu  - tức Can khắc Chi (Hỏa khắc Kim), ngày này là ngày cát trung bình (chế nhật).", chiTiet: ["- Nạp âm: Ngày Sơn Hạ Hỏa, kỵ các tuổi: Tân Mão và Quý Mão.","- Ngày này thuộc hành Hỏa khắc với hành Kim, ngoại trừ các tuổi: Quý Dậu và Ất Mùi thuộc hành Kim không sợ Hỏa.","- Ngày Dậu lục hợp với Thìn, tam hợp với Sửu và Tỵ thành Kim cục. Xung Mão, hình Dậu, hại Tuất, phá Tý, tuyệt Dần."] },
    "Mậu Tuất": { moTa: "Ngày: Mậu Tuất - tức Can Chi tương đồng (cùng Thổ), ngày này là ngày cát.", chiTiet: ["- Nạp âm: Ngày Bình Địa Mộc, kỵ các tuổi: Nhâm Thìn và Giáp Ngọ.","- Ngày này thuộc hành Mộc khắc với hành Thổ, ngoại trừ các tuổi: Canh Ngọ, Mậu Thân và Bính Thìn thuộc hành Thổ không sợ Mộc.","- Ngày Tuất lục hợp với Mão, tam hợp với Dần và Ngọ thành Hỏa cục. Xung Thìn, hình Mùi, hại Dậu, phá Mùi, tuyệt Thìn. Tam Sát kỵ mệnh tuổi Hợi, Mão, Mùi."] },
    "Kỷ Hợi": { moTa: "Ngày: Kỷ Hợi - tức Can khắc Chi (Thổ khắc Thủy), ngày này là ngày cát trung bình (chế nhật).", chiTiet: ["- Nạp âm: Ngày Bình Địa Mộc, kỵ các tuổi: Quý Tỵ và Ất Mùi.","- Ngày này thuộc hành Mộc khắc với hành Thổ, ngoại trừ các tuổi: Tân Mùi, Kỷ Dậu và Đinh Tỵ thuộc hành Thổ không sợ Mộc.","- Ngày Hợi lục hợp với Dần, tam hợp với Mão và Mùi thành Mộc cục. Xung Tỵ, hình Hợi, hại Thân, phá Dần, tuyệt Ngọ."] },
    "Canh Tý": { moTa: "Ngày: Canh Tý - tức Can sinh Chi (Kim sinh Thủy), ngày này là ngày cát (bảo nhật).", chiTiet: ["- Nạp âm: Ngày Bích Thượng Thổ, kỵ các tuổi: Giáp Ngọ và Bính Ngọ.","- Ngày này thuộc hành Thổ khắc với hành Thủy, ngoại trừ các tuổi: Bính Ngọ và Nhâm Tuất thuộc hành Thủy không sợ Thổ.","- Ngày Tý lục hợp với Sửu, tam hợp với Thìn và Thân thành Thủy cục. Xung Ngọ, hình Mão, hại Mùi, phá Dậu, tuyệt Tỵ."] },
    "Tân Sửu": { moTa: "Ngày: Tân Sửu - tức Chi sinh Can (Thổ sinh Kim), ngày này là ngày cát (nghĩa nhật).", chiTiet: ["- Nạp âm: Ngày Bích Thượng Thổ, kỵ các tuổi: Ất Mùi và Đinh Mùi.","- Ngày này thuộc hành Thổ khắc với hành Thủy, ngoại trừ các tuổi: Đinh Mùi và Quý Hợi thuộc hành Thủy không sợ Thổ.","- Ngày Sửu lục hợp với Tý, tam hợp với Tỵ và Dậu thành Kim cục. Xung Mùi, hình Tuất, hại Ngọ, phá Thìn, tuyệt Mùi. Tam Sát kỵ mệnh tuổi Dần, Ngọ, Tuất."] },
    "Nhâm Dần": { moTa: "Ngày: Nhâm Dần - tức Can sinh Chi (Thủy sinh Mộc), ngày này là ngày cát (bảo nhật).", chiTiet: ["- Nạp âm: Ngày Kim Bạc Kim, kỵ các tuổi: Bính Thân và Canh Thân.","- Ngày này thuộc hành Kim khắc với hành Mộc, ngoại trừ các tuổi: Mậu Tuất vì Kim khắc mà được lợi.","- Ngày Dần lục hợp với Hợi, tam hợp với Ngọ và Tuất thành Hỏa cục. Xung Thân, hình Tỵ, hại Tỵ, phá Hợi, tuyệt Dậu."] },
    "Quý Mão": { moTa: "Ngày: Quý Mão - tức Can sinh Chi (Thủy sinh Mộc), ngày này là ngày cát (bảo nhật).", chiTiet: ["- Nạp âm: Ngày Kim Bạc Kim, kỵ các tuổi: Đinh Dậu và Tân Dậu.","- Ngày này thuộc hành Kim khắc với hành Mộc, ngoại trừ các tuổi: Kỷ Hợi vì Kim khắc mà được lợi.","- Ngày Mão lục hợp với Tuất, tam hợp với Mùi và Hợi thành Mộc cục. Xung Dậu, hình Tý, hại Thìn, phá Ngọ, tuyệt Thân."] },
    "Giáp Thìn": { moTa: "Ngày: Giáp Thìn - tức Can khắc Chi (Mộc khắc Thổ), ngày này là ngày cát trung bình (chế nhật).", chiTiet: ["- Nạp âm: Ngày Phúc Đăng Hỏa, kỵ các tuổi: Mậu Tuất và Canh Tuất.","- Ngày này thuộc hành Hỏa khắc với hành Kim, ngoại trừ các tuổi: Nhâm Thân và Giáp Ngọ thuộc hành Kim không sợ Hỏa.","- Ngày Thìn lục hợp với Dậu, tam hợp với Tý và Thân thành Thủy cục. Xung Tuất, hình Thìn, hình Mùi, hại Mão, phá Sửu, tuyệt Tuất. Tam Sát kỵ mệnh các tuổi Tỵ, Dậu, Sửu."] },
    "Ất Tỵ": { moTa: "Ngày: Ất Tỵ - tức Can sinh Chi (Mộc sinh Hỏa), ngày này là ngày cát (bảo nhật).", chiTiet: ["- Nạp âm: Ngày Phúc Đăng Hỏa, kỵ các tuổi: Kỷ Hợi và Tân Hợi.","- Ngày này thuộc hành Hỏa khắc với hành Kim, ngoại trừ các tuổi: Quý Dậu và Ất Mùi thuộc hành Kim không sợ Hỏa.","- Ngày Tỵ lục hợp với Thân, tam hợp với Sửu và Dậu thành Kim cục. Xung Hợi, hình Thân, hại Dần, phá Thân, tuyệt Tý."] },
    "Bính Ngọ": { moTa: "Ngày: Bính Ngọ - tức Can Chi tương đồng (cùng Hỏa), ngày này là ngày cát.", chiTiet: ["- Nạp âm: Ngày Thiên Hà Thủy, kỵ các tuổi: Canh Tý.","- Ngày này thuộc hành Thủy khắc với hành Hỏa, ngoại trừ các tuổi: Mậu Tý, Bính Thân và Mậu Ngọ thuộc hành Hỏa không sợ Thủy.","- Ngày Ngọ lục hợp với Mùi, tam hợp với Dần và Tuất thành Hỏa cục. Xung Tý, hình Ngọ, hình Dậu, hại Sửu, phá Mão, tuyệt Hợi."] },
    "Đinh Mùi": { moTa: "Ngày: Đinh Mùi - tức Can sinh Chi (Hỏa sinh Thổ), ngày này là ngày cát (bảo nhật).", chiTiet: ["- Nạp âm: Ngày Thiên Hà Thủy, kỵ các tuổi: Tân Sửu.","- Ngày này thuộc hành Thủy khắc với hành Hỏa, ngoại trừ các tuổi: Kỷ Sửu, Đinh Dậu và Kỷ Mùi thuộc hành Hỏa không sợ Thủy.","- Ngày Mùi lục hợp với Ngọ, tam hợp với Mão và Hợi thành Mộc cục. Xung Sửu, hình Sửu, hại Tý, phá Tuất, tuyệt Sửu. Tam Sát kỵ mệnh tuổi Thân, Tý, Thìn."] },
    "Mậu Thân": { moTa: "Ngày: Mậu Thân - tức Can sinh Chi (Thổ sinh Kim), ngày này là ngày cát (bảo nhật).", chiTiet: ["- Nạp âm: Ngày Đại Dịch Thổ, kỵ các tuổi: Nhâm Dần và Giáp Dần.","- Ngày này thuộc hành Thổ khắc với hành Thủy, ngoại trừ các tuổi: Bính Ngọ và Nhâm Tuất thuộc hành Thủy không sợ Thổ.","- Ngày Thân lục hợp với Tỵ, tam hợp với Tý và Thìn thành Thủy cục. Xung Dần, hình Dần, hình Hợi, hại Hợi, phá Tỵ, tuyệt Mão."] },
    "Kỷ Dậu": { moTa: "Ngày: Kỷ Dậu - tức Can sinh Chi (Thổ sinh Kim), ngày này là ngày cát (bảo nhật).", chiTiet: ["- Nạp âm: Ngày Đại Dịch Thổ, kỵ các tuổi: Quý Mão và Ất Mão.","- Ngày này thuộc hành Thổ khắc với hành Thủy, ngoại trừ các tuổi: Đinh Mùi và Quý Hợi thuộc hành Thủy không sợ Thổ.","- Ngày Dậu lục hợp với Thìn, tam hợp với Sửu và Tỵ thành Kim cục. Xung Mão, hình Dậu, hại Tuất, phá Tý, tuyệt Dần."] },
    "Canh Tuất": { moTa: "Ngày: Canh Tuất - tức Chi sinh Can (Thổ sinh Kim), ngày này là ngày cát (nghĩa nhật).", chiTiet: ["- Nạp âm: Ngày Thoa Xuyến Kim, kỵ các tuổi: Giáp Thìn và Mậu Thìn.","- Ngày này thuộc hành Kim khắc với hành Mộc, ngoại trừ các tuổi: Mậu Tuất vì Kim khắc mà được lợi.","- Ngày Tuất lục hợp với Mão, tam hợp với Dần và Ngọ thành Hỏa cục. Xung Thìn, hình Mùi, hại Dậu, phá Mùi, tuyệt Thìn. Tam Sát kỵ mệnh các tuổi Hợi, Mão, Mùi."] },
    "Tân Hợi": { moTa: "Ngày: Tân Hợi - tức Can sinh Chi (Kim sinh Thủy), ngày này là ngày cát (bảo nhật).", chiTiet: ["- Nạp âm: Ngày Thoa Xuyến Kim, kỵ các tuổi: Ất Tỵ và Kỷ Tỵ.","- Ngày này thuộc hành Kim khắc với hành Mộc, ngoại trừ các tuổi: Kỷ Hợi vì Kim khắc mà được lợi.","- Ngày Hợi lục hợp với Dần, tam hợp với Mão và Mùi thành Mộc cục. Xung Tỵ, hình Hợi, hại Thân, phá Dần, tuyệt Ngọ."] },
    "Nhâm Tý": { moTa: "Ngày: Nhâm Tý - tức Can Chi tương đồng ( cùng Thủy), ngày này là ngày cát.", chiTiet: ["- Nạp âm: Ngày Tang Chá Mộc, kỵ các tuổi: Bính Ngọ và Canh Ngọ.","- Ngày này thuộc hành Mộc khắc với hành Thổ, ngoại trừ các tuổi: Canh Ngọ, Mậu Thân và Bính Thìn thuộc hành Thổ không sợ Mộc.","- Ngày Tý lục hợp với Sửu, tam hợp với Thìn và Thân thành Thủy cục. Xung Ngọ, hình Mão, hại Mùi, phá Dậu, tuyệt Tỵ."] },
    "Quý Sửu": { moTa: "Ngày: Quý Sửu - tức Chi khắc Can (Thổ khắc Thủy), là ngày hung (phạt nhật).", chiTiet: ["- Nạp âm: Ngày Tang Chá Mộc, kỵ các tuổi: Đinh Mùi và Tân Mùi.","- Ngày này thuộc hành Mộc khắc với hành Thổ, ngoại trừ các tuổi: Tân Mùi, Kỷ Dậu và Đinh Tỵ thuộc hành Thổ không sợ Mộc.","- Ngày Sửu lục hợp với Tý, tam hợp với Tỵ và Dậu thành Kim cục. Xung Mùi, hình Tuất, hại Ngọ, phá Thìn, tuyệt Mùi. Tam Sát kỵ mệnh các tuổi Dần, Ngọ, Tuất."] },
    "Giáp Dần": { moTa: "Ngày: Giáp Dần - tức Can Chi tương đồng (cùng Mộc), ngày này là ngày cát.", chiTiet: ["- Nạp âm: Ngày Đại Khê Thủy, kỵ các tuổi: Mậu Thân và Bính Thân.","- Ngày này thuộc hành Thủy khắc với hành Hỏa, ngoại trừ các tuổi: Mậu Tý, Bính Thân và Mậu Ngọ thuộc hành Hỏa không sợ Thủy.","- Ngày Dần lục hợp với Hợi, tam hợp với Ngọ và Tuất thành Hỏa cục. Xung Thân, hình Tỵ, hại Tỵ, phá Hợi, tuyệt Dậu."] },
    "Ất Mão": { moTa: "Ngày: Ất Mão - tức Can Chi tương đồng (cùng Mộc), ngày này là ngày cát.", chiTiet: ["- Nạp âm: Ngày Đại Khê Thủy, kỵ các tuổi: Kỷ Dậu và Đinh Dậu.","- Ngày này thuộc hành Thủy khắc với hành Hỏa, ngoại trừ các tuổi: Kỷ Sửu, Đinh Dậu và Kỷ Mùi thuộc hành Hỏa không sợ Thủy.","- Ngày Mão lục hợp với Tuất, tam hợp với Mùi và Hợi thành Mộc cục. Xung Dậu, hình Tý, hại Thìn, phá Ngọ, tuyệt Thân."] },
    "Bính Thìn": { moTa: "Ngày: Bính Thìn - tức Can sinh Chi (Hỏa sinh Thổ), ngày này là ngày cát (bảo nhật).", chiTiet: ["- Nạp âm: Ngày Sa Trung Thổ, kỵ các tuổi: Canh Tuất và Nhâm Tuất.","- Ngày này thuộc hành Thổ khắc với hành Thủy, ngoại trừ các tuổi: Bính Ngọvà Nhâm Tuất thuộc hành Thủy không sợ Thổ.","- Ngày Thìn lục hợp với Dậu, tam hợp với Tý và Thân thành Thủy cục. Xung Tuất, hình Thìn, hình Mùi, hại Mão, phá Sửu, tuyệt Tuất. Tam Sát kỵ mệnh tuổi Tỵ, Dậu, Sửu."] },
    "Đinh Tỵ": { moTa: "Ngày: Đinh Tỵ - tức Can Chi tương đồng (cùng Hỏa), ngày này là ngày cát.", chiTiet: ["- Nạp âm:  Ngày Sa Trung Thổ, kỵ các tuổi: Tân Hợi và Quý Hợi.","- Ngày này thuộc hành Thổ khắc với hành Thủy, ngoại trừ các tuổi: Đinh Mùi và Quý Hợi thuộc hành Thủy không sợ Thổ.","- Ngày Tỵ lục hợp với Thân, tam hợp với Sửu và Dậu thành Kim cục. Xung Hợi, hình Thân, hại Dần, phá Thân, tuyệt Tý."] },
    "Mậu Ngọ": { moTa: "Ngày: Mậu Ngọ - tức Chi sinh Can (Hỏa sinh Thổ), ngày này là ngày cát (nghĩa nhật).", chiTiet: ["- Nạp âm: Ngày Thiên Thượng Hỏa, kỵ các tuổi: Nhâm Tý và Giáp Tý.","- Ngày này thuộc hành Hỏa khắc với hành Kim, ngoại trừ các tuổi: Nhâm Thân và Giáp Ngọ thuộc hành Kim không sợ Hỏa.","- Ngày Ngọ lục hợp với Mùi, tam hợp với Dần và Tuất thành Hỏa cục. Xung Tý, hình Ngọ, hình Dậu, hại Sửu, phá Mão, tuyệt Hợi."] },
    "Kỷ Mùi": { moTa: "Ngày: Kỷ Mùi - tức Can Chi tương đồng (cùng Thổ), ngày này là ngày cát.", chiTiet: ["- Nạp âm: Ngày Thiên Thượng Hỏa, kỵ các tuổi: Quý Sửu và Ất Sửu.","- Ngày này thuộc hành Hỏa khắc với hành Kim, ngoại trừ các tuổi: Quý Dậu và Ất Mùi thuộc hành Kim không sợ Hỏa.","- Ngày Mùi lục hợp với Ngọ, tam hợp với Mão và Hợi thành Mộc cục. Xung Sửu, hình Sửu, hại Tý, phá Tuất, tuyệt Sửu. Tam Sát kỵ mệnh các tuổi Thân, Tý, Thìn."] },
    "Canh Thân": { moTa: "Ngày: Canh Thân - tức Can Chi tương đồng (cùng Kim), ngày này là ngày cát.", chiTiet: ["- Nạp âm: Ngày Thạch Lựu Mộc, kỵ các tuổi: Giáp Dần và Mậu Dần.","- Ngày này thuộc hành Mộc khắc với hành Thổ, ngoại trừ các tuổi: Canh Ngọ, Mậu Thân và Bính Thìn thuộc hành Thổ không sợ Mộc.","- Ngày Thân lục hợp với Tỵ, tam hợp với Tý và Thìn thành Thủy cục. Xung Dần, hình Dần, hình Hợi, hại Hợi, phá Tỵ, tuyệt Mão."] },
    "Tân Dậu": { moTa: "Ngày: Tân Dậu - tức Can Chi tương đồng (cùng Kim), ngày này là ngày cát.", chiTiet: ["- Nạp âm: Ngày Thạch Lựu Mộc, kỵ các tuổi: Ất Mão và Kỷ Mão.","- Ngày này thuộc hành Mộc khắc với hành Thổ, ngoại trừ các tuổi: Tân Mùi, Kỷ Dậu và Đinh Tỵ thuộc hành Thổ không sợ Mộc.","- Ngày Dậu lục hợp với Thìn, tam hợp với Sửu và Tỵ thành Kim cục. Xung Mão, hình Dậu, hại Tuất, phá Tý, tuyệt Dần."] },
    "Nhâm Tuất": { moTa: "Ngày: Nhâm Tuất - tức Chi khắc Can (Thổ khắc Thủy), là ngày hung (phạt nhật).", chiTiet: ["- Nạp âm: Ngày Đại Hải Thủy, kỵ các tuổi: Bính Thìn và Giáp Thìn.","- Ngày này thuộc hành Thủy khắc với hành Hỏa, ngoại trừ các tuổi: Mậu Tý, Bính Thân và Mậu Ngọ thuộc hành Hỏa không sợ Thủy. Ngày Tuất lục hợp với Mão, tam hợp với Dần và Ngọ thành Hỏa cục. Xung Thìn, hình Mùi, hại Dậu, phá Mùi, tuyệt Thìn.","- Tam Sát kỵ mệnh các tuổi Hợi, Mão, Mùi."] },
    "Quý Hợi": { moTa: "Ngày: Quý Hợi - tức Can Chi tương đồng (Thủy), ngày này là ngày cát.", chiTiet: ["- Nạp âm: Ngày Đại Hải Thủy, kỵ các tuổi: Đinh Tỵ và Ất Tỵ.","- Ngày này thuộc hành Thủy khắc với hành Hỏa, ngoại trừ các tuổi: Kỷ Sửu, Đinh Dậu và Kỷ Mùi thuộc hành Hỏa không sợ Thủy.","- Ngày Hợi lục hợp với Dần, tam hợp với Mão và Mùi thành Mộc cục. Xung Tỵ, hình Hợi, hại Thân, phá Dần, tuyệt Ngọ."] },
  };

  // ===== Ca dao tục ngữ =====
  const CA_DAO_TUC_NGU = [
      "Ai giàu ba họ, ai khó ba đời.",
      "Ăn cơm với bò thì lo ngay ngáy\nĂn cơm với cáy thì ngáy o o.",
      "Ăn tấm trả giặt.",
      "Ăn thì hơn, hờn thì thiệt.",
      "Cao cờ không bằng cao cổ.",
      "Có tiền mua tiên cũng được.",
      "Đã nghèo còn mắc cái eo.",
      "Mạt cưa mướp đắng.",
      "Nhập gia tùy tục.",
      "Sa cơ lỡ vận.",
      "Trời sinh voi sinh cỏ.",
      "Thượng bất chính, hạ tắc loạn.",
      "Phép vua thua lệ làng.",
      "Đất có lề, quê có thói.",
      "Hỡi cô cắt cỏ đồng mầu!",
      "Người trên ở chẳng chính ngôi\nKhiến cho kẻ dưới chúng tôi hỗn hào.",
      "Mười năm rèn luyện sách đèn\nCông danh gặp bước, chớ quên ơn thầy.",
      "Nhà có láng giềng nhà\nĐồng có láng giềng đồng.",
      "Nghèo giữa chợ chẳng ai han hỏi\nGiàu đầu non nhiều kẻ viếng thăm.",
      "Muốn sang thì bắc cầu Kiều\nMuốn con hay chữ thì yêu kính thầy.",
      "Dại nhà khôn chợ mới ngoan.",
      "Khôn nhà dại chợ, thế gian chê cười.",
      "Mẹ cha công đức sinh thành\nRa trường thầy dạy học hành cho hay.",
      "Quốc kêu réo rắt trên ngàn\nGà rừng táo tác gọi con trên đồi.",
      "Lạnh lùng thay láng giềng ôi\nLáng giềng lạnh ít, sao tôi lạnh nhiều.",
      "Phượng hoàng ở chốn cheo leo\nSa cơ lỡ vận phải theo đàn gà.",
      "Bao giờ gió thuận mưa hòa\nThay lông đổi cánh lại ra phượng hoàng.",
      "Ba thương má lúm đồng tiền\nBốn thương răng lánh hạt huyền kém thua.",
      "Ai xui má đỏ, môi hồng\nĐể anh nhác thấy đem lòng thương yêu.",
      "Lấy cho trả thảo cho cha\nĐền ơn cho mẹ con ra lấy chồng.",
      "Chồng người xe ngựa người yêu\nChồng em áo rách, em chiều em thương.",
      "Trăm năm quyết chí một chồng\nDầu ai thêu phụng vẽ rồng mặc ai.",
      "Nước trong ai chẳng rửa chân\nCái má trắng ngần ai chẳng muốn hôn.",
      "Trời nào có phụ ai đâu\nHay làm thì giàu, có chí thì nên.",
      "Miệng em cười như cánh hoa nhài\nNhư nụ hoa quế như tai hồng.",
      "Mắt xanh tươi thắm môi trầu\nMiệng cười lúm má, cho cầu thêm xinh.",
      "Những người con mắt lá răm\nĐôi mày lá liễu đáng trăm quan tiền.",
      "Chân mày vòng nguyệt có duyên\nTóc mây gợn sóng đẹp duyên tơ hồng.",
      "Vì cam cho quýt đèo bồng\nVì em nhan sắc cho lòng nhớ thương.",
      "Cổ tay em trắng lại tròn\nÐể cho ai gối đã mòn một bên?",
      "Gối chăn gối chiếu không êm\nGối lụa không mềm bằng gối tay em.",
      "Hỡi người tóc tốt xanh non\nLưng ong thắt đáy như con tò vò.",
      "Tóc xanh tươi tốt rậm rà\nRăng đen nhanh nhánh tưởng là hạt na.",
      "Non cao cũng có đường trèo\nĐường dù hiểm nghèo cũng có lối đi.",
      "Non cao cũng có đường trèo\nNhững bệnh hiểm nghèo có thuốc thần tiên",
      "Ta về ta tắm ao ta\nDù trong dù đục ao nhà vẫn hơn.",
      "Anh đi anh nhớ quê nhà\nNhớ canh rau muống nhớ cà dầm tương.",
      "Bể xa mây nước mù mù\nBiết mô cửa lạch, biết mô sống cùng.",
      "Trời cao, cao bấy không xa\nĐất kia rộng vậy thế mà dày sâu.",
      "Mình về mình nhớ ta chăng\nTa về ta nhớ hàm răng mình cười,",
      "Trăm quan mua lấy miệng cười\nNghìn quan chẳng tiếc, tiếc người răng đen.",
      "Nhác trông con mắt đáng trăm\nMiệng cười đáng chục, hàm răng đáng nghìn",
      "Nhác trông con mắt ưa nhìn\nĐáng trăm cũng chuộng, đáng nghìn cũng mua.",
      "Gặp em, thấy khéo miệng cười\nThấy xinh con mắt, thấy tươi má hồng",
      "Gặp nhau giữa cánh đồng này\nCon mắt liếc lại lông mày đưa ngang.",
      "Con mắt em liếc cũng ngoan\nCái chân em bước tựa đàn năm cung",
      "Một thương tóc bỏ đuôi gà\nHai thương ăn nói mặn mà có duyên\nBa thương má lúm đồng tiền\nBốn thương răng nhánh hạt huyền kém thua\nNăm thương cổ yếm đeo bùa\nSáu thương nón thượng quai tua dịu dàng\nBảy thương nết ở khôn ngoan\nTám thương ăn nói lại càng thêm xinh.",
      "Ăn cỗ đi trước, lội nước đi sau.",
      "Ăn lấy đời, chơi lấy thời.",
      "Ăn quả nhớ kẻ trồng cây.",
      "Cái răng, cái tóc là gốc con người.",
      "Chết giả mới biết bụng dạ anh em.",
      "Con mắt là mặt đồng cân.",
      "Của người bồ tát, của mình lạt buộc.",
      "Đánh bạc quen tay, ngủ ngày quen mắt, ăn vặt quen mồm.",
      "Đói cho sạch, rách cho thơm.",
      "Giàu điếc, sang đui.",
      "Làm khi lành, để dành khi đau.",
      "Lòng người như bể khôn dò.",
      "Miếng ăn là miếng nhục.",
      "Người giàu tham việc, thất nghiệp tham ăn.",
      "Người là vàng của là ngãi.",
      "Người năm bảy đấng, của ba bảy loài.",
      "Người sống đống vàng.",
      "Ruột ngựa, phổi bò.",
      "Sáng tai họ, điếc tai cày.",
      "Sống mỗi người một nết, chết mỗi người một tật.",
      "Thấy sang bắt quàng làm họ.",
      "Thương người như thể thương thân.",
      "Trông mặt mà bắt hình dong.",
      "Học là học biết giữ giàng\nBiết điều nhân nghĩa biết đằng hiếu trung",
      "Dương trần phải ráng làm hiền\nĐừng trọng bạc tiền bỏ nghĩa bỏ nhân",
      "Làm trai nết đủ năm đường\nTrước tiên điều hiếu đạo thường xưa nay.",
      "Thờ cha mẹ, ở hết lòng\nẤy là chữ hiếu, dạy trong luân thường.",
      "Đời xưa trả oán còn lâu\nĐời nay trả oán bất câu giờ nào.",
      "Chàng đi trấn chốn phương xa\nNhớ chăng dải đất Cầu Huê quê mình",
      "Bến trăng sóng nước lung linh\nTấm nâu thiếp nhuộm tình riêng Huê Cầu.",
      "Đường giao tiếp cốt vẹn toàn\nViệc mình không muốn chớ làm cho ai.",
      "Trâu ta ăn cỏ đồng ta\nĐừng ham cỏ tốt ăn qua đồng người",
      "Hàng ta, ta bận cũng tươi\nHam chi hàng ngoại, kẻ cười người chê",
      "Gái thì giữ lấy chữ trinh\nSiêng năng chín chắn, trời dành phúc cho",
      "Ruộng hoang người ta khẩn còn thành\nHuống chi ruộng thuộc sao đành bỏ hoang.",
      "Thương anh dầu dãi nắng mưa\nHết khơi ruộng thấp lại bừa ruộng cao",
      "Rượu ngon bất luận be sành.",
      "Áo rách khéo vá, hơn lành vụng may.",
      "Ao sâu ruộng đất bề bề\nKhông bằng tinh xảo một nghề trong tay",
      "Công cha đức mẹ cao dày\nCưu mang trứng nước những ngày ngây thơ.",
      "Nuôi con khó nhọc đến giờ\nTrưởng thành con phải biết thờ hai thân.",
      "Thức khuya dậy sớm chuyên cần\nQuạt nồng ấp lạnh giữ phần đạo con.",
      "Choàng qua cổ bạn khóc rằng\nCăn duyên không tính để lầm vòng thương",
      "Vợ chồng là đạo tào khương\nTrách bà Nguyệt Lão vấn vương không thành",
      "Cá không ăn muối cá ươn\nCon cãi cha mẹ trăm đường con hư.",
      "Ơn thầy soi lối mở đường\nCho con vững bước dặm trường tương lai.",
      "Ơn đây gần bạn, gần thầy\nCó công mài sắt có ngày nên kim.",
      "Chữ thầy trong cõi người ta\nDặm dài hoa nắng trời xa biển đầy.",
      "Dù đi khắp bốn phương trời\nCông cha nghĩa mẹ không ai sánh bằng.",
      "Mấy ai là kẻ không thầy\nThế gian thường nói đố mày làm nên.",
      "Đêm nay con ngủ giấc tròn\nMẹ là ngọn gió của con suốt đời.",
      "Mười năm rèn luyện sách đèn\nCông danh gặp bước chớ quên ơn thầy.",
      "Anh chỉ quen một cô nàng da trắng tóc dài\nMiệng cười như nhánh hoa nhài nở nang.",
      "Răng đen ai nhuộm cho mình\nCho duyên mình đậm cho tình anh say.",
      "Trăng rằm mười sáu trăng nghiêng\nThương em chúm chím cười duyên một mình.",
      "Ngọc kia chuốt mãi cũng tròn\nSắt kia mài mãi cũng còn nên kim.",
      "Ai ơi giữ chí cho bền\nDù ai xoay hướng đổi nền mặc ai.",
      "Thương ai hồi nhỏ tới chừ\nDẫu nghèo, dẫu đói không từ ngãi nhân.",
      "Học là học để làm người\nBiết điều hơn thiệt biết lời thị phi",
      "Học trò học hiếu học trung\nHọc cho đến mực anh hùng mới thôi.",
      "Bữa nay nhìn mặt cho tường\nĐến mai dời gót nẻo đường xa xôi.",
      "Cơm này nửa sống nửa khê\nVợ đơm chồng nếm chẳng chê cơm này.",
      "Mẹ ơi thương lấy rể nghèo\nKhoa tay vớt bọt, lấy bèo nuôi nhau.",
      "Sông sâu sào ngắn khôn dò\nNgười khôn ít nói, khôn đo tấc lòng.",
      "Dạo chơi quán cũng như nhà.",
      "Nhà tranh có ngãi hơn tòa nhà cao.",
      "Cái bống là cái bống bình\nThổi cơm nấu nước một mình mồ côi.",
      "Rạng ngày có khách đến chơi\nCơm ăn rượu uống cho vui lòng chồng.",
      "Có con phải khổ vì con\nCó chồng phải gánh giang sơn nhà chồng.",
      "Có chồng phải lụy cùng chồng\nĐắng cay phải chịu mặn nồng phải theo.",
      "Duyên là tóc, tóc là tơ\nXe tơ kết tóc bậu chờ trông ai",
      "Tóc bậu mới chấm ngang vai\nCha mẹ thương ít, nhưng trai thương nhiều",
      "Cho dầu bậu trong trắng mỹ miều\nNhiều nơi lắm chốn, anh cũng chẳng chiều được đâu.",
      "Ngó lên trời thấy cặp cu đang đá\nNgó ra ngoài biển, thấy cặp cá đang đua.",
      "Đi về lập miếu thờ vua\nLập trang thờ mẹ, lập chùa thờ cha.",
      "Ở cho có nghĩa có nhân\nCây đức lắm chồi, người đức lắm con",
      "Ba vuông sánh với bảy tròn\nĐời cha ân đức, đời con sang giàu.",
      "Làm người chẳng biết lo xa\nTrẻ trung đã vậy tuổi già làm sao.",
      "Làm người cho biết tiền tằn\nĐồ ăn thức mặc có ngần thì thôi.",
      "Những người đói rách rạc rài\nBởi phụ của trời làm chẳng nên ăn.",
      "Bần cư náo thị vô nhân đáo\nPhú tại lâm sơn hữu viễn thân",
      "Bấy lâu nay không biểu, anh cũng lại gần\nBấy giờ em sa cơ thất vận\nEm biểu mấy lần anh cũng không vô.",
      "Lấy điều ăn ở dạy con\nDẫu mà gặp tiết nước non xoay vần.",
      "Ở cho có đức, có nhân\nMới mong thờ tự, được ăn lộc trời.",
      "Trong đầm gì đẹp bằng sen\nLá xanh bông trắng lại chen nhị vàng\nNhị vàng bông trắng lá xanh\nGần bùn mà chẳng hôi tanh mùi bùn.",
      "Đã sinh ra kiếp ở đời\nTrai thời trung hiếu đôi vai cho tròn.",
      "Gái thời trinh trỉnh lòng son\nSớm hôm gìn giữ kẻo còn chút sai.",
      "Trai lành gái tốt ra người\nKhuyên con trọng bấy nhiêu lời cho chuyên.",
      "Con cò lặn lội bờ sông\nGánh gạo đưa chồng tiếng khóc nỉ non.",
      "Nàng về nuôi cái cùng con\nĐể anh đi trẩy nước non Cao Bằng.",
      "Chàng ơi phải lính thì đi\nCửa nhà đơn chiếc đã thì có tôi.",
      "Anh đi em ở lại nhà\nHai vai gánh vác mẹ già con thơ.",
      "Bà chúa đứt tay bằng ăn mày sổ ruột.",
      "Bầu dục chẳng đến bàn thứ tám, cám nhỏ chẳng đến miệng lợn sề.",
      "Cá lớn nuốt cá bé.",
      "Chưa đỗ ông nghè đã đe hàng tổng.",
      "Cốc mò cò xơi.",
      "Con giun xéo lắm cũng quằn.",
      "Công nợ trả dần, cháo nóng húp quanh.",
      "Của bền tại người.",
      "Của bụt mất một đền mười.",
      "Đi buôn nói ngay bằng đi cày nói dối.",
      "Đồng tiền đi trước là đồng tiền khôn, đồng tiền đi sau là đồng tiền dại.",
      "Được làm vua, thua làm giặc.",
      "Hay làm thì đói, hay nói thì no.",
      "Lá lành đùm lá rách.",
      "Làm hàng săng, chết bó chiếu.",
      "Làm nghề gì ăn nghề ấy.",
      "Lễ vào quan như than vào lò.",
      "Mạnh về gạo bạo về tiền.",
      "Muốn nói oan làm quan mà nói.",
      "Nén bạc đâm toạc tờ giấy.",
      "Nhất quỷ, nhì ma, thứ ba học trò.",
      "Nhất sĩ nhì nông, hết gạo chạy rông, nhất nông nhì sĩ.",
      "Nhất tội, nhì nợ.",
      "Nhiều tiền thì thắm, ít tiền thì phai.",
      "Quan thấy kiện như kiến thấy mỡ.",
      "Quan thời xa, bản nha thời gần.",
      "Ruộng bề bề không bằng nghề trong tay.",
      "Thằng mõ có bỏ đám nào.",
      "Tiền bạc đi trước mực thước đi sau.",
      "Trời sinh voi, trời sinh cỏ.",
      "Tuần hà là cha kẻ cướp.",
      "Tức nước vỡ bờ.",
      "Uống nước nhớ nguồn",
      "Thế gian chuộng của, chuộng công\nNào ai có chuộng người không bao giờ.",
      "Dò sông, dò bể, dò nguồn\nBiết sao được bụng lái buôn mà dò.",
      "Dù ai buôn đâu bán đâu\nNhớ ngày mở hội rủ nhau mà về",
      "Dù ai bận rộn trăm nghề\nTháng 2 mở hội thì về Trường Yên",
      "Cú kêu ba tiếng cứ kêu\nKêu mau đến Tết dựng nêu ăn chè",
      "Dựng nêu thì dựng đầu hè\nĐể sân gieo cải, vãi mè ăn chung",
      "Đi đâu mặc kệ đi đâu\nĐến ngày giỗ Tết phải mua mà về",
      "Con cò chết rũ trên cây\nCò con mở lịch xem ngày làm ma",
      "Ai ơi muôn dặm ngược xa\nCải lương quấn chặt lấy ba măng vòi",
      "Gái Chưa Chồng trông hang Cắc Cứ\nTrai chưa vợ nhớ hội chùa Thầy",
      "Cà cuống uống rượu la đà\nChim ri ríu rít bỏ ra lấy phần",
      "Chào mào thì đánh trống quân\nChim chích cởi trần vác Bó đi lao",
      "Mồng một Tết cha\nMùng 2 Tết mẹ\nMùng 3 tết thầy",
      "Ai về Phú Thọ cùng ta\nVui ngày giỗ tổ tháng ba mùng 10",
      "Dù ai đi ngược về xuôi\nNhớ ngày giỗ tổ Hùng mười tháng ba",
      "Chẳng về hội vật thì thôi\nVề thì nhất định phải thử một nồi lươn măng",
      "Đã ăn thì ăn đậu rang\nLấy năm bảy cọc cho bằng người ta",
      "Chém cha những đứa sang giàu\nCậy thần cậy thế cúi đầu lính tây",
      "Con cò lặn lội bờ sông\nGánh gạo đưa chồng tiếng khóc nỉ non",
      "Nàng ở nhà nuôi cái cùng con\nĐể anh trấn Thủ nước non Cao Bằng",
      "Đồn Tây dù chắc dù dày\nThuế nộp đủ đầy đồn ắt phải tan",
      "Hải Vân cao ngất từng mây\nGiặc đi đến đó bỏ thây không về",
      "Đứng trên cầu cấm em thề\nChưa xong nhiệm vụ chưa về quê hương",
      "Đeo hoa chỉ tổ nặng tai\nĐeo kiềng nặng cổ hỡi ai có vàng",
      "Làm lên một nước kẻ vang\nĐem vàng giúp nước giàu sang sau này",
      "Đổi vàng lấy súng, cối xay\nBắn tan giặc Pháp, dựng ngày vinh quang",
      "Bầu ơi thương lấy bí cùng\nTuy rằng khác giống nhưng chung một giàn",
      "Nhiễu điều phủ lấy giá gương\nNgười trong một nước phải thương nhau cùng",
      "Tay bắt tay trong lòng chung sức\nQuyết duyệt thù cứu quốc bạn ơi",
      "Lòng em khôn tỏ hết lời\nKìa gương phấn cũng rạng ngời nước non",
      "Ru con con ngủ cho lành\nĐể mẹ múc nước rửa bành cho voi",
      "Muốn coi lên núi mà coi\nCoi bà Triệu tướng cưỡi voi đánh cồng",
      "Ru hời ru hỡi là ru\nCha con còn ở chiến khu chưa về",
      "Con ơi nhớ trọn lời thề\nTự do độc lập không hề hi sinh",
      "Tiên học lễ, hậu học văn",
      "Học khôn đến chết, học nết đến già",
      "Dao có mài mới sắc, người có học mới khôn",
      "Dốt đến đâu, học lâu cũng biết",
      "Luyện mãi thành tài, miệt mài tất giỏi",
      "Học ăn học nói học gói học mở",
      "Học hay cày biết",
      "Học một biết mười",
      "Học thầy chẳng tày học bạn",
      "Học thầy học bạn vô vạn phong lưu",
      "Ăn vóc học hay",
      "Dao có mài mới sắc, người có học mới lên",
      "70 Còn học 71",
      "Có cày có thóc, có học có chữ",
      "Học hành vất vả kết quả ngọt bùi",
      "Dốt đặc còn hơn hay chữ lỏng",
      "Hay học thì sang, hay làm thì có",
      "Một kho vàng không bằng bột năng chữ",
      "Có học có khôn",
      "Dẫu rằng thông hoạt\nChẳng học cũng hư",
      "Đời tài trí bằng trời\nChẳng học cũng là phải khổ",
      "Chồng đẹp, vợ đẹp những nhìn mà no",
      "Chồng đã giận, vợ bớt lời\nChồng tới vợ phải lui",
      "Cả Sông Đông chợ, lắm vợ nhiều con",
      "Cau non về hạt, gái đảm về chồng",
      "Chẳng tu vắng vợ cũng như tu",
      "Chẻ củi xem thử, lấy vợ xem tông",
      "Lấy vợ xem tông, lấy chồng Xem giống",
      "Chết trẻ còn hơn lấy lẽ chồng người",
      "Đàn ông xây nhà đàn bà xây tổ ấm",
      "Chiều người lấy việc\nChiều chồng lấy con",
      "Con hơn Cha như nhà có nóc",
      "Con dại cái mang",
      "Con nhà tông không giống lông cũng giống cánh",
      "Con hư tại mẹ\nCháu hư tại bà",
      "Thương cho roi cho vọt\nGhét cho ngọt cho bùi",
      "Bà phải có ông\nChồng phải có vợ",
      "Chồng chung vợ chạ",
      "Ai khéo hầu hạ thì được chồng riêng",
      "Cha mẹ sinh con trời sinh tính",
      "Con hơn cha là nhà có nóc",
      "Mẹ dạy thì con khéo, Cha dậy thì con khôn",
      "Ơn cha nặng lắm ai ơi, nghĩa mẹ bằng trời chín tháng cưu mang",
      "Con người có tổ có tông\nNhư cây có cội như sông có nguồn",
      "Chị ngã em nâng",
      "Anh em trong nhà đóng cửa bảo nhau",
      "Anh em như trông như mác",
      "Dù cho cay đắng trăm điều\nCũng không lay được nghĩa tình keo sơn",
      "Ai về chợ huyện ăn nem\nGhé qua Hưng Thạnh mà xem Tháp Chàm",
      "Chiêm Sơn là lụa Mỹ nhiều\nSớm mai mắc cửi, chiều chiều bán tơ",
      "Nhất Trước Kiều đám ma, nhì Thanh Hà nhà cháy",
      "Hỡi cô thắt áo lưng xanh\nCó về Quảng Bá với anh thì về",
      "Quảng bá nằm ở bên đê\nBốn mùa xanh tốt với nghề trồng rau",
      "Anh đi trước em theo sau\nĐể bác mẹ biết trầu cau sang nhà",
      "Dù cho cha đánh mẹ treo\nEm cũng chẳng bỏ chùa Keo hôm rằm",
      "Dù cho cha đánh mẹ vằm\nEm cũng chẳng bỏ hôm rằm chùa Keo",
      "Dù ai buôn bán đâu đâu, hễ trông thấy tháp chùa dâu thì về",
      "Dù ai mua bán trăm nghề nhớ ngày mùng 8 thì về hội Dâu",
      "Tiếng chuông lay bóng Bồ Đề\nCon chim trắng cánh bay về Tây Thiên",
      "Mong sao dân tộc bình yên\nĐạo lành che chở dân Hiền Thương Yêu",
      "Dù cho đất sập trời siêu\nLòng tôi vẫn nhớ những điều giá gương",
      "Khắp nơi đồng ruộng phố phường\nNhớ lời Phật dạy phải thương nhau cùng",
      "Đạo vàng điểm núi tô sông\nXây nền văn hóa Lạc Hồng thắm tươi",
      "Hải Vân bát ngát nghìn trùng\nHòn Hành ở đó là trong vịnh Hàn",
      "Xưa nay qua đó còn thuyền\nLối đi lâu giản chẳng biền ra khơi",
      "Dù cho cả nước sôi bùn\nHải Vân hóa cát biển Đông thành đèo",
      "Ăn mặn nói ngay còn hơn ăn chay nói dối",
      "Cái nết đánh chết cái đẹp.",
      "Chết trong còn hơn sống đục.",
      "Đất lành chim đỗ, đất ngỗ chim bay.",
      "Điều lành thì nhớ, điều dở thì quên.",
      "Dù đẹp tám vạn nghìn tư, mà chẳng có nết cũng hư một đời.",
      "Đừng ham nón tốt dột mưa, đừng ham người đẹp mà thưa việc làm.",
      "Khẩu Phật tâm xà.",
      "Kính già yêu trẻ.",
      "Người chết, nết còn.",
      "Người đừng khinh rẻ người.",
      "Sống tết, chết giỗ.",
      "Tốt đẹp phô ra, xấu xa đậy lại.",
      "Tốt gỗ hơn tốt nước sơn, xấu người đẹp nết còn hơn đẹp người.",
      "Uống nước chớ quên người đào mạch.",
      "Uống nước, nhớ kẻ đào giếng.",
      "Vô công bất hưởng lợi.",
      "Xấu hay làm tốt, dốt hay nói chữ.",
      "Yêu trẻ, trẻ đến nhà, kính già, già để tuổi cho.",
      "Nhân chi sơ, tính bản thiện.",
      "Tôn sư trọng đạo.",
      "Thuốc đắng dã tật, sự thật mất lòng.",
      "Thật vàng, không sợ lửa.",
      "Nói phải củ cải cũng nghe.",
      "Khôn chẳng qua lẽ, khỏe chẳng qua lời.",
      "Cây ngay không sợ chết đứng.",
      "Trọng nghĩa, khinh tài.",
      "Đói cho sạch, rách cho thơm.",
      "Ăn rách cốt cách người thương.",
      "Cây ngay bóng thẳng, cây cong bóng vẹo.",
      "Ăn có mời, làm có khiến.",
      "Mặt trời luôn mọc ở đằng Đông.",
      "Sự thật che sự bóng.",
      "Ăn ngay ở thẳng, chẳng sợ mất lòng.",
      "Ăn ngay nói phải.",
      "Hòn đất ném đi, hòn chì ném lại.",
      "Có đi có lại mới toại lòng nhau.",
      "Vén mây mù mới thấy trời xanh.",
      "Ăn ngay nói thật mọi tật mọi lành.",
      "Chớ nghe lời phỉnh tiếng phờ\nThò tay vào lờ mắc kẹt cái hom.",
      "Khôn ngoan chẳng lọ thật thà\nLường thưng tráo đấu chẳng qua đong đầy.",
      "Người gian thì sợ người ngay\nNgười ngay chẳng sợ đường cày cong queo.",
      "Khôn ngoan ba chốn bốn bề\nĐừng cho ai lấn chớ bề lấn ai.",
      "Làm người phải đắn phải đo\nPhải cân nặng nhẹ, phải dò nông sâu.",
      "Làm người suy chín xét xa\nCho từng gốc nhọc, cho ra vắn dài.",
      "Quạ đen biết phận quạ đen\nQuạ đâu có dám mon men với cò.",
      "Chịu oan mang tiếng bán vàm\nBám vàm tôi bán điềm đàng tôi lo.",
      "Lời nói không mất tiền mua\nLựa lời mà nói cho vừa lòng nhau",
      "Dù cho đất đổi trời thay\nTrăm năm vẫn giữ lòng ngay với đời",
      "Làm người mà chẳng biết suy\nĐến khi nghĩ lại còn gì là thân.",
      "Lời hơn lẽ thiệt.",
      "Lời hơn lẽ phải.",
      "Của phi nghĩa có giàu đâu\nỞ cho ngay thật giàu sang mới bền",
      "Khó mà biết lẽ biết trời\nBiết ăn biết ở hơn người giàu sang",
      "Dù ai nói ngả nói nghiêng\nLòng ta vẫn vững như kiềng ba chân",
      "Chữ tín còn quý hơn vàng.",
      "Giấy rách phải giữ lấy lề.",
      "Hứa hươu, hứa vượn.",
      "Lời nói như đinh đóng cột.",
      "Một lần bất tín, vạn lần bất tin.",
      "Mua danh ba vạn, bán danh ba đồng.",
      "Nhất ngôn cửu đỉnh.",
      "Nhất ngôn ký xuất, tứ mã nan truy.",
      "Quân tử nhất ngôn, tứ mã nan truy.",
      "Quân tử nhất ngôn.",
      "Rao mật gấu, bán mật heo.",
      "Rao ngọc, bán đá.",
      "Treo đầu dê, bán thịt chó.",
      "Nói chín thì phải làm mười\nNói mười làm chín, kẻ cười người chê.",
      "Người sao một hẹn thì nên\nNgười sao chín hẹn thì quên cả mười.",
      "Nói lời phải giữ lấy lời\nĐừng như con bướm đậu rồi lại bay.",
      "Hay gì lừa đảo kiếm lời\nCả nhà ăn uống, tội trời riêng mang.",
      "Kiếm củi ba năm, thiêu một giờ\nMua danh ba vạn, bán danh ba đồng.",
      "\"Cần kiệm, liêm chính, chí công, vô tư.\" (Chủ tịch Hồ Chí Minh)",
      "Áo rách cốt cách người thương.",
      "Ăn có mời; làm có khiến.",
      "Cây ngay bóng thẳng, cây cong bóng vẹo.",
      "Cây ngay không sợ chết đứng.",
      "Của mình thì giữ bo bo, của người thì đớp cho no mới về.",
      "Cọp chết để da, người ta chết để tiếng.",
      "Ăn có mời, làm có khiến.",
      "Ăn ngay nói thật, mọi tật mọi lành.",
      "Mất lòng trước, được lòng sau.",
      "Thuốc đắng giã tật, sự thật mất lòng.",
      "Phải trái phân minh, nghĩa tình trọn vẹn.",
      "Giấy rách phải giữ lấy lề.",
      "Lời hơn lẽ thiệt.",
      "Khôn chẳng qua lẽ, khỏe chẳng qua lời.",
      "Lời hay lẽ phải.",
      "Nói phải củ cải cũng nghe.",
      "Ăn ngay nói phải.",
      "Nghe điều phải thích lời hay.",
      "Sự thật che sự bóng.",
      "Khó mà biết lẽ biết lời\nBiết ăn biết ở như người giàu sang.",
      "Làm người phải đắn phải đo\nPhải cân nặng nhẹ, phải dò nông sâu.",
      "Khôn ngoan ba chốn bốn bề\nĐừng cho ai lấn chớ bề lấn ai.",
      "Làm người suy chín xét xa\nCho từng gốc nhọc, cho ra vắn dài.",
      "Những người tính nết thật thà\nĐi đâu cũng được người ta tin dùng.",
      "Tu thân rồi mới tề gia\nLòng ngay nói thật gian tà mặc ai.",
      "Ban ngày quan lớn như thần\nBan đêm quan lớn tần mần như ma.",
      "Cười người chớ vội cười lâu\nCười người hôm trước hôm sau người cười.",
      "Đói cho sạch, rách cho thơm\nChớ có bờm xôm, để đời tiếng xấu.",
      "Của thấy không xin\nCủa công giữ gìn\nCủa rơi không nhặt.",
      "Mặc đẹp chưa hẳn đã là sang\nKém phẩm vô tâm, khạc nhổ càng",
      "Tư cách trang đài, do biết nghĩ\nKín đáo, sạch sẽ tướng thật sang.",
      "Ăn cho đều, kêu cho sòng.",
      "Bênh lí, không bênh thân.",
      "Cầm cân nảy mực.",
      "Cần kiệm, liêm chính, chí công, vô tư.",
      "Chớ dong kẻ gian, chớ oan người ngay.",
      "Công ai nấy nhớ, tội ai nấy chịu.",
      "Làm trai chớ nghề bầu chủ, làm gái chớ nghề mụ dầu.",
      "Làm trai cứ nước hai mà nói.",
      "Người trên đứng đắng, kẻ dưới dám nhờn.",
      "Quân pháp bất vị thân.",
      "Tài thượng phân minh thị trượng phu.",
      "Tha kẻ gian, oan người ngay.",
      "Thượng bất chính, hạ tắc loạn.",
      "Trốn việc quan đi ở chùa.",
      "Vay thì trả, chạm thì đền.",
      "Áo rách cốt cách người thương.",
      "Đói cho sạch, rách cho thơm.",
      "Làm trai bạt núi phá rừng\nNước sông tát cạn vẫy vùng bể khơi.",
      "Làm trai cho đáng nên trai\nKhom lưng uốn gối gánh hai hạt vừng.",
      "Khôn ngoan tính trọn mọi bề\nChẳng cho ai lận, chẳng hề lận ai.",
      "Làm trai quyết chí tu thân\nCông danh chớ vội, nợ nần chớ lo.",
      "Bề trên ở chẳng kỷ cương\nCho nên kẻ dưới lập đường mây mưa.",
      "Thương em anh để trong lòng\nViệc quan anh cứ phép công anh làm.",
      "Chí làm trai dặm nghìn yên ngựa\nGieo Thái Sơn nhẹ tựa hồng mao.",
      "Làm trai cho đáng nên trai\nXuống Đông, Đông tĩnh, lên Đoài, Đoài yên.",
      "Làm trai cho đáng nên trai\nPhú Xuân đã trải Đồng Nai đã từng.",
      "Làm trai nết đủ năm đường\nTrước tiên điều hiếu đạo thường xưa nay",
      "Công cha đức mẹ cao dày\nCưu mang trứng nước những ngày ngây thơ",
      "Nuôi con khó nhọc đến giờ\nTrưởng thành con phải biết nhờ hai thân",
      "Thức khuya dậy sớm chuyên cần\nQuạt nồng ấp lạnh giữ phần đạo con.",
      "Tự trọng người lại trọng thân.",
      "Áo rách cốt cách người thương",
      "Kính lão đắc thọ.",
      "Đất có thổ công, sông có hà bá.",
      "Có đi có lại mới toại lòng nhau.",
      "Đường mòn nhân nghĩa không mòn.",
      "Tự trọng người lại trọng than.",
      "Trọng nghĩa khinh tài.",
      "Một chữ cũng là thầy, nửa chữ cũng là thầy.",
      "Ăn có mời, làm có khiến.",
      "Tôn sư trọng đạo.",
      "Không thầy đố mày làm nên.",
      "Nhập gia tùy tục.",
      "Kính già yêu trẻ.",
      "Vay thì trả, chạm thì đền.",
      "Chim khôn kêu tiếng rảnh rang\nNgười khôn nói tiếng dịu dàng dễ nghe.",
      "Tánh bần tiện sanh do tánh tham khởi\nMuốn thanh cao phải diệt trừ tham.",
      "Chữ tín thay đức con người\nCủa mượn gìn giữ xong rồi trả ngay.",
      "Ai ơi đừng tham của người\nLấy một phải trả gấp mười về sau.",
      "Của người nhọc đổ mồ hôi\nChớ vì tham đắm cướp về tay ta.",
      "Cười người chớ vội cười lâu\nCười người hôm trước, hôm sau người cười.",
      "Lâu ngày nhớ lại kẻo quên\nTình thân nghĩa cũ có bền hay không?",
      "Làm người suy chín xét xa\nCho tường gốc, ngọn, cho ra vắn dài.",
      "Khó mà biết lẽ biết lời\nBiết ăn biết ở hơn người giàu sang.",
      "Vay chín thì trả cả mười\nPhòng khi túng lỡ có người cho vay.",
      "Kim vàng, ai nỡ uốn câu\nNgười không ai nỡ nói nhau nặng lời",
      "Lời nói chẳng mất tiền mua\nLựa lời mà nói cho vừa lòng nhau.",
      "Chim khôn kêu tiếng rãnh rang\nNgười khôn nói tiếng dịu dàng dễ nghe.",
      "Khó mà biết lẽ biết lời\nBiết ăn biết ở hơn người giàu san",
      "Nói người phải nghĩ đến ta\nThử sờ lên gáy xem xa hay gần",
      "Nói người phải nghĩ đến thân\nThử sờ lên gáy xem gần hay xa.",
      "Thuốc đắng giã tật - Sự thật mất lòng",
      "Ăn ngay nói thẳng.",
      "Ăn ngay nói thật mọi tật mọi lành.",
      "Một câu nói ngay bằng ăn chay cả tháng.",
      "Mất lòng trước, được lòng sau.",
      "Cây ngay không sợ chết đứng",
      "Mật ngọt chết ruồi.",
      "Một lần bất tín, vạn lần bất tin.",
      "Thẳng mực thì đau lòng gỗ.",
      "Thẳng như ruột ngựa.",
      "Những người tính nết thật thà\nĐi đâu cũng được người ta tin dùng.",
      "Tu thân rồi mới tề gia\nLòng ngay nói thật gian tà mặc ai.",
      "Đừng bảo rằng trời không tai\nNói đơm nói đặt cậy tài mà chi.",
      "Của phi nghĩa có giàu đâu,\nỞ cho ngay thẳng giàu sau mới bền.",
      "Người gian thì sợ người ngay.\nNgười ngay chẳng sợ đường cày cong queo.",
      "Chớ nghe lời phỉnh tiếng phờ\nThò tay vào lờ mắc kẹt cái hom.",
      "Khôn ngoan chẳng lọ thật thà\nLường thưng tráo đấu chẳng qua đong đầy.",
      "Bề ngoài thơn thớt nói cười\nMà trong gian hiểm giết người không đao.",
      "Đời loạn mới biết tôi trung\nTuế hàn mới biết bá tùng kiên tâm.",
      "Nhà nghèo yêu kẻ thật thà\nNhà quan yêu kẻ giàu ra nịnh thần.",
      "Người ngay mắc cạn, kẻ gian vui cười.",
      "Cứu vật, vật trả ơn, cứu nhân, nhân trả oán.",
      "Lá lành đùm lá rách.",
      "Thương người như thể thương thân.",
      "Chị ngã em nâng.",
      "Kính lão đắc thọ.",
      "Làm việc phi pháp, sự ác đến ngay.",
      "Mưu thâm họa diệt thâm.",
      "Sát nhân, giả tử.",
      "Nọc người bằng mười nọc rắn.",
      "Ở hậu gặp hậu, ở bạc gặp bạc.",
      "Đời trước đắp nấm, đời sau ấm mồ.",
      "Ngu si hưởng thái bình.",
      "Thánh nhân đãi kẻ khù khờ.",
      "Khôn sống, mống chết.",
      "Đẹp nết hơn đẹp người.",
      "Sướng một lúc, khổ một đời.",
      "Trách mình trước, trách người sau.",
      "Tốt danh hơn lành áo.",
      "Cái nết đánh chết cái đẹp.",
      "Cười người ba tháng, ai cười ba năm.",
      "Nhà sạch thì mát, bát sạch ngon cơm.",
      "Một miếng khi đói bằng gói khi no.",
      "Một câu nhịn là chín câu lành.",
      "Ăn coi nồi ngồi coi hướng.",
      "Giấy rách phải giữ lấy lề.",
      "Anh em trong nhà, đóng cửa dạy nhau.",
      "Anh em thuận hòa là nhà có phúc.",
      "Ở hiền gặp lành.",
      "Chết giả mới biết dạ anh em.",
      "Tiền bạc đi trước mực thước đi sau.",
      "Người có lúc vinh, lúc nhục.",
      "Sông có khúc, người có lúc.",
      "Uống nước nhớ nguồn.",
      "Giấy rách phải giữ lề.",
      "Thức lâu mới biết đêm dài, ở lâu mới biết con người có nhân.",
      "Hết tiền tài, hết nhân nghĩa.",
      "Quân tử lông chân, tiểu nhân lông bụng.",
      "Lòng sông lòng bể dễ dò, ai từng bẻ thước mà đo lòng người.",
      "Anh hùng đa nạn, hồng nhân đa truân.",
      "Thấy có thóc mới cho vay gạo.",
      "Biết đâu mà há miệng chờ ho.",
      "Nhác đâm thì đổi chày, nhác xay thì đổi cối.",
      "Giận mất khôn, lo mất ngon.",
      "Đánh nhau chia gạo, chào nhau ăn cơm.",
      "Tiền trong nhà tiển chửa, tiền ra cửa tiền đẻ.",
      "Treo đầu dê, bán thịt chó.",
      "Ăn gian nó giàn ra đấy.",
      "Mua bán chợ đen, thân quen nhiều ngách.",
      "Quen mặt đắt hàng.",
      "Buôn có bạn bán có phường.",
      "Bán quạt mùa đông, buôn hồng mùa hè.",
      "Mua trâu bán chả, mua vải bán áo.",
      "Phước đức quí hơn bạc vàng\nMấy người gian ác giàu sang ích gì?",
      "Dò sông, dò bể, dò nguồn,\nBiết sao được bụng lái buôn mà dò.",
      "Chợ đang đông em không toan liệu,\nChợ tan rồi em bán chịu không ai mua.",
      "Đi buôn không lỗ thì lời,\nĐi ra cho biết mặt trời mặt trăng.",
      "Chẳng lo bán ế chợ ròng,\nKhách năng qua lại, đói lòng phải mua.",
      "Cái vòng danh lợi cong cong,\nKẻ hòng ra khỏi, người mong bước vào.",
      "Vay chín thì phải trả mười,\nPhòng khi túng lỡ có người cho vay.",
      "Bánh đúc mà đổ ra sàng\nThuận anh anh bán, thuận nàng nàng mua.",
      "Ăn quả nhớ kẻ trồng cây.",
      "Ăn vóc học hay.",
      "Học thầy không tày học bạn.",
      "Không thầy đố mày làm nên.",
      "Mồng 1 tết cha, mồng ba tết thầy.",
      "Một chữ cũng là thầy, nửa chữ cũng là thầy.",
      "Một gánh sách không bằng một giáo viên giỏi.",
      "Một kho vàng không bằng một nang chữ.",
      "Muốn biết phải hỏi, muốn giỏi phải học.",
      "Muốn sang thì bắc cầu kiều, muốn con hay chữ thì yêu lấy thầy.",
      "Người không học như ngọc không mài.",
      "Nhất quý nhì sư",
      "Nhất tự vi sư, bán tự vi sư.",
      "Ông bảy mươi học ông bảy mốt.",
      "Tiên học lễ, hậu học văn.",
      "Trọng thầy mới được làm thầy.",
      "Gươm vàng rớt xuống Hồ Tây\nƠn cha nghĩa trọng công thầy cũng sâu.",
      "Mấy ai là kẻ không thầy\nThế gian thường nói đố mày làm nên.",
      "Vua, thầy, cha, ấy va ngôi\nKính thờ như một, trẻ ơi ghi lòng.",
      "Mười năm rèn luyện sách đèn\nCông danh gặp bước, chớ quên ơn thầy.",
      "Mẹ cha công đức sinh thành\nRa trường thầy dạy học hành cho hay.",
      "Con ơi ham học chớ đùa\nBữa mô ngày Tết thỉnh bùa thầy đeo.",
      "Cơm cha, áo mẹ, chữ thầy\nNghĩ sao cho bõ những ngày ước mong.",
      "Ơn thầy soi lối mở đường\nCho con vững bước dặm trường tương lai",
      "Con ơi ghi nhớ lời này\nCông cha, nghĩa mẹ, công thầy chớ quên.",
      "Chữ thầy trong cõi người ta\nDặm dài hoa nắng trời xa biển đầy.",
      "Dạy con từ thửo tiểu sinh\nGần thầy gần bạn tập tành lễ nghi",
      "Học cho \"cách vật trí tri\"\nVăn chương chữ nghĩa nghề gì cũng thông.",
      "Ai người đánh thức đêm trường mộng\nAi soi đường lồng lộng ánh từ quang",
      "Ơn Thầy không bằng gốc bễ\nNghĩa Thầy gánh vác cuộc đời học sinh.",
      "Ăn quả nhớ kẻ trồng cây\nCó danh có vọng nhớ thầy khi xưa.",
      "Công cha, áo mẹ, chữ thầy\nGắng công mà học có ngày thành danh.",
      "Mười năm rèn luyện sách đèn\nCông danh gặp ước, chớ quên ơn thầy.",
      "Tạ ơn thầy đã dẫn con vào rừng tri thức\nCảm nghĩa cô đã dắt trò đến biển yêu thương.",
      "Con hơn cha là nhà có phúc\nTrò hơn thầy là đất nước yên vui.",
      "Dốt kia thì phải cậy thầy\nVụng kia cậy thợ thì mày làm nên.",
      "Đến đây viếng cảnh viếng thầy\nKhông say mùi đạo cũng khuây mùi trần.",
      "Bẻ lau làm viết chép văn\nÂu Dương có mẹ dạy răn như thầy.",
      "Ở đây gần bạn gần thầy\nCó công mài sắt có ngày nên kim",
      "Ai thắp lửa bồ đề tỏa sáng\nĐạo vô vi sưởi ấm cả trần gian.",
      "Khó thì hết thảo hết ngay\nCông cha cũng bỏ, nghĩa thầy cũng quên.",
      "Dòng sông sâu con sào dài đo được\nLòng người đưa đò ai biết được sự bao la.",
      "Ơn dạy dỗ cao tường hơn núi\nNghĩa thầy trò như nước biển khơi.",
      "Lời cô giảng dạy khuyên răn\nLà hành trang của tháng năm vào đời.",
      "Ơn của thầy bao la vô tận\nBiển rộng sông dàu có sánh được đâu.",
      "Chân trời góc bể có lúc tận cùng\nƠn thầy cô không bao giờ cùng tận.",
      "Mai đây trên bước đường dài\nCông thành danh toại danh toại nhớ hoài ơn cô.",
      "Ân truyền thụ minh tâm khắc trí\nNghĩa sinh thành tạc dạ lưu tâm.",
      "Thầy cô luôn là ngọn đèn soi sáng\nDẫn lối em đi đến những ước mơ.",
      "Cảm ơn thầy cho em tất cả\nNgười cho em cuộc sống muôn màu.",
      "Ơn cô tô điểm vàng son\nTỏa vầng tri thức trang tròn ước mơ",
      "Ơn thầy vời vợi non cao\nHọc trò khắc cốt ghi sâu suốt đời",
      "Người bắt cầu đưa em sang sông\nDẫu ngàn năm vẫn nhớ câu ơn người.",
      "Dẫu mai đi trọn phương trời\nNhững lời thầy dạy đời đời khắc ghi.",
      "Em vẫn biết đời người là hữu hạn\nNhưng lòng cô là vô hạn tình người.",
      "Ăn cùng mâm, nằm cùng chiếu.",
      "Chọn bạn mà chơi, chọn nơi mà ở.",
      "Giàu vì bạn, sang vì vợ.",
      "Học thầy không tày học bạn.",
      "Kẻ thù của kẻ thù là bạn.",
      "Kết thù thành bạn.",
      "Lắm kẻ yêu hơn nhiều người ghét.",
      "Một con ngựa đau cả tàu bỏ cỏ.",
      "Tình bạn là bản tình ca tuyệt vời.",
      "Trong hoạn nạn mới biết ai là người bạn tốt.",
      "Tứ hải giai huynh đệ.",
      "Bạn bè chung thủy, dưới trên đàng hoàng.",
      "Khi nào trái đất còn quay\nTrái tim còn đập vẫn là bạn nhau.",
      "Tình bạn là vạn bông hoa\nTình bạn là vạn bài ca muôn màu.",
      "Bạn bè là nghĩa tương tri\nSao cho sau trước một bờ mới nên.",
      "Ai ơi nhớ lấy câu này\nTình bạn là mối duyên thừa trời cho.",
      "Sống trong bể ngọc kim cương\nKhông bằng sống giữa tình thương bạn bè.",
      "Bạn bè là nghĩa tương tri\nSao cho sau trước một bề mới nên.",
      "Đi xa mà gặp bạn hiền\nCũng bằng ăn quả đào tiên trên trời.",
      "Tuy rằng xứ bắc, xứ đông\nKhắp trong bờ cõi cũng dòng anh em.",
      "Ra về nhớ bạn khóc thầm\nNăm thân áo vải ướt đầm cả năm.",
      "Chim lạc bầy thương cây nhớ cội\nXa bạn xa bè, lặn lội tìm nhau.",
      "Mùa hoa phượng là mùa thi cử\nChúc bạn hiền hai chữ thành công.",
      "Bạn bè ít thôi vừa đủ dùng\nChứ đừng để cả thùng\nRồi lâm vào đường cùng\nPhút cuối cùng nó mới đi cúng.",
      "Sông Cửu Long nghìn năm vẫn chảy\nNghĩa bạn bè mãi mãi không phai.",
      "Suốt đời gắn bó keo sơn\nCùng chung trí hướng cùng nhau kết tình.",
      "Bạn bè là nghĩa tương thân\nKhó khăn, thuận lợi ân cần có nhau.",
      "Bạn bè là nghĩa trước sau\nTuổi thơ cho đến bạc đầu không phai.",
      "Lúc ăn chơi sao không gọi bạn?\nLúc hoạn nạn cứ gọi bạn ơi…",
      "Lúc ăn chơi ở đâu cũng thấy bạn\nLúc hoạn nạn gọi bạn chẳng thấy đâu.",
      "Ăn cùng mâm, nằm cùng chiếu.",
      "Bạn bè là nghĩa tương tri\nSao cho sau trước một bờ mới nên.",
      "Chọn bạn mà chơi, chọn nơi mà ở.",
      "Gần mực thì đen, gần đèn thì rạng.",
      "Học thầy không tày học bạn.",
      "Lắm kẻ yêu hơn nhiều người ghét.",
      "Sao cho sau trước một bờ mới nên.",
      "Thêm bạn bớt thù.",
      "Trong hoạn nạn mới biết ai là người bạn tốt.",
      "Trong khốn khó mới biết bạn tốt.",
      "Tứ hải giai huynh đệ.",
      "Sống trong bể ngọc kim cương,\nKhông bằng sống giữa tình thương bạn bè.",
      "Đã là bạn thì mãi mãi là bạn,\nĐừng như sông lúc cạn lúc đầy.",
      "Anh em bốn bể là nhà,\nNgười dưng khác họ vẫn là anh em.",
      "Chim lạc bầy thương cây nhớ cội,\nXa bạn xa bè, lặn lội tìm nhau.",
      "Ra về nhớ bạn khóc thầm,\nNăm thân áo vải ướt đầm cả năm.",
      "Bạn bè là nghĩa tương tri,\nSao cho sau trước một bờ mới nên.",
      "Bắt con cá lóc nướng trui,\nLàm mâm rượu trắng đãi người phương xa.",
      "Ai ơi nhớ lấy câu này,\nTình bạn là mối duyên thừa trời cho.",
      "Ra đi vừa gặp bạn thân (bạn hiền),\nCũng bằng ăn quả đào tiên trên trời.",
      "Khi nào trái đất còn quay,\nTrái tim còn đập vẫn là bạn nhau.",
      "Tuy rằng xứ Bắc, xứ Đông,\nKhắp trong bờ cõi cũng dòng anh em.",
      "Sông sâu sào vắn khó dò,\nMuốn qua thăm bạn sợ đò không đưa.",
      "Sông Cửu Long nghìn năm vẫn chảy,\nNghĩa bạn bè mãi mãi không phai.",
      "Quen nhau từ thuở hàn vi,\nBây giờ sang trọng sá chi thân hèn.",
      "Suốt đời gắn bó keo sơn,\nCùng chung trí hướng cùng nhau kết tình.",
      "Tuy rằng xứ Bắc, xứ Đông,\nKhắp trong bờ cõi cũng dòng anh em.",
      "Sông sâu sào vắn khó dò,\nMuốn qua thăm bạn sợ đò không đưa.",
      "Sông Cửu Long nghìn năm vẫn chảy,\nNghĩa bạn bè mãi mãi không phai.",
      "Quen nhau từ thuở hàn vi,\nBây giờ sang trọng sá chi thân hèn.",
      "Suốt đời gắn bó keo sơn,\nCùng chung trí hướng cùng nhau kết tình.",
      "Tình bạn là vạn bông hoa\nTình bạn là vạn bài ca muôn màu.",
      "Tình bạn là cái chi chi,\nNướng con cá lóc chơi liền một ve.",
      "Chơi xong mới thấy ngà ngà,\nÔm nhau một cái bạn bè muôn năm.",
      "Thói thường gần mực thì đen,\nAnh em bạn hữu phải nên chọn người.",
      "Những người lêu lổng chơi bời,\nCùng là lười biếng ta thời tránh xa.",
      "Ai ơi nhớ lấy câu này,\nTình bạn là mối duyên thừa trời cho.",
      "Bạn bè là nghĩa tương tri,\nSao cho sau trước một bờ mới nên.",
      "Bắt con cá lóc nướng trui,\nLàm mâm rượu trắng đãi người phương xa.",
      "Bạn bè là nghĩa tương thân,\nKhó khăn, thuận lợi ân cần có nhau.",
      "Bạn bè là nghĩa trước sau,\nTuổi thơ cho đến bạc đầu không phai.",
      "Suốt đời gắn bó keo sơn,\nCùng chung trí hướng cùng nhau kết tình.",
      "Mùa hoa phượng là mùa thi cử\nChúc bạn hiền hai chữ thành công",
      "Cho tôi tôi chọn hoa hồng\nCho tôi chọn bạn tấm lòng thủy chung",
      "Ra đi vừa gặp bạn thân (bạn hiền),\nCũng bằng ăn quả đào tiên trên trời.",
      "Khi nào trái đất còn quay,\nTrái tim còn đập vẫn là bạn nhau.",
      "Sống trong bể ngọc kim cương,\nKhông bằng sống giữa tình thương bạn bè.",
      "Chim lạc bầy thương cây nhớ cội,\nXa bạn xa bè, lặn lội tìm nhau.",
      "Ra về nhớ bạn khóc thầm,\nNăm thân áo vải ướt đầm cả năm.",
      "Tuy rằng xứ Bắc, xứ Đông,\nKhắp trong bờ cõi cũng dòng anh em.",
      "Sông sâu sào vắn khó dò,\nMuốn qua thăm bạn sợ đò không đưa.",
      "Sông Cửu Long nghìn năm vẫn chảy,\nNghĩa bạn bè mãi mãi không phai.",
      "Đã là bạn thì mãi mãi là bạn,\nĐừng như sông lúc cạn lúc đầy.",
      "Anh em bốn bể là nhà,\nNgười dưng khác họ vẫn là anh em.",
      "Quen nhau từ thuở hàn vi,\nBây giờ sang trọng sá chi thân hèn.",
      "Bạn bè là nghĩa tương thân.\nKhó khăn, thuận lợi ân cần có nhau.",
      "Bạn bè là nghĩa trước sau.\nTuổi thơ cho đến bạc đầu không phai",
      "Mực xanh giấy trắng viết ngắn còn dài\nMong rằng tình bạn nhớ hoài ngàn năm",
      "Tình bạn tươi thắm như hoa\nTình bạn là bản tình ca tuyệt vời",
      "Ai đi đâu đấy hỡi ai?\nHay là trúc đã nhớ mai đi tìm.",
      "Tìm em như thể tìm chim,\nChim bay miền Bắc, đi tìm biển Đông.",
      "Yêu nhau thì ném miếng trầu,\nGhét nhau ném đá vỡ đầu nhau ra.",
      "Yêu nhau cau bổ làm ba,\nGhét nhau cau sáu bổ ra làm mười.",
      "Anh đi đường ấy xa xa,\nĐể em ôm bóng trăng tà năm canh.",
      "Nước non một gánh chung tình,\nNhớ ai ai có nhớ mình hay không?",
      "Yêu nhau chẳng quản lầm than,\nMấy sông cũng lội, mấy ngàn cũng qua.",
      "Bán anh em xa mua láng giếng gần.",
      "Ăn cây nào, rào cây ấy",
      "Kính lão, đắc thọ",
      "Dẫu rằng chí thiễn tài hèn\nChịu khó nhẫn nại làm nên cơ đồ.",
      "Ai ơi giữ chí cho bền\nDù ai xoay hướng đổi nền mặc ai.",
      "Hãy cho bền chí câu cua,\nDù ai câu chạch câu rùa mặc ai.",
      "Người đời ai khỏi gian nan\nGian nan có thuở thanh nhàn có khi.",
      "Có bột mới gột nên hồ\nTay không mà dựng cơ đồ mới ngoan.",
      "Bầu ơi thương lấy bí cùng\nTuy rằng khác giống nhưng chung một giàn.",
      "Một cây làm chẳng nên non\nBa cây chụm lại lên hòn núi cao.",
      "Ngọc kia chuốt mãi cũng tròn,\nSắt kia mài mãi cũng còn nên kim.",
      "Ăn cây nào, rào cây đó.",
      "Ăn cháo, đá bát.",
      "Ăn chưa no,lo chưa tới.",
      "Ăn cỗ đi trước,lội nước đi sau",
      "Ăn cơm mới,trò chuyện cũ",
      "Ăn khoai nhớ kẻ cho dây mà trồng",
      "Ăn không ngồi rồi",
      "Ăn kĩ no lâu,cày sâu tốt lúa.",
      "Ăn quả nhớ kẻ trồng cây",
      "Ăn trông nồi, ngồi trông hướng",
      "Anh em như thể tay chân",
      "Ba mặt một lời.",
      "Bán anh em xa, mua láng giềng gần.",
      "Bạn bè là nghĩa tương tri.",
      "Bán quạt mùa đông, mua bông mùa hè.",
      "Bắt cá hai tay.",
      "Bắt người có tóc, ai bắt kẻ trọc đầu.",
      "Bé không vịn,lớn cả gãy cành.",
      "Bênh lý không bênh thân",
      "Biết thì thưa thốt, không biết thì dựa cột mà nghe.",
      "Bỏ thì thương, vương thì tội.",
      "Bóc ngắn cắn dài.",
      "Bốn bể mười nhà.",
      "Cá lớn nuốt cá bé.",
      "Cái khó ló cái khôn",
      "Cái răng,cái tóc là góc con người.",
      "Cãi thầy núi đè",
      "Cáo chết ba năm quay đầu về núi.",
      "Cây muốn lặng mà gió chẳng dừng.",
      "Cây ngay không sợ chết đứng.",
      "Cày sâu cuốc bẫm",
      "Chân cứng đá mềm.",
      "Chân yếu tay mềm",
      "Chết đứng còn hơn sống quỳ.",
      "Chết trong còn hơn sống đục.",
      "Chết vinh còn hơn sống nhục.",
      "Chị ngã, em nâng.",
      "Chớ dung kẻ gian, chớ oan người ngay",
      "Chớ thấy sóng cả mà rã tay chèo.",
      "Chung lưng đấu sức",
      "Chuột sa chĩnh gạo.",
      "Có công mài sắt, có ngày nên kim.",
      "Con có cha như nhà có nóc",
      "Con hơn cha là nhà có phúc",
      "Con không nghe mẹ nghe cha, mắm không ưa muối thì ắt là đổ đi",
      "Còn nước, còn tát",
      "Cọp chết để da, người ta chết để tiếng.",
      "Của ăn của để",
      "Của một đồng, công một nén.",
      "Đã nghèo còn mắc cái eo",
      "Đèn nhà ai nhà nấy rạng.",
      "Đi hỏi già, về nhà hỏi trẻ.",
      "Đi một ngày đàng học một sàng khôn.",
      "Đi với phật thì mặc áo cà sa, đi với ma thì mặc áo giấy.",
      "Đói cho sạch, rách cho thơm.",
      "Đổi trắng thay đen.",
      "Đứng mũi chịu sào.",
      "Đa đa ích thiện",
      "Gần mực thì đen, gần đèn thì sáng.",
      "Gạo chợ,nước sông,củi đồng,nồi đất.",
      "Gậy ông đập lưng ông.",
      "Ghét của nào trời trao của nấy.",
      "Giận quá mất khôn.",
      "Giấu đầu hở đuôi.",
      "Giấy rách phải giữ lấy lề.",
      "Gieo gió gặt bão",
      "Gió bấc hiu hiu, sếu kêu thì rét.",
      "Góp gió thành bão",
      "Gừng càng già càng cay.",
      "Gừng cay muối mặn",
      "Khéo ăn thì no, khéo co thì ấm.",
      "Khôn đâu tới trẻ, khỏe đâu tới già.",
      "Khôn không qua lẽ, khỏe chẳng qua lời.",
      "Khôn nhà dại chợ.",
      "Không có lửa làm sao có khói.",
      "Không làm sao nên.",
      "Kiến tha lâu cũng đầy tổ.",
      "Kính lão đắc thọ.",
      "Kính trên nhường dưới.",
      "Lá lành đùm lá rách",
      "Lá rụng về cội",
      "Liệu cơm gắp mắm.",
      "Lời nói chẳng mất tiền mua lựa lời mà nói cho vừa lòng nhau",
      "Lời nói là đọi máu, lời nói là gói vàng",
      "Lòng tham vô đáy",
      "Lửa thử vàng, gian nan thử sức",
      "Lùi một bước tiến ngàn dặm",
      "Mạnh vì gạo, bạo vì tiền.",
      "Mất lòng thánh, được lòng thần",
      "Mất lòng trước, được lòng sau.",
      "Mau sao thì nắng,vắng sao thì mưa",
      "Mềm nắn, rắn buông.",
      "Mềm quá thì yếu, cứng quá thì gãy.",
      "Mèo què bị trận chó đòi",
      "Miếng ăn là miếng nhục",
      "Môi hở răng lạnh.",
      "Mống đông vồng tây, chẳng mưa dây bão cũng giật",
      "Một câu nhịn, chín câu lành .",
      "Một cây làm chẳng nên non ba cây chụm lại nên hòn núi cao",
      "Một con chim én không làm nên mùa xuân.",
      "Một con ngựa đau, cả tàu bỏ cỏ.",
      "Một điều nhịn chín điều lành .",
      "Một giọt máu đào hơn ao nước lã.",
      "Một mặt người bằng mười mặt của.",
      "Một miếng khi đói bằng một gói khi no.",
      "Một miệng thì kín, chín miệng thì hở",
      "Một người biết lo bằng kho người làm.",
      "Một nụ cười bằng mười thang thuốc bổ",
      "Mưa dầm thấm lâu",
      "Mưa tháng ba hoa đất, mưa tháng tư hư đất",
      "Mũi dại, lái phải chịu đòn.",
      "Muốn ăn cá cả phải thả câu dài.",
      "Muốn ăn thì lăn vào bếp.",
      "Muốn biết phải hỏi, muốn giỏi phải học..",
      "Muốn gì được nấy",
      "Mưu sự tại nhân thành sự tại thiên.",
      "Năng làm thì nên.",
      "Nghèo sinh bệnh, giàu sinh tật.",
      "Người đẹp vì lụa, lúa tốt vì phân.",
      "Người sống hơn đống vàng.",
      "Người ta là hoa đất",
      "Người thanh tiếng nói cũng thanh, chuông kêu khẽ đánh bên thành cũng kêu",
      "Ngưu tầm ngưu, mã tầm mã.",
      "Nhà giàu đứt tay bằng ăn mày đổ ruột",
      "Nhà sạch thì mát, bát sạch ngon cơm",
      "Nhất canh trì,nhị canh viên, tam canh điền",
      "Nhất nước, nhì phân, tam cần, tứ giống",
      "Nhất quỷ, nhì ma ,thứ 3 học trò.",
      "Nhất thì, nhì thục",
      "No mất ngon, giận mất khôn.",
      "Nói có sách, mách có chứng.",
      "Nước chảy đá mòn.",
      "Nước chảy về nguồn, lá rụng về cội.",
      "Nước đến chân mới nhảy",
      "Nước lã không khuấy nên hồ.",
      "Nước lã mà vã nên hồ, tay không mà nổi cơ đồ mới ngoan",
      "Ở bầu thì tròn, ở ống thì dài.",
      "Ở chọn nơi, chơi chọn bạn",
      "Ở hiền gặp lành, ở ác gặp ác",
      "Oan có đầu, nợ có chủ",
      "Oán không giải được oán",
      "Oan oan tương báo , dỉ hận miên miên",
      "Phúc bất trùng lai, hoạ vô đơn chí.",
      "Phú quý sinh lễ nghĩa , bần cùng sinh đạo tặc",
      "Phòng bệnh hơn chữa bệnh.",
      "Quân tử nhất ngôn",
      "Quả báo nhãn tiền",
      "Ruộng bề bề chẳng bằng nghề trong tay.",
      "Rừng vàng biển bạc",
      "Rau nào sâu nấy.",
      "Rừng nào cọp nấy",
      "Sai một li đi một dặm",
      "Sáng ướt áo, trưa ráo đầu",
      "Sinh lão bệnh tử",
      "Sinh nghề tử nghiệp",
      "Sông có khúc, người có lúc",
      "Sông sâu sóng cả chớ ngã tay chèo",
      "Sóng trước đổ đâu, sóng sau đổ đó",
      "Sóng Trường Giang, sóng sau đập sóng trước",
      "Tấc đất tấc vàng",
      "Tai vách mạch rừng",
      "Tay làm hàm nhai, tay quai miệng trễ",
      "Tham giàu phụ khó, tham sang phụ bần",
      "Thắng không kiêu, bại không nản",
      "Thắng làm vua thua làm giặc",
      "Thẳng như ruột ngựa",
      "Thất bại là mẹ thành công",
      "Thích thì vô không thích thì vô",
      "Thua keo này bày keo khác",
      "Thùng rỗng kêu to",
      "Thuốc đắng dã tật, sự thật mất lòng",
      "Thương người như thể thương thân",
      "Tiên học lễ hậu học văn",
      "Tiền nào của nấy",
      "Tốt danh hơn lành áo",
      "Tốt gỗ hơn tốt nước sơn",
      "Trăng quầng thì hạn, trăng tán thì mưa",
      "Trâu chậm uống nước đục",
      "Trống đánh xuôi, kèn thổi ngược",
      "Vạch áo cho người xem lưng.",
      "Vắng chủ nhà gà mọc đuôi tôm.",
      "Vắng chủ nhà gà vọc niêu tôm.",
      "Vàng thật không sợ lửa.",
      "Vắt chanh bỏ vỏ.",
      "Vắt cổ chày ra nước.",
      "Vặt đầu cá, vá đầu tôm.",
      "Vẽ đường cho hươu chạy.",
      "Việc người thì sáng, việc mình thì quáng.",
      "Việc nhà thì nhác, việc chú bác thì siêng.",
      "Vơ đũa cả nắm.",
      "Vỏ quít dày, móng tay nhọn.",
      "Vỏ quýt dày có móng tay nhọn.",
      "Vong ân bội nghĩa.",
      "Vừa ăn cướp, vừa la làng.",
      "Vụng múa, chê đất lệch.",
      "Xa nhà cách trường.",
      "Xa mặt cách lòng.",
      "Xanh vỏ đỏ lòng.",
      "Yêu nên tốt, ghét nên xấu",
      "Yêu nhau lắm, cắn nhau đau",
      "Yêu nhau yêu cả đường đi ghét nhau ghét cả tông chi họ hàng",
      "Yêu nhau cau sáu bổ ba, ghét nhau cau sáu bổ ra làm mười"
  ];
  // ===== Ca dao tục ngữ =====


  // ===== Cát tinh / Hung tinh / Thần sát =====
  const CAT_TINH = {
    "Thiên Đức": "Tốt mọi việc, nhất là cầu tài, cầu phúc",
    "Nguyệt Đức": "Cưới hỏi, cầu phúc, khai trương",
    "Thiên Hỷ": "Hỷ sự, cưới hỏi, gặp gỡ",
    "Tam Hợp": "Mọi việc hanh thông, cầu tài lộc thuận",
    "Lục Hợp": "Hòa thuận, cưới hỏi, giao dịch"
  };

  const HUNG_TINH = {
    "Thiên Cương": "Hung sự, kỵ xây dựng, khai trương",
    "Địa Tặc": "Kỵ xuất hành, mất mát",
    "Nguyệt Kỵ": "Ngày xấu, đại kỵ khởi sự lớn",
    "Không Vong": "Kỵ giao dịch, ký kết",
    "Tiểu Hồng Sa": "Kỵ cưới hỏi"
  };

  const THAN_SAT = {
    "Tý":  { cat: ["Thiên Đức"], hung: ["Địa Tặc"] },
    "Sửu": { cat: ["Nguyệt Đức"], hung: ["Thiên Cương"] },
    "Dần": { cat: ["Tam Hợp"], hung: ["Nguyệt Kỵ"] },
    "Mão": { cat: ["Thiên Hỷ"], hung: ["Không Vong"] },
    "Thìn":{ cat: ["Lục Hợp"], hung: ["Tiểu Hồng Sa"] },
    "Tỵ":  { cat: ["Thiên Đức"], hung: ["Địa Tặc"] },
    "Ngọ": { cat: ["Nguyệt Đức"], hung: ["Thiên Cương"] },
    "Mùi": { cat: ["Tam Hợp"], hung: ["Nguyệt Kỵ"] },
    "Thân":{ cat: ["Thiên Hỷ"], hung: ["Không Vong"] },
    "Dậu": { cat: ["Lục Hợp"], hung: ["Tiểu Hồng Sa"] },
    "Tuất":{ cat: ["Thiên Đức"], hung: ["Địa Tặc"] },
    "Hợi": { cat: ["Nguyệt Đức"], hung: ["Thiên Cương"] }
  };


  // ===== Core astronomy helpers =====
  function jdn(dd, mm, yy){
    let a = INT((14 - mm) / 12);
    let y = yy + 4800 - a;
    let m = mm + 12 * a - 3;
    let jd = dd + INT((153*m+2)/5) + 365*y + INT(y/4) - INT(y/100) + INT(y/400) - 32045;
    return jd;
  }

  function jdn2dateFunc(jd){
    let Z, A, alpha, B, C, D, E, dd, mm, yyyy;
    Z = jd;
    if (Z < 2299161) {
      A = Z;
    } else {
      alpha = INT((Z-1867216.25)/36524.25);
      A = Z + 1 + alpha - INT(alpha/4);
    }
    B = A + 1524;
    C = INT((B-122.1)/365.25);
    D = INT(365.25*C);
    E = INT((B-D)/30.6001);
    dd = INT(B - D - INT(30.6001*E));
    if (E < 14) mm = E - 1; else mm = E - 13;
    if (mm < 3) yyyy = C - 4715; else yyyy = C - 4716;
    return [dd, mm, yyyy];
  }

  function decodeLunarYear(yy, k){
    let monthLengths = [29,30];
    let regularMonths = new Array(12);
    let offsetOfTet = k >> 17;
    let leapMonth = k & 0xf;
    let leapMonthLength = monthLengths[(k >> 16) & 0x1];
    let solarNY = jdn(1,1,yy);
    let currentJD = solarNY + offsetOfTet;
    let j = k >> 4;
    for (let i=0;i<12;i++){
      regularMonths[12 - i - 1] = monthLengths[j & 0x1];
      j >>= 1;
    }
    let ly = [];
    if (leapMonth === 0){
      for (let mm=1; mm<=12; mm++){
        ly.push(new LunarDate(1, mm, yy, 0, currentJD));
        currentJD += regularMonths[mm-1];
      }
    } else {
      for (let mm=1; mm<=leapMonth; mm++){
        ly.push(new LunarDate(1, mm, yy, 0, currentJD));
        currentJD += regularMonths[mm-1];
      }
      ly.push(new LunarDate(1, leapMonth, yy, 1, currentJD));
      currentJD += leapMonthLength;
      for (let mm=leapMonth+1; mm<=12; mm++){
        ly.push(new LunarDate(1, mm, yy, 0, currentJD));
        currentJD += regularMonths[mm-1];
      }
    }
    return ly;
  }

  function getYearInfo(yyyy){
    let yearCode;
    if (yyyy < 1900) yearCode = TK19[yyyy - 1800];
    else if (yyyy < 2000) yearCode = TK20[yyyy - 1900];
    else if (yyyy < 2100) yearCode = TK21[yyyy - 2000];
    else yearCode = TK22[yyyy - 2100];
    return decodeLunarYear(yyyy, yearCode);
  }

  function LunarDate(dd, mm, yy, leap, jd){
    this.day = dd; this.month = mm; this.year = yy; this.leap = leap; this.jd = jd;
  }

  const FIRST_DAY = jdn(25,1,1800);
  const LAST_DAY = jdn(31,12,2199);

  function findLunarDate(jd, ly){
    if (jd > LAST_DAY || jd < FIRST_DAY || ly[0].jd > jd){
      return new LunarDate(0,0,0,0,jd);
    }
    let i = ly.length-1;
    while (jd < ly[i].jd) i--;
    let off = jd - ly[i].jd;
    return new LunarDate(ly[i].day + off, ly[i].month, ly[i].year, ly[i].leap, jd);
  }

  function getLunarDate(dd, mm, yyyy){
    let ly = getYearInfo(yyyy);
    let jd = jdn(dd, mm, yyyy);
    if (jd < ly[0].jd){
      ly = getYearInfo(yyyy - 1);
    }
    return findLunarDate(jd, ly);
  }

  // Sun longitude (Jean Meeus)
  function SunLongitude(jd){
    let T = (jd - 2451545.0) / 36525;
    let T2 = T*T;
    let dr = PI/180;
    let M = 357.52910 + 35999.05030*T - 0.0001559*T2 - 0.00000048*T*T2;
    let L0 = 280.46645 + 36000.76983*T + 0.0003032*T2;
    let DL = (1.914600 - 0.004817*T - 0.000014*T2)*Math.sin(dr*M);
    DL = DL + (0.019993 - 0.000101*T)*Math.sin(2*dr*M) + 0.000290*Math.sin(3*dr*M);
    let L = (L0 + DL) * dr;
    L = L - PI*2*INT(L/(PI*2));
    return L;
  }
  function getSunLongitude(dayNumber, timeZone){
    return INT(SunLongitude(dayNumber - 0.5 - timeZone/24.0) / PI * 12);
  }

  function getYearCanChi(year){
    return CAN[(year+6) % 10] + " " + CHI[(year+8) % 12];
  }
  function getCanHour0(jdnv){
    return CAN[((jdnv-1)*2) % 10];
  }
  function getCanChi(lunar){
    let dayName = CAN[(lunar.jd + 9) % 10] + " " + CHI[(lunar.jd+1)%12];
    let monthName = CAN[(lunar.year*12 + lunar.month + 3) % 10] + " " + CHI[(lunar.month+1)%12];
    if (lunar.leap === 1) monthName += " (nhuận)";
    let yearName = getYearCanChi(lunar.year);
    return [dayName, monthName, yearName];
  }

  function getDayName(lunarDate){
    if (lunarDate.day === 0) return "";
    const cc = getCanChi(lunarDate);
    return "Ngày " + cc[0] + ", tháng " + cc[1] + ", năm " + cc[2];
  }

  function getGioHoangDao(jd){
    const chiOfDay = (jd + 1) % 12;
    const gioHD = GIO_HD[chiOfDay % 6];
    let ret = ""; let count = 0;
    for (let i=0; i<12; i++){
      if (gioHD.charAt(i) === '1'){
        ret += CHI[i] + " " + CHI_EMOJI[i] + 
               ' <b style="color:#ffff99;">(' + ((i*2+23)%24) + '-' + ((i*2+1)%24) + 'h)</b>';
        if (count++ < 5) ret += ", ";
      }
    }
    return ret;
  }


  function getGioHacDao(jd){
    const chiOfDay = (jd + 1) % 12;
    const gioHD = GIO_HD[chiOfDay % 6]; // Dùng chung mảng GIO_HD
    let ret = ""; let count = 0;
    for (let i=0; i<12; i++){
      if (gioHD.charAt(i) === '0'){ // Chỉ khác ở đây, tìm số '0' thay vì '1'
        ret += '<b style="color:#ff9933;">' + CHI[i] + '</b>' + " " + CHI_EMOJI[i] + 
               ' <b style="color:#ff9933;">(' + ((i*2+23)%24) + '-' + ((i*2+1)%24) + 'h)</b>';
        if (count++ < 5) ret += ", ";
      }
    }
    return ret;
  }


	function getSvgConGiap(chiIndex) {
    // Hàm này sẽ lấy SVG từ mảng có sẵn dựa trên chỉ số của Chi (0=Tý, 1=Sửu, ...)
    // Thêm CSS để giới hạn kích thước SVG hiển thị
    const svgString = svg_12congiap[chiIndex] || ""; 
    // Thay đổi style trực tiếp trong SVG để đảm bảo nó luôn có kích thước mong muốn
    return svgString.replace('<svg', '<svg style="width: 100%; height: 100%;"');
  }

// =======================================================
// ----- BẮT ĐẦU CODE MỚI - HÀM XUẤT HÀNH NÂNG CẤP -----
// =======================================================

	function getCanChiNgay(jd) {
		const can = CAN[(jd + 9) % 10];
		const chi = CHI[(jd + 1) % 12];
		return [can, chi];
	}
// ===== Hướng Xuất Hành (theo Can ngày) =====
		// Bảng Hỷ Thần & Tài Thần theo Can ngày
// ===== Hướng Xuất Hành (theo Can ngày) =====
// Bảng Hỷ Thần & Tài Thần theo Can ngày
// ===== Hướng Xuất Hành (theo Can ngày) =====
	// Định nghĩa các hướng để dễ dàng tái sử dụng và tránh lỗi chính tả
	const HUONG = {
		DONG_BAC: "Đông Bắc",
		TAY_BAC: "Tây Bắc",
		TAY_NAM: "Tây Nam",
		CHINH_NAM: "Chính Nam",
		DONG_NAM: "Đông Nam",
		CHINH_DONG: "Chính Đông",
		CHINH_BAC: "Chính Bắc",
		CHINH_TAY: "Chính Tây",
	};
	// A. HỶ THẦN: Cấu trúc dữ liệu theo đúng quy tắc gốc
	const HY_THAN_RULES = {
		[HUONG.DONG_BAC]: ["Giáp", "Kỷ"],
		[HUONG.TAY_BAC]: ["Ất", "Canh"],
		[HUONG.TAY_NAM]: ["Bính", "Tân"],
		[HUONG.CHINH_NAM]: ["Đinh", "Nhâm"],
		[HUONG.DONG_NAM]: ["Mậu", "Quý"],
	};
	// B. TÀI THẦN: Cấu trúc dữ liệu theo đúng quy tắc gốc
	const TAI_THAN_RULES = {
		[HUONG.DONG_NAM]: ["Giáp", "Ất"],
		[HUONG.CHINH_DONG]: ["Bính", "Đinh"],
		[HUONG.CHINH_BAC]: ["Mậu"],
		[HUONG.CHINH_NAM]: ["Kỷ"],
		[HUONG.TAY_NAM]: ["Canh", "Tân"],
		[HUONG.CHINH_TAY]: ["Nhâm"],
		[HUONG.TAY_BAC]: ["Quý"],
	};
	// C. HẠC THẦN
	// 16 ngày Hạc Thần không quản việc
	const HAC_THAN_FREE = new Set([
		"QuýTỵ", "GiápNgọ", "ẤtMùi", "BínhThân", "ĐinhDậu", "MậuTuất", "KỷHợi", "CanhTý",
		"TânSửu", "NhâmDần", "QuýMão", "GiápThìn", "ẤtTỵ", "BínhNgọ", "ĐinhMùi", "MậuThân"
	]);

	// 44 ngày còn lại: Chuyển đổi thành Map để tra cứu trực tiếp (hiệu quả hơn)
	// Key là Can-Chi, Value là hướng
	const HAC_THAN_MAP = new Map([
		// Hướng Đông Bắc
		["KỷDậu", HUONG.DONG_BAC], ["CanhTuất", HUONG.DONG_BAC], ["TânHợi", HUONG.DONG_BAC], ["NhâmTý", HUONG.DONG_BAC], ["QuýSửu", HUONG.DONG_BAC], ["GiápDần", HUONG.DONG_BAC],
		// Hướng Đông
		["ẤtMão", HUONG.CHINH_DONG], ["BínhThìn", HUONG.CHINH_DONG], ["ĐinhTỵ", HUONG.CHINH_DONG], ["MậuNgọ", HUONG.CHINH_DONG], ["KỷMùi", HUONG.CHINH_DONG],
		// Hướng Đông Nam
		["CanhThân", HUONG.DONG_NAM], ["TânDậu", HUONG.DONG_NAM], ["NhâmTuất", HUONG.DONG_NAM], ["QuýHợi", HUONG.DONG_NAM], ["GiápTý", HUONG.DONG_NAM], ["ẤtSửu", HUONG.DONG_NAM],
		// Hướng Nam
		["BínhDần", HUONG.CHINH_NAM], ["ĐinhMão", HUONG.CHINH_NAM], ["MậuThìn", HUONG.CHINH_NAM], ["KỷTỵ", HUONG.CHINH_NAM], ["CanhNgọ", HUONG.CHINH_NAM],
		// Hướng Tây Nam
		["TânMùi", HUONG.TAY_NAM], ["NhâmThân", HUONG.TAY_NAM], ["QuýDậu", HUONG.TAY_NAM], ["GiápTuất", HUONG.TAY_NAM], ["ẤtHợi", HUONG.TAY_NAM], ["BínhTý", HUONG.TAY_NAM],
		// Hướng Tây
		["ĐinhSửu", HUONG.CHINH_TAY], ["MậuDần", HUONG.CHINH_TAY], ["KỷMão", HUONG.CHINH_TAY], ["CanhThìn", HUONG.CHINH_TAY], ["TânTỵ", HUONG.CHINH_TAY],
		// Hướng Tây Bắc
		["NhâmNgọ", HUONG.TAY_BAC], ["QuýMùi", HUONG.TAY_BAC], ["GiápThân", HUONG.TAY_BAC], ["ẤtDậu", HUONG.TAY_BAC], ["BínhTuất", HUONG.TAY_BAC], ["ĐinhHợi", HUONG.TAY_BAC],
		// Hướng Bắc
		["MậuTý", HUONG.CHINH_BAC], ["KỷSửu", HUONG.CHINH_BAC], ["CanhDần", HUONG.CHINH_BAC], ["TânMão", HUONG.CHINH_BAC], ["NhâmThìn", HUONG.CHINH_BAC]
	]);
	function getHuongXuatHanh(jd) {
		const cc = getCanChiNgay(jd);
		const can = cc[0];
		const chi = cc[1];
		const canChi = `${can}${chi}`;
		const findDirection = (rules, canNgay) => {
				for (const [direction, cans] of Object.entries(rules)) {
						if (cans.includes(canNgay)) {
								return direction;
						}
				}
				return "Không rõ";
		};
		// 1. Tìm Hỷ Thần & Tài Thần
		const hyThan = findDirection(HY_THAN_RULES, can);
		const taiThan = findDirection(TAI_THAN_RULES, can);
		// 2. Tìm Hạc Thần
		let hacThan;
		if (HAC_THAN_FREE.has(canChi)) {
				hacThan = "— Tránh xuất hành hướng Lên Trời gặp Hạc Thần (xấu)";
		} else {
				hacThan = HAC_THAN_MAP.get(canChi) || "Không rõ";
		}
		// 3. Chuỗi kết quả
		let tot = `Hỷ Thần: <b style="color:#00ff00;">${hyThan}</b> - Tài Thần: <b style="color:#00ff00;">${taiThan}</b>`;
		let xau = `Tránh: <b style="color:#ff9933;">${hacThan}</b>`;
		return `${tot} | ${xau}`;
	}



  function getThanSat(lunarDate) {

		// Thập nhị trực
	  const TRUC_ORDER = ["Kiến","Trừ","Mãn","Bình","Định","Chấp","Phá","Nguy","Thành","Thu","Khai","Bế"];
    const st_index = getSunLongitude(lunarDate.jd, 7);
    const month_chi_list = [3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,0,0,1,1,2,2,3];
    const month_chi_index = month_chi_list[st_index];
    const day_chi_index = (lunarDate.jd + 1) % 12;
    const duty_index = (day_chi_index - month_chi_index+12) % 12;
	  const trucName = TRUC_ORDER[duty_index];
	  const trucInfo = THAP_NHI_TRUC[trucName];


    // Nhị thập bát tú
    const saoNames = Object.keys(NHI_THAP_BAT_TU);
    const jd_ref = 2451545;
    const mansion_ref_index = 16;
    const day_diff = lunarDate.jd - jd_ref;
    const current_mansion_index = (mansion_ref_index + day_diff) % 28;
    const saoName = saoNames[current_mansion_index];
    const saoInfo = NHI_THAP_BAT_TU[saoName];



    // Ngũ hành nạp âm
		const cc = getCanChi(lunarDate);
		const ngayCC = cc[0];
		const napAm = NGAY_THONG_TIN[ngayCC];
		let thongTin = "";
    if (napAm) {
        // TẠO CHUỖI GỐC VỚI \n
        let rawString = napAm.moTa + "\n" + napAm.chiTiet.join("\n");
        // THAY THẾ \n BẰNG <br> ĐỂ HIỂN THỊ TRÊN HTML
        thongTin = rawString.replace(/\n/g, '<br>');
		} else {
			thongTin = "Không có dữ liệu cho ngày này.";
		}


    const EMOJI_TRUC = {"Kiến":"🚪","Trừ":"✂️","Mãn":"🌕","Bình":"⚖️","Định":"📜","Chấp":"✍️","Phá":"💥","Nguy":"⚠️","Thành":"🏰","Thu":"🌾","Khai":"🔑","Bế":"🔒"};

    const EMOJI_SAO = {"Giác":"🐉","Cang":"🦄","Đê":"🏞️","Phòng":"🏠","Tâm":"❤️","Vĩ":"🦚","Cơ":"🧵","Đẩu":"🛶","Ngưu":"🐂","Nữ":"👩","Hư":"🌫️","Nguy":"⚠️","Thất":"7️⃣","Bích":"💎","Khuê":"📚","Lâu":"🏯","Vị":"🍽️","Mão":"🐇","Tất":"🧦","Chủy":"👄","Sâm":"🌱","Tỉnh":"💧","Quỷ":"👹","Liễu":"🌿","Tinh":"⭐","Trương":"📜","Dực":"🪽","Chẩn":"🩺"};

    return {
      truc: { 
        name: trucName, 
        info: trucInfo, 
        emoji: EMOJI_TRUC[trucName] || "" 
      },
      sao: { 
        name: saoName, 
        info: saoInfo, 
        emoji: EMOJI_SAO[saoName] || "" 
      },
      napAm: thongTin
    };
  }


  // ===== UI helpers (render month table) =====
  const DAYNAMES = ["T2","T3","T4","T5","T6","T7","CN"];
  const PRINT_OPTS = { fontSize: "13pt", tableWidth: "100%" };

  function printStyle(today, currentLunarDate, backgroundType = 'transparent'){
    const formatthutrongtuan = TUAN[(currentLunarDate.jd + 1) % 7];
    let res = "";
    res += '<style>\n';

    // --- CSS NỀN TẢNG (BỐ CỤC, KÍCH THƯỚC) DÙNG CHUNG CHO CẢ 2 CHẾ ĐỘ ---
    res += `
      :host { display: block; }
      .ha-popup { position: fixed !important; z-index: 9999; top: 0; left: 0; width: 100%; height: 100%; }

      .thang { font-size:${PRINT_OPTS.fontSize}; padding:1; line-height:100%; font-family:Tahoma,Verdana,Arial; table-layout:fixed; background-color:transparent; }

      .tet_cell{ background-color: #ff3333; color: white; border-radius: 8px;}

      .show_mai_tet { position: absolute; top: 0; left: 0; display: flex; text-align: center; width: 28%; align-items: center; justify-content: center; z-index: 100; }

      .show_dao_tet { position: absolute; top: 0; right: 0; display: flex; text-align: center; width: 24%; align-items: center; justify-content: center; z-index: 100; }

      .show_left_tet { left: 5%; position: absolute; bottom: -11px; display: flex; width: 25%; align-items: center; justify-content: center; z-index: 100; }

      .show_right_tet { right: 10%; position: absolute; bottom: -11px; display: flex; width: 20%; align-items: center; justify-content: center; z-index: 100; }

      .show_dao_tet svg, .show_mai_tet svg, .show_left_tet svg, .show_right_tet svg { max-width: 100%; max-height: 100%; }


      .show_dao_tet { transform-box: fill-box; transform-origin: 100px 20px; animation: lanternSwingSoft 4s ease-in-out infinite; }
      .show_mai_tet { transform-box: fill-box; transform-origin: 20px 100px; animation: lanternSwingSoft 4s ease-in-out infinite; }


      .ngan_cach { font-family: 'Be Vietnam Pro', sans-serif; color:rgba(255, 255, 255, 0.75); font-size: clamp(10px, 0.8vw, 14px); text-align:center; }
      .phan_cach { font-family: 'Be Vietnam Pro', sans-serif; color:rgba(255, 255, 255, 0.75); vertical-align: middle; text-align:center; font-size: clamp(10px, 0.8vw, 14px); padding-top: 6px; padding-bottom: 6px; }

      .nam_top { font-family: 'Bebas Neue', sans-serif; color:#fff; font-size: clamp(19px, 2.1vw, 26px); text-align:center; text-shadow: 0 2px 4px rgba(0,0,0,0.28); }
      .thang_top { font-family: 'Be Vietnam Pro', sans-serif; color:#fff; text-align:center; font-size: clamp(12px, 1.1vw, 18px); line-height:120%; font-weight:bold; border-top-left-radius: 16px; border-top-right-radius: 16px; padding-top: 15px; position: relative; overflow: visible; }

      .todayduonglich{ color:#fff; font-family:'Bebas Neue', sans-serif; text-align:center; font-size: clamp(140px, 17vw, 170px); line-height: 0.9; letter-spacing: 3px; font-weight: 600; text-shadow: 0 6px 10px rgba(0,0,0,0.28); position: relative; overflow: visible; }

      .thongtin_letet{ font-family: 'Playfair Display', serif; color:rgba(255,0,0,1); line-height: 1.5; padding: 6px 6px;; margin:10px 50px; text-align:center; font-size: clamp(12px, 1.1vw, 18px); letter-spacing: 0.7px; border-radius: 8px; background: rgba(255,255,255,0.18); border-radius:14px; border:0.4px solid rgba(255,255,255,0.15); box-shadow: 0 2px 8px rgba(0,0,0,0.12), inset 0 0.4px 0 rgba(255,255,255,0.35); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }

      .cadaotucngu{ font-family: 'Playfair Display', serif; font-style:italic; color: rgba(255,255,153,1); text-shadow: 0 2px 6px rgba(255, 200, 0, 0.35); line-height: 1.5; padding: 6px 6px;; margin:10px 50px; text-align:center; font-size: clamp(12px, 1.1vw, 18px); letter-spacing: 0.7px; border-radius: 8px; background: rgba(255,255,255,0.18); border-radius:14px; border:0.4px solid rgba(255,255,255,0.15); box-shadow: 0 2px 8px rgba(0,0,0,0.12), inset 0 0.4px 0 rgba(255,255,255,0.35); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }


      .thutrongtuan { font-family: 'Playfair Display', serif; color: rgba(255,255,255,1); background: rgba(255,255,255,0.18); text-align:center; vertical-align: middle; font-size: clamp(19px, 2.1vw, 26px); line-height: 1.1; font-weight:bold; padding: 6px 6px;; margin-right: 2px; border-bottom-right-radius: 16px; border-top-right-radius: 16px; }

      .thutrongtuan_EN { font-family: 'Playfair Display', serif; color: rgba(255,255,255,1); background: rgba(255,255,255,0.18); text-align:center; vertical-align: middle; font-size: clamp(19px, 2.1vw, 26px); line-height: 1.1; font-weight:bold; padding: 6px 6px;; margin-left: 2px; border-bottom-left-radius: 16px; border-top-left-radius: 16px; }

      .thu_7_block { font-family: 'Playfair Display', serif; color: green; background: rgba(255,255,255,0.18); text-align:center; vertical-align: middle; font-size: clamp(19px, 2.1vw, 26px); line-height: 1.1; font-weight:bold; padding: 6px 6px;; margin-right: 2px; border-bottom-right-radius: 16px; border-top-right-radius: 16px; }

      .thu_cn_block { font-family: 'Playfair Display', serif; color: red; background: rgba(255,255,255,0.18); text-align:center; vertical-align: middle; font-size: clamp(19px, 2.1vw, 26px); line-height: 1.1; font-weight:bold; padding: 6px 6px;; margin-right: 2px; border-bottom-right-radius: 16px; border-top-right-radius: 16px; }

      .thu_7_EN_block { font-family: 'Playfair Display', serif; color: green; background: rgba(255,255,255,0.18); text-align:center; vertical-align: middle; font-size: clamp(19px, 2.1vw, 26px); line-height: 1.1; font-weight:bold; padding: 6px 6px;; margin-left: 2px; border-bottom-left-radius: 16px; border-top-left-radius: 16px; }

      .thu_cn_EN_block { font-family: 'Playfair Display', serif; color: red; background: rgba(255,255,255,0.18); text-align:center; vertical-align: middle; font-size: clamp(19px, 2.1vw, 26px); line-height: 1.1; font-weight:bold; padding: 6px 6px;; margin-left: 2px; border-bottom-left-radius: 16px; border-top-left-radius: 16px; }

      .thutrongtuan_EN { font-family: 'Playfair Display', serif; color: rgba(255,255,255,1); background: rgba(255,255,255,0.18); text-align:center; vertical-align: middle; font-size: clamp(19px, 2.1vw, 26px); line-height: 1.1; font-weight:bold; padding: 6px 6px;; margin-left: 2px; border-bottom-left-radius: 16px; border-top-left-radius: 16px; }


      .svg_td { text-align:center; width:clamp(50px, 8vw, 80px); }
      
      .svg_circle_divider { width: 90%; aspect-ratio: 1/1; border-radius:50%; border:1px solid rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; margin: 0 auto; background:rgba(255,255,255,0.18); box-shadow: 0 2px 8px rgba(0,0,0,0.12), inset 0 0.4px 0 rgba(255,255,255,0.35); }
      
			.svg-cell { display:flex; text-align: center; height:80%; width:80%; align-items: center; justify-content: center; transition: transform 0.3s ease; }


      .thang_am_lich, .nam_am_lich { position: relative; overflow: visible; color:rgba(255,255,153,1); width: 38%; font-family: 'Playfair Display', serif; background: rgba(255,255,255,0.18); text-align:center; vertical-align: middle; font-size: clamp(16px, 1.8vw, 20px); line-height: 1.1; font-weight:bold; padding: 6px 6px;; margin: 10px auto; border-radius: 8px; }


      .ngayamlich { color:rgba(255,255,153,1); font-family: 'Playfair Display', serif; text-align:center; vertical-align: middle; font-size: clamp(90px, 12vw, 120px); letter-spacing: 3px; font-weight: 600; text-shadow: 0 6px 10px rgba(0,0,0,0.28); margin: 10px auto; }


      .ThangNgayGioTiet_before { font-family:'Bebas Neue', sans-serif; font-style:italic; color:#fff; text-align:center; font-size: clamp(6px, 0.8vw, 10px); padding: 1px auto; margin: 6px auto 1px auto; }
      .ThangNgayGioTiet_after { font-family: 'Playfair Display', serif; color:rgba(255,255,153,1); text-align:center; font-size: clamp(10px, 1vw, 16px); font-weight:bold; padding: 1px auto; margin: 1px auto 6px auto; }


      .toggle-btn { display:block; width:100%; border:none; padding: 4px 0; border-radius:6px; cursor:pointer; font-weight:bold; font-size:clamp(60%,65%,70%); transition:all 0.3s ease; margin: 0; }
      .toggle-btn-container { padding: 0px auto; margin: 0px auto 10px auto; }
      .toggle-content { display:none; opacity:0; transform: translateY(-10px); transition: opacity 0.4s ease, transform 0.4s ease; }
      .toggle-content.show { display:table-row; opacity:1; transform: translateY(0); }
      
      .navi-l,.navi-r{ color:#fff; text-align:center; font-size:75%; line-height:100%; font-weight:bold; padding: 4px 0; }
      .nav-btn { color:#fff; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-weight: bold; }
      
      .tenthang { text-align:center; font-size:125%; line-height:100%; font-weight:bold; padding: 4px 0; }
      .ngaytuan, .ngaytuan_t7, .ngaytuan_cn { width:14%; text-align:center; font-size: 90%; padding: 6px 0; }
      .ngaytuan_t7 { color:green; width:14%; text-align:center; font-size: 90%; padding: 6px 0; }
      .ngaytuan_cn { color:red; width:14%; text-align:center; font-size: 90%; padding: 6px 0; }
      .ngaythang { padding-top: 10px; }
      .am, .am2 { color:blue; text-align:right; padding-right:3px; font-size:65%; }
      .t2t6 { text-align:center; font-size:125%; }
      .t7 { color:green; text-align:center; font-size:125%; }
      .cn { color:red; text-align:center; font-size:125%; }
      .homnay { font-weight:bold; }
		
      .year-svg-container { position: absolute; top: -36px; width: 35px; height: 35px; animation: marquee-horizontal 8s ease-in-out infinite; }
      
      @keyframes marquee-horizontal { 0% { left: 0%; transform: scaleX(-1); } 49.9% { left: calc(100% - 35px); transform: scaleX(-1); } 50% { left: calc(100% - 35px); transform: scaleX(1); } 100% { left: 0%; transform: scaleX(1); } }

    `;

    // --- GHI ĐÈ CSS NẾU LÀ CHẾ ĐỘ 'TRANSPARENT' ---
    if (backgroundType === 'transparent') {
      res += `
        /* 1. Xóa tất cả hình nền và màu nền */
        .lunar-card > div:first-child, .thang_top, .giohoangdao, .viecnenlam, .viecnentranh,
        .cat_tinh, .hung_tinh, .tenthang, .navi-l, .navi-r, .ngaytuan, .ngaytuan_t7,
        .ngaytuan_cn, .ngaythang, .tet, .homnay, .nav-btn, .toggle-btn {
            background: transparent !important;
        }

        /* 2. Chuyển màu chữ mặc định (vốn là đen, xanh, tím) thành trắng */
        .thang_top, .thutrongtuan, .t2t6,
         .tenthang, .navi-r, .ngaytuan, .toggle-btn, .viecnenlam b, .viecnentranh b,
        .cat_tinh b, .hung_tinh b, .giohoangdao {
            color: #ffffff !important;
        }
        .am, .am2, .ngayamlich { color: rgba(255,255,153,1) !important; font-weight: bold !important; }

        /* 4. Bỏ viền cho các nút bên trong thẻ */
        .toggle-btn, .nav-btn {
            border: none !important;
        }
        .nav-btn:hover, .toggle-btn:hover {
            background-color: rgba(255, 255, 255, 0.2) !important;
        }
        .todayduonglich:hover, .ngayamlich:hover, .svg_circle_divider:hover {
            color: rgba(255, 255, 0, 1) !important; text-shadow: 0 8px 16px rgba(255, 200, 0, 0.5)!important;
        }
        .svg_circle_divider:hover {
            box-shadow: 0 0px 16px rgba(255,200,0,0.8), inset 0 0.5px 0 rgba(255,200,0,0.4);
        }
        .svg-cell:hover {
            transform: scale(1.8);
        }

        .show_dao_tet:hover, .show_mai_tet:hover { animation: lanternSwingStrong 1.2s ease-in-out infinite; }

        @keyframes lanternSwingSoft { 0% { transform: rotate(0deg); } 25% { transform: rotate(1.5deg); } 50% { transform: rotate(-1.5deg); }75% { transform: rotate(1deg); } 100% { transform: rotate(0deg); } }


        @keyframes lanternSwingStrong { 0% { transform: rotate(0deg); } 20% { transform: rotate(6deg); } 40% { transform: rotate(-5deg); } 60% { transform: rotate(4deg); } 80% { transform: rotate(-3deg); } 100% { transform: rotate(0deg); } }

        /* 5. Làm nổi bật ngày hôm nay bằng một lớp nền mờ thay vì màu vàng */
        .homnay {
            background-color: rgba(255, 255, 255, 0.15) !important;
            border-radius: 8px;
        }

        /* 6. Thêm các đường kẻ phân cách cho chế độ transparent */
        .giohoangdao, .navi-l, .navi-r, .tenthang, .ngaytuan, .ngaytuan_t7, .ngaytuan_cn {
            border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
        }
      `;
    }
    res += '</style>';
    return res;
  }


    // --- Tạo header trong lịch tháng ---
  function printHead(mm, yy, extraClass){
    if (typeof extraClass === 'undefined') {
         extraClass = (typeof window.isCalendarExpanded !== 'undefined' && window.isCalendarExpanded) ? ' show' : '';
    }

    let res = "";
    const monthName = mm+" ⟡ "+yy;
    res += `<tr class="toggle-content${extraClass}"><td colspan="2" class="navi-l"><button id="prev-year" class="nav-btn">&lt;&lt;</button>  <button id="prev-month" class="nav-btn">&lt;</button></td>`;
    res += `<td colspan="3" class="tenthang"><button id="reset-today" style="all:unset; cursor:pointer;" class="nav-btn">${monthName}</button></td>`;
    res += `<td colspan="2" class="navi-r"><button id="next-month" class="nav-btn">&gt;</button><button id="next-year" class="nav-btn">&gt;&gt;</button></td></tr>`;
    res += `<tr class="toggle-content${extraClass}">`;
    for (let i=0;i<=6;i++){
      if (DAYNAMES[i]==='CN') res += '<td class="ngaytuan_cn">CN</td>';
      else if (DAYNAMES[i]==='T7') res += '<td class="ngaytuan_t7">T7</td>';
      else res += `<td class="ngaytuan">${DAYNAMES[i]}</td>`;
    }
    res += '</tr>';
    return res;
  }
    // --- Tạo header trong lịch tháng ---


    // --- Tạo Ô Trống trong lịch tháng ---
  function printEmptyCell(){
    return '<td class="ngaythang"><div class="cn">&nbsp;</div><div class="am">&nbsp;</div></td>';
  }
    // --- Tạo Ô Trống trong lịch tháng ---
  
  
    // --- Tạo Ô các ngày trong lịch tháng ---
  function printCell(lunarDate, solarDate, solarMonth, solarYear, today){
    let cellClass = "ngaythang";
    let solarClass = "t2t6";
    let lunarClass = "am";

    const dow = (lunarDate.jd + 1) % 7;
    if (dow === 0){ solarClass = "cn"; }
    else if (dow === 6){ solarClass = "t7"; }

    if (solarDate === today.getDate() && solarMonth === (today.getMonth()+1) && solarYear === today.getFullYear()){
      cellClass = "homnay";
    }
	// Kiểm tra nếu là tháng 1 Âm lịch và ngày từ 1 đến 3
    if (lunarDate.month === 1 && lunarDate.day >= 1 && lunarDate.day <= 3){cellClass = "tet_cell";}
    if (lunarDate.leap === 1){ lunarClass = "am2"; }

    let lunar = lunarDate.day;
    if (solarDate === 1 || lunar === 1){ lunar = `${lunarDate.day}/${lunarDate.month}`; }

    let title = getDayName(lunarDate);
    return `<td class="${cellClass}" title="${title}" onclick="window.haShowDayPopup(${solarDate},${solarMonth},${solarYear})">`+
      `<div class="${solarClass}">${solarDate}</div>`+
      `<div style="font-size:50%;" class="${lunarClass}">${lunar}</div>`+
      `</td>`;
  }
    // --- Tạo Ô các ngày trong lịch tháng ---



// Lưu trạng thái khi Xem lịch tháng khi chuyển tháng năm không bị đóng 
  if (typeof window.isCalendarExpanded === 'undefined') {
      window.isCalendarExpanded = false;
  }

// Hiển thị
  function printTable(mm, yy, today, bgrOpacity){
    const jd = jdn(today.getDate(), mm, yy);
    const currentMonthArr = getMonth(mm, yy);
    if (currentMonthArr.length === 0) return "";
    const ld1 = currentMonthArr[0];
    const emptyCells = (ld1.jd + 0) % 7;

    const LunarHead = getYearCanChi(ld1.year);
    const currentLunarDate = getLunarDate(today.getDate(), mm, yy);

    const dow = (currentLunarDate.jd + 1) % 7;
    const bgImages = [
        "amlich_khai_t2.png", "amlich_khai_t3.png", "amlich_khai_t4.png",
        "amlich_khai_t5.png", "amlich_khai_t6.png", "amlich_khai_t7.png", "amlich_khai_cn.png"
    ];
    const bg = bgImages[dow];
    const bgUrl = new URL(`./images/${bg}`, import.meta.url).href;

    let res = "";

    let backgroundStyle = `background:url('${bgUrl}') no-repeat center center; background-size:cover;`;
    if (typeof bgrOpacity === 'number' && bgrOpacity >= 0 && bgrOpacity <= 1) {
        const overlayAlpha = 1 - bgrOpacity;
        backgroundStyle = `background: linear-gradient(rgba(0, 0, 0, ${overlayAlpha}), rgba(0, 0, 0, ${overlayAlpha})), url('${bgUrl}') no-repeat center center; background-size:cover;`;
    }


    const extraClass = window.isCalendarExpanded ? ' show' : '';
    const btnText = window.isCalendarExpanded ? 'Thu gọn 🔼' : 'Xem lịch tháng 🔽';


    res += `<div style="${backgroundStyle} border-radius: 16px;">`;
    res += `<table class="thang" border="0" border-radius: 16px; cellpadding="1" cellspacing="2" width="${PRINT_OPTS.tableWidth}">`;


    // Tháng Năm Top
    const showthangarray_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const monthNameEN = showthangarray_EN[mm - 1];
    res += `<tr>`;
    // ===== SVG Tết =====
    // 1 - Cậu bé áo xanh cầm bao lì xì
    // 2 - Cô bé áo xanh cầm bao lì xì
    // 3 - Cậu bé áo vàng cầm bao lì xì bánh chưng
    // 4 - Cậu bé áo xanh cầm pháo
    // 5 - Cô bé áo vàng cầm bánh chưng
    // 6 - Bánh chưng dưa hấu 
    // 7 - Bánh chưng bánh tét
    // 8 - Bánh chưng xúc xích canh
    // 9 - Hoa đào gốc bên phải
    // 10 - Hoa mai gốc bên trái 
    res += `<td colspan="7"><div class="thang_top">Tháng ${mm}<span class="ngan_cach"> ❖ </span><span class="nam_top">${yy}</span><span class="ngan_cach"> ❖ </span> ${monthNameEN}`;
    let selected_svg_tet_dao = "";
    let selected_svg_tet_mai = "";
    // Kiểm tra nếu là tháng 12 từ ngày 23 trở đi
    // HOẶC nếu là tháng 1 từ ngày 1 đến ngày 3
    if ((currentLunarDate.month === 12 && currentLunarDate.day >= 23) || (currentLunarDate.month === 1 && currentLunarDate.day <= 3)) {
      selected_svg_tet_dao = svg_tet[8] || "";
      selected_svg_tet_mai = svg_tet[9] || "";
      res += `<div class="show_dao_tet">${selected_svg_tet_dao}</div>`;
      res += `<div class="show_mai_tet">${selected_svg_tet_mai}</div>`;
    }
    res += `</div></td></tr>`;
    // Tháng Năm Top


    // Phân cách
    res += `<tr><td colspan="7" class="phan_cach">──────  ⟡  ──────</td></tr>`;
    // Phân cách


    // Ngày Dương To
    res += `<tr><td colspan="7"><div class="todayduonglich" title="Nhấp xem thêm chi tiết" onclick="window.haShowDayPopup(${today.getDate()},${mm},${yy})">${today.getDate()}`;

    let selected_svg_tet_left = "";
    let selected_svg_tet_right = "";
    // Logic chọn hình ảnh cho 3 ngày đầu năm
    if (currentLunarDate.month === 1) {
        if (currentLunarDate.day === 1) {
            selected_svg_tet_left = svg_tet[5] || "";
            selected_svg_tet_right = svg_tet[0] || "";
        } else if (currentLunarDate.day === 2) {
            selected_svg_tet_left = svg_tet[6] || "";
            selected_svg_tet_right = svg_tet[1] || "";
        } else if (currentLunarDate.day === 3) {
            selected_svg_tet_left = svg_tet[7] || "";
            selected_svg_tet_right = svg_tet[3] || "";
        }
        // Chỉ chèn HTML nếu đúng 3 ngày đầu năm
        if (selected_svg_tet_left && selected_svg_tet_right) {
            res += `<div class="show_left_tet">${selected_svg_tet_left}</div>`;
            res += `<div class="show_right_tet">${selected_svg_tet_right}</div>`;
        }
    }
    if (currentLunarDate.month === 12) {
        if (currentLunarDate.day === 26) {
            selected_svg_tet_left = svg_tet[5] || "";
            selected_svg_tet_right = svg_tet[0] || "";
        }
        // Chỉ chèn HTML nếu đúng 3 ngày đầu năm
        if (selected_svg_tet_left && selected_svg_tet_right) {
            res += `<div class="show_left_tet">${selected_svg_tet_left}</div>`;
            res += `<div class="show_right_tet">${selected_svg_tet_right}</div>`;
        }
    }
    res += `</div></td></tr>`;
    // Ngày Dương To


    // Ngày Lễ
    let noiDungLe = "";
    if (currentLunarDate.day === 1) {
        noiDungLe = `Mùng Một`;
    } else if (currentLunarDate.day === 15) {
        noiDungLe = `Ngày Rằm`;
    }

    const d_m = `${today.getDate()}/${mm}`;
    const idxDL = NGAY_LE_DL.indexOf(d_m);
    const infoDL = idxDL !== -1 ? NGAY_LE_DL_STRING[idxDL] : "";

    const d_m_al = `${currentLunarDate.day}/${currentLunarDate.month}`;
    const idxAL = NGAY_LE_AL.indexOf(d_m_al);
    const infoAL = idxAL !== -1 ? NGAY_LE_AL_STRING[idxAL] : "";

    // Gom tất cả các thông tin vào một mảng để xử lý dấu gạch đứng (|) cho mượt
    let displayArray = [];
    if (noiDungLe) displayArray.push(noiDungLe);
    if (infoDL) displayArray.push(infoDL);
    if (infoAL) displayArray.push(infoAL);

    if (displayArray.length > 0) {
        res += `<tr><td colspan="7">`;
        // Chỉ tạo div khi có nội dung và nối chúng bằng dấu " | "
        res += `<div class="thongtin_letet">${displayArray.join(" | ")}</div>`;
        res += `</td></tr>`;
    }
    // Ngày Lễ


    // Ca dao tục ngữ
    const _todayObj = new Date();
    const _dateSeed = _todayObj.getFullYear() * 10000 + (_todayObj.getMonth() + 1) * 100 + _todayObj.getDate();
    let _randomIdx = Math.floor(Math.abs(Math.sin(_dateSeed)) * CA_DAO_TUC_NGU.length);
    let cadaotucngu_random = CA_DAO_TUC_NGU[_randomIdx];
    if (cadaotucngu_random) {
        cadaotucngu_random = cadaotucngu_random.replace(/\n/g, '<br>');
    } else {
        cadaotucngu_random = ""; 
    }
    res += `<tr><td colspan="7" ><div class="cadaotucngu">${cadaotucngu_random}</div></td></tr>`;
    // Ca dao tục ngữ


    // Thứ VI | EN
    const lunarDayIndex = (currentLunarDate.jd + 1) % 12;
    const lunarMonthIndex = (currentLunarDate.month + 1) % 12;
    const lunarYearIndex = (currentLunarDate.year + 8) % 12;
    const svgNgay = getSvgConGiap(lunarDayIndex);
    const svgThang = getSvgConGiap(lunarMonthIndex);
    const svgNam = getSvgConGiap(lunarYearIndex);
    const class_t7_cn = "thutrongtuan";
    const class_t7_cn_EN = "thutrongtuan_EN";
    const tuan_t7cn = TUAN[(currentLunarDate.jd + 1) % 7]
    if (tuan_t7cn === "Thứ Bảy" ) {
      class_t7_cn = "thu_7_block";
      class_t7_cn_EN = "thu_7_EN_block";
    } else if (tuan_t7cn === "Chủ Nhật") {
      class_t7_cn = "thu_cn_block";
      class_t7_cn_EN = "thu_cn_EN_block";
    }
    res += `<tr >
      <td colspan="3">
        <div class="${class_t7_cn}" >${TUAN[(currentLunarDate.jd + 1) % 7]}</div>
      </td>
      <td class="svg_td" >
        <div class="svg_circle_divider"><span class="svg-cell" title="Ngày ${CAN[(jd + 9) % 10]} ${CHI[(jd+1)%12]}">${svgNgay}</span></div>
      </td>
      <td colspan="3">
        <div class="${class_t7_cn_EN}">${TUAN_EN[(currentLunarDate.jd + 1) % 7]}</div>
      </td>
    </tr>`;
    // Thứ VI | EN


    // Tháng Âm Lịch
    const showthangarray = ["Tháng Giêng","Tháng Hai","Tháng Ba","Tháng Tư","Tháng Năm","Tháng Sáu","Tháng Bảy","Tháng Tám","Tháng Chín","Tháng Mười","Tháng Mười Một","Tháng Chạp"];
    let thangAm = showthangarray[currentLunarDate.month-1] || ("Tháng " + currentLunarDate.month);
    if (currentLunarDate.leap===1) thangAm += " (Nhuận)";
    const ly = getYearInfo(currentLunarDate.year);
    let daysInLunarMonth = 0;
    for (let i = 0; i < ly.length; i++) {
      if (ly[i].month === currentLunarDate.month && ly[i].leap === currentLunarDate.leap) {
          if (i < ly.length - 1) {
              daysInLunarMonth = ly[i+1].jd - ly[i].jd;
          } else {
              const lyNext = getYearInfo(currentLunarDate.year + 1);
              if (lyNext && lyNext.length > 0) {
                  daysInLunarMonth = lyNext[0].jd - ly[i].jd;
              } else {
                  daysInLunarMonth = 30; 
              }
          }
          break;
      }
    }
    if (daysInLunarMonth === 29) { thangAm += " (T)"; } else if (daysInLunarMonth === 30) { thangAm += " (Đ)"; }
    res += `<tr><td colspan="7"><div class="thang_am_lich"> ${thangAm}</div></td></tr>`;
    // Tháng Âm Lịch


    res += `<tr>`;

    res += `<td width="25%" colspan="2">`;
    res += `<div class="ThangNgayGioTiet_before">─⟡  Ngày  ⟡─</div><div class="ThangNgayGioTiet_after">${CAN[(jd + 9) % 10]} ${CHI[(jd+1)%12]}</div>`;
    res += `<div class="ThangNgayGioTiet_before">─⟡  Tháng  ⟡─</div><div class="ThangNgayGioTiet_after">${getMonthCanChi(currentLunarDate)}</div>`;
    res += `</td>`;


    // Ngày Âm Lịch
    res += `<td width="50%" colspan="3" >`;
    res += `<div class="ngayamlich" title="Nhấp xem thêm chi tiết" onclick="window.haShowDayPopup(${today.getDate()},${mm},${yy})">${currentLunarDate.day}</div>`;
    res += `</td>`;
    // Ngày Âm Lịch


    // Hoàng Đạo
    res += `<td width="25%" colspan="2">`;
    res += `<div class="ThangNgayGioTiet_before">─⟡  Giờ đầu  ⟡─</div><div class="ThangNgayGioTiet_after">${getCanHour0(jd)} ${CHI[0]}</div>`;
    res += `<div class="ThangNgayGioTiet_before">─⟡  Tiết  ⟡─</div><div class="ThangNgayGioTiet_after">${TIETKHI[getSunLongitude(jd+1, 7.0)]}</div>`;
    res += `</td>`;
    // Hoàng Đạo

    res += `</tr>`;


    // Năm Âm Lịch
    res += `<tr><td colspan="7"><div class="thang_am_lich">${getYearCanChi(currentLunarDate.year)}<span class="year-svg-container">${svgNam}</span></div></td></tr>`;
    // Năm Âm Lịch


    // Nút Xem thêm
    res += `<tr><td colspan="7" class="toggle-btn-container">
      <button class="toggle-btn" onclick="
        const rows = [...this.closest('table').querySelectorAll('.toggle-content')];
        const isHidden = rows.every(r => !r.classList.contains('show'));

        // Cập nhật trạng thái toàn cục
        window.isCalendarExpanded = isHidden;

        rows.forEach((r, i) => {
          setTimeout(() => {
            if(isHidden){ r.classList.add('show'); } else { r.classList.remove('show'); }
          }, i * 100);
        });
        this.innerHTML = isHidden ? 'Thu gọn 🔼' : 'Xem lịch tháng 🔽';
      ">${btnText}</button>
    </td></tr>`;

    // Hiển thị control lịch tháng
    res += printHead(mm, yy, extraClass); 

    for (let i=0;i<6;i++){
      // 4. THÊM extraClass VÀO CÁC HÀNG LỊCH
      res += `<tr class="toggle-content${extraClass}">`;
      for (let j=0;j<7;j++){
        let k = 7*i + j;
        if (k < emptyCells || k >= emptyCells + currentMonthArr.length){
          res += printEmptyCell();
        } else {
          let solar = k - emptyCells + 1;
          let ld1c = currentMonthArr[k - emptyCells];
          res += printCell(ld1c, solar, mm, yy, today);
        }
      }
      res += '</tr>';
    }

    res += '</table></div>';
    return res;
  }



  function getMonth(mm, yy){
    let mm1, yy1;
    if (mm < 12){ mm1 = mm+1; yy1 = yy; } else { mm1 = 1; yy1 = yy+1; }
    let jd1 = jdn(1, mm, yy);
    let jd2 = jdn(1, mm1, yy1);
    let ly1 = getYearInfo(yy);
    let tet1 = ly1[0].jd;
    let result = [];
    if (tet1 <= jd1){
      for (let i=jd1;i<jd2;i++) result.push(findLunarDate(i, ly1));
    } else if (jd1 < tet1 && jd2 < tet1){
      ly1 = getYearInfo(yy - 1);
      for (let i=jd1;i<jd2;i++) result.push(findLunarDate(i, ly1));
    } else if (jd1 < tet1 && tet1 <= jd2){
      let ly2 = getYearInfo(yy - 1);
      for (let i=jd1;i<tet1;i++) result.push(findLunarDate(i, ly2));
      for (let i=tet1;i<jd2;i++) result.push(findLunarDate(i, ly1));
    }
    return result;
  }

  function getMonthCanChi(currentLunarDate){
    const year = currentLunarDate.year;
    const month = currentLunarDate.month;
    return CAN[(year*12 + month + 3) % 10] + " " + CHI[(month+1)%12];
  }

  // ====== Home Assistant Card ======
  class LunarCalendarCard extends HTMLElement{
    static getConfigElement() { return null; }
    static getStubConfig() { return { background: 'normal' }; }

		constructor(){
			super();
			const today = new Date();
			this.displayMonth = today.getMonth() + 1;
			this.displayYear = today.getFullYear();
		}

    setConfig(config){
      this.config = config || {};
      if (!this.shadowRoot){
        this.attachShadow({mode:'open'});
      }
      if (!this.card){
        this.card = document.createElement('ha-card');
        this.shadowRoot.appendChild(this.card);
      }
      
      this.card.style.borderRadius = '16px'; 

      if (this.config.background === 'transparent') {
        this.card.style.background = 'transparent';
        this.card.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        this.card.style.boxShadow = 'none';
      } else {
        this.card.style.background = '';
        this.card.style.border = '';
        this.card.style.boxShadow = '';
      }

      this._render();
    }

    set hass(hass){
      this._hass = hass;

      // --- PHẦN CODE TẠO KHUNG POPUP (Chỉ chạy 1 lần) ---
      if (!document.getElementById('ha-lich-popup')) {
        document.body.insertAdjacentHTML('beforeend', `
          <div id="ha-lich-popup" class="ha-popup" onclick="window.haClosePopup()">
            <div class="ha-popup-box" onclick="event.stopPropagation()">
              <div class="ha-popup-header">
                <span id="ha-popup-title">Chi tiết</span>
                <span class="ha-popup-close" onclick="window.haClosePopup()">✕</span>
              </div>
              <div id="ha-popup-content" class="ha-popup-content"></div>
            </div>
          </div>
        `);
      }

      if (!document.getElementById('ha-lich-popup-style')) {
        const style = document.createElement('style');
        style.id = 'ha-lich-popup-style';
        style.innerHTML = `
          .ha-popup { position: fixed !important; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.6); z-index: 99999 !important; display: none; justify-content: center; align-items: flex-end; backdrop-filter: blur(4px); }
          .ha-popup.show { display: flex !important; }
          .ha-popup-box { background: linear-gradient(180deg, #1a1a1a, #000) !important; color: #fff !important; width: 100%; max-width: 500px; max-height: 85%; border-radius: 18px 18px 0 0; padding: 20px; overflow: auto; animation: slideUp 0.3s ease; margin-bottom: 0; }
          @media (min-width: 600px) { .ha-popup { align-items: center; } .ha-popup-box { border-radius: 18px; margin-bottom: auto; width: 400px; } }
          .ha-popup-header { display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 1.2em; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
          .ha-popup-close { font-size: 24px; cursor: pointer; padding: 5px; }
          .ha-popup-content p { margin: 8px 0; font-size: 15px; line-height: 1.5; }
          .hd-chip { display: inline-block; padding: 4px 10px; margin: 3px 3px 0 0; border-radius: 12px; background: rgba(128,128,128,0.2); font-size: 13px; }
          @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
        `;
        document.head.appendChild(style);
      }
      // --- PHẦN CODE TẠO KHUNG POPUP (Chỉ chạy 1 lần) ---
    }

    _render(){
      const today = new Date();
			const mm = this.displayMonth;
			const yy = this.displayYear;

      const currentLunarDate = getLunarDate(today.getDate(), today.getMonth()+1, today.getFullYear());
      const backgroundType = this.config.background || 'normal';
      const bgrOpacity = this.config.background_opacity;

      const html = [
        printStyle(today, currentLunarDate, backgroundType),
        printTable(mm, yy, today, bgrOpacity)
      ].join('');

      this.card.innerHTML = `<div class="lunar-card">${html}</div>`;

			const prevBtn = this.card.querySelector('#prev-month');
			if (prevBtn){
				prevBtn.addEventListener('click', () => {
					this.displayMonth--;
					if (this.displayMonth < 1){ this.displayMonth = 12; this.displayYear--; }
					this._render();
				});
			}

			const nextBtn = this.card.querySelector('#next-month');
			if (nextBtn){
				nextBtn.addEventListener('click', () => {
					this.displayMonth++;
					if (this.displayMonth > 12){ this.displayMonth = 1; this.displayYear++; }
					this._render();
				});
			}

			const prevYearBtn = this.card.querySelector('#prev-year');
			if (prevYearBtn){
				prevYearBtn.addEventListener('click', () => {
					this.displayYear--;
					this._render();
				});
			}

			const nextYearBtn = this.card.querySelector('#next-year');
			if (nextYearBtn){
				nextYearBtn.addEventListener('click', () => {
					this.displayYear++;
					this._render();
				});
			}

			const resetBtn = this.card.querySelector('#reset-today');
			if (resetBtn){
				resetBtn.addEventListener('click', () => {
					const today = new Date();
					this.displayMonth = today.getMonth() + 1;
					this.displayYear = today.getFullYear();
					this._render();
				});
			}
		}

    getCardSize(){ return 8; }
  }

  if (!customElements.get('lich-block-am-duong-viet-nam')){
    customElements.define('lich-block-am-duong-viet-nam', LunarCalendarCard);
  }



  /* ==================================================
     LOGIC POPUP TOÀN CỤC (Cần thiết để code trên chạy)
     ================================================== */

  // Hàm chuyển đổi Dương -> Âm (Wrapper an toàn)
  function convertSolar2Lunar(dd, mm, yy) {
    if (typeof getLunarDate === 'function') {
        const lunar = getLunarDate(dd, mm, yy);
        return [lunar.day, lunar.month, lunar.year, lunar.leap];
    }
    return [dd, mm, yy, 0];
  }
  // 1. Hàm đóng (Window global)
  window.haClosePopup = function() {
    const popup = document.getElementById('ha-lich-popup');
    if (popup) popup.classList.remove('show');
  };
// ============================================================
// 2. HÀM POPUP CHÍNH (HIỂN THỊ TOÀN BỘ - KHÔNG NÚT BẤM)
// ============================================================
  window.haShowDayPopup = function(dd, mm, yy) {
    const popup = document.getElementById('ha-lich-popup');
    if (!popup) return;

    try {
        // --- 1. ĐỊNH NGHĨA HẰNG SỐ & HELPER ---
        const CAN_ARR = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
        const CHI_ARR = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

        // --- 2. TÍNH TOÁN DỮ LIỆU ---
        const jd = jdn(dd, mm, yy);
        const lunarArr = convertSolar2Lunar(dd, mm, yy);
        const lunarDate = { day: lunarArr[0], month: lunarArr[1], year: lunarArr[2], leap: lunarArr[3], jd: jd };

        // -- Xử lý Can Chi (Bát tự) --
        // 1. Can Chi Năm
        const canChiNam = CAN_ARR[(lunarDate.year + 6) % 10] + " " + CHI_ARR[(lunarDate.year + 8) % 12];
        
        // 2. Can Chi Tháng
        const canNamIdx = (lunarDate.year + 6) % 10;
        const canThang1 = ((canNamIdx % 5) + 1) * 2;
        const canThang = (canThang1 + (lunarDate.month - 1)) % 10;
        const chiThang = (lunarDate.month + 1) % 12;
        const canChiThang = CAN_ARR[canThang] + " " + CHI_ARR[chiThang];

        // 3. Can Chi Ngày
        let canChiNgayStr = "";
        if (typeof getCanChiNgay === 'function') {
            const temp = getCanChiNgay(jd);
            canChiNgayStr = Array.isArray(temp) ? temp.join(" ") : temp;
        } else {
             canChiNgayStr = CAN_ARR[(jd + 9) % 10] + " " + CHI_ARR[(jd + 1) % 12];
        }

        // 4. Khởi giờ Tý
        const canNgayIdx = (jd + 9) % 10;
        const canGioTyIdx = (canNgayIdx % 5) * 2;
        const khoiGioTy = CAN_ARR[canGioTyIdx] + " Tý";

        // -- CẬP NHẬT: TÍNH TIẾT KHÍ CHUẨN --
        // Sử dụng công thức từ file gốc: TIETKHI[getSunLongitude(jd+1, 7.0)]
        let tietKhi = "Không rõ";
        if (typeof TIETKHI !== 'undefined' && typeof getSunLongitude === 'function') {
            tietKhi = TIETKHI[getSunLongitude(jd + 1, 7.0)];
        }

        // -- Các dữ liệu khác --
        const gioHoangDao = (typeof getGioHoangDao === 'function') ? getGioHoangDao(jd) : "...";
        const gioHacDao = (typeof getGioHacDao === 'function') ? getGioHacDao(jd) : "...";
        const huongXuatHanh = (typeof getHuongXuatHanh === 'function') ? getHuongXuatHanh(jd) : "...";
        
        // Lấy Thần Sát (Trực, Sao, Ngũ hành)
        const thanSat = (typeof getThanSat === 'function') ? getThanSat(lunarDate) : { 
            truc: {name:"...", emoji:"", info:{tot:"", xau:""}}, 
            napAm: "...", 
            sao: {name:"...", emoji:"", info:{danhGia:"", tenNgay:"", nenLam:"", kiengCu:"", ngoaiLe:"", tuongTinh:"", tho:""}} 
        };
        // Fallback an toàn
        if(!thanSat.truc.info) thanSat.truc.info = {tot:"...", xau:"..."};
        if(!thanSat.sao.info) thanSat.sao.info = {danhGia:"...", nenLam:"...", kiengCu:""};


        // --- 3. TẠO GIAO DIỆN HTML ---
        // Màu sắc đánh giá sao
        const danhGiaRaw = thanSat.sao.info.danhGia || "";
        const bgDanhGia = danhGiaRaw.includes('Tốt') ? 'rgba(76, 175, 80, 0.9)' : 
                         (danhGiaRaw.includes('Xấu') ? 'rgba(244, 67, 54, 0.9)' : 'rgba(255, 152, 0, 0.9)');
        
        const danhGiaShort = danhGiaRaw.split(' ')[0] || "";
        const danhGiaDetail = danhGiaRaw.includes('(') ? danhGiaRaw.substring(danhGiaRaw.indexOf('(')) : "";
        const thoText = (thanSat.sao.info.tho || '').replace(/^\s+/gm, '');

        let res = `<div class="lunar-popup-detail" style="font-family: sans-serif; font-size: 1.1em; color: var(--primary-text-color); padding-bottom: 10px;">`;
        
        // --- HEADER & LỊCH CƠ BẢN ---
        res += `
            <div style="text-align:center; margin-bottom:15px;">
                <div style="font-size:1.5em; font-weight:bold; color:#ffff99;">Dương lịch: ${dd}/${mm}/${yy}</div>
            </div>
            <table style="width:100%; border-collapse: collapse; margin-bottom: 15px;">
                 <tr style="border-bottom: 1px solid rgba(125,125,125,0.2);">
                    <td style="padding:6px 0; opacity:0.8;">Âm lịch:</td>
                    <td style="text-align:right;"><b style="color:#ffff99;">${lunarDate.day}</b>/<b style="color:#ffff99;">${lunarDate.month}</b>/<b style="color:#ffff99;">${canChiNam} ${lunarDate.leap?'(Nhuận)':''}</b></td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(125,125,125,0.2);">
                    <td style="padding:6px 0; opacity:0.8;">Ngày:</td>
                    <td style="text-align:right;"><b style="color:#ffff99;">${canChiNgayStr}</b></td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(125,125,125,0.2);">
                    <td style="padding:6px 0; opacity:0.8;">Tháng:</td>
                    <td style="text-align:right;"><b style="color:#ffff99;">${canChiThang}</b></td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(125,125,125,0.2);">
                    <td style="padding:6px 0; opacity:0.8;">Năm:</td>
                    <td style="text-align:right;"><b style="color:#ffff99;">${canChiNam}</b></td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(125,125,125,0.2);">
                    <td style="padding:6px 0; opacity:0.8;">Tiết khí:</td>
                    <td style="text-align:right;"><b style="color:#ffff99;">${tietKhi}</b></td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(125,125,125,0.2);">
                    <td style="padding:6px 0; opacity:0.8;">Giờ H.Đạo:</td>
                    <td style="text-align:right; font-size:0.95em;">${gioHoangDao}</td>
                </tr>
            </table>
        `;

        // --- CHI TIẾT ---
        res += `<div style="background: rgba(0,0,0,0.4); color: #fff; border-radius: 8px; padding: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">`;

        // 1. Giờ hắc đạo
        res += `
            <div style="margin-bottom: 12px; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 8px;">
                <div>🌑 <b>Giờ hắc đạo:</b></div>
                <div style="text-align:justify; opacity:0.9; padding-left: 24px;">${gioHacDao}</div>
            </div>`;

        // 2. Hướng xuất hành
        res += `
            <div style="margin-bottom: 12px; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 8px;">
                <div>🧭 <b>Hướng xuất hành:</b></div>
                <div style="text-align:justify; opacity:0.9; padding-left: 24px;">${huongXuatHanh}</div>
            </div>`;

        // 3. Trực (Có Tốt/Xấu)
        res += `
            <div style="margin-bottom: 12px; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 8px;">
                <div style="margin-bottom: 4px;">
                    <b>${thanSat.truc.emoji || '📅'} Trực:</b> 
                    <span style="background-color:rgba(76, 175, 80, 0.9); color:#fff; font-weight:bold; padding:2px 10px; border-radius:12px; font-size:0.9em;">
                        ${thanSat.truc.name}
                    </span>
                </div>
                <div style="text-align:justify; padding-left: 5px; line-height:1.5; font-size: 0.95em;">
                    <div>✅ <span style="opacity:0.9;">Tốt:</span> ${thanSat.truc.info.tot || "..."}</div>
                    <div style="margin-top:2px;">❌ <span style="opacity:0.9;">Xấu:</span> <span style="color:#ffcc80;">${thanSat.truc.info.xau || "..."}</span></div>
                </div>
            </div>`;


        // 4. Ngũ Hành
        res += `
            <div style="margin-bottom: 12px; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 8px;">
                <div><b>🌟 Ngũ hành:</b> ${thanSat.napAm}</div>
            </div>`;

        // 5. Sao (Nhị Thập Bát Tú)
        res += `
            <div>
                <div style="margin-bottom: 6px;">
                    <span style="font-weight:bold; font-size:1.05em;">${thanSat.sao.emoji || '✨'} Nhị Thập Bát Tú: 
                        <span style="background-color:${bgDanhGia}; color:#fff; padding:2px 10px; border-radius:12px;">${thanSat.sao.name}</span>
                    </span><br>
                    <span style="font-style:italic; color:#ffff99; font-size:0.9em;"> (${thanSat.sao.info.tenNgay || ""})</span>
                </div>
                
                <div style="font-style:italic; color:#ffff99; margin-bottom:8px; padding-left: 5px;">
                   ${danhGiaShort} ${danhGiaDetail} - ${thanSat.sao.info.tuongTinh || ''}
                </div>

                <div style="padding-left: 5px; line-height:1.5;">
                    <div><b style="color:#fff;">👍 Nên làm:</b> <span style="text-align:justify; opacity:0.9;">${thanSat.sao.info.nenLam}</span></div>
                    <div style="margin-top:5px;"><b style="color:#fff;">👎 Kiêng cữ:</b> <span style="color:#ffcc80; text-align:justify;">${thanSat.sao.info.kiengCu}</span></div>
                    
                    ${thanSat.sao.info.ngoaiLe ? 
                    `<div style="margin-top:5px;"><b style="color:#fff;">✨ Ngoại lệ:</b><div style="text-align:justify; padding-left:10px; opacity:0.9;"> ${thanSat.sao.info.ngoaiLe.replace(/\n/g, '<br>')}</div></div>` : ''}
                </div>

                ${thoText ? 
                `<div style="margin-top:10px; padding-top:8px; border-top:1px solid rgba(255,255,255,0.2); text-align:center; font-style:italic; font-family:'Times New Roman', serif; color:#ffff99; white-space:pre-wrap;">${thoText}</div>` : ''}
            </div>
        `;
        
        res += `</div>`; // End Details Container

        // Footer: Khởi giờ tý
        res += `<div style="text-align:center; font-size:0.85em; opacity:0.6; margin-top:10px;">Khởi giờ Tý: <b style="color:#ffff99;">${khoiGioTy}</b></div>`;
        res += `</div>`; // End Main Container

        // --- UPDATE DOM ---
        const titleEl = document.getElementById('ha-popup-title');
        const contentEl = document.getElementById('ha-popup-content');
        
        if(titleEl) titleEl.innerText = `Chi tiết`;
        if(contentEl) contentEl.innerHTML = res;

        popup.classList.add('show');

    } catch(e) {
        console.error("Lỗi Popup:", e);
        const contentEl = document.getElementById('ha-popup-content');
        if(contentEl) contentEl.innerHTML = `<div style="color:red; padding:15px; text-align:center;">Có lỗi xảy ra: ${e.message}</div>`;
        popup.classList.add('show');
    }
  };
  // --- KẾT THÚC CODE POPUP ---


})();
