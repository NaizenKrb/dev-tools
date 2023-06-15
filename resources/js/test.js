window.addEventListener("DOMContentLoaded", function(e) {
    document.querySelectorAll("input[type=color]").forEach(function(current) {
      var parent = current.parentElement;
      parent.classList.add("flex");
      
      let newEl = document.querySelector(".color-text");
      newEl.value = current.value;
      newEl.pattern = "#[0-9A-Fa-f]{6}";

      newEl.addEventListener("input", function(e) {
        if(e.target.validity.valid) {
          current.value = e.target.value;
        }
      });

      current.addEventListener("change", function(e) {
        newEl.value = e.target.value;
      });

    });
  });