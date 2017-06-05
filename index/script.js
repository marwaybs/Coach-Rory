//setting global variables since they need to be referenced by button clicks and within functions
var currentAudio = 0;
var audioQueue = [];
var audioElement = document.createElement('audio');

//increments every time there is a negative semantic feelings
//resets if there is a positive feelings
//resets after 2 negative feelings trigger a relaxation session
var negativeCounter = 0;

//audios - [0] = src, [1] 0 = no bls, 1 = slow, 2 = fast

//Part 1 BLS w/ relaxation
var part1segment1 = ["audio/Part One/part1segment1.mp3",1];

//part 2a: Fast BLS w/ event processing
var excerciseTargetQuestion = ["audio/Excercise Mode/exercisetargetquestion1.mp3",1];
var ratingSegment = ["audio//Part2a/Rating/ratingsegment1.mp3",1];
var startRapidBLS = ["audio/Part2a/startrapidBLSx.mp3",1];
var stopBLS = ["audio/Part2a/stopBLSx.mp3",1];
var goWithThat = ["audio/Part2a/gowiththatx.mp3",0];
var negativeLoopSegment = ["audio/Part2a/Negativeloop/negloopsegment1.mp3",1]; //played if two negatives
var  = ["audio/",1];
var  = ["audio/",1];
var  = ["audio/",1];
var  = ["audio/",1];
var  = ["audio/",1];
var  = ["audio/",1];
var  = ["audio/",1];
var  = ["audio/",1];
var  = ["audio/",1];

var relaxationIntro = ["audio/",1];
var part3Initial= ["audio/",1];
var feet = ["audio/PMR/feet1.mp3",1];
var lowerleg = ["audio/PMR/lowerleg1.mp3",1];
var hips = ["audio/PMR/hips1.mp3",1];
var abdomen = ["audio/PMR/abdomen1.mp3",1];
var shoulders = ["audio/PMR/shoulders1.mp3",1];
var arms = ["audio/PMR/arms1.mp3",1];
var neck = ["audio/PMR/neck1.mp3",1];
var face = ["audio/PMR/face1.mp3",1];
var eyes = ["audio/PMR/eyes1.mp3",1];
var back = ["audio/PMR/back1.mp3",1];
var  = ["audio/",1];
var  = ["audio/",1];



function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

//To make BLS fullscreen
const target = $('#target')[0]; // Get DOM element from jQuery collection
$(document).ready(function(){
  $("#enterFullScreen").click(function(){
    // console.log(document.coookie);
	   if (screenfull.enabled) {
		     screenfull.request(target);
	 }
 });
});

$(document).ready(function(){
  if (screenfull.enabled) {
  	screenfull.onchange(() => {
      if (screenfull.isFullscreen){
        // console.log("entered full screen!")
        $("#settings").addClass("hidden");
      }else{
          $("#settings").removeClass("hidden");
      }
  	});

  }
});

$(document).ready(function(){
    $("#hideBLS").click(function(){
      $("#bls").toggleClass("hideBLS");
    });
});


function updateSlowAnimation(time){
  sideToSideIteration = (Math.ceil((time-3)/4));
  sideToSideTime = 2*sideToSideIteration
  sideToSideDelay = 2 + sideToSideTime;
  fadeOutDelay = sideToSideDelay + 2
  // console.log(time);
  //Apply class before changing the class
  iterString = "1, 1, "+sideToSideIteration+", 1, 1"
  delayString = "0s, 1s, 2s, "+sideToSideDelay+"s, "+fadeOutDelay+"s";
  // console.log(iterString, delayString);
  $(".blsAnimation").css({"animation-iteration-count": iterString,"animation-duration": "1s, 1s, 2s, 2s, 1s","animation-delay": delayString});
}

function updateFastAnimation(time) {
  sideToSideIteration = (Math.ceil((time-3)/4));
  sideToSideTime = 2*sideToSideIteration
  sideToSideDelay = 2 + sideToSideTime;
  fadeOutDelay = sideToSideDelay + 2
  // console.log(time);
  //Apply class before changing the class
  iterString = "1, 1, "+sideToSideIteration+", 1, 1"
  delayString = "0s, 1s, 2s, "+sideToSideDelay+"s, "+fadeOutDelay+"s";
  // console.log(iterString, delayString);
  $(".blsAnimation").css({"animation-iteration-count": iterString,"animation-duration": "1s, 1s, 2s, 2s, 1s","animation-delay": delayString});
}

