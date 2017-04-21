var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

/*ClientID and secret needed for authentication*/
var clientId = '172225713954.173044575415';
var clientSecret = '4c1e4294c9d26ba918df998facc84b28';

var d = new Date();

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended:false});

const PORT=4390; //port on which the web server is listening on

app.listen(PORT,function() {
  console.log("Server is now listening on:" + PORT);
});

app.get('/', function(req,res) {
  res.send('Ngrok is working! Path Hit: ' + req.url);
});

/*Oauth module for authenticating with Slack */
app.get('/oauth', function(req,res) {
  if(!req.query.code) {
    res.status(500);
    res.send({"Error" : "Looks like we're not getting code."});
    console.log("Looks like we're not getting code");
  } else {

    request({
      url: 'https://slack.com/api/oauth.access',
      qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret},
      method: 'GET' ,
    
    }, function(error,response,body) {
      if(error) {
        console.log(error);
      } else {
        res.json(body);

      }
    })
  }
});

/*Function responsible for sending message to slack*/
function sendMessageToSlackResponseURL(responseURL, JSONmessage){
  var postOptions = {
    uri: responseURL,
    method: 'POST',
    headers: {
      'Content-type':'application/json'
    },
    json: JSONmessage
  };

  request(postOptions,(error,response,body) => {
    if(error) {
      console.log('Error occured here in request');
    }
  })
}


/*ActionURL responsible for sending response for action buttons*/
app.post('/slack/actions',urlencodedParser,(req,res) =>{
  res.status(200).end();
  var actionJSONpayload = JSON.parse(req.body.payload);
  var result = actionJSONpayload.actions[0].name;
  var user = actionJSONpayload.user.name;
  var hour = d.getHours();
  var min = d.getMinutes();

 /*Check if the user pressed acknowledge*/
  if(result.toString().trim() === 'Acknowledge') {

  var message = {
      "text": "*Triggered* #448: The server is on fire\n *Assigned*:Bob\t\t*Service*:The Slackening\n",
      "replace_original": true,
      "attachments": [
      {
        "fallback": "Shame..buttons aren't supported here",
        "callback_id":"button_tutorial",
        "color":"#3AA3E3",
        "attachment_type":"default",
        "fields" : [
        {
          "title": "Acknowledged by @" +actionJSONpayload.user.name+"| Today at "+hour+":"+min,
        }
        ],
        "actions": [
        {
          "name":"Acknowledge",
          "text":"Acknowledge",
          "type":"button",
          "value":"Acknowledge"
        },
        {
          "name":"Resolve",
          "text":"Resolve",
          "type":"button",
          "value":"Resolve"
        } 
        ]
      }
      ]
  }
  
  var message1 = {
    "text" : "*Acknowledged* #448: The server is on fire Jump | by " + actionJSONpayload.user.name,
    "replace_original": false,
    "color":"#3AA3E3"
  }
    sendMessageToSlackResponseURL(actionJSONpayload.response_url, message);
    sendMessageToSlackResponseURL(actionJSONpayload.response_url, message1);
  }

});

/*The triggered message being sent to slack*/
function WebHookMessage() {
   var webURL = 'https://hooks.slack.com/services/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'
   var message = {
      "text": "*Triggered* #448: The server is on fire\n *Assigned*:Bob\t\t*Service*:The Slackening",
      "attachments": [
      {
        "fallback": "Shame..buttons aren't supported here",
        "callback_id":"button_tutorial",
        "color":"#3AA3E3",
        "attachment_type":"default",
        "actions": [
        {
          "name":"Acknowledge",
          "text":"Acknowledge",
          "type":"button",
          "value":"Acknowledge"
        },
        {
          "name":"Resolve",
          "text":"Resolve",
          "type":"button",
          "value":"Resolve"
        } 
        ]
      }
      ]
    };
   sendMessageToSlackResponseURL(webURL,message);
}
WebHookMessage();   
