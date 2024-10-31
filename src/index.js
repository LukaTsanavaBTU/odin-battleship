const grids = document.querySelectorAll(".grid");

grids.forEach((grid) => {
    for (let i = 0; i < 100; i++) {
        const gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        grid.appendChild(gridCell);
    }
});