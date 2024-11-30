<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, string $postId)
    {
        $post = Post::with('user:id,name,avatar')
            ->with('likers')
            ->findOrFail($postId);

        $post = $request->user()->attachLikeStatus($post);

        $likersQuery = $post->likers()->get();
        
        $page = $request->input('page', 1);
        $perPage = 5; 
        $paginatedLikers = new LengthAwarePaginator(
            $likersQuery->slice(($page - 1) * $perPage, $perPage),
            $likersQuery->count(),
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        $paginatedLikers->getCollection()->sort(function ($a, $b) use ($request) {
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
            'paginatedLikers' => $paginatedLikers->values()->all(),
            'paginationMeta' => [
                'current_page' => $paginatedLikers->currentPage(),
                'total' => $paginatedLikers->lastPage(),
                'per_page' => $paginatedLikers->perPage(),
                'total_items' => $paginatedLikers->total(),
            ],
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
