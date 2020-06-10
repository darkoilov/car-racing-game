$(function () {
  $("#start").click(function () {
    let carWidth = $("#car1").width();
    let raceTrackWidth = $(window).width() - carWidth;
    let randomNum1 = Math.floor(Math.random() * 2000 + 1);
    let randomNum2 = Math.floor(Math.random() * 2000 + 1);

    let isComplete = false;
    let place = "first";

    var timer = 3;
    var intervalId = null;
    function startTimer() {
      $(".timer").html(timer);
      $(".timer").css("display", "flex");
      $("#racetrack").addClass("linear");
      $("button").attr("disabled", true);
      $("button").css("cursor", "not-allowed");
      if (timer <= 0) {
        clearInterval(intervalId);
        $(".timer").css("display", "none");
        $("#racetrack").removeClass("linear");
      }
      timer--;
    }

    startTimer();
    intervalId = setInterval(startTimer, 1000);

    // $('#racetrack').fadeTo(100, 0.3).delay(2900).fadeTo(100, 1)
    function checkIfComplete() {
      if (isComplete == false) {
        isComplete = true;
      } else {
        place = "second";
        $("#reset").removeAttr("disabled");
        $("button").css("cursor", "pointer");

      }
    }

    $("#car1")
      .delay(3000)
      .animate({ left: raceTrackWidth }, randomNum1, function () {
        // startTimer();
        checkIfComplete();
        $(".finish img").css({ display: "flex" });
        $("#racetrack").addClass("linear");
        // $('#racetrack').fadeTo(100, 0.3)
        let car1Result = `<span class="none results">Car1 </span>Finished in: <span>${place}</span> place with a time of: <span>${randomNum1}</span> milliseconds!`;

        $(".tr").prepend(`<td class="car1">${car1Result}</td>`);
        localStorage.setItem("lastResult1", car1Result);
      });

    $("#car2")
      .delay(3000)
      .animate({ left: raceTrackWidth }, randomNum2, function () {
        checkIfComplete();
        $(".finish img").css({ display: "flex" });
        $("#racetrack").addClass("linear");
        //   $('#racetrack').fadeTo(100, 0.3)
        let car2Result = [`<span class="none results">Car2 </span>Finished in: <span>${place}</span> place with a time of: <span>${randomNum2}</span> milliseconds!`];

        $(".tr2").prepend(`<td class="car2">${car2Result}</td>`);
        localStorage.setItem("lastResult2", car2Result);
      });
  });

  if (
    localStorage.getItem(`lastResult1`) == null &&
    localStorage.getItem(`lastResult2`) == null
  ) {
    $(".lastGame").hide();
  } else {
    $(".lastGame").show();
  }
});

$(window).on("load", function () {
  $(".lastInfoCar1").html(localStorage.getItem(`lastResult1`));
  $(".lastInfoCar2").html(localStorage.getItem("lastResult2"));
});

$("#reset").click(function () {
  $(".cars").css("left", "0");
  $(".finish img").hide();
  $("#racetrack").removeClass("linear");
  $("#start").removeAttr("disabled");
  $("button").css("cursor", "pointer");
  //   $('#racetrack').fadeTo(100, 1)
});
