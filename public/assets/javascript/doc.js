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

$(document).ready(function () {

    // Create a variable to reference the database
    var database = firebase.database();

    // snapshot of data to send to firebase
    $("#searchHalal").on("click", function(event){
        event.preventDefault();

            //Inital Value
    var searchedFood = $("#search_form").val().trim();

    console.log(searchedFood);

    database.ref("searchFormInfo").push({
        searchedFood: searchedFood
    });

});
    // Search function

    $("button").on("click", function () {
        var searchTerm = $("#search_form").val().trim();
        var searchCity = $("#search_city").val().trim();

        $.ajax({
            method: 'GET',
            url: 'https://developers.zomato.com/api/v2.1/locations?',
            data: {
                query: searchCity,
            }, 
            dataType: 'json',
            async: true,
            
            // This inserts the api key into the HTTP header
            beforeSend: function(xhr){
                xhr.setRequestHeader('user-key', '5c2f43de515f9f19b1dc0c0aab34f1fa');
            },  
            success: function(response) { 

                for(var i = 0; i < response.location_suggestions.length; i++) {
                var res_entity_id = response.location_suggestions[i].entity_id;
                var res_entity_type = response.location_suggestions[i].entity_type;
                console.log(res_entity_id);
                console.log(res_entity_type);

                }
        $.ajax({
            method: 'GET',
            url: 'https://developers.zomato.com/api/v2.1/search?',
            data: {
                entity_id: res_entity_id,
                entity_type: res_entity_type, 
                q: 'halal ' + searchTerm,
                count: 5,
                //sort: 'real_distance'
            }, 
            dataType: 'json',
            async: true,
            
            // This inserts the api key into the HTTP header
            beforeSend: function(xhr){
                xhr.setRequestHeader('user-key', '5c2f43de515f9f19b1dc0c0aab34f1fa');
            },  
            success: function(response) { 
                var searchResults = "";
                for(var i = 0; i < response.restaurants.length; i++) {
                var resResultName = response.restaurants[i].restaurant.name;
                var resResultRating = response.restaurants[i].restaurant.user_rating.aggregate_rating;
                var resResultLocation = response.restaurants[i].restaurant.location.address;
                var resResultCuisine = response.restaurants[i].restaurant.cuisines;
                var url = response.restaurants[i].restaurant.events_url;

                console.log(response.restaurants[i]);
                searchResults += "<tr>";
                searchResults += "<td> <a href= " + url + ">" + resResultName + "</a></td>";
                searchResults += "<td>" + resResultLocation + "</td>";
                searchResults += "<td>" + resResultRating + "</td>";
                searchResults += "<td>" + resResultCuisine + "</td>";
                searchResults += "<td></td>";
                searchResults += "</tr>";
                }
            
            $('#zomato_table').html(searchResults);
            }
        }); 
    }
});
    });
});