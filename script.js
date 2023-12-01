document.addEventListener("DOMContentLoaded", function () {
  const layers = document.querySelectorAll(".parallax-layer");
  const mainBuildingLayer = document.querySelector(".building-main-img");

  let latestScrollY = window.scrollY;
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const deltaScroll = scrollY - latestScrollY;

    layers.forEach(function (layer, index) {
      const speed = 0.04 * (index + 1); // Adjust the speed as needed
      const yPos = scrollY * speed;

      // Background layers move slower than the main building layer
      const translateY = yPos + deltaScroll * (speed * 0.5); // Adjust the speed factor for background layers

      layer.style.transform = `translate3d(0, ${translateY}px, 0)`;
    });

    // Scrolling stops once the bottom of the building hits the bottom of the viewport
    const mainBuildingRect = mainBuildingLayer.getBoundingClientRect();
    if (mainBuildingRect.bottom <= window.innerHeight) {
      window.removeEventListener("scroll", requestTick);
    }

    latestScrollY = scrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);
});
