<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;
use App\Models\Genre;
use App\Models\Person;
use App\Models\Award;
use App\Models\Rating;

class ItemSeeder extends Seeder
{
    public function run()
    {
        // Pega todos os dados das tabelas relacionadas para evitar múltiplas queries
        $genres = Genre::all();
        $people = Person::all();
        $awards = Award::all();

        // --- SEEDER DE FILMES (20 exemplos) ---
        $movies = [
            [
                'title' => 'Bela Vingança', 'original_title' => 'Promising Young Woman', 'year' => 2020, 'duration' => '1h 53min',
                'synopsis' => 'Nada na vida de Cassie é o que parece ser. Ela é perversamente inteligente, tentadoramente astuta e vive uma vida dupla secreta à noite.',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/aMFl4wOPhJ0K6j2g4nI8DxC2so.jpg',
                'director' => 'Emerald Fennell',
                'cast' => ['Carey Mulligan', 'Bo Burnham'],
                'genres' => ['Drama', 'Crime', 'Thriller'],
                'awards' => ['Oscar de Melhor Roteiro Original', 'Critics Choice Award de Melhor Atriz'],
                'ratings' => [['source' => 'IMDb', 'score' => '7.5']],
                'is_popular' => true,
            ],
            [
                'title' => 'Coringa', 'original_title' => 'Joker', 'year' => 2019, 'duration' => '2h 2min',
                'synopsis' => 'Em Gotham City, o comediante Arthur Fleck é ignorado pela sociedade. Ele embarca em uma espiral de loucura e crime.',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/h0i1QPSwb3K2zZv2d3P87i2a4I.jpg',
                'director' => 'Todd Phillips',
                'cast' => ['Joaquin Phoenix'],
                'genres' => ['Drama', 'Crime', 'Thriller'],
                'awards' => ['Oscar de Melhor Ator'],
                'ratings' => [['source' => 'IMDb', 'score' => '8.4']],
                'is_popular' => true,
            ],
            // Adicione mais 18 filmes aqui...
            // Exemplo de mais um:
            [
                'title' => 'Um Lugar Silencioso', 'original_title' => 'A Quiet Place', 'year' => 2018, 'duration' => '1h 30min',
                'synopsis' => 'Uma família deve viver em silêncio para evitar criaturas misteriosas que caçam pelo som.',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/2h0sC1CniBw4t1iP2gB2aJc3Pnf.jpg',
                'director' => 'John Krasinski',
                'cast' => ['Emily Blunt', 'John Krasinski'],
                'genres' => ['Terror', 'Ficção Científica', 'Drama'],
                'awards' => [],
                'ratings' => [['source' => 'IMDb', 'score' => '7.5']],
                'is_popular' => true,
            ],
        ];

        // --- SEEDER DE SÉRIES (20 exemplos ) ---
        $series = [
            [
                'title' => 'Ozark', 'original_title' => 'Ozark', 'year' => 2017, 'duration' => '4 temporadas',
                'synopsis' => 'Um consultor financeiro arrasta sua família de Chicago para os Ozarks do Missouri, onde ele deve lavar dinheiro para um cartel de drogas.',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/t3qBfcY2Q8mrT3A4nC1rLVkY2dG.jpg',
                'director' => null, // Séries podem não ter um único diretor
                'cast' => ['Jason Bateman', 'Laura Linney'],
                'genres' => ['Drama', 'Crime', 'Thriller'],
                'awards' => [],
                'ratings' => [['source' => 'IMDb', 'score' => '8.4']],
                'is_popular' => true,
            ],
            [
                'title' => 'Chernobyl', 'original_title' => 'Chernobyl', 'year' => 2019, 'duration' => '1 temporada',
                'synopsis' => 'Em abril de 1986, uma explosão na usina nuclear de Chernobyl, na Ucrânia, se torna um dos piores desastres humanos da história.',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/hlLswgD4Gsbha2a5f4l1aXn363I.jpg',
                'director' => null,
                'cast' => ['Jared Harris', 'Stellan Skarsgård', 'Emily Blunt'],
                'genres' => ['Drama', 'História'],
                'awards' => ['Globo de Ouro de Melhor Filme - Drama'],
                'ratings' => [['source' => 'IMDb', 'score' => '9.4']],
                'is_popular' => true,
            ],
            // Adicione mais 18 séries aqui...
        ];

        // Processa os filmes
        foreach ($movies as $movieData ) {
            $this->createItem($movieData, 'movie', $genres, $people, $awards);
        }

        // Processa as séries
        foreach ($series as $serieData) {
            $this->createItem($serieData, 'series', $genres, $people, $awards);
        }
    }

    /**
     * Função auxiliar para criar um item e seus relacionamentos
     */
    private function createItem(array $data, string $type, $genres, $people, $awards)
    {
        // Encontra o ID do diretor
        $directorId = $data['director'] ? $people->where('name', $data['director'])->first()->id : null;

        // Cria o item no banco
        $item = Item::create([
            'type' => $type,
            'title' => $data['title'],
            'original_title' => $data['original_title'],
            'year' => $data['year'],
            'duration' => $data['duration'],
            'synopsis' => $data['synopsis'],
            'poster_url' => $data['poster_url'],
            'director_id' => $directorId,
            'is_popular' => $data['is_popular'] ?? false,
        ]);

        // Associa os gêneros
        $genreIds = $genres->whereIn('name', $data['genres'])->pluck('id');
        $item->genres()->attach($genreIds);

        // Associa o elenco
        $castIds = $people->whereIn('name', $data['cast'])->pluck('id');
        $item->cast()->attach($castIds); // Supondo que a relação se chame 'cast' no Model

        // Associa os prêmios
        $awardIds = $awards->whereIn('name', $data['awards'])->pluck('id');
        $item->awards()->attach($awardIds);

        // Cria as avaliações
        foreach ($data['ratings'] as $ratingData) {
            Rating::create([
                'item_id' => $item->id,
                'source' => $ratingData['source'],
                'score' => $ratingData['score'],
            ]);
        }
    }
}
