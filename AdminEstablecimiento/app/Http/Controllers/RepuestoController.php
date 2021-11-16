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

        /* $texto=trim($request->get('texto'));

        $tipo=trim($request->get('tipo'));

       
       $repuestos = Repuesto::buscarpor($tipo,$texto);
        
       return view('articulo.index')->with('articulos', $repuestos);  */
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
        $repuesto = new Repuesto();
        $repuesto->nombre_repuesto = $request->get('nombre_repuesto');
        $repuesto->descripcion = $request->get('descripcion');
        $repuesto->precio = $request->get('precio');
        $repuesto->cantidad = $request->get('cantidad');
        $repuesto->marca = $request->get('marca');
        $repuesto->imagen = $request->get('imagen');
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
        $repuesto = Repuesto::findOrFail($request->id);
        $repuesto->nombre_repuesto = $request->get('nombre_repuesto');
        $repuesto->descripcion = $request->get('descripcion');
        $repuesto->precio = $request->get('precio');
        $repuesto->cantidad = $request->get('cantidad');
        $repuesto->marca = $request->get('marca');
        $repuesto->imagen = $request->get('imagen');
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
        /* Variables */
        $filtrado = $request->get('filtrado');
        $busqueda = $request->get('busqueda');
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
        } else if ($filtrado == "todo") {
            $sentencia = 'repuestos';
            $condicion = 'LIKE';
            $comparacion = '%' . $busqueda . '%';
        } else if ($filtrado != "" && $busqueda != "") {
            $sentencia = 'repuestos.' . $filtrado;
            $condicion = 'LIKE';
            $comparacion = '%' . $busqueda . '%';
        }

        if ($filtrado == "nombre_departamento") {
            $existencia = DB::table('repuestos')
                ->join('inventarios', 'inventarios.id', '=', 'repuestos.inventario_id')
                ->join('establecimientos', 'establecimientos.id', '=', 'inventarios.establecimiento_id')
                ->join('municipios', 'municipios.id', '=', 'establecimientos.municipio_id')
                ->join('departamentos', 'departamentos.id', '=', 'municipios.departamento_id')
                ->select('repuestos.nombre_repuesto', 'repuestos.descripcion', 'repuestos.precio', 'repuestos.cantidad', 'repuestos.marca', 'repuestos.imagen', 'establecimientos.nombre_establecimiento')
                ->where('departamentos.nombre_departamento', 'LIKE', '%' . $busqueda . '%')
                ->get();
            return $existencia;
        }

        /* Validacion de la query */
        try {
            $existencia = DB::table('repuestos')
                ->join('inventarios', 'inventarios.id', '=', 'repuestos.inventario_id')
                ->join('establecimientos', 'establecimientos.id', '=', 'inventarios.establecimiento_id')
                ->select('repuestos.nombre_repuesto', 'repuestos.descripcion', 'repuestos.precio', 'repuestos.cantidad', 'repuestos.marca', 'repuestos.imagen', 'establecimientos.nombre_establecimiento')
                ->where($sentencia, $condicion, $comparacion)
                ->get();
            return $existencia;
        } catch (Exception $e) {
            return $existencia = [];
        }
    }
}
