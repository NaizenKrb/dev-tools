var step1 = document.querySelector(".step1");
var step2 = document.querySelector(".step2");

var head1 = document.querySelector(".head1");
var head2 = document.querySelector(".head2");

var stepNextBtn = document.querySelector(".step-next-btn");
var stepPrevBtn = document.querySelector(".step-prev-btn");

stepNextBtn.addEventListener("click", function () {
  step1.classList.add("translate-x-0")
  step1.classList.add("opacity-0")
  step1.classList.add("absolute")
  step1.classList.remove("relative")
  step1.classList.add("-translate-x-full")

  step2.classList.remove("translate-x-full")
  step2.classList.remove("absolute")
  step2.classList.remove("opacity-0")
  step2.classList.add("opacity-100")
  ;
}
);

stepPrevBtn.addEventListener("click", function () {
  step2.classList.add("translate-x-full")
  step2.classList.add("opacity-0")
  step2.classList.add("absolute")
  step2.classList.remove("relative")
  step2.classList.remove("opacity-100")

  step1.classList.remove("-translate-x-full")
  step1.classList.remove("absolute")
  step1.classList.remove("opacity-0")
  step1.classList.add("opacity-100")
  ;
}
);
