// src/components/CreateTimesheetForm.js
import React, { useState } from "react";
import { useCreateTimesheetMutation } from "../../redux/slices/api/timeApiSlice";
import { useNavigate } from "react-router-dom";

const CreateTimesheetForm = () => {
  const [date, setDate] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [createTimesheet] = useCreateTimesheetMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTimesheet({ date, hoursWorked, taskDetails }).unwrap();
      navigate("/timesheet"); 
    } catch (err) {
      console.error("Failed to submit timesheet", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="number"
        value={hoursWorked}
        onChange={(e) => setHoursWorked(e.target.value)}
        required
      />
      <textarea
        value={taskDetails}
        onChange={(e) => setTaskDetails(e.target.value)}
        required
      />
      <button type="submit">Submit Timesheet</button>
    </form>
  );
};

export default CreateTimesheetForm;
