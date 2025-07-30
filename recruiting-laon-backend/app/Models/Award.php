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
    public function items()
    {
        return $this->belongsToMany(Item::class, 'item_award');
    }
}
