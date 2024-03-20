# startup

Create an elevator pitch for your application. Something that would excite an investment firm if you happen to catch a ride up the elevator with one of their representatives. Or maybe just sound cool to your friends if they are your target audience. This should be no more than a paragraph in length.

My program will help DMs create balanced combat encounters for D&D. DMs will be able to save and edit the details of their party, as well as details of their encounters. Using the rules of D&D, the program will then estimate if the encounter is easy, medium, hard, or deadly.

HTML - Uses correct HTML structure for application. Four HTML pages. One for login, one for editing character details, one for editing creature details, and one for selecting saved creatures. Hyperlinks to choice artifact.

CSS - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.

JavaScript - Provides login, choice selection, and edit options.

Service - Backend service with endpoints for submitting and retrieving data.

DB/Login - Store users, parties, and encounters in database. Register and login users. Credentials securely stored in database. Can't save or retrieve data unless authenticated.

WebSocket - As each user submits encounters to compare, the encounters are rated as easy, medium, hard, or deadly. Selecting a saved creature loads their details (except number).

React - Application ported to use the React web framework.

![Main Page](Images/mainPage.png "Main Page")

![Popups](Images/popups.png "Popups")
