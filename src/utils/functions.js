function handleDragOver(e) {
  e.preventDefault();
}
function handleDrag(e) {
  e.currentTarget.classList.add("dragged-passenger");
}
function handleDragEnter(e) {
  e.preventDefault();
  e.currentTarget.classList.add("drag-over");
}
function handleDragLeave(e) {
  e.currentTarget.classList.remove("drag-over");
  e.currentTarget.classList.remove("dragged-passenger");
}
export { handleDragOver, handleDrag, handleDragEnter, handleDragLeave };
