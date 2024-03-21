export default class Utils {
  /**
   * 주어진 최소값(min)과 최대값(max) 사이의 랜덤 정수를 반환합니다.
   * @param min - 반환할 랜덤 숫자의 최소값
   * @param max - 반환할 랜덤 숫자의 최대값
   * @returns min과 max 사이의 랜덤 정수
   */
  static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min // 최댓값, 최솟값 포함
  }
}
