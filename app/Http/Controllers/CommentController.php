<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use BeyondCode\Comments\Comment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, string $postId)
    {
        $post = Post::with('user:id,name,avatar')->with('comments')->findOrFail($postId);
        $comments = $post->comments->map(function ($comment) use ($post) {
            return [
                'id' => $comment->id,
                'comment' => $comment->comment,
                'created_at' => $comment->created_at,
                'updated_at' => $comment->updated_at,
                'user_id' => $comment->user_id,
                'user' => User::find($comment->user_id),
                'post' => $post,
            ];
        })->sort(function ($a, $b) use ($request) {
            $aFollowed = $request->user()->followings->contains('followable_id', $a['user_id']);
            $bFollowed = $request->user()->followings->contains('followable_id', $b['user_id']);
            if ($aFollowed && !$bFollowed) {
                return -1;
            } elseif (!$aFollowed && $bFollowed) {
                return 1;
            } else {
                return $b['created_at'] <=> $a['created_at'];
            }
        });        
        $userFollowings = $request->user()->followings()->with('followable')->get();

        return Inertia::render('Dashboard/Comments', [
            'post' => $post,
            'comments' => $comments->values()->all(),
            'userFollowings' => $userFollowings,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $postId): RedirectResponse
    {
        $validated = $request->validate([
            'content' => 'required|string|max:255',
        ]);

        $post = Post::findOrFail($postId);

        $post->comment($validated['content']);

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $commentId): RedirectResponse
    {
        $comment = Comment::findOrFail($commentId);

        Gate::authorize('update', $comment);

        $validated = $request->validate([
            'content' => 'required|string|max:255',
        ]);

        $comment->update([
            'content' => $validated['content']
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $postId, string $commentId): RedirectResponse
    {
        $comment = Comment::findOrFail($commentId);

        Gate::authorize('delete', $comment);

        $post = Post::findOrFail($postId);

        $post->deleteComment($commentId);

        return redirect()->back();
    }
}
