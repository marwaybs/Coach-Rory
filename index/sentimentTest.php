
<html lang="en">
<head>

  <!-- If IE use the latest rendering engine -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta charset="UTF-8">
    <title>Sentiment Test</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"></script>
    <script src="https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/js/bootstrap.js"></script>


</head>
<body>

  <div class = "container" id = "afterBLS">
    <p >Input for Sentiment Analysis</p>
    <textarea rows="4" cols="50" id = "feelingsText">hello</textarea>
    <button  id ="submitFeelings" type="button" >Submit</button>
  </div>
  <div class="container">
    <p>sentiments (Scale from -1 to 1 from negative to positive, Magnitude)
    <ol id="sentiments"></ol>
  </div>

</body>

<script>
$(document).ready(function(){
  $("#submitFeelings").click(function() {
    var sentiments = document.getElementById('sentiments');
    $.ajax({
      url: 'getData.php',
      type: 'post',
      data: {'action': 'send', 'text': $('#feelingsText').val()},
      success: function(data, status) {
        var newSentiment = document.createElement('li');
        newSentiment.appendChild(document.createTextNode(data));
        sentiments.appendChild(newSentiment);
      },
      error: function(xhr, desc, err) {
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
      }
    }); // end ajax call
  })
})
</script>
</html>
