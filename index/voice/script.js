function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
}
var mediaConstraints = {
    audio: true
};

$(function(){
  $('#start-recording').click(function(){
    console.log("here");
    this.disabled = true;
    captureUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
  });
});



$(function(){
  $('#stop-recording').click(function(){
    this.disabled = true;
    mediaRecorder.stop();
    mediaRecorder.stream.stop();
    // document.querySelector('#pause-recording').disabled = true;
    document.querySelector('#start-recording').disabled = false;
  });
});

$(function(){
  $('#save-recording').click(function(){
      // this.disabled = true;
      mediaRecorder.save();
        // alert('Drop WebM file on Chrome or Firefox. Both can play entire file. VLC player or other players may not work.');
  });
});


var mediaRecorder;
function onMediaSuccess(stream) {
    var audio = document.createElement('audio');
    audio = mergeProps(audio, {
        controls: true,
        muted: true,
        src: URL.createObjectURL(stream)
    });
    audio.play();

    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.stream = stream;

    mediaRecorder.recorderType = StereoAudioRecorder;
    mediaRecorder.mimeType = 'audio/wav';

    // don't force any mimeType; use above "recorderType" instead.
    mediaRecorder.audioChannels = 1;
    mediaRecorder.ondataavailable = function(blob) {
        var a = document.createElement('a');
        a.target = '_blank';
        a.innerHTML = 'Open Recorded Audio No. ' + (index++) + ' (Size: ' + bytesToSize(blob.size) + ') Time Length: ' + getTimeLength(timeInterval);
        a.href = URL.createObjectURL(blob);

        uploadToPHPServer(blob);
    };
    var timeInterval = 5000;
    // get blob after specific time interval
    mediaRecorder.start(timeInterval);
    document.querySelector('#stop-recording').disabled = false;
    // document.querySelector('#pause-recording').disabled = false;
    // document.querySelector('#save-recording').disabled = false;
}
function onMediaError(e) {
    console.error('media error', e);
}
// var audiosContainer = document.getElementById('audios-container');
var index = 1;

// below function via: http://goo.gl/B3ae8c
function bytesToSize(bytes) {
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
// below function via: http://goo.gl/6QNDcI
function getTimeLength(milliseconds) {
    var data = new Date(milliseconds);
    return data.getUTCHours() + " hours, " + data.getUTCMinutes() + " minutes and " + data.getUTCSeconds() + " second(s)";
}
window.onbeforeunload = function() {
    document.querySelector('#start-recording').disabled = false;
};

function uploadToPHPServer(blob) {
    var file = new File([blob], 'msr-' + (new Date).toISOString().replace(/:|\./g, '-') + '.webm', {
        type: 'video/webm'
    });

    // create FormData
    var formData = new FormData();
    formData.append('video-filename', file.name);
    formData.append('video-blob', file);

    makeXMLHttpRequest('save.php', formData, function() {
        var downloadURL = 'Google Speech API/uploads/' + file.name;
        console.log('File uploaded to this path:', downloadURL);
    });
}

function makeXMLHttpRequest(url, data, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            console.log(request.responseText)
            var newText = document.createElement('li');
            newText.appendChild(document.createTextNode(request.responseText));
            text.appendChild(newText);
        }
    };
    request.open('POST', url);
    request.send(data);
}
