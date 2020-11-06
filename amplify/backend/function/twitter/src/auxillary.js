module.exports = function(){
    this.clean_response = function(server_response) {
        let y = server_response[0].trends
        try{
            let tweet_arr = [];
            for (let i = 0 ; i < 10; i++){
                tweet_arr.push(server_response[i].name);
            }
            return tweet_arr;
        }
        catch(err){
            throw new Error(err,"there was an error parsing the twitter response");
        }
    }

}