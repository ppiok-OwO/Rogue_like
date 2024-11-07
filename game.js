import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
  constructor(name, isPlayCard) {
    this._name = name;
    this._hp = 100;
    this._maxHp = 100;
    this._defense = 0;
    this._bondingIndex = 0; // 카드와의 유대감
    this._handSize = 5;
    this._runAwayProb = 50;
    // this._isPlayCard = isPlayCard; // 현재 턴에 카드를 사용했는가?
    this._isThereAnyMonster = false; // 몬스터랑 만났나요?
    this._hasCard = []; // 덱에 보유한 카드
    this._hasCardInHand = []; // 핸드에 들어오는 카드의 배열
    // this._hasStolenGoods = []; // 보유한 장물 아이템
    this._stage = 1;
    // this._isAttacked = false;
  }

  drawCardRandomly() {
    let emptyHand = this._handSize - this._hasCardInHand.length;
    this._hasCard.sort(() => Math.random() - 0.5);

    // 비어있는 손패 사이즈만큼 카드 뽑기
    for (let i = 0; i < emptyHand; i++) {
      this._hasCardInHand.push(this._hasCard.shift());
    }
  }

  shuffleAllCards() {
    // 손패 비우기
    let howManyCards = this._hasCardInHand.length;
    for (let i = 0; i < howManyCards; i++) {
      this._hasCard.push(this._hasCardInHand.shift());
    }
    // 셔플
    this._hasCard.sort(() => Math.random() - 0.5);

    // 손패 채우기
    for (let i = 0; i < this._handSize; i++) {
      this._hasCardInHand.push(this._hasCard.shift());
    }
  }

  async cardPlay(playingCard, monster) {
    console.log(chalk.green('카드를 사용했습니다!'));
    const randomValue = Math.random() * 100;
    const cardActProb = playingCard._actProb + this._bondingIndex;
    if (randomValue <= cardActProb) {
      await monster.monsterLoseHp(playingCard);
      this.updateHpByCard(playingCard);
      this.updateDefense(playingCard);
      this.shuffleAllCards();
      // this._isPlayCard = true;
    } else {
      this.shuffleAllCards();
      // this._isPlayCard = false;
    }
  }

  // playAndDraw(cardIndex) {
  //   let splicedCard = this._hasCardInHand.splice(cardIndex, 1)[0];
  //   this._hasCard.push(splicedCard);
  //   let nextCard = this._hasCard.shift();
  //   this._hasCardInHand.push(nextCard);
  // }

  // loseStolenGoods() {
  //   // 장물을 잃어버린다.
  //   this._hasStolenGoods.shift();
  // }

  updateDeckSize(num) {
    // 덱사이즈
    this._deckSize += num;
  }

  updateHandSize(num) {
    // 핸드 사이즈
    this._handSize += num;
  }

  updateMaxHp(num) {
    // 최대 체력
    this._maxHp += num;
  }

  updateHpByCard(playingCard) {
    // 현재 체력
    this._hp += playingCard.restoreHp * playingCard.cardPower;
  }

  updateHpByMonster(num) {
    this._hp += num + this._defense;
  }

  updateDefense(playingCard) {
    // 방어도
    this._defense += playingCard.defense * playingCard.cardPower;
  }

  updateBondingIndex(num) {
    // 유대감
    this._bondingIndex += num;
  }

  runAway(monster) {
    // 도망친다.
    let randomValue = Math.random() * 100;

    if (randomValue <= this._runAwayProb) {
      console.log('도망 성공!');
      this._stage++;
      incPlayerStat(this);
      startGame(this);
    } else {
      console.log(chalk.red('이런! 불행하게도 도망치지 못했습니다.'));
      monster.monsterAttack(this);
    }
  }

  set name(value) {
    // 검증이 완료된 경우에만 setting!
    this._name = value;
  }

  get name() {
    return this._name;
  }

  set isPlayCard(value) {
    // 검증이 완료된 경우에만 setting!
    this._isPlayCard = value;
  }

  get isPlayCard() {
    return this._isPlayCard;
  }
}

class Card {
  constructor(cardName, cardTier, actProb, attackDmg, spellDmg, restoreHp, defense) {
    this._cardName = cardName;
    this._actProb = actProb;
    this._cardPower = 1;
    this._cardTier = cardTier;
    this._isThisCardPlayed = false;
    this._attackDmg = attackDmg;
    this._spellDmg = spellDmg;
    this._restoreHp = restoreHp;
    this._defense = defense;
    this._isThisDrawCard = false;
  }

