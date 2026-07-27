'use strict';

// ---------- 剧情内容 ----------
const gameData = {
    title: '苏丹的游戏',
    storyPages: [
        '很久很久以前，在一个遥远的国度，有一位强大的苏丹...\n他踩着父亲的尸体登上了王座，继承了这个巨大的王国。\n他的统治手段残忍又狡猾，他对待敌人和亲人同样冷酷，他天生渴望观赏他人的不幸。',

        '他享有了一切。但是他却无法感到快乐。\n于是他设置了一个游戏，天下所有人的命运就此被小小的骰子决定。\n多么荒谬可笑！',

        '你站了出来。“这不该是这样的。”你想道。\n于是你假意顺从王的旨意，\n暗中筹备谋逆之事，择机而行。',

        '然而最后，你的行动败露了。苏丹拥有强大的魔法和几乎无敌的军队。他们正向你逼近。\n但是，有什么可怕的呢？终结旧王朝，创造新王朝本就是大势所趋！\n拿起刀剑，召集同盟！你毫不犹豫地迎向他们。',
    ],
    endings: {
        good: {
            text: ' >>>明星冉升--新世界<<<\n你带领人们突破重重困难，\n自己也以惊人技巧躲过攻击。\n你们活了下来，取得了完全的胜利。\n明星冉冉升起，你的名字将被传唱。',
            cssClass: 'ending-good'
        },
        normal: {
            text: '>>>低垂的果实--星火熠熠<<<\n你为了理想燃尽了生命。\n但是幸好，浴血的反抗化作低垂的果实。\n恢复“平静”的王城里，\n暗处星火熠熠。',
            cssClass: 'ending-normal'
        },
        bad: {
            text: '>>>新日之坠--空王座<<<\n经过激烈奋战，你最终战胜了苏丹，成为了新王。\n然而，腐朽的大地万物并不，又或是不愿知道这太阳已不是昨日的太阳，他们只是想要黄金王座上永远坐着一个人...\n旧势根深地固，新贵难以立足。\n某天夜晚，你于寝宫中被刺杀。此后，帝国陷入长久的混乱之中。',
            cssClass: 'ending-bad'
        },
    },
};

// ---------- Game 类 ----------
class Game {
    constructor() {
        this.currentPage = 0;
        this.phase = 'story';
        this.hit = 0;
        this.battleTime = 18;

        this.dom = {
            gameTitle: document.getElementById('game-title'),
            storyBox: document.getElementById('story-box'),
            hintText: document.getElementById('hint-text'),
            hitCount: document.getElementById('hit-count'),
            hpFill: document.getElementById('hp-fill'),
            battleWrapper: document.getElementById('battle-wrapper'),
            battleCanvas: document.getElementById('battle-canvas'),

        };
        this.moveDir = { up: false, down: false, left: false, right: false };
        this.dom.gameTitle.textContent = `* ${gameData.title} *`;
        this.showStory();
        this.bindStory(); // 绑定剧情


    }

    showStory() {
        const pages = gameData.storyPages;
        const page = pages[this.currentPage];
        this.dom.storyBox.innerHTML =
            page +
            `<span class="page-number">${this.currentPage + 1}/${pages.length}</span>` +
            '<span class="cursor-blink"></span>';
    }

    nextPage() {
        this.currentPage++;
        if (this.currentPage >= gameData.storyPages.length) {
            this.endStory();
        } else {
            this.showStory();
        }
    }

    // 绑定剧情阶段的按键和点击
    bindStory() {
        // 箭头函数确保 this 指向 Game 实例
        document.onkeydown = (e) => {
            // 忽略功能键
            const ignore = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
                'Tab', 'CapsLock', 'Shift', 'Control', 'Alt', 'Meta', 'ContextMenu'];
            if (ignore.includes(e.key)) return;
            this.nextPage();
        };

        document.onclick = () => {
            this.nextPage();
        };
    }

    // 剧情结束时，清除事件，准备进入战斗
    endStory() {
        // 移除剧情阶段的事件，防止干扰
        document.onkeydown = null;
        document.onclick = null;
        console.log('剧情结束，即将进入战斗！');
        this.Battle()
    }
    // ---------- 战斗 ----------
    //成员函数
    Battle() {
        this.phase = "battle";
        //初始化
        this.hit = 0;
        this.moveDir = { up: false, down: false, left: false, right: false };

        //切换界面
        this.dom.gameTitle.textContent = `* 战至最后一刻！ *`;
        this.dom.storyBox.style.display = 'none';
        this.dom.hintText.style.display = 'none';
        this.dom.hitCount.textContent = '0';
        this.dom.battleWrapper.style.display = 'flex';
        this.dom.hpFill.style.width = '100%';

        //初始化游戏主战场
        this.inbattleCanvas();
        //绑定战斗按键
        document.onkeydown = (e) => {
            const key = e.key.toLowerCase()
            if (key == 'arrowup' || key == 'w') { e.preventDefault(); this.moveDir.up = 'true' }
            if (key === 'arrowdown' || key === 's') { e.preventDefault(); this.moveDir.down = true; }
            if (key === 'arrowleft' || key === 'a') { e.preventDefault(); this.moveDir.left = true; }
            if (key === 'arrowright' || key === 'd') { e.preventDefault(); this.moveDir.right = true; }
        };

        document.onkeyup = (e) => {
            const key = e.key.toLowerCase();
            if (key === 'arrowup' || key === 'w') { this.moveDir.up = false; }
            if (key === 'arrowdown' || key === 's') { this.moveDir.down = false; }
            if (key === 'arrowleft' || key === 'a') { this.moveDir.left = false; }
            if (key === 'arrowright' || key === 'd') { this.moveDir.right = false; }
        };
        
    }
}



// ---------- 启动 ----------
const game = new Game();