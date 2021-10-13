const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
    console.log('Database connected')
})

module.exports = mongoose