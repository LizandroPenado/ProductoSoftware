<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repuestos extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'clasificacion', 'descripcion', 'precio',  'cantidad', 'marca'];
}
