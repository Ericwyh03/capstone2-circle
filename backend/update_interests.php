
<?php
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['user_id'];
$interestIds = $data['interest_ids'];

// Clear existing interests
$pdo->prepare("DELETE FROM user_interests WHERE user_id = ?")->execute([$userId]);

// Re-insert selected interests
$stmt = $pdo->prepare("INSERT INTO user_interests (user_id, interest_id) VALUES (?, ?)");
foreach ($interestIds as $iid) {
  $stmt->execute([$userId, $iid]);
}

echo json_encode(["success" => true]);
?>
