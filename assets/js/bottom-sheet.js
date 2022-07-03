const $ = document.querySelector.bind(document);

const openSheetButton = $(".action-delete");
const sheet = $(".bt-sheet");
const sheetContents = sheet.querySelector(".bt-sheet-contents");
const draggableArea = sheet.querySelector(".bt-sheet-draggable-area");
const buttonTrue = document.querySelector(".bt-sheet-button.true");
const buttonFalse = document.querySelector(".bt-sheet-button.false");

let sheetHeight;

const setSheetHeight = (value) => {
  sheetHeight = Math.max(0, Math.min(30, value));
  sheetContents.style.height = value === 30 ? "243px" : `${sheetHeight}vh`;

  if (sheetHeight === 100) {
    sheetContents.classList.add("fullscreen");
  } else {
    sheetContents.classList.remove("fullscreen");
  }
}

const setIsSheetShown = (value) => {
  sheet.setAttribute("aria-hidden", String(!value));
  document.body.style.overflow = value ? "hidden" : "auto";
}

openSheetButton.addEventListener("click", () => {
  setSheetHeight(Math.min(30, 720 / window.innerHeight * 100));
  setIsSheetShown(true);
});

buttonTrue.addEventListener("click", () => setIsSheetShown(false));
buttonFalse.addEventListener("click", () => setIsSheetShown(false));

sheet.querySelector(".bt-sheet-overlay").addEventListener("click", () => {
  setIsSheetShown(false);
});

const touchPosition = (event) =>
  event.touches ? event.touches[0] : event;

let dragPosition;

const onDragStart = (event) => {
  dragPosition = touchPosition(event).pageY;
  sheetContents.classList.add("not-selectable");
  draggableArea.style.cursor = document.body.style.cursor = "grabbing";
}

const onDragMove = (event) => {
  if (dragPosition === undefined) return;

  const y = touchPosition(event).pageY;
  const deltaY = dragPosition - y;
  const deltaHeight = deltaY / window.innerHeight * 100;

  setSheetHeight(sheetHeight + deltaHeight);
  dragPosition = y;
}

const onDragEnd = () => {
  dragPosition = undefined;
  sheetContents.classList.remove("not-selectable");
  draggableArea.style.cursor = document.body.style.cursor = "";

  if (sheetHeight < 25) {
    setIsSheetShown(false);
  // } else if (sheetHeight > 75) {
  //   setSheetHeight(100);
  } else {
    setSheetHeight(30);
  }
}

draggableArea.addEventListener("mousedown", onDragStart);
draggableArea.addEventListener("touchstart", onDragStart);
window.addEventListener("mousemove", onDragMove);
window.addEventListener("touchmove", onDragMove);
window.addEventListener("mouseup", onDragEnd);
window.addEventListener("touchend", onDragEnd);