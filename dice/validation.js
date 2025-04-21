
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

function showError(message) {
    alert(message); // 後でHTMLに表示する形式にもできる
}

function validateInputs() {
    const attackType = document.getElementById('attackType').value;
    const level = parseInt(document.getElementById('level').value);
    const judge = parseInt(document.getElementById('judge').value);
    const str = parseInt(document.getElementById('str').value);
    const weapon = document.getElementById('weaponAttackPower').value.trim();

    const weaponRegex = /^[\d]+([Dd][\d]+)?$/;

    if (!attackType || attackType === "none") {
        showError("攻撃種別を選択してください。");
        return false;
    }

    if (isNaN(level) || level < 1 || level > 3) {
        showError("技能レベルは1～3の整数で入力してください。");
        return false;
    }

    if (isNaN(judge) || judge < 1 || judge > 9) {
        showError("判定値は1～9の整数で入力してください。");
        return false;
    }

    if (isNaN(str) || str < 1 || str > 3) {
        showError("〈ストレングス〉の技能レベルは1～3の整数で入力してください。");
        return false;
    }

    if (!weaponRegex.test(weapon)) {
        showError("武器攻撃力は数字とアルファベット（例：2D6, 5）で入力してください。");
        return false;
    }

    return true;
}
