
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
 * バリデーション：数値が0～maxの非負整数かチェック
 * @param { 入力値 } value
 * @param { 最大値 } max
 */
function isValidNonNegativeIntegerInRange(value, max) {
    return /^([0]|[1-9][0-9]*)$/.test(value) && parseInt(value, 10) <= max;
}

/**
 * バリデーション：ダイス表記（例：2D6）または正の整数かチェック
 * @param { 入力値 } value
 */
function isValidWeaponFormat(value) {
    return /^(0|[1-9][0-9]*|[1-9][0-9]*[dD][1-9][0-9]*)$/.test(value);
}

/**
 * 入力チェック関数
 * @returns
 */
export function validateInputs() {
    const loopCount = parseInt(document.getElementById('loopCount').value, 10);
    const errors = [];

    // ループ関数のチェック
    if (!/^[1-9][0-9]*$/.test(loopCount)) {
        errors.push("ループ回数は自然数で入力してください。")
    }

    const playerBlocks = document.querySelectorAll('.playerBlock');
    playerBlocks.forEach((block, index) => {
        const prefix = `共鳴者${index + 1}：`;

        const attackType = block.querySelector('.attackType')?.value;
        const level = block.querySelector('.level')?.value;
        const judge = block.querySelector('.judge')?.value;

        const strField = block.querySelector(`.${attackType}Fields .str`);
        const weaponField = block.querySelector(`.${attackType}Fields .weaponAttackPower`);

        const str = strField ? strField.value : "";
        const weapon = weaponField ? weaponField.value.trim() : "";

        // 攻撃種別のチェック
        if (!attackType || attackType === "none") {
            errors.push(`${prefix}攻撃種別を選択してください。`);
        }

        // 技能レベルのチェック（1～3の正の整数）
        if (!isValidNonNegativeIntegerInRange(level, 3)) {
            errors.push(`${prefix}技能レベルは1～3の自然数で入力してください。`);
        }

        // 判定値のチェック（1～9の正の整数）
        if (!isValidNonNegativeIntegerInRange(judge, 9)) {
            errors.push(`${prefix}判定値は1～9の自然数で入力してください。`);
        }

        // 武器攻撃力のチェック（存在する場合のみ）
        if (weaponField && !isValidWeaponFormat(weapon)) {
            errors.push(`${prefix}武器攻撃力は0または自然数またはダイス形式（例：2D6、1D2）で入力してください。`);
        }

        // ストレングスのチェック（存在する場合のみ）
        if (strField && !isValidNonNegativeIntegerInRange(str, 3)) {
            errors.push(`${prefix}〈ストレングス〉の技能レベルは0または1～3の自然数で入力してください。`);
        }
    });

    if (errors.length > 0) {
        showError(errors);
        return false;
    }

    // エラーなし
    showError([]);
    return true;
}
