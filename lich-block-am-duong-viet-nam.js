//
//
// Lấy code âm dương từ HO NGOC DUC và phát triển thẻ dành cho Home Assistant của Nguyễn Tiến Khải - khaisilk1910
// Lunar Calendar Custom Card for Home Assistant
// HA custom card (type: custom:lich-block-am-duong-viet-nam)

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
  "Giác": { tot: "Cưới hỏi, Khởi công, Xuất hành", xau: "An táng" },
  "Cang": { tot: "Cắt may, Khởi công nhỏ", xau: "Cưới hỏi" },
  "Đê":   { tot: "Cầu phúc, Gieo trồng", xau: "Khai trương" },
  "Phòng":{ tot: "Khai trương, Xuất hành, Cầu tài", xau: "An táng" },
  "Tâm":  { tot: "Trị bệnh, Phá dỡ", xau: "Cưới hỏi, Khai trương" },
  "Vĩ":   { tot: "Cúng tế, Cầu phúc", xau: "Cưới hỏi, An táng" },
  "Cơ":   { tot: "Xây dựng, Chữa bệnh", xau: "Khai trương" },
  "Đẩu":  { tot: "Xuất hành, Khởi công nhỏ", xau: "Cưới hỏi" },
  "Ngưu": { tot: "An táng, Tu sửa mộ phần", xau: "Cưới hỏi, Khai trương" },
  "Nữ":   { tot: "Cắt may, Chữa bệnh", xau: "Cưới hỏi, An táng" },
  "Hư":   { tot: "Phá dỡ, Trị bệnh", xau: "Cưới hỏi, Khai trương" },
  "Nguy": { tot: "Xây dựng, Trồng trọt", xau: "Cưới hỏi" },
  "Thất": { tot: "Khai trương, Xuất hành", xau: "An táng" },
  "Bích": { tot: "Cúng tế, Cầu phúc", xau: "Khai trương" },
  "Khuê": { tot: "Khai trương, Học hành", xau: "An táng" },
  "Lâu":  { tot: "Cưới hỏi, Khai trương", xau: "Chôn cất" },
  "Vị":   { tot: "Xây dựng, Động thổ", xau: "An táng" },
  "Mão":  { tot: "Cắt may, Học hành", xau: "An táng, Cưới hỏi" },
  "Tất":  { tot: "Khai trương, Xuất hành", xau: "An táng" },
  "Chủy": { tot: "Cầu tài, Học hành", xau: "An táng" },
  "Sâm":  { tot: "Cưới hỏi, Xây dựng", xau: "An táng" },
  "Tỉnh": { tot: "Khai trương, Xuất hành", xau: "An táng" },
  "Quỷ":  { tot: "Cúng tế, Trị bệnh", xau: "Cưới hỏi" },
  "Liễu": { tot: "Xây dựng, Cưới hỏi", xau: "An táng" },
  "Tinh": { tot: "Khai trương, Học hành", xau: "An táng" },
  "Trương":{ tot: "Cưới hỏi, Khai trương", xau: "An táng" },
  "Dực":  { tot: "Xuất hành, Khởi công", xau: "An táng" },
  "Chẩn": { tot: "Cúng tế, Gieo trồng", xau: "Khai trương" }
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

