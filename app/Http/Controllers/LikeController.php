<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, string $postId)
    {
        $post = Post::with('user:id,name,avatar')->with('likers')->findOrFail($postId);
        $post = $request->user()->attachLikeStatus($post);
        $post->likers = $post->likers->sort(function ($a, $b) use ($request) {
            $aFollowed = $request->user()->followings->contains('followable_id', $a->id);
            $bFollowed = $request->user()->followings->contains('followable_id', $b->id);
            if ($aFollowed && !$bFollowed) {
                return -1;
            } elseif (!$aFollowed && $bFollowed) {
                return 1;
            } else {
                return $b->pivot->created_at <=> $a->pivot->created_at;
            }
        });
        
        return Inertia::render('Dashboard/Likes', [
            'post' => $post,
            'userFollowings' => $request->user()->followings()->with('followable')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function store(Request $request, string $postId): RedirectResponse
    {
        $post = Post::findOrFail($postId);

        $request->user()->toggleLike($post);

        return redirect()->back();
    }
}
