const handleDragOver = (e) => {
  e.preventDefault();
}
const handleDrag = (e) => {
  e.currentTarget.classList.add("dragged-passenger");
}
const handleDragEnter = (e) => {
  e.preventDefault();
  e.currentTarget.classList.add("drag-over");
}
const handleDragLeave = (e) => {
  e.currentTarget.classList.remove("drag-over");
  e.currentTarget.classList.remove("dragged-passenger");
}
export { handleDragOver, handleDrag, handleDragEnter, handleDragLeave };
