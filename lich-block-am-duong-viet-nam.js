//
//
// Lấy code âm dương từ HO NGOC DUC và phát triển thẻ dành cho Home Assistant của Nguyễn Tiến Khải - khaisilk1910
// Lunar Calendar Custom Card for Home Assistant
// HA custom card:
//   type: custom:lich-block-am-duong-viet-nam
//   background: transparent # Hai chế độ normal(mặc định) và transparent
//   background_opacity: 0.6 #0 là có màu nền, 1 là màu nền trong suốt hoàn toàn

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


// ===== Hướng Xuất Hành (theo Can ngày) =====
const THAN_HUONG = {
  "Giáp": { hyThan: "Đông Bắc", taiThan: "Đông Nam", hacThan: "Tây Bắc" },
  "Ất":   { hyThan: "Tây Bắc", taiThan: "Đông Nam", hacThan: "Chính Đông" },
  "Bính": { hyThan: "Tây Nam", taiThan: "Chính Tây", hacThan: "Chính Nam" },
  "Đinh": { hyThan: "Chính Nam", taiThan: "Chính Tây", hacThan: "Chính Tây" },
  "Mậu":  { hyThan: "Đông Nam", taiThan: "Chính Bắc", hacThan: "Tây Nam" },
  "Kỷ":   { hyThan: "Đông Bắc", taiThan: "Chính Bắc", hacThan: "Chính Bắc" },
  "Canh": { hyThan: "Tây Bắc", taiThan: "Chính Đông", hacThan: "Đông Nam" },
  "Tân":  { hyThan: "Tây Nam", taiThan: "Chính Đông", hacThan: "Đông Bắc" },
  "Nhâm": { hyThan: "Chính Nam", taiThan: "Chính Tây", hacThan: "Tây Bắc" },
  "Quý":  { hyThan: "Đông Nam", taiThan: "Chính Tây", hacThan: "Tây Nam" }
};


// ===== Thập nhị trực =====
const THAP_NHI_TRUC = {
  "Kiến": { tot: "Xuất hành, Khai trương, Động thổ, Nhập học", xau: "An táng" },
  "Trừ":  { tot: "Trừ bệnh, Cắt may, Làm thuốc", xau: "Khai trương, Xuất hành" },
  "Mãn":  { tot: "Cưới hỏi, Cầu tài, Cầu phúc", xau: "Kiện tụng, Chôn cất" },
  "Bình": { tot: "Cúng tế, Cầu phúc, Giao dịch", xau: "Xuất hành xa, Tranh tụng" },
  "Định": { tot: "Cưới hỏi, Ký kết, Nhập trạch", xau: "Khai trương lớn" },
  "Chấp": { tot: "Xây dựng, Trồng trọt, Giao dịch nhỏ", xau: "Khai trương, Xuất hành xa" },
  "Phá":  { tot: "Trị bệnh, Phá dỡ, Dọn dẹp", xau: "Cầu tài, Cưới hỏi, An táng" },
  "Nguy":  { tot: "Làm việc mạo hiểm, Cầu công danh", xau: "Cưới hỏi, An táng, Khai trương" },
  "Thành":{ tot: "Khai trương, Cầu tài, Xây dựng, Cưới hỏi", xau: "Kiện tụng" },
  "Thu":  { tot: "Cúng tế, Gieo trồng, Thu hoạch", xau: "Khai trương, Xuất hành" },
  "Khai": { tot: "Khai trương, Xuất hành, Mở cửa hàng", xau: "An táng, Chôn cất" },
  "Bế":  { tot: "An táng, Tu sửa mộ phần", xau: "Khai trương, Xuất hành, Cưới hỏi" }
};

