$(document).ready(function() {

    $('.button-collapse').sideNav();


    $( "#authorization .btn-authorization" ).on( "click", function() {
        var login_name = $('#login_name').val();
        var password = $('#password').val();


        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

        var xhr = new XHR();
        var data3 =  "license_number=" + login_name;
        xhr.open('GET', 'https://46.101.141.101:3001/users/?' + data3, true);

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        // xhr.setRequestHeader('Origin', 'https://localhost:4004/views/registration.html');

        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            localStorage.setItem("USER", this.responseText);
            window.location.href = 'views/lk.html';

        };


        xhr.onerror = function() {
            console.log( 'Ошибка ' + this.status );
        };



        xhr.send();

       
    });


    $( "#createNewUser .btn-createNewUser" ).on( "click", function() {


        var first_name = $('#first_name').val();
        var sur_name = $('#sur_name').val();
        var patronymic_name = $('#patronymic_name').val();
        var login_name = $('#login_name').val();
        var password = $('#password').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var driver_number = $('#driver_number').val();
        var driver_number_time = $('#driver_number_time').val();

        // var data = {first_name: first_name,
        //             last_name: sur_name,
        //             patronymic_name: patronymic_name,
        //             login: login_name,
        //             password: password,
        //             phone: phone,
        //             email: email,
        //             license_number: driver_number,
        //             license_valid_until: driver_number_time};

        // var dataToJson = JSON.stringify(data);

        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

        var xhr = new XHR();

        xhr.open('POST', 'https://46.101.141.101:3001/users/new', true);

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        // xhr.setRequestHeader('Origin', 'https://localhost:4004/views/registration.html');

        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            localStorage.setItem("USER", this.responseText);
            window.location.href = '/views/lk.html';
        };


        xhr.onerror = function() {
            console.log( 'Ошибка ' + this.status );
        };

        var data2 = "first_name=" +  first_name + "&last_name=" + sur_name + "&patronymic_name=" + patronymic_name + "&license_number=" + driver_number + "&login=" +login_name+ "&password=" +password+ "&phone=" +phone+ "&email" +email+ "&license_valid_until=" + driver_number_time;
        xhr.send(data2);


    });


    if(window.location.href.search('lk.html') != -1 ) {
        var objStorage = JSON.parse(localStorage.USER);

        $('.user .name').text(objStorage.user.login);
        $('table .first_name').text(objStorage.user.first_name);
        $('table .last_name').text(objStorage.user.last_name);
        $('table .patronymic_name').text(objStorage.user.patronymic_name);
        $('table .license_number').text(objStorage.user.license_number);
        $('table .login').text(objStorage.user.login);
        $('table .distance').text(objStorage.user.distance);
        $('table .spent').text(objStorage.user.spent);
    }





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
