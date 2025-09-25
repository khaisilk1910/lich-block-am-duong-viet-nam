//
//
// Lấy code âm dương từ HO NGOC DUC và https://www.xemlicham.com/
// Phát triển thẻ dành cho Home Assistant của Nguyễn Tiến Khải - khaisilk1910
// Lunar Calendar Custom Card for Home Assistant
// HA custom card:
//   type: custom:lich-block-am-duong-viet-nam
//   background: transparent # Hai chế độ normal(mặc định) và transparent
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

	const VIEC_NEN_LAM = {
	  "Giáp Tý": "Khai Trương, Cầu Tài, Xuất Hành, Cưới Hỏi",
	  "Ất Sửu": "Động Thổ, Xây Dựng, Cầu Phúc",
	  "Bính Dần": "Cầu Tài, Ký Kết, Khai Trương",
	  "Đinh Mão": "Cưới Hỏi, Nhập Trạch, Động Thổ",
	  "Mậu Thìn": "Khai Trương, Tế Lễ, Cầu Phúc",
	  "Kỷ Tỵ": "Cầu Tài, Khai Trương, Ký Kết",
	  "Canh Ngọ": "Cưới Hỏi, Xuất Hành, Cầu Lộc",
	  "Tân Mùi": "Động Thổ, Nhập Trạch, An Táng",
	  "Nhâm Thân": "Cầu Tài, Khai Trương, Giao Dịch",
	  "Quý Dậu": "Cưới Hỏi, Tế Lễ, Nhập Trạch",
	  "Giáp Tuất": "Khai Trương, Cầu Phúc, Xây Dựng",
	  "Ất Hợi": "Cầu Tài, Cầu Lộc, Xuất Hành",
	  "Bính Tý": "Cưới Hỏi, Ký Kết, Khai Trương",
	  "Đinh Sửu": "Động Thổ, Xây Dựng, Tu Tạo",
	  "Mậu Dần": "Cầu Tài, Khai Trương, Xuất Hành",
	  "Kỷ Mão": "Cưới Hỏi, Cầu Phúc, Nhập Trạch",
	  "Canh Thìn": "Khai Trương, Cầu Tài, Giao Dịch",
	  "Tân Tỵ": "Cầu Tài, Ký Kết, Xuất Hành",
	  "Nhâm Ngọ": "Cưới Hỏi, Cầu Lộc, Khai Trương",
	  "Quý Mùi": "Động Thổ, An Táng, Tu Tạo",
	  "Giáp Thân": "Cầu Tài, Khai Trương, Ký Kết",
	  "Ất Dậu": "Cưới Hỏi, Nhập Trạch, Cầu Phúc",
	  "Bính Tuất": "Khai Trương, Xuất Hành, Giao Dịch",
	  "Đinh Hợi": "Cầu Tài, Cầu Lộc, Ký Kết",
	  "Mậu Tý": "Cưới Hỏi, Tế Lễ, Nhập Trạch",
	  "Kỷ Sửu": "Động Thổ, Xây Dựng, An Táng",
	  "Canh Dần": "Khai Trương, Cầu Tài, Ký Kết",
	  "Tân Mão": "Cưới Hỏi, Cầu Lộc, Nhập Trạch",
	  "Nhâm Thìn": "Khai Trương, Tế Lễ, Xuất Hành",
	  "Quý Tỵ": "Cầu Tài, Giao Dịch, Cầu Lộc",
	  "Giáp Ngọ": "Cưới Hỏi, Khai Trương, Xuất Hành",
	  "Ất Mùi": "Động Thổ, Xây Dựng, An Táng",
	  "Bính Thân": "Cầu Tài, Ký Kết, Khai Trương",
	  "Đinh Dậu": "Cưới Hỏi, Nhập Trạch, Cầu Phúc",
	  "Mậu Tuất": "Khai Trương, Cầu Tài, Giao Dịch",
	  "Kỷ Hợi": "Cầu Tài, Xuất Hành, Cầu Lộc",
	  "Canh Tý": "Cưới Hỏi, Cầu Phúc, Khai Trương",
	  "Tân Sửu": "Động Thổ, Tu Tạo, An Táng",
	  "Nhâm Dần": "Cầu Tài, Ký Kết, Khai Trương",
	  "Quý Mão": "Cưới Hỏi, Nhập Trạch, Cầu Phúc",
	  "Giáp Thìn": "Khai Trương, Xuất Hành, Cầu Tài",
	  "Ất Tỵ": "Cầu Tài, Ký Kết, Cầu Lộc",
	  "Bính Ngọ": "Cưới Hỏi, Cầu Phúc, Khai Trương",
	  "Đinh Mùi": "Động Thổ, Xây Dựng, Nhập Trạch",
	  "Mậu Thân": "Khai Trương, Cầu Tài, Xuất Hành",
	  "Kỷ Dậu": "Cưới Hỏi, Cầu Phúc, Tế Lễ",
	  "Canh Tuất": "Khai Trương, Cầu Tài, Ký Kết",
	  "Tân Hợi": "Cầu Tài, Xuất Hành, Cầu Lộc",
	  "Nhâm Tý": "Cưới Hỏi, Nhập Trạch, Cầu Phúc",
	  "Quý Sửu": "Động Thổ, Xây Dựng, An Táng",
	  "Giáp Dần": "Khai Trương, Cầu Tài, Ký Kết",
	  "Ất Mão": "Cưới Hỏi, Cầu Lộc, Nhập Trạch",
	  "Bính Thìn": "Khai Trương, Tế Lễ, Xuất Hành",
	  "Đinh Tỵ": "Cầu Tài, Giao Dịch, Cầu Lộc",
	  "Mậu Ngọ": "Cưới Hỏi, Khai Trương, Xuất Hành",
	  "Kỷ Mùi": "Động Thổ, Xây Dựng, Tu Tạo",
	  "Canh Thân": "Cầu Tài, Ký Kết, Khai Trương",
	  "Tân Dậu": "Cưới Hỏi, Nhập Trạch, Cầu Phúc",
	  "Nhâm Tuất": "Khai Trương, Cầu Tài, Xuất Hành",
	  "Quý Hợi": "Cầu Tài, Cầu Lộc, Giao Dịch"
	};
	
	const VIEC_KIENGLAM = {
	  "Giáp Tý": "Chôn Cất, Đi Xa, Kiện Tụng",
	  "Ất Sửu": "Cưới Hỏi, Khai Trương Lớn",
	  "Bính Dần": "An Táng, Kiện Tụng",
	  "Đinh Mão": "Xây Dựng Lớn, Đi Xa",
	  "Mậu Thìn": "Cưới Hỏi, Chôn Cất",
	  "Kỷ Tỵ": "Xây Nhà, Xuất Hành Hướng Nam",
	  "Canh Ngọ": "An Táng, Động Thổ Lớn",
	  "Tân Mùi": "Khai Trương, Xuất Hành Xa",
	  "Nhâm Thân": "Cưới Hỏi, Chôn Cất",
	  "Quý Dậu": "Xây Dựng, Khai Trương",
	  "Giáp Tuất": "An Táng, Kiện Tụng",
	  "Ất Hợi": "Cưới Hỏi, Xuất Hành Xa",
	  "Bính Tý": "Động Thổ, Chôn Cất",
	  "Đinh Sửu": "Khai Trương, Xuất Hành Xa",
	  "Mậu Dần": "Cưới Hỏi, An Táng",
	  "Kỷ Mão": "Xây Dựng, Xuất Hành Xa",
	  "Canh Thìn": "An Táng, Cầu Tài",
	  "Tân Tỵ": "Cưới Hỏi, Xây Dựng Lớn",
	  "Nhâm Ngọ": "Chôn Cất, Động Thổ",
	  "Quý Mùi": "Khai Trương, Đi Xa",
	  "Giáp Thân": "Cưới Hỏi, Chôn Cất",
	  "Ất Dậu": "Xây Dựng, Xuất Hành Xa",
	  "Bính Tuất": "Khai Trương, Kiện Tụng",
	  "Đinh Hợi": "An Táng, Cưới Hỏi",
	  "Mậu Tý": "Xây Dựng, Xuất Hành Xa",
	  "Kỷ Sửu": "Cưới Hỏi, An Táng",
	  "Canh Dần": "Khai Trương, Động Thổ",
	  "Tân Mão": "Chôn Cất, Kiện Tụng",
	  "Nhâm Thìn": "Cưới Hỏi, Xây Dựng",
	  "Quý Tỵ": "Khai Trương, Đi Xa",
	  "Giáp Ngọ": "An Táng, Cưới Hỏi",
	  "Ất Mùi": "Xây Dựng, Khai Trương",
	  "Bính Thân": "Cưới Hỏi, An Táng",
	  "Đinh Dậu": "Khai Trương, Kiện Tụng",
	  "Mậu Tuất": "Xây Dựng, Xuất Hành Xa",
	  "Kỷ Hợi": "Cưới Hỏi, Chôn Cất",
	  "Canh Tý": "Khai Trương, Động Thổ",
	  "Tân Sửu": "An Táng, Cưới Hỏi",
	  "Nhâm Dần": "Xây Dựng, Xuất Hành Xa",
	  "Quý Mão": "Cưới Hỏi, An Táng",
	  "Giáp Thìn": "Khai Trương, Đi Xa",
	  "Ất Tỵ": "Xây Dựng, Cưới Hỏi",
	  "Bính Ngọ": "An Táng, Cầu Tài",
	  "Đinh Mùi": "Khai Trương, Chôn Cất",
	  "Mậu Thân": "Cưới Hỏi, Xuất Hành Xa",
	  "Kỷ Dậu": "Xây Dựng, Kiện Tụng",
	  "Canh Tuất": "Chôn Cất, Đi Xa",
	  "Tân Hợi": "Cưới Hỏi, Khai Trương",
	  "Nhâm Tý": "Động Thổ, Xây Dựng",
	  "Quý Sửu": "Cưới Hỏi, Đi Xa",
	  "Giáp Dần": "Chôn Cất, Khai Trương",
	  "Ất Mão": "Xây Dựng, An Táng",
	  "Bính Thìn": "Cưới Hỏi, Kiện Tụng",
	  "Đinh Tỵ": "Khai Trương, Xuất Hành Xa",
	  "Mậu Ngọ": "An Táng, Xây Dựng",
	  "Kỷ Mùi": "Cưới Hỏi, Đi Xa",
	  "Canh Thân": "Khai Trương, Cầu Tài",
	  "Tân Dậu": "Xây Dựng, Chôn Cất",
	  "Nhâm Tuất": "Cưới Hỏi, Khai Trương",
	  "Quý Hợi": "Động Thổ, Đi Xa"
	};


