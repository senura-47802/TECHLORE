const express = require('express')
const app = express()
const PORT = 3000;
const html = require('html');
const ejs = require('ejs')
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
app.use(express.static(__dirname + '/public'));
const MongoDBURI = 'mongodb+srv://vidul:v1i1d1u4l@movie-database.c5jv16g.mongodb.net/?retryWrites=true&w=majority'

const { MongoClient } = require('mongodb');
const { QuickDB } = require("quick.db");
const dbb = new QuickDB()
const MongoStore = require("connect-mongo")(session);

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const client = new MongoClient(MongoDBURI);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');
  return 'done.';
}
const news = require("./models/news")
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

mongoose.connect(MongoDBURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db2 = mongoose.connection;
db2.on("error", console.error.bind(console, "connection error:"));
db2.once("open", () => { });
app.use(
  session({
    secret: "LHDIDH$#%@$^#$^oq$#@%FSDFDSF@$ihvVSFIVHISHI41$#@^#%&#$$@#$JBVVLJSV",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db2,
    }),
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000
    }
  })
);

app.listen(`${PORT}`, () => {
  console.log("\x1b[32m%s\x1b[0m", "[Website] Website Is Online")
})

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
  resave: false,
  saveUninitialized: true
}));



//Start Of Pages


app.get('/', function(req, res) {
  const user = req.session.user
  const session = req.session
  const user2 = require("./models/user");
  user2.findOne({ email: user }, async (err, data) => {
    res.render('index.ejs', { user: user, session: session, data: data, });
  })
});

app.get('/user/:save?', async function(req, res) {
  const user2 = require("./models/user");
  const user = req.session.user
  const save = req.params.save
  const session = req.session
  const logins = dbb.get("logins")
  if (!user) return res.redirect('/login')
  user2.findOne({ email: user }, async (err, data) => {
    user2.find({ points: { $gt: 0 } }, async (err, board) => {
      user2.countDocuments({ admin: false }, async (err, normal) => {
        user2.countDocuments({ admin: true }, async (err, admin) => {
          res.render('user.ejs', {
            user: user,
            data: data,
            save: save,
            session: session,
            board: board,
            normal: normal,
            admin: admin,
            logins: `${logins}`,
            time: req.body.timeSpend / 1000,
          });
        })
      })
    })
  })
});

app.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
      res.send("Error")
    } else {
      res.redirect('/')
    }
  })
})

app.get('/quiz', function(req, res) {
  const user = req.session.user
    const user2 = require("./models/user");
  user2.findOne({ email: user }, async (err, data) => {
    // res.render('quiz.ejs', { user: user, data: data, });
    res.render('404.ejs',{ msg: 'This Page Is Under Construction', user: user, data: data,})
  })
});

app.get('/quizes', function(req, res) {
  const user = req.session.user
    const user2 = require("./models/user");
  user2.findOne({ email: user }, async (err, data) => {
    // res.render('quizes.ejs', { user: user, data: data, });
    res.render('404.ejs',{ msg: 'This Page Is Under Construction', user: user, data: data,})
  })
});

app.get('/leaderboard', function(req, res) {
  const user = req.session.user
  const user2 = require("./models/user");
  user2.find({ points: { $gt: 0 } }, async (err, data) => {
    user2.findOne({ email: user }, async (err, data2) => {
      res.render('leaderboard.ejs', {
        user: user,
        board: data,
        data: data2,
      });
    })
  }).sort({ points: -1 })
});
app.get('/blogs', function(req, res) {
  const user = req.session.user
  const blog = require("./models/blog");
  blog.find({}, async (err, data) => {
    const user2 = require("./models/user");
    user2.findOne({ email: user }, async (err, data2) => {
      res.render('blogs.ejs', {
        blog: blog,
        blogs: data,
        user: user,
        data: data2
      });
    })
  }).limit(10).sort({ num: -1 })
});
app.get('/challenges', function(req, res) {
  const user = req.session.user
  const user2 = require("./models/user");
  const challenge = require("./models/challenge");
  challenge.find({}, async (err, data) => {
  user2.findOne({ email: user }, async (err, data2) => {
    res.render('challenges.ejs', { 
      user: user,
      data2: data2,
      data: data,
    });
  })
  }).sort({ num: -1 })
});
app.get('/contact', function(req, res) {
  const user = req.session.user
  const user2 = require("./models/user");
  user2.findOne({ email: user }, async (err, data2) => {
    res.render('contact.ejs', { user: user, data: data2 });
  })
});
app.get('/learn', function(req, res) {
  const user = req.session.user
  const learn = require("./models/learn");
  learn.find({}, async (err, data) => {
    const user2 = require("./models/user");
    user2.findOne({ email: user }, async (err, data2) => {
      res.render('learn.ejs', {
        learn: learn,
        learns: data,
        user: user,
        data: data2
      });
    })
  })
});
app.get('/news', function(req, res) {
  const user = req.session.user
  const news = require("./models/news");
  news.find({}, async (err, data) => {
    const user2 = require("./models/user");
    user2.findOne({ email: user }, async (err, data2) => {
      res.render('news.ejs', {
        news: news,
        newss: data,
        user: user,
        data: data2
      });
    })
  }).limit(10).sort({ num: -1 })
});
app.get('/admin', function(req, res) {
  const user = req.session.user
  const user2 = require("./models/user")
  user2.findOne({ email: user }, async (err, data) => {
    if (!data) {
      res.redirect('/')
    } else {
      if (data.admin === false) {
        res.redirect('/')
      } else {
        res.render('admin.ejs', {
          user: user,
          data: data,
        });
      }
    }
  })
});

