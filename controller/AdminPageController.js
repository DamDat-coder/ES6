import { CoreController } from "./CoreController.js";

// function formatPrice(price) {
//   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// }

export class AdminPageController extends CoreController {
  dashboard(){
    this.loadView("admin_dashboard")
  }
}
