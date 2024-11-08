$(document).ready(function () {
    // Setting default selection
    $('.t3 .two').css("border", "3px solid white");

    // Functionality for changing background color
    $('.t3 .pelement').click(function (e) {
        e.preventDefault();  // Add this line to handle the event object
        $('.t3 .pelement').css("border", "3px solid transparent");
        $(this).css("border", "3px solid white");

        const bgColor = $(this).css("background-color");
        $('.t3 .top-section').css("background-color", bgColor);
    });

    // Image download functionality
    $('#dwnldimage2').on('click', function (e) {
        e.preventDefault();  // Add this line to handle the event object
        let template3Image = $('#Template_3 .main')[0];
        html2canvas(template3Image).then(function (canvas) {
            console.log(canvas);
            return Canvas2Image.saveAsPNG(canvas);
        });
    });

    // PDF download functionality
    $('#printCv').on('click', function (e) {
        e.preventDefault();  // Add this line to handle the event object
        let template3PDF = $('#Template_3 .main')[0];
        html2pdf().from(template3PDF).save();
    });
});
