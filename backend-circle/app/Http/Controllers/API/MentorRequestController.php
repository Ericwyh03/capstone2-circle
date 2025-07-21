<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MentorRequest;
use App\Models\User;

class MentorRequestController extends Controller
{
    public function sendRequest(Request $request)
    {
        $mentee = auth()->user();
        $mentorId = $request->input('mentor_id');

        $existing = MentorRequest::where('mentee_id', $mentee->id)
            ->where('mentor_id', $mentorId)
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Already requested'], 400);
        }

        MentorRequest::create([
            'mentee_id' => $mentee->id,
            'mentor_id' => $mentorId,
        ]);

        return response()->json(['message' => 'Mentorship request sent']);
    }

    public function incomingRequests()
    {
        $mentor = auth()->user();

        // Load mentee and their institution
        $requests = MentorRequest::where('mentor_id', $mentor->id)
            ->where('status', 'pending')
            ->with(['mentee.institution']) // Eager loading
            ->get();

        return response()->json($requests);
    }

    public function respond(Request $request)
    {
        $request->validate([
            'request_id' => 'required|integer|exists:mentor_requests,id',
            'status' => 'required|in:accepted,rejected',
        ]);

        $mentorshipRequest = MentorRequest::findOrFail($request->request_id);

        if ($mentorshipRequest->mentor_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $mentorshipRequest->status = $request->status;
        $mentorshipRequest->save();

        return response()->json(['message' => 'Mentorship request updated successfully']);
    }

    public function acceptedMentees()
    {
        $mentor = auth()->id();

        $mentees = MentorRequest::with('mentee.institution') // include institution if needed
        ->where('mentor_id', $mentor)
            ->where('status', 'accepted')
            ->get();

        return response()->json($mentees->pluck('mentee'));
    }

    public function acceptedMentors()
    {
        $mentee = auth()->id();

        $mentors = MentorRequest::with('mentor.institution') // include institution if needed
        ->where('mentee_id', $mentee)
            ->where('status', 'accepted')
            ->get();

        return response()->json($mentors->pluck('mentor'));
    }

    public function mentorshipConnections(Request $request)
    {
        $userId = auth()->id();

        $acceptedRequests = MentorRequest::where(function ($query) use ($userId) {
            $query->where('mentee_id', $userId)
                ->orWhere('mentor_id', $userId);
        })
            ->where('status', 'accepted')
            ->get();

        $connectionIds = $acceptedRequests->map(function ($request) use ($userId) {
            return $request->mentee_id === $userId ? $request->mentor_id : $request->mentee_id;
        });

        $connections = User::whereIn('id', $connectionIds)->select('id', 'name', 'email')->get();

        return response()->json($connections);
    }

}
