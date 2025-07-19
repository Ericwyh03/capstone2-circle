<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use Illuminate\Http\Request;

class InstitutionController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->query('query', '');
        $results = Institution::where('name', 'LIKE', '%' . $query . '%')->get(['id', 'name']);

        return response()->json($results);
    }
}
