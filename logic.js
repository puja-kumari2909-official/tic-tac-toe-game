let megcontainer = document.querySelector(".meg-container");
let meg = document.querySelector(".meg");
let newbtn = document.querySelector(".nbtn");
let resetbtn = document.querySelector(".rbtn");
let boxes = document.querySelectorAll(".box");
let body = document.querySelector("body");
let btn = document.createElement("button");
btn.innerText = "theme";
console.log(btn);
body.prepend(btn);
btn.classList.add("btn");
let currmode = "light";
btn.addEventListener("click", () => {
    if (currmode === "light") {
        currmode = "dark";
        body.classList.add("dark");
        body.classList.remove("light");
    } else {
        currmode = "light";
        body.classList.add("light");
        body.classList.remove("dark");
    }
    console.log(currmode);
});
let winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let turn0 = true;
const resetgame = () => {
    turn0 = true;
    enablebtn();
    megcontainer.classList.add("hide");
}
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "")
            return;

        if (turn0) {
            box.innerText = "X";
            box.style.color = "black";
            turn0 = false;
        } else {
            box.innerText = "O";
            box.style.color = "white";
            turn0 = true;
        }
        box.disabled = true;
        checkwinner();
    });
});
let disablebtn = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
let enablebtn = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "";
    }
}
const showwinner = (winner) => {
    if (winner === "Draw") {
        meg.innerText = "it's a draw";
    } else {
        meg.innerText = `congratulations the winner is ${winner}`;
    }
    megcontainer.classList.remove("hide");
}
const checkwinner = () => {
    for (let pattern of winpatterns) {
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;
        if (posVal1 !== "" && posVal2 !== "" && posVal3 !== "") {
            if (posVal1 == posVal2 && posVal2 === posVal3) {
                console.log("winner", posVal1);
                showwinner(posVal1);
                disablebtn();
                return;
            }
        }
    }
    let allfilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allfilled = false;
        }
    });
    if (allfilled) {
        showwinner("Draw");
    };
}
newbtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);