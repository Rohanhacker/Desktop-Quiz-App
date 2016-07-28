localforage.setItem('q1', ['this is the first question','1First option','Second option','Third option','Fourth option'], function(err, value) {
    // Do other things once the value has been saved.

});

localforage.setItem('q2', ['this is the second question','2First option','Second option','Third option','Fourth option'], function(err, value) {
    // Do other things once the value has been saved.

});

localforage.setItem('q3', ['this is the thrid question','3First option','Second option','Third option','Fourth option'], function(err, value) {
    // Do other things once the value has been saved.

});

localforage.setItem('q4', ['this is the fourth question','4First option','Second option','Third option','Fourth option'], function(err, value) {
    // Do other things once the value has been saved.

});

const array = ['q1','q2','q3','q4']

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
shuffle(array)
const A = ["q1","q2","q3","q4"]
const max = 4
let count = -1


const storage = function(array) {
  count = (count+1)%max
  localforage.getItem(array[count], function(err, value) {
    $("a").removeClass("yellow")
    $("."+A[count]).addClass("yellow")
    $(".question-content").html(value[0])
    $(".option1").html(value[1])
    $(".option2").html(value[2])
    $(".option3").html(value[3])
    $(".option4").html(value[4])
  })
}


storage(array)

$(".nxt").click(() => {
  storage(array)
});
