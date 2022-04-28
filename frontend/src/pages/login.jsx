import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Container from "../components/Container/container";
import Header from "../components/Header/header";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const token = await axios
      .post("http://localhost:3000/login", { cpf, password })
      .then((res) => res.data)
      .then(() => {
        toast.success("Logado com sucesso!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        toast.error("Usuário ou senha inválidos.", {
          position: toast.POSITION.TOP_CENTER,
        });
      });

    setCpf("");
    setPassword("");
  };
  return (
    <>
      <Header />
      <Container>
        <Typography variant="h3" align="center">
          Login
        </Typography>
        <TextField
          name="cpf"
          label="CPF"
          variant="standard"
          size="small"
          value={cpf}
          onChange={({ target }) => setCpf(target.value)}
        ></TextField>
        <TextField
          name="password"
          label="Senha"
          variant="standard"
          size="small"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        ></TextField>
        <Button variant="outlined" onClick={handleLogin}>
          Entrar
        </Button>
      </Container>
    </>
  );
};
export default LoginPage;
