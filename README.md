# Elevator Pitch

Create an elevator pitch for your application. Something that would excite an investment firm if you happen to catch a ride up the elevator with one of their representatives. Or maybe just sound cool to your friends if they are your target audience. This should be no more than a paragraph in length.

My program will help DMs create balanced combat encounters for D&D. DMs will be able to save and edit the details of their party, as well as details of their encounters. Using the rules of D&D, the program will then estimate if the encounter is easy, medium, hard, or deadly.

# The Technologies

HTML - Uses correct HTML structure for application. Four HTML pages. One for login, one for editing character details, one for editing creature details, and one for selecting saved creatures. Hyperlinks to choice artifact.

CSS - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.

JavaScript - Provides login, choice selection, and edit options.

Service - Backend service with endpoints for submitting and retrieving data.

DB/Login - Store users, parties, and encounters in database. Register and login users. Credentials securely stored in database. Can't save or retrieve data unless authenticated.

WebSocket - Notify all users when a new element (party, encounter, etc.) is created.

React - Application ported to use the React web framework.

![Main Page](Images/mainPage.png "Main Page")

![Popups](Images/popups.png "Popups")



# HTML Assignment

HTML pages for each component of your application - There's 5 pages: index.html, EncounterCreatorMain.html, PCWindow.html, CreautreWindow.html, and creatureList.html

Proper use of HTML tags including BODY, NAV, MAIN, HEADER, FOOTER - I'm pretty sure I've done this all. I'm not really sure what to write other than, you know, the code..?

Links between pages as necessary - Ya... the pages all link together in the way I want them to.

Application textual content - I'm not sure what this means... Is it just saying that there should be text in the website? I've definitely got lot's of that.

Placeholder for 3rd party service calls - See div id "output" in EncounterCreatorMain.html

Application images - Last element of div id "user"

Login placeholder, including user name display - See index.html. Also div id "user" in EncounterCreatorMain.html

Database data placeholder showing content stored in the database - Several spots with this. See table id "parties" and "encounters" in EncounterCreatorMain.html

WebSocket data placeholder showing where realtime communication will go - Footer in EncounterCreatorMain.html


# CSS Assignment

Header, footer, and main content body - Everything is as expected.

Navigation elements - Use the links. I think the buttons get activated in the next assignment.

Responsive to window resizing - Most apparent on EncounterCreatorMain.

Application elements - Yup; got what I wanted.

Application text content - The text is all there.

Application images - It scales as desired.


# Javascript Assignment

JavaScript support for future login - see login.js

JavaScript support for future database data - EncounterCreatorMain.js has two main sections of dummy data: partiesData and encountersData.

JavaScript support for future WebSocket - EncounterCreatorMain.js mimics a WebSocket update in the setTimeout function.

JavaScript support for your application's functionality - There's quite a bit. As a single example, in EncounterCreatorMain, clicking on a party or encounter loads the data to the middle of the page.
