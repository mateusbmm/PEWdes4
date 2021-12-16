const api ={
    key:"1bf2af0d52faa7d51207804d7f1e6160",
    base:"https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units:"metric"
}


const city = document.querySelector('.city');
const date = document.querySelector('.date');
const container_img = document.querySelector('.container-img');
const container_temp = document.querySelector('.container-temp');
const temp_number = document.querySelector('.container-temp div');
const temp_unit = document.querySelector('.container-temp span');
const weather_t = document.querySelector('.weather');
const search_input = document.querySelector('.form-control');
const search_button = document.querySelector('.btn');
const low_hight = document.querySelector('.hi-low');


const btnMais = document.querySelector('.button-plus');
const mais = document.querySelector('.mais');
const humidity = document.querySelector('.humidity');
const feels_like = document.querySelector('.feels-like')

var results;
var metricUnit;


btnMais.addEventListener('click',() => {
    console.log(mais.classList);
    if(mais.classList == 'mais active') {
       mais.classList.add('desactive');
       mais.classList.remove('active');
    }else{
        mais.classList.add('active');
        mais.classList.remove('desactive');
    }
    
})


search_button.addEventListener('click', function() {
    searchResults(search_input.value);
    search_input.value = ``;
    
})

search_input.addEventListener('keypress', enter)
function enter(event) {
    key = event.keyCode
    if( key === 13){ //kayCode é o código das teclas do teclado  o 13 é o key code da tecla enter
        
      searchResults(search_input.value)
        search_input.value = ''

        
    }
}


// função que procura atravez da geolozalicação
window.addEventListener('load', ()=>{

    
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
    else{
        alert('navegador não suporta geolocalização');
    }

    function setPosition(position) {

        console.log(position)
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        coordResults(lat, long);
        
    }
    function showError(error) {
        alert(`erro: ${error.message}`);

    }
})

function coordResults(lat, long){
    fetch(`${api.base}find?lat=${lat}&lon=${long}&cnt=1&units=${api.units}&lang=${api.lang}&appid=${api.key}`)
    .then(response =>{
        if(!response.ok){
            throw new Error(`http error: status ${response.status}`);

        }

        //
        
        return  response.json();
        
    })
    .catch(error =>{
        alert(error.message);
    })
    .then(response => {
        //console.log(response);
        displayResults(response.list[0]);
        results = response.list[0];
        console.log(results);
    });

}

// função que procura através da barra de pesquisa
function searchResults(city) {

    fetch(`${api.base}weather?q=${city}&units=${api.units}&lang=${api.lang}&appid=${api.key}`)
        .then(response =>{
            if(!response.ok){
                throw new Error(`http error: status ${response.status}`);

            }
            
            
            return response.json();
            

        })
        .catch(error =>{
            alert(error.message);
        })
        .then(response => {
            displayResults(response);
            results = response;
            console.log(results);
        });

 }  



function displayResults(Weather) {

   // let Weather = response.list[0];
    //console.log("resultados do clima")
   // console.log(Weather.main)

    city.innerText = `${Weather.name} ${Weather.sys.country}`;

    let now = new Date();
    date.innerText = dateBuilder(now);

    let iconName =  Weather.weather[0].icon;
    container_img.innerHTML = `<img src="./icons//${iconName}.png">`;

    let temperature = `${Math.round( Weather.main.temp)}`
    temp_number.innerHTML = temperature;
    temp_unit.innerHTML = `°c`;


    weather_t.innerHTML = Weather.weather[0].description;
    low_hight.innerText = `${Math.round(Weather.main.temp_min)}°c / ${Math.round(Weather.main.temp_max)}°c`;

    humidity.innerText = `Humidade relativa do ar: ${Weather.main.humidity}%`;
    feels_like.innerText = `Sensação termica de ${Weather.main.feels_like} °${metricUnit}`

    

}



function dateBuilder(d){

    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


    let day = days[d.getDay()];//getDay retorna um valor numerico referente ao dia da semana contando apartir de domingo = [0]
    let date = d.getDate();//getDate retorna um numero referente ao dia
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date}, ${month}, ${year}`;
}




container_temp.addEventListener('click', () => {

    temp_number_now = temp_number.innerHTML
    console.log(temp_number_now)


    if (temp_unit.innerHTML === "°c"){
        metricUnit = "°f"
        let f = (temp_number_now * 1.8) + 32
    
        temp_unit.innerHTML = metricUnit
        temp_number.innerHTML = Math.round(f)

        console.log(Math.round(f))
    } else {
        //console.log('c')
        metricUnit = "°c"
        let c = (temp_number_now - 32) / 1.8
        temp_unit.innerHTML = metricUnit
        temp_number.innerHTML = Math.round(c);
    }


})










