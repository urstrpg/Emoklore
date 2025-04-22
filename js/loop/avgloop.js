import { setInputsDisabled, toggleButtons } from '../util/input.js';
import { updateProgress, resetProgress, hideProgress, setAverageDamage } from '../util/ui.js';

import { validateInputs } from '../validate/validate.js';
import { skillRoll } from '../dice/skillDice.js';

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

    // 入力枠を再活性
    setInputsDisabled(false);
}

/**
 * ループ処理
 */
export function avgloop() {
    // キャンセルフラグをリセット
    isCancelled = false;

    // 入力が不正の場合中断
    if (!validateInputs()) return 0;

    const loopCount = parseInt(document.getElementById('loopCount').value, 10);

    const playerBlocks = Array.from(document.querySelectorAll('.playerBlock'));
    if (playerBlocks.length === 0) return;

    // 入力枠を非活性
    setInputsDisabled(true);

    // ボタン切り替え
    toggleButtons(true);

    const playerCount = playerBlocks.length;
    const damageSums = Array(playerCount).fill(0);
    const damageCounts = Array(playerCount).fill(0);
    const batchSize = 100;

    let count = 0;
    let sumDamage = 0;

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

            // 共鳴者毎にダメージを算出し加算
            const playerIndex = count % playerCount;
            const block = playerBlocks[playerIndex];
            const dmg = skillRoll(block);
            damageSums[playerIndex] += dmg;
            damageCounts[playerIndex]++;

            // 全体のダメージを合計
            sumDamage += dmg;
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

            // 各共鳴者の合計と平均を表示
            const perPlayerStats = damageSums.map((sum, i) => {
                const avg = damageCounts[i] > 0 ? (sum / damageCounts[i]).toFixed(2) : "N/A";
                return `共鳴者${i + 1} 合計： ${damageSums[i]} / 平均：${avg}`;
            });

            // 全体の平均と合計を表示
            setAverageDamage(`全共鳴者 合計：${sumDamage} / 平均：${avg}<br>${perPlayerStats.join("<br>")}`);

            // ボタン切り替え
            toggleButtons(false);

            // 入力枠を有効化
            setInputsDisabled(false);
        }
    }

    // 初回のバッチ処理実行
    runBatch();
}