import { User } from "../model/User.js";
import { CoreController } from "./CoreController.js";

export class UserController extends CoreController {
  login() {
    this.loadView("login").then(() => {
      document
        .querySelector("#formLogin")
        .addEventListener("submit", (event) => {
          event.preventDefault();
          let email = document.querySelector("#email").value;
          let pass = document.querySelector("#password").value;
          console.log(email, pass);

          let user = new User();
          user.email = email;
          user.pass = pass;
          user.login().then((res) => {
            console.log(res);
            if (pass.length <= 8) {
              alert(`Ngắn vl, Dài thêm đi `);
            } else if (res.length == 0) {
              alert(`Email hoặc mật khẩu không đúng!`);
              location.search = "?user/login";
            } else {
              alert(`Đăng nhập thành công!`);
              localStorage.setItem("user", JSON.stringify(res[0]));
              location.search = "?page/home";
            }
          });
        });
    });
  }

  async signup() {
    await this.loadView("signup");
    document
      .querySelector("#fromSignup")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        let fullName = document.querySelector("#fullName").value;
        let email = document.querySelector("#email").value;
        let pass = document.querySelector("#password").value;
        console.log(fullName, email, pass);

        let user = new User();
        user.name = fullName;
        user.email = email;
        user.pass = pass;
        user.role = "customer";

        user.hasEmail().then((res) => {
          if (res.length == 0) {
            user.adduser();
            alert(`Đăng ký thành công!
Xin mời đăng nhập`);
            location.search = "?user/login";
          } else {
            alert(`Email ${email} đã tồn tại!
Vui lòng sử dụng email khác`);
          }
        });
      });
  }

  logout() {
    localStorage.removeItem("user");
    location.search = "?user/login";
  }

  async profile() {
    await this.loadView("profile");
    let superUser = JSON.parse(localStorage.getItem("user"));
    document.querySelector("#name").value = superUser.name;
    document.querySelector("#email").value = superUser.email;
    document.querySelector("#role").value = superUser.role;
    document
      .querySelector("#profileForm")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;
        let pass = document.querySelector("#pass").value;
        let re_pass = document.querySelector("#re_pass").value;

        let user = new User();
        user.id = superUser.id;
        user.name = name;
        user.email = email;
        user.role = superUser.role
        if (pass.length > 0 && pass == re_pass) {
          user.pass = pass;
        }
        user.save()
        localStorage.setItem('user',JSON.stringify(user))
        location.reload()
      });
  }
}
