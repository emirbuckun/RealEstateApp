import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarB from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { validateToken } from "/src/services/AuthService";
import { LANGUAGES } from "/src/constants";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const mainlist = [
    { name: "home", url: "/home" },
    { name: "estates", url: "/estates" },
    { name: "photos", url: "/photos" },
    { name: "prices", url: "/prices" },
    { name: "map", url: "/map" },
  ];
  const lookUplist = [
    { name: "currencies", url: "/currencies" },
    { name: "statuses", url: "/statuses" },
    { name: "types", url: "/types" },
  ];

  const onChangeLang = (e) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
    localStorage.setItem("lang", lang_code);
  };

  return (
    <NavbarB fixed="top" collapseOnSelect expand="md">
      <Container>
        <NavbarB.Brand href="/">{t("title")}</NavbarB.Brand>
        <NavbarB.Toggle aria-controls="responsive-navbar-nav" />
        <NavbarB.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {mainlist.map((item, index) => {
              const { name, url } = item;
              return (
                <Nav.Link key={index} href={url}>
                  {t(name)}
                </Nav.Link>
              );
            })}
            <NavDropdown title={t("lookup")} id="collasible-nav-dropdown">
              {lookUplist.map((item, index) => {
                const { name, url } = item;
                return (
                  <NavDropdown.Item key={index} href={url}>
                    {t(name)}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
          <Form>
            <Form.Select onChange={onChangeLang}>
              {LANGUAGES.map(({ code, label }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </Form.Select>
          </Form>
          <Nav>
            {!validateToken() ? (
              <Nav.Link href="/auth">Login/Register</Nav.Link>
            ) : (
              <Nav.Link
                href="/auth"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("tokenExpiration");
                }}
              >
                Log Out
              </Nav.Link>
            )}
          </Nav>
        </NavbarB.Collapse>
      </Container>
    </NavbarB>
  );
};

export default Navbar;
