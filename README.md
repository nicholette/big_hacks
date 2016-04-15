# Kiva Nuevo Backend

Kiva Nuevo Backend is developed with NodeJS, Twilio API and Microsoft Translator API. 
The core logic can be found in *client.js* and the API endpoints is found in *app.js*

Kiva Nuevo was initially meant to be hosted in Heroku (hence the bin folder, which you can safely ignore) but ngrok won over the team instead with it's speed and flexbility (especially in a hackathon).

To use Kiva Nuevo Backend, please prepare a *config.js* file containing these contants:
- **TWILIO_ACCOUNT_SID**
  * Your Twilio account SID
- **TWILIO_AUTH_TOKEN**
  * Your Twilio account authentication token
- **FROM**
  * Your verified phone number in Twilio's verified caller ids.
- **TO**
  * Your Twilio number
- **MS_CLIENT_ID**
  * Your MS Translator Client ID
- **MS_CLIENT_SECRET**
  * Your MS Translator Client secret

To see Kiva Nuevo's frontend, please visit https://github.com/nekonekonik/big_hacks_ui
