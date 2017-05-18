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
    document.cookie = "mode=cat";
    //location.href = "session.html";

  })
})

$('.trigger').on('click', function(){
  $(this).toggleClass('clicked');
});
