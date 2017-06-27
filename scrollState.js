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

    var mainContent = document.getElementsByClassName("main");
    var menuWrapper = document.getElementsByClassName("nav-wrapper");
    var headerBlock = document.getElementsByClassName("header");
    var articleBlocks = document.getElementsByTagName("article");

    var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);

    var headerHeight = Math.max(headerBlock[0].clientHeight, headerBlock[0].offsetHeight, headerBlock[0].scrollHeight);

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop; //позиция скрола
    var scrollStatus = document.getElementsByClassName("scroll-status");

    for (var i = 0; i < menuWrapper.length; i++) {
        if (mainContent[0].offsetTop <= scrollTop) {
            if (menuWrapper[i].style.display !== "block") {
                menuWrapper[i].style.display = "block";
            }

            //var s = "scrollHeight:" + scrollHeight + "; scrollTop: " + scrollTop + "; clientHeight: " + document.getElementsByClassName("header")[0].clientHeight + "; offsetHeight: " + document.getElementsByClassName("header")[0].offsetHeight + "; scrollHeight: " + document.getElementsByClassName("header")[0].scrollHeight;
            //console.log(s);

            //var b = headerBlock[0].getBoundingClientRect().bottom;
            var scrollPos = 0;

            var foundPos = menuWrapper[i].firstElementChild.className.indexOf("horiz");
            if (foundPos !== -1) {
                scrollPos = (scrollTop - headerHeight) / (scrollHeight - headerHeight) * 100 + 100 / (articleBlocks.length);
                scrollStatus[i].style.width = scrollPos + "%";
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
