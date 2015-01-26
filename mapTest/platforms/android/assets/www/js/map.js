

var map = L.map('map');
var route_data = [];
var watchGeoID = null;
var interval;

document.addEventListener("deviceready", onDeviceReady(), false);

function onDeviceReady()
	  { 
	    document.addEventListener("online", onOnline, false);
      document.addEventListener("resume", onResume, false);
      interval = setInterval(watchLocation,10000);
    }; // end of onDeviceReady

	 
function onOnline()
    {
      loadMapsApi();
    };


function onResume()
    { 
      alert("Resume function");
      loadMapsApi();

    };


function loadMapsApi() 
    {
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    }  //end of loadMapsApi function



function watchLocation()
    {
      map.locate({watch:false,setView: false,enableHighAccuracy:true}); 
    }
 
function stopTracking()
    {
      clearInterval(interval);
      map.stopLocate()
      alert("Here is your route cordinates "+route_data);
    }



function onLocationFound(e) //e
    {
    
     // alert("Location is active");
      var lat_lng = e.latlng;
 
      route_data.push(lat_lng);
      
          
      var polyline = L.polyline(route_data, { weight: 5,color: 'red'}).addTo(map);

      //zoom the map to the polyline
      map.fitBounds(polyline.getBounds());
  
   }


map.on('locationfound', onLocationFound,onLocationError);

function onLocationError(e) 
  {
    alert(e.message);
  }

/*
function createTable()
            {
                $.getJSON('https://pmcgrath1.pythonanywhere.com/createTable',
                    {
       
                    },
                        function(route_data)
                            {
                                console.log(route_data)
                                $("#result").text(data.result);
                            });
                            return false;

            }
        */

function store()
            {
                $.getJSON('http://pmcgrath1.pythonanywhere.com/insert',
                    {
                       longLat : route_data
                    },
                        function(longLat)
                            {
                              alert("data succesfully uploaded");
                                
                            });
                            return false;

            }


