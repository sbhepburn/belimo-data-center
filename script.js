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

// Layout Toggle Feature (Option 1 + Option 4 combined)
// Allows forcing mobile/portrait or desktop layout on any screen
(function() {
    const FORCE_MOBILE_CLASS = 'force-mobile-layout';
    const FORCE_DESKTOP_CLASS = 'force-desktop-layout';
    const STORAGE_KEY = 'belimo-layout-mode';

    // Check localStorage for saved preference
    const savedMode = localStorage.getItem(STORAGE_KEY);
    if (savedMode === 'mobile') {
        document.documentElement.classList.add(FORCE_MOBILE_CLASS);
    } else if (savedMode === 'desktop') {
        document.documentElement.classList.add(FORCE_DESKTOP_CLASS);
    }

    // Detect if current aspect ratio would naturally trigger mobile layout
    function isNaturallyMobile() {
        return window.matchMedia('(max-aspect-ratio: 9/13.5)').matches;
    }

    // Get current effective mode (considering both forced mode and natural mode)
    function getCurrentMode() {
        const html = document.documentElement;
        if (html.classList.contains(FORCE_MOBILE_CLASS)) {
            return 'mobile';
        } else if (html.classList.contains(FORCE_DESKTOP_CLASS)) {
            return 'desktop';
        } else if (isNaturallyMobile()) {
            return 'mobile';
        } else {
            return 'desktop';
        }
    }

    // Toggle function - cycles through modes intelligently
    function toggleLayout() {
        const html = document.documentElement;
        const currentMode = getCurrentMode();
        const naturallyMobile = isNaturallyMobile();

        // Remove both classes first
        html.classList.remove(FORCE_MOBILE_CLASS, FORCE_DESKTOP_CLASS);

        let newMode;

        if (currentMode === 'mobile') {
            // Switch to desktop
            if (naturallyMobile) {
                // Need to force desktop since naturally mobile
                html.classList.add(FORCE_DESKTOP_CLASS);
            }
            // If naturally desktop, no class needed
            newMode = 'desktop';
        } else {
            // Switch to mobile
            if (!naturallyMobile) {
                // Need to force mobile since naturally desktop
                html.classList.add(FORCE_MOBILE_CLASS);
            }
            // If naturally mobile, no class needed
            newMode = 'mobile';
        }

        // Save preference
        localStorage.setItem(STORAGE_KEY, newMode);

        // Update button appearance
        updateButtonState(newMode);

        // Visual feedback
        showToggleFeedback(newMode === 'mobile' ? 'Portrait Mode' : 'Desktop Mode');
    }

    // Update button icon/state
    function updateButtonState(mode) {
        const button = document.getElementById('layout-toggle-btn');
        if (button) {
            button.setAttribute('data-mode', mode);
            button.setAttribute('aria-label', mode === 'mobile' ? 'Switch to desktop layout' : 'Switch to portrait layout');
        }
    }

    // Show feedback message
    function showToggleFeedback(message) {
        const feedback = document.getElementById('layout-feedback');
        if (feedback) {
            feedback.textContent = message;
            feedback.classList.add('show');
            setTimeout(() => {
                feedback.classList.remove('show');
            }, 1500);
        }
    }

    // Option 1: Corner button toggle
    document.addEventListener('DOMContentLoaded', function() {
        const button = document.getElementById('layout-toggle-btn');
        if (button) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleLayout();
            });

            // Set initial button state
            const currentMode = getCurrentMode();
            updateButtonState(currentMode);
        }
    });

    // Update button state on window resize
    window.addEventListener('resize', function() {
        const currentMode = getCurrentMode();
        updateButtonState(currentMode);
    });

    // Option 4: Secret tap sequence (tap bottom-left corner 3 times within 1.5 seconds)
    let tapCount = 0;
    let tapTimer = null;
    const TAP_THRESHOLD = 1500; // 1.5 seconds
    const CORNER_SIZE = 80; // 80px corner zone

    document.addEventListener('click', function(e) {
        // Check if click is in bottom-left corner
        const isBottomLeft = e.clientX < CORNER_SIZE &&
                            (window.innerHeight - e.clientY) < CORNER_SIZE;

        if (isBottomLeft) {
            tapCount++;

            // Clear existing timer
            if (tapTimer) {
                clearTimeout(tapTimer);
            }

            // Set new timer
            tapTimer = setTimeout(() => {
                tapCount = 0;
            }, TAP_THRESHOLD);

            // If 3 taps achieved, toggle layout
            if (tapCount === 3) {
                tapCount = 0;
                clearTimeout(tapTimer);
                toggleLayout();
            }
        }
    });
})();
