$(document).ready(function() {

  $(document).scroll(function() {
    var scroll = $(window).scrollTop();
    $("#background").css("top", "0" + (scroll / 1.8) + "px");
  });

  function doSum() {
    var theSum = parseInt($("#bobby_percent1").val()) + 
      parseInt($("#bobby_percent2").val()) +
      parseInt($("#bobby_percent3").val()) +
      parseInt($("#bobby_percent4").val());
    $("#totalPercent").text(theSum)
  }

// functions
$("#bobby_percent1").change(function(){
  doSum();
});
$("#bobby_percent2").change(function(){
  doSum();
});
$("#bobby_percent3").change(function(){
  doSum();
});
$("#bobby_percent4").change(function(){
  doSum();
});

doSum();

});
