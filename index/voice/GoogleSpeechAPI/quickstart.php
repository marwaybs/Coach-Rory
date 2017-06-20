<?php
/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

# [START speech_quickstart]
# Includes the autoloader for libraries installed with composer
require __DIR__ . '/vendor/autoload.php';

# Imports the Google Cloud client library
use Google\Cloud\Speech\SpeechClient;

function convertToFlac($fileName){
  $ffmpeg = FFMpeg\FFMpeg::create();
  $audio = $ffmpeg->open('GoogleSpeechAPI/uploads/' .$fileName. '.webm');

  $format = new FFMpeg\Format\Audio\Flac();
  $format->on('progress', function ($audio, $format, $percentage) {
      echo "$percentage % transcoded";
  });

  $format
      ->setAudioChannels(1)
      ->setAudioKiloBitrate(256);

  $audio->save($format,'GoogleSpeechAPI/uploads/' . $fileName . '.flac');
}

function textToSpeech($fileName){
  convertToFlac($fileName);
  # Your Google Cloud Platform project ID
  $projectId = 'coachror-168614';

  # Instantiates a client
  $speech = new SpeechClient([
      'projectId' => $projectId,
      'languageCode' => 'en-US',
  ]);

  # The name of the audio file to transcribe
  // $fileName = __DIR__ . '/resources/audio.raw';

  # The audio file's encoding and sample rate
  $options = [
      'encoding' => 'flac',
      'sampleRateHertz' => 44100,
  ];
  # Detects speech in the audio file
  $results = $speech->recognize(fopen('GoogleSpeechAPI/uploads/'.$fileName.'.flac', 'r'), $options);

  // echo 'Transcription: ' . $results[0]['transcript'];
  # [END speech_quickstart]
  // var_dump($results);
  // echo $results;
  return $results[0]['transcript'];
}
