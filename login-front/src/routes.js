import { ForgetPassword } from "./pages/forgetPassword/ForgetPassword";
import { StudentPage } from "./pages/studentPage/StudentPage";
import { TeacherPage } from "./pages/teacherPage/TeacherPage";
import { SuperUserPage } from "./pages/superUserPage/SuperUserPage";
import { ExecutivePage } from "./pages/executive/Executive";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { PasswordRecovery } from "./pages/passwordRecovery/PasswordRecovery";
import { Home } from "./pages/Home";

export const routes = [
  {
    path: "/",
    Element: Home,
  },
  {
    path: "/login",
    Element: Login,
  },
  {
    path: "/register",
    Element: Register,
  },
  {
    path: "/forget",
    Element: ForgetPassword,
  },
  {
    path: "/student",
    Element: StudentPage,
  },
  {
    path: "/teacher",
    Element: TeacherPage,
  },
  {
    path: "/superuser",
    Element: SuperUserPage,
  },
  {
    path: "/executive",
    Element: ExecutivePage,
  },
  {
    path: "/newpassword/:token",
    Element: PasswordRecovery,
  },
];
