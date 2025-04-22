
// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 *  更新履歴
 *  No001 2025/0/ うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

/**
 * 武器攻撃力の入力制御
 * @returns value
 */
export function getActiveWeaponAttackPower() {
    const selected = document.getElementById("attackType").value;
    const field = document.querySelector(`#${selected}Fields input[id="weaponAttackPower"]`);
    const value = field ? field.value.trim() : "";
    if (value === "") {
        showError("武器攻撃力が入力されていません。");
        return "";
    }
    return value;
}

/**
 * 〈ストレングス〉の技能レベルの入力制御
 * @returns value
 */
export function getActiveStrValue() {
    const selected = document.getElementById("attackType").value;
    const field = document.querySelector(`#${selected}Fields input[id="str"]`);
    const value = field ? parseInt(field.value, 10) : 0;
    if (isNaN(value)) {
        showError("〈ストレングス〉の技能レベルが不正です。");
        return 0;
    }
    return value;
}

/**
 * 入力枠を非活性
 */
export function setInputsDisabled(disabled) {
    const inputs = document.querySelectorAll('input, select, button');
    inputs.forEach(input => {

        // 「キャンセル」ボタンだけは無効化しない or 有効化しないように調整
        if (input.id !== 'cancelButton') {
            input.disabled = disabled;
        }
    });
}

/**
 * ボタン表示の制御
 */
export function toggleButtons(isRunning) {
    document.getElementById("startButton").style.display = isRunning ? "none" : "inline";
    document.getElementById("cancelButton").style.display = isRunning ? "inline" : "none";
}
