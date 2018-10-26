var giphyNames = ["Messi", "Ronaldo", "Mr. Nobody", "The Lion King"];

function displayButton() {
    $("#buttons-view").empty();
    for (var i = 0; i < giphyNames.length; i++) {
    var a = $("<button>");
    a.addClass("btn btn-primary giphy");
    a.attr("data-name", giphyNames[i]);
    a.text(giphyNames[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-giphy").on("click", function(event) {
  event.preventDefault();
  var giphy = $("#giphy-input").val();
  giphyNames.push(giphy);
  displayButton();
});
displayButton();

function displayGiphy() {
  //console.log("h1")
  var apiKey = "4P6oQNQRGxmm4QoNauZjOM2RJJxejQWT"
  var giphy = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +giphy + "&api_key="+ apiKey + "&limit=10"
  
  $.ajax({
    url : queryURL,
    method : "GET"
  }).then(function(response){
    console.log(response)
    var giphyDiv = $("<div>");
    
    var result = response.data;
    for (var i = 0; i < result.length; i++){
      var image = $("<img>");
    image.attr("src", result[i].images.fixed_height_still.url);
    image.attr("data-still", result[i].images.fixed_height_still.url);
    image.attr("data-animate", result[i].images.fixed_height.url);
    image.attr("data-state", "still");
    image.addClass("image");
    giphyDiv.append(image);
    $('#resultsDiv').prepend(giphyDiv);
    }
  })

};

$(document).on("click", ".giphy", displayGiphy);


//need to understand this portion better
$(document).on("click",".image", function(){
  var state = $(this).attr('data-state')
  if (state == 'still'){
    $(this).attr('src', $(this).data('animate'));// this part??
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

})