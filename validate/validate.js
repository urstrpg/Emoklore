
// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/0/ うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

// ***************************************************
/**
 * バリデーション
 */
// ***************************************************

// バリデーション関数
export function showError(message) {
    const errorDiv = document.getElementById('errorDiv');
    if (errorDiv) {
        // エラーメッセージを初期化
        errorDiv.textContent = '';

        // エラーメッセージをHTMLに表示
        errorDiv.textContent = message;
    }
}

// バリデーションチェック
export function validateInputs() {

    // エラーメッセージの初期化
    const errorDiv = document.getElementById('errorDiv');
    if (errorDiv) {
        errorDiv.textContent = '';
    }

    const attackType = document.getElementById('attackType').value;
    const level = parseInt(document.getElementById('level').value);
    const judge = parseInt(document.getElementById('judge').value);
    const str = parseInt(document.getElementById('str').value);
    const weapon = document.getElementById('weaponAttackPower').value.trim();

    const weaponRegex = /^[0-9]+([Dd][0-9]+)?$/;

    // 攻撃種別のチェック
    if (!attackType || attackType === "none") {
        showError("攻撃種別を選択してください。");
        return false;
    }

    // 技能レベルのチェック
    if (isNaN(level) || level < 1 || level > 3) {
        showError("技能レベルは1～3の整数で入力してください。");
        return false;
    }

    // 判定値のチェック
    if (isNaN(judge) || judge < 1 || judge > 9) {
        showError("判定値は1～9の整数で入力してください。");
        return false;
    }

    // ストレングスのチェック
    if (isNaN(str) || str < 1 || str > 3) {
        showError("〈ストレングス〉の技能レベルは1～3の整数で入力してください。");
        return false;
    }

    // 武器攻撃力のチェック
    if (!weaponRegex.test(weapon)) {
        showError("武器攻撃力は数字とD（例：2D6、5）で入力してください。");
        return false;
    }

    return true;
}
