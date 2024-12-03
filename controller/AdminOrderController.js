import { Order } from "../model/Order.js";
import { CoreController } from "./CoreController.js";

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export class AdminOrderController extends CoreController {
  async list() {
    await this.loadView("admin_payment");

    // Đảm bảo phần tử `#order-body` tồn tại trước khi tiếp tục
    const paymentContainer = document.querySelector("#order-body");
    if (!paymentContainer) {
      console.error("Phần tử #order-body không tồn tại trong DOM.");
      return;
    }

    let pay_of_user = await Order.getAll();

    console.log(pay_of_user);

    // Sử dụng document fragment để cải thiện hiệu suất
    const fragment = document.createDocumentFragment();

    pay_of_user.forEach((item) => {
      const payRender = document.createElement("div");
      payRender.className = "table-row";

      payRender.innerHTML = `
        <div class="table-cell">${item.id}</div>
        <div class="table-cell">${item.date}</div>
        <div class="table-cell">${item.userEmail}</div>

        <div class="table-cell">
          <ul>
            ${item.productName.map((product) => `<li>${product}</li>`).join("")}
          </ul>
        </div>
        <div class="table-cell">${formatPrice(item.total)}₫</div>
        <div class="table-cell">
                   <a href="?order/viewDetail/${item.id}" class="edit-btn">Chi tiết đơn hàng</a>

                </div>
      `;

      fragment.appendChild(payRender);
    });

    paymentContainer.appendChild(fragment);
  }
  async viewDetail(orderId) {
    await this.loadView('admin_detail_order')
    const orderDetail = await Order.getById(orderId);
  
    if (!orderDetail) {
      alert("Không tìm thấy đơn hàng!");
      return;
    }
  
    // Đảm bảo productName là một mảng
    const products = Array.isArray(orderDetail.productName) ? orderDetail.productName : [];
  
    const detailContainer = document.querySelector(".order-detail-container");
    detailContainer.innerHTML = `
      <div class="order-detail">
        <h2>Chi tiết đơn hàng #${orderDetail.id}</h2>
        <p><strong>Ngày mua hàng:</strong> ${orderDetail.date}</p>
        <p><strong>Email khách hàng:</strong> ${orderDetail.userEmail}</p>
        <div>
          <strong>Sản phẩm đã mua:</strong>
          <ul>
            ${products.map(product => `<li>${product}</li>`).join("")}
          </ul>
        </div>
        <p><strong>Tổng tiền:</strong> ${orderDetail.total}₫</p>
    <a href="?order/list"><button class="close-detail-btn">Đóng</button></a>
      </div>
    `;
  
    detailContainer.style.display = "block";
  
    document.querySelector(".close-detail-btn").addEventListener("click", () => {
      detailContainer.style.display = "none";
    });
  }
  
}
