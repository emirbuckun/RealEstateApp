import { AuthForm } from "/src/components/AuthForm";
import { login, register } from "/src/services/AuthService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";

const Auth = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    var response;

    if (isLogin) {
      response = login({ username, password }).then((response) => {
        if (response == 200) {
          alert("Login successful!");
          navigate("/");
        } else alert("Login failed!");
      });
    } else {
      response = register(form).then((response) => {
        if (response.status == 200) {
          alert(response.data.message);
          setIsLogin(true);
        } else alert("Register failed!");
      });
    }

    response.catch((error) => {
      console.error(error);
      alert("Error occurred:\n" + error);
    });
  };

  return (
    <>
      <h3>
        {t("login")} {t("or")} {t("register")}
      </h3>
      <Tabs
        fill
        className="mb-3"
        onSelect={(key) => setIsLogin(key == "login")}
      >
        <Tab eventKey="login" title={t("login")}></Tab>
        <Tab eventKey="register" title={t("register")}></Tab>
      </Tabs>
      <AuthForm
        isLogin={isLogin}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Auth;
