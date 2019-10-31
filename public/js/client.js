
document.getElementById("getit").addEventListener("submit", async (e) => {
    e.preventDefault();
    document.getElementById("status").textContent = "loading....";
    document.getElementById("weather").innerHTML = "";
    let address = document.querySelector('input').value;
    if(address.length<2){
        document.getElementById("status").textContent = "insert correct address";
        return;
    }
        let url = `/weather/${address}`
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        document.getElementById("status").textContent = "loaded successfully...";
        document.getElementById("weather").innerHTML = "";
        document.getElementById("weather").append(convert(data["map box"]));
        document.getElementById("weather").append(convert(data.AQ));
        document.getElementById("weather").append(convert(data.weather.currently));
        
    })

function convert(obj) {
    let ul = document.createElement('ul');
    for (let key in obj) {
        let li = document.createElement('li');
        if (typeof obj[key] === 'object') {
            li.textContent = `${key}`
            li.append(convert(obj[key]));
            ul.append(li);
        } else {
            li.textContent = `${key} : ${obj[key]}`;
            ul.append(li);
        }
    }

    return ul;
}

