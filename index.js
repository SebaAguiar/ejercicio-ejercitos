const UNIT_STATS = {
  pikeman: { strength: 5, trainCost: 10, trainPoints: 3, transformCost: 30 },
  archer: { strength: 10, trainCost: 20, trainPoints: 7, transformCost: 40 },
  knight: { strength: 20, trainCost: 30, trainPoints: 10 },
};

const BATTLE_STATUS = {
  victory: "VICTORY",
  draw: "DRAW",
  defeat: "DEFEAT",
};

const CIVILIZATION_UNITS = {
  chinese: {
    pikemen: 2,
    archers: 25,
    knights: 2,
  },
  english: {
    pikemen: 10,
    archers: 10,
    knights: 10,
  },
  bizantine: {
    pikemen: 5,
    archers: 8,
    knights: 15,
  },
};

class Units {
  constructor(strengthPoints) {
    this.strengthPoints = strengthPoints;
    this.lifeYears = 0;
  }

  getLifeYears() {
    return this.lifeYears;
  }
}

class Pikeman extends Units {
  constructor() {
    super(UNIT_STATS.pikeman.strength);
  }

  train() {
    this.strengthPoints += UNIT_STATS.pikeman.trainPoints;
    return {
      strength: this.strengthPoints,
      cost: UNIT_STATS.pikeman.trainCost,
    };
  }

  transform() {
    console.log("Pikeman transformed into archer");
    return new Archer();
  }
}

class Archer extends Units {
  constructor() {
    super(UNIT_STATS.archer.strength);
  }

  train() {
    this.strengthPoints += UNIT_STATS.archer.trainPoints;
    return {
      strength: this.strengthPoints,
      cost: UNIT_STATS.archer.trainCost,
    };
  }

  transform() {
    console.log("Archer transformed into knight");
    return new Knight();
  }
}

class Knight extends Units {
  constructor() {
    super(UNIT_STATS.knight.strength);
  }

  train() {
    this.strengthPoints += UNIT_STATS.knight.trainPoints;
    return {
      strength: this.strengthPoints,
      cost: UNIT_STATS.knight.trainCost,
    };
  }

  transform() {
    console.log("The knight can't be transformed");
    return this;
  }
}

class Army {
  constructor(civilization) {
    this.civilization = civilization;
    this.gold = 1000;
    this.units = [];
    this.battleHistory = [];
    this.initializeUnits();
  }

  initializeUnits() {
    const unitsConfig = CIVILIZATION_UNITS[this.civilization.toLowerCase()];
    if (!unitsConfig) {
      throw new Error("UNKNOWN CIVILIZATION");
    }

    for (let i = 0; i < unitsConfig.pikemen; i++)
      this.units.push(new Pikeman());
    for (let i = 0; i < unitsConfig.archers; i++) this.units.push(new Archer());
    for (let i = 0; i < unitsConfig.knights; i++) this.units.push(new Knight());
  }

  calculateTotalStrength() {
    return this.units.reduce((total, unit) => total + unit.strengthPoints, 0);
  }

  loseStrongestUnits(count) {
    this.units.sort((a, b) => b.strengthPoints - a.strengthPoints);
    const lostUnits = this.units.splice(0, count);
    console.log(`The ${this.civilization} army lost ${lostUnits.length} units`);
  }

  trainFirstUnit(unitType) {
    const unit = this.units.find(
      (u) => u.constructor.name.toLowerCase() === unitType,
    );
    if (unit) {
      const cost = UNIT_STATS[unitType.toLowerCase()].trainCost;
      if (this.gold >= cost) {
        this.gold -= cost;
        unit.train();
        console.log(`Unit ${unitType} trained. Remaining gold: ${this.gold}`);
      } else {
        console.log("Not enough gold to train");
      }
    } else {
      console.log(`No units of ${unitType} were found.`);
    }
  }

  transformFirstUnit(unitType) {
    const unitIndex = this.units.findIndex(
      (u) => u.constructor.name.toLowerCase() === unitType,
    );
    if (unitIndex !== -1) {
      const unit = this.units[unitIndex];
      const cost = UNIT_STATS[unitType.toLowerCase()].transformCost;

      if (this.gold >= cost) {
        if (unit instanceof Knight) {
          console.log("The knight can't be transformed");
          return;
        }
        this.gold -= cost;
        this.units[unitIndex] = unit.transform();
        console.log(`Unit transformed. Remaining gold: ${this.gold}`);
      } else {
        console.log("Not enough gold to transform");
      }
    } else {
      console.log(`No units of ${unitType} were found.`);
    }
  }

