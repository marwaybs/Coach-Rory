//html5 webspeech API

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var recognition = new SpeechRecognition();
recognition.continuous = true; //true = won
recognition.interimResults = false; //outputs interim results before giving final results
recognition.maxAlternatives = 1; //alternatives for text, 1 is default

function startRecognition(){
  recognition.start();
  final_transcript = '';
  microphone.src = 'mic-animate.gif';
  console.log('Ready for recognition');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

recognition.onresult = function(event) {
  var interim_transcript = '';
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }
  final_transcript = capitalize(final_transcript);
  console.log(final_transcript);
};

function endRecognition(){
  console.log(final_transcript);
  recognition.stop();
  microphone.src = 'mic.gif';
}
