const fs = require('fs');
const Ivona = require('ivona-node');
const data = require('./data');

const ivona = new Ivona({
  accessKey: process.env.IVONA_ACCESS_KEY,
  secretKey: process.env.IVONA_SECRET_KEY
});

const list = () =>
  ivona.listVoices()
    .on('complete', function(voices) {
      console.log(voices);
    });

const voices = {
  female: { Gender: 'Female', Language: 'it-IT', Name: 'Carla' },
  male: { Gender: 'Male', Language: 'it-IT', Name: 'Giorgio' }
};

const speak = (text, voice) =>
  ivona
    .createVoice(text, {
      body: { voice: voice }
    })
    .pipe(fs.createWriteStream(`./output/${voice.Gender}/${text}.mp3`));

const points = data.map(x => x.traditional_wind_point);

points.map(point => speak(point, voices.male));
