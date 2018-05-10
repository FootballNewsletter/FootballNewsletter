function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    })
}


function loadNews(clubArr) {
        $.getJSON('https://raw.githubusercontent.com/FootballNewsletter/JSONData/master/socialmedianews.json', function(json) {
        for (var i in json)
        {

            $("#posts").append("<div class=\"thumbnail principal-post\">\n" +
                "                        <img src=\"" + json[i].pictureURL  + "\">\n" +
                "                        <div class=\"caption\">\n" +
                "                            <h2>"+json[i].team+"</h2>\n" +
                "                            <span class=\"date-of-post\">"+json[i].date+"</span>\n" +
                "                            <p>"+urlify(json[i].content)+"" +
                "                            <p>Źródło : "+json[i].source+"" +
                "</div>\n" +
                "                    </div>");
        }
    });

}

function getMappedClubs(clubArr) {
    for (i in clubArr) {
        if(clubArr[i] == 'real_madryt')
        console.log(clubArr[i]);
        console.log(localStorage.getItem(clubArr[i]))
    }
}