  incCardPower(player) {
    let cardActProb = this._actProb + player._bondingIndex;
    if (cardActProb >= 100) {
      this._cardPower = cardActProb / 100;
    }
  }

  set cardName(value) {
    // 검증이 완료된 경우에만 setting!
    this._cardName = value;
  }

  set cardTier(value) {
    // 검증이 완료된 경우에만 setting!
    this._cardTier = value;
  }

  set attackDmg(value) {
    // 검증이 완료된 경우에만 setting!
    this._attackDmg = value;
  }

  set spellDmg(value) {
    // 검증이 완료된 경우에만 setting!
    this._spellDmg = value;
  }

  set restoreHp(value) {
    // 검증이 완료된 경우에만 setting!
    this._srestoreHp = value;
  }

  set defense(value) {
    this._defense = value;
  }

  get cardName() {
    return this._cardName;
  }

  get cardTier() {
    return this._cardTier;
  }

  get attackDmg() {
    // 검증이 완료된 경우에만 setting!
    return this._attackDmg;
  }

  get spellDmg() {
    // 검증이 완료된 경우에만 setting!
    return this._spellDmg;
  }

  get restoreHp() {
    // 검증이 완료된 경우에만 setting!
    return this._srestoreHp;
  }

  get defense() {
    return this._defense;
  }
}

class NormalAttackCard extends Card {
  constructor(name) {
    // name, cardTier, actProb, attackDmg, spellDmg, restoreHp, defense
    super(name, 'Normal', 75, 10, 0, 0, 0);
  }
}

class RareAttackCard extends Card {
  constructor(name) {
    super(name, 'Rare', 80, 15, 5, 5, 0);
  }
}

class EpicAttackCard extends Card {
  constructor(name) {
    super(name, 'Epic', 85, 25, 0, 0, 10);
  }
}

class LegendaryAttackCard extends Card {
  constructor(name) {
    super(name, 'Legendary', 90, 20, 25, 10, 10);
  }
}

class NormalDefenseCard extends Card {
  constructor(name) {
    // name, cardTier, actProb, attackDmg, spellDmg, restoreHp, defense
    super(name, 'Normal', 75, 0, 0, 0, 10);
  }
}

class RareDefensekCard extends Card {
  constructor(name) {
    super(name, 'Rare', 80, 0, 0, 0, 15);
  }
}

class EpicDefenseCard extends Card {
  constructor(name) {
    super(name, 'Epic', 85, 0, 0, 0, 25);
  }
}

class LegendaryDefenseCard extends Card {
  constructor(name) {
    super(name, 'Legendary', 90, 0, 0, 0, 40);
  }
}

class StolenGoods {
  constructor(goodsName, goodsTier) {
    this._goodsName = goodsName;
    this._goodsTier = goodsTier;
  }

  set goodsName(value) {
    // 검증이 완료된 경우에만 setting!
    this._goodsName = value;
  }

  set goodsTier(value) {
    // 검증이 완료된 경우에만 setting!
    this._goodsTier = value;
  }
}

class Monster {
  constructor(stage) {
    this.hp = 100 + 50 * (stage / 2);
    this.attackDmg = 5 + 10 * (stage / 2);
  }

  monsterAttack(player) {
    // 몬스터의 공격
    player.updateHpByMonster(-this.attackDmg);
  }
  monsterLoseHp(playingCard) {
    if (playingCard._attackDmg > 0 || playingCard._spellDmg > 0) {
      this.hp -= (playingCard._attackDmg + playingCard._spellDmg) * playingCard._cardPower;
    }
  }
}

class NormalMonster extends Monster {
  constructor(stage) {
    super(stage);
  }
}

class RareMonster extends Monster {
  constructor(stage) {
    super(stage);
    this.hp = 150 + 100 * (stage / 2);
    this.attackDmg = 15 + 10 * (stage / 2);
  }
}

class EpicMonster extends Monster {
  constructor(stage) {
    super(stage);
    this.hp = 250 + 100 * (stage / 2);
    this.attackDmg = 25 + 10 * (stage / 2);
  }
}

class LegendaryMonster extends Monster {
  constructor(stage) {
    super(stage);
    this.hp = 400 + 100 * (stage / 2);
    this.attackDmg = 40 + 10 * (stage / 2);
  }
}

