<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\FollowingController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect('/posts');
    }

    return redirect('/login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile/{id}', [ProfileController::class, 'index'])->name('profile.index');
    Route::post('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('posts', PostController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('posts/{id}/comments', CommentController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

Route::resource('posts/{id}/likes', LikeController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

Route::resource('profile/{id}/followers', FollowerController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

Route::resource('profile/{id}/followings', FollowingController::class)
    ->only(['index'])
    ->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';