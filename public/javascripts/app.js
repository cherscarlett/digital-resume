$("#sidebar nav li").live("click", function(){
    var selectedTab = $(this).attr("id").replace("_tab", ""),
        link = (selectedTab != 'character_summary') ? "/"+selectedTab : "/"; 
    loadContent("main", selectedTab, link);
});

$(".controls a").live("click", function(){
    var direction = $(this).attr("class");
    moveGames(direction);
});

function moveGames(direction) {
  $("."+direction).css("opacity", "0");
  var games = $(".game-list-container"),
      headings = $(".game-type-container");
  if (direction == 'next') {
    $(games).css("margin-left", "-300px");
    $(headings).css("margin-left", "-300px");
    $(".prev").css("opacity", "1");
  }
  else {
    $(games).css("margin-left", "0");
    $(headings).css("margin-left", "0");
    $(".next").css("opacity", "1");
  }
}

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
