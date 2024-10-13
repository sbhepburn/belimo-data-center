// Function to open the dialog
const showDialog = (dialogId) => {
    const dialog = document.getElementById(dialogId);
    if (dialog) {
        dialog.showModal();
    }
};

// Function to handle clicks on elements with `data-dialog`
const handleDialogOpen = (e) => {
    const clickedElement = e.target.closest('[data-dialog]');
    if (clickedElement) {
        const dialogId = clickedElement.getAttribute('data-dialog');
        showDialog(dialogId);
        e.preventDefault(); // Prevent default action if the element is a link
    }
};

// Attach the event listener to the whole document
document.addEventListener('click', handleDialogOpen);

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
        if (!inner.contains(e.target) && !e.target.closest('[data-dialog]')) {
            openDialog.close();
        }
    }
});

// jQuery part to handle the `.close-dialog` and `.close-dialog-x` buttons
$(document).ready(function() {
    $('.close-dialog, .close-dialog-x').on('click', function() {
        $(this).closest('dialog')[0].close(); // Close the dialog
    });
});
