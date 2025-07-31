<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Catalog extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function director() {
        return $this->belongsTo(Person::class, 'director_id');
    }

    public function cast() {
        return $this->belongsToMany(Person::class, 'catalog_person');
    }

    public function genres() {
        return $this->belongsToMany(Genre::class, 'catalog_genre');
    }

    public function awards() {
        return $this->belongsToMany(Award::class, 'catalog_award');
    }

    public function ratings() {
        return $this->hasMany(Rating::class);
    }
}