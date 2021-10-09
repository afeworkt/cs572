angular.module('jobOpenings').factory('JobsDataFactory',JobsDataFactory);
function JobsDataFactory($http) {
    
    return {
        getAll:getAll,
        getOne:getOne,
        addJob:addOne,
        deleteJob:deleteOne,
        updateJob:updateOne,
        addReview:addReview
    };
    
    function getAll(pageSize,currentPage) {
        return $http.get('/api/jobopenings').then(onSuccess).catch(onFailure);
    }
    function getOne(id) {
        return $http.get('/api/jobopenings/'+id).then(onSuccess).catch(onFailure);
    }
    function addOne(data) {
        return $http.post('/api/jobopenings/',data).then(onSuccess).catch(onFailure);
    }  
    function updateOne(id,data) {
        return $http.put('/api/jobopenings/'+id,data).then(onSuccess).catch(onFailure);
    } 
    function deleteOne(id) {
        return $http.delete('/api/jobopenings/'+id).then(onSuccess).catch(onFailure);
    }
    function addReview(id,data) {
        return $http.post('/api/jobopenings/'+id+'/reviews',data).then(onSuccess).catch(onFailure);
    } 
    function onSuccess(result) {
        return result.data;
    } 
   function onFailure (error) {
        console.log(error);
        return error;
    }
   
}