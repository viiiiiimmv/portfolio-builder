import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import FormButton from "../components/FormButton";
import { getAbout, updateAbout } from "../services/aboutService";
import { useAuth } from "../context/AuthContext";

function AboutSection() {
  const { token } = useAuth();

  const [form, setForm] = useState({
    name: "",
    title: "",
    bio: "",
    location: "",
    github: "",
    linkedin: ""
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAbout(token);
      setForm(data);
    } catch (err) {
      console.error("Failed to fetch about data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await updateAbout(form, token);
      setMessage("Saved successfully!");
    } catch (err) {
      setMessage("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">About Me</h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} required />
          <InputField label="Title (e.g., Web Developer)" name="title" value={form.title} onChange={handleChange} required />
          <InputField label="Bio" name="bio" value={form.bio} onChange={handleChange} />
          <InputField label="Location" name="location" value={form.location} onChange={handleChange} />
          <InputField label="GitHub" name="github" value={form.github} onChange={handleChange} />
          <InputField label="LinkedIn" name="linkedin" value={form.linkedin} onChange={handleChange} />

          <FormButton label="Save" loading={saving} />

          {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
        </form>
      )}
    </div>
  );
}

export default AboutSection;
