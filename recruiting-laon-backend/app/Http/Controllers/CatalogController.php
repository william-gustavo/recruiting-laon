<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Catalog;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    /**
     * Exibe uma lista de itens do catálogo.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $request->validate([
            'type' => 'sometimes|in:movie,series',
            'limit' => 'sometimes|integer|min:1|max:50',
        ]);
        
        $query = Catalog::query();

        if ($request->has('type')) {
            $query->where('type', $request->input('type'));
        }

        $limit = $request->input('limit', 50);

        $catalog = $query->latest()->take($limit)->get();

        return response()->json($catalog);
    }

    /**
     * Exibe os detalhes de um item específico do catálogo com todos os seus relacionamentos.
     *
     * @param  \App\Models\Catalog  $catalog
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Catalog $catalog)
    {
        // Carrega o item com todos os seus relacionamentos definidos no Model
        $catalog->load([
            'director', // Relacionamento belongsTo
            'cast',     // Relacionamento belongsToMany
            'genres',   // Relacionamento belongsToMany
            'awards',   // Relacionamento belongsToMany
            'ratings'   // Relacionamento hasMany
        ]);

        // Retorna o item completo com todos os dados aninhados
        return response()->json($catalog);
    }
}
