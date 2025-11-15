<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

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
}
