// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron')
localforage.removeItem('user', function(err) {
  console.log("clear");
});

$(".start").on("click",(e) => {
  e.preventDefault();
  obj = {
    "name" : name,
    "number": number,
    "voice": voice
  };
  if(number && name) {
    localforage.setItem('user', obj,(err,value)=> {
      console.log(value);
    });
  }
  if(obj.name && obj.number) {
    ipcRenderer.send("test")
  }
})
var name;
var number,voice=false;
var obj;
$("#name").change(() => {
    name = ($("#name").val());
  });
$("#number").change(() => {
      number = ($("#number").val());
    });
$("#voice").change(() => {
  voice = ($("#voice").prop("checked"));
});
