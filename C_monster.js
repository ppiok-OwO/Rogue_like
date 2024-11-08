import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { displayStatus, setMessage } from './logs.js';

class Monster {
  constructor(stage) {
    this.hp = 100 + 50 * (stage / 2);
    this.attackDmg = 10 + 10 * (stage / 2);
  }

  monsterAttack(player) {
    // 몬스터의 공격
    player.updateHpByMonster(-this.attackDmg);
    player.updateDefenseByMonster(-this.attackDmg);
  }
  monsterLoseHp(playingCard, cardPower = 1) {
    if (playingCard._attackDmg > 0 || playingCard._spellDmg > 0) {
      this.hp -= (playingCard._attackDmg + playingCard._spellDmg) * cardPower;
    }
  }
}

// class NormalMonster extends Monster {
//   constructor(stage) {
//     super(stage);
//   }
// }

// class RareMonster extends Monster {
//   constructor(stage) {
//     super(stage);
//     this.hp = 150 + 100 * (stage / 2);
//     this.attackDmg = 15 + 10 * (stage / 2);
//   }
// }

// class EpicMonster extends Monster {
//   constructor(stage) {
//     super(stage);
//     this.hp = 250 + 100 * (stage / 2);
//     this.attackDmg = 25 + 10 * (stage / 2);
//   }
// }

// class LegendaryMonster extends Monster {
//   constructor(stage) {
//     super(stage);
//     this.hp = 400 + 100 * (stage / 2);
//     this.attackDmg = 40 + 10 * (stage / 2);
//   }
// }

export { Monster };