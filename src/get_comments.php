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

// Запрос для получения комментариев из базы данных
$query = "SELECT * FROM comments";
$result = $conn->query($query);

// Формирование массива комментариев
$comments = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }
}

// Преобразование массива в JSON
$json = json_encode($comments);

// Вывод JSON-кода
echo $json;

$conn->close();
?>
