var MsTranslator = require('./mstranslator');

// var client_secret=process.env.MSCLIENT_SECRET;
// var client_id=process.env.MSCLIENT_ID;

// if (!client_secret || !client_id) {
//   console.log('client_secret and client_id missing');
//   process.exit(1);
// }

var params = {
  text: "Je m'appelle Vinod. J'ai 23 ans. J'achete 4 vaches",
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
    process.exit();
  });
});
