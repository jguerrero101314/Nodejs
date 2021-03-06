//Puerto
process.env.PORT = process.env.PORT || 3000;

//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Vencimiento del token  60 segundos, 60 minutos, 24 horas y 30 dias
process.env.CADUCIDAD_TOKEN = '48h';
//SEED de autenticacion
process.env.SEED = process.env.SEED || 'secret';
//BD
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;
//Google CLient ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '296046556212-d1q44o9ae224707imgdpdeb69gk94cur.apps.googleusercontent.com';