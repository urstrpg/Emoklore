
// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/0/ うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△


/**
 * ランダムなダイス目の獲得
 * @param { 最大値 } max
 * @returns roll
 */
export function randomInt(max) {
    let roll = Math.floor(Math.random() * max) + 1;
    return roll;
}
