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
     
   - Tải file ảnh hình nền:
      - Truy cập: `https://github.com/khaisilk1910/lich-block-am-duong-viet-nam/tree/main/images`
        
      - Tải tất cả các ảnh trong thư mục `images` về máy
        
      - Tạo mới folder `images` trong `\config\www\community\lich-block-am-duong-viet-nam\` và dán tất cả các file ảnh vào thư mục `images`
        <img width="1063" height="242" alt="image" src="https://github.com/user-attachments/assets/6546c7f0-b80e-4798-a773-76dfb384d019" />
        <img width="1255" height="284" alt="image" src="https://github.com/user-attachments/assets/1a16e47a-9a9e-408e-b90b-b63ca520500d" />
        
   - Sau đó quay trở lại Dashboard mà bạn muốn thêm một thẻ mới.
     
   - Vào Edit Dashboard
     
     <img width="172" height="110" alt="image" src="https://github.com/user-attachments/assets/2447c0e3-0b85-4351-a8ed-51643e3e766c" />
     
   - Thêm thẻ mới và điền **type: custom:lich-block-am-duong-viet-nam**
     
     <img width="1020" height="768" alt="image" src="https://github.com/user-attachments/assets/2aa98f8f-461a-4397-99a3-cf0fdc22755a" />

   - Để xem lịch các tháng, các năm nhấn dấu **<< <** hoặc **> >>**
     
     <img width="505" height="541" alt="image" src="https://github.com/user-attachments/assets/16f9fab1-c6eb-49b7-97fb-dfb23f9ffeb3" />
- Để quay lại ngày hiện tại nhấn vào vị trí như ảnh
  
  <img width="509" height="543" alt="image" src="https://github.com/user-attachments/assets/ae841027-586b-4f80-805e-38be74392f94" />



2. Cài đặt thủ công
- Tải thư mục **lunar_calendar_card** về máy
- Copy thư mục **lunar_calendar_card** vào **/config/www/**
- Vào Edit Dashboard
  
  <img width="172" height="110" alt="image" src="https://github.com/user-attachments/assets/2447c0e3-0b85-4351-a8ed-51643e3e766c" />

- Vào tiếp 3 Chấm và chọn Manage resources
  
  <img width="291" height="279" alt="image" src="https://github.com/user-attachments/assets/ea5e337a-f9f1-4069-8f15-b9141169aee4" />
  
- Tiếp theo chọn Add Resource
  
  <img width="263" height="145" alt="image" src="https://github.com/user-attachments/assets/3089abce-4441-4e4c-a810-eac907cb8fdf" />

- Tiếp theo điền đường dẫn đến file **lich-block-am-duong-viet-nam.js** là **/local/lich-block-am-duong-viet-nam/lich-block-am-duong-viet-nam.js** và lựa chọn như hình ảnh
  
  <img width="568" height="495" alt="image" src="https://github.com/user-attachments/assets/b1b952d2-0630-4ca8-8fac-527a6fcf0db6" />

- Tải file ảnh hình nền:
   - Truy cập: `https://github.com/khaisilk1910/lich-block-am-duong-viet-nam/tree/main/images`
   - Tải tất cả các ảnh trong thư mục `images` về máy
   - Tạo mới folder `images` trong `\config\www\community\lich-block-am-duong-viet-nam\` và dán tất cả các file ảnh vào thư mục `images`
     
     <img width="1063" height="242" alt="image" src="https://github.com/user-attachments/assets/6546c7f0-b80e-4798-a773-76dfb384d019" />
     <img width="1255" height="284" alt="image" src="https://github.com/user-attachments/assets/1a16e47a-9a9e-408e-b90b-b63ca520500d" />
     
- Sau đó quay trở lại Dashboard mà bạn muốn thêm một thẻ mới.
  
- Vào Edit Dashboard
  
  <img width="172" height="110" alt="image" src="https://github.com/user-attachments/assets/2447c0e3-0b85-4351-a8ed-51643e3e766c" />
  
- Thêm thẻ mới và điền **type: custom:lich-block-am-duong-viet-nam**
  
  <img width="1020" height="768" alt="image" src="https://github.com/user-attachments/assets/2aa98f8f-461a-4397-99a3-cf0fdc22755a" />
  
- Để xem lịch các tháng, các năm nhấn dấu **<< <** hoặc **> >>**
  
  <img width="505" height="541" alt="image" src="https://github.com/user-attachments/assets/16f9fab1-c6eb-49b7-97fb-dfb23f9ffeb3" />
  
- Để quay lại ngày hiện tại nhấn vào vị trí như ảnh
  
  <img width="509" height="543" alt="image" src="https://github.com/user-attachments/assets/ae841027-586b-4f80-805e-38be74392f94" />



## Hình ảnh minh họa

<img width="502" height="542" alt="image" src="https://github.com/user-attachments/assets/dab7c097-e47b-4edd-8065-1fe305febc7e" /><img width="504" height="535" alt="image" src="https://github.com/user-attachments/assets/336e5d17-9ec1-4c1b-8c2e-4b1032496fd0" />
<img width="553" height="539" alt="image" src="https://github.com/user-attachments/assets/0ba1009f-2c55-4ded-8662-00a99f230db9" /><img width="504" height="539" alt="image" src="https://github.com/user-attachments/assets/4ba88ff2-3aba-44d3-95c1-a7afed9a6452" />




*Card mình làm phục vụ mục đích cá nhân và lấy nguồn Âm Lịch từ Ho Ngoc Duc [http://come.to/duc]*
