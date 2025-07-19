<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class MatchController extends Controller
{
    public function findMatches(Request $request)
    {
        $authUser = auth()->user();

        $authUserInterestIds = $authUser->interests()->pluck('interests.id')->toArray();

        // Fetch other users with at least one shared interest
        $matches = User::with(['interests', 'institution'])
            ->where('id', '!=', $authUser->id)
            ->whereHas('interests', function ($query) use ($authUserInterestIds) {
                $query->whereIn('interests.id', $authUserInterestIds);
            })
            ->get();

        // Format matches
        $formatted = $matches->map(function ($user) use ($authUserInterestIds) {
            $sharedInterests = $user->interests->whereIn('id', $authUserInterestIds)->pluck('name');

            return [
                'id' => $user->id,
                'name' => $user->name,
                'bio' => $user->bio,
                'email' => $user->email,
                'institution' => $user->institution ? $user->institution->name : null,
                'shared_interests' => $sharedInterests
            ];
        });

        return response()->json($formatted);
    }
}
