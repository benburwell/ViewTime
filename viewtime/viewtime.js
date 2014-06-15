var key = 'AIzaSyBXNlRBQ6ckrnDYVgCIPHCiN3-UJtYfmbY';

var iso8601 = /^PT((\d+)D)?((\d+)H)?((\d+)M)?((\d+)S)?$/;
var r = /\/watch\?(?:.+=.+&)?v=([^&]+)/;

var match = window.location.href.match(r);
if (match && match[1].length == 11) {
    var id = match[1];

    $.getJSON('https://www.googleapis.com/youtube/v3/videos?id='
    + id + '&part=contentDetails,statistics&key=' + key, function(data) {

        // handle error
        if (data.error) {
            return;
        }

        var duration = data.items[0].contentDetails.duration;
        var matches = duration.match(iso8601);
        console.log(matches);
        var d = {
            days: parseFloat(matches[2], 10),
            hours: parseFloat(matches[4], 10),
            minutes: parseFloat(matches[6], 10),
            seconds: parseFloat(matches[8], 10)
        };

        duration = moment.duration(d);
        var views = data.items[0].statistics.viewCount;
        var new_secs = duration.asSeconds() * views;
        var m = moment.duration(new_secs, 'seconds');

        $('span.watch-view-count').after('<div>Watched for about ' + m.humanize() + '</div>');
    });
}
