'use strict';

// ---------- 计数器 ----------
function createHitCounter() {
    let hits = 0;
    return {
        recordHit() { hits++; return hits; },
        getHits() { return hits; },
        reset() { hits = 0; },
        //getReport(max) { return { hits: `${hits} / ${max}`, count: hits }; }
    };
}

// ---------- 验证和测试 ----------
/*function parseDiceExpression(expr) {
    const m = expr.match(/^(\d*)d(\d+)([+-]\d+)?$/i);
    if (!m) throw new Error('无效表达式: ' + expr);
    return { count: parseInt(m[1] || '1'), sides: parseInt(m[2]), modifier: m[3] ? parseInt(m[3]) : 0 };
}*/
// ---------- 防抖和节流 ----------
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => { fn.apply(this, args); }, delay);
    };
}
function throttle(fn, interval) {
    let last = 0, timer;
    return function (...args) {
        const now = Date.now();
        const remain = interval - (now - last);
        if (remain <= 0) {
            if (timer) { clearTimeout(timer); timer = null; }
            last = now; fn.apply(this, args);
        } else if (!timer) {
            timer = setTimeout(() => { last = Date.now(); timer = null; fn.apply(this, args); }, remain);
        }
    };
}

// ---------- 剧情内容 ----------
const gameDataJSON = {
    title: '苏丹的游戏',
    storyPages: [
        '很久很久以前，在一个遥远的国度，有一位强大的苏丹...\n他踩着父亲的尸体登上了王座，继承了这个巨大的王国。\n他的统治手段残忍又狡猾，他对待敌人和亲人同样冷酷，他天生渴望观赏他人的不幸。',
        '他享有了一切。但是他却无法感到快乐。\n于是他设置了一个游戏，天下所有人的命运就此被小小的骰子决定。\n多么荒谬可笑！',
        '你站了出来。“世界不该是这样的。”你想道。\n于是你假意顺从王的旨意，\n暗中筹备谋逆之事，择机而行。',
        '然而最后，你的行动败露了。苏丹拥有强大的魔法和几乎无敌的军队。他们正向你逼近。\n但是，有什么可怕的呢？终结旧王朝，创造新王朝本就是大势所趋！\n拿起刀剑，召集同盟！你毫不犹豫地迎向他们。',
    ],
    endings: {
        good: { text: 
            ' >>>明星冉升--新世界<<<\n你带领人们突破重重困难，\n自己也以惊人技巧躲过攻击。\n你们活了下来，取得了完全的胜利。\n明星冉冉升起，你的名字将被传唱。', cssClass: 'ending-good' },
        normal: { text: '>>>低垂的果实--星火熠熠<<<\n你为了理想燃尽了生命。\n但是幸好，浴血的反抗化作低垂的果实。\n恢复“平静”的王城里，\n暗处星火熠熠。', cssClass: 'ending-normal' },
        bad: { text: '>>>新日之坠--空王座<<<\n经过激烈奋战，你最终战胜了苏丹，成为了新王。\n然而，腐朽的大地万物并不，又或是不愿知道这太阳已不是昨日的太阳，他们只是想要黄金王座上永远坐着一个人...\n旧势根深地固，新贵难以立足。\n某天夜晚，你于寝宫中被刺杀。此后，帝国陷入长久的混乱之中。', cssClass: 'ending-bad' },
    },
};

// ---------- Ajax 模拟 ----------
function createMockAPIEndpoint() {
    const cfg = { difficulty: 'normal', maxHits: 8, battleDuration: 18, diceSides: 20, scoreThresholds: { good: 16, normal: 9 }, version: '1.0.0' };
    return URL.createObjectURL(new Blob([JSON.stringify(cfg)], { type: 'application/json' }));
}
const mockAPIURL = createMockAPIEndpoint();
async function loadGameConfig(url) {
    console.time('Ajax');
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const cfg = await res.json();
        console.timeEnd('Ajax');
        return cfg;
    } catch (e) {
        console.timeEnd('Ajax');
        console.warn('Ajax失败，使用默认配置');
        return { difficulty: 'normal', maxHits: 8, battleDuration: 18, diceSides: 20, scoreThresholds: { good: 16, normal: 9 }, version: 'fallback' };
    }
}

