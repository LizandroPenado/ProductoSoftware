<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventario;
use App\Models\Establecimiento;
use Exception;
use Illuminate\Support\Facades\DB;

class InventarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $inventarios = Inventario::with('establecimiento')->get(); 
        return $inventarios;
    } 

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $inventario = new Inventario();
        $inventario->tipo = $request->get('tipo');
        $inventario->establecimiento_id = $request->get('establecimiento_id');
        $inventario->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $inventario = Inventario::findOrFail($request->id);
        $inventario->tipo = $request->get('tipo');
        $inventario->establecimiento_id = $request->get('establecimiento_id');
        $inventario->save();
        return $inventario;  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $inventario = Inventario::destroy($request->id);
        return $inventario;
    }

    public function inventarioEstablecimiento(Request $request){
        /* Variables */
        $establecimiento = $request->get('establecimiento');
        /* Validacion de la query */
        try {
            $existencia = DB::table('inventarios')
                ->join('establecimientos', 'establecimientos.id', '=', 'inventarios.establecimiento_id')
                ->select('inventarios.id', 'inventarios.tipo', 'inventarios.establecimiento_id')
                ->where('inventarios.establecimiento_id', '=', $establecimiento)
                ->get();
            return $existencia;
        } catch (Exception $e) {
            return $e;
        }
    }
}
