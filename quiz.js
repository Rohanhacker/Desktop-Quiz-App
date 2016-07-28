var dummyQuestions =
[{
  id:1,
  q:"This is a sample question",
  o:["option1","option2","option3","option4"],
  selected:2
},
{ id:2, q:"This is a sample question2", o:["option2-1","option2-2","option2-3","option2-4"],  selected:2 } ,
{ id:3, q:"This is a sample question3", o:["option3-1","option3-2","option3-3","option3-4"],  selected:4 } ,
{ id:4, q:"This is a sample question4", o:["option4-1","option4-2","option4-3","option4-4"],  selected:2 } ,
];

for(i=0;i<dummyQuestions.length;i++){
  localforage.setItem('q'+(i+1), dummyQuestions[i], function(err,value){
    console.log(err);
  });
}

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

const Q = ["q1","q2","q3","q4"]
shuffle(Q)
const max = 4
let count = 0

loadQuestion(count);
loadQuestionLinks();

function loadQuestionLinks(){
  var str="";
  for(i=0;i<max;i++){
    str+= `<a class="btn-floating waves-effect waves-light btn q-jump" data-id="${i}">${i}</a>`;
  }
  $(".q-jump-container").html(str);
}

const nextQuestion = function() {
  count = (count+1)%max
  loadQuestion(count);
}
const prevQuestion = function(){
  count = (count+max-1)%max
  loadQuestion(count);
}

function loadQuestion(count){
  localforage.getItem(Q[count], function(err, value) {
    $(".q-jump").removeClass("green")
    $(".q-jump[data-id="+count+"]").addClass("green")

    $(".question-content").html(value.q);
    var qContainer = $("#q-options");
    var options = value.o;
    let optionStr="";
    for(i=0;i<options.length;i++){
       optionStr += `
        <li class="collection-item">
          <input type="radio" class="option" name="options" value="${i+1}" id="option${i+1}" />
          <label for="option${i+1}" >${options[i]}</label>
        </li>
      `;
    }
    qContainer.html(optionStr);
  });
}

$(".nxt").click(() => {
  nextQuestion();
});

$(".prev").click(() => {
  prevQuestion();
});

$(".q-jump").click(() => {
  var id = $(this).data('id');
  count = id;
  loadQuestion(id);
});

$(".option").change(()=>{
  console.log(count + ' changed');
});