function displayStatus(stage, player, monster, playRsult) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage}`) +
      chalk.blueBright(
        `| 플레이어 정보 | 이름: ${player._name}, HP: ${player._hp}, 방어도: ${player._defense} |
      `,
      ) +
      chalk.redBright(` | 몬스터 정보 | HP: ${monster.hp}, 공격력: ${monster.attackDmg} |`),
  );
  console.log(chalk.magentaBright(`=====================`));
}

const battle = async (stage, player, monster) => {
  // let logs = [];
  while (player._hp > 0 && monster.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);
    // logs.forEach((log) => console.log(log));

    console.log(chalk.green(`\n1. 카드를 사용한다. 2. 소매치기. 3. 도망친다.`));
    const choice = readlineSync.question('당신의 선택은? ');
    console.log(chalk.green(`${choice}를 선택하셨습니다.`));

    if (choice === '1') {
      console.log(
        chalk.green(`
          \n보유 중인 카드 : ${player._hasCardInHand.map((card, index) => index + 1 + '.' + card._cardName).join(', ')}`),
      );
      const cardChoice = readlineSync.question('몇 번째 카드를 사용하시겠습니까? : ');
      // console.log(chalk.green(`${cardChoice}번째 카드를 선택했습니다.`));
      const cardIndex = Number(cardChoice - 1);
      const playingCard = player._hasCardInHand[cardIndex];
      player.cardPlay(playingCard, monster);
      monster.monsterAttack(player);
    } else if (choice === '2') {
      let randomValue = Math.random() * 4;
      if (randomValue >= 0 && randomValue <= 1) {
        player._hasCard.push(new RareAttackCard('몸통박치기'));
        player.shuffleAllCards();
      } else if (randomValue >= 1 && randomValue <= 2) {
        player._hasCard.push(new EpicAttackCard('완벽한 타격'));
        player.shuffleAllCards();
      } else if (randomValue >= 2 && randomValue <= 3) {
        player._hasCard.push(new LegendaryAttackCard('말살검'));
        player.shuffleAllCards();
      } else {
        incPlayerStat(player);
      }
      monster.monsterAttack(player);
    } else if (choice === '3') {
      player.runAway(monster);
    } else {
      console.log(chalk.red('잘못된 입력입니다. 다시 선택해주세요.'));

      monster.monsterAttack(player);
    }
  }

  return;
};

export async function startGame(player) {
  console.clear();
  while (player._stage <= 10) {
    const monster = new Monster(player._stage);
    // 카드 셔플, 첫 핸드 가져오기
    battle(player._stage, player, monster);
    // 스테이지 클리어 및 게임 종료 조건
    if (monster.hp <= 0) {
      player._stage++;
    } else if (player._hp <= 0) {
      typeName();
    }
  }
}

export function typeName() {
  console.clear();

  const playerName = readlineSync.question('당신의 이름은? ');
  const player = new Player(playerName);

  // 시작덱 배열에 추가
  for (let i = 0; i < 5; i++) {
    let name = '기본 공격'; // 이름 생성 ${i + 1}
    player._hasCard.push(new NormalAttackCard(name)); // 객체 생성 후 배열에 추가
  }
  for (let i = 0; i < 4; i++) {
    let name = '기본 방어'; // 이름 생성 ${i + 1}
    player._hasCard.push(new NormalDefenseCard(name)); // 객체 생성 후 배열에 추가
  }
  player.drawCardRandomly();

  startGame(player);
}

// 플레이어 스탯 랜덤하게 오르는 함수
function incPlayerStat(player) {
  // _maxHp, _defense, _bondingIndex, _handSize, _runAwayProb

  let randomValue = Math.random() * 5;
  if (randomValue >= 0 && randomValue <= 1) {
    player._maxHp += 30;
    player._hp += 30;
  } else if (randomValue >= 1 && randomValue <= 2) {
    player._defense += 10;
  } else if (randomValue >= 2 && randomValue <= 3) {
    player._bondingIndex += 10;
  } else if (randomValue >= 3 && randomValue <= 4) {
    player._handSize += 1;
  } else if (randomValue >= 3 && randomValue <= 4) {
    player._handSize += 1;
    player.drawCardRandomly();
  } else if (randomValue >= 4 && randomValue <= 5) {
    player._runAwayProb += 3;
  }
}
