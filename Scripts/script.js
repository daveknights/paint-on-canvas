class Paint {
    height = 600;
    width = window.innerWidth - 40;

    constructor(canvas) {
        this.appCanvas = document.querySelector(canvas);
        this.appCanvas.height = this.height;
        this.appCanvas.width = this.width;
        this.canvasContext = this.appCanvas.getContext('2d');
        this.brushSize = 20;
        this.brushShape = 'circle';
        this.inkColour = 'rgb(200,200,200)';

        this.appCanvas.addEventListener('mousedown', e => {
            this.drawing = true;
        });

        this.appCanvas.addEventListener('mouseup', () => {
            this.drawing = false;
        });

        this.appCanvas.addEventListener('mousemove', e => {
            this.mouseX = e.clientX - (this.brushShape === 'circle' ? 20 : (this.brushSize/2 + 20));
            this.mouseY = e.clientY - (this.brushShape === 'circle' ? 20 : (this.brushSize/2 + 20));
        });
    }

    setBrushSize = e => {
        if (e.target.dataset.size === 'bigger') {
            this.brushSize = this.brushSize !== 100 ? this.brushSize += 10 : this.brushSize;
        } else {
            this.brushSize = this.brushSize !== 10 ? this.brushSize -= 10 : this.brushSize;
        }
    }

    clearCanvas = () => {
        this.canvasContext.fillStyle = 'rgb(255,255,255)';
        this.canvasContext.fillRect(0, 0, this.width, this.height);
    }

    setInkColour = e => {
        this.inkColour = e.target.dataset.col;
    }

    setBrushShape = e => {
        this.brushShape = e.target.dataset.shape;
    }

    getBrushShape = e => {
        if (this.brushShape === 'square') {
            this.canvasContext.fillRect(this.mouseX, this.mouseY, this.brushSize, this.brushSize);
        } else {
            this.canvasContext.beginPath();
            this.canvasContext.arc(this.mouseX, this.mouseY, this.brushSize, 0, 2 * Math.PI, false);
            this.canvasContext.fill();
        }
    }

    draw = () => {
        if (this.drawing) {
            this.canvasContext.fillStyle = this.inkColour;
            this.getBrushShape();
        }

        requestAnimationFrame(this.draw);
    }

    init() {
        document.querySelector('.brush-size-container').addEventListener('click', this.setBrushSize);
        document.querySelector('.clear').addEventListener('click', this.clearCanvas);
        document.querySelector('.shapes').addEventListener('click', this.setBrushShape);
        document.querySelector('.colours').addEventListener('click', this.setInkColour);

        this.draw();
    }
}

const paint = new Paint('canvas');
paint.init();
