<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Repuesto;
use Exception;
use Illuminate\Support\Facades\DB;

class RepuestoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $repuesto = Repuesto::with('inventario', 'inventario.establecimiento')->get();;
        return $repuesto;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
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
        $request->validate([
            'nombre_repuesto' => 'required|max:200',
            'descripcion' => 'required|max:250',
            'precio' => 'required|numeric|max:9999999999',
            'cantidad' => 'required|integer|max:100000',
            'marca' => 'required|max:50',
            'imagen' => 'required|image',
            'descuento' => 'required|integer|max:100',
            'empresa_proveedora' => 'required|max:200',
            'inventario_id' => 'required',
        ]); 

        $repuesto = new Repuesto();
        $repuesto->nombre_repuesto = $request->get('nombre_repuesto');
        $repuesto->descripcion = $request->get('descripcion');
        $repuesto->precio = $request->get('precio');
        $repuesto->cantidad = $request->get('cantidad');
        $repuesto->marca = $request->get('marca');

        if ($request->hasFile('imagen')) {
            $file = $request->file('imagen');
            //La parte "d:/Proyectos/IGF/ProductoSoftware" debe sustituirse depediendo adonde tenga el proyecto
            $destino = 'd:/Proyectos/IGF/ProductoSoftware/Cliente/public/imagenes';
            $nombreImagen = time() . '-' . $file->getClientOriginalName();
            $uploadSuccess = $request->file('imagen')->move($destino, $nombreImagen);
            $repuesto->imagen = "./"."imagenes/" . $nombreImagen;
        }

        $repuesto->descuento = $request->get('descuento');
        $repuesto->empresa_proveedora = $request->get('empresa_proveedora');
        $repuesto->inventario_id = $request->get('inventario_id');
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
        $request->validate([
            'nombre_repuesto' => 'required|max:200',
            'descripcion' => 'required|max:250',
            'precio' => 'required|numeric|max:9999999999',
            'cantidad' => 'required|integer|max:100000',
            'marca' => 'required|max:50',
            'imagen' => 'required|image',
            'descuento' => 'required|integer|max:100',
            'empresa_proveedora' => 'required|max:200',
            'inventario_id' => 'required',
        ]);

        $repuesto = Repuesto::findOrFail($request->id);
        $repuesto->nombre_repuesto = $request->get('nombre_repuesto');
        $repuesto->descripcion = $request->get('descripcion');
        $repuesto->precio = $request->get('precio');
        $repuesto->cantidad = $request->get('cantidad');
        $repuesto->marca = $request->get('marca');

        if ($request->hasFile('imagen')) {
            $file = $request->file('imagen');
            $destino = 'imagenesRepuestos/';
            $nombreImagen = time() . '-' . $file->getClientOriginalName();
            $uploadSuccess = $request->file('imagen')->move($destino, $nombreImagen);
            $repuesto->imagen = $destino . $nombreImagen;
        }

        $repuesto->descuento = $request->get('descuento');
        $repuesto->empresa_proveedora = $request->get('empresa_proveedora');
        $repuesto->inventario_id = $request->get('inventario_id');
        $repuesto->save();
        return $repuesto;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $repuesto = Repuesto::destroy($request->id);
        return $repuesto;
    }

    public function obtenerRepuesto(Request $request)
    {
        /* Variables  de request*/
        $sentencia = $request->get('sentencia');
        $condicion = $request->get('condicion');
        $comparacion = $request->get('comparacion');

        /* Validacion de la query */
        try {
            $existencia = DB::table('repuestos')
                ->join('inventarios', 'inventarios.id', '=', 'repuestos.inventario_id')
                ->join('establecimientos', 'establecimientos.id', '=', 'inventarios.establecimiento_id')
                ->join('municipios', 'municipios.id', '=', 'establecimientos.municipio_id')
                ->join('departamentos', 'departamentos.id', '=', 'municipios.departamento_id')
                ->select('repuestos.nombre_repuesto', 'repuestos.descripcion', 'repuestos.precio', 'repuestos.cantidad', 'repuestos.marca', 'repuestos.imagen', 'establecimientos.nombre_establecimiento', 'departamentos.nombre_departamento', 'inventarios.tipo')
                ->where($sentencia, $condicion, $comparacion)
                ->get();
            return $existencia;
        } catch (Exception $e) {
            return $existencia = [];
        }
    }

    public function compararRepuesto(Request $request)
    {
        /* Variables de request */
        $tipo = $request->get('tipo');
        $precio = $request->get('precio');

        /* Validacion de la query */
        try {
            $existencia = DB::table('repuestos')
                ->join('inventarios', 'inventarios.id', '=', 'repuestos.inventario_id')
                ->join('establecimientos', 'establecimientos.id', '=', 'inventarios.establecimiento_id')
                ->join('municipios', 'municipios.id', '=', 'establecimientos.municipio_id')
                ->join('departamentos', 'departamentos.id', '=', 'municipios.departamento_id')
                ->select('repuestos.nombre_repuesto', 'repuestos.descripcion', 'repuestos.precio', 'repuestos.cantidad', 'repuestos.marca', 'repuestos.imagen', 'establecimientos.nombre_establecimiento', 'departamentos.nombre_departamento', 'inventarios.tipo')
                ->where([['repuestos.precio', '<=', $precio], ['inventarios.tipo', '=', $tipo]])
                ->get();
            return $existencia;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function repuestoInventario(Request $request)
    {
        /* Variables */
        $inventario = $request->get('inventario');
        /* Validacion de la query */
        try {
            $existencia = DB::table('repuestos')
                ->join('inventarios', 'inventarios.id', '=', 'repuestos.inventario_id')
                ->select('repuestos.id', 'repuestos.nombre_repuesto', 'repuestos.descripcion', 'repuestos.precio', 'repuestos.cantidad', 'repuestos.marca', 'repuestos.imagen', 'repuestos.descuento', 'repuestos.empresa_proveedora', 'repuestos.inventario_id', 'inventarios.tipo')
                ->where('inventarios.id', '=', $inventario)
                ->get();
            return $existencia;
        } catch (Exception $e) {
            return $e;
        }
    }
}
