type Meal = {
  mealName: string,
  mealProducts: MealProducts[]
}

type MealProducts = {
  id: string
  weight: number
}

export { Meal }