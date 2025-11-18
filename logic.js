// conecting html elements to js...
let days = document.querySelectorAll(".day");
let hours = document.querySelector(".hours");
let loader = document.querySelector(".indicator");
let city = document.querySelector(".city");
let state = document.querySelector(".state");
let country = document.querySelector(".country");
let mainTem = document.querySelector("#num");
let humidity = document.querySelector(".textHum1");
let windSpeed = document.querySelector("#speedNum");
let windDirection = document.querySelector(".direction");
let precipitation = document.querySelectorAll(".numpre");
let image = document.querySelector(".icon");

// writing some global variables...
let now = new Date();
let url;
let url1;
let url2;
let time = now.getHours();
console.log(time);
let date = now.getDate();
let month = now.getMonth();
if (month < 9) {
  month = "0" + (month + 1);
} else {
  month = String(month + 1);
}
let year = now.getFullYear();
let daynumber = now.getDay();
let daynames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = daynames[daynumber];
let rearr = [];
let data;
let loca;

// seting logo
if (time >= 5 && time <= 17) {
  image.classList.add("morning");
} else {
  image.classList.add("night");
}
// getting the locations details...
const success = async (pos) => {
  const crd = pos.coords;
  console.log("Your current position is:");
  let latitude = crd.latitude;
  let longitude = crd.longitude;
  console.log(latitude);
  console.log(longitude);
  url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset&hourly=temperature_2m,relative_humidity_2m,precipitation,precipitation_probability,wind_speed_10m,wind_direction_10m&timezone=auto`;
  url1 = `https://www.timeapi.io/api/time/current/coordinate?latitude=${latitude}&longitude=${longitude}`;
  url2 = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
  await getdata();
  await getloca();
  loader.classList.add("hide");
};

// getting local city name
const getloca = async () => {
  let response = await fetch(url2);
  loca = await response.json();
  console.log(loca);
  city.innerText = loca.address.city + ",";
  state.innerText = loca.address.state + ",";
  country.innerText = loca.address.country;
};

