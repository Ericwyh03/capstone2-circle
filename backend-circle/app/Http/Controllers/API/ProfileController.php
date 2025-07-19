<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Connection;
use App\Models\UserEvent;
use App\Models\Mentorship;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function getProfile()
    {
        $user = Auth::guard('api')->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // Load related institution if not already loaded
        $user->load('institution');

        // Count accepted matches
        $connections = \DB::table('matches')
            ->where(function ($query) use ($user) {
                $query->where('user_id_1', $user->id)
                    ->orWhere('user_id_2', $user->id);
            })
            ->where('status', 'accepted') // only count accepted connections
            ->count();

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'bio' => $user->bio,
            'institution' => $user->institution ? $user->institution->name : null,
            'institution_id' => $user->institution_id,
            'stats' => [
                'connections' => $connections,
                'events' => 0,        // hardcoded until events table exists
                'mentorships' => 0,   // hardcoded until mentorships table exists
            ],
        ]);
    }


    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name' => 'required|string|max:100',
            'bio' => 'nullable|string',
            'institution_id' => 'nullable|exists:institutions,id'
        ]);

        $user->update($data);

        return response()->json(['message' => 'Profile updated successfully.']);
    }

    public function updateAuth(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:6'
        ]);

        $user->email = $data['email'];

        if (!empty($data['password'])) {
            $user->password = Hash::make($data['password']);
        }

        $user->save();

        return response()->json(['message' => 'Credentials updated successfully.']);
    }
}
