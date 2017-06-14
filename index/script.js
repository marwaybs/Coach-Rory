//setting global variables since they need to be referenced by button clicks and within functions
var currentAudio = 0;
var audioQueue = [];
var audioElement = document.createElement('audio');
var BLSAudio = document.createElement('audio');


//for BLS loop
var positive = 0;
var negative = 0;
var BLSSets = 0;


//increments every time there is a negative semantic feelings
//resets if there is a positive feelings
//resets after 2 negative feelings trigger a relaxation session
var negativeCounter = 0;

//******
//audios - [0] = src, [1] 0 = no bls, 1 = slow, 2 = fast, [2] after audio  0 = none, 1 = semantic analysis, 2 = memory input, 3 = BLS loop
//******
var sampleAudio = ["audio/sample.mp3", 2, 2];



//Part 1 BLS w/ relaxation
var part1Segment = ["audio/Part One/part1segment1.mp3",1, 0];

//part 2a: Fast BLS w/ event processing
var excerciseTargetQuestion = ["audio/Exercise Mode/exercisetargetquestion1.mp3",0, 2];
var ratingSegment = ["audio//Part2a/Rating/ratingsegment1.mp3",1, 0];
var startRapidBLS = ["audio/Part2a/startrapidBLS1.mp3",1, 0];
var stopBLS = ["audio/Part2a/stopBLS1.mp3",1, 0];
var goWithThat = ["audio/Part2a/gowiththat1.mp3",0, 0];
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
  time = 2 * Math.round(time / 2); //time needs to be even for animation to work correctly
  sideToSideIteration = (Math.ceil((time-2)/4))*2;
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
  console.log(time);
  time = 2 * Math.round(time / 2); //time needs to be even for animation to work correctly
  sideToSideIteration = (Math.ceil((time-3)/4))*4;
  sideToSideTime = sideToSideIteration
  sideToSideDelay = 1.5 + sideToSideTime;
  fadeOutDelay = sideToSideDelay + 2
  // console.log(time);
  //Apply class before changing the class
  iterString = "1, 1, "+sideToSideIteration+", 1, 1"
  delayString = "0s, 1s, 1500ms, "+sideToSideDelay+"s, "+fadeOutDelay+"s";
  console.log(iterString, delayString);
  $(".blsAnimation").css({"animation-iteration-count": iterString,"animation-duration": "1s, 500ms, 1s, 1s, 1s","animation-delay": delayString});
}

function restartAnimation() {
  $('#bls').removeClass('blsAnimation');

  setTimeout(function(){
    $('#bls').addClass('blsAnimation');
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
      audioQueue = [part1Segment, excerciseTargetQuestion, part1Segment, part3Initial, feet, shoulders, neck, eyes, mentalClearing, finish];
      break;
    case "exc30":
      audioQueue = [part1Segment, excerciseTargetQuestion, part3Initial, feet, shoulders, neck, eyes, mentalClearing, finish];
      break;
    case "exc60":
      audioQueue = [part1Segment, excerciseTargetQuestion, part3Initial, feet, shoulders, neck, eyes, mentalClearing, finish];
      break;
    case "exc90":
      audioQueue = [part1Segment, excerciseTargetQuestion, part3Initial, feet, shoulders, neck, eyes, mentalClearing, finish];
      break;
  }
  //cycles through queue of audio until finsished using an event listener to start the next audio when one finishs

  // audioQueue = ['audio/sample.mp3','audio/sample.mp3','audio/sample.mp3']; //placeholder queue

  //calculating time for first audio
  $('#bls').addClass('blsAnimation');
  //totalTime = 85;
  // updateSlowAnimation(totalTime);
  playAudio();

  audioElement.addEventListener("ended", function() {
    //Option 1 is only for testing purposes - wisn't accessed through this path
    if(audioQueue[currentAudio][2] == 1){
      feelings();
    }else if (audioQueue[currentAudio][2] == 2){
      memory();
    }else{
      console.log("timer started")
      setTimeout(function(){
        playAudio();
       },
         4000); //delay for setTimeout
    }
    console.log(currentAudio);
    currentAudio++;
    console.log(currentAudio);
  });
});


function playAudio(){
  if (currentAudio < audioQueue.length){
    audioElement.setAttribute('src', audioQueue[currentAudio][0]);
    //event listener for metadata for audio to load, else audioElement.length returns NaN
    audioElement.addEventListener('loadedmetadata', function() {
      if(audioQueue[currentAudio][1] == 1){
        updateSlowAnimation(audioElement.duration);
        restartAnimation();
      }
      else if(audioQueue[currentAudio][1] == 2){
        updateFastAnimation(audioElement.duration);
        restartAnimation();
      }
      else if(audioQueue[currentAudio][1] == 3){
        BLSLoop();
      }
      audioElement.play();
    },{
      once: true //stops the event listener from looping
    });
  }else {
    $("#sessionOver").addClass("fadeIn");
  }
}

//button listener for feelings after bls
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
        dataArray = data.substring(1, data.length-1).split(",");
        if(dataArray[0] > 0.4){
          positive++;
          negative = 0;
        }else if(dataArray < 0){
          negative++
          positive = 0;
        }else{
          negative = 0;
          positive =0;
        }
        if (negative >= 2){
          BLSAudio.setAttribute('src', negativeLoopSegment[0]);
        }else{
          BLSAudio.setAttribute('src', goWithThat[0]);
        }
        BLSAudio.play();
        BLSLoop();
      },
      error: function(xhr, desc, err) {
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
      }
    }); // end ajax call
  })
})

//button listener for submit memory button for excercise mode
$(document).ready(function(){
  $("#submitMemory").click(function() {
    $("#memoryInput").removeClass("fadeIn");
    $("#memoryInput").addClass("fadeOut");
    $('#submitMemory').attr("disabled", true);
    BLSAudio.setAttribute('src', startRapidBLS[0] );
    BLSAudio.addEventListener('loadedmetadata', function() {
      BLSAudio.play();
      setTimeout(function(){
        BLSLoop();
       },
         (BLSAudio.duration*1000));
    },{
      once: true //stops the event listener from looping
    });
  })
})

function memory(){
  $("#memoryInput").removeClass("fadeOut");
  $("#memoryInput").addClass("fadeIn");
  $('#submitMemory').attr("disabled", false);
}

function feelings(){
  $("#afterBLS").removeClass("fadeOut");
  $("#afterBLS").addClass("fadeIn");
  $('#submitFeelings').attr("disabled", false);
}

function BLSLoop(){
  console.log("set number #:" + BLSSets);
  if (BLSSets < 2 || positive < 2){
    var BLSAudio = document.createElement('audio');
    BLSAudio.setAttribute('src', stopBLS[0]);
    BLSTime = getRandomInt(25,60);
    updateFastAnimation((BLSTime-2));
    restartAnimation();
    setTimeout(function(){
      BLSAudio.play();
      BLSSets++;
      feelings();
     },
       (BLSTime*1000));
     }
     else{
       playAudio();
     }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
