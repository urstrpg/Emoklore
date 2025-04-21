
// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/04/21 うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

// ***************************************************
/**
 * ダメージ算出
 */
// ***************************************************

// ダメージ算出
function damageRoll() {
    const successes = parseInt(document.getElementById('successes').textContent);
    const str = parseInt(document.getElementById('str').value);

    // 技能ダメージを算出
    let damage = skillDamageRoll(successes, 6);

    // 武器攻撃力を加算
    damage += weaponDamageRoll(document.getElementById('weaponDamage').value);

    // 〈ストレングス〉の技能レベルが1～3の場合、ダメージを加算
    if (1 <= str && str <= 3){
        damage += str
    }

  document.getElementById('damage').textContent = damage;
  }


// ***************************************************
/**
 * 技能ダメージ算出
 * @param { 成功数 } successes
 * @param { 攻撃力 } power
 */
// ***************************************************
function skillDamageRoll(successes, power) {
    let damage = 0;

    // 成功数の回数ダイスロールを行い、技能のダメージを算出
    for (let i = 0; i < successes; i++) {

        // 【成功数】D
        const roll = randomInt(power);
        damage += roll;
    }

    return damage;
  }


// ***************************************************
/**
 * 武器攻撃力算出
 * @param { 武器攻撃力 } weaponDamage
 */
// ***************************************************
function weaponDamageRoll(weaponDamage) {
    weaponDamage = weaponDamage.trim();
  
    // 通常の整数（例:"5"）ならそのまま返却
    if (!weaponDamage.includes('D') && !weaponDamage.includes('d')) {
      return parseInt(weaponDamage, 10);
    }
  
    // "1D2"等の武器攻撃力の入力を、Dを起点に左右に分割
    const [left, right] = weaponDamage.toUpperCase().split('D');
  
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
 */
// ***************************************************

function randomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }