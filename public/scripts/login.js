document.querySelector("#entrance-button").addEventListener("click", function () {
    document.querySelector("#main-door").classList.add("fade-out-login");
    setTimeout(function() {
        document.querySelector("#main-door").classList.add("display-none")
        document.querySelector("#login-door").classList.remove("display-none");

        document.querySelector("#login-form").classList.add("fade-in-login");
    }, 500)
})



VanillaTilt.init(document.querySelector("#main-door"), {
    max: 10,
    speed: 400
});

//It also supports NodeList
VanillaTilt.init(document.querySelectorAll("#main-door"));