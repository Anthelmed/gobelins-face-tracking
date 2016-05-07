const Utils = {
    randomInt: (min,max) => Math.floor(Math.random()*(max-min+1)+min),
    normalize: (min, max, x) => (x - min) / (max - min),
    map: (n, start1, start2, stop1, stop2) => ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2,
    reverseNumber: (num, min, max) => (max + min) - num

}

export default Utils;
