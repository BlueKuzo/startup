document.addEventListener("DOMContentLoaded", function() {
    // Fetch parties data and generate HTML for the list
    generatePartyList();

    // Fetch encounters data and generate HTML for the list
    generateEncounterList();

    // Simulate click on "New Party" to initialize the party list
    document.querySelector("#partiesList p").click();

    // Simulate click on "New Encounter" to initialize the encounter list
    document.querySelector("#encountersList p").click();

    // Add event listener to the saveParty button
    document.getElementById("saveParty").addEventListener("click", function() {
        clearOutputWindows();
    });

    // Add event listener to the saveEncounter button
    document.getElementById("saveEncounter").addEventListener("click", function() {
        clearOutputWindows();
    });

    // Populate the username
    document.getElementById("username").textContent = "BlueKuzo";

    // Add event listener to the logout button
    document.getElementById("logout").addEventListener("click", function() {
        // Navigate to ../index.html
        window.location.href = "index.html";
    });

    // Add event listener to the D&DLogo
    document.getElementById("D&DLogo").addEventListener("click", function() {
        // Get the D&DLogo element
        const logo = document.getElementById("D&DLogo");

        // Get the current hue value (if any)
        let currentHue = logo.style.filter.match(/hue-rotate\(([^)]+)\)/);
        if (!currentHue) {
            currentHue = 0;
        }

        // If the hue filter already exists, update the hue value; otherwise, set it to a random value
        if (currentHue) {
            // Extract the current hue value and convert it to a number
            currentHue = parseInt(currentHue[1]);
            // Increase the hue value by 30 degrees
            currentHue += 30;
        } else {
            // If no hue filter exists, set it to a 30 degrees
            currentHue = 30;
        }

        // Apply the new hue filter to the logo
        logo.style.filter = `hue-rotate(${currentHue}deg)`;
    });

    // Simulate WebSocket update after a random time interval
    setTimeout(function() {
        const updateMessage = "User31181 created a new encounter!";
        // Update the content of the footer span
        const parent = document.getElementById("WebSocketDisplay");
        span = document.createElement("span");
        span.textContent = updateMessage;
        parent.appendChild(span);

        // If WebSocket is open, send the update to the server
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(updateMessage);
        }
    }, getRandomTime(10, 15) * 1000); // Convert seconds to milliseconds
});

// Function to generate a random time interval between min and max values (inclusive)
function getRandomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate HTML for party list
async function generatePartyList() {
    const partiesList = document.getElementById("partiesList");

    // Clear existing list
    partiesList.innerHTML = "";

    // Generate HTML to add a new party
    partiesList.appendChild(createNewPartyElement());

    try {
        const parties = await fetchParties();

        // Generate HTML for each party
        Object.keys(parties).forEach(partyName => {
            const party = { name: partyName, characters: parties[partyName] };
            partiesList.appendChild(createPartyElement(party));
        });
    } catch (error) {
        console.error('Error generating party list:', error);
    }
}

async function fetchParties() {
    // Return party names from the centralized party data object
    return fetch('api/parties')
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch parties');
        }
        // Parse the JSON response
        return response.json();
    })
    .catch(error => {
        console.error('Error fetching parties:', error);
        // Return an empty array in case of an error
        return [];
    });
}

function createNewPartyElement() {
    const NewPartyElement = document.createElement("p");
    NewPartyElement.textContent = "+ New Party";
    NewPartyElement.addEventListener("click", function() {
        clearOutputWindows();

        // Reset partyname input field
        document.getElementById("partyname").value = "";

        // Reset partyList to default state
        const partyList = document.getElementById("partyList");
        partyList.innerHTML = ""; // Clear existing list

        // Add option to create a new character
        partyList.appendChild(addNewCharacterOption());
    });

    return NewPartyElement;
}

function createPartyElement(party) {
    const partyElement = document.createElement("p");
    partyElement.textContent = party.name;
    partyElement.addEventListener("click", function() {
        clearOutputWindows();

        // Fill party name input field
        document.getElementById("partyname").value = party.name;

        // Fill partyList with members
        const partyList = document.getElementById("partyList");
        partyList.innerHTML = ""; // Clear existing list

        // Add option to create a new character
        partyList.appendChild(addNewCharacterOption());

        party.characters.forEach(character => {
            partyList.appendChild(addCharacter(character.name, character.level, character.class));
        });
    });

    return partyElement;
}

// Function to generate HTML for encounter list
async function generateEncounterList() {
    const encountersList = document.getElementById("encountersList");

    // Clear existing list
    encountersList.innerHTML = "";

    // Generate HTML to add a new encounter
    encountersList.appendChild(createNewEncounterElement());

    try {
        const encounters = await fetchEncounters();

        // Generate HTML for each encounter
        Object.keys(encounters).forEach(encounterName => {
            const encounter = { name: encounterName, enemies: encounters[encounterName] };
            encountersList.appendChild(createEncounterElement(encounter));
        });
    } catch (error) {
        console.error('Error generating encounter list:', error);
    }
}


