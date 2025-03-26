import {
  faBook,
  faEnvelope,
  faGraduationCap,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

export const navigationList = [
  {
    to: "/",
    label: "home",
    icon: faHouse,
    color: "red",
  },
  {
    to: "/skills",
    label: "skills",
    icon: faGraduationCap,
    color: "purple",
  },
  {
    to: "/projects",
    label: "projects",
    icon: faBook,
    color: "turquois",
  },
  {
    to: "/contact",
    label: "contact",
    icon: faEnvelope,
    color: "brown",
  },
];
