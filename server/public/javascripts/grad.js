window.onload = function () {
    var  btn = document.getElementById('btn-blue');
    btn.addEventListener('mousemove', function(e) {
        gradientBtn(e);
    }, false);

    // btn.addEventListener('click', function(e) {
    //         var x = e.pageX - btn.offsetLeft;
    //         var y = e.pageY - btn.offsetTop;
    //         console.log (e.pageX + '////////////' + e.pageY);
    //         console.log (x + '////////////' + y);
    //
    // }, false);

    function gradientBtn(e) {
        var gradColor = "#4354f6",
            gradWidth = 264;
        var x = e.pageX- btn.offsetLeft;
        var y = e.pageY- btn.offsetTop;
        var xy = x  + ' ' + y;
        btn.style.background = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", " + gradWidth + ", from(" + gradColor + "), to(rgba(255,255,255,0.0))), #0627b9";
    }

    btn.addEventListener('mouseout', function() {
       btn.style.background = '#0627b9';
    }, false);
};
