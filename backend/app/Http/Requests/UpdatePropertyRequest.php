<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePropertyRequest extends FormRequest
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
            'image' => ['image', 'mimes:jpeg,png,jpg,webp'],
            'title' => ['string', 'min:3', 'max:255'],
            'description' => ['string', 'min:3', 'max:255'],
            'price' => ['numeric', 'min:0'],
            'features' => ['array'],
            'features.*' => ['string', 'min:3', 'max:255'],
            'address' => ['string', 'min:3', 'max:255'],
            'category_id' => ['string', 'exists:categories,id'],
            'acquired' => ['boolean'],
        ];
    }
}
