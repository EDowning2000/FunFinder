$(document).ready(function() {
  var userLocation = $('#citySearch').val()
  console.log(userLocation)
  count = 6;
  var lat = "";
  var lon = "";
  eventsUrl =
  "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + userLocation +
    "&countryCode=US&size=48&sort=date,asc&apikey=XTM9Wf57rB9TMAKZ1afNeO4eWiFXPPEt";
  $("#searchBtn").on("click", function() {
    showResults();
    
    
  });

  $(".randomizer").on("click", function() {
    showResults();
  });

  function showResults() {
    var nghtLifBtn = $("#nghtLifBtn").hasClass("clicked");
    var diningBtn = $("#diningBtn").hasClass("clicked");
    var eventsBtn = $("#eventsBtn").hasClass("clicked");

    console.log({ nghtLifBtn, diningBtn, eventsBtn });

    if (nghtLifBtn && diningBtn && eventsBtn) {
      count = 2;
    } else if (
      (nghtLifBtn && diningBtn) ||
      (nghtLifBtn && eventsBtn) ||
      (diningBtn && eventsBtn)
    ) {
      count = 3;
    } else if (nghtLifBtn || diningBtn || eventsBtn) {
      count = 6;
    }
    // $(".row").empty();
    if (nghtLifBtn) nightLifeGenerator();
    if (eventsBtn) eventsGenerator();
    if (diningBtn) foodGenerator();
  }

  function nightLifeGenerator() {
    var queryUrl3 =
      "https://developers.zomato.com/api/v2.1/search?lat=" +
      lat +
      "&lon=" +
      lon +
      "category=Nightlife";
    $.ajax({
      url: queryUrl3,
      method: "GET",
      headers: {
        "user-key": "d2817c523bb9d90495ae19c12392cc03",
        Accept: "application/json"
      }
    }).then(function(response) {
      console.log(response);
      console.log({ count });

      // var dollars = "";
      // if (response.restaurants.restaurant.price_range === 1) {
      //   dollars = '<i class="fas fa-dollar-sign"></i>';
      // }
      for (var i = 0; i < count; i++) {


         var card = $('<div>').addClass("card")
          var cardImg = $("<div>").addClass('card-image')
            var imgSrc = $('img').attr('src', "img/pexels-photo-573552.jpeg")
              var span = $('<span>').addClass("card-title")
                var a = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light red")
                  var icon = $('<i>').addClass('material-icons').text("add")
                    var cardContent = $('<div>').addClass('card-content')
                      var pTag = $('<p>').addClass("infoOne").text("Name: " +response.restaurants[i].restaurant.name);
                        var pTagTwo = $('<p>').addClass("infoTwo").text("Cuisines: " +response.restaurants[i].restaurant.cuisines);
                          
                          var pTagThree = $('<p>').addClass("infoThree").text("Price Range: " +response.restaurants[i].restaurant.price_range);
                        cardContent.append(pTag, pTagTwo, pTagThree)
                        a.append(icon)
                        span.append(a)
                        imgSrc.append(span)
                        cardImg.append(imgSrc)
                        card.append(cardImg)
                        $("#container").append(card)
      }
    });
  }
  function eventsGenerator() {
    $.ajax({
      url: eventsUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      for (var i = 0; i < count; i++) {
        $(".ent").html("Event Name: " + response._embedded.events[i].name);
        $(".ent").html("Timing Details: " + response._embedded.events[i].dates.start.localDate
        );
        $(".ent").html('<a target="_blank" href=' +response._embedded.events[i].url +">" +"Click Here" +"</a>"
        );
      }
    });
  }

  //ajax call for restaurant details
  function foodGenerator(cityText) {
    var queryUrl =
      "https://developers.zomato.com/api/v2.1/locations?query=" +
      $(".cityInput").val();
    $.ajax({
      url: queryUrl,
      method: "GET",
      headers: {
        "user-key": "d2817c523bb9d90495ae19c12392cc03",
        Accept: "application/json"
      }
    }).then(function(response) {
      //console.log("findLatLon");
      //console.log(response);
      lat = response.location_suggestions[0].latitude;
      lon = response.location_suggestions[0].longitude;
      //console.log("lat: " + lat + "; lon: " + lon);
      // var cityText = $(".cityInput").val();
      // $(".cityInput").val("");
      // findRestaurantDetails(lat, lon, cityText);
      //findNightlife(lat, lon);
      var queryUrl2 =
        "https://developers.zomato.com/api/v2.1/geocode?lat=" +
        lat +
        "&lon=" +
        lon;
      $.ajax({
        url: queryUrl2,
        method: "GET",
        headers: {
          "user-key": "d2817c523bb9d90495ae19c12392cc03",
          Accept: "application/json"
        }
      }).then(function(response) {
        console.log({ response });
        for (var i = 0; i < count; i++) {
          name = response.nearby_restaurants[i].restaurant.name;
          address = response.nearby_restaurants[i].restaurant.location.address;
          cuisines = response.nearby_restaurants[i].restaurant.cuisines;
          priceRange = response.nearby_restaurants[i].restaurant.price_range;

          $(".print").html(
            name +
              "<br>Cuisine: " +
              cuisines +
              "<br>Address: " +
              address +
              "<br>Price Range: " +
              priceRange
          );
        }
        // addCityToLocalStorage(cityText, {
        //   name,
        //   address,
        //   cuisines,
        //   priceRange
        // });
      });
    });
  }
});


var slider = document.querySelector('.slider');
M.Slider.init(slider,{
  indicators: false,
  height:500,
  transition:500,
  interval:3000,
});
