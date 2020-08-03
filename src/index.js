const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

// INICIALIZACIONES
const app = express();

// CONFIGURACIONES
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', 'hbs');

// MIDDELWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// VARIABLES GLOBALES
app.use((req, res, next) => {
    next();
});

// RUTAS
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

// ARCHIVOS PUBLICOS
app.use(express.static(path.join(__dirname, 'public')));

// INICIO DEL SERVIDOR
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});