const moonPath = "M15.5 27.5C15.5 42.6878 28 55 28 55C12.8122 55 0.5 42.6878 0.5 27.5C0.5 12.3122 12.8122 0 28 0C28 1 15.5 12.3122 15.5 27.5Z";
const sunPath = "M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z";

const darkMode = document.querySelector('#darkMode');
let toggle = false;

darkMode.addEventListener('click', () => {
    //using anime.js
    const timeline = anime.timeline({
        duration: 750,
        easing: "easeOutExpo"
    });
    //add to timeline
    timeline.add({
        targets: ".sun",
        d: [
            {value: moonPath}
        ]
    })
    .add({
        targets: "#darkMode",
        rotate: 320
    }, "-=300")
    .add({
        targets: "section",
        backgroundColor: "rgb(33,33,33)"
    }, "-=700")
});

