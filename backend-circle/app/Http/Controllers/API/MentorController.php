<?php
//
//// app/Http/Controllers/MentorController.php
//namespace App\Http\Controllers\API;
//
//use App\Http\Controllers\Controller;
//use App\Models\Institution;
//use App\Models\Mentor;
//use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Auth;
//
//class MentorController extends Controller
//{
//    public function store(Request $request)
//    {
//        $user = auth()->user();
//
//        $validated = $request->validate([
//            'club' => 'nullable|string|max:255',
//            'mentoring_areas' => 'required|string|max:1000',
//        ]);
//
//        $mentor = Mentor::create([
//            'user_id' => $user->id,
//            'institution_id' => $user->institution_id, // Correctly linked
//            'club' => $validated['club'] ?? null,
//            'expertise' => $validated['mentoring_areas'],
//        ]);
//
//        return response()->json($mentor->load('user', 'institution'), 201);
//    }
//
//
//
//    public function index()
//{
//return response()->json(Mentor::with('user', 'institution')->get());
//}
//
//public function show($id)
//{
//return response()->json(Mentor::with('user')->findOrFail($id));
//}
//    public function getInstitutions()
//    {
//        $institutions = Institution::select('id', 'name')->distinct()->get();
//        return response()->json($institutions);
//    }
//}


namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use App\Models\Mentor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MentorController extends Controller
{
    public function store(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'club' => 'nullable|string|max:255',
            'mentoring_areas' => 'required|string|max:1000',
        ]);

        $mentor = Mentor::create([
            'user_id' => $user->id,
            'institution_id' => $user->institution_id ?? null,
            'club' => $validated['club'] ?? null,
            'expertise' => $validated['mentoring_areas'],
        ]);

        return response()->json($mentor->load('user', 'institution'), 201);
    }

    public function index()
    {
        return response()->json(Mentor::with('user', 'institution')->get());
    }

    public function show($id)
    {
        return response()->json(Mentor::with('user')->findOrFail($id));
    }

    public function getInstitutions()
    {
        $institutions = Institution::select('id', 'name')->distinct()->get();
        return response()->json($institutions);
    }
}