// ===== Thập nhị trực =====
const THAP_NHI_TRUC = {
  "Kiến": { tot: "Khai trương, nhậm chức, cưới hỏi, trồng cây, đền ơn đáp nghĩa. Xuất hành đặng lợi, sinh con rất tốt.", xau: "Động thổ, chôn cất, đào giếng, lợp nhà." },
  "Trừ":  { tot: "Động đất, ban nền đắp nền, thờ cúng Táo Thần, cầu thầy chữa bệnh bằng cách mổ xẻ hay châm cứu, bốc thuốc, xả tang, khởi công làm lò nhuộm lò gốm, nữ nhân khởi đầu uống thuốc chữa bệnh.", xau: "Đẻ con nhằm ngày này khó nuôi, nên làm Âm Đức cho con, nam nhân kỵ khởi đầu uống thuốc." },
  "Mãn":  { tot: "Xuất hành, đi đường thủy, cho vay, thu nợ, mua hàng, bán hàng, nhập kho, đặt táng, kê gác, sửa chữa, lắp đặt máy, thuê thêm người, vào học kỹ nghệ, làm chuồng gà ngỗng vịt.", xau: "Lên quan lãnh chức, uống thuốc, vào làm hành chính, dâng nộp đơn từ." },
  "Bình": { tot: "Nhập vào kho, đặt táng, gắn cửa, kê gác, đặt yên chỗ máy, sửa chữa làm tàu, khai trương tàu thuyền, các việc bồi đắp thêm ( như bồi bùn, đắp đất, lót đá, xây bờ kè.) Lót giường đóng giường, thừa kế tước phong hay thừa kế sự nghiệp, các vụ làm cho khuyết thủng ( như đào mương, móc giếng, xả nước.)", xau: "Không có" },
  "Định": { tot: "Động thổ, san nền, đắp nền, làm hay sửa phòng bếp, lắp đặt máy móc, nhập học, làm lễ cầu thân, nộp đơn dâng sớ, sửa hay làm tàu thuyền, khai trương tàu thuyền, khởi công làm lò. Mua nuôi thêm súc vật.", xau: "Thưa kiện, xuất hành đi xa." },
  "Chấp": { tot: "Lập khế ước, giao dịch, động thổ san nền, cầu thầy chữa bệnh, đi săn thú cá, tìm bắt trộm cướp. Xây đắp nền-tường.", xau: "Dời nhà, đi chơi xa, mở cửa hiệu buôn bán, xuất tiền của." },
  "Phá":  { tot: "Trị bệnh, Phá dỡ, Dọn dẹp", xau: "Là ngày Nhật Nguyệt tương xung. Ngày có trực Phá muôn việc làm vào ngày này đều bất lợi." },
  "Nguy":  { tot: "Không nên làm gì", xau: "Nói đến Trực Nguy là nói đến sự Nguy hiểm, suy thoái. Chính vì thế ngày có trực Nguy là ngày xấu, tiến hành muôn việc đều hung." },
  "Thành":{ tot: "Lập khế ước, giao dịch, cho vay, thu nợ, mua hàng, bán hàng, xuất hành, đi tàu thuyền, khởi tạo, động thổ, san nền đắp nền, gắn cửa, đặt táng, kê gác, dựng xây kho vựa, làm hay sửa chữa phòng bếp, thờ phụng Táo Thần, lắp đặt máy móc ( hay các loại máy ), gặt lúa, đào ao giếng, tháo nước, cầu thầy chữa bệnh, mua gia súc, các việc trong vụ chăn nuôi, nhập học, làm lễ cầu thân, cưới gả, kết hôn, thuê người, nộp đơn dâng sớ, học kỹ nghệ, làm hoặc sửa tàu thuyền, khai trương tàu thuyền, vẽ tranh, tu sửa cây cối.", xau: "Kiện tụng, tranh chấp." },
  "Thâu":  { tot: "Cấy lúa, gặt lúa, mua trâu, nuôi tằm, đi săn thú cá, tu sửa cây cối. Động thổ, san nền đắp nền, nữ nhân khởi ngày uống thuốc chưa bệnh, lên quan lãnh chức, thừa kế chức tước hay sự nghiệp, vào làm hành chính, nộp đơn dâng sớ.", xau: "Bắt đầu công việc mới, kỵ đi du lịch, kỵ tang lễ." },
  "Khai": { tot: "Xuất hành, đi tàu thuyền, khởi tạo, động thổ, san nền đắp nền, dựng xây kho vựa, làm hay sửa phòng bếp, thờ cúng Táo Thần, đóng giường lót giường, may áo, lắp đặt cỗ máy dệt hay các loại máy, cấy lúa gặt lúa, đào ao giếng, tháo nước, các việc trong vụ chăn nuôi, mở thông hào rãnh, cầu thầy chữa bệnh, bốc thuốc, uống thuốc, mua trâu, làm rượu, nhập học, học kỹ nghệ, vẽ tranh, tu sửa cây cối.", xau: "An táng, Chôn cất" },
  "Bế":  { tot: "Xây đắp tường, đặt táng, gắn cửa, kê gác, làm cầu. Khởi công lò nhuộm lò gốm, uống thuốc, trị bệnh (nhưng chớ trị bệnh mắt), tu sửa cây cối.", xau: "Lên quan nhậm chức, thừa kế chức tước hay sự nghiệp, nhập học, chữa bệnh mắt." }
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
				hacThan = "— (Hạc Thần bận việc trên trời)";
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
	  const TRUC_ORDER = [
	    "Kiến","Trừ","Mãn","Bình","Định","Chấp",
	    "Phá","Nguy","Thành","Thu","Khai","Bế"
	  ];
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

    
    const EMOJI_TRUC = {
      "Kiến":"🚪","Trừ":"✂️","Mãn":"🌕","Bình":"⚖️",
      "Định":"📜","Chấp":"✍️","Phá":"💥","Nguy":"⚠️",
      "Thành":"🏰","Thu":"🌾","Khai":"🔑","Bế":"🔒"
    };

    const EMOJI_SAO = {
      "Giác":"🐉","Cang":"🦄","Đê":"🏞️","Phòng":"🏠","Tâm":"❤️","Vĩ":"🦚","Cơ":"🧵","Đẩu":"🛶",
      "Ngưu":"🐂","Nữ":"👩","Hư":"🌫️","Nguy":"⚠️","Thất":"7️⃣","Bích":"💎","Khuê":"📚","Lâu":"🏯",
      "Vị":"🍽️","Mão":"🐇","Tất":"🧦","Chủy":"👄","Sâm":"🌱","Tỉnh":"💧","Quỷ":"👹","Liễu":"🌿",
      "Tinh":"⭐","Trương":"📜","Dực":"🪽","Chẩn":"🩺"
    };
    
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

  function printStyle(today, currentLunarDate, backgroundType = 'normal'){
    const formatthutrongtuan = TUAN[(currentLunarDate.jd + 1) % 7];
    let res = "";
    res += '<style>\n';

    // --- PHẦN 1: CSS NỀN TẢNG (BỐ CỤC, KÍCH THƯỚC) DÙNG CHUNG CHO CẢ 2 CHẾ ĐỘ ---
    res += `
      .tennam{ text-align:center; font-size:150%; line-height:120%; font-weight:bold; }
      .thongtin_letet{ text-align:center; margin-left:auto; margin-right:auto; font-size:clamp(70%,80%,90%); font-weight:bold; }
      .thangnam{ text-align:center; font-size:clamp(80%,90%,100%); line-height:120%; font-weight:bold; border-top-left-radius: 16px; border-top-right-radius: 16px;}
      .thangnam_amlich, .ThangNgayGioTiet1 { text-align:right; font-size:clamp(60%,80%,90%); font-weight:bold; }
      .ThangNgayGioTiet{ text-align:right; font-size:clamp(50%,60%,70%); font-weight:bold; }
      .todayduonglich{ text-align:center; font-size:clamp(420%,460%,480%); line-height:100%; font-weight:bold; }
      .thutrongtuan{ text-align:center; font-size:clamp(90%,100%,120%); line-height:160%; font-weight:bold; }
      .ngayamlich{ text-align:center; font-size:clamp(220%,240%,260%); font-weight:bold; height: 30px; padding-top: 16px; }
      .giohoangdao{ text-align:center; font-size:clamp(60%,65%,70%); font-weight:bold; line-height:140%; padding-bottom: 8px; }
      .viecnenlam, .viecnentranh, .cat_tinh, .hung_tinh { text-align:left; font-size:clamp(60%,65%,70%); font-weight:bold; line-height:150%;}
      
      .toggle-btn { display:block; width:100%; border:none; padding: 4px 0; border-radius:6px; cursor:pointer; font-weight:bold; font-size:clamp(60%,65%,70%); transition:all 0.3s ease; margin: 0; }
      .toggle-btn-container { padding: 4px 0; }
      
      .toggle-content { display:none; opacity:0; transform: translateY(-10px); transition: opacity 0.4s ease, transform 0.4s ease; }
      .toggle-content.show { display:table-row; opacity:1; transform: translateY(0); }
      .thang{ font-size:${PRINT_OPTS.fontSize}; padding:1; line-height:100%; font-family:Tahoma,Verdana,Arial; table-layout:fixed; background-color:transparent; }
      .tenthang{ text-align:center; font-size:125%; line-height:100%; font-weight:bold; }
      .navi-l,.navi-r{ color:#fff; text-align:center; font-size:75%; line-height:100%; font-weight:bold; padding: 4px 0; }
      .tenthang { padding: 4px 0; }
      
      .ngaytuan, .ngaytuan_t7, .ngaytuan_cn{ width:14%; text-align:center; font-size: 90%; padding: 6px 0; }
      
      /* <<< THAY ĐỔI 1: Thêm khoảng trống BÊN TRÊN mỗi ô ngày */
      .ngaythang { padding-top: 10px; }

      .am, .am2{ text-align:right; padding-right:3px; font-size:65%; }
      
      .t2t6, .t7, .cn{ text-align:center; font-size:125%; }

      .nav-btn { color:#fff; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-weight: bold; }
      .homnay{ font-weight:bold; }
    `;

    // --- PHẦN 2: CSS MÀU SẮC CHO CHẾ ĐỘ 'NORMAL' (MẶC ĐỊNH) ---
    res += `
      .tennam{ color:#000; background-color:#CCC }
      .thongtin_letet{ text-shadow:-1px 0 yellow,0 1px yellow,1px 0 yellow,0 -1px yellow; color:#f00 }
      .thangnam{ color:#000; background-color:rgba(204,255,204,.5); }
      .thangnam_amlich{ color:#000 }
      .ThangNgayGioTiet{ color:#000 }
      .ThangNgayGioTiet1{ text-shadow:-1px 0 yellow,0 1px yellow,1px 0 yellow,0 -1px yellow; color:#00f }
      .todayduonglich{ color:${(formatthutrongtuan==='Chủ Nhật'?'#f00':(formatthutrongtuan==='Thứ Bảy'?'#008000':'#ff0'))}; text-shadow:-3px 0 blue,0 3px blue,3px 0 blue,0 -3px blue }
      .thutrongtuan{ color:${(formatthutrongtuan==='Chủ Nhật'?'#f00':(formatthutrongtuan==='Thứ Bảy'?'#008000':'#000'))} }
      .ngayamlich{ color:#00f; text-shadow:-2px 0 yellow,0 2px yellow,2px 0 yellow,0 -2px yellow; }
      .giohoangdao{ color:#fff; background-color:rgba(0,0,255,.5)}
      .viecnenlam{ color:#00ffff; background-color:rgba(0,0,255,.5)}
      .viecnentranh{ color:#ff0000; background-color:rgba(0,0,255,.5)}
      .cat_tinh{ color:#00ff00; background-color:rgba(0,0,255,.5)}
      .hung_tinh{ color:#ff0000; background-color:rgba(0,0,255,.5)}
      .toggle-btn { color:#fff; background-color: rgba(0,0,255,0.2); }
      .navi-l{ color:red } .navi-r{ color:#330033 }
      .tenthang{ color:#330033; background-color:#CCFFCC }
      .navi-l,.navi-r{ background-color:#CCFFCC }
      .ngaytuan{ color:#330033; background-color:#FFFFCC }
      .ngaytuan_t7{ color:green; background-color:#FFFFCC }
      .ngaytuan_cn{ color:#f00; background-color:#FFFFCC }
      .ngaythang{ background-color:#FDFDF0 }
      .homnay{ background-color:#FFF000 }
      .tet{ background-color:#FFCC99 }
      .am{ color:blue }
      .am2{ color:#004080 }
      .t2t6{ color:black }
      .t7{ color:green }
      .cn{ color:red }
      .nav-btn { background-color: rgba(128, 128, 128,0.3); }
      .nav-btn:hover { background-color: rgba(128, 128, 128,0.6); }

      .giohoangdao { border-bottom: 1px solid rgba(0,0,255,0.2); }
      .toggle-btn-container { border-bottom: 1px solid rgba(0,0,255,0.2); }
      .navi-l, .navi-r, .tenthang { border-bottom: 1px solid #a2bda2; }
      .ngaytuan, .ngaytuan_t7, .ngaytuan_cn { border-bottom: 1px solid #dedeac; }
    `;

    // --- PHẦN 3: GHI ĐÈ CSS NẾU LÀ CHẾ ĐỘ 'TRANSPARENT' ---
    if (backgroundType === 'transparent') {
      res += `
        /* 1. Xóa tất cả hình nền và màu nền */
        .lunar-card > div:first-child, .thangnam, .giohoangdao, .viecnenlam, .viecnentranh,
        .cat_tinh, .hung_tinh, .tenthang, .navi-l, .navi-r, .ngaytuan, .ngaytuan_t7,
        .ngaytuan_cn, .ngaythang, .tet, .homnay, .nav-btn, .toggle-btn, .thutrongtuan div {
            background: transparent !important;
        }

        /* 2. Chuyển màu chữ mặc định (vốn là đen, xanh, tím) thành trắng */
        .tennam, .thangnam, .thangnam_amlich, .ThangNgayGioTiet, .thutrongtuan, .t2t6,
        .am, .am2, .tenthang, .navi-r, .ngaytuan, .toggle-btn, .viecnenlam b, .viecnentranh b,
        .cat_tinh b, .hung_tinh b, .giohoangdao {
            color: #ffffff !important;
        }
        
        /* 3. Xóa bỏ bóng chữ (text-shadow) để dễ đọc hơn */
        .thongtin_letet, .ThangNgayGioTiet1, .todayduonglich, .ngayamlich {
             text-shadow: none !important;
        }

        /* 4. Bỏ viền cho các nút bên trong thẻ */
        .toggle-btn, .nav-btn {
            border: none !important;
        }
        .nav-btn:hover, .toggle-btn:hover {
            background-color: rgba(255, 255, 255, 0.2) !important;
        }

        /* 5. Làm nổi bật ngày hôm nay bằng một lớp nền mờ thay vì màu vàng */
        .homnay {
            background-color: rgba(255, 255, 255, 0.15) !important;
            border-radius: 8px;
        }

        /* 6. Thêm các đường kẻ phân cách cho chế độ transparent */
        .giohoangdao, .toggle-btn-container, .navi-l, .navi-r, .tenthang, .ngaytuan, .ngaytuan_t7, .ngaytuan_cn {
            border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
        }
      `;
    }
    res += '</style>';
    return res;
  }

  function printHead(mm, yy){
    let res = "";
    const monthName = mm+"/"+yy;
    res += `<tr><td colspan="2" class="navi-l"><button id="prev-year" class="nav-btn">&lt;&lt;</button>  <button id="prev-month" class="nav-btn">&lt;</button></td>`;
    res += `<td colspan="3" class="tenthang"><button id="reset-today" style="all:unset;cursor:pointer;" class="nav-btn">${monthName}</button></td>`;
    res += `<td colspan="2" class="navi-r"><button id="next-month" class="nav-btn">&gt;</button>  <button id="next-year" class="nav-btn">&gt;&gt;</button></td></tr>`;
    res += '<tr>';
    for (let i=0;i<=6;i++){
      if (DAYNAMES[i]==='CN') res += '<td class="ngaytuan_cn">CN</td>';
      else if (DAYNAMES[i]==='T7') res += '<td class="ngaytuan_t7">T7</td>';
      else res += `<td class="ngaytuan">${DAYNAMES[i]}</td>`;
    }
    res += '</tr>';
    return res;
  }

  function printEmptyCell(){
    return '<td class="ngaythang"><div class="cn">&nbsp;</div><div class="am">&nbsp;</div></td>';
  }

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
    if (lunarDate.day === 1 && lunarDate.month === 1){ cellClass = "tet"; }
    if (lunarDate.leap === 1){ lunarClass = "am2"; }

    let lunar = lunarDate.day;
    if (solarDate === 1 || lunar === 1){ lunar = `${lunarDate.day}/${lunarDate.month}`; }

    let title = getDayName(lunarDate);
    return `<td class="${cellClass}" title="${title}">`+
      `<div class="${solarClass}">${solarDate}</div>`+
      `<div style="font-size:50%;" class="${lunarClass}">${lunar}</div>`+
      `</td>`;
  }


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

	res += `<div style="${backgroundStyle} border-top-left-radius: 16px; border-top-right-radius: 16px;">`;
    res += `<table class="thang" border="0" cellpadding="1" cellspacing="2" width="${PRINT_OPTS.tableWidth}">`;
    res += `<tr><td colspan="7" class="thangnam">Tháng ${mm} năm ${yy}</td></tr>`;

    res += '<tr><td colspan="7">';
    res += '<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0">';
    res += `<tr><td class="todayduonglich" colspan="5">${today.getDate()}</td></tr>`;
    res += `<tr><td class="thutrongtuan" colspan="5"><div style="margin:0 auto; width:20%; border-radius:6px; background-color:rgba(204,255,204,.5);">${TUAN[(currentLunarDate.jd + 1) % 7]}</div></td></tr>`;
    res += '<tr>';
    res += '<td width="34%" colspan="2">';
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
					daysInLunarMonth = 30;
				}
				break;
			}
		}
		if (daysInLunarMonth === 29) { thangAm += " (T)"; } 
    else if (daysInLunarMonth === 30) { thangAm += " (Đ)"; }

    res += `<div class="ThangNgayGioTiet1" style="text-align:center;">${thangAm}</div>`;
    res += `<div class="ngayamlich">${currentLunarDate.day}</div>`;
    res += `<div class="ThangNgayGioTiet1" style="text-align:center; line-height:160%;">${getYearCanChi(currentLunarDate.year)} (${currentLunarDate.year})</div>`;
    res += '</td>';
    res += '<td class="thongtin_letet">';
    if (currentLunarDate.day === 1) res += '<div style="padding-bottom:8px;">Mùng Một</div>';
    else if (currentLunarDate.day === 15) res += '<div style="padding-bottom:8px;">Ngày Rằm</div>';

    const d_m = `${today.getDate()}/${mm}`;
    const idxDL = NGAY_LE_DL.indexOf(d_m); const infoDL = idxDL !== -1 ? NGAY_LE_DL_STRING[idxDL] : " ";
    const d_m_al = `${currentLunarDate.day}/${currentLunarDate.month}`;
    const idxAL = NGAY_LE_AL.indexOf(d_m_al); const infoAL = idxAL !== -1 ? NGAY_LE_AL_STRING[idxAL] : " ";
    res += `<div>${infoDL}<br>${infoAL}</div>`;
    res += '</td>';
    res += '<td width="34%" colspan="2">';
    res += `<div class="ThangNgayGioTiet1" style="text-align:right; margin-right:10px;"><i class="ThangNgayGioTiet">Tháng: </i>${getMonthCanChi(currentLunarDate)}</div>`;
    res += `<div class="ThangNgayGioTiet1" style="text-align:right; margin-right:10px;"><i class="ThangNgayGioTiet">Ngày: </i>${CAN[(jd + 9) % 10]} ${CHI[(jd+1)%12]}</div>`;
    res += `<div class="ThangNgayGioTiet1" style="text-align:right; margin-right:10px;"><i class="ThangNgayGioTiet">Giờ đầu: </i>${getCanHour0(jd)} ${CHI[0]}</div>`;
    res += `<div class="ThangNgayGioTiet1" style="text-align:right; margin-right:10px;"><i class="ThangNgayGioTiet">Tiết: </i>${TIETKHI[getSunLongitude(jd+1, 7.0)]}</div>`;
    res += '</td>';
    res += '</tr>';
    res += `<tr><td class="giohoangdao" colspan="5">Giờ hoàng đạo:<br>${getGioHoangDao(jd)}</td></tr>`;
    
    res += `<tr><td colspan="5" class="toggle-btn-container">
      <button class="toggle-btn" onclick="
        const rows = [...this.closest('table').querySelectorAll('.toggle-content')];
        const isHidden = rows.every(r => !r.classList.contains('show'));
        rows.forEach((r, i) => {
          setTimeout(() => {
            if(isHidden){ r.classList.add('show'); } else { r.classList.remove('show'); }
          }, i * 100);
        });
        this.innerHTML = isHidden ? 'Thu gọn 🔼' : 'Xem thêm 🔽';
      ">Xem thêm 🔽</button>
    </td></tr>`;

		res += `<tr class="toggle-content"><td class="viecnenlam" colspan="5" style="text-align:left; padding:2px 0px 2px 0px; line-height:1.6;">🌑<b style="color:#fff;">- Giờ hắc đạo:</b> <span style="text-align:justify;">${getGioHacDao(jd)}</span></td></tr>`;
		res += `<tr class="toggle-content"><td class="viecnenlam" colspan="5" style="text-align:left; padding:2px 0px 2px 0px; line-height:1.6;">🧭<b style="color:#fff;">- Hướng xuất hành:</b> <span style="text-align:justify;">${getHuongXuatHanh(jd)}</span></td></tr>`;
    const thanSat = getThanSat(currentLunarDate);
    res += `<tr class="toggle-content"><td class="viecnenlam" colspan="5" style="text-align:left; padding:2px 0px 2px 0px; line-height:1.6;"><b style="color:#fff;">${thanSat.truc.emoji}- Trực:</b> <span style=" background-color:rgba(0,255,0,0.8); color:#fff; font-weight:bold; padding:2px 10px; border-radius:8px;">${thanSat.truc.name}</span><div style="text-align:justify; padding:2px 10px 4px 10px; line-height:1.6;"><span style="color:#fff;">✅ Tốt:</span> ${thanSat.truc.info.tot} <span style="color:#fff;"><br>❌ Xấu: </span><span style="color:#ff9933;">${thanSat.truc.info.xau}</span></div></td></tr>`;

		res += `<tr class="toggle-content"><td class="viecnenlam" colspan="5" style="text-align:left; padding:2px 0px 2px 0px; line-height:1.6;"><b style="color:#fff;">🌟- Ngũ hành:</b><div style="text-align:justify; padding:2px 10px 4px 10px; line-height:1.6;"> ${thanSat.napAm}</div></td></tr>`;
		res += `<tr class="toggle-content">
			<td class="viecnenlam" colspan="5" style="text-align:left; line-height:1.6;">
				<span style="font-weight:bold; color:#fff; font-size:110%;">${thanSat.sao.emoji}- Nhị Thập Bát Tú: <span style=" background-color:rgba(0,255,0,0.8); color:#fff; font-weight:bold; padding:2px 10px; border-radius:8px;">${thanSat.sao.name}</span></span>
				<span style="font-style:italic; color:#ffff99;"> (${thanSat.sao.info.tenNgay || ""})</span>
			</td></tr>`;
		const chiTietDanhGia = thanSat.sao.info.danhGia.substring(thanSat.sao.info.danhGia.indexOf('('));
		const thoText = (thanSat.sao.info.tho || '').replace(/^\s+/gm, '');
		res += `<tr class="toggle-content">
			<td class="viecnenlam" colspan="5" style="text-align:left; padding:10px; line-height:1.6; border-top:1px solid rgba(255,255,255,0.2);">
				<div style="font-style:italic; color:#ffff99; margin-bottom:6px;">
					<span style="
						background-color:${thanSat.sao.info.danhGia.includes('Tốt') ? 'rgba(0,255,0,0.8)' : 
																		 (thanSat.sao.info.danhGia.includes('Xấu') ? 'rgba(255,0,0,0.8)' : 
																		 'rgba(255,255,0,0.7)')};
						color:#fff; font-weight:bold; padding:2px 10px; border-radius:8px; margin-right:8px;
					">
						${thanSat.sao.info.danhGia.split(' ')[0]}
					</span>
					${chiTietDanhGia} - ${thanSat.sao.info.tuongTinh}
				</div>
				<div><b style="color:#fff;">👍 Nên làm:</b> <span style="text-align:justify;">${thanSat.sao.info.nenLam}</span></div>
				<div style="margin:5px 0;"><b style="color:#fff;">👎 Kiêng cữ:</b> <span style="color:#ff9933; text-align:justify;">${thanSat.sao.info.kiengCu}</span></div>
				<div><b style="color:#fff;">✨ Ngoại lệ:</b><div style="text-align:justify; padding:2px 10px 4px 10px; line-height:1.6;"> ${(thanSat.sao.info.ngoaiLe || '').replace(/\n/g, '<br>')}</div></div>
				<div style="font-family:'Times New Roman',serif; font-style:italic; color:#ffff99; margin-top:2px; padding-top:2px; border-bottom:1px solid rgba(255,255,255,0.2); text-align:center; white-space:pre-wrap;">${thoText}
				</div>
			</td></tr>`;
    
    res += '</table></td></tr>';
    res += printHead(mm, yy);
    for (let i=0;i<6;i++){
      res += '<tr>';
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

})();