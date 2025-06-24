const dropdownMenuBtns = Array.from(
    document.querySelectorAll("#dropdownMenuBtn")
);

console.log(dropdownMenuBtns);

let menuStateOn = false;

dropdownMenuBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
        
        console.log(menuStateOn);
        const menuContent = e.target.parentNode.querySelector("#dropdownMenuItemCon");
        console.log(menuContent);
        if (menuStateOn === false) {
            menuContent.classList.remove("hidden");
        } else if (menuStateOn === true) {
            menuContent.classList.add("hidden");
        }

        menuStateOn = !menuStateOn;
    });
});
