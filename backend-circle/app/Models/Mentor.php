<?php
// app/Models/Mentor.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mentor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'institution_id',
        'club',
        'expertise',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
    // Mentor.php
    public function institution()
    {
        return $this->belongsTo(Institution::class, 'institution_id');
    }

}
