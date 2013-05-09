$("#sidebar nav li").live("click", function(){
    var selectedTab = $(this).attr("id").replace("_tab", "");
    var link = (selectedTab != 'character_summary') ? "/"+selectedTab : "/"; 
    loadContent("main", selectedTab, link);
});

function loadContent(type, selectedTab, link) {
   $("#sidebar .current").removeClass("current");
   $("#"+selectedTab+"_tab").addClass("current"); 
   $("#main .active").removeClass("active");
   $("#"+selectedTab).addClass("active");
    history.pushState(null, null, link);
}


$(document).ready(function() {
    history.replaceState(null, null, window.location.href);
});

window.addEventListener('popstate', function(e) {
    var loc = window.location.href.toString();
    p = loc.split("/")[3];
    if (p) {
        loadContent("main", p, null);
    }
    else {
        loadContent("main", "character_summary", null);
    }
});
