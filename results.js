var helper = require('sendgrid').mail;
var email;



let notattempted = 0
let correct = 0
let wrong = 0


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
  localforage.getItem('user',function(err,value) {
    email = (value.name);
    var from_email = new helper.Email('results@rohanm.com');
    var to_email = new helper.Email(email);
    var subject = 'Exam Results';
    var text = "<h2>The results are :</h2>" + "<p> Total Marks : " + correct*3 + " . </p>"
    var content = new helper.Content('text/html', text);
    var mail = new helper.Mail(from_email, subject, to_email, content);
    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function(error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });

  });

  });
$(".close").click(function() {
  window.close();
});
