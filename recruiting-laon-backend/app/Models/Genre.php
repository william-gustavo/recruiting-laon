<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Define os itens (filmes/séries) que pertencem a este gênero.
     */
    public function catalogs()
    {
        return $this->belongsToMany(Catalog::class, 'catalog_genre');
    }
}