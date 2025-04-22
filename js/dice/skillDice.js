import { damageRoll } from './damage.js';

// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/0/ うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

/**
 * 技能判定
 * @param {HTMLElement} playerBlock - .playerBlock 要素
 * @returns {number} damage
 */
export function skillRoll(playerBlock) {
  const level = parseInt(playerBlock.querySelector('.level').value, 10);
  const judge = parseInt(playerBlock.querySelector('.judge').value, 10);
  const attackType = playerBlock.querySelector('.attackType').value;
  let damage = 0;

  // 成功数を算出
  const successes = rollDice(level, judge);

  // 成功数が0以下の時、処理をスキップ
  if (successes > 0) {

    // 選択した技能によって技能攻撃力を決定
    let skillAttackPower = 0
    switch (attackType) {
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
    damage = damageRoll(successes, skillAttackPower, playerBlock);

    // 〈★奥義〉で連撃を適用する場合、ダブル成功以上でもう一度ダメージを算出
    const rengeki = playerBlock.querySelector('#rengekiFlg');
    if (attackType === 'mystery' && successes >= 2 && rengeki?.checked) {
      damage += damageRoll(successes, skillAttackPower, playerBlock);
    }
  }

  // ダメージを返却
  return damage;
}

/**
 * 成功数算出
 * @param {level} level
 * @param {judge} judge
 * @returns {successes} successes
 */
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