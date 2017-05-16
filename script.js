//BLS methods
function pop(div) {
  document.getElementById(div).style.display = 'block';
}
function hide(div) {
  document.getElementById(div).style.display = 'none';
}

//To exit BLS when pressing esc button
document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    hide('popDiv');
  }
};




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

  })
})
