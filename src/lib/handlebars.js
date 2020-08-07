const {format} = require('timeago.js');

const helpers = {};

helpers.timeago = (timestamp) => {
    /*
    TODO: para ver en español modificar el archivo "index.js" en:
    * /node_modules/timeago.js/lib/index.js
    TODO: cambiar :
    * var en_US_1 = __importDefault(require("./lang/es"));
    * register_1.register('es', en_US_1.default);
    ? CON ESE CAMBIO TOMARÁ LA LIBRERIA EN ESPAÑOL
    */

    return format(timestamp, 'es');
};

module.exports = helpers;