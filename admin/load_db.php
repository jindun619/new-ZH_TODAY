<?php
    include "../function.php";

    //DB key : $conn
    $conn = conn_db();

    //SELECTING food FROM DB
    $food = select_sql ($conn, "*", "food");
?>