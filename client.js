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
	var params = {
	  text: message.body,
	  from: 'fr',
	  to: 'en'
	};

	var client = new MsTranslator({
	  client_id: "Bighack_SG",
	  client_secret: "Bighack_Singapore_92"
	});

	client.initialize_token(function(){
	  client.translate(params, function(err, data) {
	    if (err) console.log('error:' + err.message);
		// console.log(data);
		// console.log(message);
		messageData = {
			orignalMessage: message.body,
			translatedMessage: data,
			messageTime: message.dateSent,
			sender: message.from
		};

		callback(messageData);
	  });
	});
}

module.exports = client;



