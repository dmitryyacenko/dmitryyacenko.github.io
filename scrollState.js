window.onload = function () {

    var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);

    console.log(scrollHeight);

    var mainContent = document.getElementsByClassName("main");
    var menuWrapper = document.getElementsByClassName("nav-wrapper");

    switchDisplay(mainContent, menuWrapper);
};

window.onscroll = function () {

    var mainContent = document.getElementsByClassName("main");
    var menuWrapper = document.getElementsByClassName("nav-wrapper");

    switchDisplay(mainContent, menuWrapper);
}

function switchDisplay(mainContent, menuWrapper) {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop; //позиция скрола
    for (var i = 0; i < menuWrapper.length; i++) {
        if (mainContent[0].offsetTop <= scrollTop) {
            if (menuWrapper[i].style.display !== "block") {
                menuWrapper[i].style.display = "block";
            }
            
        } else {
            if (menuWrapper[i].style.display !== "none") {
                menuWrapper[i].style.display = "none";
            }
        }
    }
};
