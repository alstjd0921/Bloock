document.querySelector("#entrance-button").addEventListener("click", function () {
    document.querySelector("#main-door").classList.add("fade-out-login");
})



VanillaTilt.init(document.querySelector("#main-door"), {
    max: 10,
    speed: 400
});

//It also supports NodeList
VanillaTilt.init(document.querySelectorAll("#main-door"));