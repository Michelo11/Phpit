<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $notifications = $request->user()->notifications()->get();

        $page = $request->input('page', 1);
        $perPage = 5;
        $paginatedNotifications = new LengthAwarePaginator(
            $notifications->slice(($page - 1) * $perPage, $perPage),
            $notifications->count(),
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        return Inertia::render('Notifications/Index', [
            'notifications' => $notifications,
            'paginationMeta' => [
                'current_page' => $paginatedNotifications->currentPage(),
                'total' => $paginatedNotifications->lastPage(),
                'per_page' => $paginatedNotifications->perPage(),
                'total_items' => $paginatedNotifications->total(),
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $notificationId)
    {
        $request->user()->notifications()->where('id', $notificationId)->delete();

        return redirect()->back();
    }
}