import { setInputsDisabled } from '../util/input.js';

// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/0/ うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

// ***************************************************
/**
 * ループ処理
 */
// ***************************************************

let isCancelled = false;

// キャンセル処理
export function cancelLoop() {
    isCancelled = true;

    // キャンセル後の表示処理
    const progressBar = document.getElementById('progressBar');

    // プログレスバーを隠す
    progressBar.style.display = "none";

    // 進行状況テキストを更新
    progressText.textContent = "キャンセルされました。";

    // ボタン切り替え
    document.getElementById("cancelButton").style.display = "none";
    document.getElementById("startButton").style.display = "inline";
}


// ループ処理
export function loop() {
    // キャンセルフラグをリセット
    isCancelled = false;

    // 入力が不正の場合中断
    if (!validateInputs()) return 0;

    // 入力枠を非活性
    setInputsDisabled(true);

    // ボタン切り替え
    document.getElementById("startButton").style.display = "none";
    document.getElementById("cancelButton").style.display = "inline";

    const loopCount = parseInt(document.getElementById('loopCount').value, 10);
    if (isNaN(loopCount) || loopCount <= 0) return;

    let sumDamage = 0;
    let count = 0;
    const batchSize = 100;

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const avrOutput = document.getElementById('avrDamage');

    // 初期設定
    progressBar.style.display = "block";
    progressBar.value = 0;
    progressText.textContent = "0% 完了";
    avrOutput.textContent = "---";

    // 入力回数ダメージを算出
    function runBatch() {
        if (isCancelled) {
            progressText.textContent = "キャンセルされました。";
            progressBar.style.display = "none";
            return;
        }

        for (let i = 0; i < batchSize && count < loopCount; i++) {

            // 算出したダメージを加算
            sumDamage += skillRoll();
            count++;
        }

        const percent = Math.floor((count / loopCount) * 100);
        progressBar.value = percent;
        progressText.textContent = `${percent}% 完了`;

        if (count < loopCount) {
            setTimeout(runBatch, 0);
        } else {

            // ダメージの平均値を算出
            const avg = (sumDamage / loopCount).toFixed(2);
            avrOutput.textContent = avg;
            progressText.textContent = "完了！";

            // ボタン切り替え
            document.getElementById("cancelButton").style.display = "none";
            document.getElementById("startButton").style.display = "inline";

            // 入力枠を有効化
            setInputsDisabled(false);
        }
    }

    // 初回のバッチ処理実行
    runBatch();
}