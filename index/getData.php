
<?php
include 'Google Sentiment Analysis/quickstart.php';
// Same as error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);

if($_POST['action'] == "send") {
  $feelings = $_POST['text'];
  $sentiment = analyzeSentiment("I am happy");
  // $command = escapeshellcmd('sudo python2 sentiment.py ');
  //$command = "sudo python2 sentiment.py \"" .$feelings ."\"";
  // echo ($command);
  //$output = (shell_exec($command));
  echo($sentiment);
}
?>
