class DropdownMenu {
    constructor(title, btnEl, itemConEl, itemsEl, id) {
        this.title = title;
        this.btn = btnEl;
        this.itemCon = itemConEl;
        this.items = itemsEl;
        this.id = id;
        this.menuStateOn = false;
    }

    static objArr = [];

    toggleMenuState = function () {
        this.menuStateOn = !this.menuStateOn;
    };

    getMenuState = function () {
        console.log(this.menuStateOn);
    };
}

const dropdownMenus = Array.from(
    document.querySelectorAll("#dropdownMenuMainCon")
);

dropdownMenus.forEach((menu) => {
    const menuBtn = menu.querySelector("#dropdownMenuBtn");
    const title = menuBtn.textContent;
    const itemCon = menu.querySelector("#dropdownMenuItemCon");
    const items = Array.from(menu.querySelectorAll(".dropdownMenuItem"));

    const ID = crypto.randomUUID();

    const btnObj = new DropdownMenu(title, menuBtn, itemCon, items, ID);

    menu.setAttribute("data-id", ID);
    DropdownMenu.objArr.push(btnObj);
    // console.log(DropdownMenu.objArr);
});

const dropdownMenuBtns = Array.from(
    document.querySelectorAll("#dropdownMenuBtn")
);

dropdownMenuBtns.forEach((button) => {
    const menuObj = matchID(button.parentNode);
    // console.log(menuObj);
    button.addEventListener("click", (e) => {
        // console.log(menutateOn);
        const menuContent = e.target.parentNode.querySelector(
            "#dropdownMenuItemCon"
        );
        console.log(menuObj.menuStateOn);
        if (menuObj.menuStateOn === false) {
            menuContent.classList.remove("hidden");
        } else if (menuObj.menuStateOn === true) {
            menuContent.classList.add("hidden");
        }

        menuObj.menuStateOn = !menuObj.menuStateOn;

        DropdownMenu.objArr.forEach((obj) => {
            if (obj.id !== button.parentNode.getAttribute("data-id")) {
                const el = revMatchID(obj);
                const itemCon = el.querySelector("#dropdownMenuItemCon");
                if (!itemCon.classList.contains("hidden")) {
                    itemCon.setAttribute("class", "hidden");
                }

                obj.menuStateOn = false;
            }
        });
    });
});

function matchID(el) {
    const elID = el.getAttribute("data-id");
    return DropdownMenu.objArr.find((obj) => {
        return obj.id.trim() === elID.trim();
    });
}

function revMatchID(obj) {
    const objID = obj.id;
    return document.querySelector(`[data-id='${objID}']`);
}

document.addEventListener("click", (e) => {
    const target = e.target;
    // console.log(target.parentNode);
    //console.log(target.parentNode.getAttribute("id"));
    if (
        target.parentNode === document ||
        (target.getAttribute("id") !== "dropdownMenuBtn" &&
            target.parentNode.getAttribute("id") !== "dropdownMenuItemCon")
    ) {
        // console.log(target.getAttribute("id"));
        const drpdownMenuCons = Array.from(
            document.querySelectorAll("#dropdownMenuItemCon")
        );
        drpdownMenuCons.forEach((con) => {
            if (!con.classList.contains("hidden")) {
                con.classList.add("hidden");
            }
        });
        DropdownMenu.objArr.forEach((obj) => {
            obj.menuStateOn = false;
        });
    }
});
