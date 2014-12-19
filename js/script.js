
// nyt key: 


function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var address = $("#street").val().replace(/ /g,"+");
//    console.log(address);
    var city = $("#city").val().replace(/ /g,"+").replace(/,/g,"");
    var wikiCity = $("#city").val().replace(/ /g,"%20").replace(/,/g,"%20");
//    console.log(city);
    var geoRequest = address + "," + city;
//    console.log(geoRequest);
    var svRequestFragment = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=";
    
    $greeting.text("So, you want to live at " + $("#street").val() + " in " + $("#city").val());
    
    $body.append('<img class="bgimg" src=' + svRequestFragment + geoRequest + '>');

    var nytKey = "&api-key=5a873fa1f7b482afecdc0bbdba12f7b2:3:31408746";
    var nytAPIFragment = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="

    var nytURL = nytAPIFragment + city + nytKey;

    $.getJSON(nytURL, function (data) {

        console.log(data);
        $nytHeaderElem.text("NY Times Articles about " + $("#city").val() + ":");
        $nytElem.text("");
//        console.log(data.response.docs[0].web_url);
        for (story in data.response.docs) {
            var NYTlink = data.response.docs[story].web_url;
//            console.log(NYTlink);
            var NYTtitle = data.response.docs[story].headline.main;
 //           console.log(NYTtitle);
            var NYTblurb = data.response.docs[story].snippet;
 //           console.log(NYTblurb);
            $nytElem.append("<li><a href=" + NYTlink + ">" + NYTtitle + "</a>" + "<p>" + NYTblurb + "</p></li>");

        };

    }).error( function() {

        $nytHeaderElem.text("NY Times Articles about " + $("#city").val() + " could not be displayed");
        $nytElem.text("");
    });

    var wikiAPIFragment = "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch="
    var wikiURL = wikiAPIFragment + wikiCity;
    var dispWikiURL = "http://en.wikipedia.org/wiki/"

    $.ajax({
        url: wikiURL,
        dataType: "jsonp",
        success: function(data){
            var results = data.query.pages;
            $.each(results, function (key, value) {
                $wikiElem.append("<li><a href=" + dispWikiURL + value.title.replace(/ /g,"_") + ">" + value.title + "</a></li>" + "");
            });
        }
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
