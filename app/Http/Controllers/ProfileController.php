<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Post;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile.
     */
    public function index(Request $request, string $userId): Response
    {
        $user = User::findOrFail($userId);
        $posts = Post::with('user:id,name,avatar')->where('user_id', $user->id)->with('likers')->latest()->get();
        $posts = $request->user()->attachLikeStatus($posts);

        return Inertia::render('Profile/Index', [
            'user' => $user,
            'userFollowings' => $request->user()->followings()->with('followable')->get(),
            'countFollowers' => $user->followers()->count(),
            'countFollowings' => $user->followings()->count(),
            'posts' => $posts,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $request->user()->id,
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            if ($request->user()->avatar && Storage::disk('public')->exists($request->user()->avatar))
                Storage::disk('public')->delete($request->user()->avatar);

            $validated['avatar'] = '/storage/'.Storage::disk('public')->put('avatars', $request->file('avatar'));
        } else {
            $validated['avatar'] = $request->user()->avatar;
        }

        $request->user()->fill($validated);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}