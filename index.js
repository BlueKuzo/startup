const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { validate } = require('uuid');

const authCookieName = 'token';


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
      { name: "Yiga Archer", quantity: 3, AC: 14, HP: 52, attackBonus: 5, saveDC: 11, avgDamage: 14 }
  ],
  "Kohga": [
      { name: "Master Kohga", quantity: 1, AC: 18, HP: 127, attackBonus: 9, saveDC: 17, avgDamage: 12 },
      { name: "Yiga Footsoldier", quantity: 3, AC: 14, HP: 52, attackBonus: 5, saveDC: 13, avgDamage: 14 },
      { name: "Yiga Archer", quantity: 3, AC: 14, HP: 52, attackBonus: 5, saveDC: 11, avgDamage: 14 },
      { name: "Yiga Blademaster", quantity: 1, AC: 16, HP: 84, attackBonus: 7, saveDC: 15, avgDamage: 20 }
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
    { name: "Troll", AC: 15, HP: 84, attackBonus: 7, saveDC: '', avgDamage: 28 },
    { name: "Goblin Boss", AC: 17, HP: 21, attackBonus: 4, saveDC: '', avgDamage: 8 },
    { name: "Goblin", AC: 15, HP: 7, attackBonus: 4, saveDC: '', avgDamage: 5 },
    { name: "Yiga Footsoldier", AC: 14, HP: 52, attackBonus: 5, saveDC: 13, avgDamage: 14 },
    { name: "Yiga Archer", AC: 14, HP: 52, attackBonus: 5, saveDC: 11, avgDamage: 14 },
    { name: "Yiga Blademaster", AC: 16, HP: 84, attackBonus: 7, saveDC: 15, avgDamage: 20 },
    { name: "Master Kohga", AC: 18, HP: 127, attackBonus: 9, saveDC: 17, avgDamage: 12 },
    { name: "Mummy", AC: 11, HP: 58, attackBonus: 5, saveDC: 12, avgDamage: 20 },
    { name: "Water Elemental", AC: 14, HP: 114, attackBonus: 7, saveDC: 15, avgDamage: 26 },
    { name: "Earth Elemental", AC: 17, HP: 126, attackBonus: 8, saveDC: '', avgDamage: 28 },
    { name: "Mud Elemental", AC: 14, HP: 61, attackBonus: 6, saveDC: '', avgDamage: 12 }
];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);



// Attempt to create a new user
apiRouter.post('/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password) {
      return res.status(400).send({ error: 'Please provide username, email, and password' });
  }

  // Check if User with this email already exists
  if (await DB.getUserByEmail(email)) {
      return res.status(408).send({ error: 'User with this email already exists' });
  }

  // Check if User with this username already exists
  if (await DB.getUserByName(username)) {
      return res.status(409).send({ error: 'Username already exists' });
  }

  try {
      const user = await DB.createUser(email, username, password);
      setAuthCookie(res, user.token);
      res.status(200).send({ id: user._id });
  }
  
  catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send({ error: 'Internal server error' });
  }
});

// Attempt login with the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
      return res.status(400).send({ error: 'Please provide email/username and password' });
  }

  user = null;

  if (username) { user = await DB.getUserByName(username); }
  else if (email) { user = await DB.getUserByEmail(email); }

  if (!user) { return res.status(401).send({ error: 'User not found' }); }

  if (!await bcrypt.compare(password, user.password)) {
      return res.status(401).send({ error: 'Invalid password' });
  }

  setAuthCookie(res, user.token);
  res.send({ id: user._id });
  return;
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
});


