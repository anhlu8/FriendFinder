var friendData = require("../data/friends");


module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;
        var newFriendScore = newFriend.scores.map(function (i) {
            return parseInt(i);
        });
        
        var bestFriend;
        var bestFriendTotal = 1000;


        for (var i = 0; i < friendData.length; i++){
            var currentFriendScore = friendData[i].scores;

            var sumOfDiff = 0;
           
            for (var j = 0; j<currentFriendScore.length; j++){
                var diff = newFriendScore[j] - parseInt(currentFriendScore[j]);
                sumOfDiff += Math.abs(diff);
             
            }
            console.log(sumOfDiff)
            console.log(bestFriendTotal)
            if (sumOfDiff < bestFriendTotal) {
                bestFriendTotal = sumOfDiff;
                bestFriend = friendData[i];
            }

        }

        console.log("friendData: " , friendData);
        console.log("newfriendscores: " , newFriendScore);
        // console.log("newfriend: " , newFriend);
        friendData.push(newFriend);
        res.json(bestFriend);
    });
};