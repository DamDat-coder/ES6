import { ProductController } from "../controller/ProductController.js";
import { PageController } from "../controller/PageController.js";
import { UserController } from "../controller/UserController.js";

let [ctrl, action, ...params] = location.search.slice(1).split("/");

document.addEventListener("DOMContentLoaded", function() {
  let superUser = {
    isLogin: false
  };

  if (localStorage.getItem("user") !== null) {
    superUser = JSON.parse(localStorage.getItem("user"));
    superUser.isLogin = true;
  }

  if (superUser.isLogin) {
    document.querySelector("#topbar-menu").innerHTML +=
      `<li><a class="--item" href="?user/profile">xin chào ${superUser.name}</a></li>`;
  } else {
    document.querySelector("#topbar-menu").innerHTML +=
      `<li><a class="--item" href="?user/login">đăng nhập</a></li>`;
  }
});


let pageCtrl = new PageController();
let userCtrl = new UserController();
let proCtrl = new ProductController();

switch (ctrl) {
  case "page":
    pageCtrl[action]();
    break;
  case "user":
    userCtrl[action]();
    break;
  case "pro":
    proCtrl[action](params);
    break;
  default:
    pageCtrl.home();
    break;
}