async function fetchEncounters() {
    // Return party names from the centralized party data object
    return fetch('api/encounters')
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch encounters');
        }
        // Parse the JSON response
        return response.json();
    })
    .catch(error => {
        console.error('Error fetching encounters:', error);
        // Return an empty array in case of an error
        return [];
    });
}

function createNewEncounterElement() {
    const newEncounterElement = document.createElement("p");
    newEncounterElement.textContent = "+ New Encounter";
    newEncounterElement.addEventListener("click", function() {
        clearOutputWindows();

        // Reset encounter name input field
        document.getElementById("encountername").value = "";

        // Reset enemiesList to default state
        const enemiesList = document.getElementById("enemiesList");
        enemiesList.innerHTML = ""; // Clear existing list

        // Add option to create a new enemy
        enemiesList.appendChild(addNewEnemyOption());
    });

    return newEncounterElement;
}

function createEncounterElement(encounter) {
    const encounterElement = document.createElement("p");
    encounterElement.textContent = encounter.name;
    encounterElement.addEventListener("click", function() {
        clearOutputWindows();

        // Fill encounter name input field
        document.getElementById("encountername").value = encounter.name;

        // Fill enemiesList with enemies
        const enemiesList = document.getElementById("enemiesList");
        enemiesList.innerHTML = ""; // Clear existing list

        // Add option to create a new enemy
        enemiesList.appendChild(addNewEnemyOption());

        encounter.enemies.forEach(enemy => {
            enemiesList.appendChild(addEnemy(enemy.name, enemy.quantity));
        });
    });

    return encounterElement;
}

function addNewCharacterOption() {
    const newCharacter = document.createElement("p");
    newCharacter.textContent = "+ New Character";
    newCharacter.addEventListener("click", function() {
        handleCharacterClick(null);
    });

    return newCharacter;
}

function addCharacter(characterName, characterLevel, characterClass) {
    const newCharacter = document.createElement("p");
    newCharacter.textContent = `${characterName}   |   Level ${characterLevel} ${characterClass}`;
    newCharacter.addEventListener("click", function() {
        handleCharacterClick(characterName);
    });

    return newCharacter;
}

function addNewEnemyOption() {
    const newEnemy = document.createElement("p");
    newEnemy.textContent = "+ New Enemy";
    newEnemy.addEventListener("click", function() {
        handleEnemyClick(null);
    });

    return newEnemy;
}

function addEnemy(enemyName, quantity) {
    const newEnemy = document.createElement("p");
    newEnemy.textContent = `${enemyName} (${quantity})`;
    newEnemy.addEventListener("click", function() {
        handleEnemyClick(enemyName);
    });

    return newEnemy;
}

function handleCharacterClick(characterName) {
    // Open PC_Overlay
    const PCOverlay = document.getElementById('PC_Overlay');
    PCOverlay.style.display = 'block';

    // Populate the PC_Overlay with the selected character's data
    if (characterName != null) {
        // Get the selected character's data
        const selectedParty = document.getElementById("partyname").value;
        const selectedCharacter = partiesData[selectedParty].find(character => character.name === characterName);

        document.getElementById('characterName').value = selectedCharacter.name;
        document.getElementById('characterRace').value = selectedCharacter.race;
        document.getElementById('characterLevel').value = selectedCharacter.level;
        document.getElementById('characterClass').value = selectedCharacter.class;
    }

    else {
        document.getElementById('characterName').value = '';
        document.getElementById('characterRace').value = '';
        document.getElementById('characterLevel').value = '';
        document.getElementById('characterClass').value = '';
    }

    // Set up event listener for save button
    document.getElementById('savePC').addEventListener('click', async function() {
        // Check if any of the character data fields are empty
        if (!document.getElementById('characterName').value || !document.getElementById('characterRace').value ||
            !document.getElementById('characterLevel').value || !document.getElementById('characterClass').value) {
            alert("All character data fields are required.");
        }

        else {
            const character = {name: document.getElementById('characterName').value, race: document.getElementById('characterRace').value,
            level: document.getElementById('characterLevel').value, class: document.getElementById('characterClass').value};

            // Handle save action
            const response = await fetch('/api/character', {
                method: 'POST',
                headers: {'content-type': '../json'},
                body: JSON.stringify(character)
            });

            const responseData = await response.json();

            if (response.ok) {
                alert(responseData.message || "Character saved!");
                clearOutputWindows();
    
                // Close PC_Overlay
                PCOverlay.style.display = 'none';
            }

            else {
                alert("ERROR: " + responseData.error || responseData.message || "Save failed!");
            }
        }
        
    });

    // Set up event listener for delete button
    document.getElementById('deletePC').addEventListener('click', function() {
        if (confirm("Are you sure you want to delete this character?")) {
            alert("Character deleted!");
            // Handle delete action
            clearOutputWindows();

            // Close PC_Overlay
            PCOverlay.style.display = 'none';
        }
    });

    // Set up event listener for cancel button
    document.getElementById('cancelPC').addEventListener('click', function() {
        if (confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
            // Handle cancel action
            // Close PC_Overlay
            PCOverlay.style.display = 'none';
        }
    });
}

