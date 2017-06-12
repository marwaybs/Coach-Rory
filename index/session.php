<!DOCTYPE html>
<html lang="en">
<head>

  <!-- If IE use the latest rendering engine -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta charset="UTF-8">
    <title>Coach Rory</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <link rel="stylesheet" href="styles.css">
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"></script>
    <script src="https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/js/bootstrap.js"></script> -->
    <script type='text/javascript' src="script.js"></script>
    <script type ='text/javascript' src="https://cdnjs.cloudflare.com/ajax/libs/screenfull.js/3.2.0/screenfull.min.js"></script>


</head>
<body>

  <div id = settings>
    <button type="button" id = "enterFullScreen" >Enter Full Screen</button>
    <button type="button" id = "hideBLS" >Hide Animation</button>

  </div>

  <div class="circle" id = "bls" ></div>

  <div id = "afterBLS">
    <p style = "color:white;">When you think about that picture, and the negative belief , what emotions do you feel now?</p>
    <input type="range" id="SUD" value="50">
    <textarea rows="4" cols="50" id = "feelingsText">hello</textarea>
    <button  id ="submitFeelings" type="button" disabled >Submit</button>
  </div>

  <div id = "memoryInput">
    <p style = "color:white;">Memory Input:</p>
    <input type="range" id="memory" value="50">
    <textarea rows="4" cols="50" id = "memoryText">hello</textarea>
    <button  id ="submitMemory" type="button" disabled >Submit</button>
  </div>



  <div id = "sessionOver">
    <p class = "" >The session is now over.</p>
    <p class = "visQuestion">Did you enjoy the visualizations during the session?</p>
    <button type="button" id = "likeVis" class = "btn visQuestion" disabled >Yes</button>
    <button type="button" id = "dislikeVis" class = "btn visQuestion" disabled >No</button>
  </div>
</body>
</html>
