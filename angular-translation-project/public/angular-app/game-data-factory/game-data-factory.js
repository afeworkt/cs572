angular.module("meanGames").factory("GameDataFactory", GameDataFactory);

function GameDataFactory($http) {
    return {
        getAllGames: getAllGames,
        getOneGame: getOneGame,
        addOneGame: addOneGame,
        updateOneGame:updateOneGame,
        deleteOneGame:deleteOneGame
    };
    function getAllGames(offset,limit) {
        return $http.get(`/api/games?offset=${offset}&count=${limit}`).then(complete).catch(failed);
    }
    function getOneGame(id) {
        return $http.get("/api/games/" + id).then(complete).catch(failed);
    }
    function addOneGame(data) {
        return $http.post("/api/games/",data).then(complete).catch(failed);
    }  
    function updateOneGame(id,data) {
        return $http.put("/api/games/" + id,data).then(complete).catch(failed);
    }  
    function deleteOneGame(id) {
        return $http.delete("/api/games/" + id).then(complete).catch(failed);
    }
    function complete(response) {
        console.log(response.data);
        return response.data;
    }
    function failed(error) {
        return error.status.statusText;
    }
}