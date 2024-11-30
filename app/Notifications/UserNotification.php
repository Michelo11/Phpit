<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class UserNotification extends Notification
{
    use Queueable;

    protected $type;
    protected $data;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $type, array $data)
    {
        $this->type = $type;
        $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        switch ($this->type) {
            case 'new_follower':
                return [
                    'message' => "{$this->data['follower_name']} started following you.",
                    'type' => 'follower',
                ];

            case 'new_like':
                return [
                    'message' => "{$this->data['user_name']} liked your post.",
                    'type' => 'like',
                ];

            case 'new_comment':
                return [
                    'message' => "{$this->data['user_name']} commented on your post.",
                    'type' => 'comment',
                ];

            case 'new_post':
                return [
                    'message' => "{$this->data['user_name']} published a new post.",
                    'type' => 'post',
                ];

            default:
                return [];
        }
    }
}