// Get the username
apiRouter.get('/username', async (req, res) => {
  try {
    const user = await validateToken(req.cookies.token);

    if (user) {
      res.json(user.username);
    }
    
    else {
      res.status(404).json({ error: 'Invalid authToken' });
    }
  }
  
  catch (error) {
    console.error('Error getting username:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Load list of parties from the database
apiRouter.get('/parties', async (req, res) => {
  try {
    const user = await validateToken(req.cookies.token);

    if (user) {
      res.json(await DB.getPartyNames(user.username));
    }
    
    else {
      res.status(404).json({ error: 'Invalid authToken' });
    }
  }
  
  catch (error) {
    console.error('Error loading parties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//load party
apiRouter.get('/characters', async (req, res) => {
  try {
    const user = await validateToken(req.cookies.token);

    if (user) {
      // Extract the party name from the query parameters
      const partyName = req.query.partyName;

      // Check if the party name is provided in the query parameters
      if (!partyName) {
        return res.status(400).json({ error: 'Party name is required' });
      }
    
      const party = await DB.getParty(user.username, partyName);
  
      // Check if the party exists
      if (!party) {
          return res.status(404).json({ error: 'Party not found' });
      }
  
      // Respond with the characters associated with the party
      res.json(party);
    }
    
    else {
      res.status(404).json({ error: 'Invalid authToken' });
    }
  }
  
  catch (error) {
    console.error('Error loading party:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// save party
apiRouter.post('/saveParty', async (req, res) => {
  try {
    const user = await validateToken(req.cookies.token);

    if (user) {
      const { newPartyName, savedPartyName } = req.body;
      const result = await DB.saveParty(user.username, newPartyName, savedPartyName);
      res.status(200).json(result);
    }
    
    else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
  
  catch (error) {
    console.error('Error saving party:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// save character
apiRouter.post('/saveCharacter', async (req, res) => {
  try {
    const user = await validateToken(req.cookies.token);

    if (user) {
      const { partyName, characterSave, characterDelete } = req.body;

      // Check if characterDelete is provided
      if (characterDelete == null) {
        // Add characterSave as a new member to the party
        await DB.saveCharacter(user.username, partyName, characterSave);
      }
      
      else {
        // Replace or add characterSave as a new member to the party
        await DB.updateCharacter(user.username, partyName, characterSave, characterDelete);
      }

      // Send a success response
      res.status(200).json({ message: 'Character saved successfully' });
    }
    
    else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
  
  catch (error) {
    console.error('Error saving character:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// delete character
apiRouter.post('/deleteCharacter', async (req, res) => {
  try {
    const user = await validateToken(req.cookies.token);

    if (user) {
      const { partyName, characterDelete } = req.body;

      // Remove the character from the party
      await DB.deleteCharacter(user.username, partyName, characterDelete);

      // Send a success response
      res.status(200).json({ message: 'Character deleted successfully' });
    }
    
    else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
  
  catch (error) {
    console.error('Error deleting character:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//load list of encounters
apiRouter.get('/encounters', (req, res) => {  
    // Send the encounter names as a JSON response
    res.json(Object.keys(encountersData));
});

// Load encounter
apiRouter.get('/enemies', (req, res) => {
    // Extract the encounter name from the query parameters
    const encounterName = req.query.encounterName;

    // Check if the encounter name is provided in the query parameters
    if (!encounterName) {
        return res.status(400).json({ error: 'Encounter name is required' });
    }

    // Fetch encounter data associated with the provided encounter name
    const encounter = encountersData[encounterName];

    // Check if the encounter exists
    if (!encounter) {
        return res.status(404).json({ error: 'Encounter not found' });
    }

    // Respond with the encounter data
    res.json(encounter);
});

// Save encounter
apiRouter.post('/saveEncounter', (req, res) => {
    // Extract data from the request body
    const { newEncounterName, savedEncounterName } = req.body;

    // Check if the encounter name already exists
    if (encountersData.hasOwnProperty(newEncounterName)) {
        return res.status(400).json({ error: 'Encounter name already exists' });
    }

    // Check if the saved encounter name exists
    if (encountersData.hasOwnProperty(savedEncounterName)) {
        // Replace the saved encounter name with the new encounter name
        encountersData[newEncounterName] = encountersData[savedEncounterName];
        // Delete the old encounter name
        delete encountersData[savedEncounterName];
    } else {
        // If the encounter name doesn't exist, create a new encounter with newEncounterName
        encountersData[newEncounterName] = [];
    }

    // Send a success response
    res.status(200).json({ message: 'Encounter saved successfully' });
});

//save enemy
apiRouter.post('/saveEnemy', (req, res) => {
    // Extract data from the request body
    const { encounterName, enemySave, enemyDelete } = req.body;
  
    // Check if the encounterName is a valid key in encountersData
    if (!encountersData.hasOwnProperty(encounterName)) {
      // If encounterName is not a name in encountersData, create a new encounter named encounterName with enemySave as a member
      encountersData[encounterName] = [enemySave];
    }

    else if (enemyDelete == null) {
        //Add enemySave as a new member to the encounter
        encountersData[encounterName].push(enemySave);
    }
    
    else {
      const encounter = encountersData[encounterName];
      const enemyIndex = encounter.findIndex(member => member.name === enemyDelete?.name);
      
      if (enemyIndex !== -1) {
        // If enemyDelete is a member of that party, replace them with enemySave
        encounter.splice(enemyIndex, 1, enemySave);
      }
      
      else {
        // Else, add enemySave as a new member to the party
        encounter.push(enemySave);
      }
    }
  
    // Send a success response
    res.status(200).json({ message: 'Enemy saved successfully'});
});

//delete enemy
apiRouter.post('/deleteEnemy', (req, res) => {
    // Extract data from the request body
    const { encounterName, enemyDelete } = req.body;

    // Check if the encounterName is a valid key in encountersData
    if (!encountersData.hasOwnProperty(encounterName)) {
        return res.status(404).json({ error: 'Encounter not found' });
    }

    // Find the index of the enemy to delete
    const encounter = encountersData[encounterName];
    const enemyIndex = encounter.findIndex(member => member.name === enemyDelete.name);

    // Check if the enemy exists in the encounter
    if (enemyIndex === -1) {
        return res.status(404).json({ error: 'Enemy not found in the encounter' });
    }

    // Remove the enemy from the encounter
    encounter.splice(enemyIndex, 1);

    // Send a success response
    res.status(200).json({ message: 'Enemy deleted successfully' });
});

// Load list of creatures
apiRouter.get('/creatures', (req, res) => {
    // Extract just the names from the creatures array
    const creatureNames = creatures.map(creature => creature.name);
    
    // Send the list of creature names as a JSON response
    res.json(creatureNames);
});

//load creature
apiRouter.get('/creatures/:creatureName', (req, res) => {
    // Extract the creature name from the request parameters
    const creatureName = req.params.creatureName;

    // Find the creature in the creatures array based on its name
    const creature = creatures.find(creature => creature.name === creatureName);

    // Check if the creature exists
    if (!creature) {
        return res.status(404).json({ error: 'Creature not found' });
    }

    // Send the creature stats as a JSON response
    res.json(creature);
});

//calculate Challenge
apiRouter.get('/calculate/:partyName/:encounterName', (req, res) => {
    // Calculate challenge ratings
    const options = ["boring", "easy", "medium", "hard", "deadly"];
    const overallChallengeResult = options[Math.floor(Math.random() * options.length)];
    const defensiveChallengeResult = options[Math.floor(Math.random() * options.length)];
    const offensiveChallengeResult = options[Math.floor(Math.random() * options.length)];

    // Send the challenge ratings as JSON response
    res.json({
        overallChallengeResult,
        defensiveChallengeResult,
        offensiveChallengeResult
    });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

async function validateToken(authToken) {
  try {
    const user = await DB.getUserByToken(authToken);
    return user; // If getUserByToken returns a user, the token is valid
  } catch (error) {
    console.error('Error validating token:', error);
    return false; // Return false in case of error
  }
}