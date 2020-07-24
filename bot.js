import Twit from "twit";
import config from "./config.js";
const T = new Twit(config);
import axios from "axios";
// Retweet and likes lastest 10 tweets contaning #100DaysOfCode when run
const likeAndRetweet = () => {
    const params = {
        q:'#100DaysOfCode',
        result_type : 'recent',
        count:20
    }
    T.get('search/tweets',params,(err, data,response) => {
        let tweets = data.statuses
        if(!err){
                for(let dat of tweets){
                let retweetId = dat.id_str;
                T.post('statuses/retweet/:id',{id: retweetId} , (err,response) => {
                    if(!err){
                        console.log(`retweeted ${retweetId}`)
                    }
                    else{
                        console.log(`something went wrong ${err}`)
                    }
                })
                T.post('favorites/create',{id: retweetId} , (err,response) => {
                    if(!err){
                        console.log(`liked ${retweetId}`)
                    }
                    else{
                        console.log(`something went wrong ${err}`)
                    }
                })
                
            }
        }
        else{
            console.log(err)
        }
    })
}
//Get a quote from the API and the Tweet it when run
const tweet = () => {
    axios({
        "method":"GET",
        "url":"https://quotes15.p.rapidapi.com/quotes/random/",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"quotes15.p.rapidapi.com",
        "x-rapidapi-key":"59d0b2c3c0msh86e340ae9c71bb8p13d7cbjsn0c90670232b6",
        "useQueryString":true
        },"params":{
        "language_code":"en"
        }
        })
        .then((response)=>{
            console.log(response.data)
            let text = response.data.content,
                author = response.data.originator.name;
            let finalTweetMsg =  `${text}\n -${author}`;
            T.post('statuses/update', { status: finalTweetMsg }, function(err, data, response) {
                console.log(text,author)
                })
        })
        .catch((error)=>{
          console.log(error)
        })

};

//Randomly time in mins and at that time runs retweet Func. and retweetInterval func when run
const generatedRetweetTime = () => {
    let time = 60000 * Math.floor((Math.random() *10)+1)
    console.log(time,'retweet')
    setTimeout(()=>{
        likeAndRetweet()
        retweetInterval()
    } , time)
}
const generatedTweetTime = () => {
    let timeForQoute = 60000 * Math.floor((Math.random() *5)+1)
    console.log(timeForQoute,'Quote')
    setTimeout(()=>{
       tweet()
       tweetInterval()
    } , timeForQoute)
}
const retweetInterval = () =>{
    generatedRetweetTime()
}
const tweetInterval =() => {
generatedTweetTime()
}
retweetInterval()
tweetInterval()
