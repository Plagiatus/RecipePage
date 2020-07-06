namespace RecipePage {

  export interface Recipe {
    id: number | string;
    defaultGroupsize: number;
    name: string;
    duration: number;
    instructions: string[];
    categories: Category[];
    ingredients: Ingredient[];
  }

  interface Category {
    name: string;
    id: number | string;
  }

  interface Ingredient {
    name: string;
    amount: number | MinMax;
    unit: UNIT;
  }

  export interface MinMax {
    min: number;
    max: number;
  }

  export enum UNIT {
    CAN = "CAN",
    CUP = "CUP",
    GRAMS = "GRAMS",
    LITRE = "LITRE",
    MSP = "MSP",
    PACK = "PACK",
    PINCH = "PINCH",
    TABLESPOON = "TABLESPOON",
    TEASPOON = "TEASPOON",
    PIECE = "PIECE",
    NONE = "NONE",
    TUBE = "TUBE"
  }
}