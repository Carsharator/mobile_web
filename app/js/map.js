;function initMap() {
    // Create a map object and specify the DOM element for display.

    var mMy = new google.maps.Marker(), mCars = [], mPos = new google.maps.Marker();
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 55.760034, lng: 37.66464699999999},
        scrollwheel: false,
        zoomControl: false,
        mapTypeControl: false,
        zoom: 17
    });

    $.ajax({
        type: "GET",
        url: "https://46.101.141.101:3001/cars",
        dataType: 'json',
        success: function(data){
            console.debug(data)
            drowMarkersCar(data)
        }
    });

    var searchAddress = document.getElementById('searchAddress');

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchAddress);

    var autocomplete = new google.maps.places.Autocomplete(searchAddress);

    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', function() {
        console.debug('df')
        mPos.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        //mPos.setIcon(/** @type {google.maps.Icon} */({
        //    url: place.icon,
        //    size: new google.maps.Size(71, 71),
        //    origin: new google.maps.Point(0, 0),
        //    anchor: new google.maps.Point(17, 34),
        //    scaledSize: new google.maps.Size(35, 35)
        //}));
        mPos.setPosition(place.geometry.location);
        mPos.setVisible(true);
        mPos.setMap(map);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
            console.debug(address)
        }

    });


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //infoWindow.setPosition(pos);
            //infoWindow.setContent('Location found.');
            map.setCenter(pos);
            mMy.setPosition(pos);
            mMy.setMap(map);
            mMy.set("class", "waves-effect waves-light btn modal-trigger");
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        map.setCenter(pos);
        //infoWindow.setPosition(pos);
        //infoWindow.setContent(browserHasGeolocation ?
        //    'Error: The Geolocation service failed.' :
        //    'Error: Your browser doesn\'t support geolocation.');
    }

    // Клик по маркеру машинки
    mMy.addListener('click', function() {

    });

    function drowMarkersCar(dataCars){
        for (var i = 0; i < dataCars.length; i++) {
            mCars[i] = new google.maps.Marker({map: map, position: new google.maps.LatLng(dataCars[i].latitude, dataCars[i].longitude)})
        }
    }

}



$(document).ready(function(){
    if(document.getElementById('map')) {
        initMap();
    }

})


var modal_sheet = $(
    '<div id="modal1" class="modal bottom-sheet">' +
        '<div class="modal-content">' +
            '<h4>Modal Header</h4>' +

        '</div>' +
        '<div class="modal-footer">' +
            '<a href="" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>' +
        '</div>'+
    '</div>')