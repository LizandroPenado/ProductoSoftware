<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;


class ConexionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
        //
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function conectar(Request $request)
    {
        $gestor =  $request->get('gestor');
        $DB_HOST_U =  $request->get('host');
        $DB_PORT_U =  $request->get('port');
        $DB_DATABASE_U =  $request->get('database');
        $DB_USERNAME_U =  $request->get('usuario');
        $DB_PASSWORD_U =  $request->get('password');

        if($gestor == "pgsql"){
            
            $configDb = [
                'driver'    => 'pgsql',
                'url'       => env('DATABASE_URL'),
                'host'      => ($DB_HOST_U),
                'port'      => ($DB_PORT_U),
                'database'  => ($DB_DATABASE_U),
                'username'  => ($DB_USERNAME_U),
                'password'  => ($DB_PASSWORD_U),
                'charset'   => 'utf8',
                'prefix'    => '',
                'prefix_indexes' => true,
                'schema'    => 'public',
                'sslmode'   => 'prefer',
            ];

            \Config::set('database.connections.pgsql2', $configDb);

            $establecimientos = DB::connection('pgsql2')->table('establecimientos')->get();
            echo "<pre>", var_dump($establecimientos), "</pre>";

        }else{

            $configDb = [
                'driver'    => 'mysql',
                'url'       => env('DATABASE_URL'),
                'host'      => ($DB_HOST_U),
                'port'      => ($DB_PORT_U),
                'database'  => ($DB_DATABASE_U),
                'username'  => ($DB_USERNAME_U),
                'password'  => ($DB_PASSWORD_U),
                'unix_socket' => env('DB_SOCKET', ''),
                'charset'   => 'utf8mb4',
                'collation' => 'utf8mb4_unicode_ci',
                'prefix'    => '',
                'prefix_indexes' => true,
                'strict'    => true,
                'engine'    => null,
                'options'   => extension_loaded('pdo_mysql') ? array_filter([
                    \PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
                ]) : [],
            ];

            \Config::set('database.connections.mysql3', $configDb);

            $establecimientos = DB::connection('mysql3')->table('establecimientos')->get();
            echo "<pre>", var_dump($establecimientos), "</pre>";
            
        }

        /* return view('conexion.establecimientos', ['establecimientos' => $establecimientos, 'gestor' => $gestor]); */
    }
}