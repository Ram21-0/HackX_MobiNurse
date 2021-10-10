import helpers from "./helpers.js";
// const axios = require("axios")
// import axios from "axios";

// const axioss = axios.create({
//   baseURL: "http://localhost:3000/",
// });

const firebaseConfig = {
  apiKey: "AIzaSyB8cz2hXKJG7u-tRCtAkPyEQ5AqMXBY3Lc",
  authDomain: "imagetotextf.firebaseapp.com",
  databaseURL: "https://imagetotextf.firebaseio.com",
  projectId: "imagetotextf",
  storageBucket: "imagetotextf.appspot.com",
  messagingSenderId: "447880853522",
  appId: "1:447880853522:web:c9ebec7756f596c6f8c0cb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


window.addEventListener("load", () => {
  //When the chat icon is clicked
  document.querySelector("#toggle-chat-pane").addEventListener("click", (e) => {
    let chatElem = document.querySelector("#chat-pane");
    let mainSecElem = document.querySelector("#main-section");

    if (chatElem.classList.contains("chat-opened")) {
      chatElem.setAttribute("hidden", true);
      mainSecElem.classList.remove("col-md-9");
      mainSecElem.classList.add("col-md-12");
      chatElem.classList.remove("chat-opened");
    } else {
      chatElem.attributes.removeNamedItem("hidden");
      mainSecElem.classList.remove("col-md-12");
      mainSecElem.classList.add("col-md-9");
      chatElem.classList.add("chat-opened");
    }

    //remove the 'New' badge on chat icon (if any) once chat is opened.
    setTimeout(() => {
      if (
        document.querySelector("#chat-pane").classList.contains("chat-opened")
      ) {
        helpers.toggleChatNotificationBadge();
      }
    }, 300);
  });

  //When the video frame is clicked. This will enable picture-in-picture
  document.getElementById("local").addEventListener("click", () => {
    if (!document.pictureInPictureElement) {
      document
        .getElementById("local")
        .requestPictureInPicture()
        .catch((error) => {
          // Video failed to enter Picture-in-Picture mode.
          console.error(error);
        });
    } else {
      document.exitPictureInPicture().catch((error) => {
        // Video failed to leave Picture-in-Picture mode.
        console.error(error);
      });
    }
  });

  //When the 'Create room" is button is clicked
  document.getElementById("create-room").addEventListener("click", (e) => {
    e.preventDefault();

    let roomName = document.querySelector("#room-name").value;
    let yourName = document.querySelector("#your-name").value;

    if (roomName && yourName) {
      //remove error message, if any
      document.querySelector("#err-msg").innerText = "";

      //save the user's name in sessionStorage
      sessionStorage.setItem("username", yourName);

      //create room link
      let roomLink = `${location.origin}?room=${roomName
        .trim()
        .replace(" ", "_")}_${helpers.generateRandomString()}`;

      //show message with link to room
      document.querySelector(
        "#room-created"
      ).innerHTML = `Room successfully created. Click <a href='${roomLink}'>here</a> to enter room. 
                Share the room link with your partners.`;

      //empty the values
      document.querySelector("#room-name").value = "";
      document.querySelector("#your-name").value = "";
    } else {
      document.querySelector("#err-msg").innerText = "All fields are required";
    }
  });

  //When the 'Enter room' button is clicked.
  document.getElementById("enter-room").addEventListener("click", (e) => {
    e.preventDefault();

    let name = document.querySelector("#username").value;

    if (name) {
      //remove error message, if any
      document.querySelector("#err-msg-username").innerText = "";

      //save the user's name in sessionStorage
      sessionStorage.setItem("username", name);

      //reload room
      location.reload();
    } else {
      document.querySelector("#err-msg-username").innerText =
        "Please input your name";
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("expand-remote-video")) {
      helpers.maximiseStream(e);
    } else if (e.target && e.target.classList.contains("mute-remote-mic")) {
      helpers.singleStreamToggleMute(e);
    }
  });

  document.getElementById("closeModal").addEventListener("click", () => {
    helpers.toggleModal("recording-options-modal", false);
  });
});

URL = window.URL || window.webkitURL;

var gumStream; //stream from getUserMedia()
var rec; //Recorder.js object
var input; //MediaStreamAudioSourceNode we'll be recording
var fname;
// shim for AudioContext when it's not avb.
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext; //audio context to help us record

function Rec() {
  //Record Button is Clicked
  console.log("Record Button Clicked!!");

  //Set the constraints to audio
  var constraints = { audio: true, video: false };

  //Disable the Record button until
  //1.Recording is Successful
  //2.Failure/Error
  $("#recordbtn").attr("disabled", true);
  $("#stopbtn").attr("disabled", false);
  $("#pausebtn").attr("disabled", false);

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      console.log("Stream Created.. Initializing Recorder");

      //create an audio context
      audioContext = new AudioContext();
      gumStream = stream;
      input = audioContext.createMediaStreamSource(stream);
      rec = new Recorder(input, { numChannels: 1 });
      rec.record();
      console.log("Recording Started Successfully!!");
    })
    .catch(function (err) {
      console.log("An error occured");
      $("#recordbtn").attr("disabled", false);
      $("#stopbtn").attr("disabled", true);
      $("#pausebtn").attr("disabled", true);
    });
}

