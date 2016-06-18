$(document).ready(function() {

    $('.button-collapse').sideNav();






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
