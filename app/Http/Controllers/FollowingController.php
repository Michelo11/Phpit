<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FollowingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, string $userId)
    {
        $user = User::findOrFail($userId);

        return Inertia::render('Profile/Followings', [
            'user' => $user,
            'followings' => $user->followings()->with('followable')->get(),
            'userFollowings' => $request->user()->followings()->with('followable')->get(),
        ]);
    }
}
