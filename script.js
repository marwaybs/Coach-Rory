function pop(div) {
  document.getElementById(div).style.display = 'block';
}
function hide(div) {
  document.getElementById(div).style.display = 'none';
}
//To detect escape button
document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    hide('popDiv');
  }
};

// $(document).ready(function(){
//   $('.btn-group').on('input', 'change', function(){
//      var checkbox = $(this);
//      var label = checkbox.parent('label');
//      if (checkbox.is(':checked'))  {
//         label.addClass('active');
//      }
//      else {
//         label.removeClass('active');
//      }
//   });
// })



$(document).ready(function(){
  $("#startSession").click(function(){
    var visualsOn;
    var sessionLength;
    var sessionSpeed;

    visualsOn = ($('#visuals label.active input').val());
    sessionLength = ($('#length label.active input').val());
    sessionSpeed = ($('#speed label.active input').val());

    console.log(visualsOn, sessionLength, sessionSpeed);

  })
})

// $(document).ready(function(){
//   $("#startSession").click(function(){
//     var visuals;
//     var sessionLength;
//     var sessionSpeed;
//
//     if($('#visualsOn').is(':checked')) {
//       sessionLength = true;
//     }else {
//       sessionLength = false;
//     }
//   })
// })
