
// nyt key: 5a873fa1f7b482afecdc0bbdba12f7b2:3:31408746


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
        for (story in data.docs) {
            var NYTlink = data.docs[story].web_url;
            var NYTtitle = data.docs[story].headline.main;
            var NYTblurb = data.docs[story].lead_paragraph;

            //$nytElem.append


        }

    });



    return false;
};

$('#form-container').submit(loadData);

// loadData();
