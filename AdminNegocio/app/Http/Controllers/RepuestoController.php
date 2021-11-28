<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Repuesto;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class RepuestoController extends Controller
{
    public function obtenerRepuesto(Request $request)
    {
        // Variables de request
        $filtrado = $request->get('filtrado');
        $busqueda = $request->get('busqueda');
        $url = $request->get('url');
        // Variables de proceso
        $sentencia = "";
        $condicion = "";
        $comparacion = "";

        /* Condicional para crear la query dependiendo del filtro seleccionado */
        if ($filtrado == "precio" && (float)$busqueda > 0) {
            $sentencia = 'repuestos.' . $filtrado;
            $condicion = '<=';
            $comparacion = $busqueda;
        } else  if ($filtrado == "nombre_establecimiento") {
            $sentencia = 'establecimientos.nombre_establecimiento';
            $condicion = 'LIKE';
            $comparacion = '%' . $busqueda . '%';
        } else if ($filtrado == "nombre_departamento") {
            $sentencia = 'departamentos.nombre_departamento';
            $condicion = 'LIKE';
            $comparacion = '%' . $busqueda . '%';
        } else if ($filtrado == "todo") {
            $sentencia = 'repuestos';
            $condicion = 'LIKE';
            $comparacion = '%' . $busqueda . '%';
        } else if ($filtrado == "tipo") {
            $sentencia = 'inventarios.' . $filtrado;
            $condicion = 'LIKE';
            $comparacion = '%' . $busqueda . '%';
        } else {
            $sentencia = 'repuestos.' . $filtrado;
            $condicion = 'LIKE';
            $comparacion = '%' . $busqueda . '%';
        }

        //Aqui deberia ser iterativo por la url, para buscar en los diferentes establecimientos
        $existencia = Http::get("http://127.0.0.1:8004/api/repuestos/mostrar/", [
            'sentencia' => $sentencia,
            'condicion' => $condicion,
            'comparacion' => $comparacion,
        ]);
        return $existencia->json();
    }

    public function compararRepuesto(Request $request)
    {
        /* Variables */
        $tipo = $request->get('tipo');
        $precio = $request->get('precio');

        $existencia = Http::get("http://127.0.0.1:8004/api/repuestos/comparar/", [
            'tipo' => $tipo,
            'precio' => $precio,
        ]);
        return $existencia->json();
    }
}