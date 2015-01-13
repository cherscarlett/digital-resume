$("#sidebar nav li").live("click", function(){
    var selectedTab = $(this).attr("id").replace("_tab", ""),
        link = (selectedTab != 'character_summary') ? "/"+selectedTab : "/"; 
    loadContent("main", selectedTab, link);
});
$(".portfolio_content h3").live("click", function(){
    var selectedTab = $(this).parent("div").attr("class"),
        link = (selectedTab != 'portfolio') ? "/reputation/"+selectedTab : "/reputation"; 
    loadContent("portfolio", selectedTab, link);
});
$(".controls a").live("click", function(){
    var direction = $(this).attr("class");
    var parent = $(this).parent("div").parent("div").attr("class").split(" ")[0];
    scrollContent(direction, parent);
    console.log(parent);
});

function scrollContent(direction, type) {
  $("."+type+" ."+direction).css("opacity", "0");
  if (type == "list-of-games-container") {
    var container = $(".game-list-container"),
        headings = $(".game-type-container"),
        value = "-300px";
  }
  else if (type == "work-listed"){
    var container = $(".work-listed ul"),
        headings = null,
        value = "-675px";
  }
  if (direction == 'next') {
    $(container).css("margin-left", value);
    $(headings).css("margin-left", value);
    $("."+type+" .prev").css("opacity", "1");
  }
  else {
    $(container).css("margin-left", "0");
    $(headings).css("margin-left", "0");
    $("."+type+" .next").css("opacity", "1");
  }
}

function loadContent(type, selectedTab, link) {
  if (type == "main") {
    $("#sidebar .current").removeClass("current");
    $("#"+selectedTab+"_tab").addClass("current"); 
    $("#main .active").removeClass("active");
    $("#"+selectedTab).addClass("active");
  }
  else if (type == "portfolio") {
    $(".portfolio_content .current-tab").removeClass("current-tab");
    $("."+selectedTab+" h3 a").addClass("current-tab");
    $(".portfolio_content .active-panel").removeClass("active-panel");
    $(".portfolio_content ."+selectedTab).find("div:first").addClass("active-panel");
  }
  history.pushState(null, null, link);
}


$(document).ready(function() {
    history.replaceState(null, null, window.location.href);
    sh_highlightDocument('', '.min.js');
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
