interface ActionData {
  errors: {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    weightGoal?: string;
    allergies?: string;
    dislikes?: string;
    favoriteFoods?: string;
  };
  formError?: string;
  fields?: {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    weightGoal?: string;
    allergies?: string;
    dislikes?: string;
    favoriteFoods?: string;
  };
}

export default ActionData;
