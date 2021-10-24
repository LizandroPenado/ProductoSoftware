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
URL para Gestionar inventario
Route::get('/inventarios', 'App\Http\Controllers\InventarioController@index'); 
Route::post('/inventarios', 'App\Http\Controllers\InventarioController@store'); 
Route::put('/inventarios/{id}', 'App\Http\Controllers\InventarioController@update'); 
Route::delete('/inventarios/{id}', 'App\Http\Controllers\InventarioController@destroy'); 

URL para Gestionar Establecimiento
Route::get('/establecimientos', 'App\Http\Controllers\EstablecimientoController@index'); 
Route::post('/establecimientos', 'App\Http\Controllers\EstablecimientoController@store'); 
Route::put('/establecimientos/{id}', 'App\Http\Controllers\EstablecimientoController@update'); 
Route::delete('/establecimientos/{id}', 'App\Http\Controllers\EstablecimientoController@destroy');

URL para Gestionar Repuestos
Route::get('/repuestos', 'App\Http\Controllers\RepuestoController@index'); 
Route::post('/repuestos', 'App\Http\Controllers\RepuestoController@store'); 
Route::put('/repuestos/{id}', 'App\Http\Controllers\RepuestoController@update'); 
Route::delete('/repuestos/{id}', 'App\Http\Controllers\RepuestoController@destroy');
*/