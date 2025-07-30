<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
  public function register(Request $request)
  {
      $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        'password' => [
          'required',
          'string',
          Password::min(8)
                  ->letters()
                  ->numbers()
        ],
      ]);

      $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
      ]);

      $token = $user->createToken('auth_token')->plainTextToken;

      return response()->json([
        'message' => 'Usuário registrado com sucesso',
        'user' => $user,
        'token' => $token,
      ], 201);
  }

  public function login(Request $request)
  {
    $request->validate([
      'email' => 'required|email',
      'password' => 'required',
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
      return response()->json([
        'message' => 'Email ou senha inválidos. Por favor, tente novamente.'
      ], 401);
    }

    $user = User::where('email', $request->email)->firstOrFail();
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
      'message' => 'Login realizado com sucesso',
      'user' => $user,
      'token' => $token,
    ]);
  }

  public function logout(Request $request)
  {
    $token = PersonalAccessToken::findToken($request->bearerToken());
    if ($token) {
      $token->delete();
    }

    return response()->json([
      'message' => 'Logout realizado com sucesso'
    ]);
  }

  public function user(Request $request)
  {
    return response()->json($request->user());
  }
}