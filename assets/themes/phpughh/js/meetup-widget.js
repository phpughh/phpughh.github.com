Meetup = {
    apiCallUrl : 'http://api.meetup.com/2/events?status=upcoming&_=1352414462804&order=time&group_urlname=phpughh&desc=false&offset=0&format=json&page=200&fields=&sig_id=38055742&sig=6191815fe668fea15b3c5b86889fd093e7cc46ec',

    getFormattedDate : function(date) {
        return date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear();
    },

    getRFC3339DateTime : function(date) {
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + 'T' + date.getHours() + ':' + date.getMinutes() + 'Z';
    },

    hideLoadingInfo : function() {
        jQuery("[data-meetup-ajax='state']").hide();
    },

    showNoUpcomingMeetup : function() {
        jQuery("[data-meetup='no-upcoming-meetup']").show();
    },

    applyDate : function(timestamp) {
        var date = new Date(timestamp);

        var timeElement = jQuery("<time></time>");
        timeElement.attr('datetime', Meetup.getRFC3339DateTime(date));
        timeElement.text(Meetup.getFormattedDate(date));

        jQuery("[data-meetup='date']").append(timeElement).show();
    },

    applyProvider : function(provider) {
        if (provider.length > 0) {
            var element = jQuery("[data-meetup='provider']");
            element.text(element.text() + provider).show();
        }
    },

    applyLocation : function(address, city) {
        if (address.length > 0) {
            var element = jQuery("[data-meetup='location']");
            element.text(element.text() + address + ', ' + city).show();
        } else {
            jQuery("[data-meetup='no-location']").show();
        }

    },

    handleMeetupResult : function(data) {
        if (typeof data.results === "undefined") {
            Meetup.handleError("Request error, no results received", data);
            return;
        }

        if (data.results.length == 0 || typeof data.results[0].time === "undefined") {
            Meetup.showNoUpcomingMeetup();
            return;
        }

        Meetup.applyDate(data.results[0].time);

        var providerName = '';
        var address = '';
        var city = '';

        if (typeof data.results[0].venue !== "undefined") {
            address = data.results[0].venue.address_1;
            city  = data.results[0].venue.city;
            if (typeof data.results[0].venue.name  !== "undefined") {
                providerName = data.results[0].venue.name
            }
        }

        Meetup.applyProvider(providerName);

        Meetup.applyLocation(address, city);
    },

    handleError : function(msg, data) {
        jQuery("[data-meetup-ajax='error']").show();
        if (typeof console !== "undefined") {
            console.error(msg, data);
        }
    },

    call : function() {
        jQuery.ajax({
            url: this.apiCallUrl,
            dataType: 'jsonp',
            crossDomain: true,
            data: {},
            complete: Meetup.hideLoadingInfo,
            success: Meetup.handleMeetupResult
        });
    }
};

jQuery(document).ready(function(){
    Meetup.call();
});