// ===== Nhị thập bát tú =====
const NHI_THAP_BAT_TU = {
  "Giác": {
    tenNgay: "Giác Mộc Giao - Sái Tuân",
    danhGia: "Tốt (Kiết Tú)",
    tuongTinh: "Con Giao Long, chủ trị ngày thứ 5.",
    nenLam: "Cưới gả, thi cử, khởi công, xây cất, an táng, làm việc thiện. Mọi việc đều tốt.",
    kiengCu: "Không có việc gì phải kiêng kỵ đặc biệt.",
    ngoaiLe: "Tại Thìn là Đăng Viên, tạo tác đại lợi. Tại Tý là Sinh Địa, cũng rất tốt. Tại Thân là Diệt Địa, nên tránh. Gặp ngày Canh Thìn hoặc Mậu Thìn, xây cất tốt lành.",
    tho: "Giác tinh tạo tác chủ vinh xương,\nNgoại quan hỷ sự đại cát tường,\nGiá thú tu du tam tuế tử,\nAn táng, chiêu tài cập điền trang."
  },
  "Cang": {
    tenNgay: "Cang Kim Long - Diêu Kỳ",
    danhGia: "Tốt (Bình Tú)",
    tuongTinh: "Con Rồng, chủ trị ngày thứ 6.",
    nenLam: "Cắt may áo mới, khai trương nhỏ.",
    kiengCu: "Đại kỵ cưới hỏi. Chôn cất, xây cất nhà cửa, khởi công lớn đều không tốt, dễ gặp điều không may.",
    ngoaiLe: "Tại Thìn là Phục Đoạn Sát, kỵ chôn cất, xuất hành, thừa kế, chia gia tài. Tại Sửu là Nhập Miếu, khởi tạo rất tốt. Tại Tuất, kỵ xây cất.",
    tho: "Cang tinh tạo tác bât an tường,\nThập nhật chi trung hữu lưỡng thương,\nGiá thú, khai môn, tu phòng thất,\nMai táng nhị thập nhật kiến hung."
  },
  "Đê": {
    tenNgay: "Đê Thổ Lạc - Ngô Hán",
    danhGia: "Xấu (Hung Tú)",
    tuongTinh: "Con Lửng, chủ trị ngày thứ 7.",
    nenLam: "Cầu phúc, gieo trồng, làm những việc nhỏ.",
    kiengCu: "Khởi công xây dựng, cưới hỏi, chôn cất, khai trương, xuất hành xa. Làm các việc này dễ gặp thất bại, kiện tụng.",
    ngoaiLe: "Tại Mão, Hợi, Mùi, mọi việc đều tốt. Gặp ngày Mão là Đăng Viên, các việc tốt đẹp.",
    tho: "Đê tinh tạo tác chủ tai hung,\nTà ma quỷ quái nhập phòng trung,\nKhai môn, phóng thủy tu phòng tử,\nGiá thú, mai táng tiệm tiệm không."
  },
  "Phòng": {
    tenNgay: "Phòng Nhật Thố - Cảnh Đan",
    danhGia: "Tốt (Kiết Tú)",
    tuongTinh: "Con Thỏ, chủ trị ngày Chủ Nhật.",
    nenLam: "Mọi việc đều tốt. Nhất là khởi công, xây dựng, cưới hỏi, khai trương, xuất hành, nhậm chức, an táng.",
    kiengCu: "Không có.",
    ngoaiLe: "Gặp ngày Hợi, Mão, Mùi thì kỵ chôn cất.",
    tho: "Phòng tinh tạo tác đại cát xương,\nGiá thú, điền tàm đại cát tường,\nMai táng bá niên tăng phú quý,\nPhóng thủy, khai môn chiêu tài vượng."
  },
  "Tâm": {
    tenNgay: "Tâm Nguyệt Hồ - Khấu Tuân",
    danhGia: "Xấu (Hung Tú)",
    tuongTinh: "Con Cáo, chủ trị ngày thứ 2.",
    nenLam: "Trị bệnh, phá dỡ, dọn dẹp nhà cửa.",
    kiengCu: "Mọi việc lớn như cưới hỏi, khai trương, xây cất, chôn cất, kiện tụng đều rất xấu, dễ gặp tai họa, phá sản.",
    ngoaiLe: "Tại Dần, Ngọ, Tuất mọi việc đều tốt.",
    tho: "Tâm tinh tạo tác đại vi hung,\nCánh tao hình tụng, cập lao lung,\nTụng sự, điền tàm tịnh thất bại,\nHôn nhân, quan quách bất an ninh."
  },
  "Vĩ": {
    tenNgay: "Vĩ Hỏa Hổ - Sầm Bành",
    danhGia: "Tốt (Kiết Tú)",
    tuongTinh: "Con Cọp, chủ trị ngày thứ 3.",
    nenLam: "Mọi việc đều tốt, nhất là cúng tế, cầu phúc, xây dựng.",
    kiengCu: "Cưới hỏi, may vá, đóng giường.",
    ngoaiLe: "Tại Hợi, Mão, Mùi kỵ chôn cất. Gặp ngày Mão là Đăng Viên, các việc tốt đẹp.",
    tho: "Vĩ tinh tạo tác đắc quan ban,\nCanh tác, giá thú vượng điền tàm,\nMai táng, tu bổ diên niên thọ,\nKhai môn, phóng thủy tu long an."
  },
  "Cơ": {
    tenNgay: "Cơ Thủy Báo - Phùng Dị",
    danhGia: "Tốt (Kiết Tú)",
    tuongTinh: "Con Báo, chủ trị ngày thứ 4.",
    nenLam: "Rất tốt cho việc xây dựng, động thổ, lợp nhà, mua bán đất đai, gieo trồng.",
    kiengCu: "Kỵ nhất là khai trương, cưới hỏi, chôn cất và đóng thuyền.",
    ngoaiLe: "Tại Thìn, Tý, Thân thì tốt. Tại Tuất là Phục Đoạn Sát, kỵ chôn cất, xuất hành.",
    tho: "Cơ tinh tạo tác đại cát tường,\nTuế tuế niên niên đại cát xương,\nMai táng, tu phòng, sinh quý tử,\nGiá thú, điền tàm vượng gia quang."
  },
  "Đẩu": {
    tenNgay: "Đẩu Mộc Giải - Chu Vận",
    danhGia: "Tốt (Kiết Tú)",
    tuongTinh: "Con Cua, chủ trị ngày thứ 5.",
    nenLam: "Tốt cho việc xuất hành, khởi công nhỏ, mua bán, giao dịch.",
    kiengCu: "Đại kỵ cưới hỏi, làm nhà, đào giếng.",
    ngoaiLe: "Tại Tý là Đăng Viên, rất tốt. Tại Thân, Thìn cũng tốt.",
    tho: "Đẩu tinh tạo tác chủ chiêu tài,\nVăn vũ quan viên vị đỉnh thai,\nĐiền trạch, tiền tài thiên vạn tiến,\nHôn nhân, quan quách phúc lai."
  },
  "Ngưu": {
    tenNgay: "Ngưu Kim Ngưu - Tế Tuân",
    danhGia: "Xấu (Hung Tú)",
    tuongTinh: "Con Trâu, chủ trị ngày thứ 6.",
    nenLam: "Chỉ tốt cho việc an táng, tu sửa mộ phần, tế tự.",
    kiengCu: "Đại kỵ cưới hỏi, khai trương, làm nhà, đi xa. Làm những việc này thường gặp chuyện lôi thôi, gia đình bất hòa, hao tài.",
    ngoaiLe: "Tại Hợi, Dậu, Sửu, tuy gặp Hung tinh nhưng vẫn có thể làm được. Gặp ngày Sửu là Đăng Viên, tốt vừa.",
    tho: "Ngưu tinh tạo tác chủ tai nguy,\nCửu hoành tam tai bất khả chỉ,\nGia đạo bất an, nhân khẩu thoái,\nHôn nhân, thiệp lộ, chủ phân ly."
  },
  "Nữ": {
    tenNgay: "Nữ Thổ Bức - Cảnh Đan",
    danhGia: "Xấu (Hung Tú)",
    tuongTinh: "Con Dơi, chủ trị ngày thứ 7.",
    nenLam: "Tốt cho việc cắt may, chữa bệnh, dọn dẹp.",
    kiengCu: "Đại kỵ cưới hỏi, an táng, làm nhà. Gặp sao này thường gây chia ly, bệnh tật, kiện tụng.",
    ngoaiLe: "Tại Hợi, Dậu, Sửu vẫn có thể dùng được. Gặp ngày Dậu là Đăng Viên, tốt.",
    tho: "Nữ tinh tạo tác tổn nhân đinh,\nTrung niên gia đạo chủ linh đinh,\nGiá thú chiêu lai tam tuế tử,\nHôn nhân, quan quách tất tai sinh."
  },
  "Hư": {
    tenNgay: "Hư Nhật Thử - Cái Diên",
    danhGia: "Xấu (Hung Tú)",
    tuongTinh: "Con Chuột, chủ trị ngày Chủ Nhật.",
    nenLam: "Tốt cho việc phá dỡ, trị bệnh.",
    kiengCu: "Mọi việc lớn như cưới hỏi, khai trương, xây cất, an táng đều rất xấu. Sao này chủ về sự hư không, mất mát.",
    ngoaiLe: "Tại Thân, Tý, Thìn mọi việc đều tốt. Gặp ngày Thìn là Đăng Viên.",
    tho: "Hư tinh tạo tác chủ tai ương,\nNam nữ tắc hung, di vong thân,\nTụng sự, điền tàm tịnh thất bại,\nHôn nhân, giá thú bất an ninh."
  },
  "Nguy": {
    tenNgay: "Nguy Nguyệt Yến - Kiên Đàm",
    danhGia: "Xấu (Hung Tú)",
    tuongTinh: "Con Én, chủ trị ngày thứ 2.",
    nenLam: "Tốt cho việc xây dựng, trồng trọt.",
    kiengCu: "Kỵ cưới hỏi, đi thuyền, an táng. Gặp sao này làm việc gì cũng thấy không chắc chắn, nguy hiểm.",
    ngoaiLe: "Tại Thân, Tý, Thìn mọi việc đều tốt. Tại Tỵ là Diệt Địa, rất kỵ.",
    tho: "Nguy tinh tạo tác chủ ôn hoàng,\nHôn nhân, giá thú bất an tường,\nKhai môn, phóng thủy chiêu tai họa,\nMai táng tu phòng tiểu nhi vong."
  },
  "Thất": {
    tenNgay: "Thất Hỏa Trư - Cảnh Đan",
    danhGia: "Tốt (Kiết Tú)",
    tuongTinh: "Con Heo, chủ trị ngày thứ 3.",
    nenLam: "Mọi việc đều tốt, nhất là khởi công, xây cất, cưới hỏi, khai trương, an táng.",
    kiengCu: "Không có.",
    ngoaiLe: "Tại Tuất là Nhập Miếu, rất tốt. Gặp ngày Tuất là Đăng Viên.",
    tho: "Thất tinh tạo tác đại cát tường,\nGiá thú, điền tàm vượng gia quang,\nAn sàng, phóng thủy, sinh quý tử,\nTòng thử vinh hoa phú quý trường."
  },
  "Bích": {
    tenNgay: "Bích Thủy Du - Tạng Cung",
    danhGia: "Tốt (Kiết Tú)",
    tuongTinh: "Con Rái Cá, chủ trị ngày thứ 4.",
    nenLam: "Mọi việc đều tốt. Đặc biệt tốt cho việc cúng tế, cầu phúc, xây cất, cưới hỏi, mở cửa hàng.",
    kiengCu: "Kỵ nhất việc sửa chữa, tu bổ kho tàng.",
    ngoaiLe: "Tại Hợi, Mão, Mùi mọi việc đều tốt. Gặp ngày Hợi là Đăng Viên, đại cát.",
    tho: "Bích tinh tạo tác tiến điền ngưu,\nTòng thử gia môn phú quý lưu,\nGiá thú, khai môn, quan lộc chí,\nBách sự tu du vượng nhân khẩu."
  },
  "Khuê": {
    tenNgay: "Khuê Mộc Lang - Mã Vũ",
    danhGia: "Xấu (Hung Tú)",
    tuongTinh: "Con Sói, chủ trị ngày thứ 5.",
    nenLam: "Tốt cho việc khai trương, học hành, thi cử.",
    kiengCu: "Đại kỵ an táng. Không nên khởi công xây dựng nhà cửa, dễ gây bất hòa trong gia đình.",
    ngoaiLe: "Gặp ngày Thìn thì Đăng Viên, tốt.",
    tho: "Khuê tinh tạo tác hữu tai ương,\nGia nội tòng thử bất an ninh,\nMai táng, tu phòng kinh khốc khấp,\nHôn nhân, giá thú bất cát tường."
  },
  "Lâu": {
    tenNgay: "Lâu Kim Cẩu - Lưu Long",
    danhGia: "Tốt (Kiết Tú)",
    tuongTinh: "Con Chó, chủ trị ngày thứ 6.",
    nenLam: "Mọi việc đều tốt. Đặc biệt tốt cho cưới hỏi, khai trương, xây dựng, chữa bệnh, xuất hành.",
    kiengCu: "Kỵ nhất việc khởi công đóng thuyền.",
    ngoaiLe: "Tại Dậu là Đăng Viên. Tại Tý, Ngọ, Mão cũng tốt.",
    tho: "Lâu tinh tạo tác vượng gia đinh,\nGiá thú, khai môn, vạn sự thành,\nTòng thử gia môn tăng phúc lộc,\nHữu nhân xưng tụng, vượng môn đình."
  },
  "Vị": {
    tenNgay: "Vị Thổ Trĩ - Cảnh Đan",
    danhGia: "Tốt (Kiết Tú)",
    tuongTinh: "Con Gà Trĩ, chủ trị ngày thứ 7.",
    nenLam: "Tốt cho việc xây dựng, động thổ, cưới hỏi, an táng.",
    kiengCu: "Kỵ đi thuyền.",
    ngoaiLe: "Gặp ngày Dậu là Đăng Viên.",
    tho: "Vị tinh tạo tác sự như tâm,\nGia môn, điền trạch, vượng nhân đinh,\nGiá thú, khai môn, quan lộc chí,\nMai táng tu phòng tử tôn hưng."
  },
  "Mão": {
    tenNgay: "Mão Nhật Kê - Vương Lương",
    danhGia: "Xấu (Hung Tú)",
    tuongTinh: "Con Gà, chủ trị ngày Chủ Nhật.",
    nenLam: "Tốt cho việc cắt may, học hành, làm những việc nhỏ.",
    kiengCu: "Đại kỵ cưới hỏi, an táng, xây cất nhà cửa, khai trương. Gặp sao này mọi việc lớn đều bất thành, trắc trở.",
    ngoaiLe: "Tại Hợi, Mão, Mùi kỵ chôn cất. Tại Dậu là Đăng Viên, có thể dùng.",
    tho: "Mão tinh tạo tác chủ tai hoạ,\nHôn nhân, giá thú bất khả thành,\nPhụ nhân mang thai vi bất lợi,\nGia đạo tòng thử bất an ninh."
  },
  "Tất": {
    tenNgay: "Tất Nguyệt Ô - Trần Tuấn",
    danhGia: "Tốt (Kiết Tú)",
    tuongTinh: "Con Quạ, chủ trị ngày thứ 2.",
    nenLam: "Mọi việc đều tốt. Tốt nhất cho việc khai trương, xuất hành, xây dựng, cưới hỏi, an táng.",
    kiengCu: "Không có.",
    ngoaiLe: "Tại Tỵ, Dậu, Sửu đều tốt. Gặp ngày Dậu là Đăng Viên.",
    tho: "Tất tinh tạo tác đại cát tường,\nHôn nhân, giá thú, vượng điền trang,\nKhai môn, phóng thủy, sinh quý tử,\nGia môn hưng vượng, phúc thọ trường."
  },
  "Chủy": {
    tenNgay: "Chủy Hỏa Hầu - Phó Tuấn",
    danhGia: "Xấu (Hung Tú)",
    tuongTinh: "Con Khỉ, chủ trị ngày thứ 3.",
    nenLam: "Tốt cho việc cầu tài, học hành, thi cử.",
    kiengCu: "Kỵ nhất là an táng, xây cất, khai trương, cưới hỏi. Làm những việc này dễ gặp thị phi, kiện tụng.",
    ngoaiLe: "Tại Thân là Đăng Viên, tốt.",
    tho: "Chủy tinh tạo tác chủ tang vong,\nTáng sự, tu phòng, đại bất tường,\nHôn nhân, quan quách, đa khẩu thiệt,\nGia trạch tòng thử bất an khang."
  },
  "Sâm": {
    tenNgay: "Sâm Thủy Viên - Đỗ Mậu",
    danhGia: "Tốt (Bình Tú)",
    tuongTinh: "Con Vượn, chủ trị ngày thứ 4.",
    nenLam: "Tốt cho việc cưới hỏi, xây dựng, làm việc thiện.",
    kiengCu: "Kỵ an táng, đào giếng, đi thuyền.",
    ngoaiLe: "Tại Thân là Đăng Viên, rất tốt. Tại Tý, Thìn cũng tốt.",
    tho: "Sâm tinh tạo tác đắc quan vị,\nTòng thử gia môn đại cát lợi,\nGiá thú, tu phòng, tăng phúc thọ,\nPhú quý, vinh hoa, vượng tử tôn."
  },
  "Tỉnh": {
    tenNgay: "Tỉnh Mộc Hãn - Diêu Kỳ",
    danhGia: "Tốt (Bình Tú)",
    tuongTinh: "Con Hươu, chủ trị ngày thứ 5.",
    nenLam: "Tạo tác nhiều việc rất tốt như trổ cửa dựng cửa, mở thông đường nước, đào mương móc giếng, đi thuyền, xây cất, nhậm chức hoặc nhập học.",
    kiengCu: "Làm sanh phần, đóng thọ đường, chôn cất hay tu bổ mộ phần.",
    ngoaiLe: "Sao Tỉnh tại Mùi, Hợi, Mão mọi việc tốt. Tại Mùi là Nhập Miếu nên khởi động vinh quang.",
    tho: "Tỉnh tinh tạo tác vượng tàm điền,\nKim bảng đề danh đệ nhất tiên,\nMai táng, tu phòng kinh tốt tử,\nHốt phong tật nhập hoàng điên tuyền.\nKhai môn, phóng thủy chiêu tài bạch,\nNgưu mã trư dương vượng mạc cát,\nQuả phụ điền đường lai nhập trạch,\nNhi tôn hưng vượng hữu dư tiền."
  },
  "Quỷ": {
    tenNgay: "Quỷ Kim Dương - Vương Bá",
    danhGia: "Xấu (Hung Tú)",
    tuongTinh: "Con Dê, chủ trị ngày thứ 6.",
    nenLam: "Tốt cho việc cúng tế, trị bệnh.",
    kiengCu: "Đại kỵ cưới hỏi, an táng, xây cất. Gặp sao này là sao xấu nhất trong 28 sao, làm việc gì cũng thất bại, bệnh tật, chết chóc.",
    ngoaiLe: "Gặp ngày Tý thì Đăng Viên, có thể dùng.",
    tho: "Quỷ tinh tạo tác đa tai ương,\nHữu bệnh, hữu tụng, kiến quan trường,\nMai táng, tu phòng, gia đình bại,\nHôn nhân, giá thú, kiến cô nương."
  },
  "Liễu": {
    tenNgay: "Liễu Thổ Chương - Ngô Hán",
    danhGia: "Xấu (Hung Tú)",
    tuongTinh: "Con Hoẵng, chủ trị ngày thứ 7.",
    nenLam: "Không có việc gì tốt.",
    kiengCu: "Đại kỵ cưới hỏi, an táng, xây cất, khai trương. Đây là một hung tinh mạnh, làm việc gì cũng bất lợi, gia đạo suy bại, con cái khó nuôi.",
    ngoaiLe: "Gặp ngày Tý, Thân, Thìn cũng không tốt.",
    tho: "Liễu tinh tạo tác chủ tao ương,\nGia trạch tòng thử bất an khang,\nMai táng, tu phòng, sinh tật bệnh,\nHôn nhân, giá thú, cửu hậu ương."
  },
  "Tinh": {
    tenNgay: "Tinh Nhật Mã - Phùng Dị",
    danhGia: "Xấu (Hung Tú)",
    tuongTinh: "Con Ngựa, chủ trị ngày Chủ Nhật.",
    nenLam: "Tốt cho việc học hành, thi cử.",
    kiengCu: "Đại kỵ cưới hỏi, an táng, xây cất.",
    ngoaiLe: "Tại Dần, Ngọ, Tuất đều kỵ. Gặp ngày Ngọ là Đăng Viên, nhưng vẫn xấu.",
    tho: "Tinh tinh tạo tác chủ ôn hoàng,\nHôn nhân, giá thú, bất an tường,\nQuan sự, hình tù, đa tật bệnh,\nMai táng, tu phòng, kiến tai ương."
  },
  "Trương": {
    tenNgay: "Trương Nguyệt Lộc - Vạn Tu",
    danhGia: "Tốt (Kiết Tú)",
    tuongTinh: "Con Hươu, chủ trị ngày thứ 2.",
    nenLam: "Mọi việc đều tốt. Đặc biệt tốt cho cưới hỏi, khai trương, xây dựng, nhậm chức, làm việc thiện.",
    kiengCu: "Kỵ nhất là chôn cất, làm sanh phần.",
    ngoaiLe: "Tại Tý, Thân, Thìn cũng kỵ chôn cất. Gặp ngày Thân là Đăng Viên.",
    tho: "Trương tinh tạo tác vượng điền tàm,\nGiá thú, hôn nhân, đại cát xương,\nKhai môn, phóng thủy, tài nguyên chí,\nGia môn hưng vượng, tử tôn cường."
  },
  "Dực": {
    tenNgay: "Dực Hỏa Xà - Cảnh Đan",
    danhGia: "Xấu (Hung Tú)",
    tuongTinh: "Con Rắn, chủ trị ngày thứ 3.",
    nenLam: "Không có việc gì tốt.",
    kiengCu: "Đại kỵ cưới hỏi, an táng, xây cất, khai trương. Sao này chủ về sự chia ly, tan tác.",
    ngoaiLe: "Tại Tỵ, Dậu, Sửu cũng không tốt.",
    tho: "Dực tinh tạo tác chủ phân trương,\nHôn nhân, giá thú, bất an tường,\nMai táng, tu phòng, đa tật bệnh,\nBách sự kinh doanh, chủ phá bại."
  },
  "Chẩn": {
    tenNgay: "Chẩn Thủy Dẫn - Lưu Trực",
    danhGia: "Tốt (Kiết Tú)",
    tuongTinh: "Con Giun, chủ trị ngày thứ 4.",
    nenLam: "Tốt cho việc cúng tế, gieo trồng, cưới hỏi.",
    kiengCu: "Kỵ khai trương, làm nhà, đi thuyền, an táng.",
    ngoaiLe: "Tại Thân, Tý, Thìn đều tốt. Gặp ngày Thìn là Đăng Viên.",
    tho: "Chẩn tinh tạo tác đại cát tường,\nTòng thử gia môn vượng điền trang,\nGiá thú, khai môn, quan lộc chí,\nPhú quý, vinh hoa, phúc thọ trường."
  }
};

