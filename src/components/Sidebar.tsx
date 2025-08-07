import { useState } from "react";
import { useDispatch } from "react-redux";
import { setRules } from "../store/dataSourceSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const [colour, setColour] = useState([
    { condition: "<10", color: "#ff0000" },
    { condition: "10-25", color: "#0000ff" },
    { condition: ">=25", color: "#00ff00" },
  ]);

  const parseCondition = (condition: string, color: string) => {
    if (condition.includes("-")) {
      const [min, max] = condition.split("-").map(Number);
      return {
        operator: "between",
        value1: min,
        value2: max,
        color,
      };
    } else if (condition.startsWith("<=")) {
      return { operator: "<=", value1: Number(condition.slice(2)), color };
    } else if (condition.startsWith(">=")) {
      return { operator: ">=", value1: Number(condition.slice(2)), color };
    } else if (condition.startsWith("<")) {
      return { operator: "<", value1: Number(condition.slice(1)), color };
    } else if (condition.startsWith(">")) {
      return { operator: ">", value1: Number(condition.slice(1)), color };
    }

    // fallback
    return { operator: "==", value1: Number(condition), color };
  };

  const handleChange = (
    index: number,
    field: "condition" | "color",
    value: string
  ) => {
    const updated = [...colour];
    updated[index][field] = value;
    setColour(updated);

    const parsedRules = updated.map((rule) =>
      parseCondition(rule.condition, rule.color)
    );
    dispatch(setRules(parsedRules));
  };

  return (
    <div className="w-72 bg-[#0d1117] p-4 rounded-lg text-white">
      <div className="font-bold mb-2 text-center text-violet-400">Colour Rules</div>

      <div className="space-y-3">
        {colour.map((rule, index) => (
          <div key={index} className="flex gap-8 items-center">
            <input
              value={rule.condition}
              onChange={(e) => handleChange(index, "condition", e.target.value)}
              placeholder="Condition"
              className="w-1/2 border p-1 rounded text-white"
            />
            <input
              type="color"
              value={rule.color}
              onChange={(e) => handleChange(index, "color", e.target.value)}
              className="w-1/4 h-10 p-1 rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
