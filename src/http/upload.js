export const upload = (formData) => {
    return $http({
        url: '/upload/file-upload',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

}