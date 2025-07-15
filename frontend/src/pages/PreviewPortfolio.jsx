import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getFullPortfolio } from "../services/portfolioService";

function PreviewPortfolio() {
  const { token } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getFullPortfolio(token);
        setPortfolio(data);
      } catch (err) {
        console.error("Failed to load portfolio preview");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) return <p className="text-gray-600 dark:text-gray-300">Loading preview...</p>;
  if (!portfolio) return <p className="text-red-600">Failed to load portfolio</p>;

  const { about, skills, projects, experience } = portfolio;

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-8 py-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{about?.name}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">{about?.title}</p>
        <p className="mt-2">{about?.bio}</p>
        <div className="flex justify-center gap-4 mt-4 text-blue-600">
          {about?.github && <a href={about.github} target="_blank">GitHub</a>}
          {about?.linkedin && <a href={about.linkedin} target="_blank">LinkedIn</a>}
        </div>
      </div>

      <hr className="my-6 border-gray-300 dark:border-gray-700" />

      <div>
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        <ul className="flex flex-wrap gap-3">
          {skills?.map((skill, idx) => (
            <li key={idx} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              {skill.name} ({skill.level}%)
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-6 border-gray-300 dark:border-gray-700" />

      <div>
        <h2 className="text-2xl font-semibold mb-2">Projects</h2>
        <div className="space-y-4">
          {projects?.map((project, idx) => (
            <div key={idx} className="border p-4 rounded dark:border-gray-700">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
              <p className="text-sm mt-1 italic text-gray-500">Tech: {project.techStack}</p>
              <div className="mt-2 flex gap-4 text-blue-500">
                {project.github && <a href={project.github} target="_blank">GitHub</a>}
                {project.live && <a href={project.live} target="_blank">Live</a>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-6 border-gray-300 dark:border-gray-700" />

      <div>
        <h2 className="text-2xl font-semibold mb-2">Experience</h2>
        <div className="space-y-4">
          {experience?.map((exp, idx) => (
            <div key={idx} className="border p-4 rounded dark:border-gray-700">
              <h3 className="text-lg font-medium">{exp.title} at {exp.company}</h3>
              <p className="text-sm text-gray-500">{exp.duration}</p>
              <p className="mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PreviewPortfolio;
