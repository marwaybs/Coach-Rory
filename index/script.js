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
var part1Segment = ["audio/Part One/part1segment1.mp3",1];

//part 2a: Fast BLS w/ event processing
var excerciseTargetQuestion = ["audio/Excercise Mode/exercisetargetquestion1.mp3",1];
var ratingSegment = ["audio//Part2a/Rating/ratingsegment1.mp3",1];
var startRapidBLS = ["audio/Part2a/startrapidBLSx.mp3",1];
var stopBLS = ["audio/Part2a/stopBLSx.mp3",1];
var goWithThat = ["audio/Part2a/gowiththatx.mp3",0];
var negativeLoopSegment = ["audio/Part2a/Negativeloop/negloopsegment1.mp3",1]; //played if two negative
var resetSegment = ["audio//Part2a/Reset/resetsegmentx.mp3",1]; //EMDR sets end when six cyles done or positive x2 and resets
var ratingSegment = ["audio/Part2a/Rating/ratingsegmentx.mp3",1]; //voice input of number
//Part 2b - to be sorted later

//Part 3 - used with all types of sessions
var breathingVis = ["audio/Part 3/Breathing/breathevisx.mp3",1];
var PMRBreath = ["audio/Part 3/PMR/PMRbreathx.mp3",1];

//not sure where relaxationIntro is
var relaxationIntro = ["audio/",1];

var part3Initial= ["audio/Part 3/Initial/part3initialsegx.mp3",1];

//PMR body parts
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

var mentalClearing = ["audio//Part 3/Mental/countx.mp3",1];
var Visualization = ["audio/Part 3/Visualizations/beachx.mp3",1];

//suggestions
var egoSuggestion = ["audio/Part3/Suggestions/Ego/egox.mp3",1];


//Part 3 Finish
var finish = ["audio/Part 3/Finish/finishx.mp3",1];

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

//not currently working for some reason
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
    case "rel5":
      audioQueue = [part1Segment[0], part3Initial[0], feet[0], shoulders[0], neck[0], eyes[0], mentalClearing[0], finish[0]];
      break;
    case "rel10":
      audioQueue = [part1Segment[0], part3Initial[0], feet[0], shoulders[0], neck[0], back[0], eyes[0], mentalClearing[0], Visualization[0], finish[0]];
      break;
    case "rel15":
      audioQueue = [part1Segment[0], part3Initial[0], breathingVis[0], feet[0], lowerleg[0], hips[0], abdomen[0], shoulders[0], arms[0], neck[0], face[0], back[0], eyes[0], mentalClearing[0], finish[0]];
      break;
    case "rel30":
      audioQueue = [part1Segment[0], part3Initial[0], breathingVis[0], feet[0], lowerleg[0], hips[0], abdomen[0], shoulders[0], arms[0], neck[0], face[0], back[0], eyes[0], mentalClearing[0], finish[0]];
      break;
    case "exc15":
      audioQueue = [part1Segment[0], part3Initial[0],];
      break;
    case "exc30":
      audioQueue = ["/Part One/part1segmentx.mp3","/Part 3/Initial/initialsegx.mp3"];
      break;
    case "exc60":
      audioQueue = ["/Part One/part1segmentx.mp3","/Part 3/Initial/initialsegx.mp3"];
      break;
    case "exc90":
      audioQueue = ["/Part One/part1segmentx.mp3","/Part 3/Initial/initialsegx.mp3"];
      break;
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
        console.log("first", currentAudio, audioQueue.length);
        currentAudio++
        console.log("second", currentAudio, audioQueue.length);
        if (currentAudio < audioQueue.length){
          console.log("in if");
          audioElement.setAttribute('src', audioQueue[currentAudio]);
          // $('#bls').removeClass('blsAnimation');
          updateSlowAnimation(audioElement.duration)
          restartAnimation();
          audioElement.play();
        }else {
          $("#sessionOver").addClass("fadeIn");

        }
      },
      error: function(xhr, desc, err) {
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
      }
    }); // end ajax call
  })
})
