module.exports = function(){
    this.clean_response = function(server_response) {
        /*
        try{
            let tweet_count = server_response.search_metadata.count;

            let tweet_arr = [];
            for (let i = 0 ; i < tweet_count; i++){
                tweet_arr.push(String(server_response.statuses[i].text));
            }
            return tweet_arr;
        }
        catch(err){
            throw new Error(err,"there was an error parsing the twitter response");
        }

         */
        return;
    }
    this.clean_trends = function(server_response){
        return;
    }
    this.filter_woeid = function(server_response){
        
    }
}