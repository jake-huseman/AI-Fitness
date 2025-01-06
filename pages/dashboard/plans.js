import { useState } from "react";
import jsPDF from "jspdf";

export default function GeneratePlans() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        age: "",
        heightFeet: "",
        heightInches: "",
        weight: "",
        fitnessLevel: "",
        dietPreference: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const generatePDFs = () => {
        const fullName = `${formData.lastname}${formData.firstname}`;
        const height = `${formData.heightFeet} ft ${formData.heightInches} in`;

        // Generate Fitness Plan PDF
        const fitnessDoc = new jsPDF();
        fitnessDoc.setFontSize(16);
        fitnessDoc.text("Personalized Fitness Plan", 10, 10);
        fitnessDoc.setFontSize(12);
        fitnessDoc.text(`Name: ${formData.firstname} ${formData.lastname}`, 10, 20);
        fitnessDoc.text(`Age: ${formData.age}`, 10, 30);
        fitnessDoc.text(`Height: ${height}`, 10, 40);
        fitnessDoc.text(`Weight: ${formData.weight}`, 10, 50);
        fitnessDoc.text(`Fitness Level: ${formData.fitnessLevel}`, 10, 60);
        fitnessDoc.text("Workout Schedule:", 10, 80);
        fitnessDoc.text("- Monday: Cardio (e.g., 30 min jog)", 20, 90);
        fitnessDoc.text("- Tuesday: Strength Training (e.g., Upper Body)", 20, 100);
        fitnessDoc.text("- Wednesday: Flexibility (e.g., Yoga)", 20, 110);
        fitnessDoc.text("- Thursday: Cardio (e.g., Cycling)", 20, 120);
        fitnessDoc.text("- Friday: Strength Training (e.g., Lower Body)", 20, 130);
        fitnessDoc.text("- Saturday: Active Recovery (e.g., Walk)", 20, 140);
        fitnessDoc.text("- Sunday: Rest", 20, 150);
        fitnessDoc.text("Tips:", 10, 170);
        fitnessDoc.text("- Stay hydrated.", 20, 180);
        fitnessDoc.text("- Warm-up before workouts.", 20, 190);
        fitnessDoc.text("- Track your progress.", 20, 200);
        fitnessDoc.save(`${fullName}_fitnessplan.pdf`);

        // Generate Meal Plan PDF
        const mealDoc = new jsPDF();
        mealDoc.setFontSize(16);
        mealDoc.text("Personalized Meal Plan", 10, 10);
        mealDoc.setFontSize(12);
        mealDoc.text(`Name: ${formData.firstname} ${formData.lastname}`, 10, 20);
        mealDoc.text(`Age: ${formData.age}`, 10, 30);
        mealDoc.text(`Diet Preference: ${formData.dietPreference}`, 10, 40);
        mealDoc.text("Daily Meal Schedule:", 10, 60);
        mealDoc.text("- Breakfast: Scrambled eggs with spinach.", 20, 70);
        mealDoc.text("- Lunch: Grilled chicken salad with vinaigrette.", 20, 80);
        mealDoc.text("- Snack: Greek yogurt with berries.", 20, 90);
        mealDoc.text("- Dinner: Salmon with quinoa and steamed broccoli.", 20, 100);
        mealDoc.text("Tips for Healthy Eating:", 10, 120);
        mealDoc.text("- Practice portion control.", 20, 130);
        mealDoc.text("- Plan meals ahead.", 20, 140);
        mealDoc.text("- Stay consistent.", 20, 150);
        mealDoc.save(`${fullName}_mealplans.pdf`);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h1>Generate Fitness and Meal Plans</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    generatePDFs();
                }}
            >
                <div style={{ marginBottom: "10px" }}>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Height:</label>
                    <input
                        type="number"
                        name="heightFeet"
                        value={formData.heightFeet}
                        onChange={handleChange}
                        placeholder="Feet"
                        required
                    />
                    <input
                        type="number"
                        name="heightInches"
                        value={formData.heightInches}
                        onChange={handleChange}
                        placeholder="Inches"
                        required
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Weight (lbs):</label>
                    <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Fitness Level:</label>
                    <select
                        name="fitnessLevel"
                        value={formData.fitnessLevel}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Diet Preference:</label>
                    <select
                        name="dietPreference"
                        value={formData.dietPreference}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Keto">Keto</option>
                        <option value="Balanced">Balanced</option>
                    </select>
                </div>
                <button type="submit">Generate Plans</button>
            </form>
        </div>
    );
}
