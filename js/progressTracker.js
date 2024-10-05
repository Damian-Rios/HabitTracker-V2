document.addEventListener('DOMContentLoaded', function() {
    const monthView = document.getElementById('monthView');
    const totalAchievedElement = document.getElementById('total-achieved');
    const monthHeader = document.getElementById('monthHeader');
    let totalAchieved = 0;

    // Generate a calendar for the current month
    function generateCalendar() {
        const now = new Date();
        const month = now.getMonth(); // Current month (0-11)
        const year = now.getFullYear(); // Current year
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week the month starts on
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the month
        const today = now.getDate(); // Today's date

        // Set the month and year in the header
        monthHeader.innerHTML = `${now.toLocaleString('default', { month: 'long' })} ${year}`;

        // Clear previous calendar
        monthView.innerHTML = '';

        // Create empty days for the start of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDiv = document.createElement('div');
            monthView.appendChild(emptyDiv);
        }

        // Populate the calendar with days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            let progressValue = ''; // No progress value for future days

            // Check if the day has occurred
            if (day <= today) {
                progressValue = Math.floor(Math.random() * 101); // Dummy progress percentage
            }

            dayDiv.className = 'day';
            if (day === today) {
                dayDiv.classList.add('current-day'); // Highlight today's date
            }
            
            // Display day and progress value if available
            dayDiv.innerHTML = `${day}<br><span class="progress-value">${progressValue ? progressValue + '%' : ''}</span>`;
            monthView.appendChild(dayDiv);

            // Count total days with 100% progress
            if (progressValue === 100) {
                totalAchieved++;
            }
        }

        // Update total achieved days
        totalAchievedElement.textContent = totalAchieved;
    }

    // Generate the calendar when the page loads
    generateCalendar();
});