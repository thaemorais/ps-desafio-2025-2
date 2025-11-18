<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'features' => 'array',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Categories::class);
    }
}
