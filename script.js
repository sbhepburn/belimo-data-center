// Function to handle hotspot selection
const selectHotspot = (e) => {
    const clickedHotspot = e.target.parentElement;
    const container = clickedHotspot.parentElement;
  
    // only include hotspots within the same image
    const hotspots = container.querySelectorAll(".lg-hotspot");
    hotspots.forEach(hotspot => {
      if (hotspot === clickedHotspot) {
        hotspot.classList.toggle("lg-hotspot--selected");
      } else {
        hotspot.classList.remove("lg-hotspot--selected");
      }
    });
  };
  
  // Initialize event listeners
  (() => {
    const buttons = document.querySelectorAll(".lg-hotspot__button");
    buttons.forEach(button => {
      button.addEventListener("click", selectHotspot);
    });
  })();
  