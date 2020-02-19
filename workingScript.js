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
    $('.container').hide()
    $('.containerTwo').show()
    
    
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
         var card = $('<div>').addClass("card card-small")

          var cardImg = $("<div>").addClass('card-image')

            var imgSrc = $('img').attr('src', "img/pexels-photo-573552.jpeg")

              var span = $('<span>').addClass("card-title")

                var a = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light red")

                  var icon = $('<i>').addClass('material-icons').text("add")

                    var cardContent = $('<div>').addClass('card-content')

                      var pTag = $('<p>').addClass("infoOne").text("Name: " +response.restaurants[i].restaurant.name);

                        var pTagTwo = $('<p>').addClass("infoTwo").text("Cuisines: " +response.restaurants[i].restaurant.cuisines);
                          
                          var pTagThree = $('<p>').addClass("infoThree").text("Price Range: " +response.restaurants[i].restaurant.price_range);

                            var pTagFour = $('<p>').addClass("infoFour").text("Address" + response.restaurants[i].restaurant.location.address)

                       card.append(cardImg).append(imgSrc).append(span).append(pTag).append(pTagTwo).append(pTagThree).append(pTagFour);
                        $(".info").append(card)
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

        var card = $('<div>').addClass("card card-small")
          var cardImg = $("<div>").addClass('card-image')
            var imgSrc = $('img').attr('src', "img/pexels-photo-573552.jpeg")
              var span = $('<span>').addClass("card-title")
                var a = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light red")
                  var icon = $('<i>').addClass('material-icons').text("add")
                    var cardContent = $('<div>').addClass('card-content')
                      var pTag = $('<p>').addClass("infoOne").text("Name: " +response._embedded.events[i].name);
                        var pTagTwo = $('<p>').addClass("infoTwo").text("Timing Details: " +response._embedded.events[i].dates.start.localDate);
                          var pTagThree = $('<p>').addClass("infoThree").html('<a target="_blank" href=' +response._embedded.events[i].url +">" +"Click Here" +"</a>");
                     card.append(cardImg).append(imgSrc).append(span).append(pTag).append(pTagTwo).append(pTagThree);
                      $(".info").append(card)
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
      var lat = response.location_suggestions[0].latitude;
      var lon = response.location_suggestions[0].longitude;
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
          var card = $('<div>').addClass("card card-small")
          var cardImg = $("<div>").addClass('card-image')
            var imgSrc = $('img').attr('src', "img/pexels-photo-573552.jpeg")
              var span = $('<span>').addClass("card-title")
                var a = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light red")
                  var icon = $('<i>').addClass('material-icons').text("add")
                    var cardContent = $('<div>').addClass('card-content')
                      var pTag = $('<p>').addClass("infoOne").text("Name: " +response.nearby_restaurants[i].restaurant.name);
                        var pTagTwo = $('<p>').addClass("infoTwo").text("Address: " +response.nearby_restaurants[i].restaurant.location.address);
                          var pTagThree = $('<p>').addClass("infoThree").text('Cuisines: ' +response.nearby_restaurants[i].restaurant.cuisines);
                            var pTagFour = $('<p>').addClass('infoFour').text('Price Range: ' + response.nearby_restaurants[i].restaurant.price_range)
                     card.append(cardImg).append(imgSrc).append(span).append(pTag).append(pTagTwo).append(pTagThree);
                      $(".info").append(card)
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

$(document).ready(function(){
  $('.datepicker').datepicker();
});

var isClicked = false;
$("#nghtLifBtn").on("click", function(){
    
    if (isClicked === false){
      $(this).addClass("pulse clicked")
      isClicked = true;
      
    } else if (isClicked === true) {
      $(this).removeClass("pulse clicked")
      isClicked = false;
    }
})
$("#diningBtn").on("click", function(){
    
  if (isClicked === false){
    $(this).addClass("pulse clicked")
    isClicked = true;
    
  } else if (isClicked === true) {
    $(this).removeClass("pulse clicked")
    isClicked = false;
  }
})
$("#eventsBtn").on("click", function(){
    
  if (isClicked === false){
    $(this).addClass("pulse clicked")
    isClicked = true;
    
  } else if (isClicked === true) {
    $(this).removeClass("pulse clicked")
    isClicked = false;
  }
})