// getting weather info...
const getdata = async () => {
  let response = await fetch(url);
  data = await response.json();
  console.log(data);
  console.log(data.hourly);

  for (let i = 0; i < 168; i++) {
    let parent1 = document.createElement("div");
    let b1 = document.createElement("b");
    let time = document.createElement("div");
    let temp = document.createElement("div");
    let b2 = document.createElement("b");
    let tempnum = document.createElement("div");
    let b3 = document.createElement("b");
    let tempsym = document.createElement("div");

    hours.append(parent1);
    parent1.classList.add("hour");
    parent1.classList.add("over1");
    parent1.append(b1);
    b1.append(time);
    time.classList.add("time");
    parent1.append(temp);
    temp.classList.add("temp");
    temp.append(b2);
    b2.append(tempnum);
    tempnum.classList.add("tempnum");
    const settemp = async () => {
      tempnum.innerText = await data.hourly.temperature_2m[i];
    };
    settemp();
    temp.append(b3);
    b3.append(tempsym);
    tempsym.classList.add("tempsym");
    tempsym.innerText = "°C";

    let times = document.querySelectorAll(".time");
    let j = 0;
    for (let time of times) {
      if (j === 24) {
        j = 0;
      }
      time.innerText = j + ":00";
      j++;
    }

    if (i < 24) {
      parent1.classList.add("A" + 0);
    } else if (i >= 24 && i < 48) {
      parent1.classList.add("A" + 1);
    } else if (i >= 48 && i < 72) {
      parent1.classList.add("A" + 2);
    } else if (i >= 72 && i < 96) {
      parent1.classList.add("A" + 3);
    } else if (i >= 96 && i < 120) {
      parent1.classList.add("A" + 4);
    } else if (i >= 120 && i < 144) {
      parent1.classList.add("A" + 5);
    } else if (i >= 144 && i < 168) {
      parent1.classList.add("A" + 6);
    }
  }
  let as = document.querySelectorAll(".A1,.A2,.A3,.A4,.A5,.A6");
  for (let a of as) {
    a.classList.add("hide1");
  }
  //   humidity
  let h1 = data.hourly.relative_humidity_2m.slice(0, 24);
  humidity.innerText = h1[time];

  // windspeed
  let w1 = data.hourly.wind_speed_10m.slice(0, 24);
  windSpeed.children[0].innerText = w1[time];

  //   precipitation
  let p1 = data.hourly.precipitation.slice(0, 24);
  precipitation[0].innerText = p1[time];

  //   chance
  let p2 = data.hourly.precipitation_probability.slice(0, 24);
  precipitation[1].innerText = p2[time];

  //   winddirection
  let w2 = data.hourly.wind_direction_10m.slice(0, 24);
  console.log(w2);
  let deg = w2[time];
  if (0 <= deg && deg <= 22) {
    windDirection.children[0].innerText = "North";
  } else if (23 <= deg && deg <= 67) {
    windDirection.children[0].innerText = "North-East";
  } else if (68 <= deg && deg <= 112) {
    windDirection.children[0].innerText = "East";
  } else if (113 <= deg && deg <= 157) {
    windDirection.children[0].innerText = "South-East";
  } else if (158 <= deg && deg <= 202) {
    windDirection.children[0].innerText = "South";
  } else if (203 <= deg && deg <= 247) {
    windDirection.children[0].innerText = "South-West";
  } else if (248 <= deg && deg <= 292) {
    windDirection.children[0].innerText = "West";
  } else if (293 <= deg && deg <= 337) {
    windDirection.children[0].innerText = "North-West";
  } else {
    windDirection.children[0].innerText = "North";
  }
  // max min temp
  let max = 0;
  let min = 100;
  let t1 = data.hourly.temperature_2m.slice(0, 24);
  for (let t of t1) {
    if (t > max) {
      max = t;
    }
    if (t < min) {
      min = t;
    }
    days[0].children[2].children[0].children[0].innerText = "H-" + max + "°";
    days[0].children[2].children[1].innerText = "L-" + min + "°";
    mainTem.innerText = t1[time];
  }
  max = 0;
  min = 100;
  let t2 = data.hourly.temperature_2m.slice(24, 48);
  for (let t of t2) {
    if (t > max) {
      max = t;
    }
    if (t < min) {
      min = t;
    }
    days[1].children[2].children[0].children[0].innerText = "H-" + max + "°";
    days[1].children[2].children[1].innerText = "L-" + min + "°";
  }
  max = 0;
  min = 100;
  let t3 = data.hourly.temperature_2m.slice(48, 72);
  for (let t of t3) {
    if (t > max) {
      max = t;
    }
    if (t < min) {
      min = t;
    }
    days[2].children[2].children[0].children[0].innerText = "H-" + max + "°";
    days[2].children[2].children[1].innerText = "L-" + min + "°";
  }
  max = 0;
  min = 100;
  let t4 = data.hourly.temperature_2m.slice(72, 96);
  for (let t of t4) {
    if (t > max) {
      max = t;
    }
    if (t < min) {
      min = t;
    }
    days[3].children[2].children[0].children[0].innerText = "H-" + max + "°";
    days[3].children[2].children[1].innerText = "L-" + min + "°";
  }
  max = 0;
  min = 100;
  let t5 = data.hourly.temperature_2m.slice(96, 120);
  for (let t of t5) {
    if (t > max) {
      max = t;
    }
    if (t < min) {
      min = t;
    }
    days[4].children[2].children[0].children[0].innerText = "H-" + max + "°";
    days[4].children[2].children[1].innerText = "L-" + min + "°";
  }
  max = 0;
  min = 100;
  let t6 = data.hourly.temperature_2m.slice(120, 144);
  for (let t of t6) {
    if (t > max) {
      max = t;
    }
    if (t < min) {
      min = t;
    }
    days[5].children[2].children[0].children[0].innerText = "H-" + max + "°";
    days[5].children[2].children[1].innerText = "L-" + min + "°";
  }
  max = 0;
  min = 100;
  let t7 = data.hourly.temperature_2m.slice(144, 168);
  for (let t of t7) {
    if (t > max) {
      max = t;
    }
    if (t < min) {
      min = t;
    }
    days[6].children[2].children[0].children[0].innerText = "H-" + max + "°";
    days[6].children[2].children[1].innerText = "L-" + min + "°";
  }

  let A0 = document.querySelectorAll(".A0");
  let A1 = document.querySelectorAll(".A1");
  let A2 = document.querySelectorAll(".A2");
  let A3 = document.querySelectorAll(".A3");
  let A4 = document.querySelectorAll(".A4");
  let A5 = document.querySelectorAll(".A5");
  let A6 = document.querySelectorAll(".A6");
  let bs = document.querySelectorAll(".A0,.A1,.A2,.A3,.A4,.A5,.A6");
  for (let i = 0; i < 7; i++) {
    days[i].addEventListener("click", () => {
      for (let b of bs) {
        b.classList.add("hide1");
      }
      if (i === 0) {
        for (let a of A0) {
          a.classList.remove("hide1");
        }
      }
      if (i === 1) {
        for (let a of A1) {
          a.classList.remove("hide1");
        }
      }
      if (i === 2) {
        for (let a of A2) {
          a.classList.remove("hide1");
        }
      }
      if (i === 3) {
        for (let a of A3) {
          a.classList.remove("hide1");
        }
      }
      if (i === 4) {
        for (let a of A4) {
          a.classList.remove("hide1");
        }
      }
      if (i === 5) {
        for (let a of A5) {
          a.classList.remove("hide1");
        }
      }
      if (i === 6) {
        for (let a of A6) {
          a.classList.remove("hide1");
        }
      }
    });
  }
};

// writing dates on the day panel in box1...
const dater = () => {
  let i = 0;
  for (let dayname of daynames) {
    if (dayname === day) {
      rearr.push(dayname);
      let k = i;
      for (let j = i + 1; j < 7; j++) {
        rearr.push(daynames[j]);
      }
      for (let j = 0; j < i; j++) {
        rearr.push(daynames[j]);
      }
    }
    i++;
  }
  let k = 0;
  for (day of days) {
    day.children[0].children[0].innerText = rearr[k] + " " + (date + k);
    k++;
  }
};

dater();

navigator.geolocation.getCurrentPosition(success);
