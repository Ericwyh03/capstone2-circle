<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MatchRequest;

class MatchRequestController extends Controller
{
public function sendRequest(Request $request)
{
$sender = auth()->user();
$receiverId = $request->input('receiver_id');

$existing = MatchRequest::where('sender_id', $sender->id)
->where('receiver_id', $receiverId)
->first();

if ($existing) {
return response()->json(['message' => 'Already requested'], 400);
}

MatchRequest::create([
'sender_id' => $sender->id,
'receiver_id' => $receiverId,
]);

return response()->json(['message' => 'Match request sent']);
}

    public function friends(Request $request)
    {
        $user = auth()->user();

        $friends = MatchRequest::where('status', 'accepted')
            ->where(function ($query) use ($user) {
                $query->where('sender_id', $user->id)
                    ->orWhere('receiver_id', $user->id);
            })
            ->get()
            ->map(function ($match) use ($user) {
                return $match->sender_id === $user->id
                    ? $match->receiver
                    : $match->sender;
            });

        return response()->json($friends);
    }

public function incomingRequests()
{
$user = auth()->user();

$requests = MatchRequest::with('sender')
->where('receiver_id', $user->id)
->where('status', 'pending')
->get();

return response()->json($requests);
}

public function respond(Request $request)
{
$user = auth()->user();

$matchRequest = MatchRequest::where('id', $request->id)
->where('receiver_id', $user->id)
->firstOrFail();

$matchRequest->status = $request->input('status'); // accepted / rejected
$matchRequest->save();

return response()->json(['message' => 'Response recorded']);
}
    public function accept($id)
    {
        $request = MatchRequest::findOrFail($id);

        if ($request->receiver_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->status = 'accepted';
        $request->save();

        return response()->json(['message' => 'Match accepted.']);
    }
    public function getMutualMatches()
    {
        $userId = auth()->id();

        $matches = MatchRequest::where('status', 'accepted')
            ->where(function ($query) use ($userId) {
                $query->where('sender_id', $userId)
                    ->orWhere('receiver_id', $userId);
            })
            ->get()
            ->filter(function ($match) use ($userId) {
                // Mutual: both sent and received accepted request
                return MatchRequest::where('sender_id', $match->receiver_id)
                    ->where('receiver_id', $userId)
                    ->where('status', 'accepted')
                    ->exists();
            })
            ->map(function ($match) use ($userId) {
                return $match->sender_id === $userId
                    ? $match->receiver
                    : $match->sender;
            });

        return response()->json($matches);
    }

}