// ---------- 游戏实现 ----------
function Game(config) {
    if (!(this instanceof Game)) return new Game(config);
    // 设置游戏初始配置和状态
    this.config = config;
    this.currentPage = 0;
    this.battleScore = 0;
    this.diceRoll = null;
    this.phase = 'loading';
    this.totalScore = 0;
    // 计数器和 DOM 缓存
    this.hitCounter = createHitCounter();
    this.domCache = {};
    this._cacheDOM();
    this._boundKeyHandler = null;
    this._boundClickHandler = null;
}
//DOM 缓存
Game.prototype._cacheDOM = function () {
    this.domCache = {
        storyBox: document.getElementById('story-box'),
        hintText: document.getElementById('hint-text'),
        battleWrapper: document.getElementById('battle-wrapper'),
        battleCanvas: document.getElementById('battle-canvas'),
        hitCountSpan: document.getElementById('hit-count'),
        maxHitsSpan: document.getElementById('max-hits'),
        hpBarFill: document.getElementById('hp-bar-fill'),
        diceWrapper: document.getElementById('dice-wrapper'),
        diceDisplay: document.getElementById('dice-display'),
        diceResult: document.getElementById('dice-result'),
        endingWrapper: document.getElementById('ending-wrapper'),
        endingText: document.getElementById('ending-text'),
        gameTitle: document.getElementById('game-title'),
        restartBtn: document.getElementById('restart-btn'),
    };
};

//第一阶段，剧情界面
Game.prototype.start = async function () {
    const remote = await loadGameConfig(mockAPIURL);
    Object.assign(this.config, remote);
    this.phase = 'story';
    this.currentPage = 0;
    this.domCache.maxHitsSpan.textContent = this.config.maxHits;
    this._showStory();
    this._bindStoryKeys();
};

Game.prototype._showStory = function () {
    this.domCache.battleWrapper.style.display = 'none';
    this.domCache.diceWrapper.style.display = 'none';
    this.domCache.endingWrapper.style.display = 'none';
    this.domCache.storyBox.style.display = 'block';
    this.domCache.hintText.style.display = 'block';
    const pages = gameDataJSON.storyPages;
    if (this.currentPage < pages.length) {
        this.domCache.storyBox.innerHTML =
            pages[this.currentPage] +
            `<span class="page-indicator">${this.currentPage + 1}/${pages.length}</span>` +
            '<span class="cursor-blink"></span>';
    }
};
//翻页绑定
Game.prototype._bindStoryKeys = function () {
    if (this.boundKeyHandler) {
        document.removeEventListener('keydown', this.boundKeyHandler);
        document.removeEventListener('click', this.boundClickHandler);
    }
    this.boundKeyHandler = (e) => {
        if (this.phase !== 'story') return;
        // 阻止默认行为，避免干扰翻页

        if (['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
            'Tab', 'CapsLock', 'Shift', 'Control', 'Alt', 'Meta', 'ContextMenu'].includes(e.key)) return;
        this._advanceStory();
    };
    this.boundClickHandler = () => { if (this.phase === 'story') this._advanceStory(); };
    document.addEventListener('keydown', this.boundKeyHandler);
    document.addEventListener('click', this.boundClickHandler);
};

Game.prototype._advanceStory = function () {
    this.currentPage++;
    if (this.currentPage >= gameDataJSON.storyPages.length) {
        this._startBattle();
    } else {
        this._showStory();
    }
};
//第二阶段，战斗界面
Game.prototype._startBattle = function () {
    this.phase = 'battle';
    // 移除剧情界面并重置状态
    document.removeEventListener('keydown', this.boundKeyHandler);
    document.removeEventListener('click', this.boundClickHandler);
    this.domCache.storyBox.style.display = 'none';
    this.domCache.hintText.style.display = 'none';
    this.domCache.battleWrapper.style.display = 'flex';
    this.domCache.gameTitle.textContent = '* 战至最后一刻！ *';
    this.domCache.hitCountSpan.textContent = '0';
    this.domCache.hpBarFill.style.width = '100%';
    this.hitCounter.reset();
    this._initBattleCanvas();
    console.time('战斗计时');
};

