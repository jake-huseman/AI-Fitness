export default function Goals() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Set Your Goals</h1>
            <form>
                <label>
                    Goal Name:
                    <input type="text" placeholder="E.g., Run 5 miles" />
                </label>
                <br />
                <label>
                    Target Date:
                    <input type="date" />
                </label>
                <br />
                <button type="submit" style={{ marginTop: "10px" }}>Save Goal</button>
            </form>
        </div>
    );
}
