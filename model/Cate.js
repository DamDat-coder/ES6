import { Database } from "./Database.js";
let limit = 4;
export class Cate {
  id;
  name;
  desc;

  hasName() {
    let cate = Database.getData(`/cate?name=${this.name}`);
    return cate;
  }

  static async getAll(page) {
    if (page) {
      return await Database.getData(
        `/cate?_page=${page}&_per_page=${limit}`
      );
    } else {
      return await Database.getData(`/cate`);
    }
  }

  async getById() {
    let data = await Database.getData(`/cate/${this.id}`);
    this.name = data.name;
    this.desc = data.desc;
  }

  add() {
    Database.insertData(`/cate`, this);
  }
  save() {
    Database.updateData(`/cate/${this.id}`, this);
  }

  delete() {
    Database.deleteData(`/cate/${this.id}`);
  }
}
