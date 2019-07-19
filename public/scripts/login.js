document.querySelector("#entrance-button").addEventListener("click", function () {
    document.querySelector("#main-door").classList.add("fade-out-login");
    setTimeout(function() {
        document.querySelector("#main-door").classList.add("display-none")
        document.querySelector("#login-door").classList.remove("display-none");

        document.querySelector("#login-form").classList.remove("display-none");
        setTimeout(function() {
            document.querySelector("#join-form").classList.add("display-none");
            document.querySelector("#login-form").classList.add("fade-in-login");
        }, 100);

    }, 500)
})

document.querySelector("#to-join-button").addEventListener("click", function() {
    document.querySelector("#login-form").classList.add("fade-out-join");

    setTimeout(function() {
        document.querySelector("#join-form").classList.remove("display-none");
        
        setTimeout(function() {
            document.querySelector("#join-form").classList.remove("fade-out-login");
            document.querySelector("#login-form").classList.add("display-none");
            document.querySelector("#join-form").classList.add("fade-in-join");
        }, 100);
    }, 500)
})


document.querySelector("#to-login-button").addEventListener("click", function() {
    document.querySelector("#join-form").classList.add("fade-out-login");

    setTimeout(function() {
        document.querySelector("#join-form").classList.add("display-none");
        document.querySelector("#login-form").classList.remove("display-none");
        
        setTimeout(function() {
            document.querySelector("#login-form").classList.remove("fade-out-join");
        }, 100);
    }, 500)
})



// 비밀번호 확인
document.querySelector("#RegisterConfirmPasswd").addEventListener("focusout", function() {
    if (document.querySelector("#RegisterConfirmPasswd").value != document.querySelector("#RegisterPasswd").value) {
        document.querySelector("#RegisterConfirmPasswdCover").classList.add("shake");
        function inconsistencyToast() {
            var x = document.querySelector("#inconsistency-toast");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
        inconsistencyToast();
        setTimeout(function() {
            document.querySelector("#RegisterConfirmPasswdCover").classList.remove("shake");
        }, 1000);
    }
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