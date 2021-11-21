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
        $request->validate([
            'nombre_repuesto' => 'required|max:200',
            'descripcion' => 'required|max:250',
            'precio' => 'required|numeric|max:13',
            'cantidad' => 'required|integer',
            'marca' => 'required|max:50',
            'imagen' => 'required|image',
            'descuento' => 'required|integer',
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
            $destino = 'imagenesRepuestos/';
            $nombreImagen = $file->getClientOriginalName(); //El nombre con el que se guardaran las imagenes
            $uploadSuccess = $request->file('imagen')->move($destino, $nombreImagen);
            $repuesto->imagen = $destino . $nombreImagen;
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
            'precio' => 'required|max:13',
            'cantidad' => 'required|integer',
            'marca' => 'required|max:50',
            'imagen' => 'required|file|size:5120',
            'descuento' => 'required|integer',
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
            $nombreImagen = time() . '-' . $file->getClientOriginalName(); //El nombre con el que se guardaran las imagenes
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
        /* Variables */
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
