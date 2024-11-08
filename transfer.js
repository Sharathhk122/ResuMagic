function template_selector() {
    if ($('#template_1').prop('checked') == true) {
        generateCV('Template_1');
    } else if ($('#template_2').prop('checked') == true) {
        generateCV('Template_2');
    } else if ($('#template_3').prop('checked') == true) {
        generateCV('Template_3');
    } else {
        alert("Please select a template.");
    }
}

function visibler() {
    $('.dwnldimage').css('display', 'inline-block');
    $('.printCv').css('display', 'inline-block');
    $('.back-to-form').css('display', 'flex');
    $('.palette').css('display', 'block');
}

function printer() {
    $('.dwnldimage').css('display', 'none');
    $('.printCv').css('display', 'none');
    $('.back-to-form').css('display', 'none');
    $('.palette').css('display', 'none');
    window.print();
    setTimeout(visibler, 500);
}

// Attach printer event listener to printCv buttons
document.querySelectorAll('.printCv').forEach(button => {
    button.addEventListener('click', printer);
});

function generateCV(template) {
    document.getElementById('form3').classList.remove('active');
    if (template === 'Template_3') { 
        document.getElementById(template).style.display = 'block'; 
    } else { 
        document.getElementById(template).style.display = 'flex'; 
    }

    document.getElementById('nav').style.display = 'none';

    // Image download/PDF
    document.querySelector('#dwnldimage').addEventListener('click', function () {
        let template2Image = $(`#${template}`).find('#target')[0];
        html2canvas(template2Image, {
            scale: 2, // Increase the scale for better resolution
            useCORS: true, // Use CORS to handle cross-origin images
            allowTaint: true,
            logging: true,
            scrollY: -window.scrollY, // Ensure full scroll capture
            scrollX: -window.scrollX
        }).then(function (canvas) {
            Canvas2Image.saveAsPNG(canvas);
        });
    });

    // Profile Image
    let file = document.getElementById('inpImg').files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        document.getElementById(template).getElementsByClassName('profilepic')[0].src = reader.result;
    };

    // First Form
    let dob = new Date($('#dob').val());
    $(`#${template} #t_name`).html($('#fname').val() + " " + $('#lname').val());
    $(`#${template} #t_gender`).html($('#gender').val());
    $(`#${template} #t_dob`).html(String(dob.getDate()).padStart(2, '0') + "/" + String(dob.getMonth() + 1).padStart(2, '0') + "/" + dob.getFullYear());
    $(`#${template} #t_email`).html($('#email').val());
    $(`#${template} #t_number`).html($('#number').val());
    $(`#${template} #t_address`).html($('#address').val() + "<br>" + $('#zip').val() + "<br>" + ($('#city').val() == null ? "" : $('#city').val() + ", ") + $('#state').val() + ", " + $('#country').val());

    if ($('#website').val().trim() === "") {
        $(`#${template} #t_website`).parent().css('display', 'none');
    } else {
        $(`#${template} #t_website`).html($('#website').val());
    }

    if ($('#linkedIn').val().trim() === "") {
        $(`#${template} #t_linkedIn`).parent().css('display', 'none');
    } else {
        $(`#${template} #t_linkedIn`).html($('#linkedIn').val());
    }

    // Second Form
    // Education
    let edu_items = $('#accordionEdu .accordion-item').length;
    for (let i = 0; i < edu_items; i++) {
        let degree = $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .degree`).val().trim();
        let srt_date = new Date($(`#accordionEdu .accordion-item:nth-child(${i + 1}) .edu_start`).val()).getFullYear();
        let end_date = $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .end_date_toggle`).prop('checked') ? 'Present' : new Date($(`#accordionEdu .accordion-item:nth-child(${i + 1}) .end_date`).val()).getFullYear();
        let school = $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .school`).val().trim();

        if (degree && school && srt_date && end_date) {
            if (template === "Template_1") {
                $('.t1 .left_side .education ul').append(`<li><h5>${srt_date} - ${end_date}</h5><h4>${degree}</h4><h4>${school}</h4></li>`);
            } else if (template === 'Template_2') {
                $('.t2 .lower_right .education .content').append(`<div class="con"><h4 class="time">${srt_date} - ${end_date}</h4><h4 class="degree">${degree}</h4><h4 class="uni">${school}</h4></div>`);
            } else if (template === 'Template_3') {
                $('.t3 .education').append(`<p class="degree">${degree} (${srt_date}-${end_date})</p><p class="par-4">${school}</p>`);
            }
        }
    }

    // Work Experience
    let work_items = $('#accordionWork .accordion-item').length;
    for (let i = 0; i < work_items; i++) {
        let job_title = $(`#accordionWork .accordion-item:nth-child(${i + 1}) .job_title`).val().trim();
        let company_name = $(`#accordionWork .accordion-item:nth-child(${i + 1}) .company_name`).val().trim();
        let srt_date = new Date($(`#accordionWork .accordion-item:nth-child(${i + 1}) .work_start`).val()).getFullYear();
        let end_date = $(`#accordionWork .accordion-item:nth-child(${i + 1}) .end_date_toggle`).prop('checked') ? 'Present' : new Date($(`#accordionWork .accordion-item:nth-child(${i + 1}) .end_date`).val()).getFullYear();
        let work_desc = $(`#accordionWork .accordion-item:nth-child(${i + 1}) .work_desc`).val().trim();

        if (job_title && company_name && srt_date && end_date) {
            if (template === "Template_1") {
                $('.t1 .right_side .experience').append(`<div class="box"><div class="year_company"><h5>${srt_date} - ${end_date}</h5><h5>${company_name}</h5></div><div class="text"><h4>${job_title}</h4><p>${work_desc}</p></div></div>`);
            } else if (template === 'Template_2') {
                $('.t2 .lower_right .experience .content').append(`<div class="con"><div class="time"><h4>${srt_date}-${end_date}</h4><h4>${company_name}</h4></div><div class="box"><div class="text">${job_title}</div><div class="exp">${work_desc}</div></div></div>`);
            } else if (template === 'Template_3') {
                $('.t3 .content-box .experience').append(`<p class="job-title">${job_title} at ${company_name} (${srt_date}-${end_date})</p><p class="par-4">${work_desc}</p>`);
            }
        }
    }

    // Skills
    let skill_items = $('#accordionSkill .accordion-item').length;
    for (let i = 0; i < skill_items; i++) {
        let skill = $(`#accordionSkill .accordion-item:nth-child(${i + 1}) .skill`).val().trim();

        if (skill) {
            if (template === "Template_1") {
                $('.t1 .right_side .skills .box').append(`<h4>${skill}</h4>`);
            } else if (template === 'Template_2') {
                $('.t2 .lower .lower_left .skills .content').append(`<div class="skill">${skill}</div>`);
            } else if (template === 'Template_3') {
                $('.t3 .skills').append(`<li><span>${skill}</span></li>`);
            }
        }
    }

    // Interests
    let interest_items = $('#accordionInt .accordion-item').length;
    for (let i = 0; i < interest_items; i++) {
        let interest = $(`#accordionInt .accordion-item:nth-child(${i + 1}) .hobby`).val().trim();

        if (interest) {
            if (template === "Template_1") {
                $('.t1 .right_side .interest ul').append(`<li>${interest}</li>`);
            } else if (template === 'Template_2') {
                $('.t2 .lower .lower_left .interests .content').append(`<div class="con">${interest}</div>`);
            } else if (template === 'Template_3') {
                $('.t3 .interest').append(`<li><span>${interest}</span></li>`);
            }
        }
    }

    // Languages
    let lang_items = $('#accordionLang .accordion-item').length;
    for (let i = 0; i < lang_items; i++) {
        let lang = $(`#accordionLang .accordion-item:nth-child(${i + 1}) .lang`).val().trim();

        if (lang) {
            if (template === "Template_1") {
                $('.t1 .left_side .language ul').append(`<li><span class="text">${lang}</span></li>`);
            } else if (template === 'Template_2') {
                $('.t2 .lower .lower_left .languages .content .con').append(`<div class="lang">${lang}</div>`);
            } else if (template === 'Template_3') {
                $('.t3 .content-box .languages').append(`<p class="p3">${lang}</p>`);
            }
        }
    }

    // Achievements
    let achv = $(`#achv_description`).val().replaceAll("\n", "<br />\r\n");

    if (achv !== "") {
        if (template === "Template_1") {
            $('.t1 .right_side .achievements').append(`<p>${achv}</p>`);
        } else if (template === 'Template_2') {
            $('.t2 .lower_right .achievements .content .con').append(`<div class="val">${achv}</div>`);
        } else if (template === 'Template_3') {
            // Handle Template 3 if necessary
        }
    }

    // Profile
    let profile = $(`#profile`).val().replaceAll("\n", "<br />\r\n");
    if (profile !== "") {
        if (template === "Template_1") {
            $('.t1 .right_side .prof').append(`<p>${profile}</p>`);
        } else if (template === 'Template_2') {
            $('.t2 .lower_right .profile').append(`<div class="content">${profile}</div>`);
        } else if (template === 'Template_3') {
            $('.t3 .objective').html(`${profile}`);
        }
    }
}

// Call template_selector on form submission or button click
$('#generateCvButton').click(function() {
    template_selector();
});

