// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/0/ うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

// ***************************************************
/**
 * ES Module
 */
// ***************************************************

// 共通部品
import { getActiveStrValue, getActiveWeaponAttackPower, setInputsDisabled } from './util/input.js';

window.loop = getActiveStrValue;
window.loop = getActiveWeaponAttackPower;
window.loop = setInputsDisabled;

// バリデーション
import { showError, validateInputs } from './validate/validate.js';

window.loop = showError;
window.loop = validateInputs;

// ダイス
import { skillRoll } from './dice/skillDice.js';
import { damageRoll } from './dice/damage.js';
import { cancelLoop, loop } from './dice/loop.js';

window.loop = skillRoll;
window.loop = damageRoll;
window.loop = loop;
window.loop = cancelLoop;