function handleEnemyClick(enemyName) {
    // Open Enemy_Overlay
    const enemyOverlay = document.getElementById('Enemy_Overlay');
    enemyOverlay.style.display = 'block';

    // Populate the Enemy_Overlay with the selected enemy's data
    if (enemyName != null) {
        // Get the selected encounter's data
        const selectedEncounter = document.getElementById("encountername").value;
        const selectedEnemy = encountersData[selectedEncounter].find(enemy => enemy.name === enemyName);

        document.getElementById('enemyName').value = selectedEnemy.name;
        document.getElementById('enemyQuantity').value = selectedEnemy.quantity;
        document.getElementById('enemyAC').value = selectedEnemy.AC;
        document.getElementById('enemyHP').value = selectedEnemy.HP;
        document.getElementById('enemyAttackBonus').value = selectedEnemy.attackBonus;
        document.getElementById('enemySaveDC').value = selectedEnemy.saveDC;
        document.getElementById('enemyAvgDamage').value = selectedEnemy.avgDamage;
    }
    
    else {
        // Clear the fields if no enemy is selected
        document.getElementById('enemyName').value = '';
        document.getElementById('enemyQuantity').value = '';
        document.getElementById('enemyAC').value = '';
        document.getElementById('enemyHP').value = '';
        document.getElementById('enemyAttackBonus').value = '';
        document.getElementById('enemySaveDC').value = '';
        document.getElementById('enemyAvgDamage').value = '';
    }

    // Set up event listeners for button
    document.getElementById('savedCreatureButton').addEventListener('click', function() {
        handleCreatureClick();
    });

    // Set up event listeners for save, delete, and cancel buttons
    document.getElementById('saveEnemy').addEventListener('click', function() {
        alert("Enemy saved!");
        // Handle save action
        clearOutputWindows();

        // Close Enemy_Overlay
        enemyOverlay.style.display = 'none';
    });

    document.getElementById('deleteEnemy').addEventListener('click', function() {
        if (confirm("Are you sure you want to delete this enemy?")) {
            alert("Enemy deleted!");
            // Handle delete action
            clearOutputWindows();

            // Close Enemy_Overlay
            enemyOverlay.style.display = 'none';
        }
    });

    document.getElementById('cancelEnemy').addEventListener('click', function() {
        if (confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
            // Handle cancel action
            // Close Enemy_Overlay
            enemyOverlay.style.display = 'none';
        }
    });
}

function handleCreatureClick() {
    // Open Creatures_Overlay
    const creaturesOverlay = document.getElementById('Creatures_Overlay');
    creaturesOverlay.style.display = 'block';

    // Populate the creatures list when the DOM content is loaded
    populateCreaturesList();
    
    // Set up event listeners for select and cancel buttons
    document.getElementById('selectCreature').addEventListener('click', function() {
        const selectedCreature = getSelectedCreature();
        if (selectedCreature) {
            alert("Selected creature: " + selectedCreature);
            // Handle selected action
            // Close Creatures_Overlay
            creaturesOverlay.style.display = 'none';
        } else {
            alert("No creature selected! Select a creature or cancel.");
        }
    });

    document.getElementById('cancelCreature').addEventListener('click', function() {
        creaturesOverlay.style.display = 'none';
    });
}

function getSelectedCreature() {
    const selectedCreature = creaturesList.querySelector("p.selected");
    if (selectedCreature) {
        return selectedCreature.textContent.trim();
    } else {
        return null;
    }
}

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

function populateCreaturesList() {
    const creaturesList = document.getElementById("creaturesList");

    // Clear existing list
    creaturesList.innerHTML = "";

    creatures.forEach(function(creature) {
        const p = document.createElement("p");
        p.textContent = creature;
        creaturesList.appendChild(p);
    });
}

// Add event listener to the "compute" button
document.getElementById("compute").addEventListener("click", function() {
    // Check if both party and encounter are selected
    const selectedParty = document.getElementById("partyname").value;
    const selectedEncounter = document.getElementById("encountername").value;

    if (selectedParty && selectedEncounter) {
        // Array of possible options
        const options = ["boring", "easy", "medium", "hard", "deadly"];

        // Randomly select an option for each output window
        const overallChallengeResult = options[Math.floor(Math.random() * options.length)];
        const defensiveChallengeResult = options[Math.floor(Math.random() * options.length)];
        const offensiveChallengeResult = options[Math.floor(Math.random() * options.length)];

        // Display the results in the output windows
        document.getElementById("overallChallengeResult").textContent = overallChallengeResult;
        document.getElementById("defensiveChallengeResult").textContent = defensiveChallengeResult;
        document.getElementById("offensiveChallengeResult").textContent = offensiveChallengeResult;
    } else {
        // If either party or encounter is not selected, display an error message
        alert("Please select both a party and an encounter.");
    }
});

function clearOutputWindows() {
    document.getElementById("overallChallengeResult").textContent = "";
    document.getElementById("defensiveChallengeResult").textContent = "";
    document.getElementById("offensiveChallengeResult").textContent = "";
}