app.get('/login', function(req, res) {
  const user = req.session.user
  if (user) {
    res.redirect('/')
  } else {
    res.render('login.ejs', { user: user });
  }
});
app.get('/signup', function(req, res) {
  const user = req.session.user
  if (user) {
    res.redirect('/')
  } else {
    res.render('signup.ejs');
  }
});


//End Of Pages


//Star Of Post Api


app.post('/addnews', async function(req, res, next) {
  const news = require("./models/news");
  const num1 = await dbb.get("num");
  const num2 = num1 + 1
  dbb.set("num", num2)
  const info = req.body
  console.log(info)
  let newData = new news({
    id: `${info.title}`,
    title: `${info.title}`,
    description: `${info.description}`,
    date: `${info.date}`,
    link: `${info.link}`,
    image_link: `${info.image_link}`,
    num: `${num2}`
  })
  newData.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/admin')
      console.log("Successfully added news");
    }
  })
})

app.post('/addblog', async function(req, res, next) {
  const blog = require("./models/blog");
  const num1 = await dbb.get("blognum");
  const num2 = num1 + 1
  dbb.set("blognum", num2)
  const info = req.body
  let newData = new blog({
    id: `${info.title}`,
    title: `${info.title}`,
    description: `${info.description}`,
    link: `${info.link}`,
    image_link: `${info.image_data}`,
    num: `${num2}`
  })
  newData.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/admin')
      console.log("Successfully added blog");
    }
  })
})

app.post('/addlearn', async function(req, res, next) {
  const learn = require("./models/learn");
  const num1 = await dbb.get("learnnum");
  const num2 = num1 + 1
  dbb.set("learnnum", num2)
  const info = req.body
  console.log(info)
  let newData = new learn({
    id: `${info.title}`,
    title: `${info.title}`,
    description: `${info.description}`,
    guide: `${info.link}`,
    setup: `${info.setup_link}`,
    image_link: `${info.image_link}`,
    num: `${num2}`
  })
  newData.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/admin')
      console.log("Successfully added lesson");
    }
  })
})

app.post('/addchallenge', async function(req, res, next) {
  const challenge = require("./models/challenge");
  const num1 = await dbb.get("cnum");
  const num2 = num1 + 1
  dbb.set("cnum", num2)
  const info = req.body
  console.log(info)
  let newData = new challenge({
    id: `${info.title}`,
    title: `${info.title}`,
    description: `${info.description}`,
    sdate: `${info.sdate}`,
    edate: `${info.edate}`,
    num: `${num2}`
  })
  newData.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/admin')
      console.log("Successfully added news");
    }
  })
})

app.post('/addpoints', async function(req, res, next) {
  const user = require("./models/user");
  console.log('pointss')
  const info = req.body
  user.findOne({ username: info.username }, async (err, data) => {
    if (data) {
      const count = data.quizcount + info.count
      const points = data.points + info.points
      await user.updateOne({ username: data.username }, { points: points })
      await user.updateOne({ username: data.username }, { quizcount: count })
      res.redirect('/admin')
    } else {
      res.send('There Is No User With That Username')
    }

  })
})

app.post('/avatar', async function(req, res, next) {
  const user = require("./models/user");
  const info = req.body
  await user.updateOne({ email: `${info.email}` }, { avatar: `${info.fileUrl}` })
})


app.post('/signup', async function(req, res, next) {
  const info = req.body
  console.log(info)
  const user = require('./models/user')
  user.findOne({ email: info.email }, async (err, data) => {
    if (data) {
      res.send('There Is Another User With That Email')
    } else {
      user.findOne({ username: info.username }, async (err, data) => {
        if (data) {
          res.send('There Is Another User With That Username')
        } else {
         const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
         if(regexExp.test(`${info.email}`) === false){
           res.send('Email Invalid')
         }else{
          let newData = new user({
            name: `${info.name}`,
            username: `${info.username}`,
            email: `${info.email}`,
            password: `${info.password}`,
            admin: 'no',
            Age: info.age,
            quizcount: 0,
            points: 0,
            avatar: 'img/image.jpg',
          })
          newData.save((error, data) => {
            if (error) {
              console.log(error);
            } else {
              req.session.user = req.body.email;
              const num1 = dbb.get("logins");
              const num2 = num1 + 1
              dbb.set("logins", num2)
              res.redirect('/user')
              console.log("Successfully Registered user");
            }
          })
         }
        }
      })
    }
  })
})


app.post('/login', async function(req, res, next) {
  const info = req.body
  const user = require('./models/user')
  user.findOne({ username: info.username }, async (err, data) => {
    if (data) {
      user.findOne({ password: info.password }, async (err, data) => {
        if (data) {
          const num1 = dbb.get("logins");
          const num2 = num1 + 1
          dbb.set("logins", num2)
          req.session.user = data.email;
          res.redirect('/user')
        } else {
          res.send('Password Incorrect')
        }
      })
    } else {
      res.send('There Is No User With That Username')
    }
  })
})



//End Of Post Api


//Start Of Upload Api








//End Of Upload Api

app.use((req, res, next) => {
const user = req.session.user
    const user2 = require("./models/user");
  user2.findOne({ email: user }, async (err, data) => {
    res.render('404.ejs',{ msg: 'Hello, You Seem To Be Lost', user: user, data: data,})
  })
})