function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

//submit button, collects picked parameters
$(document).ready(function(){
  $("#startSession").click(function(){
    // var visualsOn;
    var mode;

    // visualsOn = ($('#visuals label.active input').val());
    mode = ($('#mode label.active input').val());
    console.log(mode);
    document.cookie = "mode=" + mode;

    fbq('track', 'Purchase', {
      content_ids: [mode],
      value: 10.00,
      currency: 'CAD'
    });


    location.href = "index/session.php";

  })
})
