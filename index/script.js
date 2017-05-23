
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

//To make BLS fullscreen
const target = $('#target')[0]; // Get DOM element from jQuery collection
$(document).ready(function(){
  $("#enterFullScreen").click(function(){
    console.log(document.coookie);
	   if (screenfull.enabled) {
		     screenfull.request(target);
	 }
 });
});

$(document).ready(function(){
  if (screenfull.enabled) {
  	screenfull.onchange(() => {
      if (screenfull.isFullscreen){
        $("#enterFullScreen").addClass("hidden");
        $("#hideBLS").addClass("hidden");
      }else{
          $("#enterFullScreen").removeClass("hidden");
          $("#hideBLS").removeClass("hidden");
      }
  	});
  }
});

$(document).ready(function(){
    $("#hideBLS").click(function(){
      $("#bls").toggleClass("hidden");
    });

});

//Session set up
$(document).ready(function(){
  var audioQueue = []
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
  audioQueue = ['audio/Part One/ding.mp3','audio/Part One/ding.mp3','audio/Part One/ding.mp3'];

  //calculating time for each animation
  totalTime = 40;
  sideToSideIteration = (Math.ceil((totalTime-3)/4));
  sideToSideTime = 2*sideToSideIteration
  sideToSideDelay = 2 + sideToSideTime;
  fadeOutDelay = sideToSideDelay + 2
  console.log(sideToSideIteration, sideToSideTime, sideToSideDelay,fadeOutDelay);
  // $("#blsAnimation").css("animation-iteration-count:", "1, sideToSideIteration, 1, 1");
  // $("#blsAnimation").css("animation-duration", "1s, 2s, sideToSideTime, 1s");
  // $("#blsAnimation").css("animation-delay", "1s, 1s, sideToSideDelay, fadeOutDelay");

  //  animation-name: moveCenterLeft, moveLeftRight, moveLeftCenter, fadeOut;

  $('#bls').addClass('blsAnimation');
  iterString = "1, "+sideToSideIteration+", 1, 1"
  delayString = "1s, 2s, "+sideToSideDelay+"s, "+fadeOutDelay+"s";
  console.log(iterString, delayString);
  $(".blsAnimation").css({"animation-iteration-count": iterString,"animation-duration": "1s, 2s, 2s, 1s","animation-delay": delayString});

  var currentAudio = 0;
  var audioElement = document.createElement('audio');

  audioElement.setAttribute('src', audioQueue[currentAudio]);
  audioElement.play();
  console.log(audioElement.duration);
  audioElement.addEventListener("ended", function() {
    console.log("audio ended")
    if (currentAudio < audioQueue.length){
      audioElement.play();
      console.log(audioElement.duration);
    }
    currentAudio++
  });
});
