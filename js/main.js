// Log activity event listener
const logButtons = document.querySelectorAll('.log-activity');
let selectedHabit = '';

// Set up click event for each log button
logButtons.forEach(button => {
    button.addEventListener('click', function() {
        selectedHabit = this.getAttribute('data-habit');
        document.getElementById('activityHabitName').textContent = `Logging activity for: ${selectedHabit}`;
        M.Modal.getInstance(document.getElementById('logActivityModal')).open(); // Open modal
    });
});

// Handle logging activity
document.getElementById('logActivity').addEventListener('click', function() {
    const duration = document.getElementById('activity_duration').value;
    const notes = document.getElementById('activity_notes').value;

    if (duration) {
        // Log the activity to the console
        console.log(`Habit: ${selectedHabit}`);
        console.log(`Duration: ${duration} minutes`);
        console.log(`Notes: ${notes || 'No notes'}`);
    } else {
        alert('Please enter a duration to log the activity.'); // Alert for missing duration
    }

    // Reset modal inputs
    document.getElementById('activity_duration').value = '';
    document.getElementById('activity_notes').value = '';
    M.updateTextFields(); // Reset floating labels
});