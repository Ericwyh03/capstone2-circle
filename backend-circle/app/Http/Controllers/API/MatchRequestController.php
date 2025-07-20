<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MatchRequest;
use Illuminate\Support\Facades\Log;
use App\Models\User;

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
        $userId = auth()->id();

        $matches = MatchRequest::where(function ($query) use ($userId) {
            $query->where('sender_id', $userId)
                ->orWhere('receiver_id', $userId);
        })
            ->where('status', 'accepted')
            ->get();

        $friendIds = $matches->map(function ($match) use ($userId) {
            return $match->sender_id === $userId ? $match->receiver_id : $match->sender_id;
        });

        $friends = User::whereIn('id', $friendIds)->select('id', 'name', 'email')->get();

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

        Log::info('Authenticated user:', ['id' => auth()->id()]);
        Log::info('Incoming request', $request->all());
        Log::info('Authenticated user:', [auth()->user()]);
        $request->validate([
            'request_id' => 'required|integer|exists:match_requests,id',
            'status' => 'required|in:accepted,rejected',
        ]);

        $matchRequest = MatchRequest::findOrFail($request->request_id); // ✅ Make sure this is used

        // Optional: Check that the current user is the recipient
        if ($matchRequest->receiver_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $matchRequest->status = $request->status;
        $matchRequest->save();

        return response()->json(['message' => 'Match request updated successfully']);
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
