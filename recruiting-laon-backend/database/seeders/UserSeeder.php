<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'João Silva',
            'email' => 'joao@exemplo.com',
            'password' => Hash::make('123456'),
            'is_active' => true
        ]);
    }
}