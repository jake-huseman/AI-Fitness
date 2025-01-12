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

  const downloadEnhancedPDF = (content, type, title) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 15;
    const lineHeight = 10;

    // Title
    doc.setFontSize(18);
    doc.setTextColor(40, 116, 240); // Blue color
    doc.text(title, margin, 20);

    // Body Text
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    const textLines = doc.splitTextToSize(content, pageWidth - 2 * margin);
    let y = 40;

    textLines.forEach((line) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    // Footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );
    }

    const fileName = `${formData.lastName}_${formData.firstName}_${type}.pdf`;
    doc.save(fileName);
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

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Plans"}
        </button>
      </form>

      {fitnessPlan && (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px", marginBottom: "20px" }}>
          <h2>Fitness Plan</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{fitnessPlan}</pre>
          <button onClick={() => downloadEnhancedPDF(fitnessPlan, "fitnessplan", "Fitness Plan")}>
            Download as PDF
          </button>
        </div>
      )}

      {mealPlan && (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px", marginBottom: "20px" }}>
          <h2>Meal Plan</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{mealPlan}</pre>
          <button onClick={() => downloadEnhancedPDF(mealPlan, "mealplan", "Meal Plan")}>
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}
