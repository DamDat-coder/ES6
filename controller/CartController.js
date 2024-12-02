import { Product } from "../model/Product";
import { CoreController } from "./CoreController";

export class CartController extends CoreController {
    async cart([id]){
        await this.loadView("detail");
        let pro = new Product()
        pro.id = id
        await pro.getById()
        console.log(pro);

        await pro.getById()

        document.querySelector("#pro-name").innerText = pro.name
        document.querySelector("#pro-price").innerText = formatPrice(pro.price)
        document.querySelector("#pro-description").innerText = pro.description
        document.querySelector("#pro-id").innerText = pro.id
        document.querySelector("#pro-image").src = pro.image



        
    }
}
