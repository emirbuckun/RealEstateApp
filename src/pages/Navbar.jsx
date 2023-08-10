import { validateToken } from "/src/services/AuthService";
import { LANGUAGES } from "/src/constants";
import { useTranslation } from "react-i18next";
import { Form, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const NavbarComponent = () => {
  const { i18n, t } = useTranslation();
  const mainlist = [
    { name: "home", url: "/home" },
    { name: "estates", url: "/estates" },
    { name: "photos", url: "/photos" },
    { name: "prices", url: "/prices" },
    { name: "map", url: "/map" },
    { name: "dashboard", url: "/dashboard" },
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
    <Navbar fixed="top" collapseOnSelect expand="md">
      <Container>
        <Navbar.Brand href="/">{t("title")}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
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
            <Form.Select onChange={onChangeLang} value={i18n.language}>
              {LANGUAGES.map(({ code, label }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </Form.Select>
          </Form>
          <Nav>
            {!validateToken() ? (
              <Nav.Link href="/auth">
                {t("login")}/{t("register")}
              </Nav.Link>
            ) : (
              <Nav.Link
                href="/auth"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("tokenExpiration");
                }}
              >
                {t("logout")}
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
