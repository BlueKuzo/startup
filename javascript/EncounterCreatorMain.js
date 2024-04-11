document.addEventListener("DOMContentLoaded", function() {
    // Fetch parties data and generate HTML for the list
    generatePartyList(fetchParties());

    // Fetch encounters data and generate HTML for the list
    generateEncounterList(fetchEncounters());

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
        window.location.href = "../index.html";
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

// Define party data in a single object
const partiesData = {
    "Glugnog": [
        { name: "Spectrum", race: "Fire Genasi", level: 7, class: "Cleric" },
        { name: "Gnorbert", race: "Gnome", level: 7, class: "Sorcerer" },
        { name: "Barystios", race: "Centaur", level: 7, class: "Barbarian" },
        { name: "Kia", race: "Wood Elf", level: 7, class: "Monk" }
    ],
    "Kaazime and Pals": [
        { name: "Kaazime", race: "Air Genasi", level: 10, class: "Warlock" },
        { name: "Jandar, the Forgotten", race: "High Elf", level: 10, class: "Ranger" },
        { name: "Leika", race: "Human", level: 10, class: "Fighter" },
        { name: "Cassius", race: "Half-elf", level: 10, class: "Cleric" },
        { name: "Feld", race: "Dwarf", level: 10, class: "Paladin" },
        { name: "Nova", race: "Human", level: 10, class: "Rogue" }
    ],
    "Biscuits and Kwazy": [
        { name: "Branwyn", race: "Human", level: 3, class: "Paladin" },
        { name: "Teddy", race: "Tabaxi", level: 3, class: "Fighter" },
        { name: "Mabel", race: "Wood Elf", level: 3, class: "Cleric" },
        { name: "Luna", race: "Warforged", level: 3, class: "Wizard" }
    ],
    "Vox Machina": [
        { name: "Vex", race: "Half-elf", level: 13, class: "Multiclass" },
        { name: "Vax", race: "Half-elf", level: 13, class: "Ranger" },
        { name: "Scanlan", race: "Gnome", level: 13, class: "Bard" },
        { name: "Grog", race: "Goliath", level: 13, class: "Barbarian" },
        { name: "Pike", race: "Gnome", level: 13, class: "Cleric" },
        { name: "Percy", race: "Human", level: 13, class: "Fighter" },
        { name: "Keyleth", race: "Half-elf", level: 13, class: "Druid" }
    ],
    "The Mighty Nein": [
        { name: "Caleb", race: "Human", level: 9, class: "Wizard" },
        { name: "Jester", race: "Tiefling", level: 9, class: "Cleric" },
        { name: "Fjord", race: "Half-orc", level: 9, class: "Warlock" },
        { name: "Nott", race: "Goblin", level: 9, class: "Rogue" },
        { name: "Caduceus", race: "Firbolg", level: 9, class: "Cleric" },
        { name: "Beauregard", race: "Human", level: 9, class: "Monk" },
        { name: "Yasha", race: "Assimar", level: 9, class: "Barbarian" }
    ],
    "Bells Hells": [
        { name: "Ashton", race: "Human", level: 4, class: "Barbarian" },
        { name: "FCG", race: "Warforged", level: 4, class: "Cleric" },
        { name: "Chetney", race: "Human", level: 4, class: "Rogue" },
        { name: "Dorian", race: "Human", level: 4, class: "Bard" },
        { name: "Fearne", race: "Human", level: 4, class: "Druid" },
        { name: "Imogen", race: "Human", level: 4, class: "Sorcerer" },
        { name: "Laudna", race: "Human", level: 4, class: "Warlock" }
    ],
    "Whimsical Wanderers": [
        { name: "Ariadne", race: "Human", level: 1, class: "Paladin" },
        { name: "Thalian", race: "Human", level: 1, class: "Warlock" },
        { name: "Grimnir", race: "Human", level: 1, class: "Druid" },
        { name: "Lyra", race: "Human", level: 1, class: "Brawler" },
        { name: "Sorin", race: "Human", level: 1, class: "Fighter" }
    ],
    "Glugnog 2": [
        { name: "Spectrum", race: "Fire Genasi", level: 7, class: "Cleric" },
        { name: "Gnorbert", race: "Gnome", level: 7, class: "Sorcerer" },
        { name: "Barystios", race: "Centaur", level: 7, class: "Barbarian" },
        { name: "Kia", race: "Wood Elf", level: 7, class: "Monk" }
    ],
    "Kaazime and Pals 2": [
        { name: "Kaazime", race: "Air Genasi", level: 10, class: "Warlock" },
        { name: "Jandar, the Forgotten", race: "High Elf", level: 10, class: "Ranger" },
        { name: "Leika", race: "Human", level: 10, class: "Fighter" },
        { name: "Cassius", race: "Half-elf", level: 10, class: "Cleric" },
        { name: "Feld", race: "Dwarf", level: 10, class: "Paladin" },
        { name: "Nova", race: "Human", level: 10, class: "Rogue" }
    ],
    "Biscuits and Kwazy 2": [
        { name: "Branwyn", race: "Human", level: 3, class: "Paladin" },
        { name: "Teddy", race: "Tabaxi", level: 3, class: "Fighter" },
        { name: "Mabel", race: "Wood Elf", level: 3, class: "Cleric" },
        { name: "Luna", race: "Warforged", level: 3, class: "Wizard" }
    ],
    "Vox Machina 2": [
        { name: "Vex", race: "Half-elf", level: 13, class: "Multiclass" },
        { name: "Vax", race: "Half-elf", level: 13, class: "Ranger" },
        { name: "Scanlan", race: "Gnome", level: 13, class: "Bard" },
        { name: "Grog", race: "Goliath", level: 13, class: "Barbarian" },
        { name: "Pike", race: "Gnome", level: 13, class: "Cleric" },
        { name: "Percy", race: "Human", level: 13, class: "Fighter" },
        { name: "Keyleth", race: "Half-elf", level: 13, class: "Druid" }
    ],
    "The Mighty Nein 2": [
        { name: "Caleb", race: "Human", level: 9, class: "Wizard" },
        { name: "Jester", race: "Tiefling", level: 9, class: "Cleric" },
        { name: "Fjord", race: "Half-orc", level: 9, class: "Warlock" },
        { name: "Nott", race: "Goblin", level: 9, class: "Rogue" },
        { name: "Caduceus", race: "Firbolg", level: 9, class: "Cleric" },
        { name: "Beauregard", race: "Human", level: 9, class: "Monk" },
        { name: "Yasha", race: "Assimar", level: 9, class: "Barbarian" }
    ],
    "Bells Hells 2": [
        { name: "Ashton", race: "Human", level: 4, class: "Barbarian" },
        { name: "FCG", race: "Warforged", level: 4, class: "Cleric" },
        { name: "Chetney", race: "Human", level: 4, class: "Rogue" },
        { name: "Dorian", race: "Human", level: 4, class: "Bard" },
        { name: "Fearne", race: "Human", level: 4, class: "Druid" },
        { name: "Imogen", race: "Human", level: 4, class: "Sorcerer" },
        { name: "Laudna", race: "Human", level: 4, class: "Warlock" }
    ],
    "Whimsical Wanderers 2": [
        { name: "Ariadne", race: "Human", level: 1, class: "Paladin" },
        { name: "Thalian", race: "Human", level: 1, class: "Warlock" },
        { name: "Grimnir", race: "Human", level: 1, class: "Druid" },
        { name: "Lyra", race: "Human", level: 1, class: "Brawler" },
        { name: "Sorin", race: "Human", level: 1, class: "Fighter" }
    ],
    "Glugnog 3": [
        { name: "Spectrum", race: "Fire Genasi", level: 7, class: "Cleric" },
        { name: "Gnorbert", race: "Gnome", level: 7, class: "Sorcerer" },
        { name: "Barystios", race: "Centaur", level: 7, class: "Barbarian" },
        { name: "Kia", race: "Wood Elf", level: 7, class: "Monk" }
    ],
    "Kaazime and Pals 3": [
        { name: "Kaazime", race: "Air Genasi", level: 10, class: "Warlock" },
        { name: "Jandar, the Forgotten", race: "High Elf", level: 10, class: "Ranger" },
        { name: "Leika", race: "Human", level: 10, class: "Fighter" },
        { name: "Cassius", race: "Half-elf", level: 10, class: "Cleric" },
        { name: "Feld", race: "Dwarf", level: 10, class: "Paladin" },
        { name: "Nova", race: "Human", level: 10, class: "Rogue" }
    ],
    "Biscuits and Kwazy 3": [
        { name: "Branwyn", race: "Human", level: 3, class: "Paladin" },
        { name: "Teddy", race: "Tabaxi", level: 3, class: "Fighter" },
        { name: "Mabel", race: "Wood Elf", level: 3, class: "Cleric" },
        { name: "Luna", race: "Warforged", level: 3, class: "Wizard" }
    ],
    "Vox Machina 3": [
        { name: "Vex", race: "Half-elf", level: 13, class: "Multiclass" },
        { name: "Vax", race: "Half-elf", level: 13, class: "Ranger" },
        { name: "Scanlan", race: "Gnome", level: 13, class: "Bard" },
        { name: "Grog", race: "Goliath", level: 13, class: "Barbarian" },
        { name: "Pike", race: "Gnome", level: 13, class: "Cleric" },
        { name: "Percy", race: "Human", level: 13, class: "Fighter" },
        { name: "Keyleth", race: "Half-elf", level: 13, class: "Druid" }
    ],
    "The Mighty Nein 3": [
        { name: "Caleb", race: "Human", level: 9, class: "Wizard" },
        { name: "Jester", race: "Tiefling", level: 9, class: "Cleric" },
        { name: "Fjord", race: "Half-orc", level: 9, class: "Warlock" },
        { name: "Nott", race: "Goblin", level: 9, class: "Rogue" },
        { name: "Caduceus", race: "Firbolg", level: 9, class: "Cleric" },
        { name: "Beauregard", race: "Human", level: 9, class: "Monk" },
        { name: "Yasha", race: "Assimar", level: 9, class: "Barbarian" }
    ],
    "Bells Hells 3": [
        { name: "Ashton", race: "Human", level: 4, class: "Barbarian" },
        { name: "FCG", race: "Warforged", level: 4, class: "Cleric" },
        { name: "Chetney", race: "Human", level: 4, class: "Rogue" },
        { name: "Dorian", race: "Human", level: 4, class: "Bard" },
        { name: "Fearne", race: "Human", level: 4, class: "Druid" },
        { name: "Imogen", race: "Human", level: 4, class: "Sorcerer" },
        { name: "Laudna", race: "Human", level: 4, class: "Warlock" }
    ],
    "Whimsical Wanderers 3": [
        { name: "Ariadne", race: "Human", level: 1, class: "Paladin" },
        { name: "Thalian", race: "Human", level: 1, class: "Warlock" },
        { name: "Grimnir", race: "Human", level: 1, class: "Druid" },
        { name: "Lyra", race: "Human", level: 1, class: "Brawler" },
        { name: "Sorin", race: "Human", level: 1, class: "Fighter" }
    ]
};

// Define encounter data in a single object
const encountersData = {
    "Troll Surprise": [
        { name: "Troll", quantity: 1, AC: 15, HP: 84, attackBonus: 7, saveDC: '', avgDamage: 28 },
        { name: "Goblin Boss", quantity: 1, AC: 17, HP: 21, attackBonus: 4, saveDC: '', avgDamage: 8 },
        { name: "Goblin", quantity: 8, AC: 15, HP: 7, attackBonus: 4, saveDC: '', avgDamage: 5 }
    ],
    "Yiga Ambush": [
        { name: "Yiga Footsoldier", quantity: 3, AC: 14, HP: 52, attackBonus: 5, saveDC: 13, avgDamage: 14 },
        { name: "Viga Archer", quantity: 3, AC: 14, HP: 52, attackBonus: 5, saveDC: 11, avgDamage: 14 }
    ],
    "Kohga": [
        { name: "Master Kohga", quantity: 1, AC: 18, HP: 127, attackBonus: 9, saveDC: 17, avgDamage: 12 },
        { name: "Yiga Footsoldier", quantity: 3, AC: 14, HP: 52, attackBonus: 5, saveDC: 13, avgDamage: 14 },
        { name: "Viga Archer", quantity: 3, AC: 14, HP: 52, attackBonus: 5, saveDC: 11, avgDamage: 14 },
        { name: "Viga Blademaster", quantity: 1, AC: 16, HP: 84, attackBonus: 7, saveDC: 15, avgDamage: 20 }
    ],
    "Mummies": [
        { name: "Mummy", quantity: 6, AC: 11, HP: 58, attackBonus: 5, saveDC: 12, avgDamage: 20 }
    ],
    "Water Crater": [
        { name: "Water Elemental", quantity: 2, AC: 14, HP: 114, attackBonus: 7, saveDC: 15, avgDamage: 26 },
        { name: "Earth Elemental", quantity: 2, AC: 17, HP: 126, attackBonus: 8, saveDC: '', avgDamage: 28 },
        { name: "Mud Elemental", quantity: 8, AC: 14, HP: 61, attackBonus: 6, saveDC: '', avgDamage: 12 }
    ],
        "Troll Surprise 2": [
        { name: "Troll", quantity: 1, AC: 15, HP: 84, attackBonus: 7, saveDC: '', avgDamage: 28 },
        { name: "Goblin Boss", quantity: 1, AC: 17, HP: 21, attackBonus: 4, saveDC: '', avgDamage: 8 },
        { name: "Goblin", quantity: 8, AC: 15, HP: 7, attackBonus: 4, saveDC: '', avgDamage: 5 }
    ],
    "Yiga Ambush 2": [
        { name: "Yiga Footsoldier", quantity: 3, AC: 14, HP: 52, attackBonus: 5, saveDC: 13, avgDamage: 14 },
        { name: "Viga Archer", quantity: 3, AC: 14, HP: 52, attackBonus: 5, saveDC: 11, avgDamage: 14 }
    ],
    "Kohga 2": [
        { name: "Master Kohga", quantity: 1, AC: 18, HP: 127, attackBonus: 9, saveDC: 17, avgDamage: 12 },
        { name: "Yiga Footsoldier", quantity: 3, AC: 14, HP: 52, attackBonus: 5, saveDC: 13, avgDamage: 14 },
        { name: "Viga Archer", quantity: 3, AC: 14, HP: 52, attackBonus: 5, saveDC: 11, avgDamage: 14 },
        { name: "Viga Blademaster", quantity: 1, AC: 16, HP: 84, attackBonus: 7, saveDC: 15, avgDamage: 20 }
    ],
    "Mummies 2": [
        { name: "Mummy", quantity: 6, AC: 11, HP: 58, attackBonus: 5, saveDC: 12, avgDamage: 20 }
    ],
    "Water Crater 2": [
        { name: "Water Elemental", quantity: 2, AC: 14, HP: 114, attackBonus: 7, saveDC: 15, avgDamage: 26 },
        { name: "Earth Elemental", quantity: 2, AC: 17, HP: 126, attackBonus: 8, saveDC: '', avgDamage: 28 },
        { name: "Mud Elemental", quantity: 8, AC: 14, HP: 61, attackBonus: 6, saveDC: '', avgDamage: 12 }
    ],
    "Troll Surprise 3": [
        { name: "Troll", quantity: 1, AC: 15, HP: 84, attackBonus: 7, saveDC: '', avgDamage: 28 },
        { name: "Goblin Boss", quantity: 1, AC: 17, HP: 21, attackBonus: 4, saveDC: '', avgDamage: 8 },
        { name: "Goblin", quantity: 8, AC: 15, HP: 7, attackBonus: 4, saveDC: '', avgDamage: 5 }
    ],
    "Yiga Ambush 3": [
        { name: "Yiga Footsoldier", quantity: 3, AC: 14, HP: 52, attackBonus: 5, saveDC: 13, avgDamage: 14 },
        { name: "Viga Archer", quantity: 3, AC: 14, HP: 52, attackBonus: 5, saveDC: 11, avgDamage: 14 }
    ],
    "Kohga 3": [
        { name: "Master Kohga", quantity: 1, AC: 18, HP: 127, attackBonus: 9, saveDC: 17, avgDamage: 12 },
        { name: "Yiga Footsoldier", quantity: 3, AC: 14, HP: 52, attackBonus: 5, saveDC: 13, avgDamage: 14 },
        { name: "Viga Archer", quantity: 3, AC: 14, HP: 52, attackBonus: 5, saveDC: 11, avgDamage: 14 },
        { name: "Viga Blademaster", quantity: 1, AC: 16, HP: 84, attackBonus: 7, saveDC: 15, avgDamage: 20 }
    ],
    "Mummies 3": [
        { name: "Mummy", quantity: 6, AC: 11, HP: 58, attackBonus: 5, saveDC: 12, avgDamage: 20 }
    ],
    "Water Crater 3": [
        { name: "Water Elemental", quantity: 2, AC: 14, HP: 114, attackBonus: 7, saveDC: 15, avgDamage: 26 },
        { name: "Earth Elemental", quantity: 2, AC: 17, HP: 126, attackBonus: 8, saveDC: '', avgDamage: 28 },
        { name: "Mud Elemental", quantity: 8, AC: 14, HP: 61, attackBonus: 6, saveDC: '', avgDamage: 12 }
    ]

};

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

function fetchParties() {
    // Return party names from the centralized party data object
    return Object.keys(partiesData);
}

function fetchEncounters() {
    // Return encounter names from the centralized encounter data object
    return Object.keys(encountersData);
}

// Function to generate HTML for party list
function generatePartyList(parties) {
    const partiesList = document.getElementById("partiesList");

    // Clear existing list
    partiesList.innerHTML = "";

    // Generate HTML to add a new party
    partiesList.appendChild(createNewPartyElement());

    // Generate HTML for each party
    parties.forEach(party => {
        partiesList.appendChild(createPartyElement(party));
    });
}

// Function to generate HTML for encounter list
function generateEncounterList(encounters) {
    const encountersList = document.getElementById("encountersList");

    // Clear existing list
    encountersList.innerHTML = "";

    // Generate HTML to add a new encounter
    encountersList.appendChild(createNewEncounterElement());

    // Generate HTML for each encounter
    encounters.forEach(encounter => {
        encountersList.appendChild(createEncounterElement(encounter));
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

function createPartyElement(partyName){
    const partyElement = document.createElement("p");
    partyElement.textContent = partyName;
    partyElement.addEventListener("click", function() {
        clearOutputWindows();

        // Fill party name input field
        document.getElementById("partyname").value = partyName;

        // Fill partyList with members
        const partyList = document.getElementById("partyList");
        partyList.innerHTML = ""; // Clear existing list

        // Add option to create a new character
        partyList.appendChild(addNewCharacterOption());

        partiesData[partyName].forEach(character => {
            partyList.appendChild(addCharacter(character.name, character.level, character.class));
        });
    });

    return partyElement;
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

function createEncounterElement(encounterName) {
    const encounterElement = document.createElement("p");
    encounterElement.textContent = encounterName;
    encounterElement.addEventListener("click", function() {
        clearOutputWindows();

        // Fill encounter name input field
        document.getElementById("encountername").value = encounterName;

        // Fill enemiesList with enemies
        const enemiesList = document.getElementById("enemiesList");
        enemiesList.innerHTML = ""; // Clear existing list

        // Add option to create a new enemy
        enemiesList.appendChild(addNewEnemyOption());

        encountersData[encounterName].forEach(enemy => {
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

// Function to handle click event on characters in the party list
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

    // Set up event listeners for save, delete, and cancel buttons
    document.getElementById('savePC').addEventListener('click', function() {
        alert("Character saved!");
        // Handle save action
        clearOutputWindows();

        // Close PC_Overlay
        PCOverlay.style.display = 'none';
    });

    document.getElementById('deletePC').addEventListener('click', function() {
        if (confirm("Are you sure you want to delete this character?")) {
            alert("Character deleted!");
            // Handle delete action
            clearOutputWindows();

            // Close PC_Overlay
            PCOverlay.style.display = 'none';
        }
    });

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

// Populate the creatures list
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