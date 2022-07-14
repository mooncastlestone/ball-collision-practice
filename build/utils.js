export default class Utils {
    static getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min; // 최댓값, 최솟값 포함
    }
}
