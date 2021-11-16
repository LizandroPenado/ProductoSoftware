<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventario extends Model
{
    use HasFactory;
    protected $fillable = ['id_inventario', 'tipo', 'establecimiento_id'];
    
    public function establecimiento(){
        return $this->belongsTo('App\Models\Establecimiento');
    }
}
