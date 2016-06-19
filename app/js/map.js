;function initMap() {
    // Create a map object and specify the DOM element for display.

    var mMy = new google.maps.Marker(), mCars = [], mPos = new google.maps.Marker();

    var iMy = '../img/me.png';
    var iCars = '../img/oper_cat1.png';
    var iCars_2 = '../img/oper_cat2.png';
    var iPos = '../img/pos.png';

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 55.760034, lng: 37.66464699999999},
        scrollwheel: true,
        zoomControl: false,
        mapTypeControl: false,
        zoom: 17,
        styles: [{
            "elementType": "geometry",
            "stylers": [
                { "visibility": "simplified" },
                { "weight": 2.9 },
                { "gamma": 1.49 },
                { "saturation": 13 },
                { "lightness": 5 }
            ]
        }
        ]
    });

    var dataCar = [];
    $.ajax({
        type: "GET",
        url: "https://46.101.141.101:3001/cars",
        dataType: 'json',
        success: function(data){
            dataCar = data;
            drowMarkersCar(dataCar)
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
        mPos.set('icon', iPos);

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
            mMy.setIcon(iMy);
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


    function drowMarkersCar(dataCars){
        for (var i = 0; i < dataCars.length; i++) {
            mCars[i] = new google.maps.Marker({
                map: map,
                position: {lat: dataCars[i].latitude, lng: dataCars[i].longitude},
                icon: iCars,
                store_id: dataCars[i]._id,
                c_id: i
            });
            mCars[i].addListener('click', function() {
                console.log(this);
                showInfo(this.get('c_id'))
            });

        }
        map.setZoom(15)
        console.debug(mCars)
    }

    function showInfo(i){
        console.debug(dataCar[i])
        $('#modal1 .name').text(dataCar[i].model)
        $('#modal1 .number').text(dataCar[i].number)
        $('#modal1 .price').text(dataCar[i].price + ' руб. / минута')
        $('#modal1 .price-x2').text(dataCar[i].price * 2 + ' руб. / минута')
        $('#modal1').openModal();
    }


    function drowRoute(i) {
        var directionsDisplay = new google.maps.DirectionsRenderer({
            map: map,
            suppressMarkers: true
        });
        var request = {
            destination: {lat: dataCar[i].latitude, lng: dataCar[i].longitude},
            origin: {lat: dataCar[i].destination_latitude, lng: dataCar[i].destination_longitude},
            travelMode: google.maps.TravelMode.DRIVING
        };
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                // Display the route on the map.
                directionsDisplay.setDirections(response);
                new google.maps.Marker({
                    position: {lat: dataCar[i].destination_latitude, lng: dataCar[i].destination_longitude},
                    map: map,
                    icon: iCars_2
                });
            }
        })
    }
}




$(document).ready(function(){
    //alert(window.innerWidth)
    if(document.getElementById('map')) {
        initMap();
    }
    //$("#searchAddress").on('focus', function(){
    //    $('.wrap').show(200)
    //}).on('blur',  function(){$('.wrap').hide(200)})

    $(document).on('click', '.filters .ch', function(){
        $('.filters td a').removeClass('active');
        $(this).addClass('active')
    })
    $(document).on('click', '.intable tr', function(){
        $('.intable tr').removeClass('sel');
        $(this).addClass('sel')
    })
    $(document).on('click', '.block', function(){
        $('.block').removeClass('sel');
        $(this).addClass('sel')
       
    })
})
