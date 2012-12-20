jQuery(function(){
     jQuery("#twitter-box").tweet({
          username: "phpughh",
      //  query: "#phpughh",
      //  You can't combine username and query,
      //  so I decided to use username instead
      //  of hashtag, hashtag will be limited 
          avatar_size: 50,
          count: 5,
          refresh_interval: 60,
          loading_text: "loading tweets..."
     });
});