//  function getGioHoangDao(jd){
//    const chiOfDay = (jd + 1) % 12;
//    const gioHD = GIO_HD[chiOfDay % 6];
//    let ret = ""; let count = 0;
//    for (let i=0;i<12;i++){
//      if (gioHD.charAt(i) === '1'){
//        ret += CHI[i] + ' <b style="color:#ffff99;">(' + ((i*2+23)%24) + '-' + ((i*2+1)%24) + ')</b>';
//        if (count++ < 5) ret += ", ";
//      }
//    }
//    return ret;
//  }
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

	function getViecTotXau(lunarDate) {
		const cc = getCanChi(lunarDate);
		const ngay = cc[0]; // VD: "Đinh Mão"
		const nen = VIEC_NEN_LAM[ngay] || "Không rõ";
		const kieng = VIEC_KIENGLAM[ngay] || "Không rõ";
		return { nen, kieng };
	}
  
  
  function getThanSat(lunarDate) {
    // Thập nhị trực
    const trucNames = Object.keys(THAP_NHI_TRUC);
    const trucIndex = (lunarDate.month + (lunarDate.jd % 12)) % 12;
    const trucName = trucNames[trucIndex];
    const trucInfo = THAP_NHI_TRUC[trucName];

    // Nhị thập bát tú
    const saoNames = Object.keys(NHI_THAP_BAT_TU);
    const saoIndex = lunarDate.jd % 28;
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

//    return {
//      truc: { name: trucName, info: trucInfo },
//      sao: { name: saoName, info: saoInfo },
//      napAm: napAm,
//      thanSat: { cat: catList, hung: hungList }
//    };
  }


  // ===== UI helpers (render month table) =====
  const DAYNAMES = ["T2","T3","T4","T5","T6","T7","CN"];
  const PRINT_OPTS = { fontSize: "13pt", tableWidth: "100%" };

  function printStyle(today, currentLunarDate){
    const formatthutrongtuan = TUAN[(currentLunarDate.jd + 1) % 7];
    let res = "";
    res += '<style>\n';
    res += '.tennam{ text-align:center; font-size:150%; line-height:120%; font-weight:bold; color:#000; background-color:#CCC }\n';
    res += '.thongtin_letet{ text-align:center; margin-left:auto; margin-right:auto; text-shadow:-1px 0 yellow,0 1px yellow,1px 0 yellow,0 -1px yellow; font-size:clamp(70%,80%,90%); font-weight:bold; color:#f00 }\n';
    res += '.thangnam{ text-align:center; font-size:clamp(80%,90%,100%); line-height:120%; font-weight:bold; color:#000; background-color:rgba(204,255,204,.5); border-top-left-radius: 16px; border-top-right-radius: 16px;}\n';
    res += '.thangnam_amlich{ text-align:right; font-size:clamp(60%,80%,90%); font-weight:bold; color:#000 }\n';
    res += '.ThangNgayGioTiet{ text-align:right; font-size:clamp(50%,60%,70%); font-weight:bold; color:#000 }\n';
    res += '.ThangNgayGioTiet1{ text-align:right; font-size:clamp(60%,80%,90%); text-shadow:-1px 0 yellow,0 1px yellow,1px 0 yellow,0 -1px yellow; color:#00f; font-weight:bold }\n';
    res += '.todayduonglich{ text-align:center; font-size:clamp(420%,460%,480%); line-height:100%; font-weight:bold; color:' + (formatthutrongtuan==='Chủ Nhật'?'#f00':(formatthutrongtuan==='Thứ Bảy'?'#008000':'#ff0')) + '; text-shadow:-3px 0 blue,0 3px blue,3px 0 blue,0 -3px blue }\n';
    res += '.thutrongtuan{ text-align:center; font-size:clamp(90%,100%,120%); line-height:160%; font-weight:bold; color:' + (formatthutrongtuan==='Chủ Nhật'?'#f00':(formatthutrongtuan==='Thứ Bảy'?'#008000':'#000')) + '}\n';
    res += '.ngayamlich{ text-align:center; font-size:clamp(220%,240%,260%); font-weight:bold; color:#00f; text-shadow:-2px 0 yellow,0 2px yellow,2px 0 yellow,0 -2px yellow; height: 30px; padding-top: 16px; }\n';
    
    res += '.giohoangdao{ color:#fff; text-align:center; font-size:clamp(60%,65%,70%); font-weight:bold; line-height:140%; background-color:rgba(0,0,255,.5)}\n';
    res += '.viecnenlam{ color:#00ffff; text-align:left; font-size:clamp(60%,65%,70%); font-weight:bold; line-height:150%; background-color:rgba(0,0,255,.5)}\n';
    res += '.viecnentranh{ color:#ff0000; text-align:left; font-size:clamp(60%,65%,70%); font-weight:bold; line-height:150%; background-color:rgba(0,0,255,.5)}\n';
    res += '.cat_tinh{ color:#00ff00; text-align:left; font-size:clamp(60%,65%,70%); font-weight:bold; line-height:150%; background-color:rgba(0,0,255,.5)}\n';
    res += '.hung_tinh{ color:#ff0000; text-align:left; font-size:clamp(60%,65%,70%); font-weight:bold; line-height:150%; background-color:rgba(0,0,255,.5)}\n';
    res += '.toggle-btn { display:block; width:100%; background-color: rgba(0,0,255,0.2); color:#fff; border:none; padding:6px 0; border-radius:6px; cursor:pointer; font-weight:bold; font-size:clamp(60%,65%,70%); transition:all 0.3s ease; margin:4px 0; }\n';
    res += `.toggle-content { 
      display:none; 
      opacity:0; 
      transform: translateY(-10px); 
      transition: opacity 0.4s ease, transform 0.4s ease; 
    }\n`;
    res += `.toggle-content.show { 
      display:table-row; 
      opacity:1; 
      transform: translateY(0); 
    }\n`;
    res += '.thang{ font-size:'+PRINT_OPTS.fontSize+'; padding:1; line-height:100%; font-family:Tahoma,Verdana,Arial; table-layout:fixed; background-color:transparent; }\n';
    res += '.tenthang{ text-align:center; font-size:125%; line-height:100%; font-weight:bold; color:#330033; background-color:#CCFFCC }\n';
    res += '.navi-l,.navi-r{ text-align:center; font-size:75%; line-height:100%; font-weight:bold; background-color:#CCFFCC }\n';
    res += '.navi-l{ color:red } .navi-r{ color:#330033 }\n';
    res += '.ngaytuan{ width:14%; text-align:center; font-size:125%; color:#330033; background-color:#FFFFCC }\n';
    res += '.ngaytuan_t7{ width:14%; text-align:center; font-size:125%; color:green; background-color:#FFFFCC }\n';
    res += '.ngaytuan_cn{ width:14%; text-align:center; font-size:125%; color:#f00; background-color:#FFFFCC }\n';
    res += '.ngaythang{ background-color:#FDFDF0 }\n';
    res += '.homnay{ font-weight:bold; background-color:#FFF000 }\n';
    res += '.tet{ background-color:#FFCC99 }\n';
    res += '.am{ text-align:right; padding-right:3px; font-size:65%; color:blue }\n';
    res += '.am2{ text-align:right; padding-right:3px; font-size:65%; color:#004080 }\n';
    res += '.t2t6{ text-align:left; font-size:125%; color:black }\n';
    res += '.t7{ text-align:left; font-size:125%; color:green }\n';
    res += '.cn{ text-align:left; font-size:125%; color:red }\n';
    res += '.nav-btn { background-color: rgba(128, 128, 128,0.3); border: none; padding: 2px 6px; border-radius: 6px; cursor: pointer; font-weight: bold; }\n';
    res += '.nav-btn:hover { background-color: rgba(128, 128, 128,0.6); }\n';
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
    let solarColor = "black";

    const dow = (lunarDate.jd + 1) % 7;
    if (dow === 0){ solarClass = "cn"; solarColor = "red"; }
    else if (dow === 6){ solarClass = "t7"; solarColor = "green"; }

    if (solarDate === today.getDate() && solarMonth === (today.getMonth()+1) && solarYear === today.getFullYear()){
      cellClass = "homnay";
    }
    if (lunarDate.day === 1 && lunarDate.month === 1){ cellClass = "tet"; }
    if (lunarDate.leap === 1){ lunarClass = "am2"; }

    let lunar = lunarDate.day;
    if (solarDate === 1 || lunar === 1){ lunar = `${lunarDate.day}/${lunarDate.month}`; }

    let title = getDayName(lunarDate);
    return `<td class="${cellClass}" title="${title}">`+
      `<div style="font-size:125%; text-align:center; color:${solarColor}" class="${solarClass}">${solarDate}</div>`+
      `<div style="font-size:50%;" class="${lunarClass}">${lunar}</div>`+
      `</td>`;
  }


  function printTable(mm, yy, today){
    // Build header banner area (big today / can-chi / etc.)
    const jd = jdn(today.getDate(), mm, yy);
    const currentMonthArr = getMonth(mm, yy);
    if (currentMonthArr.length === 0) return "";
    const ld1 = currentMonthArr[0];
    const emptyCells = (ld1.jd + 0) % 7;

    const LunarHead = getYearCanChi(ld1.year);
    const currentLunarDate = getLunarDate(today.getDate(), mm, yy);

	// map thứ trong tuần (0=CN,1=T2,…,6=T7)
	const dow = (currentLunarDate.jd + 1) % 7;
	const bgImages = [
		"amlich_khai_t2.png",
		"amlich_khai_t3.png",
		"amlich_khai_t4.png",
		"amlich_khai_t5.png",
		"amlich_khai_t6.png",
		"amlich_khai_t7.png",
		"amlich_khai_cn.png"
	];
	const bg = bgImages[dow];
	// Đường dẫn ảnh tính từ file JS (cùng thư mục)
	const bgUrl = new URL(`./images/${bg}`, import.meta.url).href;

    let res = "";
		res += `<div style="background:url('${bgUrl}') no-repeat center center; background-size:cover; border-top-left-radius: 16px; border-top-right-radius: 16px;">`;
    res += `<table class="thang" border="0" cellpadding="1" cellspacing="2" width="${PRINT_OPTS.tableWidth}">`;
    res += `<tr><td colspan="7" class="thangnam">Tháng ${mm} năm ${yy}</td></tr>`;

    res += '<tr><td colspan="7">';
    res += '<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0">';
    res += `<tr><td class="todayduonglich" colspan="5">${today.getDate()}</td></tr>`;
    res += `<tr><td class="thutrongtuan" colspan="5"><div style="margin:0 auto; width:20%; border-radius:6px; background-color:rgba(204,255,204,.5);">${TUAN[(currentLunarDate.jd + 1) % 7]}</div></td></tr>`;
    res += '<tr>';
    res += '<td width="34%" colspan="2">';
    // Month lunar (text)
    const showthangarray = ["Tháng Giêng","Tháng Hai","Tháng Ba","Tháng Tư","Tháng Năm","Tháng Sáu","Tháng Bảy","Tháng Tám","Tháng Chín","Tháng Mười","Tháng Mười Một","Tháng Chạp"];
    let thangAm = showthangarray[currentLunarDate.month-1] || ("Tháng " + currentLunarDate.month);
    if (currentLunarDate.leap===1) thangAm += " (Nhuận)";
		// tính số ngày trong tháng âm lịch
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
		if (daysInLunarMonth === 29) {
			thangAm += " (T)";
		} else if (daysInLunarMonth === 30) {
			thangAm += " (Đ)";
		}
    res += `<div class="ThangNgayGioTiet1" style="text-align:center;">${thangAm}</div>`;
    res += `<div class="ngayamlich">${currentLunarDate.day}</div>`;
    res += `<div class="ThangNgayGioTiet1" style="text-align:center; line-height:160%;">${getYearCanChi(currentLunarDate.year)} (${currentLunarDate.year})</div>`;
    res += '</td>';
    res += '<td class="thongtin_letet">';
    if (currentLunarDate.day === 1) res += '<div style="padding-bottom:8px;">Mùng Một</div>';
    else if (currentLunarDate.day === 15) res += '<div style="padding-bottom:8px;">Ngày Rằm</div>';
    // Holidays
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
    
    // Nút bấm
    res += `<tr><td colspan="5">
      <button class="toggle-btn" onclick="
        const rows = [...this.closest('table').querySelectorAll('.toggle-content')];
        const isHidden = rows.every(r => !r.classList.contains('show'));
        rows.forEach((r, i) => {
          setTimeout(() => {
            if(isHidden){
              r.classList.add('show');
            } else {
              r.classList.remove('show');
            }
          }, i * 100); // delay cascade
        });
        this.innerHTML = isHidden ? 'Thu gọn 🔼' : 'Xem thêm 🔽';
      ">Xem thêm 🔽</button>
    </td></tr>`;

    // Khối nội dung ẩn
    const viec = getViecTotXau(currentLunarDate);
    res += `<tr class="toggle-content"><td class="viecnenlam" colspan="5"><b style="color:#fff;">✅- Việc nên làm:</b> ${viec.nen}</td></tr>`;
    const thanSat = getThanSat(currentLunarDate);
    res += `<tr class="toggle-content"><td class="viecnenlam" colspan="5"><b style="color:#fff;">${thanSat.truc.emoji}- Trực:</b> ${thanSat.truc.name} | Tốt: ${thanSat.truc.info.tot} | <span style="color:red;">Xấu: ${thanSat.truc.info.xau}</span></td></tr>`;
    res += `<tr class="toggle-content"><td class="viecnenlam" colspan="5"><b style="color:#fff;">${thanSat.sao.emoji}- Nhị thập bát tú:</b> ${thanSat.sao.name} | Tốt: ${thanSat.sao.info.tot} | <span style="color:red;">Xấu: ${thanSat.sao.info.xau}</span></td></tr>`;
    res += `<tr class="toggle-content"><td class="viecnenlam" colspan="5"><b style="color:#fff;">🌌- Ngũ hành nạp âm:</b> ${thanSat.napAm}</td></tr>`;
    res += `<tr class="toggle-content"><td class="cat_tinh" colspan="5"><b style="color:#fff;">🍀- Cát tinh:</b> ${thanSat.thanSat.cat || "Không có"}</td></tr>`;
    res += `<tr class="toggle-content"><td class="hung_tinh" colspan="5"><b style="color:#fff;">⚡- Hung tinh:</b> ${thanSat.thanSat.hung || "Không có"}</td></tr>`;
    res += `<tr class="toggle-content"><td class="viecnentranh" colspan="5"><b style="color:#fff;">🚫- Tránh:</b> ${viec.kieng}</td></tr>`;
    
    
    res += '</table>';
    res += '</td></tr>';
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
    res += '</table>';
		res += '</div>';
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
    static getStubConfig() { return {}; }

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
      this._render();
    }

    set hass(hass){
      this._hass = hass;
      // Optionally re-render on state changes if needed
    }

    _render(){
      const today = new Date();
			const mm = this.displayMonth;
			const yy = this.displayYear;

      const currentLunarDate = getLunarDate(today.getDate(), today.getMonth()+1, today.getFullYear());

      const html = [
        printStyle(today, currentLunarDate),
        printTable(mm, yy, today)
      ].join('');

      //this.card.setAttribute('header', this.config.title || 'Lịch Âm Dương');
      this.card.innerHTML = `<div class="lunar-card">${html}</div>`;

			// gắn sự kiện cho nút điều hướng
			const prevBtn = this.card.querySelector('#prev-month');
			const nextBtn = this.card.querySelector('#next-month');

			if (prevBtn){
				prevBtn.addEventListener('click', () => {
					this.displayMonth--;
					if (this.displayMonth < 1){
						this.displayMonth = 12;
						this.displayYear--;
					}
					this._render();
				});
			}

			if (nextBtn){
				nextBtn.addEventListener('click', () => {
					this.displayMonth++;
					if (this.displayMonth > 12){
						this.displayMonth = 1;
						this.displayYear++;
					}
					this._render();
				});
			}

			const prevYearBtn = this.card.querySelector('#prev-year');
			const nextYearBtn = this.card.querySelector('#next-year');

			if (prevYearBtn){
				prevYearBtn.addEventListener('click', () => {
					this.displayYear--;
					this._render();
				});
			}

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
