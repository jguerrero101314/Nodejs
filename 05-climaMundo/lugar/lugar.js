const axios = require('axios');

const getLugarLatLng = async(di) => {

    const endocedUlr = encodeURI(di);
    console.log(endocedUlr);
    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${endocedUlr}`,
        headers: { 'x-rapidapi-key': '5654fb123bmshb5fe2b181de1f47p183943jsn5f0e8a248f61' }
    });
    const resp = await instance.get();
    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${dir}`);
    }

    const data = resp.data.Results[0];
    const direccion = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        direccion,
        lat,
        lng
    }
}
module.exports = {
    getLugarLatLng
}