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
    title: "Our Initiative",
    newTab: false,
    path: "/about",
  },
  {
    id: 3,
    title: "Internship",
    newTab: false,
    path: "/internship",
    submenu: [
      {
        id: 3.1,
        title: "Cohort 3 (Closed)",
        newTab: false,
        path: "",
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
