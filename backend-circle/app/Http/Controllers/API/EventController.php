<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    // Create an event
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'nullable|date|after_or_equal:start_time',
            'location' => 'required|string',
        ]);

        $event = Event::create([
            'creator_id' => Auth::id(),
            'name' => $request->name,
            'description' => $request->description,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'location' => $request->location,
        ]);

        return response()->json($event, 201);
    }

    // Join an event
    public function join(Event $event)
    {
        $user = Auth::user();

        if (!$event->attendees->contains($user->id)) {
            $event->attendees()->attach($user->id);
        }

        return response()->json(['message' => 'Successfully joined event'], 200);
    }

    // Get all events with attendees
    public function index()
    {
        return Event::with('attendees')->get();
    }

    // Get events joined by the current user
    public function myEvents()
    {
        return Auth::user()->joinedEvents()->with('attendees')->get();
    }
}
