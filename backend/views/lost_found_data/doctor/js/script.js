$(()=>{
    console.log('Welcome to Doctor Side');
    setTimeout(()=>{
      $(".loader-wrapper").fadeOut("slow")
    },700)
   
  })
  
  //webkitURL is deprecated but nevertheless
  URL = window.URL || window.webkitURL;
  
  var gumStream; 						//stream from getUserMedia()
  var rec; 							//Recorder.js object
  var input; 							//MediaStreamAudioSourceNode we'll be recording
  var fname;
  // shim for AudioContext when it's not avb. 
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioContext //audio context to help us record
  
  function Rec() {
    //Record Button is Clicked
    console.log('Record Button Clicked!!');
  
    //Set the constraints to audio
    var constraints = {audio: true,video: false};
  
    //Disable the Record button until 
          //1.Recording is Successful
          //2.Failure/Error
    $('#recordbtn').attr('disabled',true);
    $('#stopbtn').attr('disabled',false);
    $('#pausebtn').attr('disabled',false);
  
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        console.log('Stream Created.. Initializing Recorder');
  
        //create an audio context
        audioContext = new AudioContext();
        gumStream = stream;
        input = audioContext.createMediaStreamSource(stream);
        rec = new Recorder(input,{numChannels:1});
        rec.record();
        console.log('Recording Started Successfully!!');
    }).catch(function(err) {
       console.log('An error occured');
       $('#recordbtn').attr('disabled',false);
       $('#stopbtn').attr('disabled',true);
       $('#pausebtn').attr('disabled',true);
    })
  }
  
  function Pause(){
    console.log('Pause Button Clicked');
    if(rec.recording){
      rec.stop();
      pausebtn.innerHTML = 'RESUME';
    }
    else{
      rec.record();
      pausebtn.innerHTML = 'PAUSE';
    }
  }
  
  function Stop() {
  console.log('Stop Button Clicked');
  $('#recordbtn').attr('disabled',false);
  $('#stopbtn').attr('disabled',true);
  $('#pausebtn').attr('disabled',true);
  pausebtn.innerHTML = 'PAUSE';
  rec.stop();
  gumStream.getAudioTracks()[0].stop();
  rec.exportWAV(createDownloadLink);
  }
  
  function createDownloadLink(blob) {
  var my_url = URL.createObjectURL(blob);
  var f_name = new Date().toISOString();
  fname = f_name;
  $('#list').empty();
  $('#list').append(
    $('<li>')
        .text(f_name )
        .append(
            // var au = document.createElement('audio');
            $('<audio controls>')
                .attr('src', my_url)
                // .on('click',function(){
                //    let audio1 = new Audio(my_url);
                //    audio1.play();
                // })
            ,
            $('<button>')
                  .text('UPLOAD')
                  .attr('class','btn-success')
                  .on('click',function(){
                    console.log('Upload Button Clicked');
                    let storage = firebase.storage().ref('Audio_New/' + f_name + '.wav');
                    let task = storage.put(blob);
                    task.then(function(snapshot) {
                    console.log('Uploaded the file')
                    storage.getDownloadURL().then(function(url){
                        var xhr = new XMLHttpRequest();
                        xhr.responseType = 'blob';
                        xhr.onload = function(event) {
                        var blob = xhr.response;
                        };
                        xhr.open('GET', url);
                        xhr.send();
                                                                
                        firebase.database().ref('FilePath').set({
                          URL : url
                        })
                        console.log("URL has been set to "+url); 
                        console.log('DONE!!');  
                        window.open('/prescription_view', '_blank');                                  
                    }).catch(function(err){
                      console.log('Failure');
                    })
                })
              }),
              // $('<a>')
              //   .attr('href','/prescription_view')
              //   .attr('target', '_blank')
              //   .text('view prescription')
            )     
      )
  }

  