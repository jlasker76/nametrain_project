<?php include("db.php");

//echo 'post names= '. $_POST['names'];
foreach ($_POST['names'] as $value) {
  $x = 0;
  $names_str.= implode(",",$value).", "; 
  /*
  while($x <= count($value)) {
    //echo "The number is: $value[$x] <br>";
    echo "implode= ".implode($value);
    $x++;
  }
  */ 
  //echo "$value <br>";
}

echo 'will save='. $names_str;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO  nametrain (names) VALUES('".$names_str."')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
