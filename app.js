const express = require('express')
const app = express()
const router = require('./router/index')
const adminRouter = require('./router/adminRouter')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const { isAuthenticated } = require('./auth/isAuthenticated');
const { roleRedirect } = require('./auth/roleAuth');



require('dotenv').config()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'ejs')




const errorHandler = (err, req, res, next) => {
    if(err) {
        res.send('there was an error please try again')
        console.log(err)
    }
}

// Session store initialization
const store = new MongoDBStore({
    uri: process.env.DB_CONNECTION_URI,
    collection: process.env.SESSION_STORE_COLLECTION
}, (err) =>{if(err)console.log(`Can't connect to mongodb: ${err}`)} )

store.on('error', (err) => console.log(err))





// Initializing Passport and Passport Session


// session initialization

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: store,
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

mongoose.connect(process.env.DB_CONNECTION_URI)
.then(() => console.log('Connected to database successfully'))
.catch(err => console.log(`An error has occurred: ${err}`))

require('./config/passport');
app.use(passport.initialize())
app.use(passport.session())

app.use('/admin', adminRouter)

app.use(router)


app.use('/', (req,res) => {
    res.send('Resource does not exist').status(404)
})


app.use(errorHandler)

app.listen(process.env.PORT || 3000, () => console.log(`Listening at port`))