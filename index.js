const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//save party

//load party

//save character
apiRouter.post('/character', (req, res) => {
    const characterData = req.body;

    // Check if any of the character data fields are empty
    if (characterData.name.length < 1 || characterData.race.length < 1 || characterData.level.length < 1 || characterData.class.length < 1) {
        // If any required field is empty, return a 400 Bad Request error response
        return res.status(400).json({ error: 'All character data fields are required.' });
    }

    database.saveCharacter(characterData)
        .then(savedCharacter => {
            // If the character is successfully saved, send a success response to the client
            res.status(201).json({ message: 'Character saved successfully!', character: savedCharacter });
        })
        .catch(error => {
            // If an error occurs during the save operation, send an error response to the client
            console.error('Error saving character:', error);
            res.status(500).json({ error: 'An error occurred while saving the character.' });
        });
});

//delete character

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