Game.prototype._initBattleCanvas = function () {
    const canvas = this.domCache.battleCanvas;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const heart = { x: size / 2, y: size / 2, size: 14, speed: 4 ,color: '#ff3333' };
    let obstacles = [];
    const maxDisplay = this.config.maxHits;
    const battleDuration = this.config.battleDuration * 1000;
    const battleStart = Date.now();
    let battleEnded = false;
    let animationId = null;
    const moveDir = { up: false, down: false, left: false, right: false };
    let heartFlash = 0;
    //每600ms生成一批障碍物，数量和速度随机
    const throttledSpawn = throttle(() => {
        if (battleEnded) return;
        const cnt = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < cnt; i++) obstacles.push(createObstacle());
    }, 600);

    function createObstacle() {
        const side = Math.floor(Math.random() * 4);
        let x, y, vx, vy;
        const spd = 1.5 + Math.random() * 3.5;
        switch (side) {
            case 0: x = 30 + Math.random() * (size - 60); y = -10; vx = (Math.random() - 0.5) * 2; vy = spd; break;
            case 1: x = 30 + Math.random() * (size - 60); y = size + 10; vx = (Math.random() - 0.5) * 2; vy = -spd; break;
            case 2: x = -10; y = 30 + Math.random() * (size - 60); vx = spd; vy = (Math.random() - 0.5) * 2; break;
            case 3: x = size + 10; y = 30 + Math.random() * (size - 60); vx = -spd; vy = (Math.random() - 0.5) * 2; break;
        }
        return { x, y, vx, vy, width: 20 + Math.random() * 30, height: 6 + Math.random() * 8, active: true };
    }

    function drawHeart(x, y, s, alpha = 1) {
        ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = heart.color;
        ctx.beginPath();
        const ty = y - s * 0.7, by = y + s * 0.7;
        ctx.moveTo(x, by);
        ctx.bezierCurveTo(x - s * 1.2, y + s * 0.1, x - s * 0.9, ty - s * 0.3, x, ty);
        ctx.bezierCurveTo(x + s * 0.9, ty - s * 0.3, x + s * 1.2, y + s * 0.1, x, by);
        ctx.fill();
        ctx.restore();
    }

    function drawObstacle(obs) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(obs.x - obs.width / 2, obs.y - obs.height / 2, obs.width, obs.height);
        ctx.beginPath(); ctx.arc(obs.x - obs.width / 2, obs.y, obs.height * 0.8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y, obs.height * 0.8, 0, Math.PI * 2); ctx.fill();
    }
    // 碰撞检测，心形近似为一个圆，障碍物为一个矩形
    function checkCollision(a, b) {
        const hl = a.x - a.size * 0.6, hr = a.x + a.size * 0.6, ht = a.y - a.size * 0.6, hb = a.y + a.size * 0.6;
        const ol = b.x - b.width / 2, or_ = b.x + b.width / 2, ot = b.y - b.height / 2, ob = b.y + b.height / 2;
        return !(hr < ol || hl > or_ || hb < ot || ht > ob);
    }

    const hitCounter = this.hitCounter;
    function updateDisplay() {
        const hits = hitCounter.getHits();
        const ratio = Math.max(0, 1 - hits / maxDisplay);
        document.getElementById('hit-count').textContent = hits;
        document.getElementById('hp-bar-fill').style.width = (ratio * 100) + '%';
    }

    const endBattle = () => {
        battleEnded = true;
        if (animationId) cancelAnimationFrame(animationId);
        console.timeEnd('战斗计时');
        const hits = hitCounter.getHits();
        const scoreCalc = function (h, max) {
            if (h <= 1) return 5;
            if (h <= 3) return 3;
            if (h < max) return 1;
            return 0;
        };
        this.battleScore = scoreCalc.apply(null, [hits, maxDisplay]);
        document.removeEventListener('keydown', battleKeyHandler);
        document.removeEventListener('keyup', battleKeyUpHandler);
        setTimeout(() => this._startDicePhase(), 800);
    };

    function gameLoop() {
        if (battleEnded) return;
        const elapsed = Date.now() - battleStart;
        const remaining = Math.max(0, battleDuration - elapsed);
        if (remaining <= 0) { endBattle(); return; }
        
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, size, size);
        ctx.strokeStyle = '#33ff33'; ctx.lineWidth = 1;
        ctx.strokeRect(10, 10, size - 20, size - 20);

        if (moveDir.up) heart.y = Math.max(heart.size + 20, heart.y - heart.speed);
        if (moveDir.down) heart.y = Math.min(size - heart.size - 20, heart.y + heart.speed);
        if (moveDir.left) heart.x = Math.max(heart.size + 20, heart.x - heart.speed);
        if (moveDir.right) heart.x = Math.min(size - heart.size - 20, heart.x + heart.speed);

        for (let obs of obstacles) {
            if (!obs.active) continue;
            obs.x += obs.vx; obs.y += obs.vy;
            if (obs.x < -60 || obs.x > size + 60 || obs.y < -60 || obs.y > size + 60) obs.active = false;
            if (obs.active && checkCollision(heart, obs)) {
                obs.active = false;
                hitCounter.recordHit();
                updateDisplay();
                heartFlash = 8;
            }
        }
        obstacles = obstacles.filter(o => o.active);
        throttledSpawn();
        
        let alpha = 1;
        if (heartFlash > 0) { alpha = heartFlash % 2 === 0 ? 0.3 : 1; heartFlash--; }
        for (let obs of obstacles) drawObstacle(obs);
        drawHeart(heart.x, heart.y, heart.size, alpha);

        const timeRatio = remaining / battleDuration;
        ctx.fillStyle = '#111';
        ctx.fillRect(5, 5, size - 10, 4);
        ctx.fillStyle = timeRatio > 0.3 ? '#33ff33' : '#ff3333';
        ctx.fillRect(5, 5, (size - 10) * timeRatio, 4);

        animationId = requestAnimationFrame(gameLoop);
    }

    function battleKeyHandler(e) {
        if (battleEnded) return;
        const k = e.key.toLowerCase();
        if (k === 'arrowup' || k === 'w') { e.preventDefault(); moveDir.up = true; }
        if (k === 'arrowdown' || k === 's') { e.preventDefault(); moveDir.down = true; }
        if (k === 'arrowleft' || k === 'a') { e.preventDefault(); moveDir.left = true; }
        if (k === 'arrowright' || k === 'd') { e.preventDefault(); moveDir.right = true; }
    }
    function battleKeyUpHandler(e) {
        const k = e.key.toLowerCase();
        if (k === 'arrowup' || k === 'w') moveDir.up = false;
        if (k === 'arrowdown' || k === 's') moveDir.down = false;
        if (k === 'arrowleft' || k === 'a') moveDir.left = false;
        if (k === 'arrowright' || k === 'd') moveDir.right = false;
    }

    document.addEventListener('keydown', battleKeyHandler);
    document.addEventListener('keyup', battleKeyUpHandler);
    this._battleKeyHandler = battleKeyHandler;
    this._battleKeyUpHandler = battleKeyUpHandler;
    animationId = requestAnimationFrame(gameLoop);
};