function Pause() {
  console.log("Pause Button Clicked");
  if (rec.recording) {
    rec.stop();
    pausebtn.innerHTML = "RESUME";
  } else {
    rec.record();
    pausebtn.innerHTML = "PAUSE";
  }
}

function Stop() {
  console.log("Stop Button Clicked");
  $("#recordbtn").attr("disabled", false);
  $("#stopbtn").attr("disabled", true);
  $("#pausebtn").attr("disabled", true);
  pausebtn.innerHTML = "PAUSE";
  rec.stop();
  gumStream.getAudioTracks()[0].stop();
  rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
  var my_url = URL.createObjectURL(blob);
  var f_name = new Date().toISOString();
  fname = f_name;
  $("#list").empty();
  $("#list").append(
    $("<div>")
      // .text(f_name)
      .append(
        // var au = document.createElement('audio');
        // $("<audio controls>").attr("src", my_url),
        // .on('click',function(){
        //    let audio1 = new Audio(my_url);
        //    audio1.play();
        // })
        $("<button>")
          .text("Upload")
          .attr("class", "btn btn-success uploadbtn")
          .on("click", function () {
            console.log("Upload Button Clicked");
            let storage = firebase
              .storage()
              .ref("Audio_New/" + f_name + ".wav");
            let task = storage.put(blob);
            task.then(function (snapshot) {
              console.log("Uploaded the file");
              storage
                .getDownloadURL()
                .then(function (url) {
                  var xhr = new XMLHttpRequest();
                  xhr.responseType = "blob";
                  xhr.onload = function (event) {
                    var blob = xhr.response;
                  };
                  xhr.open("GET", url);
                  xhr.send();

                  firebase.database().ref("FilePath").set({
                    URL: url,
                  });
                  console.log("URL has been set to " + url);
                  
                  let urll = "localhost:3000/jsonData";
        
            // open a connection
            // xhr.open("POST", urll, true);
  
            // Set the request header i.e. which type of content you are sending
            // xhr.setRequestHeader("Content-Type", "application/json");
  
            // Create a state change callback
            // xhr.onreadystatechange = function () {
            //     if (xhr.readyState === 4 && xhr.status === 200) {
  
            //         // Print received data from server
            //         // result.innerHTML = url;
  
            //     }
            // };
  
            // Converting JSON data to string
            // var data = JSON.stringify({ "url": url, 
            // "to1": "vishesh1999gupta@gmail.com", 
            // "to2": "yogesh.narang49@gmail.com"});
  
            // Sending data with the request
            // xhr.send(data);
                  // axios({
                  //   method: 'post',
                  //   url: 'locathost:3000/jsonData',
                  //   data: {
                  //     url : url,
                  //     to1: "vishesh1999gupta@gmail.com",
                  //     to2: "yogesh.narang49@gmail.com"
                  //   }
                  // });
                  axios.post("/jsonData",{
                    url: url,
                    to1: "sriramv2510@gmail.com",
                    to2: "yogesh.narang49@gmail.com"
                  })
                  console.log("DONE!!");
                  // window.open("/prescription_view", "_blank");
                })
                .catch(function (err) {
                  console.log("Failure");
                });
            });
          })
        // $('<a>')
        //   .attr('href','/prescription_view')
        //   .attr('target', '_blank')
        //   .text('view prescription')
      )
  );
}

document.getElementById("recordbtn").addEventListener("click", () => Rec());
document.getElementById("pausebtn").addEventListener("click", () => Pause());
document.getElementById("stopbtn").addEventListener("click", () => Stop());
