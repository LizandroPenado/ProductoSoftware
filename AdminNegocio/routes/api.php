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

//Ejemplos para rutas
/* 
URL Buscar Repuesto
Route::get('/repuestos', 'App\Http\Controllers\RepuestoController@index');
Route::post('/repuestos', 'App\Http\Controllers\RepuestoController@store'); 
Route::put('/repuestos/{id}', 'App\Http\Controllers\RepuestoController@update'); 
Route::delete('/repuestos/{id}', 'App\Http\Controllers\RepuestoController@destroy');  

URL Comparar Precio

URL Contactar Establecimiento

*/

//Departamentos
Route::get('/departamentos', 'App\Http\Controllers\DepartamentoController@index'); 

//Municipios
Route::get('/municipios', 'App\Http\Controllers\MunicipioController@index'); 
Route::get('/municipios/departamentos', 'App\Http\Controllers\MunicipioController@filtroDepartamento'); 