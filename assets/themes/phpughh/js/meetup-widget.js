Meetup = {
    apiCallUrl : 'http://api.meetup.com/2/events?status=upcoming&_=1352414462804&order=time&group_urlname=phpughh&desc=false&offset=0&format=json&page=200&fields=&sig_id=38055742&sig=6191815fe668fea15b3c5b86889fd093e7cc46ec',

    DEFAULT_PROVIDER : 'Ort wird noch festgelegt',

    DEFAULT_ADDRESS : 'x',

    BASE_URL : 'http://www.meetup.com/phpughh',

    getFormattedDate : function(date) {
        return date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear();
    },

    getRFC3339DateTime : function(date) {
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + 'T' + date.getHours() + ':' + date.getMinutes() + 'Z';
    },

    hideLoadingInfo : function() {
        jQuery("[data-meetup-ajax='state']").hide();
    },

    showNoUpcomingEvent : function() {
        Meetup.applyEventUrl(Meetup.BASE_URL);
        jQuery("[data-meetup='no-upcoming-event']").show();
    },

    applyDate : function(timestamp) {
        var date = new Date(timestamp);

        var timeElement = jQuery("<time></time>");
        timeElement.attr('datetime', Meetup.getRFC3339DateTime(date));
        timeElement.text(Meetup.getFormattedDate(date));

        jQuery("[data-meetup='date']").append(timeElement).show();
    },

    applyProvider : function(provider) {
        if (provider.length > 0 && provider !== Meetup.DEFAULT_PROVIDER) {
            var element = jQuery("[data-meetup='provider']");
            element.text(element.text() + provider).show();
        }
    },

    applyLocation : function(address, city) {
        if (address.length > 0 && address !== Meetup.DEFAULT_ADDRESS) {
            var element = jQuery("[data-meetup='location']");
            element.text(element.text() + address + ', ' + city).show();
        } else {
            jQuery("[data-meetup='no-location']").show();
        }

    },

    applyEventUrl : function(url) {
        var aTag = jQuery('<a></a>');
        aTag.attr('href', url);
        aTag.attr('target', '_blank');
        jQuery('div.next').wrapInner(aTag);
    },

    handleEventItem : function(result) {
        var providerName = '';
        var address = '';
        var city = '';

        if (typeof result.venue !== "undefined") {
            address = result.venue.address_1;
            city = result.venue.city;
            url = result.event_url;
            if (typeof result.venue.name  !== "undefined") {
                providerName = result.venue.name
            }
        }

        Meetup.applyDate(result.time);
        Meetup.applyProvider(providerName);
        Meetup.applyLocation(address, city);
        Meetup.applyEventUrl(url);
    },

    handleMeetupResult : function(data) {

        if (typeof data.results === "undefined") {
            Meetup.handleError("Request error, no results received", data);
            return;
        }

        if (data.results.length == 0 || typeof data.results[0].time === "undefined") {
            Meetup.showNoUpcomingEvent();
        } else {
            Meetup.handleEventItem(data.results[0]);
        }
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

jQuery(function(){
    Meetup.call();
});

