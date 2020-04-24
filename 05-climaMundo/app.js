const axios = require('axios');
const argv = require('yargs').options({
    direccion:{
        alias:'d',
        desc: 'Direccion de la ciudad para obtener el clima',
        demand:true
    }
}).argv;


const endocedUlr = encodeURI(argv.direccion);
console.log(endocedUlr);


const instance = axios.create({
    baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${endocedUlr}`,
    headers: {'x-rapidapi-key': '5654fb123bmshb5fe2b181de1f47p183943jsn5f0e8a248f61'}
  });
  instance.get().then(resp=>{
      console.log(resp.data.Results[0]);
  }).catch(err => {
      console.log('ERROR!!!!!',err);
  })