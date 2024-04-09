document.addEventListener("DOMContentLoaded", function() {
    // Fetch parties data and generate HTML for the list
    generatePartyList(fetchParties());

    // Simulate click on "New Party" to initialize the party list
    document.querySelector("#partiesList p").click();
});


function fetchParties() {
    // Dummy party data
    const parties = [
        "Glugnog",
        "Kaazime and Pals",
        "Biscuits and Kwazy",
        "Vox Machina",
        "The Mighty Nein",
        "Bells Hells",
        "Whimsical Wanderers"
    ];
    
    return parties;
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

        partyMembers[partyName].forEach(characterName => {
            partyList.appendChild(addCharacter(characterName));
        });
    });

    return partyElement;
}


function addCharacter(characterName) {
    const NewCharacter = document.createElement("p");
    NewCharacter.textContent = characterName;

    return NewCharacter;
}

// Dummy data for party members
const partyMembers = {
    "Glugnog": ["Spectrum", "Gnorbert", "Barystios", "Kia"],
    "Kaazime and Pals": ["Kaazime", "Jandar, the Forgotten", "Leika", "Cassius", "Feld", "Nova"],
    "Biscuits and Kwazy": ["Branwyn", "Teddy", "Mabel", "Luna"],
    "Vox Machina": ["Vex", "Vax", "Scanlan", "Grog", "Pike", "Percy", "Keyleth"],
    "The Mighty Nein": ["Caleb", "Jester", "Fjord", "Nott", "Caduceus", "Beauregard", "Yasha"],
    "Bells Hells": ["Ashton", "FCG", "Chetney", "Dorian", "Fearne", "Imogen", "Laudna"],
    "Whimsical Wanderers": ["Ariadne", "Thalian", "Grimnir", "Lyra", "Sorin"]
};
