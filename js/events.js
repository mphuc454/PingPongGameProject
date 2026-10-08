window.addEventListener("keydown", (e) => {
    if (
        e.ctrlKey &&
        (e.key === "+" || e.key === "-" || e.key === "0" || e.key === "=")
    ) {
        e.preventDefault();
    }
});
window.addEventListener(
    "wheel",
    (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
        }
    },
    { passive: false },
);