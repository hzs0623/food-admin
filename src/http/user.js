export const login = ({ password, username }) => {
    return $http({
        url: '/user/login',
        method: 'post',
        data: {
            password,
            username
        }
    })
}