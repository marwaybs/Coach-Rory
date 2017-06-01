<?php

error_reporting(E_ALL);

$text = "empty";

// $command = escapeshellcmd('sudo python2 sentiment.py "hello, this is a test text"');
$command = escapeshellcmd('sudo #!/usr/bin/python2 hello.py');

$output = shell_exec($command);
$text = $output;

?>


<p>cat</p>
<p>
  <?php echo $text ?>
</p>
