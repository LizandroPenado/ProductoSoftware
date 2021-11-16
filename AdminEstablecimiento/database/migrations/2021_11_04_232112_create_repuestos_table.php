<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRepuestosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('repuestos', function (Blueprint $table) {
            $table->id('id');
            $table->string('nombre_repuesto', 200);
            $table->string('descripcion', 250);
            $table->decimal('precio', 10, 2);
            $table->integer('cantidad');
            $table->string('marca', 50);
            $table->string('imagen', 100);
            $table->integer('descuento');
            $table->string('empresa_proveedora', 200);
            $table->timestamps();
            $table->unsignedBigInteger('inventario_id');
            $table->foreign('inventario_id')->references('id')->on('inventarios')->onUpdate('cascade')->onDelete('cascade');  
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('repuestos');
    }
}