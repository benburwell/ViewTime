var key = 'AIzaSyBXNlRBQ6ckrnDYVgCIPHCiN3-UJtYfmbY';

var r = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
var match = window.location.href.match(r);
if (match && match[2].length == 11) {
    var id = match[2];

    $.getJSON('https://www.googleapis.com/youtube/v3/videos?id='
    + id + '&part=contentDetails,statistics&key=' + key, function(data) {

        // handle error
        if (data.error) {
            return;
        }

        var duration = data.items[0].contentDetails.duration;
        var mins = duration.substring(2).split('M')[0];
        var secs = duration.substring(2).split('M')[1].slice(0, -1);
        var views = data.items[0].statistics.viewCount;

        var new_mins = mins * views;
        var new_secs = secs * views;

        var m = moment.duration(new_mins, 'minutes');
        m.add(new_secs, 'seconds');

        $('span.watch-view-count').after('<div>Watched for ' + m.humanize() + '</div>');
    });
}
