var $window = $(window),
  gardenCtx,
  gardenCanvas,
  $garden,
  garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

window.addEventListener("resize", () => {
  offsetX = window.innerWidth / 2;
  offsetY = window.innerHeight / 2.5;
});

$(function () {
  // setup garden
  $loveHeart = $("#loveHeart");
  var offsetX = $loveHeart.width() / 2 - 0;
  var offsetY = $loveHeart.height() / 2 - 95;
  console.log("Mobile OffsetX:", offsetX); ////check for Ph.
  $garden = $("#garden");
  gardenCanvas = $garden[0];
  gardenCanvas.width = $("#loveHeart").width();
  gardenCanvas.height = $("#loveHeart").height();
  gardenCtx = gardenCanvas.getContext("2d");
  gardenCtx.globalCompositeOperation = "lighter";
  garden = new Garden(gardenCtx, gardenCanvas);

  // Increase #content size
  $("#content").css({
    width: $loveHeart.width() + 10,
    height: $loveHeart.height() + 10,
    "margin-top": ($window.height() - ($loveHeart.height() + 10)) / 2,
    "margin-left": ($window.width() - ($loveHeart.width() + 10)) / 2,
    position: "relative",
  });

  // Center the heart within #content
  $loveHeart.css({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  });

  // $("#content").css({
  //   width: $loveHeart.width() + 20,
  //   height: $loveHeart.height() + 20,
  // });

  // $("#content").css({
  //   "margin-top": ($window.height() - $("#content").height()) / 2,
  //   "margin-left": ($window.width() - $("#content").width()) / 2,
  // });

  // $("#content").css("width", $loveHeart.width()); //+ $("#code").width());
  // $("#content").css(
  //   "height",
  //   Math.max($loveHeart.height(), $("#code").height())
  // );
  // $("#content").css(
  //   "margin-top",
  //   Math.max(($window.height() - $("#content").height()) / 2, 5)
  // );
  // $("#content").css(
  //   "margin-left",
  //   Math.max(($window.width() - $("#content").width()) / 2, 5)
  // );

  // renderLoop
  setInterval(function () {
    garden.render();
  }, Garden.options.growSpeed);
});

// $(window).resize(function () {
//   var newWidth = $(window).width();
//   var newHeight = $(window).height();
//   if (newWidth != clientWidth && newHeight != clientHeight) {
//     location.replace(location);
//   }
// });

function calculateOffsets() {
  var $loveHeart = $("#loveHeart");
  offsetX = $loveHeart.width() / 2;
  offsetY = $loveHeart.height() / 2 - 95;
  console.log("Updated OffsetX:", offsetX);
}

// Calculate initially
calculateOffsets();

// Recalculate on window resize
$(window).resize(function () {
  calculateOffsets();
});

function getHeartPoint(angle) {
  var t = angle / Math.PI;
  var x = 32.5 * (16 * Math.pow(Math.sin(t), 3)); ///19.5
  var y =
    -33.5 * ////20
    (13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t));
  return new Array(offsetX + x, offsetY + y); //ofsetx and ofsety
}

function startHeartAnimation() {
  var interval = 50; ///50
  var angle = 10;
  var heart = new Array();
  var animationTimer = setInterval(function () {
    var bloom = getHeartPoint(angle);
    var draw = true;
    for (var i = 0; i < heart.length; i++) {
      var p = heart[i];
      var distance = Math.sqrt(
        Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2)
      );
      if (distance < Garden.options.bloomRadius.max * 1.3) {
        draw = false;
        break;
      }
    }
    if (draw) {
      heart.push(bloom);
      garden.createRandomBloom(bloom[0], bloom[1]);
    }
    if (angle >= 30) {
      clearInterval(animationTimer);
      showMessages();
    } else {
      angle += 0.2;
    }
  }, interval);
}

function adjustWordsPosition() {
  $("#words").css({
    position: "absolute",
    top: offsetY - 175 + "px", // Adjust to center vertically
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    zIndex: 999, // Ensures it's above the canvas
    display: "none",
  });
}

function showMessages() {
  adjustWordsPosition();
  $("#words").fadeIn(3000, function () {
    $("#loveu").css("opacity", "1");
  });
}

// function showMessages() {
//   adjustWordsPosition();
//   $("#words").fadeIn(3000, function () {
//     $("#loveu").css("visibility", "visible").hide().fadeIn(3000);
//   });
// }

// function showMessages() {
//   adjustWordsPosition();
//   $("#words").fadeIn(3000, function () {
//     unhideLoveU(); // Call the unhideLoveU function after the fade-in completes
//   });
// }

// function showMessages() {
//   adjustWordsPosition();
//   $("#words").fadeIn(3000); // Slowly reveals the message after heart animation
// }

// function showMessages() {
//   adjustWordsPosition();
//   $("#words").css("opacity", 0).show().animate({ opacity: 1 }, 3000);
// }

// function adjustWordsPosition() {
//   $("#words").css({
//     position: "absolute",
//     top: offsetY + "px", // Center vertically on the heart
//     left: "50%",
//     transform: "translateX(-50%)",
//     textAlign: "center",
//     zIndex: 10, // Ensure it appears above the canvas
//   });
// }

// function showMessages() {
//   adjustWordsPosition();
//   $("#messages").fadeIn(5000, function () {
//     showLoveU();
//   });
// }

// function adjustWordsPosition() {
//   $("#words").css("position", "absolute");
//   $("#words").css("top", $("#garden").position().top + 195);
//   $("#words").css("left", $("#garden").position().left + 70);
// }

function showLoveU() {
  $("#loveu").fadeIn(3000);
}
