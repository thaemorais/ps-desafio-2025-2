<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Http\Requests\StorePropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class PropertyController extends Controller
{
    protected $propertyClass;

    public function __construct(Property $propertyClass)
    {
        $this->propertyClass = $propertyClass;
    }

    

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $properties = $this->propertyClass->all();
        return response()->json($properties, Response::HTTP_OK);
    }

    /**
     * Pega os dados do formulário e pede pro model criar o registro
     */
    public function store(StorePropertyRequest $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Property $property)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePropertyRequest $request, Property $property)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        //
    }
}
