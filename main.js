//création des variables, éléments créés et récupérés
const apiKey = "3520a56ddbc46c3f24e11be39e153efa"
const input = document.getElementById("ville")
const section = document.createElement("section")
const temp = document.createElement("div")
const description = document.createElement("div")
const icon = document.createElement("img")
section.append(temp,description,icon)
document.body.append(section)

//création d'une fonction qui fait le café
async function ShowWeather(ville) {
    //récupération des données de l'API météo
    let a = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&lang=fr&units=metric&appid=${apiKey}`)
    //conversion en js
    const weather = await a.json()
        //vérification que la ville rentrée appartienne à la base de données
        if (weather.cod === '404') {
            //si elle n'y est pas
            alert('Entre un vrai nom de ville !')
        }
        else{
            //si elle y est : on donne les valeurs de la température, du temps et de l'image des éléments créés
            temp.textContent = weather.main.temp
            description.textContent = weather.weather[0].description
            icon.src = `./img/${weather.weather[0].icon}@2x.png`
        }
            //reset de l'input
            input.value = null
            //reset de la div comprenant l'autocomplétion (utile plus tard)
            autoComp.textContent=""
        }

        //création d'un event sur le fait d'appuyer sur "Entrée"
        input.addEventListener("keydown",async (e) => {
            if (e.key == "Enter") {
                //On appelle la fonction qui fait le café prenant comme valeur dans le champ
                ShowWeather(input.value)
            }
        }
    )
    



                            //Système d'autocomplétion


//assignation des villes à une variable qui va contenir le tableau de toutes les villes sous forme d'objets
const villes = await recup()
//création d'une variable qui va être un tableau contenant seulement les propriétés label
let villesNom = villes.map((x)=>x.label)
//transformation du tableau en un nouveau tableau qui ignore les doublons
villesNom = [...new Set(villesNom)]
    
//création d'une fonction pour récupérer les villes de France depuis le serveur json
async function recup() {
    let a = await fetch(`http://localhost:3000/cities`)
    const villes = await a.json()
    return villes
}
    
//création d'une div qui va acceuillir les propositions d'autocomplétion
const autoComp = document.createElement("section")
section.append(autoComp)
//Evènement chaque fois que l'input est modifié
input.addEventListener("input",(e)=>{
    //reset de l'autocomplétion (sinon on va aussi avoir cejux de l'input précédent)
    autoComp.textContent=""
    //on rend insensible à la casse (la base de données de ville est en full minuscules)
    let x = input.value.toLowerCase()
    //création d'un indice 
    let m = 0
    //on boucle sur les villes
    villesNom.forEach( (ville) => {
        //on compare l'input à chaque ville pour laquelle on garde autant de caractères à partir du début ET on s'arrête au 5ème match trouvé sinon ça peut être très long si beaucoup de matchs correspondent
        if (x == ville.substring(0,x.length) & m < 5){
            //on incrémente m 
            m++
            //on créé une div qui prend comme valeur la ville matché dans le tableau de villes
            const auto = document.createElement("div")
            auto.textContent = `${ville}`
            autoComp.append(auto)
            //on met un event sur le click sur la ville qui declenche un changement de la valeur de l'input pour la ville sur laquelle on a cliqué puis qui reproduit l'affichage météo
            auto.addEventListener("click",async (e)=>{
                input.value = auto.textContent
                ShowWeather(input.value)
            })
            
        }
    });
})

                            //Création d'un bouton utilisant les données issus de la géolocalisation

// const geo = document.createElement("button")
// geo.textContent = "Utiliser ma position"

// section.append(geo)

// geo.addEventListener("click",async (x)=>{
//     let lat, lon
//     await window.navigator.geolocation.getCurrentPosition(pos => {
//         lat = pos.coords.latitude
//         lon = pos.coords.longitude
//         return (lat,lon)
//     })
//     console.log(lat,lon)
//     let a = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}lang=fr&units=metric&appid=${apiKey}`)
//     //conversion en js
//     const weather = await a.json()
//         //vérification que la ville rentrée appartienne à la base de données
//         if (weather.cod === '404') {
//             //si elle n'y est pas
//             alert('Entre un vrai nom de ville !')
//         }
//         else{
//             //si elle y est : on donne les valeurs de la température, du temps et de l'image des éléments créés
//             temp.textContent = weather.main.temp
//             description.textContent = weather.weather[0].description
//             icon.src = `./img/${weather.weather[0].icon}@2x.png`
//         }
//             //reset de l'input
//             input.value = null
//             //reset de la div comprenant l'autocomplétion (utile plus tard)
//             autoComp.textContent=""
//         }
//     )