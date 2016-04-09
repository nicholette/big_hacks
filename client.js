// TWILIO

// Load the twilio module
var twilio = require('twilio');
var MsTranslator = require('./mstranslator');
var config = require('./config');

 
// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

var i = 0;

client.getMessage = function(callback) {
	client.messages.list({ 
		from: config.FROM, 
		to: config.TO,  
	}, function(err, data) { 
		var message = data.messages[0];

		getTextMessage(message, function(msg) {
			console.log('msg', msg);
			callback(msg || {});
		});
	  }
	);
};

client.getMessageList = function(callback) {
	var translated = [];

	client.messages.list({ 
		from: config.FROM, 
		to: config.TO,  
	}, function(err, data) { 
		var messages = data.messages;
		var count = 0;

		messages.forEach(function(msg) {
			console.log(msg);
			getTextMessage(msg, function(msg2) {
				console.log('msg', msg);
				translated.push(msg2);
				count++;
				if (count === 5) { // only show last 3
					callback(translated || []);
				}
			});
		});
	});
};

function getTextMessage(message, callback) {
	function parseStars(input) {
		var numStar = 0;
		var stringMatch;
		var numberStar;

		if (input.originalMessage.match(/[.*](\*)*\s*?$/) !== null){
	  		starMatch = input.originalMessage.match(/[.*](\*)*\s*?$/)[0];
			  if (starMatch === "*" ){
			  	numStar = 1;
			  }
			   else if (starMatch === "**"){
			  	numStar = 2;
			  }
			  else if (starMatch === "***"){
			  	numStar = 3;
			  }
			  else if (starMatch === "****"){
			  	numStar = 4;
			  }
			  else if (starMatch === "*****"){
			  	numStar = 5;
			  }
			  else
			  	numStar = 5;

			  input.originalMessage = input.originalMessage.match(/.*?(?=\*)/)[0];
			  input.translatedMessage = input.translatedMessage.match(/.*?(?=\*)/)[0];
			  input.numStar = numStar;
	 	 } else {
		 	input.numStar = numStar;
		  }
		 callback(input);

	}


	var params = {
	  text: message.body,
	};

	var client = new MsTranslator({
      client_id: "Bighack_SG",
      client_secret: "Bighack_Singapore_92"
    });

    client.initialize_token(function(){
    client.detect (params, function(err, data) {
      var params = {
          text: message.body,
          from: data,
          to: 'en'
        };
        client.translate(params, function(err, data) {
          if (err) console.log('error:' + err.message);
          // console.log(data);
          // console.log(message);
          messageData = {
              originalMessage: message.body,
              translatedMessage: data,
              messageTime: message.dateSent,
              sender: message.from
          };

          parseStars(messageData);
        });
      });
  });
}


module.exports = client;



