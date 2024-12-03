import { User } from "../model/User.js";
import { CoreController } from "./CoreController.js";

export class AdminUserController extends CoreController {
  async list([page, sort = "id"]) {
    await this.loadView("admin_user");

    if (!page) page = 1;
    let userList = await User.getAll(page, sort);
    let limit = 4;
    let currentPage = userList.prev == null ? 1 : userList.prev + 1;

    let showPageNum = (totalPage) => {
      return [...new Array(totalPage)]
        .map((value, index) => {
          let page = index + 1;
          return `<a href="?user/list/${page}" class="page ${
            page == currentPage ? "active" : ""
          }">${page}</a>`;
        })
        .join("");
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

    let renderUserList = (userList) => {
      const resultList = document.querySelector("#result-list ul"); // Lấy phần tử ul chứa kết quả tìm kiếm
      resultList.innerHTML = ""; // Xóa danh sách kết quả cũ trước khi hiển thị lại

      // Nếu không có người dùng nào, hiển thị thông báo
      if (userList.length === 0) {
        resultList.innerHTML = "<li>Không tìm thấy kết quả</li>";
        return;
      }

      // Duyệt qua các người dùng đã lọc và hiển thị chúng
      userList.forEach((user) => {
        resultList.innerHTML += `<li><a href="?user/update/${user.id}">${user.name}</a></li>`;
      });
    };

    if (sort != "name") {
      sort = document.querySelector(
        "#sort-by-name"
      ).href = `?user/list/${currentPage}/name`;
    } else {
      document.querySelector(
        "#sort-by-name"
      ).href = `?user/list/${currentPage}/-name`;
    }
    if (sort != "id") {
      sort = document.querySelector(
        "#sort-by-id"
      ).href = `?user/list/${currentPage}/id`;
    } else {
      document.querySelector(
        "#sort-by-name"
      ).href = `?user/list/${currentPage}/-id`;
    }

    if (sort != "role") {
      sort = document.querySelector(
        "#sort-by-role"
      ).href = `?user/list/${currentPage}/role`;
    } else {
      document.querySelector(
        "#sort-by-role"
      ).href = `?user/list/${currentPage}/-role`;
    }

    if (sort != "email") {
      sort = document.querySelector(
        "#sort-by-email"
      ).href = `?user/list/${currentPage}/email`;
    } else {
      document.querySelector(
        "#sort-by-email"
      ).href = `?user/list/${currentPage}/-email`;
    }

    // Lắng nghe sự kiện nhập liệu trong ô input
    const searchInput = document.querySelector(".keyword");
    searchInput.addEventListener("input", (event) => {
      const searchTerm = event.target.value.toLowerCase().trim(); // Lấy từ khóa và chuyển thành chữ thường

      // Kiểm tra nếu ô input trống thì không tìm kiếm
      if (searchTerm === "") {
        renderUserList(userList.data); // Hiển thị lại toàn bộ danh sách người dùng nếu không có từ khóa
        return;
      }

      // Lọc danh sách người dùng theo từ khóa
      let filteredUsers = userList.data.filter(
        (user) => user.name.toLowerCase().includes(searchTerm) // Tìm kiếm theo tên người dùng
      );

      renderUserList(filteredUsers); // Hiển thị danh sách người dùng đã lọc
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
