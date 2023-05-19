<?php
// Параметры подключения к базе данных
$servername = "localhost";  // Имя сервера базы данных
$username = "root";         // Имя пользователя базы данных
$password = "";             // Пароль пользователя базы данных
$dbname = "kuratov_test_work"; // Имя базы данных

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка подключения к базе данных: " . $conn->connect_error);
}

// Получение данных из формы
$name = $_POST['name'];
$email = $_POST['email'];
$comment = $_POST['comment'];

// Проверка заполнения всех полей
if (empty($name) || empty($email) || empty($comment)) {
    echo "Пожалуйста, заполните все поля.";
} else {
    // Проверка уникальности комментария от пользователя
    $query = "SELECT * FROM comments WHERE email = '$email' AND comment = '$comment'";
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        echo "Вы уже оставили такой комментарий.";
    } else {
        // Готовим SQL-запрос для вставки данных в таблицу
        $sql = "INSERT INTO comments (name, email, comment) VALUES ('$name', '$email', '$comment')";

        if ($conn->query($sql) === TRUE) {
            echo "success";
        } else {
            echo "Ошибка при добавлении комментария: " . $conn->error;
        }
    }
}

$conn->close();
?>