// ===== Ngũ hành nạp âm (60 hoa giáp) =====
const NGU_HANH_NAP_AM = {
  "Giáp Tý": "Hải Trung Kim",   "Ất Sửu": "Hải Trung Kim",
  "Bính Dần": "Lô Trung Hỏa",   "Đinh Mão": "Lô Trung Hỏa",
  "Mậu Thìn": "Đại Lâm Mộc",    "Kỷ Tỵ": "Đại Lâm Mộc",
  "Canh Ngọ": "Lộ Bàng Thổ",    "Tân Mùi": "Lộ Bàng Thổ",
  "Nhâm Thân": "Kiếm Phong Kim","Quý Dậu": "Kiếm Phong Kim",
  "Giáp Tuất": "Sơn Đầu Hỏa",   "Ất Hợi": "Sơn Đầu Hỏa",
  "Bính Tý": "Giản Hạ Thủy",    "Đinh Sửu": "Giản Hạ Thủy",
  "Mậu Dần": "Thành Đầu Thổ",   "Kỷ Mão": "Thành Đầu Thổ",
  "Canh Thìn": "Bạch Lạp Kim",  "Tân Tỵ": "Bạch Lạp Kim",
  "Nhâm Ngọ": "Dương Liễu Mộc","Quý Mùi": "Dương Liễu Mộc",
  "Giáp Thân": "Tuyền Trung Thủy","Ất Dậu": "Tuyền Trung Thủy",
  "Bính Tuất": "Ốc Thượng Thổ","Đinh Hợi": "Ốc Thượng Thổ",
  "Mậu Tý": "Tích Lịch Hỏa",   "Kỷ Sửu": "Tích Lịch Hỏa",
  "Canh Dần": "Tùng Bách Mộc", "Tân Mão": "Tùng Bách Mộc",
  "Nhâm Thìn": "Trường Lưu Thủy","Quý Tỵ": "Trường Lưu Thủy",
  "Giáp Ngọ": "Sa Trung Kim",  "Ất Mùi": "Sa Trung Kim",
  "Bính Thân": "Sơn Hạ Hỏa",   "Đinh Dậu": "Sơn Hạ Hỏa",
  "Mậu Tuất": "Bình Địa Mộc",  "Kỷ Hợi": "Bình Địa Mộc",
  "Canh Tý": "Bích Thượng Thổ","Tân Sửu": "Bích Thượng Thổ",
  "Nhâm Dần": "Kim Bạch Kim",  "Quý Mão": "Kim Bạch Kim",
  "Giáp Thìn": "Phúc Đăng Hỏa","Ất Tỵ": "Phúc Đăng Hỏa",
  "Bính Ngọ": "Thiên Hà Thủy", "Đinh Mùi": "Thiên Hà Thủy",
  "Mậu Thân": "Đại Dịch Thổ",  "Kỷ Dậu": "Đại Dịch Thổ",
  "Canh Tuất": "Thoa Xuyến Kim","Tân Hợi": "Thoa Xuyến Kim",
  "Nhâm Tý": "Tang Đố Mộc",    "Quý Sửu": "Tang Đố Mộc",
  "Giáp Dần": "Đại Khê Thủy",  "Ất Mão": "Đại Khê Thủy",
  "Bính Thìn": "Sa Trung Thổ", "Đinh Tỵ": "Sa Trung Thổ",
  "Mậu Ngọ": "Thiên Thượng Hỏa","Kỷ Mùi": "Thiên Thượng Hỏa",
  "Canh Thân": "Thạch Lựu Mộc","Tân Dậu": "Thạch Lựu Mộc",
  "Nhâm Tuất": "Đại Hải Thủy", "Quý Hợi": "Đại Hải Thủy"
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

  function getHuongXuatHanh(jd) {
    const canNgay = CAN[(jd + 9) % 10];
    const huong = THAN_HUONG[canNgay]; // Lấy dữ liệu từ bảng mới
    if (huong) {
      let tot = `Hỷ Thần: <b style="color:#00ff00;">${huong.hyThan}</b> - Tài Thần: <b style="color:#00ff00;">${huong.taiThan}</b>`;
      let xau = `Tránh: <b style="color:#ff9933;">${huong.hacThan} (Hạc Thần)</b>`;
      return `${tot} | ${xau}`;
    }
    return "Không rõ";
  }


	function getViecTotXau(lunarDate) {
		const cc = getCanChi(lunarDate);
		const ngay = cc[0]; // VD: "Đinh Mão"
		const nen = VIEC_NEN_LAM[ngay] || "Không rõ";
		const kieng = VIEC_KIENGLAM[ngay] || "Không rõ";
		return { nen, kieng };
	}
  
  
  function getThanSat(lunarDate) {
		
		 // ===== Thập nhị trực =====
	  const TRUC_ORDER = [
	    "Kiến","Trừ","Mãn","Bình","Định","Chấp",
	    "Phá","Nguy","Thành","Thu","Khai","Bế"
	  ];
	  const CHI_ORDER = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
	  const canChiTruc = getCanChi(lunarDate); 
	  const chiNgayTruc = canChiTruc[0].split(" ")[1];   // ví dụ: "Tỵ"
	  const chiThangTruc = canChiTruc[1].split(" ")[1];  // ví dụ: "Thân"
	  const chiIndexNgay = CHI_ORDER.indexOf(chiNgayTruc);
	  const chiIndexThang = CHI_ORDER.indexOf(chiThangTruc);
		const trucIndex = (chiIndexNgay - (chiIndexThang + 1) + 12) % 12;
	  const trucName = TRUC_ORDER[trucIndex];
	  const trucInfo = THAP_NHI_TRUC[trucName];


    // Nhị thập bát tú
    const saoNames = Object.keys(NHI_THAP_BAT_TU);
    const saoIndex = (lunarDate.jd + 11) % 28;
    const saoName = saoNames[saoIndex];
    const saoInfo = NHI_THAP_BAT_TU[saoName];

    // Ngũ hành nạp âm
    const cc = getCanChi(lunarDate);
    const ngayCC = cc[0]; // ví dụ: "Đinh Mão"
    const napAm = NGU_HANH_NAP_AM[ngayCC] || "Không rõ";

    // Thần sát (Cát/Hung tinh)
    const chiNgay = ngayCC.split(" ")[1];
    const thanSatData = THAN_SAT[chiNgay] || { cat: [], hung: [] };

    const catList = thanSatData.cat.map(c => `${c} (${CAT_TINH[c] || ""})`).join("; ");
    const hungList = thanSatData.hung.map(h => `${h} (${HUNG_TINH[h] || ""})`).join("; ");
    
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
      napAm: napAm,
      thanSat: { 
        cat: catList, 
        hung: hungList 
      }
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
      .navi-l,.navi-r{ text-align:center; font-size:75%; line-height:100%; font-weight:bold; padding: 4px 0; }
      .tenthang { padding: 4px 0; }
      
      .ngaytuan, .ngaytuan_t7, .ngaytuan_cn{ width:14%; text-align:center; font-size: 90%; padding: 6px 0; }
      
      /* <<< THAY ĐỔI 1: Thêm khoảng trống BÊN TRÊN mỗi ô ngày */
      .ngaythang { padding-top: 10px; }

      .am, .am2{ text-align:right; padding-right:3px; font-size:65%; }
      
      .t2t6, .t7, .cn{ text-align:center; font-size:125%; }

      .nav-btn { border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-weight: bold; }
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

		res += `<tr class="toggle-content"><td class="viecnenlam" colspan="5">🌑<b style="color:#fff;">- Giờ hắc đạo:</b> ${getGioHacDao(jd)}</td></tr>`;
		res += `<tr class="toggle-content"><td class="viecnenlam" colspan="5">🧭<b style="color:#fff;">- Hướng xuất hành:</b> ${getHuongXuatHanh(jd)}</td></tr>`;
    const viec = getViecTotXau(currentLunarDate);
    const thanSat = getThanSat(currentLunarDate);
    res += `<tr class="toggle-content"><td class="viecnenlam" colspan="5"><b style="color:#fff;">${thanSat.truc.emoji}- Trực:</b> ${thanSat.truc.name} <span style="color:#fff;">| Tốt:</span> ${thanSat.truc.info.tot} <span style="color:#fff;">| Xấu: </span><span style="color:#ff9933;">${thanSat.truc.info.xau}</span></td></tr>`;
		res += `<tr class="toggle-content">
			<td class="viecnenlam" colspan="5" style="text-align:left; line-height:1.6;">
				<span style="font-weight:bold; color:#fff; font-size:110%;">${thanSat.sao.emoji}- Nhị Thập Bát Tú: ${thanSat.sao.name}</span>
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
				<div><b style="color:#fff;">👍 Nên làm:</b> ${thanSat.sao.info.nenLam}</div>
				<div style="margin:5px 0;"><b style="color:#fff;">👎 Kiêng cữ:</b> <span style="color:#ff9933;">${thanSat.sao.info.kiengCu}</span></div>
				<div><b style="color:#fff;">✨ Ngoại lệ:</b> ${thanSat.sao.info.ngoaiLe}</div>
				<div style="font-family:'Times New Roman',serif; font-style:italic; color:#ffff99; margin-top:2px; padding-top:2px; border-bottom:1px solid rgba(255,255,255,0.2); text-align:center; white-space:pre-wrap;">${thoText}
				</div>
			</td></tr>`;
    res += `<tr class="toggle-content"><td class="viecnenlam" colspan="5"><b style="color:#fff;">🌌- Ngũ hành nạp âm:</b> ${thanSat.napAm}</td></tr>`;
    res += `<tr class="toggle-content"><td class="cat_tinh" colspan="5"><b style="color:#fff;">🍀- Cát tinh:</b> ${thanSat.thanSat.cat || "Không có"}</td></tr>`;
    res += `<tr class="toggle-content"><td class="hung_tinh" colspan="5"><b style="color:#fff;">⚡- Hung tinh:</b> <span style="color:#ff9933;">${thanSat.thanSat.hung || "Không có"}</span></td></tr>`;
    res += `<tr class="toggle-content"><td class="viecnenlam" colspan="5"><b style="color:#fff;">✅- Việc nên làm:</b> ${viec.nen}</td></tr>`;
    res += `<tr class="toggle-content"><td class="viecnentranh" colspan="5"><b style="color:#fff;">🚫- Tránh:</b> <span style="color:#ff9933;">${viec.kieng}</span></td></tr>`;
    
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