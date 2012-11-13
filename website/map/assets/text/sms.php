<?php
    /* Send an SMS using Twilio. You can run this file 3 different ways:
     *
     * - Save it as sendnotifications.php and at the command line, run 
     *        php sendnotifications.php
     *
     * - Upload it to a web host and load mywebhost.com/sendnotifications.php 
     *   in a web browser.
     * - Download a local server like WAMP, MAMP or XAMPP. Point the web root 
     *   directory to the folder containing this file, and load 
     *   localhost:8888/sendnotifications.php in a web browser.
     */
 
    // Step 1: Download the Twilio-PHP library from twilio.com/docs/libraries, 
    // and move it into the folder containing this file.
    require "Services/Twilio.php";
 
    // Step 2: set our AccountSid and AuthToken from www.twilio.com/user/account
    $AccountSid = "ACcea9b1f54959a17caf215b5ebb61b6b9";
    $AuthToken = "62fb34555619d9d44808af7de65e809b";
 
    // Step 3: instantiate a new Twilio Rest Client
    $client = new Services_Twilio($AccountSid, $AuthToken);
 
    // Step 4: make an array of people we know, to send them a message. 
    // Feel free to change/add your own phone number and name here.
    $people = array(
        "8477363951" => "Curious George"
    );

    $phone = $_POST["phone"];
    $to = $_POST["to"];
    $from = $_POST["from"];
    $notes = $_POST["notes"];    
    $location = $_POST["location"];
    $url = $_POST["url"];

 
    // Step 5: Loop over all our friends. $number is a phone number above, and 
    // $name is the name next to it
    foreach ($people as $number => $name) {
 
        $sms = $client->account->sms_messages->create(
 
        // Step 6: Change the 'From' number below to be a valid Twilio number 
        // that you've purchased, or the (deprecated) Sandbox number
            "8475625931", 
 
            // the number we are sending to - Any phone number
            $phone,
 
            // the sms body
            "Hey $to it's $from. $notes $location"
        );
 
        // Display a confirmation message on the screen
       header("Location: http://meattext.com/map/$url"); 
    }

    ?>