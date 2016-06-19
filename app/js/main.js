$(document).ready(function() {

    $('.button-collapse').sideNav();


    $( ".btn-large" ).on( "click", function() {


        var first_name = $('#first_name').val();
        var sur_name = $('#sur_name').val();
        var patronymic_name = $('#patronymic_name').val();
        var login_name = $('#login_name').val();
        var password = $('#password').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var driver_number = $('#driver_number').val();
        var driver_number_time = $('#driver_number_time').val();

        var data = {first_name: first_name,
                    last_name: sur_name,
                    patronymic_name: patronymic_name,
                    login: login_name,
                    password: password,
                    phone: phone,
                    email: email,
                    license_number: driver_number,
                    license_valid_until: driver_number_time};

        var dataToJson = JSON.stringify(data);

        console.log(data)
        console.log(dataToJson);


        // function jsonCallback2(data) {
        //
        // }
        //
        // $.ajax({
        //     type: "POST",
        //     url: "https://46.101.141.101:3001/users/new",
        //     jsonCallback: jsonCallback2,
        //     contentType: "application/json",
        //     async: false,
        //     dataType: 'jsonp',
        //     success: function(dataRes){
        //         console.log(dataRes);
        //     },
        //     error: function(){
        //         console.log('error')
        //     }
        //
        // });
// (1)


        var formData = new FormData(document.forms.newUser);
        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

        var xhr = new XHR();

// (2) запрос на другой домен :)
        xhr.open('POST', 'https://46.101.141.101:3001/users/new', true);

        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        // xhr.setRequestHeader('Origin', 'https://localhost:4004/views/registration.html');


        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            alert( this.responseText );
        }


        xhr.onerror = function() {
            alert( 'Ошибка ' + this.status );
        }

        xhr.send(dataToJson);
    });


    if (document.getElementsByClassName('wrap_camera').length) {

        window.addEventListener("DOMContentLoaded", function() {
            // Grab elements, create settings, etc.
            var video = document.getElementById("video"),
                videoObj = { "video": true },
                errBack = function(error) {
                    console.log("Video capture error: ", error.code);
                };

            // Put video listeners into place
            if(navigator.getUserMedia) { // Standard
                navigator.getUserMedia(videoObj, function(stream) {
                    video.src = stream;
                    video.play();
                }, errBack);
            } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
                navigator.webkitGetUserMedia(videoObj, function(stream){
                    video.src = window.webkitURL.createObjectURL(stream);
                    video.play();
                }, errBack);
            }
            else if(navigator.mozGetUserMedia) { // Firefox-prefixed
                navigator.mozGetUserMedia(videoObj, function(stream){
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                }, errBack);
            }
        }, false);

        var widthCamBlock = document.getElementsByClassName('wrap_camera')[0].clientWidth;
        var heightCamBlock = widthCamBlock - (widthCamBlock / 3)

        document.getElementById('video').setAttribute('width', widthCamBlock);
        document.getElementById('video').setAttribute('height', heightCamBlock);

        $(window).resize(function(){
            var widthCamBlock = document.getElementsByClassName('wrap_camera')[0].clientWidth;
            var heightCamBlock = widthCamBlock - (widthCamBlock / 3)

            document.getElementById('video').setAttribute('width', widthCamBlock);
            document.getElementById('video').setAttribute('height', heightCamBlock);
        });

    }



});
