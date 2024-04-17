savedPartyName = "";
savedEncounterName = "";

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
    document.getElementById("saveParty").addEventListener("click", async function() {
        const newPartyName = document.getElementById("partyname").value.trim();
        if (!newPartyName) {
            alert("Party name cannot be blank.");
        }

        else {
            const requestData = {
                newPartyName: newPartyName,
                savedPartyName: savedPartyName
            };
    
            // Handle save action
            try {
                // Send saveParty data
                const response = await fetch('/api/saveParty', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });
    
                if (response.ok) {

                    const partyElement = document.getElementById(savedPartyName);
                    if (partyElement) {
                        partyElement.textContent = newPartyName;
                        partyElement.id = newPartyName;
                    }

                    else {
                        //Add party to partiesList.
                        document.getElementById("partiesList").appendChild(createPartyElement(newPartyName));
                    }

                    savedPartyName = newPartyName;
                    alert("Party name saved!");
                }
                
                else {
                    // If response is not ok, display the error message returned by the server
                    const errorMessage = await response.json();
                    alert("Failed to save name: " + errorMessage.error);
                }
            }
            
            catch (error) {
                console.error('Error saving character:', error);
                alert("An error occurred while saving name. Please try again.");
            }
        }
    });

    // Add event listener to the saveEncounter button
    document.getElementById("saveEncounter").addEventListener("click", async function() {
        const newEncounterName = document.getElementById("encountername").value.trim();
        if (!newEncounterName) {
            alert("Encounter name cannot be blank.");
        }

        else {
            const requestData = {
                newEncounterName: newEncounterName,
                savedEncounterName: savedEncounterName
            };
    
            // Handle save action
            try {
                // Send saveEncounter data
                const response = await fetch('/api/saveEncounter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });
    
                if (response.ok) {

                    const encounterElement = document.getElementById(savedEncounterName);
                    if (encounterElement) {
                        encounterElement.textContent = newEncounterName;
                        encounterElement.id = newEncounterName;
                    }

                    else {
                        //Add encounter to encountersList.
                        document.getElementById("encountersList").appendChild(createEncounterElement(newEncounterName));
                    }

                    savedEncounterName = newEncounterName;
                    alert("Encounter name saved!");
                }
                
                else {
                    // If response is not ok, display the error message returned by the server
                    const errorMessage = await response.json();
                    alert("Failed to save name: " + errorMessage.error);
                }
            }
            
            catch (error) {
                console.error('Error saving character:', error);
                alert("An error occurred while saving name. Please try again.");
            }
        }
    });

    // Fetch the username from the server
    fetch('/api/username')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch username');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("username").textContent = data;
        })
        .catch(error => {
            console.error('Error fetching username:', error);
            // Handle error
        });

    // Add event listener to the logout button
    document.getElementById("logout").addEventListener("click", function() {
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

// Functions for parties
async function generatePartyList() {
    const partiesList = document.getElementById("partiesList");

    // Clear existing list
    partiesList.innerHTML = "";

    // Generate HTML to add a new party
    partiesList.appendChild(createNewPartyElement());

    try {
        const parties = await fetchParties();

        // Generate HTML for each party
        parties.forEach(partyName => {
            partiesList.appendChild(createPartyElement(partyName));
        });
    }
    
    catch (error) {
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
        // Reset partyname input field
        savedPartyName = "";
        document.getElementById("partyname").value = savedPartyName;

        getDefaultPartyList();
    });

    return NewPartyElement;
}

function createPartyElement(partyName) {
    const partyElement = document.createElement("p");
    partyElement.textContent = partyName;
    partyElement.id = partyName;

    partyElement.addEventListener("click", function() {
        // Fill party name input field
        savedPartyName = partyName;
        document.getElementById("partyname").value = savedPartyName;

        loadParty(partyName);
    });

    return partyElement;
}

async function loadParty(partyName) {
    const partyList = getDefaultPartyList();

    try {
        // Fetch characters associated with the selected party
        const response = await fetch(`/api/characters?partyName=${partyName}`);
        const characters = await response.json();

        // Iterate over each character and add them to the party list
        characters.forEach(character => {
            partyList.appendChild(addCharacter(character));
        });
    }

    catch (error) {
        console.error('Error fetching characters for party:', error);
    }
}

function getDefaultPartyList() {
    clearOutputWindows();

    const partyList = document.getElementById("partyList");
    partyList.innerHTML = ""; // Clear existing list

    // Add option to create a new character
    partyList.appendChild(addNewCharacterOption());

    return partyList;
}

function addNewCharacterOption() {
    const newCharacter = document.createElement("p");
    newCharacter.textContent = "+ New Character";
    newCharacter.addEventListener("click", function() {
        handleCharacterClick(null);
    });

    return newCharacter;
}

function addCharacter(character) {
    const newCharacter = document.createElement("p");
    newCharacter.textContent = `${character.name}   |   Level ${character.level} ${character.class}`;
    newCharacter.addEventListener("click", function() {
        handleCharacterClick(character);
    });

    return newCharacter;
}

async function handleCharacterClick(character) {
    const partyName = document.getElementById("partyname").value.trim();
    if (!partyName) { alert("Create and save party name before editing characters. You can change the name later.") }
    
    else {
        try {
            const response = await fetch('/api/parties');
            if (!response.ok) {
                throw new Error('Failed to fetch parties');
            }

            const partiesData = await response.json();
            if (!(partiesData.includes(partyName))) {
                alert("Save party name before editing characters. You can change the name later.")
            }
        
            else {
                // Open PC_Overlay
                const PCOverlay = document.getElementById('PC_Overlay');
                PCOverlay.style.display = 'block';

                // Populate the PC_Overlay with the selected character's data
                if (character != null ){
                    document.getElementById('characterName').value = character.name;
                    document.getElementById('characterRace').value = character.race;
                    document.getElementById('characterLevel').value = character.level;
                    document.getElementById('characterClass').value = character.class;
                }

                else {
                    document.getElementById('characterName').value = '';
                    document.getElementById('characterRace').value = '';
                    document.getElementById('characterLevel').value = '';
                    document.getElementById('characterClass').value = '';
                }

                // Set up event listener for save button
                document.getElementById('savePC').onclick = function() {
                    saveCharacter(character);
                };

                // Set up event listener for delete button
                document.getElementById('deletePC').onclick = function() {
                    deleteCharacter(character);
                };

                // Set up event listener for cancel button
                document.getElementById('cancelPC').onclick = function() {
                    cancelPC();
                };
            }
        }
    
        catch (error) {
            console.error('Error checking party name:', error);
            alert("An error has occured. Please try again.")
        }
    }
}

async function saveCharacter(character) {
    // Check if any of the character data fields are empty
    if (!document.getElementById('characterName').value || !document.getElementById('characterRace').value ||
        !document.getElementById('characterLevel').value || !document.getElementById('characterClass').value) {
        alert("All character data fields are required.");
    }

    else {
        partyName = document.getElementById('partyname').value;
        const characterSave = {name: document.getElementById('characterName').value, race: document.getElementById('characterRace').value,
        level: document.getElementById('characterLevel').value, class: document.getElementById('characterClass').value};

        const requestData = {
            partyName: partyName,
            characterSave: characterSave,
            characterDelete: character
        };

        // Handle save action
        try {
            // Send characterSave data
            const response = await fetch('/api/saveCharacter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                alert("Character saved!");
                loadParty(partyName);

                closePCWindow();
            }
            
            else {
                alert("Failed to save character. Please try again.");
            }
        }
        
        catch (error) {
            console.error('Error saving character:', error);
            alert("An error occurred while saving character. Please try again.");
        }
    }
}

async function deleteCharacter(character) {
    if (confirm("Are you sure you want to delete this character?")) {
        partyName = document.getElementById('partyname').value;

        const requestData = {
            partyName: partyName,
            characterDelete: character
        };

        // Handle delete action
        try {
            // Send characterDelete data
            const response = await fetch('/api/deleteCharacter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                alert("Character deleted!");
                loadParty(partyName);

                closePCWindow();
            }
            
            else {
                alert("Failed to delete character. Please try again.");
            }
        }
        
        catch (error) {
            console.error('Error deleting character:', error);
            alert("An error occurred while deleting character. Please try again.");
        }
    }
}

function cancelPC() {
    if (confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
        closePCWindow();
    }
}

function closePCWindow() {
    document.getElementById('PC_Overlay').style.display = 'none';
    document.getElementById('savePC').onclick = null;
    document.getElementById('deletePC').onclick = null;
    document.getElementById('cancelPC').onclick = null;
}



// Functions for encounters
async function generateEncounterList() {
    const encountersList = document.getElementById("encountersList");

    // Clear existing list
    encountersList.innerHTML = "";

    // Generate HTML to add a new encounter
    encountersList.appendChild(createNewEncounterElement());

    try {
        const encounters = await fetchEncounters();

        // Generate HTML for each encounter
        encounters.forEach(encounterName => {
            encountersList.appendChild(createEncounterElement(encounterName));
        });
    } catch (error) {
        console.error('Error generating encounter list:', error);
    }
}

async function fetchEncounters() {
    // Return encounter names from the centralized encounter data object
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
        // Reset encounter name input field
        savedEncounterName = "";
        document.getElementById("encountername").value = savedEncounterName;

        getDefaultEncounterList();
    });

    return newEncounterElement;
}

