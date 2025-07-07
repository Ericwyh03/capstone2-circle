<?php
require_once '../db.php';

$userId = $_GET['user_id']; // pass as query param

// Get all users who are not current user and not already matched/skipped
$stmt = $pdo->prepare("
  SELECT u.id, u.name, u.bio, u.profile_image,
         COUNT(*) AS shared
  FROM users u
  JOIN user_interests ui1 ON u.id = ui1.user_id
  JOIN user_interests ui2 ON ui1.interest_id = ui2.interest_id
  WHERE ui2.user_id = ? AND u.id != ?
    AND u.id NOT IN (
      SELECT user_id_2 FROM matches WHERE user_id_1 = ?
    )
  GROUP BY u.id
  ORDER BY shared DESC
  LIMIT 1
");
$stmt->execute([$userId, $userId, $userId]);

$match = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($match);
