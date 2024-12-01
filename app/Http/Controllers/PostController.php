<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Notifications\UserNotification;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
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
        $userFollowings = $request->user()->followings()->with('followable')->get();

        $allPosts = Post::with(['user:id,name,avatar', 'likers', 'comments'])
            ->latest()
            ->get();
        
        $allPosts = $request->user()->attachLikeStatus($allPosts);

        $sortedPosts = $allPosts->sort(function ($a, $b) use ($userFollowings) {
            $aFollowed = $userFollowings->contains('followable_id', $a->user_id);
            $bFollowed = $userFollowings->contains('followable_id', $b->user_id);
            
            if ($aFollowed && !$bFollowed) {
                return -1;
            } elseif (!$aFollowed && $bFollowed) {
                return 1;
            } else {
                return $b->created_at <=> $a->created_at;
            }
        });

        $page = $request->input('page', 1);
        $perPage = 5;
        $paginatedPosts = new LengthAwarePaginator(
            $sortedPosts->slice(($page - 1) * $perPage, $perPage),
            $sortedPosts->count(),
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        $recentUsers = User::where('id', '!=', $request->user()->id)
            ->whereNotIn('id', $request->user()->followings()->pluck('followable_id'))
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard/Index', [
            'posts' => $paginatedPosts->values()->all(),
            'recentUsers' => $recentUsers,
            'userFollowings' => $userFollowings,
            'paginationMeta' => [
                'current_page' => $paginatedPosts->currentPage(),
                'total' => $paginatedPosts->lastPage(),
                'per_page' => $paginatedPosts->perPage(),
                'total_items' => $paginatedPosts->total(),
            ],
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

        $post = $request->user()->posts()->create($validated);

        $followers = $request->user()->followers;
        foreach ($followers as $follower) {
            $follower->notify(new UserNotification('new_post', [
                'user_name' => $request->user()->name,
                'post_id' => $post->id,
            ]));
        }

        return redirect()->back();
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
}