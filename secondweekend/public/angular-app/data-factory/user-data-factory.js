angular.module('cyclingevent').factory('UserDataFactory', UserDataFactory);
function UserDataFactory($http){
  
    const login=function(data){
        return $http.post('/api//users/login/',data).then(onSuccess).catch(onError);
    };
    const register=function(data){
        return $http.post('/api/users/register/',data).then(onSuccess).catch(onError);
    };
    function onSuccess(result){
        console.log(result);
        return result.data;
    }
    function onError(err){
        console.log(err);
        return err;
    }

    return {
        register:register,
        login:login
    };
    
}