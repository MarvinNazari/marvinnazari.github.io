import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Marvin Nazari",
  EMAIL: "marvin@wavio.co",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Marvin Nazari's personal website - work history, projects, and blog.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "github",
    HREF: "https://github.com/MarvinNazari"
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/marvin-nazari-8408a063/"
  }
];
