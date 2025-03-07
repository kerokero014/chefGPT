import type { Recipe } from "../Data/recipeData";

interface SavedRecipesProps {
  recipes: Recipe[];
}

export default function SavedRecipes({ recipes }: SavedRecipesProps) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Saved Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} className="mt-2">
            {recipe.title}
          </li>
        ))}
      </ul>
    </div>
  );
}