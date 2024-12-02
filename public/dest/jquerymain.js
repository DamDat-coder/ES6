// // // Header
// // $(window).on("scroll", function () {
// //   let scrollPosition = $(window).scrollTop();
// //   let headerActiveEdge =
// //     $(".main__sidebar-btn").offset().top +
// //     $(".main__sidebar-btn").outerHeight();
// //   if (scrollPosition >= headerActiveEdge) {
// //     $(".header").addClass("--active");
// //   } else {
// //     $(".header").removeClass("--active");
// //   }
// // });

// // Slider
// // let carousel = $(".slider__wrapper");
// // let dots = $(".slider__bottom-paging .dots li");
// // carousel.flickity({
// //   // option
// //   cellAlign: "left",
// //   contain: true,
// //   wrapAround: true,
// //   prevNextButtons: false,
// //   pageDots: false,
// //   on: {
// //     // change: (index) => {
// //     //     /*--------------*/
// //     //     let number = $(".number span");
// //     //     number.text((index + 1).toString().padStart(2, 0));
// //     //     /*--------------*/
// //     //     dots.removeClass("--active");
// //     //     dots.eq(index).addClass("--active");
// //     // },
// //   },
// // });

// // flickity control
// $(".slider__bottom-control #prev").on("click", () => {
//   carousel.flickity("previous");
// });
// $(".slider__bottom-control #next").on("click", () => {
//   carousel.flickity("next");
// });
// // $(".slider__bottom-paging .dots").on("click", "li", function () {
// //     let clickedIndex = $(this).index();

// //     carousel.flickity("select", clickedIndex);
// // });

// // Sidebar
// $(".main__sidebar-btn").on("click", function () {
//   $("body, html").scrollTop(0);
//   $(".sidebar").addClass("--active");
//   $(".main__backdrop").addClass("--active");
//   $("body, html").addClass("--active");
// });

// $(
//   ".main__backdrop, .sidebar .sidebar__middle .sidebar__middle-logo .-close"
// ).on("click", function () {
//   $(".sidebar").removeClass("--active");
//   $(".main__backdrop").removeClass("--active");
//   $("body, html").removeClass("--active");
// });

// // Back to top
// $(".footer__scroll-top").on("click", function () {
//   $("body, html").scrollTop(0);
// });
