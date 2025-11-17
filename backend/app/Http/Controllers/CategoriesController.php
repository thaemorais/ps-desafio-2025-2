<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Http\Requests\StoreCategoriesRequest;
use App\Http\Requests\UpdateCategoriesRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CategoriesController extends Controller
{
    // Define a classe Categories
    protected $categories;

    // Inicializa a classe Categories
    public function __construct(Categories $categories)
    {
        // Inicializa a classe Categories
        $this->categories = $categories;
    }

    /**
     * Retorna todos os registros da tabela categories
     */
    public function index(): JsonResponse
    {
        // Pega todos os registros da tabela categories
        $categories = $this->categories->all();
        // Retorna os registros em formato JSON
        return response()->json($categories, Response::HTTP_OK);
    }

    /**
     * Pega os dados do formulário e pede pro model criar o registro
     */
    public function store(StoreCategoriesRequest $request): JsonResponse
    {
        // Passa pelo Request para validar os dados
        $data = $request->validated();
        // Cria o registro no banco de dados
        $category = $this->categories->create($data);
        // Retorna o registro criado
        return response()->json($category, Response::HTTP_CREATED);
    }

    /**
     * Retorna um registro específico da tabela categories
     */
    public function show(string $id): JsonResponse
    {
        // Pega o registro específico da tabela categories
        $category = $this->categories->findOrFail($id);
        // Retorna o registro em formato JSON
        return response()->json($category, Response::HTTP_OK);
    }

    /**
     * Atualiza um registro específico da tabela categories
     */
    public function update(UpdateCategoriesRequest $request, string $id): JsonResponse
    {
        // Pega o registro específico da tabela categories
        $category = $this->categories->findOrFail($id);
        // Atualiza o registro
        $category->update($request->validated());
        // Retorna o registro atualizado
        return response()->json($category, Response::HTTP_OK);
    }

    /**
     * Remove um registro específico da tabela categories
     */
    public function destroy(string $id): JsonResponse
    {
        // Pega o registro específico da tabela categories
        $category = $this->categories->findOrFail($id);
        // Remove o registro
        $category->delete();
        // Retorna o registro removido
        return response()->json(['message' => "Categoria deletada com sucesso!"], Response::HTTP_OK);
    }
}
