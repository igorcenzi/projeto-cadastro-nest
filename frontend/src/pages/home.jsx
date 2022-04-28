import Container from "../components/Container/container";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../components/Header/header";

const HomePage = () => {
  const [endereco, setEndereco] = useState({});
  const [cep, setCep] = useState(0);
  const [load, setLoad] = useState(false);

  const formSchema = yup.object().shape({
    nome: yup.string().required("Nome obrigatório"),
    telefone: yup.string().required("Telefone obrigatório"),
    cpf: yup.string().required("CPF obrigatório"),
    numero: yup.number().required("Número da residência obrigatório"),
    password: yup
      .string()
      .required("Insira uma senha")
      .matches(
        /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Senha precisa conter maiúscula, minúscula, número, caracter especial e no mínimo 8 caracteres"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas não conferem")
      .required("Confirme sua senha"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const handleSearchCep = async () => {
    setLoad(true);
    await axios
      .get(`http://localhost:3000/cep/${cep}`)
      .then((resp) => {
        if (resp.data.erro) {
          toast.error("CEP não encontrado!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          setEndereco(resp.data);
        }
      })
      .catch((err) => {
        toast.error("CEP não encontrado!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    setLoad(false);
  };

  const handleRegister = async (data) => {
    try {
      delete data.confirmPassword;
      data.logradouro = endereco.logradouro;
      data.cidade = endereco.localidade;
      data.estado = endereco.uf;
      data.cep = Number(cep);
      if (data.logradouro) {
        console.log(data);
        await axios
          .post(`http://localhost:3000/user`, data)
          .catch((err) => console.log(err));
        toast.success("Cadastrado com sucesso!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setEndereco({});
        setCep(null);
      }
    } catch (err) {
      console.log(err);
    }
    reset();
  };

  return (
    <>
      <Header />
      <Container>
        <form onSubmit={handleSubmit(handleRegister)}>
          <Typography variant="h3" align="center">
            Cadastro
          </Typography>
          <TextField
            {...register("nome")}
            helperText={errors.nome?.message}
            error={errors.nome}
            name="nome"
            label="Nome"
            variant="standard"
            size="small"
          ></TextField>
          <TextField
            {...register("password")}
            helperText={errors.password?.message}
            error={errors.password}
            name="password"
            label="Senha"
            variant="standard"
            size="small"
            type="password"
          ></TextField>
          <TextField
            {...register("confirmPassword")}
            helperText={errors.confirmPassword?.message}
            error={errors.confirmPassword}
            name="confirmPassword"
            label="Confirmar Senha"
            variant="standard"
            size="small"
            type="password"
          ></TextField>
          <TextField
            {...register("cpf")}
            helperText={errors.cpf?.message}
            error={errors.cpf}
            name="cpf"
            label="CPF"
            variant="standard"
            size="small"
          ></TextField>
          <TextField
            {...register("telefone")}
            helperText={errors.telefone?.message}
            error={errors.telefone}
            name="telefone"
            label="Telefone"
            variant="standard"
            size="small"
          ></TextField>
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <TextField
              helperText={errors.cep?.message}
              error={errors.cep}
              value={cep || ""}
              name="cep"
              label="CEP"
              variant="standard"
              size="small"
              type="number"
              onChange={({ target }) => setCep(target.value)}
            ></TextField>
            <Button
              type="button"
              variant="outlined"
              onClick={handleSearchCep}
              disabled={load}
            >
              Buscar
            </Button>
          </div>
          <TextField
            {...register("logradouro")}
            helperText={errors.logradouro?.message}
            name="logradouro"
            placeholder="Logradouro"
            variant="standard"
            size="small"
            disabled
            value={endereco?.logradouro || ""}
          ></TextField>
          <TextField
            {...register("numero")}
            helperText={errors.numero?.message}
            error={errors.numero}
            name="numero"
            label="Número"
            variant="standard"
            size="small"
            type="number"
          ></TextField>
          <TextField
            {...register("cidade")}
            helperText={errors.cidade?.message}
            name="cidade"
            placeholder="Cidade"
            variant="standard"
            size="small"
            disabled
            value={endereco?.localidade || ""}
          ></TextField>
          <TextField
            {...register("estado")}
            helperText={errors.estado?.message}
            name="estado"
            placeholder="Estado"
            variant="standard"
            size="small"
            disabled
            value={endereco?.uf || ""}
          ></TextField>
          <Button variant="outlined" type="submit">
            Cadastrar
          </Button>
        </form>
      </Container>
    </>
  );
};
export default HomePage;
