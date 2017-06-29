window.onload = function () {
    switchDisplay()
};

window.onresize = function () {
    switchDisplay();
}

window.onscroll = function () {
    switchDisplay();
}

window.onchange = function () {
    switchDisplay();
}

function switchDisplay() {

    function div(val, by) {
        return (val - val % by) / by;
    }


    var mainContent = document.getElementsByClassName("main");
    var menuWrapper = document.getElementsByClassName("nav-wrapper");
    var headerBlock = document.getElementsByClassName("header");
    var articleBlocks = document.getElementsByTagName("article");

    var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);

    var articleFixedHeight = Math.max(articleBlocks[0].clientHeight, articleBlocks[0].offsetHeight, articleBlocks[0].scrollHeight);

    var headerHeight = Math.max(headerBlock[0].clientHeight, headerBlock[0].offsetHeight, headerBlock[0].scrollHeight);

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop; //позиция скрола
    var scrollStatus = document.getElementsByClassName("scroll-status");

    for (var i = 0; i < menuWrapper.length; i++) {
        if (mainContent[0].offsetTop <= scrollTop) {
            if (menuWrapper[i].style.display !== "block") {
                menuWrapper[i].style.display = "block";
            }

            var scrollPos = 0;

            var foundPos = menuWrapper[i].firstElementChild.className.indexOf("horiz");
            if (foundPos !== -1) {

                var scrollBGElem = document.getElementsByClassName("scroll-bg")[0];

                var scrollMax = Math.max(scrollBGElem.clientWidth, scrollBGElem.offsetWidth, scrollBGElem.scrollWidth);

                var articleNumber = div(scrollTop - headerHeight, articleFixedHeight);

                var navMarker = document.getElementsByClassName("nav-marker")

                for (var j = 0; j < articleNumber; j++) {
                    if (!navMarker[j].classList.contains("nav-visited")) {
                        if (navMarker[j].classList.contains("nav-visited-last")) {
                            navMarker[j].classList.remove("nav-visited-last")
                        }
                        navMarker[j].classList.add("nav-visited")
                    }
                }

                if (!navMarker[articleNumber].classList.contains("nav-visited-last")) {
                    if (navMarker[articleNumber].classList.contains("nav-visited")) {
                        navMarker[articleNumber].classList.remove("nav-visited")
                    }
                    navMarker[articleNumber].classList.add("nav-visited-last")
                }

                for (var j = articleNumber + 1; j < articleBlocks.length; j++) {
                    if (navMarker[j].classList.contains("nav-visited")) {
                        navMarker[j].classList.remove("nav-visited")
                    }
                    if (navMarker[j].classList.contains("nav-visited-last")) {
                        navMarker[j].classList.remove("nav-visited-last")
                    }
                }

                scrollPos = scrollMax * (scrollTop - headerHeight) / (scrollHeight - headerHeight - articleFixedHeight);
                scrollStatus[i].style.width = scrollPos + "px";
            }

            foundPos = menuWrapper[i].firstElementChild.className.indexOf("vertic");
            if (foundPos !== -1) {

                var articleNumber = 0;

                for (var j = 0; j < articleBlocks.length; j++) {
                    articleNumber = j;
                    if (articleBlocks[j].getBoundingClientRect().top > window.innerHeight) {
                        articleNumber = j - 1;
                        break;
                    }
                }

                var localPercent = 1;

                if (articleBlocks[articleNumber].getBoundingClientRect().bottom > window.innerHeight) {
                    var articleHeight = Math.max(articleBlocks[articleNumber].clientHeight, articleBlocks[articleNumber].offsetHeight, articleBlocks[articleNumber].scrollHeight);

                    localPercent = (window.innerHeight - articleBlocks[articleNumber].getBoundingClientRect().top) / articleHeight;


                }

                scrollPos = (localPercent + articleNumber) * 100 / (articleBlocks.length);

                scrollStatus[i].style.height = scrollPos + "%";
            }

        } else {
            if (menuWrapper[i].style.display !== "none") {
                menuWrapper[i].style.display = "none";
            }
        }
    }
};
