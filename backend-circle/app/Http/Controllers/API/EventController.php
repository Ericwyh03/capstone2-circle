<?php
//
//namespace App\Http\Controllers\Api;
//
//use App\Http\Controllers\Controller;
//use Illuminate\Http\Request;
//use App\Models\Event;
//use App\Models\MatchRequest;
//use Illuminate\Support\Facades\Auth;
//
//class EventController extends Controller
//{
//    // Create an event
//    public function store(Request $request)
//    {
//        $request->validate([
//            'name' => 'required|string',
//            'description' => 'nullable|string',
//            'start_time' => 'required|date',
//            'end_time' => 'nullable|date|after_or_equal:start_time',
//            'location' => 'required|string',
//        ]);
//
//        $event = Event::create([
//            'creator_id' => Auth::id(),
//            'name' => $request->name,
//            'description' => $request->description,
//            'start_time' => $request->start_time,
//            'end_time' => $request->end_time,
//            'location' => $request->location,
//        ]);
//
//        return response()->json($event, 201);
//    }
//
//    // Join an event
//    // Join an event
//    public function join(Event $event)
//    {
//        $user = Auth::user();
//
//        // ❌ Don't allow the creator to join their own event
//        if ($event->creator_id === $user->id) {
//            return response()->json(['message' => 'You are the event creator.'], 400);
//        }
//
//        // ✅ Check if already joined
//        if (!$event->attendees->contains($user->id)) {
//            $event->attendees()->attach($user->id);
//            return response()->json(['message' => 'Successfully joined event'], 200);
//        }
//
//        return response()->json(['message' => 'Already joined this event'], 200);
//    }
//
////    public function join(Event $event)
////    {
////        $user = Auth::user();
////
////        if (!$event->attendees->contains($user->id)) {
////            $event->attendees()->attach($user->id);
////        }
////
////        return response()->json(['message' => 'Successfully joined event'], 200);
////    }
//
//    // Get all events with attendees
//    public function index(Request $request)
//    {
//        $user = auth()->user();
//
//        $events = Event::where(function ($query) use ($user) {
//            // Public events (visible to all)
//            $query->where('privacy', 'public');
//
//            // Friends-only events where creator is a mutual match
//            $query->orWhere(function ($q) use ($user) {
//                $friendIds = MatchRequest::where('status', 'accepted')
//                    ->where(function ($matchQuery) use ($user) {
//                        $matchQuery->where('sender_id', $user->id)
//                            ->orWhere('receiver_id', $user->id);
//                    })
//                    ->pluck('sender_id', 'receiver_id')
//                    ->flatten()
//                    ->unique()
//                    ->values();
//
//                $q->where('privacy', 'friends')
//                    ->whereIn('creator_id', $friendIds);
//            });
//
//            // 👤 Private events created by this user
//            $query->orWhere(function ($q) use ($user) {
//                $q->where('privacy', 'private')
//                    ->where('creator_id', $user->id);
//            });
//        })->get();
//
//        return response()->json($events);
//    }
//
//
//
//    // Get events joined by the current user
//    public function myEvents()
//    {
//        return Auth::user()->joinedEvents()->with('attendees')->get();
//    }
//}


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\MatchRequest;
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

        if ($event->creator_id === $user->id) {
            return response()->json(['message' => 'You are the event creator.'], 400);
        }

        if (!$event->attendees->contains($user->id)) {
            $event->attendees()->attach($user->id);
            return response()->json(['message' => 'Successfully joined event'], 200);
        }

        return response()->json(['message' => 'Already joined this event'], 200);
    }

    // Get all visible events (public, friends', own private)
    public function index(Request $request)
    {
        $user = auth()->user();

        $events = Event::with('attendees')->where(function ($query) use ($user) {
            $query->where('privacy', 'public');

            $query->orWhere(function ($q) use ($user) {
                $friendIds = MatchRequest::where('status', 'accepted')
                    ->where(function ($matchQuery) use ($user) {
                        $matchQuery->where('sender_id', $user->id)
                            ->orWhere('receiver_id', $user->id);
                    })
                    ->pluck('sender_id')
                    ->merge(
                        MatchRequest::where('status', 'accepted')
                            ->where(function ($matchQuery) use ($user) {
                                $matchQuery->where('sender_id', $user->id)
                                    ->orWhere('receiver_id', $user->id);
                            })->pluck('receiver_id')
                    )
                    ->unique()
                    ->values();

                $q->where('privacy', 'friends')
                    ->whereIn('creator_id', $friendIds);
            });

            $query->orWhere(function ($q) use ($user) {
                $q->where('privacy', 'private')
                    ->where('creator_id', $user->id);
            });
        })->get();

        return response()->json($events);
    }

    // Events user has joined
    public function myEvents()
    {
        return Auth::user()->joinedEvents()->with('attendees')->get();
    }
}
