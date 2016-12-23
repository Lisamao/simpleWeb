Project general introducation:

This project is used to let users register event. After registration, the event will be saved to a txt file. 
Also, the user will receive an event registration confirmation email. The email address is the one used to register event.
The files are under the taxnotes folder



Install software in Mac OS:

1. Install Node on your machine, go to https://nodejs.org to download and install the nodejs.
   Then

2. Install the Express framework in the taxnotes folder by typing the following at the prompt:
   npm install express --save


3. Install the following important modules along with express by typing the following at the prompt:

   npm install body-parser --save

   npm install cookie-parser --save

   npm install multer --save

   npm install nodemailer


4. Start the server by typing the following at the prompt, and then interact with the server:

   node server

   The server running on: http://localhost:3000


5. Type http://localhost:3000 in a web browser, then try the project. 
   Check the email used to register the event and event.txt file to see what happens



   