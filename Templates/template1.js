function addStr(str, index, stringToAdd) {
    return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
}

function appender(color, alpha) {
    return color.substring(0, color.length - 1) + alpha + color.substring(color.length - 1);
}

window.onload = function () {
    document.getElementsByClassName('t1')[0].getElementsByClassName("one")[0].click();
};

$(document).ready(function () {
    $('.t1 .one').css("border", "3px solid white");
    $('.t1 .pelement').click(function () {
        $('.t1 .pelement').css("border", "3px solid transparent");
        $(this).css("border", "3px solid white");
        $('.t1 .left_side').css("background-color", $(this).css("background-color"));

        const bgColor = $(this).css("background-color");
        $('.t1 .right_side .about .text h4').css("color", appender(addStr(bgColor, 3, "a"), ", 0.82"));
        $('.t1 .right_side .percent div').css("background-color", appender(addStr(bgColor, 3, "a"), ", 0.65"));

        // Image download functionality
        $('#dwnldimage').off('click').on('click', function () {
            let template1Image = $('#Template_1').find('#target')[0];
            html2canvas(template1Image).then(function (canvas) {
                console.log(canvas);
                return Canvas2Image.saveAsPNG(canvas);
            });
        });
    });
});
