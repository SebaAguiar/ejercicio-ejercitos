# Army Exercise

A medieval army battle simulator implemented in JavaScript.

## Description

This project simulates battles between different civilizations (Chinese, English, and Byzantine) with different types of military units:

- **Pikemen**: Basic units with strength 5
- **Archers**: Intermediate units with strength 10
- **Knights**: Elite units with strength 20

Each army can:
- Train units to increase their strength
- Transform units (Pikeman → Archer → Knight)
- Attack other armies
- Manage gold resources

## Requirements

- Node.js (version 12 or higher)

## How to Run

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd ejercicio-ejercitos
   ```
3. Run the main file:
   ```bash
   node index.js
   ```

## Features

- Automatic battle simulation between armies
- Unit training and transformation system
- Resource management (gold)
- Battle history tracking
- Age system for units and armies

## Sample Output

The program will display:
- Initial army status
- Battle results
- Training and transformation activities
- Battle history
- Unit age information

## Game Mechanics

- **Training**: Improves unit strength at a cost
- **Transformation**: Upgrades unit type (costs more but provides better units)
- **Battles**: Armies fight based on total strength comparison
- **Victory**: Winner gains gold, loser loses strongest units
- **Draw**: Both armies lose one unit each

## Civilizations

Each civilization starts with different unit compositions:
- **Chinese**: 2 pikemen, 25 archers, 2 knights
- **English**: 10 pikemen, 10 archers, 10 knights
- **Byzantine**: 5 pikemen, 8 archers, 15 knights
