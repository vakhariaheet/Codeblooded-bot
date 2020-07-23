import Twit from "twit";
import config from "./config.js";
const T = new Twit(config);
import axios from "axios";

const retweet = () => {
    console.log('reweet()')
    const params = {
        q:'#100DaysOfCode',
        result_type : 'recent',
        count:10
    }
    T.get('search/tweets',params,(err, data,response) => {
        console.log('Helloo G')
        let tweets = data.statuses
        if(!err){
            console.log('789')
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
            }
        }
        else{
            console.log(err)
        }
    })
}
const tweetMovivational = () => {
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
                console.log(text,author)
            let finalTweetMsg =  `${text}\n -${author}`;
            T.post('statuses/update', { status: finalTweetMsg }, function(err, data, response) {
                console.log(data)
                })
        })
        .catch((error)=>{
          console.log(error)
        })

};

function retweetinterval()  {
    let time = 60000 * Math.floor((Math.random() *10)+1)
    console.log(time,'retweet')
    setTimeout(()=>{
        console.log(time,'retweetfr')
        retweet()
        runRetweet()
    } , time)
}
function Quoteinterval()  {
    let timeForQoute = 60000 * Math.floor((Math.random() *5)+1)
    console.log(timeForQoute,'Quote')
    setTimeout(()=>{
       tweetMovivational()
       runQoute()
    } , timeForQoute)
}
const runRetweet = () =>{
    retweetinterval()
}
const runQoute =() => {
Quoteinterval()
}
tweetMovivational()
runRetweet()
runQoute()

