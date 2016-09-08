var firebase = require("firebase");

let notattempted = 0
let correct = 0
let wrong = 0

var config = {
   apiKey: "AIzaSyDCz-qUXQ0vIrIQ9rgU1HFuaGB7YHtGA_w",
   authDomain: "quizapp-142212.firebaseapp.com",
   databaseURL: "https://quizapp-142212.firebaseio.com",
   storageBucket: "quizapp-142212.appspot.com",
 };
 firebase.initializeApp(config);


localforage.iterate(function(value, key, iterationNumber) {
        if (value.selected == -1) {
          notattempted += 1
        }
        if (value.selected == value.shouldbe) {
          correct += 1
        }
        else {
          wrong += 1
        }
}).then(function() {
  $(".correct").html(correct)
  $(".wrong").html(wrong)
  $(".attempted").html(notattempted)
  $(".total").html(correct*3)
  writeUserData('rohan','a@s.com',correct*3);
  });
$(".close").click(function() {
  window.close();
});
  function writeUserData(name, email, result) {
    firebase.database().ref('users/').set({
      username: name,
      email: email,
      result: result
    });
  }
