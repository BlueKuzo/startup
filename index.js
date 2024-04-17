const express = require('express');
const app = express();


// Define parties and their characters
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

// Define encounter data
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

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);



//load list of parties
apiRouter.get('/parties', (req, res) => {
  // Send the party names as a JSON response
  res.json(Object.keys(partiesData));
});

//load party
apiRouter.get('/characters', (req, res) => {
    // Extract the party name from the query parameters
    const partyName = req.query.partyName;

    // Check if the party name is provided in the query parameters
    if (!partyName) {
        return res.status(400).json({ error: 'Party name is required' });
    }

    // Assuming you have a database or data structure where characters are stored
    // Fetch characters associated with the provided party name from your data source
    // For demonstration purposes, let's assume characters are stored in the partiesData object
    const characters = partiesData[partyName] || [];

    // Respond with the characters associated with the party
    res.json(characters);
});

//save party
apiRouter.post('/saveParty', (req, res) => {
    // Extract data from the request body
    const { newPartyName, savedPartyName } = req.body;
  
    // Check if the new party name already exists
    if (partiesData.hasOwnProperty(newPartyName)) {
        return res.status(400).json({ error: 'Party name already exists' });
    }
    
    // Check if the saved party name exists
    if (partiesData.hasOwnProperty(savedPartyName)) {
        // Replace the saved party name with the new party name
        partiesData[newPartyName] = partiesData[savedPartyName];
        // Delete the old party name
        delete partiesData[savedPartyName];
    } else {
        // If saved party name doesn't exist, create a new party with newPartyName
        partiesData[newPartyName] = [];
    }
  
    // Send a success response
    res.status(200).json({ message: 'Party name saved successfully'});
});

//save character
apiRouter.post('/saveCharacter', (req, res) => {
    // Extract data from the request body
    const { partyName, characterSave, characterDelete } = req.body;
  
    // Check if the partyName is a valid key in partiesData
    if (!partiesData.hasOwnProperty(partyName)) {
      // If partyName is not a name in partiesData, create a new party named partyName with characterSave as a member
      partiesData[partyName] = [characterSave];
    }

    else if (characterDelete == null) {
        //Add characterSave as a new member to the party
        partiesData[partyName].push(characterSave);
    }
    
    else {
      const partyMembers = partiesData[partyName];
      const existingCharacterIndex = partyMembers.findIndex(member => member.name === characterDelete?.name);
      
      if (existingCharacterIndex !== -1) {
        // If characterDelete is a member of that party, replace them with characterSave
        partyMembers.splice(existingCharacterIndex, 1, characterSave);
      }
      
      else {
        // Else, add characterSave as a new member to the party
        partyMembers.push(characterSave);
      }
    }
  
    // Send a success response
    res.status(200).json({ message: 'Character saved successfully'});
});

//delete character
apiRouter.post('/deleteCharacter', (req, res) => {
    // Extract data from the request body
    const { partyName, characterDelete } = req.body;

    // Check if the partyName is a valid key in partiesData
    if (!partiesData.hasOwnProperty(partyName)) {
        return res.status(404).json({ error: 'Party not found' });
    }

    // Find the index of the character to delete
    const partyMembers = partiesData[partyName];
    const characterIndex = partyMembers.findIndex(member => member.name === characterDelete.name);

    // Check if the character exists in the party
    if (characterIndex === -1) {
        return res.status(404).json({ error: 'Character not found in the party' });
    }

    // Remove the character from the party
    partyMembers.splice(characterIndex, 1);

    // Send a success response
    res.status(200).json({ message: 'Character deleted successfully' });
});



//load encounter list
apiRouter.get('/encounters', (req, res) => {  
    // Send the party names as a JSON response
    res.json(encountersData);
});

//save encounter

//load encounter

//save creature

//delete creature

//load creature

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});