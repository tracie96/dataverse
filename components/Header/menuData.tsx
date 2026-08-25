import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Initiative",
    newTab: false,
    path: "/about",
  },
  {
    id: 2.3,
    title: "AI Literacy",
    newTab: false,
    path: "/ai-literacy",
  },
  {
    id: 2.5,
    title: "Gallery",
    newTab: false,
    path: "/gallery",
  },
  {
    id: 3,
    title: "Internship",
    newTab: false,
    path: "/internship",
    submenu: [
      {
        id: 31,
        title: "All Cohorts",
        newTab: false,
        path: "/internship",
      },
      {
        id: 35,
        title: "Cohort 5 (Open)",
        newTab: false,
        path: "/internship-cohort5",
      },
    ],
  },
  {
    id: 2.1,
    title: "Event",
    newTab: false,
    path: "/blog",
  },
  {
    id: 4,
    title: "Support",
    newTab: false,
    path: "/support",
  },
  {
    id: 5,
    title: "Research",
    newTab: false,
    path: "/research",
  },
];

export default menuData;
