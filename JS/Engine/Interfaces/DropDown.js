(() => {
    const framerate = document.getElementById("framerate");
    const dropdownElement = document.getElementById("myDropdown");

    function dropdown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    function changeFrameRate() {
        framerate.innerText = this.innerText;
    }

    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            let dropdowns = document.getElementsByClassName("dropdown-content");
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    for (let child of document.getElementsByClassName("dropbtn")) {
        child.onclick = dropdown;
    }

    for (let child of dropdownElement.children) {
        child.onclick = changeFrameRate;
    }

})();