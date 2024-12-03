import { Product } from "../model/Product.js";
import { CoreController } from "./CoreController.js";

export class AdminPageController extends CoreController {
  async dashboard() {
    await this.loadView("admin_dashboard");

    // Cập nhật số lượng sản phẩm cho từng category
    document.querySelector("#tk-sofa").innerHTML =
      await Product.countByCategory("Sofa và Ghế");
    document.querySelector("#tk-ban-tra").innerHTML =
      await Product.countByCategory("Bàn trà");
    document.querySelector("#tk-ke-tivi").innerHTML =
      await Product.countByCategory("Kệ tivi");
    document.querySelector("#tk-tu-ke").innerHTML =
      await Product.countByCategory("Tủ và Kệ");

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    // const productBoard = await Product.getAllDashboard(); // console.log(productBoard);

    // let arrdDashBoardNum = [
    //   ["Danh mục", "Sản phẩm"],

    // ];

    // productBoard.forEach((item) => {
    //   // console.log(`Category: ${item.category}, Count: ${item.count}`);
    //   arrdDashBoardNum.push([`${item.category}`, `${item.count}`]);
    // });

    // function drawChart() {
    //   const data = google.visualization.arrayToDataTable(arrdDashBoardNum);

    //   const options = {
    //     title: "World Wide Wine Production",
    //   };

    //   const chart = new google.visualization.ColumnChart(
    //     document.getElementById("chart1")
    //   );
    //   chart.draw(data, options);
    // }

    async function setupChartDataAndDraw() {
      try {
        // Lấy dữ liệu từ Product.getAllDashboard
        const productBoard = await Product.getAllDashboard();

        // Khởi tạo mảng dữ liệu biểu đồ
        let arrdDashBoardNum = [
          ["Danh mục", "Sản phẩm"], // Tiêu đề các cột
        ];

        // Lặp qua từng danh mục và đẩy dữ liệu vào mảng
        productBoard.forEach((item) => {
          arrdDashBoardNum.push([item.category, item.count]); // Thêm dữ liệu vào mảng
        });

        // Kiểm tra dữ liệu sau khi tạo
        if (!Array.isArray(arrdDashBoardNum) || arrdDashBoardNum.length < 2) {
          throw new Error("Dữ liệu không hợp lệ để vẽ biểu đồ");
        }

        console.log("Chart data:", arrdDashBoardNum); // Kiểm tra dữ liệu biểu đồ

        // Gọi hàm vẽ biểu đồ với dữ liệu
        drawChart(arrdDashBoardNum);
      } catch (error) {
        console.error("Error setting up chart data:", error);
      }
    }

    // Hàm vẽ biểu đồ (không đổi)
    // function drawChart(arrdDashBoardNum) {
    //   try {
    //     const data = google.visualization.arrayToDataTable(arrdDashBoardNum);

    //     const options = {
    //       title: "Thống kê số lượng sản phẩm theo danh mục",
    //     };

    //     const chart = new google.visualization.ColumnChart(
    //       document.getElementById("chart1")
    //     );
    //     chart.draw(data, options);
    //   } catch (error) {
    //     // console.error("Error drawing chart:", error);
    //   }
    // }
    function drawChart(arrdDashBoardNum) {
      try {
        const data = google.visualization.arrayToDataTable(arrdDashBoardNum);

        const options = {
          title: "Thống kê số lượng sản phẩm theo danh mục",
          colors: ["#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#AB47BC"],
          bar: { groupWidth: "60%" }, // Độ rộng các cột
          legend: { position: "none" }, // Ẩn chú thích
        };

        const chart = new google.visualization.ColumnChart(
          document.getElementById("chart1")
        );
        chart.draw(data, options);
      } catch (error) {
        // console.error("Error drawing chart:", error);
      }
    }

    // Khởi động
    setupChartDataAndDraw();

    // Dữ liệu mẫu cho lượt truy cập
  }
}
