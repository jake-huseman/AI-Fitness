import { useState } from "react";
import jsPDF from "jspdf";

export default function GeneratePlans() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    heightFeet: "",
    heightInches: "",
    weight: "",
    age: "",
    gender: "",
    fitnessLevel: "",
    dietPreference: "",
    additionalGoals: "",
  });
  const [fitnessPlan, setFitnessPlan] = useState("");
  const [mealPlan, setMealPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePlans = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/generatePlans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate plans. Please try again.");
      }

      const data = await response.json();

      if (!data.fitnessPlan || !data.mealPlan) {
        throw new Error("Plans could not be generated. Please check the inputs and try again.");
      }

      setFitnessPlan(data.fitnessPlan);
      setMealPlan(data.mealPlan);
    } catch (err) {
      console.error("Error generating plans:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = (plan, type) => {
    const doc = new jsPDF();
    const fileName = `${formData.lastName}${formData.firstName}_${type}.pdf`;
    doc.text(plan, 10, 10);
    doc.save(fileName);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Generate Fitness & Meal Plans</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generatePlans();
        }}
        style={{ marginBottom: "20px" }}
      >
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Height (Feet):</label>
          <input
            type="number"
            name="heightFeet"
            value={formData.heightFeet}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Height (Inches):</label>
          <input
            type="number"
            name="heightInches"
            value={formData.heightInches}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Weight (lbs):</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
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
        <div>
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
            <option value="None">None</option>
          </select>
        </div>
        <div>
          <label>Additional Goals:</label>
          <textarea
            name="additionalGoals"
            value={formData.additionalGoals}
            onChange={handleChange}
            placeholder="E.g., Gain muscle, lose weight, etc."
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Plans"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {fitnessPlan && (
        <div>
          <h2>Fitness Plan</h2>
          <pre style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: "10px" }}>
            {fitnessPlan}
          </pre>
          <button onClick={() => downloadPDF(fitnessPlan, "fitnessplan")}>
            Download Fitness Plan
          </button>
        </div>
      )}

      {mealPlan && (
        <div>
          <h2>Meal Plan</h2>
          <pre style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: "10px" }}>
            {mealPlan}
          </pre>
          <button onClick={() => downloadPDF(mealPlan, "mealplan")}>
            Download Meal Plan
          </button>
        </div>
      )}
    </div>
  );
}
