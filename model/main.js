// // Đảm bảo rằng script được tải sau khi DOM đã sẵn sàng
// document.addEventListener("DOMContentLoaded", function () {
//   // Gắn sự kiện click cho các mục trong sidebar
//   document
//     .getElementById("item-dashboard")
//     .addEventListener("click", function () {
//       updateContent("Dashboard", "Tổng hợp, phân tích");
//       renderDashboard();
//     });

//   document
//     .getElementById("item-products")
//     .addEventListener("click", function () {
//       updateContent("Sản phẩm", "Thông tin về các sản phẩm");
//       renderProducts();
//     });

//   document.getElementById("item-users").addEventListener("click", function () {
//     updateContent("Người dùng", "Thông tin người dùng");
//     renderUsers();
//   });

//   document.getElementById("item-posts").addEventListener("click", function () {
//     updateContent("Bài viết", "Thông tin về các bài viết");
//     renderPosts();
//   });

//   document
//     .getElementById("item-services")
//     .addEventListener("click", function () {
//       updateContent("Dịch vụ", "Thông tin về các dịch vụ");
//       renderServices();
//     });
// });

// // Hàm cập nhật title và nội dung chính
// function updateContent(title, description) {
//   document.querySelector(".title h3").innerText = title; // Cập nhật tiêu đề
//   document.querySelector(".title p").innerText = description; // Cập nhật mô tả
// }

// // Hàm để render nội dung cho Dashboard
// function renderDashboard() {
//   document.querySelector(".main-content").innerHTML = `
//         <div class="quantity-num">
//             <h5>Số sản phẩm còn lại</h5>
//             <div id="chart-quantity-num"></div>
//         </div>
//         <div class="access">
//             <h5>Lượt truy cập quý 3 năm 2024</h5>
//             <div id="chart-access"></div>
//         </div>
//     `;
//   // Render biểu đồ hoặc các nội dung khác ở đây
//   drawChart("chart-quantity-num");
//   drawAccessChart("chart-access");
// }

// // Hàm render cho các mục khác (ví dụ Sản phẩm, Người dùng, v.v.)
// function renderProducts() {
//   document.querySelector(".main-content").innerHTML = `
//         <div class="product-list">
//             <h5>Danh sách sản phẩm</h5>
//             <button class="btn-add-product">Thêm sản phẩm</button>
//             <table class="product-table">
//                 <thead>
//                     <tr>
//                         <th>Tên sản phẩm</th>
//                         <th>Mô tả</th>
//                         <th>Giá</th>
//                         <th>Thao tác</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>Sofa Da Hiện Đại</td>
//                         <td>Sofa da sang trọng mang lại vẻ đẹp hiện đại cho phòng khách của bạn.</td>
//                         <td>12,000,000 VND</td>
//                         <td>
//                             <button class="btn-edit">Sửa</button>
//                             <button class="btn-delete">Xóa</button>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>Bàn Trà Gỗ Tự Nhiên</td>
//                         <td>Bàn trà gỗ tự nhiên với thiết kế tối giản, phù hợp cho mọi không gian.</td>
//                         <td>3,500,000 VND</td>
//                         <td>
//                             <button class="btn-edit">Sửa</button>
//                             <button class="btn-delete">Xóa</button>
//                         </td>
//                     </tr>
//                     <!-- Các sản phẩm khác sẽ có cấu trúc tương tự -->
//                 </tbody>
//             </table>
//         </div>
//     `;
// }

// function renderUsers() {
//   document.querySelector(".main-content").innerHTML = `
        
//     `;
// }

// function renderPosts() {
//   document.querySelector(".main-content").innerHTML = `
//         <div class="post-list">
//             <h5>Danh sách bài viết</h5>
//             <p>Thông tin về các bài viết sẽ được hiển thị ở đây.</p>
//         </div>
//     `;
// }

// function renderServices() {
//   document.querySelector(".main-content").innerHTML = `
//         <div class="service-list">
//             <h5>Danh sách dịch vụ</h5>
//             <p>Thông tin về các dịch vụ sẽ được hiển thị ở đây.</p>
//         </div>
//     `;
// }

