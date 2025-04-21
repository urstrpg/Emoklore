
// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/0/ うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

// ***************************************************
/**
 * ダメージ算出
 * @param { 成功数 } successes
 * @param { 技能攻撃力 } skillAttackPower
 */
// ***************************************************

// ダメージ算出
function damageRoll(successes, skillAttackPower) {
  const str = parseInt(document.getElementById('str').value);

  // 技能ダメージを算出
  let damage = 0
  if (skillAttackPower > 0) {
    damage = skillDamageRoll(successes, skillAttackPower);
  } else {
    damage = skillAttackPower;
  }

  // 武器攻撃力を加算
  damage += weaponDamageRoll(document.getElementById('weaponAttackPower').value);

  // 〈ストレングス〉の技能レベルが1～3の場合、ダメージを加算
  if (1 <= str && str <= 3) {
    damage += str
  }

  // ダメージを返却
  return damage;
}


// ***************************************************
/**
 * 技能ダメージ算出
 * @param { 成功数 } successes
 * @param { 技能攻撃力 } skillAttackPower
 */
// ***************************************************
function skillDamageRoll(successes, skillAttackPower) {
  let skillDamage = 0;

  // 成功数の回数ダイスロールを行い、技能のダメージを算出
  for (let i = 0; i < successes; i++) {

    // 【成功数】D
    const roll = randomInt(skillAttackPower);
    skillDamage += roll;
  }

  // ダメージを返却
  return skillDamage;
}


// ***************************************************
/**
 * 武器攻撃力算出
 * @param { 武器攻撃力 } weaponAttackPower
 * @returns damage
 */
// ***************************************************
function weaponDamageRoll(weaponAttackPower) {
  weaponAttackPower = weaponAttackPower.trim();

  // 通常の整数（例:"5"）ならそのまま返却
  if (!weaponAttackPower.includes('D') && !weaponAttackPower.includes('d')) {
    return parseInt(weaponAttackPower, 10);
  }

  // "1D2"等の武器攻撃力の入力を、Dを起点に左右に分割
  const [left, right] = weaponAttackPower.toUpperCase().split('D');

  const roll = parseInt(left, 10);
  const dice = parseInt(right, 10);

  // 後々ここはエラーメッセージにしたい
  if (isNaN(roll) || isNaN(dice)) return 0;

  // ダメージを算出
  let damage = 0;
  for (let i = 0; i < roll; i++) {
    damage += randomInt(dice);
  }

  return damage;
}


// ***************************************************
/**
 * ランダムなダイス目の獲得
 * @param { 最大値 } max
 * @returns roll
 */
// ***************************************************

function randomInt(max) {
  let roll = Math.floor(Math.random() * max) + 1;
  return roll;
}