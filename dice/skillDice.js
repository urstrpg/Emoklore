
// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/0/ うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

// ***************************************************
/**
 * 技能判定
 */
// ***************************************************

// 技能判定
function skillRoll() {

  // 入力が不正の場合中断
  if (!validateInputs()) return;

  const level = parseInt(document.getElementById('level').value);
  const judge = parseInt(document.getElementById('judge').value);

  // 成功数を算出
  const successes = rollDice(level, judge);
  document.getElementById('successes').textContent = successes;

  // 成功数が0以下の時、処理をスキップ
  let damage = 0;
  if (successes > 0) {

    // 選択した技能によって技能攻撃力を決定
    let skillAttackPower = 0
    switch (document.getElementById('attackType').value) {
      case 'martialArts':
        skillAttackPower = 3;
        break;
      case 'mystery':
        skillAttackPower = 6;
        break;
      default:
        skillAttackPower = 0;
    }

    // ダメージを算出
    damage = damageRoll(successes, skillAttackPower);
  }

  document.getElementById('damage').textContent = damage;
}


// ***************************************************
/**
 * 成功数算出
 * @param { 技能レベル } level
 * @param { 判定値 } judge
 */
// ***************************************************

function rollDice(level, judge) {
  let successes = 0;

  // 技能レベルの回数ダイスロールを行い、成功数を算出
  for (let i = 0; i < level; i++) {

    // 1D10を振る
    const roll = Math.floor(Math.random() * 10) + 1;

    // ダイスロールの結果が判定値以下だった場合、成功数を1増加
    if (roll <= judge) {
      successes += 1;

      // ダイスロールの結果が1だった場合、成功数をさらに1増加
      if (roll === 1) {
        successes += 1;
      }

      // ダイスロールの結果が10だった場合、成功数を1減少
    } else if (roll === 10) {
      successes -= 1;
    }
  }

  // 成功数を返却
  return successes;
}

function getActiveWeaponAttackPower() {
  const selected = document.getElementById("attackType").value;
  const field = document.querySelector(`#${selected}Fields input[id="weaponAttackPower"]`);
  return field ? field.value : "";
}

function getActiveStrValue() {
  const selected = document.getElementById("attackType").value;
  const field = document.querySelector(`#${selected}Fields input[id="str"]`);
  return field ? parseInt(field.value, 10) : 0;
}