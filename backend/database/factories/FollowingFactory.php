<?php

namespace Database\Factories;

use App\Models\IsFollowingUser;
use Illuminate\Database\Eloquent\Factories\Factory;

class FollowingFactory extends Factory
{
    protected $model = IsFollowingUser::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        return [
            'user_id' => $this->faker->unique(true)->numberBetween(1,50),
            'is_following' => $this->faker->unique(true)->numberBetween(1,50)
        ];
    }

}
