<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Define o item ao qual esta avaliação pertence.
     */
    public function catalogs()
    {
        return $this->belongsTo(Catalog::class);
    }
}
