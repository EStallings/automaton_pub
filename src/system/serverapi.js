loadcontent = function() {
   var url = "http://serene-peak-9931.herokuapp.com/api/levels/user/khabbabs";

    $.getJSON(url,function(data) {
        alert(data);
    });

}
