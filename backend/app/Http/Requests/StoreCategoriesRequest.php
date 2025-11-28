<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoriesRequest extends FormRequest
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
            'name' => 'required|string|max:255|unique:categories,name',
        ];
    }
    
    public function messages()
    {
        return [
            'name.required' => 'O campo NOME é obrigatório.',
            'name.string' => 'O campo NOME deve ser um texto.',
            'name.max' => 'O campo NOME no máximo 255 caracteres.',
            'name.unique' => 'O campo NOME deve ser único.',
        ];
    }
}
