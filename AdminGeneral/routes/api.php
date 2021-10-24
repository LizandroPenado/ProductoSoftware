<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/* 
URL para Gestionar Usuarios
Route::get('/usuarios', 'App\Http\Controllers\UsuarioController@index');
Route::post('/usuarios', 'App\Http\Controllers\UsuarioController@store'); 
Route::put('/usuarios/{id}', 'App\Http\Controllers\UsuarioController@update'); 
Route::delete('/usuarios/{id}', 'App\Http\Controllers\UsuarioController@destroy');  

URL para Gestionar Roles
Route::get('/roles', 'App\Http\Controllers\RolController@index');
Route::post('/roles', 'App\Http\Controllers\RolController@store'); 
Route::put('/roles/{id}', 'App\Http\Controllers\RolController@update'); 
Route::delete('/roles/{id}', 'App\Http\Controllers\RolController@destroy')
*/