Game.prototype._startDicePhase = function () {
    this.phase = 'dice';
    this.domCache.battleWrapper.style.display = 'none';
    this.domCache.diceWrapper.style.display = 'flex';
    this.domCache.gameTitle.textContent = '* 无人知晓命运会归向何处 *';
    this.domCache.diceDisplay.textContent = '?';
    this.domCache.diceResult.textContent = `战斗积分: ${this.battleScore}`;
    this.domCache.diceDisplay.classList.remove('rolling');
    if (this._battleKeyHandler) {
        document.removeEventListener('keydown', this._battleKeyHandler);
        document.removeEventListener('keyup', this._battleKeyUpHandler);
    }
    const debouncedRoll = debounce(() => { this._rollDice(); }, 400);
    const diceEl = this.domCache.diceDisplay;
    const rollHandler = () => { if (this.diceRoll === null) debouncedRoll(); };
    diceEl.addEventListener('click', rollHandler);
    this._diceRollHandler = rollHandler;
    this._diceEl = diceEl;
};

Game.prototype._rollDice = async function () {
    if (this.diceRoll !== null) return;
    const diceEl = this.domCache.diceDisplay;
    diceEl.classList.add('rolling');
    this.domCache.diceResult.textContent = '投掷中...';
    const anim = () => new Promise(res => {
        let cnt = 0;
        const iv = setInterval(() => {
            diceEl.textContent = Math.floor(Math.random() * 20) + 1;
            cnt++;
            if (cnt >= 12) { clearInterval(iv); res(); }
        }, 80);
    });
    await anim();
    const result = Math.floor(Math.random() * 20) + 1;
    this.diceRoll = result;
    this.totalScore = this.battleScore + result;
    diceEl.classList.remove('rolling');
    diceEl.textContent = result;
    this.domCache.diceResult.textContent = `骰子:${result} 积分:${this.battleScore} 总分:${this.totalScore}`;
    setTimeout(() => this._showEnding(), 1500);
};

