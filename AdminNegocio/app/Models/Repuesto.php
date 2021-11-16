<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repuesto extends Model
{
    use HasFactory;
    protected $fillable = ['id_repuesto', 'nombre_repuesto', 'descripcion', 'precio', 'cantidad', 'marca', 'imagen', 'descuento', 'empresa_proveedora', 'inventario_id'];

    /* public function scopebuscarpor($query,$tipo,$texto){

        if(($tipo)&&($texto))
        {
            return $query->where($tipo,'LIKE','%'.$texto.'%')->get();
        }
        return $query->select('id','nombre','descripcion','precio','cantidad', 'marca', 'imagen', 'descuento', 'empresaProveedora')->get();
    } */
}
