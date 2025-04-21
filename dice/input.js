
// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/0/ うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

// ***************************************************
/**
 * 入力制御
 */
// ***************************************************

// 武器攻撃力
function getActiveWeaponAttackPower() {
    const selected = document.getElementById("attackType").value;
    const field = document.querySelector(`#${selected}Fields input[id="weaponAttackPower"]`);
    return field ? field.value : "";
}

// 〈ストレングス〉の技能レベル
function getActiveStrValue() {
    const selected = document.getElementById("attackType").value;
    const field = document.querySelector(`#${selected}Fields input[id="str"]`);
    return field ? parseInt(field.value, 10) : 0;
}