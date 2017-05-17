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
	if (screenfull.enabled) {
		screenfull.request(target);
	 }
 });
});


// //To exit BLS when pressing esc button
// document.onkeydown = function(evt) {
//   evt = evt || window.event;
//   if (evt.keyCode == 27) {
//     $("#enterFullScreen").removeClass("hidden");
//   }
// };

$(document).ready(function(){
  if (screenfull.enabled) {
  	screenfull.onchange(() => {
  		console.log('Am I fullscreen?', screenfull.isFullscreen ? 'Yes' : 'No');
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
    var sessionLength;
    var sessionSpeed;

    // visualsOn = ($('#visuals label.active input').val());
    sessionLength = ($('#length label.active input').val());
    sessionSpeed = ($('#speed label.active input').val());

    console.log(sessionLength, sessionSpeed);
    location.href = "session.html";

  })
})
