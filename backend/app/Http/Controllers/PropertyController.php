<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Http\Requests\StorePropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;
use App\Models\Categories;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class PropertyController extends Controller
{
    // Define a classe Property
    protected $property;

    // Inicializa a classe Property
    public function __construct(Property $property)
    {
        // Inicializa a classe Property
        $this->property = $property;
    }
    

    /**
     * Retorna todos os registros da tabela properties
     */
    public function index(): JsonResponse
    {
        // Pega todos os registros da tabela properties
        $properties = $this->property->all();
        // Retorna os registros em formato JSON
        return response()->json($properties, Response::HTTP_OK);
    }

    /**
     * Pega os dados do formulário e pede pro model criar o registro
     */
    public function store(StorePropertyRequest $request)
    {
        // Pega os dados do formulário
        $data = $request->validated();

        if($request->hasFile('image')) {
            $path = $request->file('image')->store('image', 'public');
            $data['image'] = url('storage/'.$path);
        }
        // Cria o registro no banco de dados
        $property = $this->property->create($data);

        // validar se a categoria existe
        $id = $property->id;
        $category = $this->property->with('category')->findOrFail($id);
        
        // Retorna o registro criado em formato JSON
        return response()->json($category, Response::HTTP_CREATED);
    }

    /**
     * Retorna um registro específico da tabela properties
     */
    public function show(string $id): JsonResponse
    {
        // Pega o registro específico da tabela properties
        $property = $this->property->findOrFail($id);
        // Retorna o registro em formato JSON
        return response()->json($property, Response::HTTP_OK);
    }

    /**
     * Atualiza um registro específico da tabela properties
     */
    public function update(UpdatePropertyRequest $request, string $id)
    {
        // Pega o registro específico da tabela properties
        $property = $this->property->findOrFail($id);
        // Atualiza o registro
        $property->update($request->validated());
        // Retorna o registro atualizado em formato JSON
        return response()->json($property, Response::HTTP_OK);
    }

    /**
     * Remove um registro específico da tabela properties
     */
    public function destroy(string $id)
    {
        // Pega o registro específico da tabela properties
        $property = $this->property->findOrFail($id);
        // Remove o registro
        $property->delete();
        // Retorna o registro removido em formato JSON
        return response()->json(['message' => "Imóvel deletado com sucesso!"], Response::HTTP_OK);
    }
}
