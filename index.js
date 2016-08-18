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

const voices = [
  { Gender: 'Female', Language: 'it-IT', Name: 'Carla' },
  { Gender: 'Male', Language: 'it-IT', Name: 'Giorgio' }
];

const speak = (text, voice) => {
  try {
    fs.mkdirSync(`./output/${voice.Name}`);
  } catch(e) {
    // Ignore
  };

  ivona
    .createVoice(text, {
      body: { voice: voice }
    })
    .pipe(fs.createWriteStream(`./output/${voice.Name}/${text}.mp3`));
};

const points = data.map(x => x.traditional_wind_point);

voices.map(voice =>
  points.map(point => speak(point, voice))
);
