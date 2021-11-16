<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Establecimiento;
use Illuminate\Support\Facades\DB;

class EstablecimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $establecimientos = Establecimiento::with('municipio', 'municipio.departamento')->get(); 
        return $establecimientos;
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
        $establecimientos = new Establecimiento();
        $establecimientos->nombre_establecimiento = $request->get('nombre_establecimiento');
        $establecimientos->telefono = $request->get('telefono');
        $establecimientos->encargado = $request->get('encargado');
        $establecimientos->direccion = $request->get('direccion');
        $establecimientos->municipio_id = $request->get('municipio_id');
        $establecimientos->save();
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
        $establecimiento = Establecimiento::findOrFail($request->id);
        $establecimiento->nombre_establecimiento = $request->get('nombre_establecimiento');
        $establecimiento->telefono = $request->get('telefono');
        $establecimiento->encargado = $request->get('encargado');
        $establecimiento->direccion = $request->get('direccion');
        $establecimiento->municipio_id = $request->get('municipio_id');
        $establecimiento->save();
        return $establecimiento;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $establecimiento = Establecimiento::destroy($request->id);
        return $establecimiento;
    }

    /* public function establecimientoUsuario(Request $request){
        $usuario = $request->get('usuario');

        $existencia = DB::table('establecimientos')
            ->join('usuarios', 'usuarios.id', '=', 'establecimientos.usuario_id')
            ->where('establecimientos.usuario_id', '=', $usuario)
            ->get();

        return $existencia;
    } */
}
