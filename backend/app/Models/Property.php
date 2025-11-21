<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Property extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'image',
        'title',
        'description',
        'price',
        'features',
        'address',
        'category_id',
        'acquired',
    ];

    protected static function booted()
    {
        self::deleted(function (Property $property) {
            try {
                if ($property->image) {
                    $image_name = explode('image/', $property->image);
                    if (isset($image_name[1])) {
                        Storage::disk('public')->delete('image/'.$image_name[1]);
                    }
                }
            } catch (Throwable) {
                // Ignora erros ao deletar imagem
            }
        });
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'features' => 'array',
            'acquired' => 'boolean',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Categories::class);
    }
}
