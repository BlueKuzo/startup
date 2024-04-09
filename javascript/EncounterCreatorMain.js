document.addEventListener("DOMContentLoaded", function() {
    // Fetch parties data and generate HTML for the list
    generatePartyList(fetchParties());
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
    partiesList.appendChild(addPartyToList("+ New Party"));

    // Generate HTML for each party
    parties.forEach(party => {
        partiesList.appendChild(addPartyToList(party));
    });
}

function addPartyToList(name){
    const partyElement = document.createElement("p");
    partyElement.textContent = name;

    return partyElement;
}
