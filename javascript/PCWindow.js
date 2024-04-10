document.addEventListener("DOMContentLoaded", function() {
    const characterName = document.getElementById("characterName").value;
    const race = document.getElementById("race").value;
    const level = document.getElementById("level").value;
    const characterClass = document.getElementById("class").value;

    const saveButton = document.getElementById("save");
    const deleteButton = document.getElementById("delete");
    const cancelButton = document.getElementById("cancel");

    saveButton.addEventListener("click", function() {
        alert("Character saved!");
        // Close the window after confirming
        window.close();
    });

    deleteButton.addEventListener("click", function() {
        if (confirm("Are you sure you want to delete this character?")) {
            alert("Character deleted!");
            // Close the window after confirming
            window.close();
        }
    });

    cancelButton.addEventListener("click", function() {
        if (confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
            // Close the window after confirming
            window.close();
        }
    });
});