function createEncounterElement(encounterName) {
    const encounterElement = document.createElement("p");
    encounterElement.textContent = encounterName;
    encounterElement.id = encounterName;

    encounterElement.addEventListener("click", function() {
        // Fill encounter name input field
        savedEncounterName = encounterName;
        document.getElementById("encountername").value = savedEncounterName;

        loadEncounter(encounterName);
    });

    return encounterElement;
}

async function loadEncounter(encounterName) {
    const encounterList = getDefaultEncounterList();

    try {
        // Fetch enemies associated with the selected encounter
        const response = await fetch(`/api/enemies?encounterName=${encounterName}`);
        const enemies = await response.json();

        // Iterate over each enemy and add them to the encounter
        enemies.forEach(enemy => {
            encounterList.appendChild(addEnemy(enemy));
        });
    }

    catch (error) {
        console.error('Error fetching enemies for encounter:', error);
    }
}

function getDefaultEncounterList() {
    clearOutputWindows();

    const encounterList = document.getElementById("enemiesList");
    encounterList.innerHTML = ""; // Clear existing list

    // Add option to create a new character
    encounterList.appendChild(addNewEnemyOption());

    return encounterList;
}

function addNewEnemyOption() {
    const newEnemy = document.createElement("p");
    newEnemy.textContent = "+ New Enemy";
    newEnemy.addEventListener("click", function() {
        handleEnemyClick(null);
    });

    return newEnemy;
}

