import { Product } from "../model/Product.js";
import { CoreController } from "./CoreController.js";

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  
  export class ProductController extends CoreController {
    async detail([id]) {
      await this.loadView("detail");
    
      // Lấy productId từ URL hoặc từ localStorage
      const productId = localStorage.getItem("productId");
    
      if (productId) {
        // Sử dụng productId để lấy dữ liệu sản phẩm từ API hoặc nguồn dữ liệu của bạn
        let product = await this.getProductById(productId);
    
        // Cập nhật thông tin sản phẩm lên trang chi tiết
        document.querySelector("#pro-name").innerText = product.name;
        document.querySelector("#pro-price").innerText = formatPrice(product.price);
        document.querySelector("#pro-description").innerText = product.description;
        document.querySelector("#pro-id").innerText = product.id;
        document.querySelector("#pro-image").src = product.image;
      } else {
        alert("Không có sản phẩm này.");
        window.location.href = '/';  // Điều hướng về trang chủ nếu không có thông tin sản phẩm
      }
    }
    
    // Hàm lấy thông tin sản phẩm từ API hoặc nguồn dữ liệu của bạn
    async getProductById(id) {
      const response = await fetch(`http://localhost:3000/products/${id}`);
      const data = await response.json();
      return data;
    }
    
    
  }