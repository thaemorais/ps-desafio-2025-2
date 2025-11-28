<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePropertyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'title' => ['required', 'string', 'min:3', 'max:255'],
            'description' => ['required', 'string', 'min:3'],
            'price' => ['required', 'numeric', 'min:0'],
            'features' => ['required', 'array'],
            'features.*' => ['required', 'string', 'min:3', 'max:255'],
            'address' => ['required', 'string', 'min:3', 'max:255'],
            'category_id' => ['required', 'string', 'exists:categories,id'],
            'acquired' => ['required', 'boolean'],
        ];
    }

    public function messages()
    {
        return [
            'image.required' => 'O campo Imagem é obrigatório.',
            'image.image' => 'O campo Imagem deve conter apenas imagens.',
            'image.mimes' => 'O campo Imagem deve conter apenas jpeg, png, jpg e webp.',
            'image.max' => 'O campo Imagem deve conter no máximo 2048KB.',
            'title.required' => 'O campo Título é obrigatório.',
            'title.string' => 'O campo Título deve ser um texto.',
            'title.min' => 'O campo Título deve conter no mínimo 3 caracteres.',
            'title.max' => 'O campo Título no máximo 255 caracteres.',
            'description.required' => 'O campo Descrição é obrigatório.',
            'description.string' => 'O campo Descrição deve ser um texto.',
            'description.min' => 'O campo Descrição deve conter no mínimo 3 caracteres.',
            'price.required' => 'O campo Preço é obrigatório.',
            'price.numeric' => 'O campo Preço deve ser um número.',
            'price.min' => 'O campo Preço deve ser maior que 0.',
            'features.required' => 'O campo Características é obrigatório.',
            'features.array' => 'O campo Características deve ser um array.',
            'features.min' => 'O campo Características deve conter no mínimo 1 feature.',
            'features.max' => 'O campo Características deve conter no máximo 10 características.',
            'features.*.string' => 'O campo Características deve conter apenas textos.',
            'features.*.min' => 'O campo Características deve conter no mínimo 3 caracteres.',
            'features.*.max' => 'O campo Características deve conter no máximo 255 caracteres.',
            'address.required' => 'Os campos de Endereço são obrigatórios.',
            'address.string' => 'Os campos de Endereço devem ser um texto.',
            'address.min' => 'Os campos de Endereço devem conter no mínimo 3 caracteres.',
            'address.max' => 'Os campos de Endereço devem conter no máximo 255 caracteres.',
            'category_id.required' => 'O campo Categoria é obrigatório.',
            'category_id.string' => 'O campo Categoria deve ser um texto.',
            'category_id.exists' => 'O campo Categoria não existe.',
            'acquired.required' => 'O campo Adquirido é obrigatório.',
        ];
    }
}
