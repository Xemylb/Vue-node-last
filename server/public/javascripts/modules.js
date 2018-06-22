"use strict"
;
(function () {
    function animate (animateElem, distanceX, distanceY, rowElements, rows, animationTime, lastRowElementsLength) {
        var countRowElem = 1, //счетчик элементов ряда
            countRow = 1, //счетчик рядов
            bgPositionX = 0, // позиция background по оси X
            bgPositionY = 0; // позиция background по оси Y
        if (!lastRowElementsLength) {//если не указано количество элементов в последнем ряду
            lastRowElementsLength = rowElements;
        }
        if (!animationTime) {//если не указана скорость анимации
            animationTime = 70;
        }
        var interval = setInterval(function () { //интервал для смены позиции background
            if (countRow != rows) { //если номер ряда не равен количеству рядов
                if (countRowElem < rowElements - 1) { //проверка на то, что бы счетчик был меньше количиства элементов в ряду
                    bgPositionX += distanceX;
                    animateElem.style.backgroundPositionX = bgPositionX + 'px';
                    countRowElem++
                } else { //переходим на новый ряд
                    countRow++;
                    countRowElem = 0;
                    bgPositionX = 0;
                    bgPositionY += distanceY;
                    animateElem.style.backgroundPositionY = bgPositionY + 'px';
                    animateElem.style.backgroundPositionX = bgPositionX + 'px';
                }
            } else { //на последнем ряду делаем меньшее количетсво итераций
                if (countRowElem < lastRowElementsLength - 1) {
                    bgPositionX += distanceX;
                    animateElem.style.backgroundPositionX = bgPositionX + 'px';
                    countRowElem++
                } else { //очищаем интервал, ставим финальную позицию background
                    clearInterval(interval);
                    animateElem.style.backgroundPositionY = bgPositionY + 'px';
                    animateElem.style.backgroundPositionX = bgPositionX + 'px';
                }
            }
        }, animationTime);
    }

   function btnGrad (btn, gradColor, gradWidth) {
        var btnColor = window.getComputedStyle(btn).backgroundColor;

        btn.addEventListener('mousemove', function (e) {
            var x = e.offsetX == undefined ? e.layerX : e.offsetX;
            var y = e.offsetY == undefined ? e.layerY : e.offsetY;
            var xy = x + ' ' + y;
            btn.style.background = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", " + gradWidth + ", from(" + gradColor + "), to(rgba(255,255,255,0.0)))," + btnColor + "";
        }, false);


        btn.addEventListener('mouseout', function (e) {
            btn.style.background = btnColor;
        }, false);
    }

    window._mod = {
        'animate': animate,
        'btnGrad': btnGrad
    }
})();
