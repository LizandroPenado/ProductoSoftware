<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Establecimiento extends Model
{
    use HasFactory;
    protected $fillable = ['nombre_establecimiento', 'telefono', 'encargado', 'direccion', 'municipio_id'];

    public function municipio(){
        return $this->belongsTo('App\Models\Municipio');
    }
    public function departamento(){
        return $this->belongsTo('App\Models\Departamento');
    }
}
