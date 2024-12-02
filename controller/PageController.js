import { Product } from "../model/Product.js";
import { CoreController } from "./CoreController.js";

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export class PageController extends CoreController {
  async home() {
    await this.loadView("home");
  }

  async products() {
    this.loadView("product-list");
    let proList = await Product.getAll();

    document.querySelector(".product-list").innerHTML = "";

    proList.forEach((product) => {
      document.querySelector(".product-list").innerHTML += `
        <div class="product-list__item">
          <div class="product-list__item-detail">
            <div class="-img">
              <img src="${product.image}" alt="${product.name}" />
            </div>
            <p class="-name">${product.name}</p>
            <p class="-price">giá: ${formatPrice(product.price)} VND</p>
          </div>
          <a href="?pro/detail/${product.id}" class="detail-btn" 
             onclick="localStorage.setItem('productId', '${product.id}')">
            <i>
              <img src="../public/img/right-arrow.png" alt="right-arrow-icon" />
            </i>
            <span>chi tiết</span>
          </a>
          <br>
          <a href="#" class="detail-btn add-to-cart-btn" data-product-id="${product.id}">
            <i>
              <img src="../public/img/right-arrow.png" alt="right-arrow-icon" />
            </i>  
            <span>thêm vào giỏ hàng</span>
          </a>
        </div>`;
    });
    
    
    
// 
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const productId = button.getAttribute("data-product-id");
        Product.addToCart(productId);
      });
    });
  }

  async cart() {
    await this.loadView("cart");

    // Lấy giỏ hàng từ localStorage
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (Array.isArray(cartItems) && cartItems.length > 0) {
      const cartContainer = document.querySelector(".render");
      cartContainer.innerHTML = ""; // Làm sạch giỏ hàng trước khi thêm sản phẩm

      // Lặp qua các sản phẩm trong giỏ hàng và hiển thị
      cartItems.forEach((item) => {
        cartContainer.innerHTML += `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" />
            <div class="item-details">
              <div class="item-title">${item.name}</div>
              <div class="item-price">${this.formatPrice(item.price)}₫</div>
              <div class="quantity-controls">
                <button class="decrease-btn" data-product-id="${
                  item.id
                }">-</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="increase-btn" data-product-id="${
                  item.id
                }">+</button>
              </div>
            </div>
            <button class="remove-button" data-product-id="${
              item.id
            }">Xóa</button>
          </div>
        `;
      });

      // Tính tổng tiền của các sản phẩm trong giỏ hàng
      this.updateTotal(cartItems);

      // Gắn sự kiện cho các nút "Xóa", "Tăng", "Giảm"
      this.setupEventListeners(cartItems);
    } else {
      const cartContainer = document.querySelector(".cart-container");
      cartContainer.innerHTML =
        "<p>Giỏ hàng của bạn hiện tại chưa có sản phẩm.</p>";
    }
  }

  // Hàm cập nhật tổng tiền trong giỏ hàng
  updateTotal(cartItems) {
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    document.querySelector(".cart-total span:last-child").innerText =
      this.formatPrice(totalPrice) + "₫";
  }

  // Hàm thiết lập các sự kiện cho nút trong giỏ hàng
  setupEventListeners(cartItems) {
    // Xóa sản phẩm khỏi giỏ hàng
    document.querySelectorAll(".remove-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = button.getAttribute("data-product-id");
        this.removeFromCart(productId, cartItems); // Gọi hàm xóa sản phẩm
      });
    });

    // Tăng số lượng sản phẩm
    document.querySelectorAll(".increase-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = button.getAttribute("data-product-id");
        this.updateQuantity(productId, cartItems, 1); // Tăng số lượng
      });
    });

    // Giảm số lượng sản phẩm
    document.querySelectorAll(".decrease-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = button.getAttribute("data-product-id");
        this.updateQuantity(productId, cartItems, -1); // Giảm số lượng
      });
    });
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateQuantity(productId, cartItems, quantityChange) {
    const item = cartItems.find((item) => item.id === productId);
    if (item) {
      item.quantity += quantityChange;
      if (item.quantity <= 0) {
        item.quantity = 1; // Đảm bảo số lượng không nhỏ hơn 1
      }

      localStorage.setItem("cart", JSON.stringify(cartItems)); // Lưu lại vào localStorage
      this.cart(); // Render lại giỏ hàng
    }
  }

  // Hàm xóa sản phẩm khỏi giỏ hàng
  removeFromCart(productId, cartItems) {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Lưu lại giỏ hàng
    this.cart(); // Render lại giỏ hàng
  }

  // Hàm format giá tiền (giống như trong ProductController.js)
  formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Hàm xử lý chi tiết sản phẩm (nếu cần gọi từ ProductController)
  async productDetail(id) {
    const productController = new ProductController();
    await productController.detail([id]); // Gọi phương thức chi tiết sản phẩm trong ProductController
  }
}