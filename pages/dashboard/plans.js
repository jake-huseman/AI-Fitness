import { useState } from "react";
import jsPDF from "jspdf";

export default function GeneratePlans() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    heightFeet: "",
    heightInches: "",
    weight: "",
    dietPreference: "",
    fitnessLevel: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generatePDFs = () => {
    const {
      firstName,
      lastName,
      age,
      heightFeet,
      heightInches,
      weight,
      dietPreference,
      fitnessLevel,
    } = formData;

    const fullName = `${lastName}${firstName}`;

    // Fitness Plan PDF
    const fitnessPlan = new jsPDF();
    fitnessPlan.text("Fitness Plan:", 10, 10);
    fitnessPlan.text(`Name: ${firstName} ${lastName}`, 10, 20);
    fitnessPlan.text(`Age: ${age}`, 10, 30);
    fitnessPlan.text(
      `Height: ${heightFeet} ft ${heightInches} in (${parseInt(heightFeet) * 12 + parseInt(heightInches)} in)`,
      10,
      40
    );
    fitnessPlan.text(`Weight: ${weight} lbs`, 10, 50);
    fitnessPlan.text(`Fitness Level: ${fitnessLevel}`, 10, 60);
    fitnessPlan.text("Suggested Workout:", 10, 70);
    fitnessPlan.text("- Cardio", 10, 80);
    fitnessPlan.text("- Strength Training", 10, 90);
    fitnessPlan.text("- Flexibility exercises", 10, 100);
    fitnessPlan.save(`${fullName}_fitnessplan.pdf`);

    // Meal Plan PDF
    const mealPlan = new jsPDF();
    mealPlan.text("Meal Plan:", 10, 10);
    mealPlan.text(`Name: ${firstName} ${lastName}`, 10, 20);
    mealPlan.text(`Age: ${age}`, 10, 30);
    mealPlan.text(`Diet Preference: ${dietPreference}`, 10, 40);
    mealPlan.text("Suggested Meals:", 10, 50);
    mealPlan.text(
      "- Balanced meals rich in protein, fiber, and healthy fats.",
      10,
      60
    );
    mealPlan.save(`${fullName}_mealplans.pdf`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Generate Fitness & Meal Plans</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generatePDFs();
        }}
        style={{ display: "inline-block", textAlign: "left" }}
      >
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Height:
          <input
            type="number"
            name="heightFeet"
            placeholder="Feet"
            value={formData.heightFeet}
            onChange={handleChange}
            required
          />
          ft
          <input
            type="number"
            name="heightInches"
            placeholder="Inches"
            value={formData.heightInches}
            onChange={handleChange}
            required
          />
          in
        </label>
        <br />
        <label>
          Weight (lbs):
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Diet Preference:
          <select
            name="dietPreference"
            value={formData.dietPreference}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Balanced">Balanced</option>
            <option value="Vegan">Vegan</option>
            <option value="Low Carb">Low Carb</option>
          </select>
        </label>
        <br />
        <label>
          Fitness Level:
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
        </label>
        <br />
        <button type="submit">Generate Plans</button>
      </form>
    </div>
  );
}
