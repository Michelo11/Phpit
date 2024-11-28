<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        // add also a count of likers
        $posts = Post::with('user:id,name,avatar')->with('likers')->latest()->get();
        $posts = $posts->sortBy(function ($post) use ($request) {
            return $request->user()->followers->contains($post->user);
        }, SORT_REGULAR, true);
        $posts = $posts->values()->all();
        $posts = $request->user()->attachLikeStatus($posts);

        return Inertia::render('Dashboard/Index', [
            'posts' => $posts,
            'recentUsers' => User::where('id', '!=', $request->user()->id)->whereNotIn('id', $request->user()->followings()
                ->pluck('followable_id'))->latest()->limit(5)->get(),
            'userFollowings' => $request->user()->followings()->with('followable')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:50',
            'content' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = Storage::disk('public')->put('images', $request->file('image'));
        }

        $request->user()->posts()->create($validated);

        return redirect()->route('posts.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update (Request $request, Post $post): RedirectResponse
    {
        Gate::authorize('update', $post);

        $validated = $request->validate([
            'title' => 'nullable|string|max:50',
            'content' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($post->image)
                Storage::disk('public')->delete($post->image);

            $validated['image'] = Storage::disk('public')->put('images', $request->file('image'));
        } else {
            $validated['image'] = $post->image;
        }

        $post->update($validated);
 
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): RedirectResponse
    {
        Gate::authorize('delete', $post);

        if ($post->image)
            Storage::disk('public')->delete($post->image);

        $post->delete();

        return redirect()->back();
    }

    /**
     * Like or unlike the specified resource.
     */
    public function toggleLike(Request $request, string $postId): RedirectResponse
    {
        $post = Post::findOrFail($postId);

        $request->user()->toggleLike($post);

        return redirect()->back();
    }

    public function view(Request $request, string $postId): Response
    {
        $post = Post::with('user:id,name,avatar')->with('likers')->findOrFail($postId);
        $post = $request->user()->attachLikeStatus($post);
        
        return Inertia::render('Dashboard/Likes', [
            'post' => $post,
            'userFollowings' => $request->user()->followings()->with('followable')->get(),
        ]);
    }
}
