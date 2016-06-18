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
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        map.setCenter(pos);
        //infoWindow.setPosition(pos);
        //infoWindow.setContent(browserHasGeolocation ?
        //    'Error: The Geolocation service failed.' :
        //    'Error: Your browser doesn\'t support geolocation.');
    }
}



$(document).ready(function(){
    if(document.getElementById('map')) {
        initMap();
    }

})