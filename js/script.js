function init () {
  gapi.client.setApiKey("AIzaSyC_tFwYF1d9DHVbxdVsBtNu0JpU19sH-no");
  gapi.client.load("youtube", "v3", function(){});
}
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send( null );
    }
}

function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
function main () {
    document.querySelector("form").addEventListener("submit", function(e){
       e.preventDefault();

       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent(document.querySelector("#search").value).replace(/%20/g, "+"),
            maxResults: 10,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       });
       request.execute(function(response) {
          var results = response.result;
          document.querySelector('#results').innerHTML;
          results.items.forEach(function(item, index){
            var client = new HttpClient();
            client.get('item/item.html', function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
       });
document.querySelector(".youtube__button").setAttribute("disabled", true);
    });
};
