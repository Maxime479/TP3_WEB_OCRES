
// Fonction appelée lors du click du bouton
function start() {
  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER();
  // Appel de la fonction fetchTodayForecast

  apiWeather
    .getThreeDayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;
        console.log(data);

        var main;
        var descriptionn;
        var temp;
        var icon;

        function next(stringDay){

            var mainString = stringDay + '-forecast-main';
            var descriptionString = stringDay + '-forecast-more-info';
            var iconString = 'icon-weather-container-' + stringDay;
            var tempString = stringDay + '-forecast-temp';

            document.getElementById(mainString).innerHTML = main;
            document.getElementById(descriptionString).innerHTML = descriptionn;
            document.getElementById(iconString).innerHTML = icon;
            document.getElementById(tempString).innerHTML = `${temp}°C`;
        }


        function refresh(intDay){

            main = data.list[intDay].weather[0].main;
            descriptionn = data.list[intDay].weather[0].description;
            temp = data.list[intDay].temp.day;
            icon = apiWeather.getHTMLElementFromIcon(data.list[intDay].weather[0].icon);

            var stringDay;

            switch (intDay){
                case 0:
                    stringDay = 'today';
                    break;
                case 1:
                    stringDay = 'tomorrow';
                    break;
                case 2:
                    stringDay = 'after-tomorrow';
                    break;
                case 3:
                    stringDay = 'again-after-tomorrow';
                    break;
                default:
                    console.log("error in switch - function refresh");
                    break;
            }

            next(stringDay);
        }

        for(i=0; i<=4; i++){
            refresh(i);
        }



      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });
}
