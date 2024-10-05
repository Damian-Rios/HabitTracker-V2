document.addEventListener('DOMContentLoaded', function() {
    // Habit data for different weeks
    const habitData = {
        '2024-09-30': [
            { name: "Exercise", completions: [true, false, true, true, true, false, true] },
            { name: "Reading", completions: [true, true, true, false, true, false, false] },
            { name: "Meditation", completions: [false, true, false, true, false, true, true] }
        ],
        '2024-09-23': [ // Week of September 23, 2024
            { name: "Exercise", completions: [true, true, true, true, false, false, false] },
            { name: "Reading", completions: [true, false, true, false, true, false, true] },
            { name: "Meditation", completions: [true, true, false, false, false, true, true] }
        ],
        '2024-09-16': [ // Week of September 16, 2024
            { name: "Exercise", completions: [false, true, false, true, false, true, false] },
            { name: "Reading", completions: [false, false, true, true, true, false, false] },
            { name: "Meditation", completions: [true, true, true, true, true, true, true] }
        ]
    };

    let currentWeekStart = new Date(); // Get today's date
    currentWeekStart.setDate(currentWeekStart.getDate() - (currentWeekStart.getDay() + 6) % 7); // Set to last Monday

    // Format date range for display
    function formatDateRange(start) {
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    }

    function loadHabits(weekStart) {
        const weekKey = weekStart.toISOString().split('T')[0];
        const habits = habitData[weekKey] || [];
        
        // Clear existing table body
        const habitTableBody = document.getElementById('habitTableBody');
        habitTableBody.innerHTML = '';

        let totalCompleted = 0;
        let bestStreak = 0;
        let bestDayNames = [];
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let completionCounts = new Array(7).fill(0);

        if (habits.length === 0) {
            // No habits logged
            const noHabitsRow = document.createElement('tr');
            const noHabitsCell = document.createElement('td');
            noHabitsCell.colSpan = 8; // Span across all columns
            noHabitsCell.textContent = "No habits logged for this week";
            noHabitsCell.className = 'no-habits'; // Optional: Add a class for styling
            noHabitsRow.appendChild(noHabitsCell);
            habitTableBody.appendChild(noHabitsRow);
        } else {
            // Create table rows for each habit
            habits.forEach(habit => {
                const row = document.createElement('tr');
                const habitCell = document.createElement('td');
                habitCell.textContent = habit.name;
                row.appendChild(habitCell);

                let habitCompletionCount = 0;

                daysOfWeek.forEach((day, dayIndex) => {
                    const completionCell = document.createElement('td');
                    if (habit.completions[dayIndex]) {
                        completionCell.textContent = "✔"; // Checkmark for completed
                        completionCell.className = 'completed';
                        habitCompletionCount++;
                        completionCounts[dayIndex]++; // Increment completion for that day
                    } else {
                        completionCell.textContent = "✖"; // Cross for not completed
                        completionCell.className = 'not-completed';
                    }
                    row.appendChild(completionCell);
                });

                habitTableBody.appendChild(row);

                // Update totals and best streak
                totalCompleted += habitCompletionCount;
                let currentStreak = 0;
                let maxStreak = 0;
                habit.completions.forEach(completed => {
                    if (completed) {
                        currentStreak++;
                        maxStreak = Math.max(maxStreak, currentStreak);
                    } else {
                        currentStreak = 0;
                    }
                });
                bestStreak = Math.max(bestStreak, maxStreak);
            });

            // Determine best day(s)
            const maxCompletes = Math.max(...completionCounts);
            bestDayNames = daysOfWeek.filter((_, index) => completionCounts[index] === maxCompletes);
        }

        // Update UI with results
        document.getElementById('totalCompleted').textContent = totalCompleted || 0;
        document.getElementById('bestStreak').textContent = bestStreak || 0;
        document.getElementById('bestDay').textContent = bestDayNames.length > 0 ? bestDayNames.join(", ") : "None";

        // Update date range
        const dateRangeElement = document.getElementById('dateRange');
        dateRangeElement.textContent = formatDateRange(weekStart);
        // Debug log
        console.log("Date range displayed:", dateRangeElement.textContent);

        // Update all-time data
        calculateAllTimeData();
    }

    function calculateAllTimeData() {
        let allTimeTotalCompleted = 0;
        let allTimeBestStreak = 0;
        let completionCounts = new Array(7).fill(0);
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        Object.values(habitData).forEach(weekHabits => {
            weekHabits.forEach(habit => {
                let habitCompletionCount = 0;
                let currentStreak = 0;
                let maxStreak = 0;

                habit.completions.forEach(completed => {
                    if (completed) {
                        habitCompletionCount++;
                        allTimeTotalCompleted++;
                        currentStreak++;
                        maxStreak = Math.max(maxStreak, currentStreak);
                    } else {
                        currentStreak = 0;
                    }
                });

                // Update completion counts for all-time best day(s)
                habit.completions.forEach((completed, index) => {
                    if (completed) {
                        completionCounts[index]++;
                    }
                });

                allTimeBestStreak = Math.max(allTimeBestStreak, maxStreak);
            });
        });

        // Determine best day(s)
        const maxCompletes = Math.max(...completionCounts);
        const allTimeBestDayNames = daysOfWeek.filter((_, index) => completionCounts[index] === maxCompletes);

        // Update the UI
        document.getElementById('allTimeTotalCompleted').textContent = allTimeTotalCompleted || 0;
        document.getElementById('allTimeBestStreak').textContent = allTimeBestStreak || 0;
    }

    // Event listeners for navigation buttons
    document.getElementById('prevWeek').onclick = function() {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        loadHabits(currentWeekStart);
    };

    document.getElementById('nextWeek').onclick = function() {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        loadHabits(currentWeekStart);
    };

    document.getElementById('currentWeek').onclick = function() {
        currentWeekStart = new Date(); // Reset to today's date
        currentWeekStart.setDate(currentWeekStart.getDate() - (currentWeekStart.getDay() + 6) % 7); // Reset to this Monday
        loadHabits(currentWeekStart);
    };

    // Initial load
    loadHabits(currentWeekStart);
});