function addEnemy(enemy) {
    const newEnemy = document.createElement("p");
    newEnemy.textContent = `${enemy.name} (${enemy.quantity})`;
    newEnemy.addEventListener("click", function() {
        handleEnemyClick(enemy);
    });

    return newEnemy;
}

async function handleEnemyClick(enemy) {
    const enemyName = document.getElementById("encountername").value.trim();
    if (!enemyName) { alert("Create and save encounter name before editing characters. You can change the name later.") }

    else {
        try {
            const response = await fetch('/api/encounters');
            if (!response.ok) {
                throw new Error('Failed to fetch encounters');
            }

            const encountersData = await response.json();
            if (!(encountersData.includes(enemyName))) {
                alert("Save encounter name before editing characters. You can change the name later.")
            }
        
            else {
                // Open Enemy_Overlay
                const enemyOverlay = document.getElementById('Enemy_Overlay');
                enemyOverlay.style.display = 'block';

                // Populate the PC_Overlay with the selected character's data
                if (enemy != null ){
                    document.getElementById('enemyName').value = enemy.name;
                    document.getElementById('enemyQuantity').value = enemy.quantity;
                    document.getElementById('enemyAC').value = enemy.AC;
                    document.getElementById('enemyHP').value = enemy.HP;
                    document.getElementById('enemyAttackBonus').value = enemy.attackBonus;
                    document.getElementById('enemySaveDC').value = enemy.saveDC;
                    document.getElementById('enemyAvgDamage').value = enemy.avgDamage;
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

                activateEnemyListeners(enemy);
            }
        }
    
        catch (error) {
            console.error('Error checking encounter name:', error);
            alert("An error has occured. Please try again.")
        }
    }
}

async function saveEnemy(enemy) {
    // Check if any of the character data fields are empty
    if (!document.getElementById('enemyName').value || !document.getElementById('enemyQuantity').value ||
        !document.getElementById('enemyAC').value || !document.getElementById('enemyHP').value ||
        (!document.getElementById('enemyAttackBonus').value && !document.getElementById('enemySaveDC').value) ||
        !document.getElementById('enemyAvgDamage').value) {
        alert("Only one of Attack Bonus OR Save DC may be left blank. All other data fields are required. ");
    }

    else {
        encounterName = document.getElementById('encountername').value;
        const enemySave = { name: document.getElementById('enemyName').value, quantity: document.getElementById('enemyQuantity').value,
                            AC: document.getElementById('enemyAC').value, HP: document.getElementById('enemyHP').value,
                            attackBonus: document.getElementById('enemyAttackBonus').value, saveDC: document.getElementById('enemySaveDC').value,
                            avgDamage: document.getElementById('enemyAvgDamage').value };

        const requestData = {
            encounterName: encounterName,
            enemySave: enemySave,
            enemyDelete: enemy
        };

        // Handle save action
        try {
            // Send enemySave data
            const response = await fetch('/api/saveEnemy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                alert("Enemy saved!");
                loadEncounter(encounterName);

                closeEnemyWindow();
            }
            
            else {
                alert("Failed to save enemy. Please try again.");
            }
        }
        
        catch (error) {
            console.error('Error saving enemy:', error);
            alert("An error occurred while saving enemy. Please try again.");
        }
    }
}

async function deleteEnemy(enemy) {
    if (confirm("Are you sure you want to delete this enemy?")) {
        encounterName = document.getElementById('encountername').value;

        const requestData = {
            encounterName: encounterName,
            enemyDelete: enemy
        };

        // Handle delete action
        try {
            // Send enemyDelete data
            const response = await fetch('/api/deleteEnemy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                alert("Enemy deleted!");
                loadEncounter(encounterName);

                closeEnemyWindow();
            }
            
            else {
                alert("Failed to delete enemy. Please try again.");
            }
        }
        
        catch (error) {
            console.error('Error deleting enemy:', error);
            alert("An error occurred while deleting enemy. Please try again.");
        }
    }
}

async function cancelEnemy() {
    if (confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
        closeEnemyWindow();
    }
}

function closeEnemyWindow() {
    document.getElementById('Enemy_Overlay').style.display = 'none';
    invalidateEnemyListeners();
}

function activateEnemyListeners(enemy) {
    // Set up event listener for savedCreatureButton
    document.getElementById('savedCreatureButton').onclick = function() {
        handleCreatureClick();
    };

    // Set up event listener save button
    document.getElementById('saveEnemy').onclick = function() {
        saveEnemy(enemy);
    };

    // Set up event listener for delete button
    document.getElementById('deleteEnemy').onclick = function() {
        deleteEnemy(enemy);
    };

    // Set up event listener for cancel button
    document.getElementById('cancelEnemy').onclick = function() {
        cancelEnemy();
    };
}

function invalidateEnemyListeners() {
    document.getElementById('savedCreatureButton').onclick = null;
    document.getElementById('saveEnemy').onclick = null;
    document.getElementById('deleteEnemy').onclick = null;
    document.getElementById('cancelEnemy').onclick = null;
}

function closeCreaturesOverlay(selectedCreatureName) {
    document.getElementById('Creatures_Overlay').style.display = 'none';

    if (selectedCreatureName) {
        // Make an API call to fetch the full creature stats using selectedCreatureName
        fetch(`/api/creatures/${selectedCreatureName}`)
            .then(response => {
                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Failed to fetch creature stats');
                }
                // Parse the JSON response
                return response.json();
            })
            .then(creature => {
                // Populate the Enemy_Overlay with the fetched creature stats
                document.getElementById('enemyName').value = creature.name;
                document.getElementById('enemyQuantity').value = '';
                document.getElementById('enemyAC').value = creature.AC;
                document.getElementById('enemyHP').value = creature.HP;
                document.getElementById('enemyAttackBonus').value = creature.attackBonus;
                document.getElementById('enemySaveDC').value = creature.saveDC;
                document.getElementById('enemyAvgDamage').value = creature.avgDamage;
            })
            .catch(error => {
                // Handle any errors that occur during the fetch
                console.error('Error fetching creature stats:', error.message);
            });
    }

    activateEnemyListeners(null);
}


