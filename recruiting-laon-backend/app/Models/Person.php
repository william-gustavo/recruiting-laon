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
    public function directedCatalogs()
    {
        return $this->hasMany(Catalog::class, 'director_id');
    }

    /**
     * Define os itens em que esta pessoa atuou (elenco).
     */
    public function catalogsAsCast()
    {
        return $this->belongsToMany(Catalog::class, 'catalog_person');
    }
}
