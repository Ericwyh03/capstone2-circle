
<?php
require_once '../db.php';

$userId = $_GET['user_id'] ?? null;
if (!$userId) {
  echo json_encode(["error" => "Missing user_id"]);
  exit;
}

$stmt = $pdo->prepare("SELECT id, name, email, bio, profile_image FROM users WHERE id = ?");
$stmt->execute([$userId]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($user);
?>
