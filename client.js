// TWILIO

// Load the twilio module
var twilio = require('twilio');
var MsTranslator = require('./mstranslator');
 
// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

var i = 0;

client.getMessage = function() {
	client.messages.list({ 
		from: process.env.FROM, 
		to: process.env.TO,  
	}, function(err, data) { 
		var message = data.messages[0];

		getTextMessage(message);
	  }
	);
};

client.send = function() {
    client.sendTo(process.env.TEST_RCVP_NUMBER, 'Testing123');
};

function getTextMessage(message) {

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
		console.log(data);
		console.log(message);
		var messageData = {
			orignalMessage: message.body,
			translatedMessage: data,
			messageTime: message.dateSent,
			sender: message.from
		}; 
	    // process.exit()
	  });
	});
}

module.exports = client;



