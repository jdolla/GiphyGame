var topicList = ["cat", "jackalope", "gnomes", "quote me",
    "unicorn fart", "super dog", "underwhelming", "meh", "etc"];
var apiKey = "X8aS9w43YOIca0ejySj2rZAbRSRFmneo";
var giphyEndpoint = "https://api.giphy.com/v1/gifs/search?";

function addTopicButton(topic) {
    var newButton = $("<button>", { "class": "topic-btn", "data-topic": topic }).text(topic);
    $("#btn-box").append(newButton);
}

function addDefaultTopics() {
    for (var i = 0; i < topicList.length; i++) {
        addTopicButton(topicList[i]);
    }
}

function fetchGifs(topic) {
    var queryString = `q=${topic}&api_key=${apiKey}&limit=10`;
    $.get(giphyEndpoint + encodeURI(queryString)).done(function (response) {

        $("#gif-box").empty();

        for (var i = 0; i < response.data.length; i++) {
            var newGif = $("<div>", { "class": "gif-btn" });
            newGif.append($("<img>", {
                "class": "gif-img",
                "src": response.data[i].images.fixed_height_still.url,
                "data-still": response.data[i].images.fixed_height_still.url,
                "data-animate": response.data[i].images.fixed_height.url
            }))

            $("#gif-box").append(newGif);
        }
    })
}


function addNewTopic(){
    var newTopic = $("#newTopic").val().trim();
    if(topicList.includes(newTopic)){
        alert("Topic already exists. Do a different one!");
    }
    else if(!newTopic){
        alert("Err... That's not a thing.");
    }
    else {
        topicList.push(newTopic);
        addTopicButton(newTopic);
    }

    $("#newTopic").val("");
}

$(document).ready(function () {

    $("#btn-box").on("click", ".topic-btn", function () {
        fetchGifs($(this).attr("data-topic"));
    });

    $("#gif-box").on("click", ".gif-img", function(){
        var still = $(this).attr("data-still");
        var animate = $(this).attr("data-animate");
        var src = $(this).attr("src");

        if(src === still){
            $(this).attr("src", animate);
        }
        else {
            $(this).attr("src", still);
        }
    })



    addDefaultTopics();
});