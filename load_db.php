<?php
    include "function.php";

    //DB key : $conn
    $conn = conn_db();

    //SELECTING food FROM DB
    $food = select_sql ($conn, "*", "food");
    //SELECTING food_date FROM DB
    $food_date = select_sql ($conn, "*", "food_date");
    //SELECTING 
    $today_word = select_sql($conn, "*", "today_word");
?>