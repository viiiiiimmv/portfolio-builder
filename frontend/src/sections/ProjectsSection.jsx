import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import FormButton from "../components/FormButton";
import { getProjects, updateProjects } from "../services/projectsService";
import { useAuth } from "../context/AuthContext";

function ProjectsSection() {
  const { token } = useAuth();

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    techStack: "",
    github: "",
    live: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await getProjects(token);
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const handleDelete = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  const handleAdd = () => {
    if (!newProject.title || !newProject.description) return;
    setProjects([...projects, { ...newProject }]);
    setNewProject({
      title: "",
      description: "",
      techStack: "",
      github: "",
      live: "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await updateProjects(projects, token);
      setMessage("Projects saved successfully!");
    } catch (err) {
      setMessage("Failed to save projects.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Projects</h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading projects...</p>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {projects.map((proj, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <InputField
                label="Title"
                name="title"
                value={proj.title}
                onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                required
              />
              <InputField
                label="Description"
                name="description"
                value={proj.description}
                onChange={(e) => handleProjectChange(index, "description", e.target.value)}
              />
              <InputField
                label="Tech Stack (comma separated)"
                name="techStack"
                value={proj.techStack}
                onChange={(e) => handleProjectChange(index, "techStack", e.target.value)}
              />
              <InputField
                label="GitHub Link"
                name="github"
                value={proj.github}
                onChange={(e) => handleProjectChange(index, "github", e.target.value)}
              />
              <InputField
                label="Live Demo Link"
                name="live"
                value={proj.live}
                onChange={(e) => handleProjectChange(index, "live", e.target.value)}
              />

              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="text-red-500 text-sm mt-2 hover:underline"
              >
                Delete Project
              </button>
            </div>
          ))}

          {/* New project input */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Add New Project</h4>

            <InputField
              label="Title"
              name="title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              required
            />
            <InputField
              label="Description"
              name="description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <InputField
              label="Tech Stack"
              name="techStack"
              value={newProject.techStack}
              onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
            />
            <InputField
              label="GitHub Link"
              name="github"
              value={newProject.github}
              onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
            />
            <InputField
              label="Live Demo Link"
              name="live"
              value={newProject.live}
              onChange={(e) => setNewProject({ ...newProject, live: e.target.value })}
            />

            <button
              type="button"
              onClick={handleAdd}
              className="mt-2 bg-green-600 text-white text-sm px-4 py-1.5 rounded hover:bg-green-700"
            >
              Add Project
            </button>
          </div>

          <FormButton label="Save All Projects" loading={saving} />
          {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
        </form>
      )}
    </div>
  );
}

export default ProjectsSection;
