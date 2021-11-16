<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Municipio extends Model
{
    use HasFactory;
    protected $fillable = ['id_municipio', 'nombre_muncipio', 'departamento_id'];

    public function departamento(){
        return $this->belongsTo('App\Models\Departamento');
    }
}
