import { useTranslation } from "react-i18next";
import { LANGUAGES } from "/src/constants";
import { Form } from "react-bootstrap";

const SelectLanguage = () => {
  const { i18n } = useTranslation();
  const onChangeLang = (e) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
    localStorage.setItem("lang", lang_code);
  };

  return (
    <Form>
      <Form.Select
        style={{ borderColor: "white" }}
        onChange={onChangeLang}
        value={i18n.language}
      >
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </Form.Select>
    </Form>
  );
};

export default SelectLanguage;
