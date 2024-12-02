import { Cate } from "../model/Cate.js";
import { Product } from "../model/Product.js";
import { CoreController } from "./CoreController.js";

export class AdminCateController extends CoreController {
  async list([page]) {
    await this.loadView("admin_cate");

    let cateList = await Cate.getAll();

    if (!page) page = 1;
    let limit = 4;
    let currentPage = cateList.prev == null ? 1 : cateList.prev + 1;

    let showPageNum = (totalPage) => {
      return [...new Array(totalPage)]
        .map((value, index) => {
          let page = index + 1;
          return `<a href="?cate/list/${page}" class="page">${page}</a>`;
        })
        .join('');
    };

    let showPageBtn = () => {
      return `<a href="?cate/list/${cateList.first}" class="page first"><<</a>
              <a href="?cate/list/${cateList.prev}" class="page prev" ${
        currentPage == 1 ? "disabled" : ""
      }><</a>
              ${showPageNum(cateList.pages)}
              <a href="?cate/list/${cateList.next}" class="page next" ${
        currentPage == cateList.last ? "disabled" : ""
      }>></a>
              <a href="?cate/list/${cateList.last}" class="page last">>></a>`;
    };
    document.querySelector("#cate_pagination").innerHTML = showPageBtn();

    cateList.forEach((cate, index) => {
      document.querySelector("#cate-body").innerHTML += `
                <div class="table-row body">
                <div class="table-cell">${index + (limit * (currentPage - 1) + 1)}</div>
                <div class="table-cell">${cate.name}</div>
                <div class="table-cell">${cate.desc}</div>
                <div class="product-table-cell">
                   <a href="?cate/update/${cate.id}" class="edit-btn">Sửa</a>
                    <a href="" class="delete-btn" data-id="${cate.id}" data-name="${cate.name}">Xóa</a>
                </div>
                </div>`;
      console.log(cate);
    });
  }
  async add() {
    await this.loadView("admin_cate_add");
    document
      .querySelector("#formCate")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        let name = document.querySelector("#name").value;
        let desc = document.querySelector("#desc").value;

        let cate = new Cate();
        cate.name = name;
        cate.desc = desc;

        let hasName = await cate.hasName();
        if (hasName.length > 0) {
          alert(`Tên danh mục: ${cate.name} đã tồn tại!
Không thể tạo với Tên danh mục: ${cate.name} này`);
        } else {
          cate.add();
          alert(`Tạo danh mục thành công!`);
          location.search = "?cate/list";
        }
      });
  }

  async update([id]) {
    await this.loadView("admin_cate_update");
    console.log(id);
    let cate = new Cate();
    cate.id = id;
    await cate.getById();
    console.log(cate);

    document.querySelector("#name").value = cate.name;
    document.querySelector("#desc").value = cate.desc;

    document.querySelector("#formCate").addEventListener("submit", (event) => {
      event.preventDefault();
      cate.name = document.querySelector("#name").value;

      let desc = document.querySelector("#desc").value;
      if (desc.length > 0) {
        cate.desc = desc;
      }
      cate.save();
      alert(`Cập nhật tài khoản thành công!`);
      location.search = `?cate/update/${cate.id}`;
    });
    // Xử lý sự kiện khi form được submit
    //   document.querySelector("#formCate").addEventListener("submit", async (event) => {
    //     event.preventDefault();

    //     // Lưu lại tên danh mục cũ
    //     const oldCategoryName = cate.name;

    //     // Lấy giá trị mới từ form
    //     cate.name = document.querySelector("#name").value;
    //     let desc = document.querySelector("#desc").value;
    //     if (desc.length > 0) {
    //         cate.desc = desc;
    //     }

    //     // Lưu thay đổi danh mục
    //     await cate.save();

    //     // Cập nhật các sản phẩm liên quan
    //     await Product.updateCategoryForProducts(oldCategoryName, cate.name);
    //     alert(`Cập nhật danh mục và sản phẩm liên quan thành công!`);
    //     location.search = `?cate/update/${cate.id}`;
    // });
  }
}
