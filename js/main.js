// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
/**
 * 更新履歴
 * No001 2025/0/ うるす
 */
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△

/**
 * メイン
 */
// 共通部品
import { addPlayer, setupPlayerInputBlocks } from './form/playerForm.js';
window.addPlayer = addPlayer;
setupPlayerInputBlocks();



// ダイス
import { cancelLoop, avgloop } from './loop/avgloop.js';
window.loop = avgloop;
window.cancelLoop = cancelLoop;

// html
// サイドバーを読み込み
window.addEventListener("DOMContentLoaded", () => {
    fetch('components/sidebar.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById("sidebar-placeholder").innerHTML = html;

            // ナビゲーションのクリックイベント
            document.querySelectorAll("#sidebar a").forEach(link => {
                link.addEventListener("click", e => {
                    e.preventDefault();
                    const targetId = link.getAttribute("data-target");
                    document.querySelectorAll(".page-section").forEach(section => {
                        section.classList.remove("active");
                    });
                    document.getElementById(targetId).classList.add("active");
                });
            });
        });
});
