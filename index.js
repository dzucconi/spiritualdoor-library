const Ivona = require('ivona-node');

const ivona = new Ivona({
  accessKey: process.env.IVONA_ACCESS_KEY,
  secretKey: process.env.IVONA_SECRET_KEY
});

console.log(process.env.IVONA_ACCESS_KEY)

ivona.listVoices()
  .on('complete', function(voices) {
    console.log(voices);
  });

//  ivona.createVoice(text, config)
//  [string] text - the text to be spoken
//  [object] config (optional) - override Ivona request via 'body' value
// ivona.createVoice('This is the text that will be spoken.', {
//   body: {
//     voice: {
//       name: 'Salli',
//       language: 'en-US',
//       gender: 'Female'
//     }
//   }
// }).pipe(fs.createWriteStream('text.mp3'));
