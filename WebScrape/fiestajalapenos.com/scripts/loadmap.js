/*----------------------------------------------------------*/
/* Fiesta Jalapenos											*/
/* file name: loadmap.js									*/
/* Developer: MindPick Software LLC							*/
/* Date: 6/3/2008											*/
/* Updated 7/3/2015 for new location						*/
/*															*/
/* Description: Javascript to create an object names		*/
/*		'mapobject' in order to add a Google map to the		*/
/*		info page. The map will allow site visitors to		*/
/*		request directions.									*/
/*----------------------------------------------------------*/

// Load the Google maps API.
google.load( "maps", "2" );

// Create the object 'mapobject'.
var mapobject = function() {
	var gmap = google.maps,
		marker,
		requestHtml = "<div class='map_balloon'>" +
			"<img src='images/fiestajalapenoslogosmall.png' " +
			"alt='Fiesta Jalapenos' width='150' height='100' /><br />" + 
			"Enter starting address:" +
			"<form action='http://maps.google.com/maps' method='get' target='_blank'>" +
        	"<input type='text' size='35' maxlength='80' name='saddr' id='saddr' value='' /><br>" +
        	"<input value='Get Directions' type='submit'>" +
        	"<input type='hidden' name='daddr' value='33725 Center Ridge Rd., North Ridgeville, OH (Fiesta Jalapenos)'/>";
	
	// createMarker creates a map marker pointing to the restaurant. Clicking on the marker
	// allows the site visitor to request directions.
	function createMarker( point ) {
		var markerIcon = new gmap.Icon(G_DEFAULT_ICON);
		markerIcon.image = "http://maps.google.com/mapfiles/ms/micons/orange.png";
		markerIcon.iconSize = new gmap.Size(32, 32);
		markerIcon.shadowSize = new GSize(59, 32);
		var marker = new gmap.Marker(point, {icon:markerIcon});
		gmap.Event.addListener(marker, "click", function() {
			marker.openInfoWindowHtml(requestHtml);
		});
		return marker;
	}
	
	// initMap is called on page (or DOM) load.
	function initMap() {
		if (gmap.BrowserIsCompatible()) {
		
			// Display the map with some controls. Then set the initial location.
			var map = new gmap.Map2(document.getElementById("map"));
			map.addControl(new gmap.LargeMapControl());
			map.addControl(new gmap.MapTypeControl());
			map.setCenter(new gmap.LatLng(41.391,-82.0002),14);
			
			// Set up a marker so it's right over the building.
			var point = new gmap.LatLng(41.399707,-81.9899);
			marker = createMarker(point);
			map.addOverlay(marker);
			  
			if( window.addEventListener ) {
			  	window.addEventListener("unload", gmap.Unload, false );
			} else if( window.attachEvent ) {
				window.attachEvent( "onunload", gmap.Unload )
			} else {
				window.onunload = gmap.Unload;
			}
			  
			// Turn on text to instruct visitor how to get directions.
			var instr = document.getElementById("dir_instr");
			instr.style.display = "block";
		} else {
		}
	}
	
	return {
		initMap: initMap   // Make initMap public.
	};
}();


google.setOnLoadCallback(mapobject.initMap);
