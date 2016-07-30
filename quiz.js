var dummyQuestions =
[{
  id:1,
  q:"This is a sample question",
  o:["option1","option2","option3","option4"],
  selected:2
},
{ id:2, q:"This is a sample question2", o:["option2-1","option2-2","option2-3","option2-4"],  selected:-1 } ,
{ id:3, q:"This is a sample question3", o:["option3-1","option3-2","option3-3","option3-4"],  selected:-1 } ,
{ id:4, q:"This is a sample question4", o:["option4-1","option4-2","option4-3","option4-4"],  selected:-1 } ,
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
    str+= `<a class="btn-floating waves-effect waves-light btn q-jump green accent-4" data-id="${i}">${i}</a>`;
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
      let str="";
      console.log(value.selected);
      if(value.selected == i+1) {
        str="checked";
      }
       optionStr += `
        <li class="collection-item">
          <input type="radio" class="option" name="options" value="${i+1}" id="option${i+1}" ${str}  />
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

$(".q-jump").click(function(){
  var id = $(this).data('id');
  count = id;
  loadQuestion(id);
  return ;
});

$(".answers").on('click','.option',()=>{
  localforage.getItem(Q[count],(err,value) => {
    value.selected = $(".option:checked").val()
    console.log($(".option:checked").val());
    localforage.setItem(Q[count],value,(err,value) => {
      if(err) {
//        console.log(err);
      }
//      console.log(value);
    })
  })
//  console.log(count + ' changed');
});

$(".submit-btn").click(() => {
  window.location = "results.html";
})
