jQuery(function () {
    var mup_widget = { with_jquery:function (block) {
        block(jQuery, document.getElementById("1347569642806"))
    } };
    var $parameters = {"urlname":"phpughh", "width":"225", "height":"570", "_name":"Meetup Group Stats", "_description":"Shows basic stats on your favorite Meetup group."};
    var $queries = { groups:function () {
        return "http://api.meetup.com/groups?_=1347569642324&radius=25.0&order=ctime&group_urlname=phpughh&offset=0&callback=?&format=json&page=200&fields=&sig_id=38055742&sig=286325c6a840afa23ebc280fdd11f0178dbcb184&user_agent=meetup.widget:mug_stats";
    }, events:function () {
        return "http://api.meetup.com/events?_=1347569642327&radius=25.0&order=time&group_urlname=phpughh&offset=0&callback=?&format=json&page=1&fields=&sig_id=38055742&sig=ebc4779fdd6fbcafc0fe15798d00775b03ad8210&user_agent=meetup.widget:mug_stats";
    } };

    mup_widget.with_jquery(function ($, ctx) {
        var group = '', months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], addLink = function (content, link) {
            return'<a target="_top" href="' + link + '">' + content + '</a>';
        }, addImage = function (imagesrc, alt) {
            if (imagesrc == "") {
                return'';
            } else {
                return'<div class="mup-img-wrap"><img src="' + imagesrc + '" width="' + ($parameters.width - 50) + '" alt="' + alt + '" class="mup-img"/></div>';
            }
        }, addStarRating = function (rating) {
            var base_url = 'http://img1.meetupstatic.com/9260736631256287675/img/star_';
            var starlink = '';
            if (rating == 0) {
                return'Not Yet Rated';
            } else if (rating < 1.25) {
                starlink = "100.png";
            } else if (rating < 1.75) {
                starlink = "150.png";
            } else if (rating < 2.25) {
                starlink = "200.png";
            } else if (rating < 2.75) {
                starlink = "250.png";
            } else if (rating < 3.25) {
                starlink = "300.png";
            } else if (rating < 3.75) {
                starlink = "350.png";
            } else if (rating < 4.25) {
                starlink = "400.png";
            } else if (rating < 4.75) {
                starlink = "450.png";
            } else {
                starlink = "500.png";
            }
            return'<img src="' + base_url + starlink + '" alt="' + rating + '" />';
        }, addLeadingZero = function (num) {
            return(num < 10) ? ('0' + num) : num;
        }, getFormattedDate = function (millis) {
            var date = new Date(millis);
            return months[date.getMonth()] + ' ' + addLeadingZero(date.getDate()) + ', ' + date.getFullYear().toString();
        }, getFormattedTime = function (millis) {
            var time = new Date(millis), hours = time.getHours(), min = time.getMinutes(), ampm = (hours > 11) ? 'PM' : 'AM';
            min = (min < 10) ? ('0' + min) : min;
            hours = (hours == 0) ? 1 : hours;
            hours = (hours > 12) ? hours - 12 : hours;
            return hours + ':' + min + ' ' + ampm;
        }, numberFormat = function (nStr) {
            nStr += '';
            x = nStr.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1))x1 = x1.replace(rgx, '$1' + ',' + '$2');
            return x1 + x2;
        };
        $.getJSON($queries.groups(), function (data) {
            if (data.results.length == 0) {
                $('.mug-badge', ctx).width($parameters.width);
                $('.mug-badge', ctx).append('<div class="mup-widget error">\
       <div class="errorMsg">Oops. No results for "' + $parameters.urlname + '"</div>\
     </div>');
            } else {
                group = data.results[0];
                $('.mug-badge', ctx).width($parameters.width);
                $('.mug-badge', ctx).append('<div class="mup-widget">\
     <div class="mup-bd">\
      <h3>' + addLink(group.name, group.link) + '</h3>\
                        <h4> <div style="padding-top:5px;"><span class="mup-tlabel">EST. ' + getFormattedDate(group.created) + '</span></div></h4>\
      <span class="mup-stats">' + addImage(group.photo_url, group.name) + numberFormat(group.members) + '<span class="mup-tlabel"> ' + group.who + '</span></span>\
                        <span class="mup-stats"><div class="next-event"></div></span>\
                        <h4><span class="mup-button">' + addLink('JOIN', group.link) + '</span></h4>\
     </div>\
     <div class="mup-ft">\
      <div class="mup-logo"><div style="float:left;">' + addLink('<img src="http://img1.meetupstatic.com/84869143793177372874/img/birddog/everywhere_widget.png">', 'http://www.meetup.com') + '</div><div style="float:right;"><div style="float:right;">' + addStarRating(group.rating) + '</div><br><div style="float:right;"><span class="mup-tlabel">Group Rating</span></div></div></div>\
      <div class="mup-getwdgt">' + addLink('ADD THIS TO YOUR SITE', 'http://www.meetup.com/meetup_api/foundry/#' + $parameters._name.toLowerCase().replace(/ /g, "-")) + '</div>\
     </div>\
    </div>');
                $.getJSON($queries.events(), function (data) {
                    if (data.status && data.status.match(/^200/) == null) {
                        alert(data.status + ": " + data.details);
                    } else {
                        if (data.results.length == 0) {
                            $('.next-event', ctx).append('<span class="mup-tlabel">' + addLink('Suggest new ideas for Meetups!', group.link) + '</span>');
                        } else {
                            var event = data.results[0];
                            var city;
                            if (event.venue_city == "") {
                                city = group.city;
                            } else {
                                city = event.venue_city;
                            }
                            var state_country;
                            if (event.venue_state == "") {
                                if (group.state == "") {
                                    state_country = group.country.toUpperCase();
                                } else {
                                    state_country = group.state;
                                }
                            } else {
                                state_country = event.venue_state;
                            }
                            var venue;
                            if (event.venue_name == "") {
                                if (event.venue_address1 == "") {
                                    venue = "";
                                } else {
                                    venue = event.venue_address1 + " - ";
                                }
                            } else {
                                venue = event.venue_name + " - ";
                            }
                            var location = venue + city + ", " + state_country;
                            $('.next-event', ctx).append('<h4><div class="mup-tlabel">' + getFormattedDate(parseInt(event.utc_time)) + '   |   ' + getFormattedTime(parseInt(event.utc_time)) + "</div>" + addLink(event.name, event.event_url) + '<div class="mup-tlabel">' + location + "</div></h4>");
                        }
                    }
                });
            }
        });
    });

});