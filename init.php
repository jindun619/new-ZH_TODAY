<?php
    painter(get_date());

    $date = get_date();

    $ip_address = $_SERVER['REMOTE_ADDR'];
    $query = "INSERT INTO visits (ip_address, visit_date) VALUES ('$ip_address', '$date')";
    mysqli_query($conn, $query);

    // $query = "SELECT DISTINCT ip_address FROM visits WHERE visit_date = '$date'";
    // $result = mysqli_query($conn, $query);
    // $today_visits = mysqli_num_rows($result);
    // echo $today_visits;
?>