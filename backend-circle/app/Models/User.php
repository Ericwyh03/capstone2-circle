<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'bio',
        'profile_image',
        'institution_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password'          => 'hashed',
    ];

    /* JWT */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function interests()
    {
        return $this->belongsToMany(Interest::class, 'user_interests');
    }

    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }

    // Users who I’ve sent requests to
    public function sentMatchRequests()
    {
        return $this->hasMany(MatchRequest::class, 'sender_id');
    }

// Users who sent requests to me
    public function receivedMatchRequests()
    {
        return $this->hasMany(MatchRequest::class, 'receiver_id');
    }

    public function joinedEvents()
    {
        return $this->belongsToMany(Event::class, 'user_event')
            ->withTimestamps()
            ->withPivot('joined_at');
    }


}
