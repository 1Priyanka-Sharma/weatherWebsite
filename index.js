require('dotenv').config()
const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const nodemailer = require('nodemailer');
require('./mconnection.js');
const MSGModel = require("./public/msg");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// public static path-template engine
const static_path = path.join(__dirname + '/public');
app.use(express.static(static_path));
app.set('view engine', 'hbs');

app.use('/',require('./routes/news'))

app.set('views','./views')

/*
// Routing
app.get('', (req, res) => {
  // try {
  //   var url = 'http://newsapi.org/v2/top-headlines?' +
  //     'country=in&' +
  //     'apiKey=5ffb1c9fa153496795d36fc58a64d7ba';

  //   const news_get = await axios.get(url)
  //   console.get(news_get);
  //   res.render('index', { articles: news_get.data.articles })
  //     } 
  // catch (error) {
  //   if (error.response) 
  //     console.log(error)
  // }


  const NewsAPI = require('newsapi');
  

  // const NewsAPI = require('newsapi');
  // const newsapi = new NewsAPI('5ffb1c9fa153496795d36fc58a64d7ba');
  // To query /v2/top-headlines
  // All options passed to topHeadlines are optional, but you need to include at least one of them
  let a = ['one', 'two'];
  a.forEach((i, a) => {
    console.log(i);
  })
  newsapi.v2.topHeadlines({
    sources: 'the-times-of-india'
  }).then(response => {
    // console.log(response);
    let art = response.articles;
    art.forEach((ele, art) => {
      console.log(ele.urlToImage);
      console.log(ele.url);
      console.log(ele.title);
      let bUImg= ele.urlToImage;
      res.render("index");
    })
    // console.log(response.articles[0].urlToImage);
    
      // {
      //   status: "ok",
      //   articles: [...]
      // }
    
  });

  // res.render("index");
})

*/


/*
// POST Request
app.post("/msg", async function (req, res) {
  try {
    const { name, email, message } = req.body;
    const newMSG = new MSGModel({
      name, email, message
    });
    await newMSG.save();

    res.render("index", { content: 'Thank You. Your response is recorded.' });
    sendEmail(name, email, message);
  }
  catch (error) {
    console.log("Error" + error.message);
  }
});

function sendEmail(name, email, message) {

  let receiverEmail = process.env.EMAIL_ID;
  let password = process.env.PASSWORD;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: receiverEmail,
      pass: password
    }
  });

  let mainContent = 'Name: ' + name + '\n' + 'Email Id: ' + email + '\n' + 'Message: ' + message;

  let mailOptions = {
    from: receiverEmail,
    to: receiverEmail,
    subject: 'Email From Portfolio website',
    text: mainContent
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error)
      console.log(error);
    else
      console.log('Email sent: ' + info.response);
  });
}
*/
app.listen(process.env.PORT || 3000);
module.exports = app;