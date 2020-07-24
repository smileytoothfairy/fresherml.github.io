function gotitcookiebar() {
    var x =document.getElementById("cookiebar");
    x.style.display = "none";
var x = document.getElementsByTagName("BODY")[0];
    x.style.paddingTop = "0px";
    

}


    
function checkCookie() {
    var user=getCookie("cookiebardisplayed");
    if (user == "") {
      setCookie("cookiebardisplayed","0",365);}

    user=getCookie("cookiebardisplayed");
    if (user =="0")
    {

        var x =document.getElementById("cookiebar");
    x.style.display = "block";
    var h = document.getElementById('cookiebar').clientHeight;
    
    var x = document.getElementsByTagName("BODY")[0];
    x.style.paddingTop = h+"px";
    setCookie("cookiebardisplayed","1",365);
    } 
    
}
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
document.addEventListener('DOMContentLoaded', function() {
    checkCookie();
}, false);

function topFunction() {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
      }

       {{ if .Site.Params.lazyload }}
    
    
    function isVisible(elem) {

      let coords = elem.getBoundingClientRect();

      let windowHeight = document.documentElement.clientHeight;

      // top elem edge is visible OR bottom elem edge is visible
      let topVisible = coords.top > 0 && coords.top < windowHeight;
      let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

      return topVisible || bottomVisible;
    }

    

    function showVisible() {
      for (let img of document.querySelectorAll('img')) {
        let realSrc = img.dataset.src;
        if (!realSrc) continue;

        if (isVisible(img)) {
          

          img.src = realSrc;

          img.dataset.src = '';
        }
      }
      if ( Array.from(document.querySelectorAll('[data-src]')).every(
        img => img.getAttribute('data-src') === '') ) {
        window.removeEventListener('scroll', showVisible)
      }

    }

    window.addEventListener('scroll', showVisible);
    showVisible();
 
{{ end }}

    <!-- scroll indicator -->
    {{ if .Site.Params.scrollindicator }}
      <div class="progress-container" id="scrollbar">
        <div class="progress-bar" id="progress-bar"></div>
      </div>  


    {{ end }}

// When the user scrolls down 50px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  <!-- TOC -->
    {{ if not .IsHome }}
    {{ if and (ge (len .TableOfContents) 100) (ne .Params.toc "false")  }}
    
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("toc").style.display = "block";
    } else {
        document.getElementById("toc").style.display = "none";
    }
    {{ end }}
    {{ end }}
    <!-- cookie bar -->
    {{ if .Site.Params.cookie_info }}
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        var x =document.getElementById("cookiebar");
        x.style.display = "none";
        var x = document.getElementsByTagName("BODY")[0];
        x.style.paddingTop = "0px";

    } 
    {{ end }}
<!-- Back to top -->
    {{ if .Site.Params.backtotop }}
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("backtotop").style.display = "block";
    } else {
        document.getElementById("backtotop").style.display = "none";
    }
    {{ end }}
    <!-- scroll indicator -->
    {{ if .Site.Params.scrollindicator }}
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      document.getElementById("progress-bar").style.width = scrolled + "%";
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("scrollbar").style.display = "block";
        } else {
            document.getElementById("scrollbar").style.display = "none";
        }
    

    {{ end }}

    <!-- allowads -->
    {{ if and (.Site.Params.allowads) (.IsPage) }}
       if (document.body.scrollTop > 2000 || document.documentElement.scrollTop > 2000) {
          detectads();
       } 

    {{ end }}
}

