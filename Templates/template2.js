$(document).ready(function () {
    $('.t2 .two').css("border", "3px solid white");

    $('.t2 .pelement').click(function () {
        $('.t2 .pelement').css("border", "3px solid transparent");
        $(this).css("border", "3px solid white");

        const bgColor = $(this).css("background-color");
        $('.t2 .upper').css("background-color", bgColor);
    });

    // Image download functionality
    $('#dwnldimage1').on('click', function () {
        let template2Image = $('#Template_2 .containerr')[0];
        html2canvas(template2Image).then(function (canvas) {
            console.log(canvas);
            return Canvas2Image.saveAsPNG(canvas);
        });
    });
});
