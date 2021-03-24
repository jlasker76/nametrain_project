<?php include("db.php");

foreach ($_POST['names'] as $value) {
  $x = 0;
  $names_str.= implode(",",$value).", "; 
  
}


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
