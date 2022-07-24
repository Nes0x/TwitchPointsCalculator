const result = document.getElementById("result");

window.onload = function () {
    document.getElementById("choice").addEventListener("change", addTags);
}

function addTags(event) {
    let element = document.getElementById("calculator-labels");
    let value = event.target.value;

    switch (value) {
        case "time":
            element.innerHTML = `
                   <br><br>
                   <label for="days">Dni</label>
                   <input type="number" min="0" id="days">
                   <br><br>
                   <label for="hours">Godziny</label>
                   <input type="number" min="0" id="hours">
                   <br><br>
                   <label for="minutes">Minuty</label>
                   <input type="number" min="0" id="minutes">
                   <br><br>
                   <button id="calculate" name="time" type="submit">Kliknij aby wyliczyć punkty</button>
            `
            break;
        case "points":
            element.innerHTML = `
                   <br><br>
                   <label for="points">Ilość punktów</label>
                   <input type="number" min="0" id="points">
                   <br><br>
                   <button id="calculate" name="points" type="submit">Kliknij aby wyliczyć czas</button>
            `
            break;
        default:
            element.innerHTML = "";
            break;
    }
    result.innerText = "";
    document.getElementById("calculate").addEventListener("click", calculate);
}


function calculate(event) {
   let name = event.target.name;
   let subscription = document.getElementById("subscription").value;
   switch (name) {
       case "time":
           let days = document.getElementById("days").value;
           let hours = document.getElementById("hours").value;
           let minutes = document.getElementById("minutes").value;
           let calculatePoints = ((days * 24 * 60) + (hours * 60) + Number(minutes)) * 3;
           result.innerText = "W podany przez Ciebie czas zdobędziesz " + Math.trunc(calculatePoints * subscription) + " punktów!";
           break;
       case "points":
           let points = document.getElementById("points").value;
           result.innerText = getTimeFromMinutes(Math.trunc((points / Math.trunc(60 * subscription)) * 20));
           break;
   }
}

function getTimeFromMinutes(minutes) {
    let time = "";
    if (Math.trunc(minutes / 1440) > 0) {
        time += "\n" + Math.trunc(minutes / 1440) + " dni";
        minutes -= Math.trunc((minutes / 1440)) * 1440;
    }
    if (Math.trunc(minutes / 60) > 0 && !(Math.trunc(minutes / 1440) > 0)) {
        time += "\n" + Math.trunc(minutes / 60) + " godzin/y";
        minutes -= Math.trunc((minutes / 60)) * 60;
    }
    time += "\n" + Math.trunc(minutes) + " minut/y";
    return time;
}