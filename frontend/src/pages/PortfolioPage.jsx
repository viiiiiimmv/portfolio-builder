import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicPortfolio } from "../services/portfolioService";

function PortfolioPage() {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPublicPortfolio(username);
        setPortfolio(data);
      } catch (err) {
        console.error("User not found");
        setPortfolio(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]);

  if (loading) return <p className="text-center text-gray-500">Loading portfolio...</p>;
  if (!portfolio) return <p className="text-center text-red-600">Portfolio not found.</p>;

  const { about, skills, projects, experience } = portfolio;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-10 max-w-4xl mx-auto">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">{about?.name}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">{about?.title}</p>
        <p className="mt-2">{about?.bio}</p>
        <div className="flex justify-center gap-4 mt-4 text-blue-600">
          {about?.github && <a href={about.github} target="_blank" rel="noreferrer">GitHub</a>}
          {about?.linkedin && <a href={about.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <span key={i} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              {skill.name} ({skill.level}%)
            </span>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Projects</h2>
        <div className="space-y-4">
          {projects.map((project, i) => (
            <div key={i} className="p-4 border rounded dark:border-gray-700">
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
              <p className="text-sm mt-1 text-gray-500">Tech: {project.techStack}</p>
              <div className="mt-2 flex gap-4 text-blue-500 text-sm">
                {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>}
                {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live Demo</a>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Experience</h2>
        <div className="space-y-4">
          {experience.map((exp, i) => (
            <div key={i} className="p-4 border rounded dark:border-gray-700">
              <h3 className="text-lg font-medium">{exp.title} @ {exp.company}</h3>
              <p className="text-sm text-gray-500">{exp.duration}</p>
              <p className="mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PortfolioPage;
