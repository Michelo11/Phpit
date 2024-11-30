<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class FollowerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, string $userId)
    {
        $user = User::findOrFail($userId);

        $followersQuery = $user->followers()->get();

        $page = $request->input('page', 1);
        $perPage = 5;
        $paginatedFollowers = new LengthAwarePaginator(
            $followersQuery->slice(($page - 1) * $perPage, $perPage),
            $followersQuery->count(),
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        $userFollowings = $request->user()->followings()->with('followable')->get();

        return Inertia::render('Profile/Followers', [
            'user' => $user,
            'userFollowings' => $userFollowings,
            'followers' => $paginatedFollowers->values()->all(),
            'paginationMeta' => [
                'current_page' => $paginatedFollowers->currentPage(),
                'total' => $paginatedFollowers->lastPage(),
                'per_page' => $paginatedFollowers->perPage(),
                'total_items' => $paginatedFollowers->total(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $userId): RedirectResponse
    {
        $user = User::findOrFail($userId);

        $request->user()->toggleFollow($user);

        return Redirect::back();
    }
}
