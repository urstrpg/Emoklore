import { getActiveStrValue, getActiveWeaponAttackPower } from '../util/input.js';
import { randomInt } from '../util/util.js';

// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/0/22 うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

/**
 * ダメージ算出
 * @param { 成功数 } successes
 * @param { 技能攻撃力 } skillAttackPower
 * @returns damage
 */
export function damageRoll(successes, skillAttackPower, playerBlock) {
  const activeStr = getActiveStrValue(playerBlock);

  // 技能ダメージを算出
  let damage = 0
  if (skillAttackPower > 0) {
    damage = skillDamageRoll(successes, skillAttackPower);
  } else {
    damage = successes;
  }

  // 武器攻撃力を加算
  const weaponDamage = weaponDamageRoll(getActiveWeaponAttackPower(playerBlock));
  damage += weaponDamage;

  // 〈ストレングス〉の技能レベルを加算
  damage += activeStr

  // ダメージを返却
  return damage;
}

/**
 * 技能ダメージ算出
 * @param { 成功数 } successes
 * @param { 技能攻撃力 } skillAttackPower
 * @returns skillDamage
 */
function skillDamageRoll(successes, skillAttackPower) {
  let skillDamage = 0;

  // 成功数の回数ダイスロールを行い、技能のダメージを算出
  for (let i = 0; i < successes; i++) {

    // 【成功数】D【技能攻撃力】
    const roll = randomInt(skillAttackPower);
    skillDamage += roll;
  }

  // ダメージを返却
  return skillDamage;
}

/**
 * 武器攻撃力算出
 * @param { 武器攻撃力 } weaponAttackPower
 * @returns weaponDamage
 */
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
  let weaponDamage = 0;
  for (let i = 0; i < roll; i++) {
    weaponDamage += randomInt(dice);
  }

  // ダメージを返却
  return weaponDamage;
}