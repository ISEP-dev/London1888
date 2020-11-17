class MathHelpers {
    static getDistanceBetween(a, b) {
        Math.sqrt(Math.pow((a.posX - b.posX), 2) + Math.pow((a.posY - b.posY), 2))
    }
}

export default MathHelpers;
