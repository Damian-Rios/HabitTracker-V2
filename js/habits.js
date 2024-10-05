// Event listener for add habit button in habit modal
document.querySelectorAll('.add-habit-icon').forEach(function(icon) {
    icon.onclick = function() {
        var modalInstance = M.Modal.getInstance(document.getElementById('habitModal'));
        modalInstance.open();
    };
});

// Event listener for saving the habit parameters
document.getElementById('saveHabit').onclick = function() {
    var goal = document.getElementById('habit_goal').value;
    var period = document.getElementById('habit_period').value;
    var remindersEnabled = document.getElementById('habit_reminders').checked;

    // Perform actions to save these parameters
    console.log("Goal:", goal);
    console.log("Goal Period:", period);
    console.log("Reminders Enabled:", remindersEnabled);

    // Close the modal after saving
    var modalInstance = M.Modal.getInstance(document.getElementById('habitModal'));
    modalInstance.close();
};