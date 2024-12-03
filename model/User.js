import { Database } from "./Database.js";
let limit = 4;
export class User {
  id;
  email;
  name;
  pass;
  role;

  async login() {
    let user = await Database.getData(
      `/users?email=${this.email}&pass=${this.pass}`
    );
    return user;
  }
  async hasEmail() {
    let user = await Database.getData(`/users?email=${this.email}`);
    return user;
  }
  adduser() {
    Database.insertData(`/users`, this);
  }
  save() {
    Database.updateData(`/users/${this.id}`, this);
  }
  static async getAll(page, sort = "id") {
    if (page) {
      return await Database.getData(
        `/users?_page=${page}&_per_page=${limit}&_sort=${sort}`
      );
    } else {
      return await Database.getData(`/users`);
    }
  }

  async getById() {
    let data = await Database.getData(`/users/${this.id}`);
    this.name = data.name;
    this.email = data.email;
    this.pass = data.pass;
    this.role = data.role;
  }

  delete() {
    Database.deleteData(`/users/${this.id}`);
  }
  static async search(keyword) {
    let data = await Database.getData(`/users`);
    return data.filter((user) => user.name.includes(keyword));
  }
}
