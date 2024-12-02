import { AdminCateController } from "../controller/AdminCateController.js";
import { AdminPageController } from "../controller/AdminPageController.js";
import { AdminProductController } from "../controller/AdminProductController.js";
import { AdminUserController } from "../controller/AdminUserController.js";

let [ctrl, action, ...params] = location.search.slice(1).split("/");
let pageCtrl = new AdminPageController();
let userCtrl = new AdminUserController();
let proCtrl = new AdminProductController();
let cateCtrl = new AdminCateController();

switch (ctrl) {
  case "page":
    pageCtrl[action](params);
    break;
  case "user":
    userCtrl[action](params);
    break;
  case "pro":
    proCtrl[action](params);
    break;
  case "cate":
    cateCtrl[action](params);
    break;
  default:
    pageCtrl.dashboard();
    break;
}
