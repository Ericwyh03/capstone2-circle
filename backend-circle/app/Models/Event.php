<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'creator_id',
        'name',
        'description',
        'start_time',
        'end_time',
        'location',
    ];

    // Relationship: Event creator
    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    // Relationship: Users who joined the event
    public function attendees()
    {
        return $this->belongsToMany(User::class, 'event_user', 'event_id', 'user_id')->withTimestamps();
    }
}