  attack(enemyArmy) {
    console.log(
      `Battle: ${this.civilization} army vs ${enemyArmy.civilization} army`,
    );
    const myStrength = this.calculateTotalStrength();
    const enemyStrength = enemyArmy.calculateTotalStrength();

    const battleLog = {
      opponent: enemyArmy.civilization,
      myStrength: myStrength,
      opponentStrength: enemyStrength,
      result: "",
    };

    if (myStrength > enemyStrength) {
      this.gold += 100;
      enemyArmy.loseStrongestUnits(2);
      battleLog.result = BATTLE_STATUS.victory;
      console.log(`The ${this.civilization} army won the battle`);
    } else if (myStrength < enemyStrength) {
      enemyArmy.gold += 100;
      this.loseStrongestUnits(2);
      battleLog.result = BATTLE_STATUS.defeat;
      console.log(`The ${enemyArmy.civilization} army won the battle`);
    } else {
      this.loseStrongestUnits(1);
      enemyArmy.loseStrongestUnits(1);
      battleLog.result = BATTLE_STATUS.draw;
      console.log("The battle ended with a draw");
    }

    this.battleHistory.push(battleLog);
    enemyArmy.battleHistory.push({
      ...battleLog,
      result:
        battleLog.result === BATTLE_STATUS.victory
          ? BATTLE_STATUS.defeat
          : battleLog.result === BATTLE_STATUS.defeat
            ? BATTLE_STATUS.victory
            : BATTLE_STATUS.draw,
      opponent: this.civilization,
    });
  }
}

const armyChinese = new Army("chinese");
const armyEnglish = new Army("english");

console.warn("Initial Status:");
console.log(
  `Chinese Army: gold=${armyChinese.gold}, strength=${armyChinese.calculateTotalStrength()}, units=${armyChinese.units.length}`,
);
console.log(
  `English Army: gold=${armyEnglish.gold}, strength=${armyEnglish.calculateTotalStrength()}, units=${armyEnglish.units.length}`,
);
console.log("---------------\n");

armyChinese.attack(armyEnglish);

console.error("\nPost-Battle Status:");
console.log(
  `Chinese Army: gold=${armyChinese.gold}, strength=${armyChinese.calculateTotalStrength()}, units=${armyChinese.units.length}`,
);
console.log(
  `English Army: gold=${armyEnglish.gold}, strength=${armyEnglish.calculateTotalStrength()}, units=${armyEnglish.units.length}`,
);
console.log("---------------\n");

console.log("\nEnglish Army trains a pikeman:");
armyEnglish.trainFirstUnit("pikeman");
console.log(
  `New English Army strength: ${armyEnglish.calculateTotalStrength()}`,
);
console.log("---------------\n");

console.log("\nEnglish Army transforms a pikeman:");
armyEnglish.transformFirstUnit("pikeman");
console.log(
  `New English Army strength: ${armyEnglish.calculateTotalStrength()}`,
);
console.log(`English Army units: ${armyEnglish.units.length}`);
console.log("---------------\n");

console.log("\n=== Draining English Army Gold ===");
console.log(`Starting gold: ${armyEnglish.gold}`);

console.log("---------------\n");
console.log("\nTraining multiple units:");
armyEnglish.trainFirstUnit("knight");
armyEnglish.trainFirstUnit("knight");
armyEnglish.trainFirstUnit("knight");
armyEnglish.trainFirstUnit("archer");
armyEnglish.trainFirstUnit("archer");
armyEnglish.trainFirstUnit("archer");
armyEnglish.trainFirstUnit("pikeman");
armyEnglish.trainFirstUnit("pikeman");

console.log(`Gold after transformations: ${armyEnglish.gold}`);

// ----------------- DRANING GOLD ------------------------------
// console.log("\nContinuing to drain gold:");
// armyEnglish.transformFirstUnit("pikeman");
// armyEnglish.transformFirstUnit("pikeman");
// armyEnglish.transformFirstUnit("pikeman");
// armyEnglish.transformFirstUnit("archer");
// armyEnglish.transformFirstUnit("archer");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("archer");
// armyEnglish.trainFirstUnit("pikeman");
// armyEnglish.trainFirstUnit("pikeman");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");
// armyEnglish.trainFirstUnit("knight");

// console.log(`Gold after extensive training: ${armyEnglish.gold}`);

// ----------------- MORE TRANSFORMATIONS ------------------------------
// console.log("---------------\n");
// console.log("\nMore transformations:");
// armyEnglish.transformFirstUnit("pikeman");
// armyEnglish.transformFirstUnit("pikeman");
// armyEnglish.transformFirstUnit("archer");
// armyEnglish.transformFirstUnit("archer");
// armyEnglish.transformFirstUnit("archer");

console.log(`Gold after transformations: ${armyEnglish.gold}`);

console.log("\n---------------\n");
// Now try operations when out of gold
console.log("\n=== Testing operations with insufficient gold ===");
console.log("Attempting to train a knight (costs 30 gold):");
armyEnglish.trainFirstUnit("knight");

console.log("Attempting to transform a pikeman (costs 30 gold):");
armyEnglish.transformFirstUnit("pikeman");

console.log("Attempting to train an archer (costs 20 gold):");
armyEnglish.trainFirstUnit("archer");

console.log("Attempting to transform an archer (costs 40 gold):");
armyEnglish.transformFirstUnit("archer");

console.log("---------------\n");

// ----------------- BATTLE HISTORY ------------------------------
console.log("\nChinese Army Battle History:");
console.log(armyChinese.battleHistory);

armyChinese.attack(armyEnglish);

console.log("\nChinese Army Battle History:");
console.log(armyChinese.battleHistory);
