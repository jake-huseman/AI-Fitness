import { useState } from "react";
import jsPDF from "jspdf";

export default function GeneratePlans() {
    const [formData, setFormData] = useState({
        measurementSystem: "metric", // Default to metric
        heightCm: "",
        heightFeet: "",
        heightInches: "",
        weight: "",
        age: "",
        gender: "male",
        fitnessLevel: "beginner",
        dietPreference: "balanced",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleGeneratePlans = () => {
        let height = "";

        // Convert height to a single string based on the measurement system
        if (formData.measurementSystem === "metric") {
            height = `${formData.heightCm} cm`;
        } else {
            const totalInches = parseInt(formData.heightFeet) * 12 + parseInt(formData.heightInches);
            height = `${formData.heightFeet} ft ${formData.heightInches} in (${totalInches} in)`;
        }

        const fitnessPlan = `
        Fitness Plan:
        - Fitness Level: ${formData.fitnessLevel}
        - Age: ${formData.age}
        - Height: ${height}
        - Weight: ${formData.measurementSystem === "metric" ? `${formData.weight} kg` : `${formData.weight} lbs`}
        - Suggested Workout: Cardio, Strength Training, and Flexibility exercises.

        Meal Plan:
        - Diet Preference: ${formData.dietPreference}
        - Suggested Meals: Balanced meals rich in protein, fiber, and healthy fats.
        `;

        // Generate PDF
        const doc = new jsPDF();
        doc.text(fitnessPlan, 10, 10);
        doc.save("Fitness_and_Meal_Plan.pdf");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Generate Fitness & Meal Plans</h1>
            <form style={{ marginTop: "20px" }}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Measurement System: </label>
                    <select
                        name="measurementSystem"
                        value={formData.measurementSystem}
                        onChange={handleInputChange}
                    >
                        <option value="metric">Metric (cm, kg)</option>
                        <option value="imperial">Imperial (ft, in, lbs)</option>
                    </select>
                </div>

                {formData.measurementSystem === "metric" ? (
                    <div style={{ marginBottom: "10px" }}>
                        <label>Height (cm): </label>
                        <input
                            type="number"
                            name="heightCm"
                            value={formData.heightCm}
                            onChange={handleInputChange}
                            placeholder="Enter your height in cm"
                        />
                    </div>
                ) : (
                    <div style={{ marginBottom: "10px" }}>
                        <label>Height: </label>
                        <input
                            type="number"
                            name="heightFeet"
                            value={formData.heightFeet}
                            onChange={handleInputChange}
                            placeholder="Feet"
                            style={{ width: "50px", marginRight: "5px" }}
                        />
                        <input
                            type="number"
                            name="heightInches"
                            value={formData.heightInches}
                            onChange={handleInputChange}
                            placeholder="Inches"
                            style={{ width: "50px" }}
                        />
                    </div>
                )}

                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Weight ({formData.measurementSystem === "metric" ? "kg" : "lbs"}):{" "}
                    </label>
                    <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder={`Enter your weight in ${formData.measurementSystem === "metric" ? "kg" : "lbs"}`}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Age: </label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Enter your age"
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Gender: </label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Fitness Level: </label>
                    <select
                        name="fitnessLevel"
                        value={formData.fitnessLevel}
                        onChange={handleInputChange}
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Diet Preference: </label>
                    <select
                        name="dietPreference"
                        value={formData.dietPreference}
                        onChange={handleInputChange}
                    >
                        <option value="balanced">Balanced</option>
                        <option value="vegan">Vegan</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="keto">Keto</option>
                        <option value="paleo">Paleo</option>
                    </select>
                </div>
                <button
                    type="button"
                    onClick={handleGeneratePlans}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Generate Plan
                </button>
            </form>
        </div>
    );
}
