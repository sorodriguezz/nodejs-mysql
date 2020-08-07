const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
const passport = require('passport')

const {database} = require('./keys');

// INICIALIZACIONES
const app = express();
require('./lib/passport');

// * CONFIGURACIONES
// CONFIGURACION DEL PUERTO DEL SERVER
app.set('port', process.env.PORT || 4000);
// USAR LA CARPETA VIEWS COMO DIRECTORIO PATH
app.set('views', path.join(__dirname, 'views'));
//CONFIGURACION DE HBS PARA DEFINIR CARPETA PARTIALS, LAYOUTS Y LAYOUT POR DEFECTO
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
app.use(session({
    secret: 'sebastiansession',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
}));
app.use(flash());
// INICIAR PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// VARIABLES GLOBALES
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
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