$(document).ready(function () {
    // Create a variable to reference the database
    var database = firebase.database();

    // snapshot of data to send to firebase
    $("#searchHalal").on("click", function(event){
        event.preventDefault();

            //Inital Value
    var searchedFood = $("#search_form").val().trim();

    console.log('halal ' + searchedFood);

    database.ref("searchFormInfo").push({
        searchedFood: searchedFood
    });

});
    // Search function

    $("button").on("click", function () {
        var searchTerm = $("#search_form").val().trim();
        var searchCity = $("#search_city").val().trim();
        /* This API enables cross-origin requests to anywhere.

    Usage:

    /               Shows help
    /iscorsneeded   This is the only resource on this host which is served without CORS headers.
    /<url>          Create a request to <url>, and includes CORS headers in the response.

    If the protocol is omitted, it defaults to http (https if port 443 is specified).

    Cookies are disabled and stripped from requests.

    Redirects are automatically followed. For debugging purposes, each followed redirect results
    in the addition of a X-CORS-Redirect-n header, where n starts at 1. These headers are not
    accessible by the XMLHttpRequest API.
    After 5 redirects, redirects are not followed any more. The redirect response is sent back
    to the browser, which can choose to follow the redirect (handled automatically by the browser).

    The requested URL is available in the X-Request-URL response header.
    The final URL, after following all redirects, is available in the X-Final-URL response header.


    To prevent the use of the proxy for casual browsing, the API requires either the Origin
    or the X-Requested-With header to be set. To avoid unnecessary preflight (OPTIONS) requests,
    it's recommended to not manually set these headers in your code. */

        var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?";
        $.ajax({
            url: myurl,
            headers: {
             'Authorization':'Bearer sQz0W1xApsQiW8nhGFTVFFEuOYci9WfuCtYGhnGdGDNhMuA5PvtdJLXWNQZhEDkNumudP6z8jXf0ErBdHOlrV7v8dYgisvk2fwJEJtTLDqApA_8ldmybzIsz61XzW3Yx'
         },
            method: 'GET',
            dataType: 'json',
            data: {
                term: 'halal ' + searchTerm,
                location: searchCity,
                limit: 5
            },
            success: function(response) { 
                var searchResults = "";
                for(var i = 0; i < response.businesses.length; i++) {
                var resResultName = response.businesses[i].name;
                var resResultRating = response.businesses[i].rating;
                var resResultLocation = response.businesses[i].location.display_address;
                var resResultCuisine = response.businesses[i].categories[0].title;
                var url = response.businesses[i].url;

                console.log(response.businesses[i]);
                searchResults += "<tr>";
                searchResults += "<td> <a href= " + url + ">" + resResultName + "</a></td>";
                searchResults += "<td>" + resResultLocation + "</td>";
                searchResults += "<td>" + resResultRating + "</td>";
                searchResults += "<td>" + resResultCuisine + "</td>";
                searchResults += "<td></td>";
                searchResults += "</tr>";
                } 
                $('#yelp_table').html(searchResults);
         }  
        });
    }); 
});