<?php

namespace Database\Seeders;

use App\Models\Posts;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       // Posts::factory()->count(150)->create();

       $users_id = DB::select('select id as user_id from users');
       $users_id = json_decode(json_encode($users_id), true);

       $times_to_seed = 200;

       for ($i=0; $i < $times_to_seed; $i++) { 
            for ($i=0; $i < count($users_id); $i++) { 
                Posts::factory()
                ->state(new Sequence($users_id[$i]))
                ->create();
           }
       }
    }
}
