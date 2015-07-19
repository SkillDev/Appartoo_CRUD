/*jslint browser: true*/
var google;
var autocomplete;
var mapOptions;
var carte;
var position;
var icon = 'assets/images/pointer.png';

function localisation(e) {
    "use strict";
    if (navigator.geolocation) {
        position = function (position) {
            var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude), myOptions = {zoom : 13, center : point, mapTypeId : google.maps.MapTypeId.ROADMAP}, carte = document.getElementById("map-canvas"), map = new google.maps.Map(carte, myOptions), Marker = new google.maps.Marker({position : point, map : map, title : "Mon appart", icon: icon});
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        ville.value = results[0].formatted_address;
                    }
                }
            });
        };
        navigator.geolocation.getCurrentPosition(position);
    }
    e.preventDefault();
}

document.getElementById("localisation").addEventListener('click', localisation);


var depart = document.getElementById('ville');
var options = {types : ['geocode']};

autocomplete = new google.maps.places.Autocomplete(ville, options);
