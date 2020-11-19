const create = require('./create');
const signin = require('./signin');
const deleta = require('./delete');
const signout = require('./signout');
const update = require('./update');
const all = require('./all');

module.exports = (app) => {
    app.use('/api/estabelecimentos', create);
    app.use('/api/estabelecimentos', signin);
    app.use('/api/estabelecimentos', deleta);
    app.use('/api/estabelecimentos', signout);
    app.use('/api/estabelecimentos', update);
    app.use('/api/estabelecimentos', all);
};