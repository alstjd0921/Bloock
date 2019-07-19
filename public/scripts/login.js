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




isInputTextActive();

const mdInputs = document.querySelectorAll('.md-form-control .md-input-text');
blur();
    
// This function check if the input has a value
function isInputTextActive () {
  const mdInput = document.querySelectorAll('.md-form-control .md-input-text');
  for (var i = 0; i < mdInput.length; i++) {
    if (mdInput[i].value.length > 0) {
      mdInput[i].parentElement.classList.add('focus');
    }else {
      mdInput[i].parentElement.classList.remove('focus');
    }
  }
}

// function blur

function blur () {
  for (var i = 0; i < mdInputs.length; i++) {
    mdInputs[i].addEventListener('blur', function () {
      isInputTextActive();
    });
  }
}