Game.prototype._showEnding = function () {
    this.phase = 'ending';
    this.domCache.diceWrapper.style.display = 'none';
    this.domCache.endingWrapper.style.display = 'flex';
    this.domCache.gameTitle.textContent = '* 结局 *';
    const th = this.config.scoreThresholds;
    let key = this.totalScore >= th.good ? 'good' : (this.totalScore >= th.normal ? 'normal' : 'bad');
    const data = gameDataJSON.endings[key];
    this.domCache.endingText.textContent = data.text;
    this.domCache.endingText.className = data.cssClass;
    this.domCache.restartBtn.addEventListener('click', () => this._restart(), { once: true });
};

Game.prototype._restart = function () {
    if (this._diceEl && this._diceRollHandler) this._diceEl.removeEventListener('click', this._diceRollHandler);
    document.removeEventListener('keydown', this._boundKeyHandler);
    document.removeEventListener('click', this._boundClickHandler);
    if (this._battleKeyHandler) document.removeEventListener('keydown', this._battleKeyHandler);
    if (this._battleKeyUpHandler) document.removeEventListener('keyup', this._battleKeyUpHandler);
    this.currentPage = 0; this.battleScore = 0; this.diceRoll = null; this.totalScore = 0;
    this.phase = 'story'; this.hitCounter.reset();
    this.domCache.endingWrapper.style.display = 'none';
    this.domCache.diceWrapper.style.display = 'none';
    this.domCache.battleWrapper.style.display = 'none';
    this.domCache.storyBox.style.display = 'block';
    this.domCache.hintText.style.display = 'block';
    this.domCache.gameTitle.textContent = '* 命运跑团 *';
    this.domCache.diceDisplay.textContent = '?';
    this.domCache.diceResult.textContent = '投掷 D20 确定命运';
    this.domCache.hitCountSpan.textContent = '0';
    this.domCache.hpBarFill.style.width = '100%';
    this.domCache.diceDisplay.classList.remove('rolling');
    this.domCache.maxHitsSpan.textContent = this.config.maxHits;
    this._showStory();
    this._bindStoryKeys();
};

// ---------- 启动！！！！！！！ ----------
async function main() {
    const defaultCfg = { difficulty: 'normal', maxHits: 5, battleDuration: 18, diceSides: 20, scoreThresholds: { good: 16, normal: 9 } };
    const game = new Game(defaultCfg);
    window.__game = game;
    await game.start();
}
main().catch(e => console.error('启动失败:', e));