function restartAnimation() {
  $('#bls').removeClass('blsAnimation');

  setTimeout(function(){
    $('#bls').addClass('blsAnimation')
  },1)
};

//Session set up
$(document).ready(function(){
  switch (getCookie("mode")) {
    case "easy5":
      audioQueue = ["/Part One/part1segmentx.mp3", "/Part 3/Initial/initialsegx.mp3", "/Part 3/PMR/feetx.mp3", "/Part 3/PMR/shouldersx.mp3", "/Part 3/PMR/neckx.mp3", "/Part 3/PMR/eyesx.mp3", "/Part 3/Mental/countx.mp3", "/Part 3/Finish/finishx.mp3"];
      break;
    case "easy10":
      //Visualization = only one audio? More for more time? Randomized later??
      audioQueue = ["/Part One/part1segmentx.mp3", "/Part 3/Initial/initialsegx.mp3", "/Part 3/PMR/feetx.mp3", "/Part 3/PMR/shouldersx.mp3", "/Part 3/PMR/neckx.mp3", "/Part 3/PMR/upperbackx.mp3", "/Part 3/PMR/lowerbackx.mp3", "/Part 3/PMR/eyesx.mp3", "/Part 3/Mental/countx.mp3", "/Part 3/Visualizations/healingx.mp3", "/Part 3/Finish/finishx.mp3"];
      break;
    case "easy15":
    audioQueue = ["/Part One/part1segmentx.mp3", "/Part 3/Initial/initialsegx.mp3", "/Part 3/PMR/feetx.mp3", "/Part 3/PMR/shouldersx.mp3", "/Part 3/PMR/neckx.mp3", "/Part 3/PMR/upperbackx.mp3", "/Part 3/PMR/lowerbackx.mp3", "/Part 3/PMR/eyesx.mp3", "/Part 3/Mental/countx.mp3", "/Part 3/Visualizations/healingx.mp3", "/Part 3/Finish/finishx.mp3"];
      break;
    case "easy30":
      audioQueue = ["/Part One/part1segmentx.mp3","/Part 3/Initial/initialsegx.mp3"];
      break;
    case "exc15":
      audioQueue = ["/Part One/part1segmentx.mp3","/Part 3/Initial/initialsegx.mp3"];
      break;
    case "exc30":
      audioQueue = ["/Part One/part1segmentx.mp3","/Part 3/Initial/initialsegx.mp3"];
      break;
    case "exc60":
      audioQueue = ["/Part One/part1segmentx.mp3","/Part 3/Initial/initialsegx.mp3"];
    case "exc90":
      audioQueue = ["/Part One/part1segmentx.mp3","/Part 3/Initial/initialsegx.mp3"];
  }
  //cycles through queue of audio until finsished using an event listener to start the next audio when one finishs

  audioQueue = ['audio/sample.mp3','audio/sample.mp3','audio/sample.mp3']; //placeholder queue

  //calculating time for first audio
  totalTime = 10; //placeholder time
  $('#bls').addClass('blsAnimation');
  updateSlowAnimation(10);

  audioElement.setAttribute('src', audioQueue[currentAudio]);
  audioElement.play();
  audioElement.addEventListener("ended", function() {
    audioElement.setAttribute('src', audioQueue[currentAudio]);
    $("#afterBLS").removeClass("fadeOut");
    $("#afterBLS").addClass("fadeIn");
    $('#submitFeelings').attr("disabled", false);
  });
});

$(document).ready(function(){
  $("#submitFeelings").click(function() {
    console.log("button pressed");
    // console.log($("#SUD").val())
    $("#afterBLS").removeClass("fadeIn");
    $("#afterBLS").addClass("fadeOut");
    $('#submitFeelings').attr("disabled", true);
    $.ajax({
      url: 'getData.php',
      type: 'post',
      data: {'action': 'send', 'text': $('#feelingsText').val()},
      success: function(data, status) {
        console.log(data);
      },
      error: function(xhr, desc, err) {
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
      }
    }); // end ajax call
    console.log(currentAudio, audioQueue.length);
    currentAudio++
    if (currentAudio < audioQueue.length){
      audioElement.setAttribute('src', audioQueue[currentAudio]);
      // $('#bls').removeClass('blsAnimation');
      updateFastAnimation(audioElement.duration)
      restartAnimation();
      audioElement.play();
    }else {
      $("#sessionOver").addClass("fadeIn");

    }
  })
})
