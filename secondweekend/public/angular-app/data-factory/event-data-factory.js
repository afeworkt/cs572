angular.module('cyclingevent').factory('EventDataFactory', EventDataFactory);
function EventDataFactory($http){
    const getAll=function(offset,limit){
        console.log('getting');
        return $http.get(`/api/cyclingevents?offset=${offset}&count=${limit}`).then(onSuccess).catch(onError);
    };
    const search=function(lat,lng,dist){
        console.log('searching');
        return $http.get(`/api/cyclingevents?lat=lat&lng=lng&dist=dist`).then(onSuccess).catch(onError);
    };
    const getOne=function(eventid){
        return $http.get('/api/cyclingevents/'+eventid).then(onSuccess).catch(onError);
    };
    const deleteOne=function(eventid){
        return $http.delete('/api/cyclingevents/'+eventid).then(onSuccess).catch(onError);
    };
    const addNew=function(data){
        return $http.post('/api/cyclingevents/',data).then(onSuccess).catch(onError);
    };
    const update=function(eventid,data){
        return $http.put('/api/cyclingevents/'+eventid,data).then(onSuccess).catch(onError);
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
        getAll:getAll,
        getOne:getOne,
        search:search,
        addNew:addNew,
        update:update,
        deleteOne:deleteOne,
    };
    
}