
// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/04/22 うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

/**
 * 共鳴者の入力制御
 */
export function setupPlayerInputBlocks() {
    const container = document.getElementById('playerInputsContainer');
    const template = document.getElementById('playerTemplate');
    const addButton = document.getElementById('addPlayerButton');

    addButton.addEventListener('click', () => {
        const clone = template.content.cloneNode(true);
        const playerBlock = clone.querySelector('.playerBlock');

        // 攻撃種別の切り替えイベントを設定
        const attackTypeSelect = playerBlock.querySelector('.attackType');
        attackTypeSelect.addEventListener('change', () => {
            const allFields = playerBlock.querySelectorAll('.typeFields');
            allFields.forEach(div => div.style.display = 'none');

            const selected = attackTypeSelect.value;
            const showFields = playerBlock.querySelector(`.${selected}Fields`);
            if (showFields) showFields.style.display = 'block';
        });

        container.appendChild(clone);
    });
}

/**
 * 武器攻撃力の入力制御
 * @returns value
 */
export function getActiveWeaponAttackPower(playerBlock) {
    const selected = playerBlock.querySelector(".attackType").value;
    const field = playerBlock.querySelector(`.${selected}Fields input.weaponAttackPower`);
    const value = field ? field.value.trim() : "";
    if (value === "") {
        showError("武器攻撃力が入力されていません。");
        return "";
    }
    return value;
}

/**
 * 〈ストレングス〉の技能レベルの入力制御
 * @returns value
 */
export function getActiveStrValue(playerBlock) {
    const selected = playerBlock.querySelector(".attackType").value;
    const field = playerBlock.querySelector(`.${selected}Fields input.str`);
    const value = field ? parseInt(field.value, 10) : 0;
    if (isNaN(value)) {
        showError("〈ストレングス〉の技能レベルが不正です。");
        return 0;
    }
    return value;
}

/**
 * 入力枠を活性・非活性
 */
export function setInputsDisabled(disabled) {
    const playerBlocks = document.querySelectorAll('.playerBlock');
    playerBlocks.forEach(block => {
        const inputs = block.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => {
            input.disabled = disabled; // ←すべて無効化（削除ボタン含む）
        });
    });

    // 共通のループボタン制御
    const loopControls = ['loopCount', 'startButton', 'addPlayerButton'];
    loopControls.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.disabled = disabled;
    });

    // キャンセルボタンは常に活性（別途制御）
    const cancelBtn = document.getElementById("cancelButton");
    if (cancelBtn) cancelBtn.disabled = !disabled;
}

/**
 * ボタン表示の制御
 */
export function toggleButtons(isRunning) {
    document.getElementById("startButton").style.display = isRunning ? "none" : "inline";
    document.getElementById("cancelButton").style.display = isRunning ? "inline" : "none";
}
