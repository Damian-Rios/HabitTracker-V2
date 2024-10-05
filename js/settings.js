document.addEventListener('DOMContentLoaded', function() {
    // Show custom color inputs if custom theme is selected
    const themeSelect = document.getElementById('theme');
    const customColors = document.getElementById('custom-colors');

    // Initialize custom colors based on the selected theme
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            customColors.style.display = this.value === 'custom' ? 'block' : 'none'; // Toggle visibility
        });

        // Set initial state based on the selected theme
        themeSelect.dispatchEvent(new Event('change'));
    }

    // Save Settings Button Logic
    document.getElementById('save-settings').addEventListener('click', function() {
        alert('Settings saved!');
    });

    // Delete Account Logic
    document.getElementById('delete-account').addEventListener('click', function() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            alert('Account deleted!');
        }
    });

    // Logout Logic
    document.getElementById('logout').addEventListener('click', function() {
        alert('Logged out!');
    });
});