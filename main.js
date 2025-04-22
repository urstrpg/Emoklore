// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/0/ うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

// 共通部品
import { getActiveStrValue, getActiveWeaponAttackPower, setInputsDisabled } from './util/input.js';

// バリデーション
import { showError, validateInputs } from './validate/validate.js';

// ダイス
import { skillRoll } from './dice/skillDice.js';
import { damageRoll } from './dice/damage.js';
import { cancelLoop, loop } from './dice/loop.js';

window.loop = loop;
window.cancelLoop = cancelLoop;