/*----------------------------------------------------------*/
/* Si Senor													*/
/* file name: loadmap.js									*/
/* Developer: MindPick Software LLC							*/
/* Date: 4/26/2011											*/
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
		westlakeRequestHtml = "<div class='map_balloon'>" +
			"<img src='images/sisenorlogosmallw.png' " +
			"alt='Si Senor' width='125' height='73' /><br />" + 
			"Enter starting address:" +
			"<form action='http://maps.google.com/maps' method='get' target='_blank'>" +
        	"<input type='text' size='35' maxlength='80' name='saddr' id='saddr' value='' /><br>" +
        	"<input value='Get Directions' type='submit'>" +
        	"<input type='hidden' name='daddr' value='27155 Detroit Rd., Westlake, OH (Si Senor)'/>",
		kammsRequestHtml = "<div class='map_balloon'>" +
			"<img src='images/sisenorlogosmallk.png' " +
			"alt='Si Senor' width='56' height='75' /><br />" + 
			"Enter starting address:" +
			"<form action='http://maps.google.com/maps' method='get' target='_blank'>" +
        	"<input type='text' size='35' maxlength='80' name='saddr' id='saddr' value='' /><br>" +
        	"<input value='Get Directions' type='submit'>" +
        	"<input type='hidden' name='daddr' value='16800 Lorain Ave., Cleveland, OH (Si Senor)'/>",
		sevenhillsRequestHtml = "<div class='map_balloon'>" +
			"<img src='images/sisenorlogosmallw.png' " +
			"alt='Si Senor' width='125' height='73' /><br />" + 
			"Enter starting address:" +
			"<form action='http://maps.google.com/maps' method='get' target='_blank'>" +
        	"<input type='text' size='35' maxlength='80' name='saddr' id='saddr' value='' /><br>" +
        	"<input value='Get Directions' type='submit'>" +
        	"<input type='hidden' name='daddr' value='7729 Broadview Rd., Seven Hills, OH (Si Senor)'/>";
	
	// createMarker creates a map marker pointing to the restaurant. Clicking on the marker
	// allows the site visitor to request directions.
	function createMarker( point, requestHtml ) {
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
			map.addControl(new gmap.SmallMapControl());
			map.addControl(new gmap.MapTypeControl());
			map.setCenter(new gmap.LatLng(41.425,-81.7875),12);
			
			// Set up a marker for Westlake location so it's right over the building.
			var point = new gmap.LatLng(41.46703,-81.920675);
			wMarker = createMarker(point, westlakeRequestHtml);
			map.addOverlay(wMarker);
			
			// Set up a marker for Kamm's Corners location so it's right over the building.
			var point = new gmap.LatLng(41.450837,-81.814631);
			kMarker = createMarker(point, kammsRequestHtml);
			map.addOverlay(kMarker);
			
			// Set up a marker for Seven Hills' location so it's right over the building.
			var point = new gmap.LatLng(41.3555,-81.6842);
			sMarker = createMarker(point, sevenhillsRequestHtml);
			map.addOverlay(sMarker);

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
