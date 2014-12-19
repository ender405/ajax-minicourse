


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

    var address = $("#street").val();
    console.log(address);
    var city = $("#city").val();
    console.log(city);
    var geoRequest = address + "," + city;
    console.log(geoRequest);
//    var imageSource = 

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

// loadData();
