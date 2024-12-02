import { Database } from "./Database.js";
let limit = 4;
export class Product {
  id;
  name;
  price;
  description;
  image;

  hasName() {
    let product = Database.getData(`/products?name=${this.name}`);
    return product;
  }
  addPro() {
    Database.insertData(`/products`, this);
  }
  save() {
    Database.updateData(`/products/${this.id}`, this);
  }

  static async getAll(page) {
    if (page) {
      return await Database.getData(
        `/products?_page=${page}&_per_page=${limit}`
      );
    } else {
      return await Database.getData(`/products`);
    }
  }
  static async getAllCate() {
    return await Database.getData(`/products/`);
  }

  static async getById(productId) {
    let products = await Database.getData("/products");
    return products.find((product) => product.id === productId);
  }

  static addToCart(productId) {
    // Lấy sản phẩm từ danh sách sản phẩm
    Product.getById(productId).then((product) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1; // Tăng số lượng nếu sản phẩm đã có
      } else {
        // Nếu chưa có, thêm mới vào giỏ hàng
        cart.push({ ...product, quantity: 1 });
      }

      // Lưu lại giỏ hàng vào localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Sản phẩm đã được thêm vào giỏ hàng");
    });
  }
  delete() {
    Database.deleteData(`/products/${this.id}`);
  }
  async getId() {
    let data = await Database.getData(`/products/${this.id}`);
    this.name = data.name;
    this.price = data.price;
    this.description = data.description;
    this.category = data.category;
    this.image = data.image;
  }
  async updateCategoryForProducts(oldCategoryName, newCategoryName) {
    let products = await Product.getAll();
    products.forEach(async (product) => {
      if (product.category === oldCategoryName) {
        product.category = newCategoryName;
        await product.save();
      }
    });
  }
}