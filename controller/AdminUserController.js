import { User } from "../model/User.js";
import { CoreController } from "./CoreController.js";

export class AdminUserController extends CoreController {
  async list([page]) {
    await this.loadView("admin_user");

    if (!page) page = 1;
    let userList = await User.getAll(page);
    let limit = 4;
    let currentPage = userList.prev == null ? 1 : userList.prev + 1;

    let showPageNum = (totalPage) => {
      return [ ...new Array(totalPage)].map((value, index) => {
        let page = index + 1;
        return `<a href="?user/list/${page}" class="page">${page}</a>`;
      }).join('');

      
    };


    let showPageBtn = () => {
      return `<a href="?user/list/${userList.first}" class="page first"><<</a>
              <a href="?user/list/${userList.prev}" class="page prev" ${
        currentPage == 1 ? "disabled" : ""
      }><</a>
              ${showPageNum(userList.pages)}
              <a href="?user/list/${userList.next}" class="page next" ${
        currentPage == userList.last ? "disabled" : ""
      }>></a>
              <a href="?user/list/${userList.last}" class="page last">>></a>`;
    };
    document.querySelector("#pagination").innerHTML = showPageBtn();

    userList.data.forEach((user, index) => {
      document.querySelector("#body").innerHTML += `
            <div class="table-row">
                <div class="table-cell">${
                  index + (limit * (currentPage - 1) + 1)
                }</div>
                <div class="table-cell">${user.name}</div>
                <div class="table-cell">${user.email}</div>
                <div class="table-cell">${user.role}</div>
                <div class="table-cell">
                    <a href="?user/update/${user.id}" class="edit-btn">Sửa</a>
                    <a href="" class="delete-btn" data-id="${
                      user.id
                    }" data-name="${user.name}">Xóa</a>
                </div>
            </div>`;
    });
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        let id = btn.getAttribute("data-id");
        let name = btn.getAttribute("data-name");
        console.log(id);
        let ok = confirm(`Bạn đang xóa tài khoản: ${name}
Bấm OK để xóa!`);
        if (ok) {
          let user = new User();
          user.id = id;
          user.delete();
          alert(`Xóa tài khoản: ${name} thành công!`);
          location.reload();
        }
      });
    });
  }

  async add() {
    await this.loadView("admin_user_add");
    document
      .querySelector("#formUser")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        let role = document.querySelector("#role").value;

        let user = new User();
        user.name = name;
        user.email = email;
        user.pass = password;
        user.role = role;

        let hasEmail = await user.hasEmail();
        if (hasEmail.length > 0) {
          alert(`Email đã tồn tại!
Không thể tạo với email này`);
        } else {
          user.adduser();
          alert(`Tạo tài khoản thành công!`);
          location.search = "?user/list";
        }
      });
  }

  async update([id]) {
    await this.loadView("admin_user_update");
    console.log(id);
    let user = new User();
    user.id = id;
    await user.getById();
    console.log(user);

    document.querySelector("#name").value = user.name;
    document.querySelector("#email").value = user.email;
    document.querySelector("#role").value = user.role;

    document.querySelector("#formUser").addEventListener("submit", (event) => {
      event.preventDefault();
      user.name = document.querySelector("#name").value;
      user.email = document.querySelector("#email").value;
      user.role = document.querySelector("#role").value;

      let password = document.querySelector("#password").value;
      if (password.length > 0) {
        user.pass = password;
      }
      user.save();
      alert(`Cập nhật tài khoản thành công!`);
      location.search = `?user/update/${user.id}`;
    });
  }
}
