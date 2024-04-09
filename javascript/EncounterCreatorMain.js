document.addEventListener("DOMContentLoaded", function() {
    // Fetch parties data and generate HTML for the list
    generatePartyList(fetchParties());

    // Fetch encounters data and generate HTML for the list
    generateEncounterList(fetchEncounters());

    // Simulate click on "New Party" to initialize the party list
    document.querySelector("#partiesList p").click();

    // Simulate click on "New Encounter" to initialize the encounter list
    document.querySelector("#encountersList p").click();
});

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
    ]
};

// Define encounter data in a single object
const encountersDataOld = {
    "Mummies": ["Mummy"],
    "Water Crater": ["Water Elemental", "Earth Elemental", "Mud Elemental"]
};

const encountersData = {
    "Troll Surprise": [
        { name: "Troll", quantity: 1, AC: 15, HP: 84, attackBonus: 7, saveDC: null, avgDamage: 28 },
        { name: "Goblin Boss", quantity: 1, AC: 17, HP: 21, attackBonus: 4, saveDC: null, avgDamage: 8 },
        { name: "Goblin", quantity: 8, AC: 15, HP: 7, attackBonus: 4, saveDC: null, avgDamage: 5 }
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
        { name: "Earth Elemental", quantity: 2, AC: 17, HP: 126, attackBonus: 8, saveDC: null, avgDamage: 28 },
        { name: "Mud Elemental", quantity: 8, AC: 14, HP: 61, attackBonus: 6, saveDC: null, avgDamage: 12 }
    ]
};

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
    newCharacter.textContent = `${characterName} Level: ${characterLevel} Class: ${characterClass}`;
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
    // Open a popup window to display the character's data
    const characterWindow = window.open("PCWindow.html", "Character Window", "width=fit-content, height=fit-content");
    
    // Load character's data into the popup window
    characterWindow.onload = function() {
        const characterData = partiesData[characterName];
        if (characterData) {
            characterWindow.document.getElementById("characterName").value = characterName;
            characterWindow.document.getElementById("race").value = characterData.race || "";
            characterWindow.document.getElementById("level").value = characterData.level || "";
            characterWindow.document.getElementById("class").value = characterData.class || "";
        }
    };
}

function handleEnemyClick(enemyName) {
    // Open a popup window to display the enemy's data
    const enemyWindow = window.open("CreatureWindow.html", "Enemy Window", "width=fit-content, height=fit-content");
    
    // Load enemy's data into the popup window
    enemyWindow.onload = function() {
        const enemyData = encountersData[enemyName];
        if (enemyData) {
            enemyWindow.document.getElementById("characterName").value = enemyName;
            enemyWindow.document.getElementById("number").value = enemyData.quantity || "";
            enemyWindow.document.getElementById("AC").value = enemyData.AC || "";
            enemyWindow.document.getElementById("HP").value = enemyData.HP || "";
            enemyWindow.document.getElementById("attack").value = enemyData.attackBonus || "";
            enemyWindow.document.getElementById("DC").value = enemyData.saveDC || "";
            enemyWindow.document.getElementById("damage").value = enemyData.avgDamage || "";
        }
    };
}