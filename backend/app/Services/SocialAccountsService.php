<?php
namespace App\Services;
use App\Models\User;
use App\Models\SocialAccount;
use Laravel\Socialite\Two\User as ProviderUser;
class SocialAccountsService
{
    /**
     * Find or create user instance by provider user instance and provider name.
     *
     * @param ProviderUser $providerUser
     * @param string $provider
     *
     * @return User
     */
    public function findOrCreate(ProviderUser $providerUser, string $provider): User
    {

        $socialAccount = SocialAccount::where('provider_name', $provider)
            ->where('provider_id', $providerUser->getId())
            ->first();

            
        if ($socialAccount) {

            if($socialAccount->user->profile_image_is_custom == 0){
                $socialAccount->user->update([
                    'profile_image' => $providerUser->getAvatar(),
                ]);
            }
            return $socialAccount->user;
        } else {
            $user = null;

            if ($email = $providerUser->getEmail()) {
                $user = User::where('email', $email)->first();
                $user->update([
                    'profile_image' => $providerUser->getAvatar(),
                ]);

            }

            if (!$user) {
                $user = User::create([
                    'name' => $providerUser->getName(),
                    'email' => $providerUser->getEmail(),
                    'profile_image' => $providerUser->getAvatar(),
                ]);
            }
            $user->socialAccounts()->create([
                'provider_id' => $providerUser->getId(),
                'provider_name' => $provider,
            ]);
            return $user;
        }
    }
}
