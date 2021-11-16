<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repuesto extends Model
{
    use HasFactory;
    protected $fillable = ['id_repuesto', 'nombre_repuesto', 'descripcion', 'precio', 'cantidad', 'marca', 'imagen', 'descuento', 'empresa_proveedora', 'inventario_id'];

    public function inventario(){
        return $this->belongsTo('App\Models\Inventario');
    }
    public function establecimiento(){
        return $this->belongsTo('App\Models\Establecimiento');
    }
}
