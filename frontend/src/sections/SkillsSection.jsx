import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import FormButton from "../components/FormButton";
import { getSkills, updateSkills } from "../services/skillsService";
import { useAuth } from "../context/AuthContext";

function SkillsSection() {
  const { token } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", level: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const data = await getSkills(token);
        setSkills(data);
      } catch (err) {
        console.error("Failed to load skills");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  const handleAdd = () => {
    if (!newSkill.name || !newSkill.level) return;
    setSkills([...skills, { ...newSkill }]);
    setNewSkill({ name: "", level: "" });
  };

  const handleDelete = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await updateSkills(skills, token);
      setMessage("Skills saved successfully!");
    } catch (err) {
      setMessage("Failed to save skills.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Skills</h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading skills...</p>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                placeholder="Skill name"
                className="flex-1 px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
              />
              <input
                type="number"
                value={skill.level}
                onChange={(e) => handleChange(index, "level", e.target.value)}
                placeholder="Level (%)"
                className="w-24 px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="text-red-600 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          ))}

          {/* Add new skill */}
          <div className="flex items-center gap-4 mt-4">
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="New skill"
              className="flex-1 px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
            <input
              type="number"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
              placeholder="%"
              className="w-24 px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
            <button
              type="button"
              onClick={handleAdd}
              className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>

          <FormButton label="Save Changes" loading={saving} />

          {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
        </form>
      )}
    </div>
  );
}

export default SkillsSection;
