export class CoreController {
  async loadView(viewName) {
    return fetch(`http://127.0.0.1:5500/view/${viewName}.html`)

    .then((res) => res.text())
    .then((html)=>{
      document.querySelector("main").innerHTML = html;
    })
  }
}