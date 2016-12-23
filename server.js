var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var router = express.Router();

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/sayHello', router);

app.post('/event', urlencodedParser, function (req, res) {
        
        // deal with the unrequired input
        if (req.body.company != undefined && req.body.company != null) {
            var company = req.body.company.trim();
        }

        if (req.body.phone != undefined && req.body.phone != null) {
            var phone = req.body.phone.trim();
        }

        if (req.body.newsweb != undefined && req.body.newsweb != null) {
            var newsweb = req.body.newsweb.trim();
        }

        if (req.body.newsweb == undefined) {
            var newsweb = "";
        }

    // Use the event registration value to create json string 
    response = {
        fname:req.body.fname.trim(),
        lname:req.body.lname.trim(),
        email:req.body.email.trim(),
        company:company,
        phone:phone,
        source:req.body.source.trim(),
        newsweb:newsweb,
        location:req.body.location.trim()
    };

    // below is used to read and write event json sting to a txt file
    var myJsonString = JSON.stringify(response); 
    console.log("new event");
    console.log(myJsonString);
    var datatofile;

    fs.readFile( __dirname + "/" + "event.txt", 'utf8', function (err, data) {
        console.log("read current file");
        console.log( data );
        if (data == ""){
            datatofile = myJsonString; 
        }
        else{
            datatofile = data + '\n' + myJsonString;} 
            console.log("read added file");
            console.log( datatofile );
       
        fs.writeFile('event.txt', datatofile,  function(err) {
            if (err) {
            return console.error(err);
            }
        
        // this part is used to test if the file was write successfully
        //console.log("Data written successfully!");
        //console.log("Let's read newly written data");
        //fs.readFile('event.txt', function (err, data) {
        //if (err) {
        //  return console.error(err);
        //}
        //console.log("Asynchronous read: " + data);
       //});
       }); 
   });

    // This part is used to send email to the register for confirmation
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'annezhou19@gmail.com', // Sender's email address
            pass: '1234!@#$' // Senders' password
        }
    });

    var name = req.body.fname.trim() + ' ' +  req.body.lname.trim();
    var text = name + ', \n\n You have registerd the TaxNotes event succesfully!'; 
    var email = req.body.email.trim();
    var mailOptions = {
        from: 'annezhou19@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Event registration confirmation', // Subject line
        text: text //
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.end("The email was not sent correctly");
        }else{
            console.log('Message sent: ' + info.response);
            res.end("Thank you very much! A event registration confirmation email has been sent to you. ");
        };
    }); 
 }); 

// create server
app.use(express.static(__dirname + '/public'));
var server = app.listen(3000, function () {
    var hostname = 'localhost';
    var port = 3000;
    console.log(`Server running at http://${hostname}:${port}/`);
})

