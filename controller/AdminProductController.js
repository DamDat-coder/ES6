import { Cate } from "../model/Cate.js";
import { Product } from "../model/Product.js";
import { CoreController } from "./CoreController.js";

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export class AdminProductController extends CoreController {
  async list([page, sort = "id"]) {
    await this.loadView("admin_product");

    if (!page) page = 1;
    let proList = await Product.getAll(page,sort);
    let limit = 4;
    let currentPage = proList.prev == null ? 1 : proList.prev + 1;

    let showPageNum = (totalPage) => {
      return [...new Array(totalPage)]
        .map((value, index) => {
          let page = index + 1;
          return `<a href="?pro/list/${page}" class="page">${page}</a>`;
        })
        .join("");
    };

    let showPageBtn = () => {
      return `<a href="?pro/list/${proList.first}" class="page first"><<</a>
              <a href="?pro/list/${proList.prev}" class="page prev" ${
        currentPage == 1 ? "disabled" : ""
      }><</a>
              ${showPageNum(proList.pages)}
              <a href="?pro/list/${proList.next}" class="page next" ${
        currentPage == proList.last ? "disabled" : ""
      }>></a>
              <a href="?pro/list/${proList.last}" class="page last">>></a>`;
    };
    document.querySelector("#product-pagination").innerHTML = showPageBtn();

    proList.data.forEach((pro, index) => {
      document.querySelector("#pro-body").innerHTML += `
      <div class="product-table-row">
                <div class="product-table-cell">${
                  index + (limit * (currentPage - 1) + 1)
                }</div>
                <div class="product-table-cell">${pro.name}</div>
                <div class="product-table-cell">${pro.price}</div>
                <div class="product-table-cell" style="display: flex;justify-content: center;align-items: center;">
                    <img src="${pro.image}" alt="Product A" class="product-img">
                </div>
                <div class="product-table-cell">${pro.description}</div>
                <div class="product-table-cell">
                   <a href="?pro/update/${pro.id}" class="edit-btn">Sửa</a>
                    <a href="" class="delete-btn" data-id="${
                      pro.id
                    }" data-name="${pro.name}">Xóa</a>
                </div>
            </div>`;
    });
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        let id = btn.getAttribute("data-id");
        let name = btn.getAttribute("data-name");
        console.log(id);
        let ok = confirm(`Bạn đang xóa sản phẩm: ${name}
Bấm OK để xóa!`);
        if (ok) {
          let pro = new Product();
          pro.id = id;
          pro.delete();
          alert(`Xóa sản phẩm: ${name} thành công!`);
          location.reload();
        }
      });
    });

    if (sort != "id") {
      sort = document.querySelector(
        "#sort-by-id"
      ).href = `?pro/list/${currentPage}/id`;
    } else {
      document.querySelector(
        "#sort-by-id"
      ).href = `?pro/list/${currentPage}/-id`;
    }

    if (sort != "name") {
      sort = document.querySelector(
        "#sort-by-name"
      ).href = `?pro/list/${currentPage}/name`;
    } else {
      document.querySelector(
        "#sort-by-name"
      ).href = `?pro/list/${currentPage}/-name`;
    }
    if (sort != "price") {
      sort = document.querySelector(
        "#sort-by-price"
      ).href = `?pro/list/${currentPage}/price`;
    } else {
      document.querySelector(
        "#sort-by-price"
      ).href = `?pro/list/${currentPage}/-price`;
    }
    if (sort != "desc") {
      sort = document.querySelector(
        "#sort-by-desc"
      ).href = `?pro/list/${currentPage}/desc`;
    } else {
      document.querySelector(
        "#sort-by-desc"
      ).href = `?pro/list/${currentPage}/-desc`;
    }
  }
  async add() {
    await this.loadView("admin_product_add");
    let cateList = await Cate.getAll();
    cateList.forEach((cate, index) => {
      document.querySelector("#category").innerHTML += `  
            <option data-cate="${cate.id}">${cate.name}</option>
         >`;
    });

    document
      .querySelector("#formProduct")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        let name = document.querySelector("#name").value;
        let price = document.querySelector("#price").value;
        let image = document.querySelector("#image").value;
        let description = document.querySelector("#description").value;
        let category = document.querySelector("#category").value;

        let pro = new Product();
        pro.name = name;
        pro.price = price;
        pro.image = image;
        pro.description = description;
        pro.category = category;

        let hasName = await pro.hasName();
        if (hasName.length > 0) {
          alert(`Sản phẩm với tên: ${pro.name} đã tồn tại!
Không thể tạo với Sản phẩm với tên: ${pro.name} này`);
        } else {
          pro.addPro();
          alert(`Thêm sản phẩm thành công!`);
          location.search = "?pro/list";
        }
      });
  }

  async update([id]) {
    await this.loadView("admin_product_update");
    console.log(id);
    let pro = new Product();
    pro.id = id;
    await pro.getId(id);
    console.log(pro);

    let cateList = await Cate.getAll();

    // Thêm các option danh mục vào select
    cateList.forEach((cate) => {
      // So sánh cate.id với pro.category để đánh dấu option đúng
      document.querySelector("#category").innerHTML += `  
        <option value="${cate.id}" ${
        cate.name === pro.category ? "selected" : ""
      }>${cate.name}</option>
      `;
    });

    // Khi người dùng chọn danh mục mới
    document.querySelector("#category").addEventListener("change", (event) => {
      // Lấy giá trị của tên danh mục từ option đã chọn
      let name_cate_choose = event.target.selectedOptions[0].textContent; // Lấy tên của danh mục
      console.log(name_cate_choose);
    });

    // Điền thông tin sản phẩm vào các trường form
    document.querySelector("#name").value = pro.name;
    document.querySelector("#price").value = pro.price;
    document.querySelector("#description").value = pro.description;

    // Khi submit form để lưu sản phẩm
    document
      .querySelector("#formProduct")
      .addEventListener("submit", (event) => {
        event.preventDefault();

        // Cập nhật thông tin sản phẩm
        pro.name = document.querySelector("#name").value;
        pro.price = document.querySelector("#price").value;

        // Lấy tên danh mục từ select và gán vào thuộc tính category
        pro.category =
          document.querySelector("#category").selectedOptions[0].textContent; // Lấy tên danh mục, không phải id

        let description = document.querySelector("#description").value;
        if (description.length > 0) {
          pro.description = description;
        }

        // Lưu lại sản phẩm
        pro.save();

        alert(`Cập nhật sản phẩm thành công!`);
        location.search = `?pro/update/${pro.id}`;
      });
  }
}
