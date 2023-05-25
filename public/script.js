// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwXE6K4i3FXlvYoHPlxHJuiKOBQ8rjnzg",
    authDomain: "esp-firebase-22c67.firebaseapp.com",
    databaseURL: "https://esp-firebase-22c67-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "esp-firebase-22c67",
    storageBucket: "esp-firebase-22c67.appspot.com",
    messagingSenderId: "285861200683",
    appId: "1:285861200683:web:a03af4f2241d4e6f99fb6e"
};

const app = initializeApp(firebaseConfig);

import { getDatabase, ref, child, onValue, get }
from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
// Initialize Firebase

const db = getDatabase();

const maxDistance = 18;

let dry_percentage = document.getElementById("dry-percentage");
let dry_count = document.getElementById("dry-count");
let dry_noti = document.getElementById("dry-noti");
let dry_counter = 0;
let wet_percentage = document.getElementById("wet-percentage");
let wet_count = document.getElementById("wet-count");
let wet_noti = document.getElementById("wet-noti");
let wet_counter = 0;

// ------- change and edit only the variables below this section ------- //
let dry_percentage_value = 50;
let dry_count_value = 6;
let wet_percentage_value = 50;
let wet_count_value = 4;
// ------- change and edit only the variables above this section ------- //


// fansy number increasing
for (dry_counter = 0; dry_counter < dry_percentage;) {
    dry_counter++;
    dry_percentage.innerHTML = dry_counter + "%";
    setTimeout(() => {}, 17);
}

for (wet_counter = 0; wet_counter < wet_percentage;) {
    wet_counter++;
    wet_percentage.innerHTML = wet_counter + "%";
    setTimeout(() => {}, 17);
}
// setInterval(() => {
// if (dry_counter == dry_percentage_value) {
//     clearInterval();
// } else {
//     dry_counter += 1;
//     dry_percentage.innerHTML = dry_counter + "%";
// }
// }, 17);
// setInterval(() => {
// if (wet_counter == wet_percentage_value) {
//     clearInterval();
// } else {
//     wet_counter += 1;
//     wet_percentage.innerHTML = wet_counter + "%";
// }
// }, 17);
// ------------------------

let r = document.querySelector(':root');
let rs = getComputedStyle(r);
let dry_dashoffset = 1100 - 1100*dry_percentage_value/100;
let wet_dashoffset = 1100 - 1100*wet_percentage_value/100;
r.style.setProperty('--dry-dashoffset', dry_dashoffset);
r.style.setProperty('--wet-dashoffset', wet_dashoffset);
r.style.setProperty('--dry-time', 0.016*dry_percentage_value + "s");
r.style.setProperty('--wet-time', 0.016*wet_percentage_value + "s");

console.log('kuy');

function min(a, b) {
    if (a < b) {
        return a;
    }
    return b;
}

function getData() {
    const dbRef = ref(db);

    get(child(dbRef, "data"))
    .then((snapshot) => {
        console.log(snapshot)
        console.log(snapshot.val())
        dry_percentage_value = parseInt(100 * ((maxDistance - min(maxDistance, parseInt(snapshot.val().Distance2))) / maxDistance))
        wet_percentage_value = parseInt(100 * ((maxDistance - min(maxDistance, parseInt(snapshot.val().Distance1))) / maxDistance))
        dry_count_value = parseInt(snapshot.val().Dry);
        wet_count_value = parseInt(snapshot.val().Wet);
        
        console.log(dry_percentage_value, wet_percentage_value);
    })
}

getData();

function update() {
    dry_counter = dry_percentage_value;
    wet_counter = wet_percentage_value;
    dry_dashoffset = 1100 - 1100*dry_percentage_value/100;
    wet_dashoffset = 1100 - 1100*wet_percentage_value/100;
    dry_percentage.innerHTML = dry_counter + "%";
    wet_percentage.innerHTML = wet_counter + "%";
    r.style.setProperty('--dry-dashoffset', dry_dashoffset);
    r.style.setProperty('--wet-dashoffset', wet_dashoffset);
    if (dry_percentage_value >= 70) {
        dry_noti.innerHTML = "Nearly full!";
    } else {
        dry_noti.innerHTML = "Still fine";
    }
    if (wet_percentage_value >= 70) {
        wet_noti.innerHTML = "Nearly full!";
    } else {
        wet_noti.innerHTML = "Still fine";
    }
    dry_count.innerHTML = "Count: " + dry_count_value;
    wet_count.innerHTML = "Count: " + wet_count_value;
}

// แค่ว่าถ้า % เป็น 0 แล้วให้ set ค่า count เป็น 0 ด้วยเฉยๆ แก้โค้ดได้
if (dry_percentage_value == 0) dry_count_value = 0;
if (wet_percentage_value == 0) wet_count_value = 0;

dry_count.innerHTML = "Count: " + dry_count_value;
wet_count.innerHTML = "Count: " + wet_count_value;

if (dry_percentage_value >= 70) dry_noti.innerHTML = "Nearly full!";
if (wet_percentage_value >= 70) wet_noti.innerHTML = "Nearly full!";

setInterval(() => {
    getData();
    update();
}, 1000)
