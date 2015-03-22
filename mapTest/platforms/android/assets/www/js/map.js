

var map = L.map('map');
var route_data = [];
var databaseArr = [];
var watchGeoID = null;
var interval;
tracking_data =[];
var marker;
var databaseToString =[] ;
var uniqueCoords=[];
var uniqueCoordsWithStamp=[];
var fileData ="";
 var temp;
function onLoad()
  {
    document.addEventListener("deviceready", onDeviceReady(), false);
  }


function onDeviceReady()
	{ 
	   document.addEventListener("online", onOnline, false);
     document.addEventListener("resume", onResume, false);
     loadMapsApi();
     interval = setInterval(watchLocation,1000);
     
  }

function onOnline()
    {
      loadMapsApi();
    }


function onResume()
    { 
     
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
     
     map.locate({watch:false,setView:L.latLng,enableHighAccuracy:true});
     var d = new Date();

   // alert("Cordova geo plugin timestamp "+d.toISOString());
       /*
        watch_id = navigator.geolocation.watchPosition(
    
      // Success
        function(position){
            tracking_data.push(position);
            alert(position.coords.latitude );
        },
        
        // Error
        function(error){
            console.log(error);
        },
        
        // Settings
        { frequency: 3000, enableHighAccuracy: true });


*/

     }
 
function stopTracking()
    {
      clearInterval(interval);
      map.stopLocate();
      alert("Here is your route cordinates "+route_data);
      var polyline = L.polyline(route_data,{ weight: 5,color: 'red'}).addTo(map);
      map.fitBounds(polyline.getBounds());
    }



function onLocationFound(e) //e
    {
      
      route_data.push(e.latlng);
      var d = new Date();
      //+d.toISOString()
      databaseToString.push("<trkpt lat="+'"'+e.latlng.lat+'"'+ " lon="+'"'+ e.latlng.lng+'"'+">"+"<time>"+d.toISOString()+"</time>"+"\r\n");
      
      
      //databaseToString.push([e.latlng.lat, e.latlng.lng].toString());
    /*  uniqueCoords =[];
      unique = true;
      var x,y;
      for (x=0; x< databaseToString.length; x++)
          {
            unique = true;
            for(y=0;y<uniqueCoords.length; y++)
                {
                 if (uniqueCoords[y] == databaseToString[x] )
                  {
                    unique = false;
                    break;
                  }
                }
          
            if (unique == true)
            {
             
              console.log(databaseToString[x]);
             
              uniqueCoords.push(databaseToString[x]);
              //uniqueCoordsWithStamp.push(databaseToString[x])
            }


          }
      */

        }

map.on('locationfound', onLocationFound,onLocationError);

function onLocationError(e) 
  {
    alert(e.message);
  }



function store()

{
alert("Store");
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);


function gotFS(fileSystem) 
  {
    alert("gotFS to file");
    fileSystem.root.getFile("testFile5.txt", {create: true}, gotFileEntry, fail);
  }
 
function fail(error)
  {  

    console.log("gotFS ERROR");
  }

function gotFileEntry(fileEntry) 
  {
     
    fileEntry.createWriter(gotFileWriter, fail);
    alert("File saved at "+fileEntry.toURL());

  }


function gotFileWriter(writer)
 {
  
  writer.write("?xml version='1.0' encoding='UTF-8'?>" +"\n"+ "<trk>"+"\n" + databaseToString.join("") + "</trk>" + "</gpx>" );
     
     
  }

 
  } // end of store function



/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

function upload(){

var file_upd =  new FormData($('#upload_file')[0]);
$.ajax({

   type:'post',
   url: "http://pmcgrath1.pythonanywhere.com/upload",
   data: file_upd,
   async: false,
   processData:false,
   cache:false,
   contentType: false,

   success: function(data)
      {
          if (data.result ==100)
          {
            alert('successfully uploaded');
          }

      },
      error: function(data)
      {
          alert('Upload failed');
      },



   




});
  



}


/*
function fileTest()
{
window.plugins.mfilechooser.open([], function (uri) {

            alert(uri);

            }, function (error) {

            alert(error);

            });
}
*/

  /*   
            window.plugins.mfilechooser.open([], function (uri) {

            //alert(uri);

            }, function (error) {

            alert(error);

            });
*/
            

/*

               var myJson = JSON.stringify(uniqueCoords);
               

               
                  alert("Unique coords " +myJson );
                 $.getJSON('http://pmcgrath1.pythonanywhere.com/insert',
                    {
                       data : myJson
                    },
                        function(data)
                            {
                              alert("Data succesfully uploaded");
                            });
                            return false ;
*/
           


