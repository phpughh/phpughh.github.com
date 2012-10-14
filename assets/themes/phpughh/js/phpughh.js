jQuery(function(){
     jQuery("#twitter-box").tweet({
          username: "phpughh",
          query: "#phpughh",
          avatar_size: 50,
          count: 4,
          refresh_interval: 60,
          loading_text: "loading tweets..."
     });
});