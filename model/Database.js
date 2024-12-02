let APIurl = "http://localhost:3000";
export class Database {
  static async getData(url) {
    return await fetch(`${APIurl}${url}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }
  static insertData(url, data) {
    fetch(`${APIurl}${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }
  save() {
    Database.updateData(`/prducts/${this.id}`, this);
  }
  static updateData(url, data) {
    fetch(`${APIurl}${url}`, {
      method: "PATCH", // PUT : chỉ nhận giá trị được truyền lên //PATCH : sửa giá trị được truyền lên và giữ nguyên giá trị không được gọi
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }
  static deleteData(url) {
    fetch(`${APIurl}${url}`, {
      method: "DELETE", // PUT : chỉ nhận giá trị được truyền lên //PATCH : sửa giá trị được truyền lên và giữ nguyên giá trị không được gọi
    });
  }
}
