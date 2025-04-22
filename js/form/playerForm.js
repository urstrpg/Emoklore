// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/04/22 うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

/**
 * プレイヤー追加
 */
export function addPlayer() {
    const container = document.getElementById('playerInputsContainer');
    const template = document.getElementById('playerTemplate');
    const clone = template.content.cloneNode(true);
    const newBlock = clone.querySelector('.playerBlock');

    const players = container.querySelectorAll('.playerBlock');
    const playerNumber = players.length + 1;

    // プレイヤータイトルに番号をつける
    const legend = newBlock.querySelector('legend');
    const numberEl = document.createElement('span');
    numberEl.className = 'playerNumber';
    numberEl.textContent = `共鳴者${playerNumber}`;

    // 既存のテキストをクリア
    legend.textContent = '';
    legend.appendChild(numberEl);

    // 2人目以降に×ボタンを追加
    if (playerNumber > 1) {
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.textContent = '❌';
        removeBtn.className = 'removePlayerButton';
        removeBtn.addEventListener('click', () => removePlayer(removeBtn));
        legend.appendChild(removeBtn);
    }

    // 攻撃種別切り替えイベント
    const attackType = newBlock.querySelector('.attackType');
    attackType.addEventListener('change', e => toggleInput(e.target));

    container.appendChild(clone);
    updatePlayerNumbers();
}

/**
 * プレイヤー削除
 */
export function removePlayer(button) {
    const fieldset = button.closest('.playerBlock');
    fieldset.remove();
    updatePlayerNumbers();
}

/**
 * プレイヤーNo更新
 */
export function updatePlayerNumbers() {
    const players = document.querySelectorAll('.playerBlock');
    players.forEach((player, index) => {
        const legend = player.querySelector('legend');
        const numberEl = legend.querySelector('.playerNumber');
        if (numberEl) {
            numberEl.textContent = `共鳴者${index + 1}`;
        }

        // ×ボタンの表示制御（1人目だけ消す）
        const removeBtn = legend.querySelector('.removePlayerButton');
        if (removeBtn) {
            removeBtn.style.display = index === 0 ? 'none' : 'inline-block';
        }
    });
}

/**
 * 攻撃タイプに応じて入力欄切り替え
 */
export function toggleInput(select) {
    const fieldset = select.closest('.playerBlock');
    const allFields = fieldset.querySelectorAll('.typeFields');
    allFields.forEach(div => div.style.display = "none");

    const selected = select.value;
    if (selected && selected !== "none") {
        const showFields = fieldset.querySelector(`.${selected}Fields`);
        if (showFields) showFields.style.display = "block";
    }
}

/**
 * 初期化処理
 */
export function setupPlayerInputBlocks() {
    const addBtn = document.getElementById('addPlayerButton');
    addBtn.addEventListener('click', addPlayer);

    // 初期状態で一人分追加
    addPlayer();
}