<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <?php

        include "../function.php";

        //connect db
        $conn = conn_db ();

        
        //getting food
        $query_food = "SELECT * FROM food";
        $result_food = mysqli_query($conn, $query_food);


        //getting food array
        $query_menu = "SELECT * FROM food_date";
        $result_menu = mysqli_query($conn, $query_menu);
        while ($row = mysqli_fetch_assoc($result_menu)) {
            $menu[] = $row;
        }


        /* food input */
        if (isset($_POST['food_submit'])) {
            //getting POST
            $kor_name = $_POST['kor_name'];
            $cna_name = $_POST['cna_name'];
            if(!isset($_POST['soup'])) {
                $soup = 0;
            } else {
                $soup = $_POST['soup'];
            }

            //processing
            $count_food = mysqli_num_rows($result_food);
            $this_id = $count_food + 1;


            //업로드 정보 저장
            $file = $_FILES['file'];
            $fileName = $_FILES['file']['name'];
            $fileTmpName = $_FILES['file']['tmp_name'];
            $fileSize = $_FILES['file']['size'];
            $fileError = $_FILES['file']['error'];
            $fileClass = $_FILES['file']['class'];

            //파일 확장자 변수 = $fileActualExt
            $fileExt = explode('.', $fileName);
            $fileActualExt = strtolower(end($fileExt));

            //insert 쿼리
            $insert_query = "INSERT INTO food (id, img_ext, kor_name, cna_name, soup) VALUES ('$this_id', '$fileActualExt', '$kor_name', '$cna_name', '$soup')";

            //허용된 이미지 확장자 종류
            $allowed = array('jpg', 'jpeg', 'png', 'pdf', 'jfif');

            //디렉토리에 이미지 추가
            if (in_array($fileActualExt, $allowed)) {
                if ($fileError === 0) {
                    if ($fileSize < 1000000) {
                        $fileNameNew = $this_id.".".$fileActualExt;
                        $fileDestination = '../food_img/'.$fileNameNew;       /* 링크 */
                        move_uploaded_file($fileTmpName, $fileDestination);
                        mysqli_query($conn, $insert_query);
                        header("Location:input_food.html");
                        exit();
                    } else {
                        echo "size is too big!";
                    }
                } else {
                    echo "error detected!";
                }
            } else {
                echo "error : only jpg, jpeg, png, pdf, jfif available";
            }
        } /* food date input */else if ($_POST['date_submit']) {
            //getting POST
            $date = $_POST['date'];
            $bld = $_POST['bld'];
            $soup = $_POST['soup'];
            $food1 = $_POST['food1'];
            $food2 = $_POST['food2'];
            $food3 = $_POST['food3'];
            $food4 = $_POST['food4'];
            $food5 = $_POST['food5'];


            //if exist
            foreach ($menu as $key => $value) {
                if ($value['date'] == $date) {
                    if($value['bld'] == $bld) {
                        $delete_query = "DELETE FROM food_date WHERE date = '$date' AND bld = '$bld'";
                        mysqli_query($conn, $delete_query);
                    }
                }
            }

            
            $insert_query = "INSERT INTO food_date (date, bld, soup, food1, food2, food3, food4, food5) VALUES ('$date', '$bld', '$soup', '$food1', '$food2', '$food3', '$food4', '$food5')";
            mysqli_query($conn, $insert_query);
            header("Location:input_menu.html");
            exit();
        }
    ?>
</body>
</html>