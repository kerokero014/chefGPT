export default interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    weightGoal?: number;
    allergies?: string[];
    dislikes?: string[];
    favoriteFoods?: string[];
}