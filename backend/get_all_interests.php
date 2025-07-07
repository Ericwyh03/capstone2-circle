
<?php
require_once '../db.php';

$stmt = $pdo->query("SELECT id, name FROM interests ORDER BY name");
$interests = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($interests);
?>
