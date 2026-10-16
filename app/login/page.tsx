import { Suspense } from "react";
import { LoginPage } from "#/pages/Login";
export const metadata = {
  title: "Вход",
  description: "Вход в аккаунт Anixart",
};
export default function Login() {
  return (
    <Suspense fallback={<p role="status">Готовим форму входа…</p>}>
      <LoginPage />
    </Suspense>
  );
}
