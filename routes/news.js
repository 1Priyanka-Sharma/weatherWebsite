const express = require('express')
const axios = require('axios')
const newsr=express.Router()

newsr.get('/',async(req,res)=>{
    try {
        var url = 'http://newsapi.org/v2/top-headlines?' +
          'sources=the-times-of-india&' +
          'apiKey=5ffb1c9fa153496795d36fc58a64d7ba';

        const news_get =await axios.get(url)
        console.log(news_get);
        res.render('index',{articles:news_get.data.articles[0].url})




    } catch (error) {
        if(error.response){
            console.log(error)
        }

    }
})

module.exports=newsr