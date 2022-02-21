<?php

namespace Database\Seeders;

use App\Models\IsFollowingUser;
use Illuminate\Database\Seeder;

class FollowingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        IsFollowingUser::factory()->count(300)->create();
    }
}
