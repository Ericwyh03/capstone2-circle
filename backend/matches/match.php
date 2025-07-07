<?php
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

$userId = $data['user_id'];
$matchedId = $data['matched_user_id'];
$score = $data['score'];

$stmt = $pdo->prepare("
  INSERT INTO matches (user_id_1, user_id_2, match_score, status)
  VALUES (?, ?, ?, 'accepted')
");
$stmt->execute([$userId, $matchedId, $score]);

echo json_encode(["success" => true]);
