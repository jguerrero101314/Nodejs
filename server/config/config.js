//Puerto
process.env.PORT = process.env.PORT || 3000;

//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//BD
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://Clyde:p0nN2IVhmrXZl9rs@cluster0-eqbnb.mongodb.net/Cafe';
}

process.env.URLDB = urlDB;