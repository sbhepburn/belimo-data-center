// Function to handle hotspot selection
const selectHotspot = (e) => {
    const clickedHotspot = e.target.closest('.lg-hotspot');
    const container = clickedHotspot.closest('.lg-container');
    const hotspots = container.querySelectorAll(".lg-hotspot");
  
    // For mobile devices, open the dialog
    const dialogId = clickedHotspot.getAttribute('data-dialog');
    const dialog = document.getElementById(dialogId);
    if (dialog) {
        dialog.showModal();
    }
    // if (window.innerWidth <= 767) {
    // }
    // else {
    //     // For larger screens, toggle the hotspot label
    //     hotspots.forEach(hotspot => {
    //         if (hotspot === clickedHotspot) {
    //             hotspot.classList.toggle("lg-hotspot--selected");
    //         } else {
    //             hotspot.classList.remove("lg-hotspot--selected");
    //         }
    //     });
    // }
};

// Initialize event listeners
(() => {
    const buttons = document.querySelectorAll(".lg-hotspot__button");
    buttons.forEach(button => {
        button.addEventListener("click", selectHotspot);
    });
})();

// Attach an outside click handler to close the dialog
const attachOutsideClickHandler = (dialog) => {
    const handleOutsideClick = (e) => {
        if (!dialog.contains(e.target)) {
            dialog.close();
            document.removeEventListener('click', handleOutsideClick);
        }
    };
    document.addEventListener('click', handleOutsideClick);
};

// Event listener to close the dialog if clicking outside of `.inner`
document.addEventListener('click', (e) => {
    const openDialog = document.querySelector('dialog[open]');
    if (openDialog) {
        const inner = openDialog.querySelector('.inner');
        if (!inner.contains(e.target) && !e.target.closest('.lg-hotspot__button')) {
            openDialog.close();
        }
    }
});


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
