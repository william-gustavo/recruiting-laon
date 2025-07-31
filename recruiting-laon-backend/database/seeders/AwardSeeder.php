<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Award;

class AwardSeeder extends Seeder
{
    public function run()
    {
        $awards = [
            ['name' => 'Oscar de Melhor Filme'],
            ['name' => 'Oscar de Melhor Diretor'],
            ['name' => 'Oscar de Melhor Ator'],
            ['name' => 'Oscar de Melhor Atriz'],
            ['name' => 'Oscar de Melhor Roteiro Original'],
            ['name' => 'Globo de Ouro de Melhor Filme - Drama'],
            ['name' => 'Critics Choice Award de Melhor Atriz'],
            ['name' => 'Palma de Ouro'],
            ['name' => 'Leão de Ouro'],
            ['name' => 'Oscar de Melhor Ator Coadjuvante'],
            ['name' => 'Oscar de Melhor Cinematografia'],
            ['name' => 'Oscar de Melhor Som'],
            ['name' => 'Indicado ao Oscar de Melhor Filme'],
            ['name' => 'Oscar de Melhor Direção'],
            ['name' => 'Indicado ao Oscar de Melhores Efeitos Visuais'],
            ['name' => 'Oscar de Melhor Trilha Sonora'],
            ['name' => 'Teen Choice Award de Melhor Filme de Terror'],
            ['name' => 'Saturn Award de Melhor Filme de Ação'],
            ['name' => 'Teen Choice Award de Melhor Filme de Ficção Científica'],
            ['name' => 'Oscar de Melhor Filme de Animação'],
            ['name' => 'Oscar de Melhor Design de Produção'],
            ['name' => 'Emmy de Melhor Minissérie'],
            ['name' => 'Globo de Ouro de Melhor Minissérie'],
            ['name' => 'Emmy de Melhor Drama'],
            ['name' => 'Emmy de Melhor Ator'],
            ['name' => 'Emmy de Melhor Ator Coadjuvante'],
            ['name' => 'SAG Award de Melhor Elenco'],
            ['name' => 'Critics Choice Award'],
            ['name' => 'Globo de Ouro de Melhor Série'],
            ['name' => 'Emmy de Melhor Atriz'],
            ['name' => 'Emmy de Melhores Efeitos Visuais'],
            ['name' => 'SAG Award de Melhor Atriz'],
            ['name' => 'Saturn Award de Melhor Série de Fantasia'],
            ['name' => 'Critics Choice Award de Melhor Série de Drama'],
            ['name' => 'Critics Choice Award de Melhor Série'],
            ['name' => 'Writers Guild Award'],
            ['name' => 'Golden Globe de Melhor Atriz'],
            ['name' => 'Golden Globe de Melhor Série'],
            ['name' => 'BAFTA de Melhor Drama'],
            ['name' => 'National Television Award'],
            ['name' => 'Saturn Award de Melhor Série'],
            ['name' => 'NAACP Image Award'],
            ['name' => 'Emmy Internacional'],
            ['name' => 'Premios Iris'],
            ['name' => 'SAG Award de Melhor Ator'],
            ['name' => 'Grimme Award'],
            ['name' => 'German Television Award']
        ];
        
        foreach ($awards as $award) {
            Award::firstOrCreate($award);
        }
    }
}
