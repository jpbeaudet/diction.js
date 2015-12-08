<<<<<<< HEAD
# diction.js:
Hands free notes with voice command formatting
## Contributors are welcome !
If you want to contrubute to this little practical I will be enchanted. The GNu 2.0 License permits it.
For information about the code contact jpbeaudet84@gmail.com

## Features:
  *Format and edit text with voice command
    *English language
    *English sub-language
  *Download in:
    *Pdf files
    *Txt files
  *Send with:
    *email (to yourself until google+integration)

## Dependencies:
1. Install the package.json `npm install`
  * express:3.3.4
  * jade: 0.34.1
  * passport: 0.1.18
  * passport-local: 0.1.6
  * mongoose: 3.8.5
  * passport-local-mongoose": 0.2.5 
  * mocha: 1.14.0
  * chai: 1.8.1
  * should: 2.1.0
  * install: 0.1.7
  * npm: 1.3.25
  * mongodb:1.3.23
  * socket.io
  * formidable

## Installation:
1. Download zip and extract in the wanted directory
2. Change port to 8080 or localhost in app.js (Until a config file is made)
  * Change port accordingly in all socket.io call (Until config file is made client side)
  1. Speech.js
  2. Control.js
  3. data.js 
3. Start mongodb in a screen `./mongod`
4. Run in home directory of the project `node app.js`
## TODO :
1. Add congig file on server side
2. Add config constructor on client-side
3. Add facebook,twitter,google+ integration (auth and api for contacts and share and tweets)
4. Troubleshoot socket.io multifire bug
5. Add more command and command variants
6 Add new command_<language>() command traduction in nthe function and add defalut command_en()
7. Add sms

