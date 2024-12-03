import { Database } from "./Database.js";

export class Order {
  id;
  productName;
  userEmail;
  total;
  date;
  static async getAll() {
    return await Database.getData(`/pay`);
  }
  save() {
    Database.insertData(`/pay`, this);
  }

  static async getById(orderId) {
    return await Database.getData(`/pay/${orderId}`)
  }
}
