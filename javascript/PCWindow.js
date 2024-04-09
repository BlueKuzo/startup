document.addEventListener("DOMContentLoaded", function() {
    const saveButton = document.getElementById("save");
    const deleteButton = document.getElementById("delete");
    const cancelButton = document.getElementById("cancel");

    saveButton.addEventListener("click", function() {
        // Save action: You can implement saving functionality here
        alert("Character saved!");
    });

    deleteButton.addEventListener("click", function() {
        // Delete action: You can implement deleting functionality here
        if (confirm("Are you sure you want to delete this character?")) {
            alert("Character deleted!");
            // Close the window after confirming
            window.close();
        }
    });

    cancelButton.addEventListener("click", function() {
        // Cancel action: Redirect back to the previous page or perform any other action
        if (confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
            // Close the window after confirming
            window.close();
        }
    });
});
