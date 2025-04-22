// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/0/ うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

/**
 * プログレスバー更新
 * @param { パーセント } percent
 */
export function updateProgress(percent) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    progressBar.value = percent;
    progressText.textContent = `${percent}% 完了`;
}

/**
 * プログレスバー初期化
 */
export function resetProgress() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    progressBar.style.display = "block";
    progressBar.value = 0;
    progressText.textContent = "0% 完了";
}

/**
 * プログレスバー取消
 * @param {message} message
 */
export function hideProgress(message = "キャンセルされました。") {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    progressBar.style.display = "none";
    progressText.textContent = message;
}

/**
 * 平均ダメージを出力
 * @param {value} value
 */
export function setAverageDamage(value) {
    const avrOutput = document.getElementById('avrDamage');
    if (avrOutput) avrOutput.innerHTML = value ?? "---";
}

