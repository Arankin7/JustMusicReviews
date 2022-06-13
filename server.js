const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exhbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Keep it secret, keep it safe',
    cookie: {
        // logs user out after 5 mins
        expires: 300000 
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const hbs = exhbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to DB and server
sequelize.sync({force: false}).then(() =>{
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});