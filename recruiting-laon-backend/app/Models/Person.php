<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Define os itens que esta pessoa dirigiu.
     */
    public function directedItems()
    {
        return $this->hasMany(Item::class, 'director_id');
    }

    /**
     * Define os itens em que esta pessoa atuou (elenco).
     */
    public function itemsAsCast()
    {
        return $this->belongsToMany(Item::class, 'item_person');
    }
}
