import { setInputsDisabled, toggleButtons } from '../util/input.js';
import { updateProgress, resetProgress, hideProgress, setAverageDamage } from '../util/ui.js';

import { validateInputs } from '../validate/validate.js';
import { skillRoll } from './skillDice.js';

// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/0/ うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

/**
 * 初期化
 */
let isCancelled = false;

/**
 * キャンセル処理
 */
export function cancelLoop() {
    isCancelled = true;

    // プログレスバー非表示とテキスト更新
    hideProgress();

    // ボタン切り替え
    toggleButtons(false);
}

/**
 * ループ処理
 */
export function loop() {
    // キャンセルフラグをリセット
    isCancelled = false;

    // 入力が不正の場合中断
    if (!validateInputs()) return 0;

    const loopCount = parseInt(document.getElementById('loopCount').value, 10);

    // 入力枠を非活性
    setInputsDisabled(true);

    // ボタン切り替え
    toggleButtons(true);

    let sumDamage = 0;
    let count = 0;
    const batchSize = 100;

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const avrOutput = document.getElementById('avrDamage');

    // 初期設定
    resetProgress();
    setAverageDamage("---");

    // 入力回数ダメージを算出
    function runBatch() {
        if (isCancelled) {
            hideProgress();
            return;
        }

        for (let i = 0; i < batchSize && count < loopCount; i++) {

            // 算出したダメージを加算
            sumDamage += skillRoll();
            count++;
        }

        const percent = Math.floor((count / loopCount) * 100);
        updateProgress(percent);

        if (count < loopCount) {
            setTimeout(runBatch, 0);
        } else {

            // ダメージの平均値を算出
            const avg = (sumDamage / loopCount).toFixed(2);
            setAverageDamage(avg);
            hideProgress("完了！");

            // ボタン切り替え
            toggleButtons(false);

            // 入力枠を有効化
            setInputsDisabled(false);
        }
    }

    // 初回のバッチ処理実行
    runBatch();
}