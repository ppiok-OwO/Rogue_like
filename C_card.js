import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { largeUI, compactUI, setMessage } from './logs.js';

class Card {
  constructor(cardName, cardTier, actProb, attackDmg, fireDmg, restoreHp, defense) {
    this.cardName = cardName;
    this.actProb = actProb;
    this.cardTier = cardTier;
    this.isThisCardPlayed = false;
    this.attackDmg = attackDmg;
    this.fireDmg = fireDmg;
    this.restoreHp = restoreHp;
    this.defense = defense;
  }
}

class NormalAttackCard extends Card {
  constructor() {
    // cardName, cardTier, actProb, attackDmg, fireDmg, restoreHp, defense
    super('기본 공격', 'Normal', 75, 10, 5, 5, 0);
  }
}

class RareAttackCard extends Card {
  constructor() {
    super('피부 찢기', 'Rare', 80, 20, 10, 5, 5);
  }
}

class EpicAttackCard extends Card {
  constructor() {
    super('완벽한 타격', 'Epic', 85, 35, 15, 15, 5);
  }
}

class LegendaryAttackCard extends Card {
  constructor() {
    super('말살검', 'Legendary', 90, 55, 25, 25, 10);
  }
}

class NormalDefenseCard extends Card {
  constructor() {
    super('기본 방어', 'Normal', 75, 0, 0, 5, 10);
  }
}

class RareDefenseCard extends Card {
  constructor() {
    super('방패 올리기', 'Rare', 80, 0, 0, 10, 15);
  }
}

class EpicDefenseCard extends Card {
  constructor() {
    super('바리게이트', 'Epic', 85, 0, 0, 15, 25);
  }
}

class LegendaryDefenseCard extends Card {
  constructor() {
    super('참호', 'Legendary', 90, 0, 0, 20, 30);
  }
}

// 카드의 인스턴스를 무작위로 생성하는 함수
function makeRandomCard(player) {
  let randomCardInstance;
  const cardClasses = [
    NormalAttackCard,
    NormalDefenseCard,
    RareAttackCard,
    RareDefenseCard,
    EpicAttackCard,
    EpicDefenseCard,
    LegendaryAttackCard,
    LegendaryDefenseCard,
  ];

  const eliteCardClasses = [
    EpicAttackCard,
    EpicDefenseCard,
    LegendaryAttackCard,
    LegendaryDefenseCard,
  ];

  // 무작위로 클래스 선택
  if (player.isEliteStage) {
    randomCardInstance = eliteCardClasses[Math.floor(Math.random() * eliteCardClasses.length)];
  } else {
    randomCardInstance = cardClasses[Math.floor(Math.random() * cardClasses.length)];
  }

  // 선택된 클래스의 인스턴스 생성
  return new randomCardInstance();
}

// 카드 상세보기
function seeCard(card) {
  setMessage(`
  ======| 카드 상세보기 |======
  
  >>> ${card.cardName}

  등급 : ${card.cardTier}
  발동 확률 : ${card.actProb}
  공격 데미지 : ${card.attackDmg}
  화염 데미지 : ${card.fireDmg}
  체력 회복량 : ${card.restoreHp}
  방어도 : ${card.defense}

  ========| ******* |========
    `);
}

let countCard = (player) => {
  // 카드 한 배열로 모으고 정렬
  player.collectAllCard();

  // 카드 개수 세기
  let cardCounts = {};
  player.hasCard.forEach((card) => {
    if (cardCounts[card.cardName]) {
      cardCounts[card.cardName]++;
    } else {
      cardCounts[card.cardName] = 1;
    }
  });

  return cardCounts;
};

export {
  Card,
  NormalAttackCard,
  NormalDefenseCard,
  RareAttackCard,
  RareDefenseCard,
  EpicAttackCard,
  EpicDefenseCard,
  LegendaryAttackCard,
  LegendaryDefenseCard,
  makeRandomCard,
  seeCard,
  countCard
};
