import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import FormButton from "../components/FormButton";
import { getExperience, updateExperience } from "../services/experienceService";
import { useAuth } from "../context/AuthContext";

function ExperienceSection() {
  const { token } = useAuth();
  const [experience, setExperience] = useState([]);
  const [newExp, setNewExp] = useState({
    title: "",
    company: "",
    duration: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchExperience = async () => {
      setLoading(true);
      try {
        const data = await getExperience(token);
        setExperience(data);
      } catch (err) {
        console.error("Failed to load experience");
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  const handleDelete = (index) => {
    const updated = experience.filter((_, i) => i !== index);
    setExperience(updated);
  };

  const handleAdd = () => {
    if (!newExp.title || !newExp.company || !newExp.duration) return;
    setExperience([...experience, { ...newExp }]);
    setNewExp({
      title: "",
      company: "",
      duration: "",
      description: "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await updateExperience(experience, token);
      setMessage("Experience saved successfully!");
    } catch (err) {
      setMessage("Failed to save experience.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Experience</h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <InputField
                label="Role / Title"
                name="title"
                value={exp.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
              />
              <InputField
                label="Company"
                name="company"
                value={exp.company}
                onChange={(e) => handleChange(index, "company", e.target.value)}
              />
              <InputField
                label="Duration"
                name="duration"
                value={exp.duration}
                onChange={(e) => handleChange(index, "duration", e.target.value)}
              />
              <InputField
                label="Description"
                name="description"
                value={exp.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="text-red-500 text-sm mt-2 hover:underline"
              >
                Delete Experience
              </button>
            </div>
          ))}

          {/* New Experience Input */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Add Experience</h4>
            <InputField
              label="Role / Title"
              name="title"
              value={newExp.title}
              onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
            />
            <InputField
              label="Company"
              name="company"
              value={newExp.company}
              onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
            />
            <InputField
              label="Duration"
              name="duration"
              value={newExp.duration}
              onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })}
            />
            <InputField
              label="Description"
              name="description"
              value={newExp.description}
              onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
            />

            <button
              type="button"
              onClick={handleAdd}
              className="mt-2 bg-green-600 text-white text-sm px-4 py-1.5 rounded hover:bg-green-700"
            >
              Add Experience
            </button>
          </div>

          <FormButton label="Save All" loading={saving} />
          {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
        </form>
      )}
    </div>
  );
}

export default ExperienceSection;
