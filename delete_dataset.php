<?php

    include('header.php');

?>	



<?php

//This file contain statements to delete the content from all tables



require "connection.php";

echo '<div class="containerTable">';


$sql_delete = "DELETE FROM `entry_items`";

try{
    $stmt =  $conn->prepare($sql_delete);
    $stmt->execute();
}catch(PDOException $e){

    echo "Error: ".$e->getMessage();

}



$sql_delete = "DELETE FROM `entries`";

try{
    $stmt =  $conn->prepare($sql_delete);
    $stmt->execute();
}catch(PDOException $e){

    echo "Error: ".$e->getMessage();

}


$sql_delete = "DELETE FROM `gl_accounts`";

try{
    $stmt =  $conn->prepare($sql_delete);
    $stmt->execute();
}catch(PDOException $e){

    echo "Error: ".$e->getMessage();

}


$sql_delete = "DELETE FROM `gl_categories`";

try{
    $stmt =  $conn->prepare($sql_delete);
    $stmt->execute();
}catch(PDOException $e){

    echo "Error: ".$e->getMessage();

}


$sql_delete = "DELETE FROM `locations`";

try{
    $stmt =  $conn->prepare($sql_delete);
    $stmt->execute();
}catch(PDOException $e){

    echo "Error: ".$e->getMessage();

}

$data = null;



echo "<br><br><br><p><b>All data deleted.</b></p><br><br><br><br><br><br>";

$conn = null;



echo '</div>';



?>





<?php

	include('footer.php');

?>			