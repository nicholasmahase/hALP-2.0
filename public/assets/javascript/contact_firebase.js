// Initialize Firebase
var config = {
    apiKey: "AIzaSyDVPAHzPuMJJbOl2uK9uXNx2jF41V_bVNE",
    authDomain: "myfullstackproject.firebaseapp.com",
    databaseURL: "https://myfullstackproject.firebaseio.com",
    projectId: "myfullstackproject",
    storageBucket: "myfullstackproject.appspot.com",
    messagingSenderId: "324837953357"
  };
  
firebase.initializeApp(config);
  
  // Create a variable to reference the database
  var database = firebase.database();
 

  // snapshot of data to send to firebase
    $("#submit").on("click", function(event){
        event.preventDefault();

            //Inital Value
    var firstName = $("#inputFirstName").val().trim();
    var lastName = $("#inputLastName").val().trim();
    var email = $("#inputEmail").val().trim();
    var phone = $("#inputPhone").val().trim();
    var comment = $("#inputComment").val().trim();

    console.log(firstName, lastName, email, phone, comment);

    database.ref("contactFormInfo").push({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        comment: comment
    });

    database.ref("contactFormInfo").once("child_added",function(childSnapshot) {
        var thankYouMessage = "<h2>" + "Thank you " + childSnapshot.val().firstName + " " + childSnapshot.val().lastName + " for your feedback." + "</h2>";  
        $('#thankYouMessage').append(thankYouMessage);
    });

});





    
        


