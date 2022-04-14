export const URL = {
    //root: process.env.BACKEND_ROOT_URL,
    //api: 'http://localhost:8000/api/',
    root: 'https://jam-mate-backend.herokuapp.com/',
    api: 'https://jam-mate-backend.herokuapp.com/api/',
}

export const DEV_URL = {
    root: 'http://localhost:8000/',
    api: 'http://localhost:8000/api/',
}

export const postThumbnailUrl = (post , width=400, height=400) => {
    if(!post.profile_image.includes('https://')){
        return `${URL.root}thumb/${post.user_id}/${post.profile_image}?s=thumbnail&w=${width}&h=${height}`
    }else{
        return post.profile_image
    }
}

export const thumbnailUrl = (user , width=400, height=400) => {
    if(user.profile_image_is_custom){
        return `${URL.root}thumb/${user.id}/${user.profile_image}?s=thumbnail&w=${width}&h=${height}`
    }else{
        return user.profile_image
    }
}

export const imagePermittedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']