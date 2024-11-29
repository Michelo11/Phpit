<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

        return Inertia::render('Profile/Followers', [
            'user' => $user,
            'userFollowings' => $request->user()->followings()->with('followable')->get(),
            'followers' => $user->followers()->get(),
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
