const fs = require('fs');
const Ivona = require('ivona-node');
const data = require('./data');

const wait = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

const ivona = new Ivona({
  accessKey: process.env.IVONA_ACCESS_KEY,
  secretKey: process.env.IVONA_SECRET_KEY
});

const getVoices = () =>
  new Promise(resolve =>
    ivona
      .listVoices()
      .on('complete', resolve)
  );

const speak = (text, voice) =>
  new Promise(resolve => {
    try {
      fs.mkdirSync(`./output/${voice.Name}`);
    } catch(e) {
      // Ignore
    }

    ivona
      .createVoice(text, {
        body: { voice: voice }
      })
      .pipe(fs.createWriteStream(`./output/${voice.Name}/${text}.mp3`))
      .on('finish', () => {
        wait(250).then(resolve);
      });

  });

const winds = data.map(({ wind }) => wind);

const generate = voice => {
  console.log('------');
  console.log(`Generating ${voice.Name}`);
  return winds.reduce((promise, wind) => {
    return promise.then(() => {
      console.log(`Speaking: "${wind}"`);
      return speak(wind, voice).then(() => wait(25));
    });
  }, Promise.resolve(true));
};

getVoices()
  .then(({ voices }) => {
    return voices.reduce((promise, voice) => {
      return promise.then(() => generate(voice));
    }, Promise.resolve(true));
  })
  .then(() => {
    console.log('Done.');
  });
