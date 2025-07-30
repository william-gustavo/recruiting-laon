<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function director() {
        return $this->belongsTo(Person::class, 'director_id');
    }

    public function cast() {
        return $this->belongsToMany(Person::class, 'item_person');
    }

    public function genres() {
        return $this->belongsToMany(Genre::class, 'item_genre');
    }

    public function awards() {
        return $this->belongsToMany(Award::class, 'item_award');
    }

    public function ratings() {
        return $this->hasMany(Rating::class);
    }
}