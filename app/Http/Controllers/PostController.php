<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Dashboard/Index', [
            'posts' => Post::with('user:id,name')->latest()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $valitated = $request->validate([
            'title' => 'required|string|max:50',
            'content' => 'required|string|max:255',
        ]);
        $request->user()->posts()->create($valitated);

        return redirect()->route('posts.index');
    }

    public function update (Request $request, Post $post): RedirectResponse
    {
        Gate::authorize('update', $post);

        $valitated = $request->validate([
            'title' => 'required|string|max:50',
            'content' => 'required|string|max:255',
        ]);
        $post->update($valitated);

        return redirect()->route('posts.index');
    }
}
