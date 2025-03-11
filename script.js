let highestZ = 10;

class Paper {
    holdingPaper = false;

    prevX = 0;
    prevY = 0;

    curX = 0;
    curY = 0;

    curPaperX = 0;
    curPaperY = 0;

    init(paper) {
        const startDrag = (x, y) => {
            this.holdingPaper = true;
            paper.style.zIndex = highestZ++;
            this.prevX = x;
            this.prevY = y;
        };

        const movePaper = (x, y) => {
            if (!this.holdingPaper) return;
            this.curX = x;
            this.curY = y;

            this.curPaperX += this.curX - this.prevX;
            this.curPaperY += this.curY - this.prevY;

            this.prevX = this.curX;
            this.prevY = this.curY;

            paper.style.transform = `translate(${this.curPaperX}px, ${this.curPaperY}px)`;
        };

        const endDrag = () => (this.holdingPaper = false);

        // Mouse Events
        paper.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
        document.addEventListener('mousemove', (e) => movePaper(e.clientX, e.clientY));
        window.addEventListener('mouseup', endDrag);

        // Touch Events
        paper.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX, e.touches[0].clientY));
        document.addEventListener('touchmove', (e) => movePaper(e.touches[0].clientX, e.touches[0].clientY));
        window.addEventListener('touchend', endDrag);
    }
}

document.querySelectorAll('.paper').forEach((paper) => new Paper().init(paper));
