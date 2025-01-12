import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

export default function GeneratePlans() {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        firstName: user?.given_name || "",
        lastName: user?.family_name || "",
        age: "",
        gender: "Select",
        heightFeet: "",
        heightInches: "",
        weight: "",
        fitnessLevel: "Select",
        dietPreference: "Select",
        fitnessGoals: [],
        dailyLifestyle: "",
    });

    const [fitnessPlan, setFitnessPlan] = useState("");
    const [mealPlan, setMealPlan] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleGeneratePlans = async () => {
        try {
            const response = await fetch("/api/generate-plans", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setFitnessPlan(data.fitnessPlan);
            setMealPlan(data.mealPlan);
        } catch (error) {
            console.error("Error generating plans:", error);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>Create Your Fitness & Meal Plans</h1>
            <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                />
                <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                    <option value="Select" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                </select>
                <div style={{ display: "flex", gap: "10px" }}>
                    <input
                        type="number"
                        name="heightFeet"
                        placeholder="Height (Feet)"
                        value={formData.heightFeet}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="heightInches"
                        placeholder="Height (Inches)"
                        value={formData.heightInches}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <input
                    type="number"
                    name="weight"
                    placeholder="Weight (lbs or kg)"
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                />
                <select name="fitnessLevel" value={formData.fitnessLevel} onChange={handleInputChange} required>
                    <option value="Select" disabled>Select Fitness Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
                <select name="dietPreference" value={formData.dietPreference} onChange={handleInputChange} required>
                    <option value="Select" disabled>Select Diet Preference</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Omnivore">Omnivore</option>
                    <option value="Keto">Keto</option>
                    <option value="Other">Other</option>
                </select>
                <textarea
                    name="dailyLifestyle"
                    placeholder="Briefly describe your daily lifestyle..."
                    value={formData.dailyLifestyle}
                    onChange={handleInputChange}
                    required
                />
                <div>
                    <label>Fitness Goals:</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {["Lose weight", "Build muscle", "Increase stamina", "Improve flexibility", "General health"].map((goal) => (
                            <label key={goal}>
                                <input
                                    type="checkbox"
                                    name="fitnessGoals"
                                    value={goal}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFormData((prev) => ({
                                                ...prev,
                                                fitnessGoals: [...prev.fitnessGoals, goal],
                                            }));
                                        } else {
                                            setFormData((prev) => ({
                                                ...prev,
                                                fitnessGoals: prev.fitnessGoals.filter((g) => g !== goal),
                                            }));
                                        }
                                    }}
                                />
                                {goal}
                            </label>
                        ))}
                    </div>
                </div>
                <button type="button" onClick={handleGeneratePlans}>Generate Plans</button>
            </form>
            {fitnessPlan && (
                <div>
                    <h2>Your Fitness Plan</h2>
                    <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{fitnessPlan}</pre>
                </div>
            )}
            {mealPlan && (
                <div>
                    <h2>Your Meal Plan</h2>
                    <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{mealPlan}</pre>
                </div>
            )}
        </div>
    );
}
