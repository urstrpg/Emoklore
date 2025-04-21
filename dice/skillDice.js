
// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/04/21 うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

// ***************************************************
/**
 * 技能判定
 */
// ***************************************************

// 技能判定
function skillRoll() {
    const level = parseInt(document.getElementById('level').value);
    const judge = parseInt(document.getElementById('judge').value);

    // 成功数を算出
    const successes = rollDice(level, judge);

  document.getElementById('successes').textContent = successes;
  damageRoll();
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

