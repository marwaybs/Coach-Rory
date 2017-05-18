//BLS methods
function pop(div) {
  document.getElementById(div).style.display = 'block';
}
function hide(div) {
  document.getElementById(div).style.display = 'none';
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

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

$(document).ready(function(){
  if (screenfull.enabled) {
  	screenfull.onchange(() => {
      if (screenfull.isFullscreen){
        $("#enterFullScreen").addClass("hidden");
      }else{
          $("#enterFullScreen").removeClass("hidden");
      }
  	});
  }
});


//submit button, collects picked parameters
$(document).ready(function(){
  $("#startSession").click(function(){
    // var visualsOn;
    var mode;

    // visualsOn = ($('#visuals label.active input').val());
    mode = ($('#mode label.active input').val());
    console.log(mode);
    document.cookie = "mode=" + mode;
    location.href = "session.html";

  })
})

///What is this?
$('.trigger').on('click', function(){
  $(this).toggleClass('clicked');
});


$(document).ready(function(){
  $("#play").click(function(){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'audio/Part One/ding.mp3');
    audioElement.play();
    var repeat = 0;
    audioElement.addEventListener("ended", function() {
      console.log("audio ended")
      if (repeat <= 3){
        audioElement.play();
      }
      repeat++
    });
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
      //Visualization = only one? More for more time? Randomized later??
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
  //cycles through queue of audio until finsished using an event listner to start the next audio when one finishs
  audioQueue = ['audio/Part One/ding.mp3','audio/Part One/ding.mp3','audio/Part One/ding.mp3'];
  var currentAudio = 0;
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', audioQueue[currentAudio]);
  audioElement.play();
  audioElement.addEventListener("ended", function() {
    console.log("audio ended")
    if (currentAudio < audioQueue.length){
      audioElement.play();
    }
    currentAudio++
  });
});
