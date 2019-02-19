function Score(id, nivel, score) {
    this.id = id;
    this.nivel = nivel;
    this.score = score;
}
var nivel = 0;
var scores = [];

var db = openDatabase('mydb', '', 'Test DB', 5 * 1024 * 1024); 

db.transaction(function (tx) {
   tx.executeSql('CREATE TABLE IF NOT EXISTS SCORE (id unique, nivel, score)'); 
});

function getAllScores() {
	console.log("getAllScores");
  db.readTransaction(function (t) {
    t.executeSql('SELECT * FROM SCORE', [], function (t, r) {
       var len = r.rows.length, i;
       var avgScore = 0;
       console.log(len);
       scores = r.rows;
       	startScreen = "<table class='tableMenu'><tr>";
		for (i = 0; i < len; i++) { 
			avgScore += r.rows.item(i).score;
   			startScreen += "<td><div class='buttonMenu' style=\"background-image: url('img/decagono" + r.rows.item(i).score + ".png');\">" + (i + 1) + "</div></td>";
   			if ((i + 1) % 2 === 0 ) {
   				startScreen += "</tr><tr>";
   			}
   			//startScreen += "<p class='text-center main-button-container'><a class='ui-btn btn btn-primary btn-lg btn-block start-button' href='#' role='button'>(" + r.rows.item(i).score + ") Empezar Nivel " + (i + 1) + "</a></p>";
	      	//alert(r.rows.item(i).log ); 
	    }
	    if (len > 0) {
	    	avgScore /= len;
	    }
	    var strChapin = avgScore.toFixed(1) + "% Chapin, nivel " + len;
		$(".chapin").html(strChapin);
		startScreen += "<td><div class='buttonMenu'>" + (len + 1) + "</div></td>";
   			//startScreen += "<p class='text-center main-button-container'><a class='ui-btn btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Empezar Nivel " + (len + 1) + "</a></p>";
		startScreen += "</tr></table>";
		$(".mainArea").html(startScreen);
		admob.requestInterstitialAd();
    }, function (t, e) {
      // couldn't read database
      console.log('(unknown: ' + e.message + ')');
    });
  });
}

function newScore(myScore) {
	window.ga.trackEvent('Chapin', 'newScore', 'nivel' + myScore.nivel, myScore.score);
	var insert_query = "INSERT INTO SCORE VALUES (?, ?, ?)";
	db.transaction(function (tx) {
	    tx.executeSql(insert_query, [myScore.id, myScore.nivel, myScore.score]);
	});
}

function updateScore(myScore) {
	window.ga.trackEvent('Chapin', 'updateScore', 'nivel' + myScore.nivel, myScore.score);
	var insert_query = "UPDATE SCORE SET score = ? WHERE nivel = ?";
	db.transaction(function (tx) {
	    tx.executeSql(insert_query, [myScore.score, myScore.nivel]);
	});
}

