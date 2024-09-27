// Function to handle hotspot selection
const selectHotspot = (e) => {
    const clickedHotspot = e.target.closest('.lg-hotspot');
    const container = clickedHotspot.closest('.lg-container');
    const hotspots = container.querySelectorAll(".lg-hotspot");
  
    if (window.innerWidth <= 767) {
        // For mobile devices, open the dialog
        const dialogId = clickedHotspot.getAttribute('data-dialog');
        const dialog = document.getElementById(dialogId);
        if (dialog) {
            dialog.showModal();
        }
    } else {
        // For larger screens, toggle the hotspot label
        hotspots.forEach(hotspot => {
            if (hotspot === clickedHotspot) {
                hotspot.classList.toggle("lg-hotspot--selected");
            } else {
                hotspot.classList.remove("lg-hotspot--selected");
            }
        });
    }
};

// Initialize event listeners
(() => {
    const buttons = document.querySelectorAll(".lg-hotspot__button");
    buttons.forEach(button => {
        button.addEventListener("click", selectHotspot);
    });
})();

// script.js
$(document).ready(function() {
    $('.content-button').on('click', function(e) {
        e.preventDefault();
        var dialogId = $(this).data('dialog');
        var $dialog = $('#' + dialogId);
        $dialog[0].showModal(); // Show the dialog
        $dialog[0].scrollTop = 0;

    });

    $('.close-dialog, .close-dialog-x').on('click', function() {
        $(this).closest('dialog')[0].close(); // Close the dialog
    });
});
