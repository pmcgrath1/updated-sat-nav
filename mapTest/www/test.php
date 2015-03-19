 <?php
  

    header('Access-Control-Allow-Origin: *');

    header('Access-Control-Allow-Methods: GET, POST');

    header("Access-Control-Allow-Headers: X-Requested-With");

 ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);









 //  $host        = "host=127.0.0.1";
  // $port        = "port=5432";
 //  $dbname      = "dbname=ireland";
 //  $credentials = "user=postgres password=eastwood52095";


  $connection = pg_connect("host=127.0.0.1 port=5432 dbname=ireland user=postgres password=eastwood52095")


$coords = $_POST['data'];

$dbQuery = 	pg_query($connection, "INSERT INTO gps_data(latlng) VALUES ('coords');");

var_dump($dbQuery);
pg_close($connection);


/*
   $db = pg_connect( "$host $port $dbname $credentials"  );
   if(!$db){
      echo "Error : Unable to open database\n";
   } else {
      echo "Opened database successfully\n";
   }


$sql =<<<EOF
      SELECT latlng FROM gps_data;

EOF;

   $ret = pg_query($db, $sql);
   if(!$ret){
      echo pg_last_error($db);
      exit;
   } 

 while($row = pg_fetch_row($ret)){
      echo "Coordinates = ". $row[0] . "\n";
 }
   echo "Operation done successfully\n";
   pg_close($db);


*/

?>