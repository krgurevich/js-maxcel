var scoresList = document.getElementById("scores-list");
var allScores = localStorage.getItem("allScores");
var clearScore = document.getElementById("clear");
var backHome = document.getElementById("back");

if (allScores == null) {
    allScores = null;
}
else {
    allScores = JSON.parse(allScores).sort(function (a, b) {
        return b.score - a.score
    });
    for (let i = 0; i < allScores.length; i++) {
        const createElement = document.createElement("li");
        createElement.textContent = allScores[i].initials + " " + allScores[i].score
        scoresList.appendChild(createElement);
    }
}
backHome.addEventListener("click", function () {
    window.location.replace("./index.html")
});
clearScore.addEventListener("click", function () {
    localStorage.clear();
    window.location.reload();
});




