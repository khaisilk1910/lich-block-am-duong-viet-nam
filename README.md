# lich-block-am-duong-viet-nam
## Custom card hiển thị lịch Âm Dương theo kiểu lịch Block:
- Hiển thị các ngày Lễ trong năm theo lịch dương và lịch âm.
- Xem lịch các tháng, các năm bằng cách nhấn di chuyển trong giao diện
- Hình nền thay đổi theo ngày trong tuần.
- Hiện giờ hoàng đạo, ngày tháng năm theo can chi lịch âm.
- Hiển thị tháng Đủ *(Đ)* hoặc Thiếu *(T)*, tháng *Nhuận* Âm Lịch
<img width="503" height="538" alt="image" src="https://github.com/user-attachments/assets/40ac8a8f-7995-44e6-8ffa-1be8ce63ec69" />


## Hướng dẫn:
1. Cài qua HACS
   - Vào HACS
   - Vào 3 Chấm góc trên bên phải
   - Chọn **Custom repositories**
     <img width="303" height="437" alt="image" src="https://github.com/user-attachments/assets/71489d94-bc79-4f12-9941-9c1ce56152e8" />

   - Điền `https://github.com/khaisilk1910/lich-block-am-duong-viet-nam` và chọn Dashboard và nhấn Add
     <img width="433" height="487" alt="image" src="https://github.com/user-attachments/assets/755a49cb-58a6-481d-b6ad-650017615e86" />

   - Quay lại HACS và nhập ô tìm kiếm `Lịch Block Âm Dương Việt Nam` và Tải về
     <img width="1658" height="326" alt="image" src="https://github.com/user-attachments/assets/70917f4b-5ff1-4bd6-b4f9-6e1e9acd4d86" />


2. Cài đặt thủ công
- Tải thư mục **lunar_calendar_card** về máy
- Copy thư mục **lunar_calendar_card** vào **/config/www/**
- Vào Edit Dashboard
- <img width="172" height="110" alt="image" src="https://github.com/user-attachments/assets/2447c0e3-0b85-4351-a8ed-51643e3e766c" />
- Vào tiếp 3 Chấm và chọn Manage resources
- <img width="291" height="279" alt="image" src="https://github.com/user-attachments/assets/ea5e337a-f9f1-4069-8f15-b9141169aee4" />
- Tiếp theo chọn Add Resource
- <img width="263" height="145" alt="image" src="https://github.com/user-attachments/assets/3089abce-4441-4e4c-a810-eac907cb8fdf" />
- Tiếp theo điền đường dẫn đến file **lich-block-am-duong-viet-nam.js** là **/local/lich-block-am-duong-viet-nam/lich-block-am-duong-viet-nam.js** và lựa chọn như hình ảnh
- <img width="568" height="495" alt="image" src="https://github.com/user-attachments/assets/b1b952d2-0630-4ca8-8fac-527a6fcf0db6" />
- Sau đó quay trở lại Dashboard mà bạn muốn thêm một thẻ mới.
- Vào Edit Dashboard
- <img width="172" height="110" alt="image" src="https://github.com/user-attachments/assets/2447c0e3-0b85-4351-a8ed-51643e3e766c" />
- Thêm thẻ mới và điền **type: custom:lich-block-am-duong-viet-nam**
- <img width="1028" height="769" alt="image" src="https://github.com/user-attachments/assets/fb11c232-2255-4232-b174-6cda12b4fb59" />
- Để xem lịch các tháng, các năm nhấn dấu **<< <** hoặc **> >>**
- <img width="509" height="545" alt="image" src="https://github.com/user-attachments/assets/84c55aa2-e4ca-4a18-ac35-89c49ad5150a" />




## Hình ảnh minh họa
<img width="508" height="542" alt="image" src="https://github.com/user-attachments/assets/a31ead07-6902-48e0-b124-f7d2f0a0d134" /><img width="509" height="543" alt="image" src="https://github.com/user-attachments/assets/dd78b6f4-01d3-4529-8573-cc46cb00f0f6" />
<img width="512" height="545" alt="image" src="https://github.com/user-attachments/assets/9cddd81c-0747-4c7f-9b6c-ed6eb4107620" /><img width="512" height="543" alt="image" src="https://github.com/user-attachments/assets/1e7871b9-d612-473a-bb95-062e02c90069" />

*Card mình làm phục vụ mục đích cá nhân và lấy nguồn Âm Lịch từ Ho Ngoc Duc [http://come.to/duc]*
