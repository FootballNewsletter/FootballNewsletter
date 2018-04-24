function loadNews() {
    console.log("elo");
    $.getJSON('../json/newsFacebook.json', function(json) {
        console.log(json);
        for (var i in json)
        {
            $("#posts").append("<div class=\"thumbnail principal-post\">\n" +
                "                        <img src=\"" + json[i].pictureURL  + "\">\n" +
                "                        <div class=\"caption\">\n" +
                "                            <h2>"+json[i].team+"</h2>\n" +
                "                            <span class=\"date-of-post\">"+json[i].date+"</span>\n" +
                "                            <p>"+json[i].content+"</div>\n" +
                "                    </div>");
        }
    });

}