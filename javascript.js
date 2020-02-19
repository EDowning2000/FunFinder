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