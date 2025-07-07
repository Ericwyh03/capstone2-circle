<?php
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

$userId = $data['user_id'];
$matchedId = $data['matched_user_id'];

$stmt = $pdo->prepare("
  INSERT INTO matches (user_id_1, user_id_2, match_score, status)
  VALUES (?, ?, 0, 'skipped')
");
$stmt->execute([$userId, $matchedId]);

echo json_encode(["success" => true]);
