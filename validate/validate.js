
// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/0/ うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△


/**
 * バリデーション：エラー表示
 * @param { メッセージ } message
 */
export function showError(message) {
    const errorDiv = document.getElementById('errorDiv');
    if (errorDiv) {
        // エラーメッセージをHTMLに表示
        errorDiv.textContent = message;
    }
}


/**
 * バリデーション：数値が1～maxの正の整数かチェック
 * @param { 入力値 } value
 * @param { 最大値 } max
 */
function isValidPositiveIntegerInRange(value, max) {
    return /^[1-9][0-9]*$/.test(value) && parseInt(value, 10) <= max;
}

/**
 * バリデーション：ダイス表記（例：2D6）または正の整数かチェック
 * @param { 入力値 } value
 */
function isValidWeaponFormat(value) {
    return /^([1-9][0-9]*|[1-9][0-9]*[dD][1-9][0-9]*)$/.test(value);
}

/**
 * 入力チェック関数
 * @returns
 */
export function validateInputs() {
    const attackType = document.getElementById('attackType').value;
    const level = document.getElementById('level').value;
    const judge = document.getElementById('judge').value;
    const strField = document.querySelector(`#${attackType}Fields input[id="str"]`);
    const str = strField ? strField.value : "";
    const weaponField = document.querySelector(`#${attackType}Fields input[id="weaponAttackPower"]`);
    const weapon = weaponField ? weaponField.value.trim() : "";

    // エラー初期化
    showError("");

    // 攻撃種別のチェック
    if (!attackType || attackType === "none") {
        showError("攻撃種別を選択してください。");
        return false;
    }

    // 技能レベルのチェック（1～3の正の整数）
    if (!isValidPositiveIntegerInRange(level, 3)) {
        showError("技能レベルは1～3の正の整数で入力してください。");
        return false;
    }

    // 判定値のチェック（1～9の正の整数）
    if (!isValidPositiveIntegerInRange(judge, 9)) {
        showError("判定値は1～9の正の整数で入力してください。");
        return false;
    }

    // ストレングスのチェック（存在する場合のみ）
    if (strField && !isValidPositiveIntegerInRange(str, 3)) {
        showError("〈ストレングス〉の技能レベルは1～3の正の整数で入力してください。");
        return false;
    }

    // 武器攻撃力のチェック（存在する場合のみ）
    if (weaponField && !isValidWeaponFormat(weapon)) {
        showError("武器攻撃力は正の整数またはダイス形式（例：2D6、1D2）で入力してください。");
        return false;
    }

    return true;
}
