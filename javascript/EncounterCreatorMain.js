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
    "Glugnog": ["Spectrum", "Gnorbert", "Barystios", "Kia"],
    "Kaazime and Pals": ["Kaazime", "Jandar, the Forgotten", "Leika", "Cassius", "Feld", "Nova"],
    "Biscuits and Kwazy": ["Branwyn", "Teddy", "Mabel", "Luna"],
    "Vox Machina": ["Vex", "Vax", "Scanlan", "Grog", "Pike", "Percy", "Keyleth"],
    "The Mighty Nein": ["Caleb", "Jester", "Fjord", "Nott", "Caduceus", "Beauregard", "Yasha"],
    "Bells Hells": ["Ashton", "FCG", "Chetney", "Dorian", "Fearne", "Imogen", "Laudna"],
    "Whimsical Wanderers": ["Ariadne", "Thalian", "Grimnir", "Lyra", "Sorin"]
};

// Define encounter data in a single object
const encountersData = {
    "Troll Surprise": ["Troll", "Goblin Boss", "Goblin"],
    "Yiga Ambush": ["Yiga Footsoldier", "Viga Archer"],
    "Kohga": ["Master Kohga", "Yiga Footsoldier", "Viga Archer", "Yiga Blademaster"],
    "Mummies": ["Mummy"],
    "Water Crater": ["Water Elemental", "Earth Elemental", "Mud Elemental"]
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
        partyList.appendChild(addCharacter("+ New Character"));
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
        partyList.appendChild(addCharacter("+ New Character"));

        partiesData[partyName].forEach(characterName => {
            partyList.appendChild(addCharacter(characterName));
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
        enemiesList.appendChild(addEnemy("+ New Enemy"));
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
        enemiesList.appendChild(addEnemy("+ New Enemy"));

        encountersData[encounterName].forEach(enemyName => {
            enemiesList.appendChild(addEnemy(enemyName));
        });
    });

    return encounterElement;
}

function addCharacter(characterName) {
    const NewCharacter = document.createElement("p");
    NewCharacter.textContent = characterName;

    return NewCharacter;
}

function addEnemy(enemyName) {
    const newEnemy = document.createElement("p");
    newEnemy.textContent = enemyName;

    return newEnemy;
}
