$(document).ready(function(){
    
    /*Initialize the SDK
      Needs to be included in the html
      Get your key from Azure dashboard -> bottom nav -> manage keys
    */
    var client = new WindowsAzure.MobileServiceClient(
    "{INSERT_ENDPOINT_TO_MOBILE_SERVICE}",
    "{INSERT_AUTH_KEY_HERE}"
    );

    /* Let's get high scores */
    getHighScores();

    function getHighScores(){
        $('.results').empty();// empty this
        /* Get results from table named highscore, order by descending on score column, only return 10*/
        client.getTable('highscore').orderByDescending("score").take(10).read().done(function(results){
            var len = results.length;
            for(var i=0;i<len;i++){
                var data = results[i];
                $("<li>"+data.user_name+":"+data.score+"</li>").appendTo('.results');
            }
        })
    }
    /*Submitting the form, will insert the data, and then refresh it again */
   $( "form" ).on( "submit", function( event ) {
     event.preventDefault();
        var obj={'user_name':$('#user_name').val(),
                 'score':$('#score').val()
             };
        client.getTable("highscore").insert(obj).done(function(result){
            getHighScores();
        });

    });
})



/* Basic Rest API - no sdk
 xhr = new XMLHttpRequest();
  function restGet(){
     $.ajax({
    url: ' https://gamingleaderboard.azure-mobile.net/tables/highscore',
    type: 'GET',
    datatype: 'json',
    data:{'$top':'3'},
    success: function(data) { 
        var len = data.length;
        
        for(var i=0;i<len;i++)
        {
           console.log(data[i]);
        }
        
     },
    error: function() { alert('Failed!'); },
    beforeSend: setHeader       
  });   
  }

  function restPost(){
     $.ajax({
    url: ' https://gamingleaderboard.azure-mobile.net/tables/highscore',
    type: 'POST',
    datatype: 'json',
    data:{'user_name':'Mary','score':'333'},
    success: function(data) { 
        var len = data.length;
        console.log("stacey is done")
        for(var i=0;i<len;i++)
        {
        //  $("<p>"+data[i].user_name+":"+data[i].score+"</p>").appendTo('body p');
        }
        
     },
    error: function() { alert('Failed!'); },
    beforeSend: setHeader       
  });   
  }



function setHeader(xhr) {

  xhr.setRequestHeader('X-ZUMO-APPLICATION', 'lsNjRPdjvoigzfsyAePFnMcsLKraFJ21');

}
*/

