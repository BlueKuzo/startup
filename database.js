const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('EncounterCreator');
const userCollection = db.collection('user');
const partiesCollection = db.collection('party');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function createUser(email, username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function getUserByEmail(email) {
  return userCollection.findOne({ email: email });
}

function getUserByName(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function getPartyNames(username) {
  try {
    const parties = await partiesCollection.find({ username: username }).toArray();
      // Extract party names from the parties array
      const partyNames = parties.map(party => party.name);
      return partyNames;
  }
  
  catch (error) {
    console.error('Error fetching party names:', error);
    throw error;
  }
}

async function getParty(username, partyName) {
  try {
    // Query the parties collection to find the party associated with the given username and partyName
    return await partiesCollection.findOne({ username: username, partyName: partyName });
  }
  
  catch (error) {
    console.error('Error fetching party:', error);
    throw error;
  }
}

async function saveParty(username, newPartyName, savedPartyName) {
  try {
    // Check if the new party name already exists for the user
    const existingParty = await partiesCollection.findOne({ username: username, partyName: newPartyName });
    if (existingParty) {
      throw new Error('Party name already exists');
    }

    // Find the party with the saved party name for the user
    const savedParty = await partiesCollection.findOne({ username: username, partyName: savedPartyName });

    if (savedParty) {
      // Update the name of the saved party to the new party name
      await partiesCollection.updateOne({ username: username, partyName: savedPartyName }, { $set: { partyName: newPartyName } });
    }
    
    else {
      // If the saved party name doesn't exist, create a new party with the new party name for the user
      await partiesCollection.insertOne({ username: username, partyName: newPartyName, characters: [] });
    }

    return { message: 'Party name saved successfully' };
  }
  
  catch (error) {
    console.error('Error saving party:', error);
    throw error;
  }
}

async function saveCharacter(username, partyName, character) {
  try {
    await ensurePartyExists(username, partyName);

    // Add the character to the party
    await partiesCollection.updateOne(
      { username: username, partyName: partyName },
      { $push: { characters: character } }
    );
  }
  
  catch (error) {
    console.error('Error saving character:', error);
    throw error;
  }
}

async function updateCharacter(username, partyName, updatedCharacter) {
  try {
    await ensurePartyExists(username, partyName);

    // Find the party and update the character within it
    await partiesCollection.updateOne(
      { username: username, partyName: partyName, 'characters.name': updatedCharacter.name },
      { $set: { 'characters.$': updatedCharacter } }
    );
  }
  
  catch (error) {
    console.error('Error updating character:', error);
    throw error;
  }
}

async function deleteCharacter(username, partyName, characterName) {
  try {
    await ensurePartyExists(username, partyName);

    // Remove the character from the party
    await partiesCollection.updateOne(
      { username: username, partyName: partyName },
      { $pull: { characters: { name: characterName } } }
    );
  }
  
  catch (error) {
    console.error('Error deleting character:', error);
    throw error;
  }
}

async function ensurePartyExists(username, partyName) {
  const party = await partiesCollection.findOne({ username: username, 'parties.name': partyName });
  if (!party) {
    throw new Error('Party not found');
  }
}


module.exports = {
  createUser,
  getUserByEmail,
  getUserByName,
  getUserByToken,
  getPartyNames,
  getParty,
  saveParty,
  saveCharacter,
  updateCharacter,
  deleteCharacter
};