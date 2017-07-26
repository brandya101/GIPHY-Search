$(document).ready(function(){



      var imageArray=[];
      var searchArray=["AC Milan","Cruz Azul", "Luis Figo","Zinedine Zidane","Edgar Davids"];
      var imageAnimateArray=[]
      
      

      function displaySearchInfo() {

        var name = $(this).attr("data-name");
        var key="941a511bba09478395b094dff165831a";
        var URL="https://api.giphy.com/v1/gifs/search?api_key="+ key +"&q="+ name +"&limit=25&offset=0&rating=G&lang=en";



        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: URL,
          method: "GET"
        }).done(function(response) {
        // newObject = JSON.parse(response);
        console.log(response);
        console.log(response.data[0].images.original_still.url);
        console.log(response.data[0].images.original.url);
        console.log(response.data.length)

        for (var i = 0; i<response.data.length; i++){
        var imagepushArray= response.data[i].images.original.url;
        imageAnimateArray.push(imagepushArray);
        console.log(imagepushArray);
        }


        for (var j = 0; j<response.data.length; j++){
        var pushArray= response.data[j].images.original_still.url;
        imageArray.push(pushArray);
        console.log(pushArray);
        }
        

        displayImage();

        
      });

    }

      function displayImage(){
        for(var i = 0; i < imageArray.length ; i++){


        var imgTag= $("<img>");
        imgTag.addClass("giphyImage");

        imgTag.attr("src", imageArray[i]);
        imgTag.attr("data-still", imageArray[i]);
        imgTag.attr("data-animate", imageAnimateArray[i]);
        imgTag.attr("data-state","still");
        

        $(".search").append(imgTag);
        }
      } 


      $(document).on("click", ".giphyImage", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#gifButton").empty();

        // Looping through the array of movies
        for (var i = 0; i < searchArray.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("giphy");
          // Adding a data-attribute
          a.attr("data-name", searchArray[i]);
          // Providing the initial button text
          a.text(searchArray[i]);
          // Adding the button to the buttons-view div
          $("#gifButton").append(a);
        }
      }


      $("#submitSearch").on("click", function(event) {

        event.preventDefault();
        // This line grabs the input from the textbox
        var search = $("#giphySearch").val().trim();

        searchArray.push(search);

        renderButtons();
        displayImage();
  
      });

      $(document).on("click", ".giphy", displaySearchInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
  

})