
<?php
require_once '../db.php';

$userId = $_GET['user_id'] ?? null;
if (!$userId) {
  echo json_encode(["error" => "Missing user_id"]);
  exit;
}

$stmt = $pdo->prepare("
  SELECT i.id, i.name FROM interests i
  JOIN user_interests ui ON i.id = ui.interest_id
  WHERE ui.user_id = ?
");
$stmt->execute([$userId]);
$interests = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($interests);
?>
