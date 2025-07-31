<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Award extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Define os itens que ganharam este prêmio.
     */
    public function catalogs()
    {
        return $this->belongsToMany(Catalog::class, 'catalog_award');
    }
}
