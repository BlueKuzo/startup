document.addEventListener("DOMContentLoaded", function() {
    const creaturesList = document.getElementById("creaturesList");
    const selectButton = document.getElementById("select");
    const cancelButton = document.getElementById("cancel");

    // Define the list of creatures
    const creatures = [
        "gnoll",
        "gnoll pack lord",
        "goblin",
        "goblin boss",
        "golem (clay)",
        "golem (flesh)",
        "golem (iron)"
    ];

    // Populate the creatures list
    function populateCreaturesList() {
        creatures.forEach(function(creature) {
            const p = document.createElement("p");
            p.textContent = creature;
            creaturesList.appendChild(p);
        });
    }

    // Populate the creatures list when the DOM content is loaded
    populateCreaturesList();

    selectButton.addEventListener("click", function() {
        const selectedCreature = getSelectedCreature();
        if (selectedCreature) {
            alert("Selected creature: " + selectedCreature);
            // Navigate to CreatureWindow.html
            window.location.href = "CreatureWindow.html";
        } else {
            alert("No creature selected! Select a creature or cancel.");
        }
    });

    cancelButton.addEventListener("click", function() {
        // Cancel action: Redirect back to the previous page or perform any other action
        if (confirm("Are you sure you want to cancel?")) {
            // Close the window after confirming
            window.close();
        }
    });

    function getSelectedCreature() {
        const selectedCreature = creaturesList.querySelector("p.selected");
        if (selectedCreature) {
            return selectedCreature.textContent.trim();
        } else {
            return null;
        }
    }

    // Event Listener for Creature Selection
    creaturesList.addEventListener("click", function(event) {
        const clickedCreature = event.target;
        if (clickedCreature.tagName === "P") {
            // Remove "selected" class from previously selected creature
            const selectedCreature = creaturesList.querySelector("p.selected");
            if (selectedCreature) {
                selectedCreature.classList.remove("selected");
                // Revert background color of previously selected creature
                selectedCreature.style.backgroundColor = ""; // Revert to default color
            }

            // Toggle "selected" class and update background color of clicked creature
            clickedCreature.classList.add("selected");
            clickedCreature.style.backgroundColor = "lightblue"; // Change background color
        }
    });
});
