import { useState } from "react";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph } from "docx";

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
    workoutTime: "",
    calorieIntake: "",
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

      setFitnessPlan(data.fitnessPlan || "No fitness plan generated.");
      setMealPlan(data.mealPlan || "No meal plan generated.");
    } catch (err) {
      console.error("Error generating plans:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = (content, type) => {
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    doc.save(`${formData.lastName}_${formData.firstName}_${type}.pdf`);
  };

  const downloadWord = (content, type) => {
    const doc = new Document({
      sections: [
        {
          children: [new Paragraph(content)],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${formData.lastName}_${formData.firstName}_${type}.docx`);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const emailPlans = () => {
    alert("Feature coming soon: Emailing plans!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Generate Fitness & Meal Plans</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generatePlans();
        }}
        style={{ marginBottom: "20px" }}
      >
        {/* Form Inputs */}
        {[
          { label: "First Name", name: "firstName", type: "text" },
          { label: "Last Name", name: "lastName", type: "text" },
          { label: "Height (Feet)", name: "heightFeet", type: "number" },
          { label: "Height (Inches)", name: "heightInches", type: "number" },
          { label: "Weight (lbs)", name: "weight", type: "number" },
          { label: "Age", name: "age", type: "number" },
          {
            label: "Gender",
            name: "gender",
            type: "select",
            options: ["Male", "Female", "Other"],
          },
          {
            label: "Fitness Level",
            name: "fitnessLevel",
            type: "select",
            options: ["Beginner", "Intermediate", "Advanced"],
          },
          {
            label: "Diet Preference",
            name: "dietPreference",
            type: "select",
            options: ["Vegetarian", "Vegan", "Keto", "None"],
          },
          {
            label: "Workout Time Availability (per day)",
            name: "workoutTime",
            type: "text",
            placeholder: "E.g., 1 hour",
          },
          {
            label: "Calorie Intake Goals",
            name: "calorieIntake",
            type: "text",
            placeholder: "E.g., 2000 kcal/day",
          },
        ].map((field, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <label>{field.label}:</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {field.options.map((option, optIdx) => (
                  <option key={optIdx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
              />
            )}
          </div>
        ))}
        <div>
          <label>Additional Goals:</label>
          <textarea
            name="additionalGoals"
            value={formData.additionalGoals}
            onChange={handleChange}
            placeholder="E.g., Gain muscle, lose weight, etc."
          ></textarea>
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: "20px" }}>
          {loading ? "Generating..." : "Generate Plans"}
        </button>
      </form>

      {/* Error Handling */}
      {loading && <p style={{ color: "blue" }}>Loading your personalized plans...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display Plans */}
      {fitnessPlan && (
        <div style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "10px", marginBottom: "20px" }}>
          <h2>Fitness Plan</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{fitnessPlan}</pre>
          <button onClick={() => downloadPDF(fitnessPlan, "fitnessplan")}>Download as PDF</button>
          <button onClick={() => downloadWord(fitnessPlan, "fitnessplan")}>Download as Word</button>
          <button onClick={emailPlans}>Email Plans</button>
        </div>
      )}

      {mealPlan && (
        <div style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "10px", marginBottom: "20px" }}>
          <h2>Meal Plan</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{mealPlan}</pre>
          <button onClick={() => downloadPDF(mealPlan, "mealplan")}>Download as PDF</button>
          <button onClick={() => downloadWord(mealPlan, "mealplan")}>Download as Word</button>
          <button onClick={emailPlans}>Email Plans</button>
        </div>
      )}
    </div>
  );
}
