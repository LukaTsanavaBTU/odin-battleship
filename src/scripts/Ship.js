function Ship(length) {
    let hitPoints = length;

    function hit() {
        hitPoints -= 1;
    }
    function isSunk() {
        if (hitPoints <= 0) {
            return true;
        }
        return false;
    }

    return {
        hit, isSunk
    }
}

export default Ship;