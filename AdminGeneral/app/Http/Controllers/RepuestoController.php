<?php

namespace App\Http\Controllers;

use App\Models\Repuestos;
use Illuminate\Http\Request;

class RepuestoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $repuestos = Repuestos::all();
        return $repuestos;
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
        $repuesto = new Repuestos();
        $repuesto->nombre =  $request->nombre;
        $repuesto->clasificacion =  $request->clasificacion;
        $repuesto->descripcion =  $request->descripcion;
        $repuesto->precio =  $request->precio;
        $repuesto->cantidad =  $request->cantidad;
        $repuesto->marca =  $request->marca;

        $repuesto->save();
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
        $repuesto = Repuestos::findOrFail($request->id);
        $repuesto->nombre =  $request->nombre;
        $repuesto->clasificacion =  $request->clasificacion;
        $repuesto->descripcion =  $request->descripcion;
        $repuesto->precio =  $request->precio;
        $repuesto->cantidad =  $request->cantidad;
        $repuesto->marca =  $request->marca;

        $repuesto->save();
        return $repuesto;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($request)
    {
        $repuesto = Repuestos::destroy($request->id);
        return $repuesto;
    }
}
