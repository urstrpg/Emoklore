
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
  const levelElem = document.getElementById('level');
  const judgeElem = document.getElementById('judge');

  if (!levelElem || !judgeElem) {
    console.error("level または judge の要素が見つかりません");
    return 0;
  }

  const level = parseInt(levelElem.value);
  const judge = parseInt(judgeElem.value);


  // 成功数を算出
  const successes = rollDice(level, judge);

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

    // 〈★奥義〉で連撃を適用する場合、ダブル成功以上でもう一度ダメージを算出
    if (successes >= 2 && skillAttackPower == 6 && document.getElementById('rengekiFlg')?.checked) {
      damage += damageRoll(successes, skillAttackPower);
    }
  }

  // ダメージを返却
  return damage;
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