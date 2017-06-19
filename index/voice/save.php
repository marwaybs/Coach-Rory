<?php

include 'GoogleSpeechAPI/quickstart.php';

ini_set('error_reporting', E_ALL);

// via: https://github.com/muaz-khan/RecordRTC/blob/master/RecordRTC-to-PHP/save.php
header("Access-Control-Allow-Origin: *");

if (!isset($_POST['audio-filename']) && !isset($_POST['video-filename'])) {
  echo 'PermissionDeniedError';
  return;
}

$fileName = '';
$tempName = '';

if (isset($_POST['audio-filename'])) {
  $fileName = $_POST['audio-filename'];
  $tempName = $_FILES['audio-blob']['tmp_name'];
} else {
  $fileName = $_POST['video-filename'];
  $tempName = $_FILES['video-blob']['tmp_name'];
}

if (empty($fileName) || empty($tempName)) {
  echo 'PermissionDeniedError';
  return;
}
$filePath ='GoogleSpeechAPI/uploads/' . $fileName;

// make sure that one can upload only allowed audio/video files
$allowed = array(
  'webm',
  'wav',
  'mp4',
  'mp3',
  'ogg'
);

$extension = pathinfo($filePath, PATHINFO_EXTENSION);
if (!$extension || empty($extension) || !in_array($extension, $allowed)) {
  echo 'PermissionDeniedError';
}

if (!move_uploaded_file($tempName, $filePath)) {
  echo ('Problem saving file.');
  return;
}else{
  $noExtFileName = substr($fileName, 0, strlen($fileName)-5);
  // echo $tempName;
  echo(textToSpeech($noExtFileName));
}
// echo ($filePath);
?>
