var defaultTopics = ["cat", "jackalope", "gnomes", "quote me"];

function addTopicButton(topic){
    var newButton = $("<button>", {"class":"topic-btn", "data-topic":topic}).text(topic);
    $("#btn-box").append(newButton);
}

function addDefaultTopics(){
    for(var i = 0; i < defaultTopics.length; i++){
        addTopicButton(defaultTopics[i]);
    }
}

addDefaultTopics();