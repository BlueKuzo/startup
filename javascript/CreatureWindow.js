document.addEventListener("DOMContentLoaded", function() {
    const characterNameInput = document.getElementById("characterName");
    const numberInput = document.getElementById("number");
    const ACInput = document.getElementById("AC");
    const HPInput = document.getElementById("HP");
    const attackInput = document.getElementById("attack");
    const DCInput = document.getElementById("DC");
    const damageInput = document.getElementById("damage");

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

function navigateToCreatureList() {
    window.location.href = "creatureList.html";
}