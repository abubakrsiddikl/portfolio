import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { ProjectRoutes } from "../modules/project/project.route";
import { StatsRoutes } from "../modules/stats/stats.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/blog",
    route: BlogRoutes,
  },
  {
    path: "/project",
    route: ProjectRoutes,
  },
  {
    path: "/stats",
    route: StatsRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
