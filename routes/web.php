<?php

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

Route::middleware('auth')->group(function () {
    Route::get('/profile/{id}', [ProfileController::class, 'view'])->name('profile.view');
    Route::post('/profile/{id}', [ProfileController::class, 'toggleFollow'])->name('profile.toggleFollow');
    Route::get('/profile/{id}/followers', [ProfileController::class, 'followers'])->name('profile.followers');
    Route::get('/profile/{id}/followings', [ProfileController::class, 'followings'])->name('profile.followings');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('posts', PostController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::post('/posts/{id}/toggleLike', [PostController::class, 'toggleLike'])->name('posts.toggleLike')->middleware(['auth', 'verified']);
Route::get('/posts/{id}/likes', [PostController::class, 'view'])->name('posts.view')->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';