function handleCreatureClick() {
    invalidateEnemyListeners();

    // Open Creatures_Overlay
    const creaturesOverlay = document.getElementById('Creatures_Overlay');
    creaturesOverlay.style.display = 'block';

    // Populate the creatures list when the DOM content is loaded
    populateCreaturesList();
    
    // Set up event listeners for select and cancel buttons
    document.getElementById('selectCreature').addEventListener('click', function() {
        const creatureName = getSelectedCreature();
        if (creatureName) {
            closeCreaturesOverlay(creatureName);
        } else {
            alert("No creature selected! Select a creature or cancel.");
        }
    });

    document.getElementById('cancelCreature').addEventListener('click', function() {
        closeCreaturesOverlay(null);
    });
}


// Functions for Creature List
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

    fetch('/api/creatures')
        .then(response => response.json())
        .then(creatures => {
            // Populate the list with fetched creatures
            creatures.forEach(creature => {
                const p = document.createElement("p");
                p.textContent = creature;
                creaturesList.appendChild(p);
            });
        })
        .catch(error => {
            // Handle any errors
            console.error('Error fetching creatures:', error);
        });
}

// Add event listener to the "compute" button
document.getElementById("compute").addEventListener("click", function() {
    // Check if both party and encounter are selected
    const selectedParty = document.getElementById("partyname").value.trim();
    const selectedEncounter = document.getElementById("encountername").value.trim();

    if (selectedParty && selectedEncounter) {
        fetchResults(selectedParty, selectedEncounter);
    } else {
        // If either party or encounter is not selected, display an error message
        alert("Please select both a party and an encounter.");
    }
});

async function fetchResults(party, encounter) {
    try {
        // Fetch results from the server
        const response = await fetch(`/api/calculate/${party}/${encounter}`);
        const data = await response.json();

        // Display the results in the output windows
        document.getElementById("overallChallengeResult").textContent = data.overallChallengeResult;
        document.getElementById("defensiveChallengeResult").textContent = data.defensiveChallengeResult;
        document.getElementById("offensiveChallengeResult").textContent = data.offensiveChallengeResult;
    } catch (error) {
        console.error('Error fetching results:', error);
        // Display an error message
        alert("An error occurred while fetching results. Please try again later.");
    }
}

function clearOutputWindows() {
    document.getElementById("overallChallengeResult").textContent = "";
    document.getElementById("defensiveChallengeResult").textContent = "";
    document.getElementById("offensiveChallengeResult").textContent = "";
}