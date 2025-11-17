<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Permission extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
    ];

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class);
    }
}
