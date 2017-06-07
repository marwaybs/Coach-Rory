//setting global variables since they need to be referenced by button clicks and within functions
var currentAudio = 0;
var audioQueue = [];
var audioElement = document.createElement('audio');

//increments every time there is a negative semantic feelings
//resets if there is a positive feelings
//resets after 2 negative feelings trigger a relaxation session
var negativeCounter = 0;

//audios - [0] = src, [1] 0 = no bls, 1 = slow, 2 = fast, [2] = semantic analysis

//Part 1 BLS w/ relaxation
var part1Segment = ["audio/Part One/part1segment1.mp3",1, 0];

//part 2a: Fast BLS w/ event processing
var excerciseTargetQuestion = ["audio/Excercise Mode/exercisetargetquestion1.mp3",1, 0];
var ratingSegment = ["audio//Part2a/Rating/ratingsegment1.mp3",1, 0];
var startRapidBLS = ["audio/Part2a/startrapidBLSx.mp3",1, 0];
var stopBLS = ["audio/Part2a/stopBLSx.mp3",1, 0];
var goWithThat = ["audio/Part2a/gowiththatx.mp3",0, 0];
var negativeLoopSegment = ["audio/Part2a/Negativeloop/negloopsegment1.mp3",1, 0]; //played if two negative
var resetSegment = ["audio//Part2a/Reset/resetsegmentx.mp3",1, 0]; //EMDR sets end when six cyles done or positive x2 and resets
var ratingSegment = ["audio/Part2a/Rating/ratingsegmentx.mp3",1, 0]; //voice input of number
//Part 2b - to be sorted later

//Part 3 - used with all types of sessions
var breathingVis = ["audio/Part 3/Breathing/breathevisx.mp3",1, 0];
var PMRBreath = ["audio/Part 3/PMR/PMRbreathx.mp3",1, 0];

//not sure where relaxationIntro is
var relaxationIntro = ["audio/",1, 0];

var part3Initial= ["audio/Part 3/Initial/part3initialsegx.mp3",1, 0];

//PMR body parts
var feet = ["audio/PMR/feet1.mp3",1, 0];
var lowerleg = ["audio/PMR/lowerleg1.mp3",1, 0];
var hips = ["audio/PMR/hips1.mp3",1, 0];
var abdomen = ["audio/PMR/abdomen1.mp3",1, 0];
var shoulders = ["audio/PMR/shoulders1.mp3",1, 0];
var arms = ["audio/PMR/arms1.mp3",1, 0];
var neck = ["audio/PMR/neck1.mp3",1, 0];
var face = ["audio/PMR/face1.mp3",1, 0];
var eyes = ["audio/PMR/eyes1.mp3",1, 0];
var back = ["audio/PMR/back1.mp3",1, 0];

var mentalClearing = ["audio//Part 3/Mental/countx.mp3",1, 0];
var Visualization = ["audio/Part 3/Visualizations/beachx.mp3",1, 0];

//suggestions
var egoSuggestion = ["audio/Part3/Suggestions/Ego/egox.mp3",1, 0];


//Part 3 Finish
var finish = ["audio/Part 3/Finish/finishx.mp3",1, 0];

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
  console.log(time);
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
      audioQueue = [part1Segment, part3Initial, feet, shoulders, neck, eyes, mentalClearing, finish];
      break;
    case "rel10":
      audioQueue = [part1Segment, part3Initial, feet, shoulders, neck, back, eyes, mentalClearing, Visualization, finish];
      break;
    case "rel15":
      audioQueue = [part1Segment, part3Initial, breathingVis, feet, lowerleg, hips, abdomen, shoulders, arms, neck, face, back, eyes, mentalClearing, finish];
      break;
    case "rel30":
      audioQueue = [part1Segment, part3Initial, breathingVis, feet, lowerleg, hips, abdomen, shoulders, arms, neck, face, back, eyes, mentalClearing, finish];
      break;
    case "exc15":
      audioQueue = [part1Segment, part3Initial, feet, shoulders, neck, eyes, mentalClearing, finish];
      break;
    case "exc30":
      audioQueue = [part1Segment, part3Initial, feet, shoulders, neck, eyes, mentalClearing, finish];
      break;
    case "exc60":
      audioQueue = [part1Segment, part3Initial, feet, shoulders, neck, eyes, mentalClearing, finish];
      break;
    case "exc90":
      audioQueue = [part1Segment, part3Initial, feet, shoulders, neck, eyes, mentalClearing, finish];
      break;
  }
  //cycles through queue of audio until finsished using an event listener to start the next audio when one finishs

  // audioQueue = ['audio/sample.mp3','audio/sample.mp3','audio/sample.mp3']; //placeholder queue

  //calculating time for first audio
  totalTime = 85; //placeholder time
  $('#bls').addClass('blsAnimation');
  updateSlowAnimation(totalTime);

  audioElement.setAttribute('src', audioQueue[currentAudio][0]);
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
        currentAudio++;
        console.log("second", currentAudio, audioQueue.length);
        if (currentAudio < audioQueue.length){
          console.log("in if");
          audioElement.setAttribute('src', audioQueue[currentAudio][0]);
          //event listener for metadata for audio to load, else audioElement.length returns NaN
          audioElement.addEventListener('loadedmetadata', function() {
            updateSlowAnimation(audioElement.duration);
            restartAnimation();
            audioElement.play();
          },{
            once: true //stops the event listener from looping
          });
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
