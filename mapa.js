var geocoder;
var map;
var marker;

function initialize() {
	var latlng = new google.maps.LatLng(-23.1862746, -50.6573834);
	var options = {
		zoom: 15,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(document.getElementById("mapa"), options);
	
	geocoder = new google.maps.Geocoder();
	
	marker = new google.maps.Marker({
		map: map,
	});
	
	marker.setPosition(latlng);
}

$(document).ready(function () {

	initialize();
	
	function carregarNoMapa(endereco) {
		geocoder.geocode({ 'address': endereco + ', Brasil', 'region': 'BR' }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					var latitude = results[0].geometry.location.lat();
					var longitude = results[0].geometry.location.lng();
		
					$('#txtEndereco').val(results[0].formatted_address);
					$('#txtLatitude').val(latitude);
					 $('#txtLongitude').val(longitude);
					   
					var moradia = document.getElementById("moradia");
                    var moradiaSelecionada = moradia.options[moradia.selectedIndex].text;
                    //verificação para troca do ícone 
                    if(moradiaSelecionada == 'República'){
                        image = 'images/rep3.png';
                    } else if (moradiaSelecionada == 'Apartamento'){
                        image = 'images/ap2.png';
                    } else if (moradiaSelecionada == 'Pensionato'){
                        image = 'images/pensionato4.png';
                    } else if (moradiaSelecionada == 'Kitnet'){
                        image = 'images/kitnet3.png';
                    } 
		
					var location = new google.maps.LatLng(latitude, longitude);

					marker = new google.maps.Marker({
                        map: map,
                        icon: image,
                        position: location
					});
					
					marker.setPosition(location);
					map.setCenter(location);
					map.setZoom(16);
				}
			}
		})
	}
	
	$("#btnEndereco").click(function() {
		if($(this).val() != "")
			carregarNoMapa($("#txtEndereco").val());
	})
	
	$("#txtEndereco").blur(function() {
		if($(this).val() != "")
			carregarNoMapa($(this).val());
	})
	
	$("#txtEndereco").autocomplete({
		source: function (request, response) {
			geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
				response($.map(results, function (item) {
					return {
						label: item.formatted_address,
						value: item.formatted_address,
						latitude: item.geometry.location.lat(),
          				longitude: item.geometry.location.lng()
					}
				}));
			})
		},
		select: function (event, ui) {
			$("#txtLatitude").val(ui.item.latitude);
    		$("#txtLongitude").val(ui.item.longitude);
			var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
			marker.setPosition(location);
			map.setCenter(location);
			map.setZoom(16);
		}
	});


});