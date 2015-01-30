

var map = L.map('map');
var route_data = [];
var databaseArr = [];
var watchGeoID = null;
var interval;

document.addEventListener("deviceready", onDeviceReady(), false);

function onDeviceReady()
	  { 
	    document.addEventListener("online", onOnline, false);
      document.addEventListener("resume", onResume, false);
     loadMapsApi();
      interval = setInterval(watchLocation,8000);
    }// end of onDeviceReady

	 
function onOnline()
    {
      loadMapsApi();
    }


function onResume()
    { 
      alert("Resume function");
      loadMapsApi();

    }


function loadMapsApi() 
    {
      
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);


    } //end of loadMapsApi function



function watchLocation()
    {
     
       
      map.locate({watch:false,setView: false,enableHighAccuracy:true},{frequency:10000}); 
        loadMapsApi();
    }
 
function stopTracking()
    {
      clearInterval(interval);
      map.stopLocate();
      alert("Here is your route cordinates "+route_data);
    }



function onLocationFound(e) //e
    {
      
      
       //var latitude = e.latlng.lat;
       
  
   
      route_data.push(e.latlng);
      

      var polyline = L.polyline(route_data,{ weight: 5,color: 'red'}).addTo(map);

      //zoom the map to the polyline
     map.fitBounds(polyline.getBounds());
  
     

      databaseArr.push(e.latlng.lat,e.latlng.lng);
    //  alert("Database info is "+databaseArr);
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
               
               // var myJson = JSON.stringify( route_data);
                // var longlt = 2.9999;
                  alert("The route to be stored is " +databaseArr);
                $.getJSON('http://pmcgrath1.pythonanywhere.com/insert',
                    {
                       

                       data : databaseArr.toString()



                    },
                        function(data)
                            {
                              alert("data succesfully uploaded");
                                
                            });
                            return false;

            };


