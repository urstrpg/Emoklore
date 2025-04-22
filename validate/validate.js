
// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/0/ うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△


/**
 * バリデーション：エラー表示
 * @param { メッセージ } messages
 */
export function showError(messages) {
    const errorDiv = document.getElementById('errorDiv');
    if (errorDiv) {
        // エラーメッセージをHTMLに表示
        errorDiv.innerHTML = messages.map(msg => `<div>${msg}</div>`).join('');
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
    const loopCount = parseInt(document.getElementById('loopCount').value, 10);
    const attackType = document.getElementById('attackType').value;
    const level = document.getElementById('level').value;
    const judge = document.getElementById('judge').value;
    const strField = document.querySelector(`#${attackType}Fields input[id="str"]`);
    const str = strField ? strField.value : "";
    const weaponField = document.querySelector(`#${attackType}Fields input[id="weaponAttackPower"]`);
    const weapon = weaponField ? weaponField.value.trim() : "";
    const errors = [];

    // ループ関数のチェック
    if (!/^[1-9][0-9]*$/.test(loopCount)) {
        errors.push("ループ回数は正の整数で入力してください。")
    }

    // 攻撃種別のチェック
    if (!attackType || attackType === "none") {
        errors.push("攻撃種別を選択してください。");
    }

    // 技能レベルのチェック（1～3の正の整数）
    if (!isValidPositiveIntegerInRange(level, 3)) {
        errors.push("技能レベルは1～3の正の整数で入力してください。");
    }

    // 判定値のチェック（1～9の正の整数）
    if (!isValidPositiveIntegerInRange(judge, 9)) {
        errors.push("判定値は1～9の正の整数で入力してください。");
    }

    // 武器攻撃力のチェック（存在する場合のみ）
    if (weaponField && !isValidWeaponFormat(weapon)) {
        errors.push("武器攻撃力は正の整数またはダイス形式（例：2D6、1D2）で入力してください。");
    }

    // ストレングスのチェック（存在する場合のみ）
    if (strField && !isValidPositiveIntegerInRange(str, 3)) {
        errors.push("〈ストレングス〉の技能レベルは1～3の正の整数で入力してください。");
    }

    if (errors.length > 0) {
        showError(errors);
        return false;
    }

    // エラーなし
    showError([]);
    return true;
}
