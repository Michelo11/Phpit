<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;

class FollowingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, string $userId)
    {
        $user = User::findOrFail($userId);

        $followingsQuery = $user->followings()->with('followable')->get();

        $page = $request->input('page', 1);
        $perPage = 5;
        $paginatedFollowings = new LengthAwarePaginator(
            $followingsQuery->slice(($page - 1) * $perPage, $perPage),
            $followingsQuery->count(),
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        $userFollowings = $request->user()->followings()->with('followable')->get();

        return Inertia::render('Profile/Followings', [
            'user' => $user,
            'followings' => $paginatedFollowings->values()->all(),
            'userFollowings' => $userFollowings,
            'paginationMeta' => [
                'current_page' => $paginatedFollowings->currentPage(),
                'total' => $paginatedFollowings->lastPage(),
                'per_page' => $paginatedFollowings->perPage(),
                'total_items' => $paginatedFollowings->total(),
            ],
        ]);
    }
}
