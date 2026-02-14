// Lịch Âm Dương Việt Nam - Enhanced Version (Custom Multi Color Edition)
// Phát triển dựa trên code của Nguyễn Tiến Khải
// Version: 2.4 - February 2026 - Custom Multi Color Edition
// New: Tùy chỉnh nhiều nhóm màu riêng + Sunday override

(function () {
  'use strict';

  // ===== LUNAR CALENDAR DATA =====
  const PI = Math.PI;
  function INT(d) { return Math.floor(d); }

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

  const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  const TUAN_VI = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const TUAN_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const GIO_HD = ["110100101100", "001101001011", "110011010010", "101100110100", "001011001101", "010010110011"];
  const THANG_AM = ["", "Giêng", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Một", "Chạp"];

  const DEFAULT_QUOTES = [
    { text: "Người nóng nảy, nóng nổi, hẹp hòi thì xử việc, việc hay hỏng, tiếp người, người hay giận, mà chính mình cũng phải thiệt trời.", author: "Lã Khân" },
    { text: "Học, học nữa, học mãi.", author: "V.I. Lenin" },
    { text: "Không có gì quý hơn độc lập tự do.", author: "Hồ Chí Minh" },
    { text: "Thất bại là mẹ thành công.", author: "Tục ngữ Việt Nam" },
    { text: "Học thầy không tày học bạn.", author: "Tục ngữ Việt Nam" },
    { text: "Ăn quả nhớ kẻ trồng cây.", author: "Tục ngữ Việt Nam" },
    { text: "Có công mài sắt có ngày nên kim.", author: "Tục ngữ Việt Nam" },
    { text: "Uống nước nhớ nguồn.", author: "Tục ngữ Việt Nam" }
  ];

  const NGAY_LE_DL = [
    "1/1", "9/1", "3/2", "14/2", "27/2", "8/3", "20/3", "22/3", "26/3", "31/3", "1/4", "30/4", "1/5", "7/5", "12/5", "19/5", "1/6", "18/6", "21/6", "28/6", "11/7", "27/7", "28/7", "19/8", "2/9", "10/9", "1/10", "10/10", "13/10", "16/10", "17/10", "20/10", "31/10", "9/11", "19/11", "20/11", "23/11", "28/11", "29/11", "1/12", "19/12", "25/12", "22/12"
  ];

  const NGAY_LE_DL_STRING = [
    "Tết Dương lịch", "Ngày học sinh sinh viên VN", "Thành lập Đảng CSVN", "Lễ tình nhân", "Ngày thầy thuốc VN", "Quốc tế Phụ nữ", "Quốc tế Hạnh phúc", "Ngày nước sạch TG", "Thành lập Đoàn TNCS HCM", "Lễ Phục Sinh", "Cá tháng Tư", "Giải phóng Miền Nam", "Quốc tế Lao động", "Chiến thắng Điện Biên Phủ", "Ngày của Mẹ", "Ngày sinh Chủ tịch HCM", "Quốc tế Thiếu Nhi", "Ngày của Cha", "Báo chí Việt Nam", "Gia đình Việt Nam", "Dân số thế giới", "Thương binh liệt sĩ", "Thành lập công đoàn VN", "Cách mạng Tháng 8", "Quốc Khánh", "Thành lập Mặt trận Tổ quốc", "Quốc tế người cao tuổi", "Giải phóng Thủ Đô", "Doanh nhân Việt Nam", "Lương thực thế giới", "Quốc tế xóa nghèo", "Phụ nữ Việt Nam", "Halloween", "Pháp luật Việt Nam", "Quốc tế Nam giới", "Nhà giáo Việt Nam", "Thành lập Hội chữ thập đỏ", "Lễ Tạ Ơn", "Black Friday", "Thế giới phòng chống AIDS", "Toàn quốc kháng chiến", "Lễ Giáng Sinh", "Thành lập Quân đội nhân dân VN"
  ];

  const NGAY_LE_AL = ["1/1", "15/1", "3/3", "10/3", "15/4", "5/5", "7/7", "15/7", "15/8", "9/9", "10/10", "15/10", "23/12"];
  const NGAY_LE_AL_STRING = ["Tết Nguyên Đán", "Tết Nguyên Tiêu", "Tết Hàn Thực, Thanh Minh", "Giỗ tổ Hùng Vương", "Lễ Phật Đản", "Tết Đoan Ngọ", "Lễ Thất Tịch", "Lễ Vu Lan", "Tết Trung Thu", "Tết Trùng Cửu", "Tết Trùng Thập", "Tết Hạ Nguyên", "Ông Táo Về Trời"];

  const TIET_KHI = [
    "Xuân Phân", "Thanh Minh", "Cốc Vũ", "Lập Hạ", "Tiểu Mãn", "Mang Chủng",
    "Hạ Chí", "Tiểu Thử", "Đại Thử", "Lập Thu", "Xử Thử", "Bạch Lộ",
    "Thu Phân", "Hàn Lộ", "Sương Giáng", "Lập Đông", "Tiểu Tuyết", "Đại Tuyết",
    "Đông Chí", "Tiểu Hàn", "Đại Hàn", "Lập Xuân", "Vũ Thủy", "Kinh Trập"
  ];

  const CHI_EMOJI = ["🐭", "🐂", "🐯", "🐱", "🐲", "🐍", "🐴", "🐐", "🐵", "🐔", "🐶", "🐷"];

  const THAP_NHI_TRUC = {
    "Kiến": { tot: "Khai trương, nhậm chức, cưới hỏi, trồng cây, đền ơn đáp nghĩa. Xuất hành đặng lợi, sinh con rất tốt.", xau: "Động thổ, chôn cất, đào giếng, lợp nhà." },
    "Trừ": { tot: "Động đất, ban nền đắp nền, thờ cúng Táo Thần, cầu thầy chữa bệnh bằng cách mổ xẻ hay châm cứu, bốc thuốc, xả tang, khởi công làm lò nhuộm lò gốm.", xau: "Đẻ con nhằm ngày này khó nuôi. Nam nhân kỵ khởi đầu uống thuốc." },
    "Mãn": { tot: "Xuất hành, đi đường thủy, cho vay, thu nợ, mua hàng, bán hàng, nhập kho, đặt táng, kê gác, sửa chữa, lắp đặt máy, thuê thêm người, vào học kỹ nghệ.", xau: "Lên quan lãnh chức, uống thuốc, vào làm hành chính, dâng nộp đơn từ." },
    "Bình": { tot: "Nhập vào kho, đặt táng, gắn cửa, kê gác, đặt yên chỗ máy, sửa chữa làm tàu, khai trương tàu thuyền, các việc bồi đắp thêm. Lót giường đóng giường, thừa kế tước phong hay thừa kế sự nghiệp.", xau: "Không có" },
    "Định": { tot: "Động thổ, san nền, đắp nền, làm hay sửa phòng bếp, lắp đặt máy móc, nhập học, làm lễ cầu thân, nộp đơn dâng sớ, sửa hay làm tàu thuyền, khai trương tàu thuyền, khởi công làm lò. Mua nuôi thêm súc vật.", xau: "Thưa kiện, xuất hành đi xa." },
    "Chấp": { tot: "Lập khế ước, giao dịch, động thổ san nền, cầu thầy chữa bệnh, đi săn thú cá, tìm bắt trộm cướp. Xây đắp nền-tường.", xau: "Dời nhà, đi chơi xa, mở cửa hiệu buôn bán, xuất tiền của." },
    "Phá": { tot: "Trị bệnh, phá dỡ, dọn dẹp.", xau: "Là ngày Nhật Nguyệt tương xung. Muôn việc làm vào ngày này đều bất lợi." },
    "Nguy": { tot: "Không nên làm gì.", xau: "Nói đến Trực Nguy là nói đến sự nguy hiểm, suy thoái. Ngày có trực Nguy là ngày xấu, tiến hành muôn việc đều hung." },
    "Thành": { tot: "Lập khế ước, giao dịch, cho vay, thu nợ, mua hàng, bán hàng, xuất hành, đi tàu thuyền, khởi tạo, động thổ, san nền đắp nền, gắn cửa, đặt táng, kê gác, dựng xây kho vựa, làm hay sửa chữa phòng bếp, thờ phụng Táo Thần, lắp đặt máy móc, gặt lúa, đào ao giếng, tháo nước, cầu thầy chữa bệnh, mua gia súc, các việc trong vụ chăn nuôi, nhập học, làm lễ cầu thân, cưới gả, kết hôn, thuê người, nộp đơn dâng sớ, học kỹ nghệ, làm hoặc sửa tàu thuyền, khai trương tàu thuyền, vẽ tranh, tu sửa cây cối.", xau: "Kiện tụng, tranh chấp." },
    "Thu": { tot: "Cấy lúa, gặt lúa, mua trâu, nuôi tằm, đi săn thú cá, tu sửa cây cối. Động thổ, san nền đắp nền, nữ nhân khởi ngày uống thuốc chưa bệnh, lên quan lãnh chức, thừa kế chức tước hay sự nghiệp, vào làm hành chính, nộp đơn dâng sớ.", xau: "Bắt đầu công việc mới, kỵ đi du lịch, kỵ tang lễ." },
    "Khai": { tot: "Xuất hành, đi tàu thuyền, khởi tạo, động thổ, san nền đắp nền, dựng xây kho vựa, làm hay sửa phòng bếp, thờ cúng Táo Thần, đóng giường lót giường, may áo, lắp đặt cỗ máy dệt hay các loại máy, cấy lúa gặt lúa, đào ao giếng, tháo nước, các việc trong vụ chăn nuôi, mở thông hào rãnh, cầu thầy chữa bệnh, bốc thuốc, uống thuốc, mua trâu, làm rượu, nhập học, học kỹ nghệ, vẽ tranh, tu sửa cây cối.", xau: "An táng, chôn cất." },
    "Bế": { tot: "Xây đắp tường, đặt táng, gắn cửa, kê gác, làm cầu. Khởi công lò nhuộm lò gốm, uống thuốc, trị bệnh (nhưng chớ trị bệnh mắt), tu sửa cây cối.", xau: "Lên quan nhậm chức, thừa kế chức tước hay sự nghiệp, nhập học, chữa bệnh mắt." }
  };

  const EMOJI_TRUC = {
    "Kiến": "🚪", "Trừ": "✂️", "Mãn": "🌕", "Bình": "⚖️",
    "Định": "📜", "Chấp": "✍️", "Phá": "💥", "Nguy": "⚠️",
    "Thành": "🏰", "Thu": "🌾", "Khai": "🔑", "Bế": "🔒"
  };

  const EMOJI_SAO = {
    "Giác": "🐉", "Cang": "🦄", "Đê": "🏞️", "Phòng": "🏠", "Tâm": "❤️", "Vĩ": "🦚", "Cơ": "🧵", "Đẩu": "🛶",
    "Ngưu": "🐂", "Nữ": "👩", "Hư": "🌫️", "Nguy": "⚠️", "Thất": "7️⃣", "Bích": "💎", "Khuê": "📚", "Lâu": "🏯",
    "Vị": "🍽️", "Mão": "🐇", "Tất": "🧦", "Chủy": "👄", "Sâm": "🌱", "Tỉnh": "💧", "Quỷ": "👹", "Liễu": "🌿",
    "Tinh": "⭐", "Trương": "📜", "Dực": "🪽", "Chẩn": "🩺"
  };

  const NHI_THAP_BAT_TU = {
    "Giác": { tenNgay: "Giác Mộc Giao", danhGia: "Tốt (Bình Tú)", tuongTinh: "Tướng tinh con Giao Long", nenLam: "Mọi việc tạo tác đều đặng được vinh xương và tấn lợi. Việc hôn nhân hay cưới gả sinh con quý tử. Công danh thăng tiến, khoa cử đỗ đạt cao.", kiengCu: "Chôn cất hoạn nạn phải ba năm. Dù xây đắp mộ phần hay sửa chữa mộ phần ắt có người chết.", ngoaiLe: "Sao Giác trúng vào ngày Dần là Đăng Viên mang ý nghĩa được ngôi vị cao cả, hay mọi sự đều tốt đẹp. Sao Giác trúng vào ngày Ngọ là Phục Đoạn Sát: rất kỵ trong việc chôn cất, thừa kế, chia lãnh gia tài, xuất hành và cả khởi công lò nhuộm hoặc lò gốm.", tho: "Giác tinh tọa tác chủ vinh xương\nNgoại tiến điền tài cập nữ lang\nGiá thú hôn nhân sinh quý tử\nVăn nhân cập đệ kiến Quân vương" },
    "Cang": { tenNgay: "Cang Kim Long", danhGia: "Xấu (Hung Tú)", tuongTinh: "Tướng tinh con Rồng", nenLam: "Công việc liên quan đến cắt may áo màn sẽ đặng nhiều lộc ăn.", kiengCu: "Chôn cất bị Trùng tang. Nếu cưới gả e rằng phòng không giá lạnh. Nếu tranh đấu kiện tụng thì lâm bại. Nếu khởi dựng nhà cửa chết con đầu.", ngoaiLe: "Sao Cang nhằm vào ngày Rằm là Diệt Một Nhật: Cữ làm rượu, thừa kế sự nghiệp, lập lò gốm, lò nhuộm hay vào làm hành chính, thứ nhất đi thuyền chẳng khỏi nguy hại.", tho: "Can tinh tạo tác Trưởng phòng đường\nThập nhật chi trung chủ hữu ương\nĐiền địa tiêu ma, quan thất chức" },
    "Đê": { tenNgay: "Đê Thổ Lạc", danhGia: "Xấu (Hung Tú)", tuongTinh: "Tướng tinh con Lạc Đà", nenLam: "Sao Đê đại hung, không hợp để làm bất kỳ công việc trọng đại nào.", kiengCu: "Không nên khởi công xây dựng, chôn cất, cưới gả và xuất hành. KỴ NHẤT là đường thủy. Ngày này sinh con chẳng phải điềm lành nên làm âm đức cho con.", ngoaiLe: "Đê Thổ Lạc tại: Thân, Tý và Thìn trăm việc đều tốt. Trong đó, Thìn là tốt hơn hết bởi Sao Đê Đăng Viên tại Thìn.", tho: "Đê tinh tạo tác chủ tai hung\nPhí tận điền viên, thương khố không\nMai táng bất khả dụng thử nhật" },
    "Phòng": { tenNgay: "Phòng Nhật Thố", danhGia: "Tốt (Kiết Tú)", tuongTinh: "Tướng tinh con Thỏ", nenLam: "Mọi việc khởi công tạo tác đều tốt. Ngày này hợp nhất cho việc cưới gả, xuất hành, xây dựng nhà, chôn cất, đi thuyền, mưu sự, chặt cỏ phá đất và cả cắt áo.", kiengCu: "Sao Phòng là Đại Kiết Tinh nên không kỵ bất kỳ việc gì.", ngoaiLe: "Sao Phòng tại Đinh Sửu hay Tân Sửu đều tốt. Tại Dậu thì càng tốt hơn, vì Sao Phòng Đăng Viên tại Dậu.", tho: "Phòng tinh tạo tác điền viên tiến\nHuyết tài ngưu mã biến sơn cương\nCánh chiêu ngoại xứ điền trang trạch" },
    "Tâm": { tenNgay: "Tâm Nguyệt Hồ", danhGia: "Xấu (Hung Tú)", tuongTinh: "Tướng tinh con Chồn", nenLam: "Hung tú này tạo tác bất kỳ việc chi cũng không hạp.", kiengCu: "Khởi công tạo tác việc chi cũng không tránh khỏi hại. Nhất là cưới gả, đóng giường, lót giường, xây cất, chôn cất và tranh tụng.", ngoaiLe: "Ngày Dần Sao Tâm Đăng Viên, tốt khi dùng làm các việc nhỏ.", tho: "Tâm tinh tạo tác đại vi hung\nCánh tao hình tụng, ngục tù trung\nNgỗ nghịch quan phi, điền trạch thoái" },
    "Vĩ": { tenNgay: "Vĩ Hỏa Hổ", danhGia: "Tốt (Kiết Tú)", tuongTinh: "Tướng tinh con Cọp", nenLam: "Khởi công tạo tác bất kể việc chi đều tốt. Việc cưới gả, xây cất, chôn cất hay việc dời nhà chuyển chỗ đều tốt.", kiengCu: "Không có.", ngoaiLe: "Sao Vĩ tại Tuất là Đăng Viên rất tốt.", tho: "Vĩ tinh tạo tác chủ thiên ân\nPhú quý vinh hoa, phúc thọ khang\nGiá thú hôn nhân sinh quý tử" },
    "Cơ": { tenNgay: "Cơ Thổ Báo", danhGia: "Xấu (Hung Tú)", tuongTinh: "Tướng tinh con Beo", nenLam: "Tu bổ mộ phần.", kiengCu: "Xuất hành, chôn cất, cưới gả, xây cất đều hung.", ngoaiLe: "Sao Cơ tại Dậu Đăng Viên, tại Tỵ và Sửu tốt.", tho: "Cơ tinh tạo tác hữu hà lợi\nNội gia hoàn nạn khẩu xá tình" },
    "Đẩu": { tenNgay: "Đẩu Mộc Giải", danhGia: "Tốt (Kiết Tú)", tuongTinh: "Tướng tinh con Giải", nenLam: "Nhập học hay phó nhậm tiến công danh. Chôn cất, xây cất cũng tốt.", kiengCu: "Đi thuyền. Cưới gả không hạp.", ngoaiLe: "Ngày Thân là Đăng Viên rất tốt.", tho: "Đẩu tinh tạo tác chủ chiêu tài\nVăn vũ quan viên vị đỉnh đài" },
    "Ngưu": { tenNgay: "Ngưu Kim Ngưu", danhGia: "Xấu (Hung Tú)", tuongTinh: "Tướng tinh con Trâu", nenLam: "Không có.", kiengCu: "Chôn cất hay xây nhà đều hung. Cưới gả hoạn nạn.", ngoaiLe: "Ngày Mùi là Đăng Viên, dùng làm các việc nhỏ.", tho: "Ngưu tinh tạo tác chủ tai nguy\nCửu hoạnh tam tai bất khả thôi" },
    "Nữ": { tenNgay: "Nữ Thổ Dơi", danhGia: "Xấu (Hung Tú)", tuongTinh: "Tướng tinh con Dơi", nenLam: "Chôn cất.", kiengCu: "Cưới gả, xây cất, xuất hành đều hung.", ngoaiLe: "Ngày Ngọ là Đăng Viên nhưng phạm Phục Đoạn.", tho: "Nữ tinh tạo tác tổn gia phong\nChí dạ câu thư, bất kiến công" },
    "Hư": { tenNgay: "Hư Nhật Thử", danhGia: "Xấu (Hung Tú)", tuongTinh: "Tướng tinh con Chuột", nenLam: "Chôn cất.", kiengCu: "Cưới gả, mở cửa hàng, mưu sự đều hung.", ngoaiLe: "Ngày Tỵ là Đăng Viên, việc nhỏ tốt.", tho: "Hư tinh tạo tác chủ tai ương\nNam nữ cô miên bất nhất song" },
    "Nguy": { tenNgay: "Nguy Nguyệt Yến", danhGia: "Xấu (Hung Tú)", tuongTinh: "Tướng tinh con Én", nenLam: "Chôn cất. Cắt áo.", kiengCu: "Xây cất, hôn nhân đại kỵ.", ngoaiLe: "Ngày Thìn Đăng Viên nhưng phạm Phục Đoạn.", tho: "Nguy tinh bất khả tạo cao đường\nTự điếu Phình linh tự phá gia" },
    "Thất": { tenNgay: "Thất Hỏa Trư", danhGia: "Tốt (Bình Tú)", tuongTinh: "Tướng tinh con Lợn", nenLam: "Cưới gả, xây cất, giao dịch đều tốt.", kiengCu: "Chôn cất.", ngoaiLe: "Ngày Mão là Đăng Viên rất tốt.", tho: "Thất tinh tạo tác tiến điền ngưu\nNhi tôn đại đại, cận vương hầu" },
    "Bích": { tenNgay: "Bích Thủy Dũ", danhGia: "Tốt (Kiết Tú)", tuongTinh: "Tướng tinh con Nhím", nenLam: "Xây cất, cưới gả, xuất hành, chôn cất, khai trương đều tốt.", kiengCu: "Không có.", ngoaiLe: "Ngày Dần là Đăng Viên rất tốt.", tho: "Bích tinh tạo tác chủ tăng tài\nTự viên điền địa, quảng triêu khai" },
    "Khuê": { tenNgay: "Khuê Mộc Lang", danhGia: "Xấu (Hung Tú)", tuongTinh: "Tướng tinh con Sói", nenLam: "Chôn cất.", kiengCu: "Cưới gả, xuất hành, xây cất đại kỵ.", ngoaiLe: "Ngày Sửu Đăng Viên, việc nhỏ tốt.", tho: "Khuê tinh tạo tác đắc trinh tường\nGiá thú hôn nhân bất khả đương" },
    "Lâu": { tenNgay: "Lâu Kim Cẩu", danhGia: "Tốt (Kiết Tú)", tuongTinh: "Tướng tinh con Chó", nenLam: "Hôn nhân, xuất hành, xây cất, chôn cất đều tốt.", kiengCu: "Không có.", ngoaiLe: "Ngày Tý là Đăng Viên rất tốt.", tho: "Lâu tinh tạo tác tăng điền độ\nKho mãn tài doanh, tự phú hào" },
    "Vị": { tenNgay: "Vị Thổ Trĩ", danhGia: "Tốt (Kiết Tú)", tuongTinh: "Tướng tinh con Trĩ", nenLam: "Khởi công tạo tác việc gì cũng tốt. Tốt nhất là cưới gả, xây cất, dọn cỏ, gieo trồng, lấy giống.", kiengCu: "Đi thuyền.", ngoaiLe: "Sao Vị mất chí khí tại ngày Dần, nhất là ngày Mậu Dần, rất hung, không nên cưới gả, xây cất nhà cửa. Gặp ngày Tuất sao Vị đăng viên nên mưu cầu công danh tốt.", tho: "Vị tinh tạo tác sự như hà\nPhú quý, vinh hoa, hỷ khí đa" },
    "Mão": { tenNgay: "Mão Nhật Kê", danhGia: "Xấu (Hung Tú)", tuongTinh: "Tướng tinh con Gà", nenLam: "Xây dựng cũng như tạo tác đều tốt.", kiengCu: "Chôn Cất thì ĐẠI KỴ. Cưới gã, khai ngòi phóng thủy, khai trương, xuất hành, đóng giường lót giường, trổ cửa dựng cửa kỵ.", ngoaiLe: "Sao Mão Nhật Kê tại Mùi thì mất chí khí. Tại Ất Mão hay Đinh Mão rất tốt. Ngày Mão Đăng Viên nên cưới gả tốt, ngày Quý Mão nếu tạo tác thì mất tiền của.", tho: "Mão tinh tạo tác tiến điền ngưu\nMai táng quan tai bất đắc hưu" },
    "Tất": { tenNgay: "Tất Nguyệt Ô", danhGia: "Tốt (Kiết Tú)", tuongTinh: "Tướng tinh con Quạ", nenLam: "Khởi công tạo tác bất kể việc chi đều tốt. Tốt nhất là việc trổ cửa dựng cửa, đào kinh, tháo nước, khai mương, chôn cất, cưới gả, chặt cỏ phá đất hay móc giếng.", kiengCu: "Việc đi thuyền.", ngoaiLe: "Sao Tất Nguyệt Ô tại Thìn, Thân và Tý đều tốt. Tại Thân hiệu là Nguyệt Quải Khôn Sơn, tức là trăng treo đầu núi Tây Nam nên rất là tốt.", tho: "Tất tinh tạo tác chủ quang tiền\nMãi dắc điền viên hữu lật tiền" },
    "Chủy": { tenNgay: "Chủy Hỏa Hầu", danhGia: "Xấu (Hung Tú)", tuongTinh: "Tướng tinh con Khỉ", nenLam: "Sao Chủy không nên làm bất kỳ việc chi.", kiengCu: "Khởi công tạo tác việc chi cũng không tốt. KỴ NHẤT là chôn cất và các vụ thuộc về chết chôn như sửa đắp mồ mả, làm sanh phần, đóng thọ đường.", ngoaiLe: "Sao Chủy Hỏa Hầu tại Tỵ bị đoạt khí, còn Hung thì càng thêm Hung. Tại Dậu rất tốt, vì Sao Chủy Đăng Viên ở Dậu đem khởi động và thăng tiến. Tại Sửu là Đắc Địa, mọi việc ắt nên.", tho: "Chủy tinh tạo tác hữu đồ hình\nTam niên tất đinh chủ linh đinh" },
    "Sâm": { tenNgay: "Sâm Thủy Viên", danhGia: "Tốt (Bình Tú)", tuongTinh: "Tướng tinh con Vượn", nenLam: "Nhiều việc khởi công tạo tác tốt như: dựng cửa trổ cửa, xây cất nhà, nhập học, làm thủy lợi, tháo nước đào mương hay đi thuyền.", kiengCu: "Cưới gả, đóng giường lót giường, chôn cất hay kết bạn đều không tốt.", ngoaiLe: "Ngày Tuất Sao Sâm Đăng Viên, nên phó nhậm đặng cầu công danh hiển hách.", tho: "Sâm tinh tạo tác vượng nhân gia\nVăn tinh triều diệu, đại quang hoa" },
    "Tỉnh": { tenNgay: "Tỉnh Mộc Hãn", danhGia: "Tốt (Bính Tú)", tuongTinh: "Tướng tinh con Dê Trừu", nenLam: "Tạo tác nhiều việc rất tốt như trổ cửa dựng cửa, mở thông đường nước, đào mương móc giếng, đi thuyền, xây cất, nhậm chức hoặc nhập học.", kiengCu: "Làm sanh phần, đóng thọ đường, chôn cất hay tu bổ mộ phần.", ngoaiLe: "Sao Tỉnh Mộc Hãn tại Mùi, Hợi, Mão mọi việc tốt. Tại Mùi là Nhập Miếu nên khởi động vinh quang.", tho: "Tỉnh tinh tạo tác vượng tàm điền\nKim bảng đề danh đệ nhất tiên" },
    "Quỷ": { tenNgay: "Quỷ Kim Dương", danhGia: "Xấu (Hung Tú)", tuongTinh: "Tướng tinh con Dê", nenLam: "Việc chôn cất, chặt cỏ phá đất hoặc cắt áo đều tốt.", kiengCu: "Khởi tạo bất kể việc chi cũng hại. Hại nhất là trổ cửa dựng cửa, tháo nước, việc đào ao giếng, xây cất nhà, cưới gả, động đất, xây tường và dựng cột.", ngoaiLe: "Ngày Tý Đăng Viên thừa kế tước phong rất tốt, đồng thời phó nhiệm may mắn.", tho: "Quỷ tinh khởi tạo tất nhân vong\nĐường tiền bất kiến chủ nhân lang" },
    "Liễu": { tenNgay: "Liễu Thổ Chương", danhGia: "Xấu (Hung Tú)", tuongTinh: "Tướng tinh con Gấu Ngựa", nenLam: "Không có việc gì tốt.", kiengCu: "Khởi công tạo tác việc chi cũng rất bất lợi, hung hại. Hung hại nhất là làm thủy lợi như trổ tháo nước, đào ao lũy, chôn cất, việc sửa cửa dựng cửa, xây đắp.", ngoaiLe: "Sao Liễu Thổ Chướng tại Ngọ trăm việc đều tốt. Tại Tỵ thì Đăng Viên: thừa kế hay lên quan lãnh chức đều là hai điều tốt nhất. Tại Dần, Tuất rất suy vi nên kỵ xây cất và chôn cất.", tho: "Liễu tinh tạo tác chủ tao quan\nTrú dạ thâu nhàn bất tạm an" },
    "Tinh": { tenNgay: "Tinh Nhật Mã", danhGia: "Xấu (Bình Tú)", tuongTinh: "Tướng tinh con Ngựa", nenLam: "Xây dựng phòng mới.", kiengCu: "Chôn cất, cưới gả, mở thông đường nước.", ngoaiLe: "Sao Tinh là một trong Thất Sát Tinh, nếu sinh con nhằm ngày này nên lấy tên Sao đặt tên cho trẻ để dễ nuôi. Sao Tinh gặp ngày Dần, Ngọ, Tuất đều tốt. Gặp ngày Thân là Đăng Giá (lên xe): xây cất tốt mà chôn cất nguy.", tho: "Tinh tú nhật hảo tạo tân phòng\nTiến chức gia quan cận Đế vương" },
    "Trương": { tenNgay: "Trương Nguyệt Lộc", danhGia: "Tốt (Kiết Tú)", tuongTinh: "Tướng tinh con Nai", nenLam: "Khởi công tạo tác trăm việc đều tốt. Trong đó, tốt nhất là che mái dựng hiên, xây cất nhà, trổ cửa dựng cửa, cưới gả, chôn cất, hay làm ruộng, nuôi tằm, làm ruỷ lợi, đặt táng kê gác, chặt cỏ phá đất, cắt áo cũng đều rất tốt.", kiengCu: "Sửa hay làm thuyền chèo, hoặc đẩy thuyền mới xuống nước.", ngoaiLe: "Tại Mùi, Hợi, Mão đều tốt. Tại Mùi: đăng viên rất tốt nhưng phạm vào Phục Đoạn.", tho: "Trương tinh nhật hảo tạo long hiên\nNiên niên tiện kiến tiến trang điền" },
    "Dực": { tenNgay: "Dực Hỏa Xà", danhGia: "Xấu (Hung Tú)", tuongTinh: "Tướng tinh con Rắn", nenLam: "Chôn cất.", kiengCu: "Cưới gả, xây cất nhà đại kỵ.", ngoaiLe: "Ngày Hợi là Đăng Viên nhưng vẫn kỵ cưới gả, xây cất.", tho: "Dực tinh bất lợi giá cao đường\nTam tuế hài nhi tự tổn thương" },
    "Chẩn": { tenNgay: "Chẩn Thủy Dẫn", danhGia: "Tốt (Kiết Tú)", tuongTinh: "Tướng tinh con Giun", nenLam: "Xây dựng, gắn cửa, kê gác, chôn cất đều tốt.", kiengCu: "Động thổ, cưới gả không hạp.", ngoaiLe: "Tại Hợi đăng viên tốt nhất.", tho: "Chẩn tinh lâm thủy tạo long cung\nĐại đại vi quan thụ sấm phong" }
  };

  function decodeLunarYear(yy, k) {
    const monthLengths = [29, 30];
    const regularMonths = [];
    const offsetOfTet = k >> 17;
    const leapMonth = k & 0xf;
    const leapMonthLength = monthLengths[k >> 16 & 0x1];
    const solarNY = jdFromDate(1, 1, yy);
    let currentJD = solarNY + offsetOfTet;
    let j = k >> 4;
    
    for (let i = 0; i < 12; i++) {
      regularMonths[12 - i - 1] = monthLengths[j & 0x1];
      j >>= 1;
    }
    
    const ly = [];
    if (leapMonth === 0) {
      for (let mm = 1; mm <= 12; mm++) {
        ly.push({ day: 1, month: mm, year: yy, leap: 0, jd: currentJD, days: regularMonths[mm - 1] });
        currentJD += regularMonths[mm - 1];
      }
    } else {
      for (let mm = 1; mm <= leapMonth; mm++) {
        ly.push({ day: 1, month: mm, year: yy, leap: 0, jd: currentJD, days: regularMonths[mm - 1] });
        currentJD += regularMonths[mm - 1];
      }
      ly.push({ day: 1, month: leapMonth, year: yy, leap: 1, jd: currentJD, days: leapMonthLength });
      currentJD += leapMonthLength;
      for (let mm = leapMonth + 1; mm <= 12; mm++) {
        ly.push({ day: 1, month: mm, year: yy, leap: 0, jd: currentJD, days: regularMonths[mm - 1] });
        currentJD += regularMonths[mm - 1];
      }
    }
    return ly;
  }

  function getYearInfo(yyyy) {
    let yearCode;
    if (yyyy < 1900) {
      yearCode = TK19[yyyy - 1800];
    } else if (yyyy < 2000) {
      yearCode = TK20[yyyy - 1900];
    } else if (yyyy < 2100) {
      yearCode = TK21[yyyy - 2000];
    } else {
      yearCode = TK22[yyyy - 2100];
    }
    return decodeLunarYear(yyyy, yearCode);
  }

  function jdFromDate(dd, mm, yy) {
    const a = INT((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
    if (jd < 2299161) {
      jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
    }
    return jd;
  }

  function getNewMoonDay(k, timeZone) {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    let deltat;
    if (T < -11) {
      deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
    } else {
      deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
    }
    const JdNew = Jd1 + C1 - deltat;
    return INT(JdNew + 0.5 + timeZone / 24);
  }

  function getLunarMonth11(yy, timeZone) {
    const off = jdFromDate(31, 12, yy) - 2415021;
    const k = INT(off / 29.530588853);
    let nm = getNewMoonDay(k, timeZone);
    const sunLong = INT(getSunLongitude(nm, timeZone) / 30);
    if (sunLong >= 9) {
      nm = getNewMoonDay(k - 1, timeZone);
    }
    return nm;
  }

  function getLeapMonthOffset(a11, timeZone) {
    const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;
    let arc = INT(getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone) / 30);
    do {
      last = arc;
      i++;
      arc = INT(getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone) / 30);
    } while (arc !== last && i < 14);
    return i - 1;
  }

  function getSunLongitude(jdn, timeZone) {
    const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
    const T2 = T * T;
    const dr = PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = L * dr;
    L = L - PI * 2 * (INT(L / (PI * 2)));
    return INT(L / PI * 6);
  }

  function getMonthDays(mm, yy) {
    const yearInfo = getYearInfo(yy);
    
    for (let i = 0; i < yearInfo.length; i++) {
      if (yearInfo[i].month === mm && yearInfo[i].leap === 0) {
        return yearInfo[i].days;
      }
    }
    
    return 30;
  }

  function convertSolar2Lunar(dd, mm, yy, timeZone) {
    const dayNumber = jdFromDate(dd, mm, yy);
    const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) {
      monthStart = getNewMoonDay(k, timeZone);
    }
    let a11 = getLunarMonth11(yy, timeZone);
    let b11 = a11;
    let lunarYear;
    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = getLunarMonth11(yy - 1, timeZone);
    } else {
      lunarYear = yy + 1;
      b11 = getLunarMonth11(yy + 1, timeZone);
    }
    const lunarDay = dayNumber - monthStart + 1;
    const diff = INT((monthStart - a11) / 29);
    let lunarLeap = 0;
    let lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }
    if (lunarMonth > 12) {
      lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }
    return [lunarDay, lunarMonth, lunarYear, lunarLeap];
  }

  function convertLunar2Solar(lunarDay, lunarMonth, lunarYear, lunarLeap, timeZone) {
    let a11, b11;
    if (lunarMonth < 11) {
      a11 = getLunarMonth11(lunarYear - 1, timeZone);
      b11 = getLunarMonth11(lunarYear, timeZone);
    } else {
      a11 = getLunarMonth11(lunarYear, timeZone);
      b11 = getLunarMonth11(lunarYear + 1, timeZone);
    }
    const k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
    let off = lunarMonth - 11;
    if (off < 0) {
      off += 12;
    }
    if (b11 - a11 > 365) {
      const leapOff = getLeapMonthOffset(a11, timeZone);
      let leapMonth = leapOff - 2;
      if (leapMonth < 0) {
        leapMonth += 12;
      }
      if (lunarLeap !== 0 && lunarMonth !== leapMonth) {
        return [0, 0, 0];
      } else if (lunarLeap !== 0 || off >= leapOff) {
        off += 1;
      }
    }
    const monthStart = getNewMoonDay(k + off, timeZone);
    return jdToDate(monthStart + lunarDay - 1);
  }

  function jdToDate(jd) {
    let a, b, c;
    if (jd > 2299160) {
      a = jd + 32044;
      b = INT((4 * a + 3) / 146097);
      c = a - INT((b * 146097) / 4);
    } else {
      b = 0;
      c = jd + 32082;
    }
    const d = INT((4 * c + 3) / 1461);
    const e = c - INT((1461 * d) / 4);
    const m = INT((5 * e + 2) / 153);
    const day = e - INT((153 * m + 2) / 5) + 1;
    const month = m + 3 - 12 * INT(m / 10);
    const year = b * 100 + d - 4800 + INT(m / 10);
    return [day, month, year];
  }

  function getCanChiYear(year) {
    return CAN[(year + 6) % 10] + ' ' + CHI[(year + 8) % 12];
  }

  function getCanChiMonth(month, year) {
    const canMonth = ((year * 12 + month + 3) % 10);
    return CAN[canMonth] + ' ' + CHI[(month + 1) % 12];
  }

  function getCanChiDay(jd) {
    return CAN[(jd + 9) % 10] + ' ' + CHI[(jd + 1) % 12];
  }

  function getGioHoangDao(jd) {
    const chiDay = (jd + 1) % 12;
    const gioHD = GIO_HD[chiDay % 6];
    const result = [];
    for (let i = 0; i < 12; i++) {
      if (gioHD.charAt(i) === '1') result.push(CHI[i]);
    }
    return result;
  }

  function getFestivals(solarDay, solarMonth, lunarDay, lunarMonth) {
    const festivals = [];
    const solarDate = solarDay + '/' + solarMonth;
    const lunarDate = lunarDay + '/' + lunarMonth;

    for (let i = 0; i < NGAY_LE_DL.length; i++) {
      if (NGAY_LE_DL[i] === solarDate) festivals.push(NGAY_LE_DL_STRING[i]);
    }
    for (let i = 0; i < NGAY_LE_AL.length; i++) {
      if (NGAY_LE_AL[i] === lunarDate) festivals.push(NGAY_LE_AL_STRING[i]);
    }
    return festivals;
  }

  function getChiIndexOfHour(hour24) {
    return Math.floor(((hour24 + 1) % 24) / 2);
  }

  function getCanChiHourFromJdAndHour(jd, hour24) {
    const dayCanIndex = (jd + 9) % 10;
    const hourChiIndex = getChiIndexOfHour(hour24);

    const START_CAN_TY = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
    const hourCanIndex = (START_CAN_TY[dayCanIndex] + hourChiIndex) % 10;

    return `${CAN[hourCanIndex]} ${CHI[hourChiIndex]}`;
  }

  function getKhoiGioTyFromJd(jd) {
    const dayCanIndex = (jd + 9) % 10;
    const START_CAN_TY = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
    return `${CAN[START_CAN_TY[dayCanIndex]]} Tý`;
  }

  function getTietKhi(jd) {
    const T = (jd - 2451545.0) / 36525;
    const T2 = T * T;
    const dr = PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = L * dr;
    L -= PI * 2 * INT(L / (PI * 2));
    const st_index = INT(L / PI * 12);
    return TIET_KHI[st_index];
  }

  function getGioHacDao(jd) {
    const chiIndex = (jd + 1) % 12;
    const hourPattern = GIO_HD[Math.floor(chiIndex / 2)];
    const gioHacDao = [];
    for (let i = 0; i < 12; i++) {
      if (hourPattern[i] === '0') gioHacDao.push(CHI[i]);
    }
    return gioHacDao.join(', ');
  }

  function getThanSat(jd) {
    const TRUC_ORDER = ["Kiến", "Trừ", "Mãn", "Bình", "Định", "Chấp", "Phá", "Nguy", "Thành", "Thu", "Khai", "Bế"];

    const T = (jd - 2451545.0) / 36525;
    const T2 = T * T;
    const dr = PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = L * dr;
    L -= PI * 2 * INT(L / (PI * 2));
    const st_index = INT(L / PI * 12);

    const month_chi_list = [3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 0, 0, 1, 1, 2, 2, 3];
    const month_chi_index = month_chi_list[st_index];
    const day_chi_index = (jd + 1) % 12;
    const duty_index = (day_chi_index - month_chi_index + 12) % 12;
    const trucName = TRUC_ORDER[duty_index];
    const trucInfo = THAP_NHI_TRUC[trucName];

    const saoNames = Object.keys(NHI_THAP_BAT_TU);
    const jd_ref = 2451545;
    const mansion_ref_index = 16;
    const day_diff = jd - jd_ref;
    const current_mansion_index = ((mansion_ref_index + day_diff) % 28 + 28) % 28;
    const saoName = saoNames[current_mansion_index];
    const saoInfo = NHI_THAP_BAT_TU[saoName];

    return {
      truc: { name: trucName, info: trucInfo, emoji: EMOJI_TRUC[trucName] || "" },
      sao: { name: saoName, info: saoInfo, emoji: EMOJI_SAO[saoName] || "" },
      napAm: "Ngũ Hành (chưa tính)"
    };
  }

  // ===== CUSTOM CARD CLASS =====
  class LichAmDuongCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._config = {};
      this.currentDate = new Date();
      this.isDatePickerOpen = false;
      this.isLunarMode = false;
      this._isRendered = false;
      this.backgroundOpacity = 0;
      this._clockTimer = null;
    }

    setConfig(config) {
      this._config = config || {};
      this.backgroundOpacity = typeof config.background_opacity === 'number'
        ? Math.max(0, Math.min(1, config.background_opacity))
        : 0;

      if (config.background === 'transparent' && this.backgroundOpacity === 0) {
        this.backgroundOpacity = 1;
      }
      // Thêm config cho border
      this.borderColor = config.border_color || '';
      this.borderWidth = config.border_width || 0;
      this.borderGlow = config.border_glow !== false; // mặc định true

      // ===== v2.4 Multi Color config =====
      // Hỗ trợ 2 kiểu cấu hình:
      // 1) key trực tiếp: color_month_year, color_nav_buttons, ...
      // 2) gom nhóm: colors: { month_year, nav_buttons, ... } hoặc keys cũ (top_year, nav_adjacent, ...)
      const c = (config && config.colors) ? config.colors : {};
      const pick = (directKey, groupKey, legacyKey) => (
        (config && config[directKey]) ||
        (c && (c[groupKey] || (legacyKey ? c[legacyKey] : ''))) ||
        ''
      );

      this.colors = {
        top_year: pick('color_month_year', 'month_year', 'top_year'),
        nav_adjacent: pick('color_nav_buttons', 'nav_buttons', 'nav_adjacent'),
        solar_lunar: pick('color_solar_lunar_date', 'solar_lunar_date', 'solar_lunar'),
        weekday: pick('color_weekday', 'weekday', 'weekday'),
        lunar_details: pick('color_lunar_info', 'lunar_info', 'lunar_details'),
        picker: pick('color_date_picker', 'date_picker', 'picker'),
        sunday_override: pick('color_sunday_special', 'sunday_special', 'sunday_override'),

        // v2.4 extra: nền header tím + nền/ngữ màu ngày lễ
        header_background: pick('color_header_background', 'header_background', 'header_background'),
        festival_background: pick('color_festival_background', 'festival_background', 'festival_background'),
        festival_text: pick('color_festival_text', 'festival_text', 'festival_text'),
        // v2.4 quote colors
        quote_text: pick('color_quote_text', 'quote_text', 'quote_text') || pick('color_quote', 'quote', 'quote'),
        quote_author: pick('color_quote_author', 'quote_author', 'quote_author'),
      };
    }

    set hass(hass) {
      this._hass = hass;
      if (!this._isRendered) {
        this.render();
        this._isRendered = true;
      }
    }

    connectedCallback() {
      if (!this._isRendered) {
        this.render();
        this._isRendered = true;
      }
      this.setupEventListeners();
      this.updateCalendar();

      this._clockTimer && clearInterval(this._clockTimer);
      this._clockTimer = setInterval(() => {
        this.updateCalendar();
        const popup = this.shadowRoot.getElementById('ha-lich-popup');
        if (popup && popup.classList.contains('show')) this.showDayPopup();
      }, 60 * 1000);
    }

    disconnectedCallback() {
      this._clockTimer && clearInterval(this._clockTimer);
    }

    getQuoteFromSensor() {
      // Hỗ trợ lấy quote từ input_text/sensor:
      // - Dạng thường: state = "Câu nói...", attributes.author (nếu có)
      // - Dạng kèm màu:
      //   1) "#RRGGBB|Quote text"
      //   2) "#RRGGBB|Quote text|Author"
      //   3) "#RRGGBB|#AABBCC|Quote text|Author"
      if (this._hass) {
        const quoteEntity = this._config.quote_entity;
        if (quoteEntity) {
          const stateObj = this._hass.states[quoteEntity];
          if (stateObj) {
            let raw = String(stateObj.state ?? '');
            let author = String(stateObj.attributes?.author ?? '');

            let qColor = '';
            let aColor = '';

            if (raw.includes('|')) {
              const parts = raw.split('|').map(s => s.trim()).filter(s => s.length);
              if (parts.length >= 2 && parts[0].startsWith('#')) {
                // #color|quote|author?  OR  #qColor|#aColor|quote|author
                if (parts.length >= 4 && parts[1].startsWith('#')) {
                  qColor = parts[0];
                  aColor = parts[1];
                  raw = parts[2];
                  author = parts.slice(3).join(' | ') || author;
                } else {
                  qColor = parts[0];
                  raw = parts[1];
                  if (parts.length >= 3) author = parts.slice(2).join(' | ') || author;
                }
              }
            }

            // Nếu user không set màu quote trong YAML thì mới lấy từ input_text
            const container = this.shadowRoot?.querySelector('.container');
            if (container) {
              const cfgQ = (this.colors && this.colors.quote_text) ? this.colors.quote_text : '';
              const cfgA = (this.colors && this.colors.quote_author) ? this.colors.quote_author : '';
              if (!cfgQ && qColor) container.style.setProperty('--lac-quote-text', qColor);
              if (!cfgA && (aColor || qColor)) container.style.setProperty('--lac-quote-author', aColor || qColor);
            }

            return { text: raw, author };
          }
        }
      }

      const day = this.currentDate.getDate();
      const quoteIndex = day % DEFAULT_QUOTES.length;
      return DEFAULT_QUOTES[quoteIndex];
    }

    render() {
      const bgOpacity = this.backgroundOpacity;
      const isTransparent = bgOpacity > 0;
      const internalBorderColor = this.getInternalBorderColor(); // THÊM DÒNG NÀY
      // v2.4: CSS variables for multi color
      const cv = (k) => (this.colors && this.colors[k]) ? this.colors[k] : '';
      const varStyle = `--lac-top-year:${cv('top_year')};--lac-nav-adjacent:${cv('nav_adjacent')};--lac-solar-lunar:${cv('solar_lunar')};--lac-weekday:${cv('weekday')};--lac-lunar-details:${cv('lunar_details')};--lac-picker:${cv('picker')};--lac-sunday:${cv('sunday_override')};--lac-header-bg:${cv('header_background')};--lac-festival-bg:${cv('festival_background')};--lac-festival-text:${cv('festival_text')};--lac-quote-text:${cv('quote_text')};--lac-quote-author:${cv('quote_author')};`;
      this.shadowRoot.innerHTML = `
        <style>
          :host { display:block !important; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; position:relative !important; --lac-top-year: inherit; --lac-nav-adjacent: inherit; --lac-solar-lunar: inherit; --lac-weekday: inherit; --lac-lunar-details: inherit; --lac-picker: inherit; --lac-sunday: inherit; --lac-header-bg: unset; --lac-festival-bg: unset; --lac-festival-text: unset; --lac-quote-text: unset; --lac-quote-author: unset; }
          * { box-sizing:border-box; margin:0; padding:0; }

          .container { max-width:400px; margin:0 auto; position:relative; display:block !important; visibility:visible !important; opacity:1 !important; }

          .calendar-bloc {
            background: ${isTransparent ? `rgba(255, 255, 255, ${1 - bgOpacity})` : 'white'};
            border-radius:12px;
            ${this.getBorderStyle()}
            overflow:hidden; position:relative; z-index:1;
            display:block !important; visibility:visible !important;
          }

          .calendar-header {
            background: var(--lac-header-bg, ${isTransparent ? 'rgba(123, 31, 162, 0.3)' : 'linear-gradient(135deg, #7b1fa2, #9c27b0)'});
            color:white; padding:10px; text-align:center; position:relative;
          }

          .header-controls { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; gap:6px; }


          .nav-button {
            background:rgba(255,255,255,0.2);
            border:1px solid rgba(255,255,255,0.3);
            color:${isTransparent ? 'var(--primary-text-color, white)' : 'white'};
            padding:4px 8px; border-radius:12px;
            cursor:pointer; font-weight:600;
            transition:all 0.3s; user-select:none;
          }
          .nav-button:hover { background:rgba(255,255,255,0.3); transform:scale(1.05); }
            
          .today-button { 
            background:rgba(255,255,255,0.9); 
            color:${isTransparent ? 'var(--accent-color, #7b1fa2)' : '#7b1fa2'};
          }
          .today-button:hover { background:white; }

          .month-year-vi { 
            font-size:1em; font-weight:bold;
            color:${isTransparent ? 'var(--primary-text-color, white)' : 'white'};
          }
          .month-year-en { 
            font-size:0.7em; opacity:0.9;
            color:${isTransparent ? 'var(--primary-text-color, white)' : 'white'};
          }
          .top-section {
            display:flex; flex-direction:column;
            padding:5px 8px 3px 8px; gap:8px; align-items:center;
            background:${isTransparent ? 'transparent' : 'linear-gradient(to bottom, #fff 0%, #f8f9fa 100%)'};
          }

          .solar-day-large {
            font-size:4em; font-weight:bold;
            color:${isTransparent ? 'var(--primary-text-color, #333)' : '#333'};
            line-height:1;
            text-shadow:${isTransparent ? '0 1px 3px rgba(0,0,0,0.15)' : '2px 2px 4px rgba(0,0,0,0.1)'};
            cursor:pointer; transition:transform 0.2s;
          }
          .solar-day-large:hover { transform:scale(1.05); }
          .solar-day-large.sunday, .solar-day-large.new-day { color:#e91e63; }

          .quote-author-container { width:100%; }
          .quote-section {
            width:100%; padding:4px 8px;
            background:${isTransparent ? 'rgba(255,255,255,0.1)' : 'rgba(123,31,162,0.05)'};
            border-radius:12px;
            display:flex; flex-direction:column; gap:8px;
          }
          .quote-text {
            font-style:italic;
            color:${isTransparent ? 'var(--primary-text-color, #333)' : '#333'};
            color: var(--lac-quote-text, inherit) !important;
            line-height:1.6; font-size:1em; text-align:center;
          }
          .author-section { display:flex; justify-content:flex-end; padding-right:5%; }
          .quote-author-side { color: var(--lac-quote-author, inherit) !important; font-weight:600; font-size:0.7em; text-align:right; }

          .weekday-festivals-section {
            padding:8px 12px;
            background:${isTransparent ? 'transparent' : '#f8f9fa'};
            min-height:40px;
            display:flex; flex-direction:column; gap:8px;
          }

          .festivals-row {
            display:flex; flex-wrap:wrap; gap:6px;
            justify-content:center; margin-bottom:8px; min-height:40px;
          }
          .festival-item {
            background: var(--lac-festival-bg, linear-gradient(135deg,#7b1fa2,#9c27b0));
            color: var(--lac-festival-text, white); padding:4px 8px; border-radius:12px;
            font-size:0.7em; font-weight:500;
            box-shadow:0 2px 8px rgba(123,31,162,0.3);
          }

          .weekday-row {
            display:grid; grid-template-columns:1fr auto 1fr;
            align-items:center; gap:8px;
            border-top:1px solid ${internalBorderColor};
            padding-top:15px;
          }
          .weekday-en { font-size:1.5em; font-weight:600; color:${isTransparent ? 'var(--primary-text-color, #333)' : '#333'}; text-align:center; }
          .weekday-en.sunday { color:#e91e63; }
          .weekday-vi { font-size:1.8em; font-weight:bold; color:${isTransparent ? 'var(--secondary-text-color, #555)' : '#555'}; text-align:center; }
          .weekday-vi.sunday { color:#e91e63; }
          .weekday-separator { width:1px; height:24px; background:${internalBorderColor}; }

          .bottom-section {
            display:grid; grid-template-columns:1fr auto 1fr;
            gap:6px; padding:10px 16px 16px 16px;
            background:${isTransparent ? 'transparent' : 'white'};
            align-items:center; min-width:0;
          }

          .left-column { min-width:0; overflow:hidden; display:flex; flex-direction:column; gap:8px; }

          .lunar-month-info {
            font-size:0.8em; font-weight:600;
            color:${isTransparent ? 'var(--primary-text-color, #7b1fa2)' : '#7b1fa2'};
            margin-bottom:6px; text-align:center;
            min-height:30px; display:flex; align-items:center; justify-content:center;
          }

          .can-chi-info {
            font-size:0.7em; color:${isTransparent ? 'var(--secondary-text-color, #555)' : '#555'};
            display:flex; align-items:center; gap:8px;
          }

          .label-small {
            background:${isTransparent ? 'rgba(255,255,255,0.2)' : '#f0f0f0'};
            padding:2px 4px; border-radius:12px;
            font-size:0.5em; font-weight:600;
            min-width:36px; text-align:center;
          }

          .center-column { text-align:center; display:flex; flex-direction:column; align-items:center; gap:6px; }
          .lunar-day-large {
            font-size:4em; font-weight:bold; color:${isTransparent ? 'var(--primary-text-color, #333)' : '#333'};
            line-height:1; text-shadow:${isTransparent ? '0 1px 3px rgba(0,0,0,0.15)' : '2px 2px 4px rgba(0,0,0,0.1)'};
          }

          .year-can-chi {
            font-size:1em; font-weight:600;
            color:${isTransparent ? 'var(--primary-text-color, #7b1fa2)' : '#7b1fa2'};
            padding:4px 8px;
            background:${isTransparent ? 'rgba(255,255,255,0.2)' : 'rgba(123,31,162,0.1)'};
            border-radius:12px;
          }

          .gio-hoang-dao-section { text-align:center; display:flex; flex-direction:column; min-width:0; overflow:hidden; }
          .label {
            font-size:0.8em; font-weight:600;
            color:${isTransparent ? 'var(--primary-text-color, #7b1fa2)' : '#7b1fa2'};
            margin-bottom:6px; letter-spacing:1px; text-align:center;
            min-height:30px; display:flex; align-items:center; justify-content:center;
          }
          .gio-list {
            font-size:0.7em; color:${isTransparent ? 'var(--secondary-text-color, #555)' : '#555'};
            line-height:1.4;
            background:${isTransparent ? 'rgba(255,255,255,0.1)' : '#f8f9fa'};
            padding:6px; border-radius:12px; text-align:center;
          }


          .date-picker-toggle {
            background:${isTransparent ? 'rgba(123,31,162,0.3)' : 'linear-gradient(135deg, #7b1fa2, #9c27b0)'};
            color:${isTransparent ? 'var(--primary-text-color, white)' : 'white'};
            padding:15px 20px; cursor:pointer;
            display:flex; justify-content:space-between; align-items:center;
            transition:all 0.3s; margin-top:10px;
            border-radius:6px 6px 0 0;
            border:1px solid ${internalBorderColor};
            user-select:none;
          }          
          .date-picker-toggle:hover { background:${isTransparent ? 'rgba(123,31,162,0.5)' : 'linear-gradient(135deg, #6a1589, #8b1f9f)'}; }

          .toggle-title { font-size:0.8em; font-weight:600; }
          .toggle-icon { transition:transform 0.3s; font-size:0.6em; }
          .toggle-icon.open { transform:rotate(180deg); }

          .date-picker {
            max-height:0; overflow:hidden;
            transition:max-height 0.4s ease-out, opacity 0.4s ease;
            background:${isTransparent ? 'rgba(255,255,255,0.05)' : 'white'};
            border-radius:0 0 12px 12px;
            opacity:0;
            border:1px solid ${internalBorderColor};
            border-top:none;
          }
          .date-picker.open { max-height:500px; opacity:1; }

          .calendar-type-toggle { display:flex; gap:6px; padding:20px 20px 10px 20px; }
          .type-toggle-btn {
            flex:1; padding:6px;
            border:2px solid ${internalBorderColor};
            background:${isTransparent ? 'rgba(255,255,255,0.1)' : 'white'};
            color:${isTransparent ? 'var(--primary-text-color, #333)' : '#333'};
            border-radius:12px;
            cursor:pointer;
            font-size:1em; font-weight:600;
            transition:all 0.2s;
          }
          .type-toggle-btn:hover { border-color:#7b1fa2; }
          .type-toggle-btn.active { background:linear-gradient(135deg,#7b1fa2,#9c27b0); color:white; border-color:#7b1fa2; }

          .date-inputs { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; padding:10px; }
          .date-input-group { display:flex; flex-direction:column; gap:6px; }
          .date-input-group label { font-size:0.7em; font-weight:600; color:${isTransparent ? 'var(--secondary-text-color, #555)' : '#555'}; }

          .date-input-group input, .date-input-group select {
            padding:10px;
            border:1px solid ${internalBorderColor};
            background:${isTransparent ? 'rgba(255,255,255,0.1)' : 'white'};
            color:${isTransparent ? 'var(--primary-text-color, #333)' : '#333'};
            border-radius:12px;
            font-size:1em;
            transition:border-color 0.2s;
          }
          .date-input-group input:focus, .date-input-group select:focus { outline:none; border-color:#7b1fa2; }

          .solar-inputs { display:none; }
          .lunar-inputs { display:none; }
          .lunar-inputs.active { display:grid; }
          .solar-inputs.active { display:grid; }

          .goto-btn {
            margin:0 20px 20px 20px;
            padding:6px;
            background:linear-gradient(135deg,#7b1fa2,#9c27b0);
            color:white;
            border:none;
            border-radius:12px;
            font-size:1em; font-weight:600;
            cursor:pointer;
            transition:all 0.2s;
          }
          .goto-btn:hover { transform:translateY(-2px); box-shadow:0 4px 12px rgba(123,31,162,0.3); }

          /* Popup */
          .ha-popup {
            position:fixed; top:0; left:0;
            width:100vw; height:100vh;
            background:rgba(0,0,0,0.6);
            z-index:99999;
            display:none;
            justify-content:center;
            align-items:flex-end;
            backdrop-filter:blur(4px);
          }
          .ha-popup.show { display:flex; }
          .ha-popup-box {
            background:var(--card-background-color, #1e1e1e);
            color:var(--primary-text-color, #fff);
            width:100%;
            max-width:500px;
            max-height:85%;
            border-radius:18px 18px 0 0;
            padding:20px;
            overflow:auto;
            animation:slideUp 0.3s ease;
            margin-bottom:0;
          }
          @media (min-width: 600px) {
            .ha-popup { align-items:center; }
            .ha-popup-box { border-radius:18px; margin-bottom:auto; width:400px; }
          }
          .ha-popup-header {
            display:flex; justify-content:space-between; align-items:center;
            font-weight:600; font-size:1.2em;
            margin-bottom:15px;
            border-bottom:1px solid rgba(255,255,255,0.2);
            padding-bottom:10px;
          }
          .ha-popup-close { font-size:24px; cursor:pointer; padding:5px; transition:transform 0.2s; }
          .ha-popup-close:hover { transform:scale(1.2); }
          .ha-popup-content { line-height:1.6; }
          .ha-popup-content p { margin:8px 0; font-size:15px; line-height:1.5; }

          @keyframes slideUp { from { transform:translateY(100%); } to { transform:translateY(0); } }

          @media (max-width: 768px) {
            .solar-day-large { font-size:4em; }
            .lunar-day-large { font-size:3em; }
            .author-section { justify-content:center; padding-right:0; }
            .quote-author-side { text-align:center; }
          }
        
          /* ===== v2.4 Multi Color overrides ===== */
          #monthYearVi, #monthYearEn, .year-can-chi { color: var(--lac-top-year, inherit) !important; }

          /* Hôm qua / Ngày mai */
          #prevDay, #nextDay { color: var(--lac-nav-adjacent, inherit) !important; }

          /* Ngày dương + Ngày âm */
          .solar-day-large, .lunar-day-large { color: var(--lac-solar-lunar, inherit) !important; }

          /* Thứ */
          .weekday-en, .weekday-vi { color: var(--lac-weekday, inherit) !important; }

          /* Thông tin âm lịch chi tiết (tháng âm + can chi + giờ hoàng đạo...) */
          #lunarMonth, #monthCanChi, #dayCanChi, #hourCanChi, #gioHoangDao, #gioHoangDao * {
            color: var(--lac-lunar-details, inherit) !important;
          }

          /* Chọn ngày để xem (toggle + popup) */
          .date-picker-toggle, .date-picker, .date-picker * { color: var(--lac-picker, inherit) !important; }

          /* Chủ nhật: override ngày dương + ngày âm + thứ */
          .solar-day-large.sunday,
          .lunar-day-large.sunday,
          .weekday-en.sunday,
          .weekday-vi.sunday {
            color: var(--lac-sunday, var(--lac-solar-lunar, inherit)) !important;
          }

        
          /* ===== v2.4 Custom Multi Color overrides (NO layout changes) ===== */
          .month-year-vi, .month-year-en, .year-can-chi { color: var(--lac-top-year, inherit) !important; }

          .nav-button { color: var(--lac-nav-adjacent, inherit) !important; }

          .solar-day-large, .lunar-day-large { color: var(--lac-solar-lunar, inherit) !important; }

          /* Make Vietnamese/English weekday stroke consistent */
          .weekday-vi, .weekday-en { color: var(--lac-weekday, inherit) !important; font-weight:700 !important; }

          /* Lunar month + Can Chi + Gio Hoang Dao + labels */
          .lunar-month-info,
          .can-chi-info,
          .can-chi-info span,
          .label,
          .gio-list,
          .label-small { color: var(--lac-lunar-details, inherit) !important; }

          /* Date picker section: title + labels + button */
          .date-picker-toggle,
          .date-picker-toggle .toggle-title,
          .date-input-group label,
          .goto-btn { color: var(--lac-picker, inherit) !important; }

          /* Sunday special: solar + lunar + weekday share one color */
          .solar-day-large.sunday,
          .lunar-day-large.sunday,
          .weekday-vi.sunday,
          .weekday-en.sunday { color: var(--lac-sunday, var(--lac-solar-lunar, inherit)) !important; }

</style>

        <div class="container" style="${varStyle}">
          <div class="calendar-bloc">
            <div class="calendar-header">
              <div class="header-controls">
                <button class="nav-button" id="prevDay">◀ Hôm qua</button>
                <button class="nav-button today-button" id="today">📅 Hôm nay</button>
                <button class="nav-button" id="nextDay">Ngày mai ▶</button>
              </div>
              <div class="month-year-en" id="monthYearEn"></div>
              <div class="month-year-vi" id="monthYearVi"></div>
            </div>

            <div class="top-section">
              <div class="solar-day-large" id="solarDay"></div>
              <div class="quote-author-container">
                <div class="quote-section">
                  <div class="quote-text" id="quoteText"></div>
                  <div class="author-section">
                    <div class="quote-author-side" id="quoteAuthor"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="weekday-festivals-section">
              <div class="festivals-row" id="festivalsRow"></div>
              <div class="weekday-row">
                <div class="weekday-vi" id="weekdayVi"></div>
                <div class="weekday-separator"></div>
                <div class="weekday-en" id="weekdayEn"></div>
              </div>
            </div>

            <div class="bottom-section">
              <div class="left-column">
                <div class="lunar-month-info" id="lunarMonth"></div>
                <div class="can-chi-info">
                  <span class="label-small">Tháng</span><span id="monthCanChi"></span>
                </div>
                <div class="can-chi-info">
                  <span class="label-small">Ngày</span><span id="dayCanChi"></span>
                </div>
                <div class="can-chi-info">
                  <span class="label-small">Giờ</span><span id="hourCanChi"></span>
                </div>
              </div>

              <div class="center-column">
                <div class="lunar-day-large" id="lunarDay"></div>
                <div class="year-can-chi" id="yearCanChi"></div>
              </div>

              <div class="gio-hoang-dao-section">
                <div class="label">Giờ Hoàng Đạo</div>
                <div class="gio-list" id="gioHoangDao"></div>
              </div>
            </div>
          </div>

          <div class="date-picker-toggle" id="datePickerToggle">
            <span class="toggle-title">🗓️ Chọn ngày xem</span>
            <span class="toggle-icon" id="toggleIcon">🔽</span>
          </div>

          <div class="date-picker" id="datePicker">
            <div class="calendar-type-toggle">
              <button class="type-toggle-btn active" id="toggleSolar">Dương lịch</button>
              <button class="type-toggle-btn" id="toggleLunar">Âm lịch</button>
            </div>

            <div class="date-inputs solar-inputs active" id="solarInputs">
              <div class="date-input-group">
                <label>Ngày</label>
                <input type="number" id="inputDay" min="1" max="31" value="1">
              </div>
              <div class="date-input-group">
                <label>Tháng</label>
                <input type="number" id="inputMonth" min="1" max="12" value="1">
              </div>
              <div class="date-input-group">
                <label>Năm</label>
                <input type="number" id="inputYear" min="1900" max="2100" value="2025">
              </div>
            </div>

            <div class="date-inputs lunar-inputs" id="lunarInputs">
              <div class="date-input-group">
                <label>Ngày ÂL</label>
                <input type="number" id="inputLunarDay" min="1" max="30" value="1">
              </div>
              <div class="date-input-group">
                <label>Tháng ÂL</label>
                <select id="inputLunarMonth">
                  <option value="1">Giêng</option>
                  <option value="2">Hai</option>
                  <option value="3">Ba</option>
                  <option value="4">Tư</option>
                  <option value="5">Năm</option>
                  <option value="6">Sáu</option>
                  <option value="7">Bảy</option>
                  <option value="8">Tám</option>
                  <option value="9">Chín</option>
                  <option value="10">Mười</option>
                  <option value="11">Một</option>
                  <option value="12">Chạp</option>
                </select>
              </div>
              <div class="date-input-group">
                <label>Năm ÂL</label>
                <input type="number" id="inputLunarYear" min="1900" max="2100" value="2025">
              </div>
            </div>

            <button class="goto-btn" id="gotoDate">Xem ngày này</button>
          </div>

          <div id="ha-lich-popup" class="ha-popup">
            <div class="ha-popup-box">
              <div class="ha-popup-header">
                <span id="ha-popup-title">Chi tiết</span>
                <span class="ha-popup-close" id="popupClose">✕</span>
              </div>
              <div id="ha-popup-content" class="ha-popup-content"></div>
            </div>
          </div>
        </div>
      `;
    }
    getBorderStyle() {
      const isTransparent = this.backgroundOpacity > 0;
      
      if (this.borderColor && this.borderWidth > 0) {
        const borderStyle = `border: ${this.borderWidth}px solid ${this.borderColor};`;
        const boxShadow = this.borderGlow 
          ? `box-shadow: 0 0 10px ${this.borderColor}, 0 0 20px ${this.borderColor}80;`
          : `box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);`;
        return borderStyle + boxShadow;
      }
      
      if (isTransparent) {
        return 'border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3)); box-shadow: none;';
      }
      
      return 'box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);';
    }
    // Hàm mới để lấy màu đường kẻ nội bộ
    getInternalBorderColor() {
      const isTransparent = this.backgroundOpacity > 0;
      
      // Nếu có border_color được set, sử dụng nó cho tất cả đường kẻ
      if (this.borderColor && this.borderWidth > 0) {
        return this.borderColor;
      }
      
      // Nếu transparent mode, dùng màu mặc định của theme
      if (isTransparent) {
        return 'var(--divider-color, rgba(127, 127, 127, 0.3))';
      }
      
      // Mode bình thường
      return '#e0e0e0';
    }    
    setupEventListeners() {
      const $ = (id) => this.shadowRoot.getElementById(id);

      $('prevDay')?.addEventListener('click', () => this.changeDay(-1));
      $('nextDay')?.addEventListener('click', () => this.changeDay(1));
      $('today')?.addEventListener('click', () => this.gotoToday());
      $('datePickerToggle')?.addEventListener('click', () => this.toggleDatePicker());
      $('toggleSolar')?.addEventListener('click', () => this.toggleCalendarType('solar'));
      $('toggleLunar')?.addEventListener('click', () => this.toggleCalendarType('lunar'));
      $('gotoDate')?.addEventListener('click', () => this.gotoDate());

      $('solarDay')?.addEventListener('click', () => this.showDayPopup());
      $('popupClose')?.addEventListener('click', () => this.closePopup());
      $('ha-lich-popup')?.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'ha-lich-popup') this.closePopup();
      });
    }

    toggleDatePicker() {
      this.isDatePickerOpen = !this.isDatePickerOpen;
      const datePicker = this.shadowRoot.getElementById('datePicker');
      const toggleIcon = this.shadowRoot.getElementById('toggleIcon');

      if (this.isDatePickerOpen) {
        datePicker.classList.add('open');
        toggleIcon.classList.add('open');
      } else {
        datePicker.classList.remove('open');
        toggleIcon.classList.remove('open');
      }
    }

    toggleCalendarType(type) {
      this.isLunarMode = type === 'lunar';

      const solarInputs = this.shadowRoot.getElementById('solarInputs');
      const lunarInputs = this.shadowRoot.getElementById('lunarInputs');
      const toggleSolar = this.shadowRoot.getElementById('toggleSolar');
      const toggleLunar = this.shadowRoot.getElementById('toggleLunar');

      if (this.isLunarMode) {
        solarInputs.classList.remove('active');
        lunarInputs.classList.add('active');
        toggleSolar.classList.remove('active');
        toggleLunar.classList.add('active');
      } else {
        solarInputs.classList.add('active');
        lunarInputs.classList.remove('active');
        toggleSolar.classList.add('active');
        toggleLunar.classList.remove('active');
      }
    }

    gotoDate() {
      const $ = (id) => this.shadowRoot.getElementById(id);

      if (this.isLunarMode) {
        const lunarDay = parseInt($('inputLunarDay').value, 10);
        const lunarMonth = parseInt($('inputLunarMonth').value, 10);
        const lunarYear = parseInt($('inputLunarYear').value, 10);

        const solar = convertLunar2Solar(lunarDay, lunarMonth, lunarYear, 0, 7);
        if (solar[0] === 0) {
          alert('Ngày âm lịch không hợp lệ!');
          return;
        }

        this.currentDate = new Date(solar[2], solar[1] - 1, solar[0]);
        this.updateCalendar();
        this.toggleDatePicker();

        const popup2 = $('ha-lich-popup');
        if (popup2 && popup2.classList.contains('show')) this.showDayPopup();
      } else {
        const day = parseInt($('inputDay').value, 10);
        const month = parseInt($('inputMonth').value, 10);
        const year = parseInt($('inputYear').value, 10);

        if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2100) {
          const newDate = new Date(year, month - 1, day);
          if (newDate.getMonth() === month - 1) {
            this.currentDate = newDate;
            this.updateCalendar();
            this.toggleDatePicker();

            const popup3 = $('ha-lich-popup');
            if (popup3 && popup3.classList.contains('show')) this.showDayPopup();
          } else {
            alert('Ngày không hợp lệ!');
          }
        } else {
          alert('Vui lòng nhập ngày hợp lệ!');
        }
      }
    }

    changeDay(delta) {
      this.currentDate.setDate(this.currentDate.getDate() + delta);
      this.updateCalendar();

      const popup = this.shadowRoot.getElementById('ha-lich-popup');
      if (popup && popup.classList.contains('show')) this.showDayPopup();
    }

    gotoToday() {
      this.currentDate = new Date();
      this.updateCalendar();

      const popup = this.shadowRoot.getElementById('ha-lich-popup');
      if (popup && popup.classList.contains('show')) this.showDayPopup();
    }

    updateCalendar() {
      const dd = this.currentDate.getDate();
      const mm = this.currentDate.getMonth() + 1;
      const yy = this.currentDate.getFullYear();
      const dayOfWeek = this.currentDate.getDay();

      const lunar = convertSolar2Lunar(dd, mm, yy, 7);
      const lunarDay = lunar[0];
      const lunarMonth = lunar[1];
      const lunarYear = lunar[2];
      const lunarLeap = lunar[3];

      const jd = jdFromDate(dd, mm, yy);
      const canChiYear = getCanChiYear(lunarYear);
      const canChiMonth = getCanChiMonth(lunarMonth, lunarYear);
      const canChiDay = getCanChiDay(jd);

      const hourNow = new Date().getHours();
      const canChiHour = getCanChiHourFromJdAndHour(jd, hourNow);

      const gioHoangDao = getGioHoangDao(jd);
      const line1 = gioHoangDao.slice(0, 3).join(', ');
      const line2 = gioHoangDao.slice(3).join(', ');

      let lunarMonthName = THANG_AM[lunarMonth];
      if (lunarLeap) lunarMonthName = 'Nhuận ' + lunarMonthName;

      const monthDays = getMonthDays(lunarMonth, lunarYear);
      const monthType = monthDays === 30 ? "(Đ)" : "(T)";

      const festivals = getFestivals(dd, mm, lunarDay, lunarMonth);
      const quote = this.getQuoteFromSensor();

      const monthsVi = ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu',
        'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'];
      const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

      const $ = (id) => this.shadowRoot.getElementById(id);

      $('monthYearVi').textContent = `${monthsVi[mm - 1]} ${yy}`;
      $('monthYearEn').textContent = monthsEn[mm - 1];

      const solarDayEl = $('solarDay');
      solarDayEl.textContent = dd;
      solarDayEl.className = 'solar-day-large';
      if (dayOfWeek === 0) solarDayEl.classList.add('sunday');
      else if (dd === 1) solarDayEl.classList.add('new-day');

      $('quoteText').textContent = quote.text;
      $('quoteAuthor').textContent = quote.author;

      const weekdayEnEl = $('weekdayEn');
      const weekdayViEl = $('weekdayVi');
      weekdayEnEl.textContent = TUAN_EN[dayOfWeek];
      weekdayViEl.textContent = TUAN_VI[dayOfWeek];
      weekdayEnEl.className = 'weekday-en';
      weekdayViEl.className = 'weekday-vi';
      if (dayOfWeek === 0) {
        weekdayEnEl.classList.add('sunday');
        weekdayViEl.classList.add('sunday');
      }

      const festivalsRow = $('festivalsRow');
      festivalsRow.innerHTML = festivals.length > 0
        ? festivals.map(f => `<div class="festival-item">${f}</div>`).join('')
        : '';

      $('lunarMonth').textContent = `Tháng ${lunarMonthName} ${monthType}`;
      const lunarDayEl = $('lunarDay');
      lunarDayEl.textContent = lunarDay;
      lunarDayEl.className = 'lunar-day-large';
      if (dayOfWeek === 0) lunarDayEl.classList.add('sunday');
      $('monthCanChi').textContent = canChiMonth;
      $('dayCanChi').textContent = canChiDay;
      $('hourCanChi').textContent = canChiHour;

      $('yearCanChi').textContent = canChiYear;
      $('gioHoangDao').innerHTML = `${line1}<br>${line2}`;

      $('inputDay').value = dd;
      $('inputMonth').value = mm;
      $('inputYear').value = yy;
      $('inputLunarDay').value = lunarDay;
      $('inputLunarMonth').value = lunarMonth;
      $('inputLunarYear').value = lunarYear;
    }

    closePopup() {
      const popup = this.shadowRoot.getElementById('ha-lich-popup');
      if (popup) popup.classList.remove('show');
    }

    showDayPopup() {
      const $ = (id) => this.shadowRoot.getElementById(id);
      const popup = $('ha-lich-popup');
      if (!popup) return;

      try {
        const dd = this.currentDate.getDate();
        const mm = this.currentDate.getMonth() + 1;
        const yy = this.currentDate.getFullYear();
        const dayOfWeek = this.currentDate.getDay();

        const lunar = convertSolar2Lunar(dd, mm, yy, 7);
        const lunarDay = lunar[0];
        const lunarMonth = lunar[1];
        const lunarYear = lunar[2];
        const lunarLeap = lunar[3];

        const jd = jdFromDate(dd, mm, yy);
        const canChiYear = getCanChiYear(lunarYear);
        const canChiMonth = getCanChiMonth(lunarMonth, lunarYear);
        const canChiDay = getCanChiDay(jd);

        const hourNow = new Date().getHours();
        const canChiHour = getCanChiHourFromJdAndHour(jd, hourNow);

        const tietKhi = getTietKhi(jd);
        const gioHoangDao = getGioHoangDao(jd);
        const gioHDString = gioHoangDao.join(', ');
        const gioHacDao = getGioHacDao(jd);
        const thanSat = getThanSat(jd);

        let lunarMonthName = THANG_AM[lunarMonth];
        if (lunarLeap) lunarMonthName = 'Nhuận ' + lunarMonthName;

        const monthDays = getMonthDays(lunarMonth, lunarYear);
        const monthType = monthDays === 30 ? "(Đ)" : "(T)";

        const festivals = getFestivals(dd, mm, lunarDay, lunarMonth);
        let festivalString = '';
        if (festivals.length > 0) festivalString = festivals.map(f => `🎉 ${f}`).join('<br>');

        const chiYearIndex = (lunarYear + 8) % 12;
        const conGiap = CHI_EMOJI[chiYearIndex];

        const khoiGioTy = getKhoiGioTyFromJd(jd);

        const danhGia = (thanSat.sao && thanSat.sao.info && thanSat.sao.info.danhGia) ? thanSat.sao.info.danhGia : "";
        let bgDanhGia = "rgba(123, 31, 162, 0.9)";
        if (danhGia.includes("Tốt") || danhGia.includes("Kiết")) bgDanhGia = "rgba(76, 175, 80, 0.9)";
        else if (danhGia.includes("Xấu") || danhGia.includes("Hung")) bgDanhGia = "rgba(244, 67, 54, 0.9)";

        let res = `<div class="lunar-popup-detail" style="font-family: sans-serif; font-size: 0.9em; color: var(--primary-text-color); padding-bottom: 10px;">`;

        res += `
          <div style="text-align:center; margin-bottom:12px; border-bottom: 2px solid rgba(123, 31, 162, 0.3); padding-bottom:10px;">
            <div style="font-size:1.3em; font-weight:bold; color:#ffff99; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
              Ngày ${dd}/${mm}/${yy}
            </div>
            <div style="font-size:0.95em; opacity:0.9; margin-top:4px; font-weight:500;">
              ${TUAN_VI[dayOfWeek]}
            </div>
          </div>
        `;

        res += `
          <div style="background: linear-gradient(135deg, rgba(123, 31, 162, 0.15), rgba(76, 175, 80, 0.15)); border-radius: 10px; padding: 12px; margin-bottom: 12px; border: 1px solid rgba(123, 31, 162, 0.2);">
            <table style="width:100%; border-collapse: collapse; font-size:0.95em;">
              <tr style="border-bottom: 1px solid rgba(125,125,125,0.2);">
                <td style="padding:6px 0; opacity:0.85; width:40%;">📅 Âm lịch:</td>
                <td style="text-align:right;"><b style="color:#ffff99;">${lunarDay}/${lunarMonth}/${lunarYear} ${lunarLeap ? '(Nhuận)' : ''}</b></td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(125,125,125,0.2);">
                <td style="padding:6px 0; opacity:0.85;">🌙 Tháng âm:</td>
                <td style="text-align:right;"><b style="color:#ffff99;">${lunarMonthName} ${monthType}</b></td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(125,125,125,0.2);">
                <td style="padding:6px 0; opacity:0.85;">🐉 Năm Can Chi:</td>
                <td style="text-align:right;"><b style="color:#ffff99;">${canChiYear} ${conGiap}</b></td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(125,125,125,0.2);">
                <td style="padding:6px 0; opacity:0.85;">📆 Tháng Can Chi:</td>
                <td style="text-align:right;"><b style="color:#ffff99;">${canChiMonth}</b></td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(125,125,125,0.2);">
                <td style="padding:6px 0; opacity:0.85;">📋 Ngày Can Chi:</td>
                <td style="text-align:right;"><b style="color:#ffff99;">${canChiDay}</b></td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(125,125,125,0.2);">
                <td style="padding:6px 0; opacity:0.85;">🕒 Giờ Can Chi:</td>
                <td style="text-align:right;"><b style="color:#ffff99;">${canChiHour}</b></td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(125,125,125,0.2);">
                <td style="padding:6px 0; opacity:0.85;">🌸 Tiết khí:</td>
                <td style="text-align:right;"><b style="color:#ffff99;">${tietKhi}</b></td>
              </tr>
              <tr>
                <td style="padding:6px 0; opacity:0.85;">⭐ Giờ H.Đạo:</td>
                <td style="text-align:right; font-size:0.85em;"><b>${gioHDString}</b></td>
              </tr>
            </table>
          </div>
        `;

        res += `<div style="background: rgba(0,0,0,0.4); color: #fff; border-radius: 10px; padding: 12px; box-shadow: 0 3px 6px rgba(0,0,0,0.2);">`;

        res += `
          <div style="margin-bottom: 10px; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 8px;">
            <div style="font-weight:bold; margin-bottom:3px; font-size:0.95em;">🌑 Giờ hắc đạo:</div>
            <div style="opacity:0.9; padding-left: 18px; font-size:0.85em; line-height:1.4;">${gioHacDao}</div>
          </div>`;

        res += `
          <div style="margin-bottom: 10px; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 8px;">
            <div style="margin-bottom: 5px;">
              <span style="font-weight:bold; font-size:0.95em;">${thanSat.truc.emoji} Trực:</span>
              <span style="background-color:rgba(76, 175, 80, 0.9); color:#fff; font-weight:bold; padding:2px 10px; border-radius:12px; font-size:0.85em; margin-left:5px;">
                ${thanSat.truc.name}
              </span>
            </div>
            <div style="padding-left: 5px; line-height:1.5; font-size: 0.85em;">
              <div>✅ <span style="opacity:0.85;">Tốt:</span> ${thanSat.truc.info.tot}</div>
              <div style="margin-top:3px;">❌ <span style="opacity:0.85;">Xấu:</span> <span style="color:#ffcc80;">${thanSat.truc.info.xau}</span></div>
            </div>
          </div>`;

        res += `
          <div style="margin-bottom: 10px; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 8px;">
            <div style="font-weight:bold; font-size:0.95em;">🌟 Ngũ hành:</div>
            <div style="padding-left: 18px; opacity:0.9; margin-top:3px; font-size:0.85em;">${thanSat.napAm}</div>
          </div>`;

        res += `
          <div>
            <div style="margin-bottom: 6px;">
              <span style="font-weight:bold; font-size:0.95em;">${thanSat.sao.emoji} Nhị Thập Bát Tú:
                <span style="background-color:${bgDanhGia}; color:#fff; padding:2px 10px; border-radius:12px; margin-left:5px; font-size:0.85em;">${thanSat.sao.name}</span>
              </span>
            </div>

            <div style="font-style:italic; color:#ffff99; margin-bottom:6px; padding-left: 6px; font-size:0.85em;">
              ${(thanSat.sao.info.tenNgay || '')} - ${(thanSat.sao.info.danhGia || '')}
            </div>

            <div style="padding-left: 6px; line-height:1.5; font-size:0.85em;">
              <div><b style="color:#fff;">🌟 Tướng tinh:</b> <span style="opacity:0.9;">${thanSat.sao.info.tuongTinh || ''}</span></div>
              <div style="margin-top:4px;"><b style="color:#fff;">👍 Nên làm:</b> <span style="opacity:0.9;">${thanSat.sao.info.nenLam || ''}</span></div>
              <div style="margin-top:4px;"><b style="color:#fff;">👎 Kiêng cữ:</b> <span style="color:#ffcc80;">${thanSat.sao.info.kiengCu || ''}</span></div>

              ${thanSat.sao.info.ngoaiLe
                ? `<div style="margin-top:4px;"><b style="color:#fff;">✨ Ngoại lệ:</b>
                    <div style="padding-left:12px; opacity:0.9; margin-top:3px; line-height:1.4;">
                      ${String(thanSat.sao.info.ngoaiLe).replace(/\n/g, '<br>')}
                    </div>
                  </div>`
                : ''}
            </div>

            ${thanSat.sao.info.tho
              ? `<div style="margin-top:8px; padding-top:8px; border-top:1px solid rgba(255,255,255,0.2); text-align:center; font-style:italic; font-family:'Times New Roman', serif; color:#ffff99; white-space:pre-wrap; font-size:0.8em; line-height:1.5;">${thanSat.sao.info.tho}</div>`
              : ''}
          </div>
        `;

        res += `</div>`;

        if (festivalString) {
          res += `
            <div style="background: rgba(76, 175, 80, 0.2); border-radius: 10px; padding: 12px; margin-top:12px; border: 1px solid rgba(76, 175, 80, 0.3);">
              <div style="font-weight:bold; margin-bottom:8px; color:#ffff99; font-size:0.95em;">🎊 Ngày lễ:</div>
              <div style="line-height:1.7; font-size:0.85em;">${festivalString}</div>
            </div>
          `;
        }

        res += `<div style="text-align:center; font-size:0.8em; opacity:0.65; margin-top:12px; padding-top:10px; border-top:1px dashed rgba(255,255,255,0.2);">
          ⏰ Khởi giờ Tý: <b style="color:#ffff99;">${khoiGioTy}</b>
        </div>`;

        res += `</div>`;

        const titleEl = $('ha-popup-title');
        const contentEl = $('ha-popup-content');
        if (titleEl) titleEl.innerText = `Chi tiết`;
        if (contentEl) contentEl.innerHTML = res;

        popup.classList.add('show');
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Lỗi Popup:", e);
        const contentEl = this.shadowRoot.getElementById('ha-popup-content');
        if (contentEl) contentEl.innerHTML = `<div style="color:red; padding:15px; text-align:center;">Có lỗi xảy ra: ${e.message}</div>`;
        popup.classList.add('show');
      }
    }

    static getConfigElement() {
      return document.createElement('lich-am-duong-card-editor');
    }

    static getStubConfig() {
      return {
        background: 'normal',
        background_opacity: 0,
        quote_entity: '',
        border_color: '',
        border_width: 0,
        border_glow: true        
      };
    }
  }

  customElements.define('lich-am-duong-card', LichAmDuongCard);

  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'lich-am-duong-card',
    name: 'Lịch Âm Dương Việt Nam Enhanced',
    description: 'Lịch bloc âm dương với background opacity và toggle chọn ngày + giờ Can-Chi theo giờ thực tế. Auto theme color adaptation.',
    preview: true
  });

  // eslint-disable-next-line no-console
  console.info(
    '%c LỊCH-ÂM-DƯƠNG-CARD %c Version 2.4 - Custom Multi Color Edition ',
    'color: white; background: #7b1fa2; font-weight: 700;',
    'color: #7b1fa2; background: white; font-weight: 700;'
  );

})();
