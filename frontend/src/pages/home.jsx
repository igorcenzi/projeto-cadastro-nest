import Container from "../components/Container/container";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const HomePage = () => {
  const [endereco, setEndereco] = useState({});
  const [cep, setCep] = useState(0);
  const [load, setLoad] = useState(false);

  const formSchema = yup.object().shape({
    nome: yup.string().required("Nome obrigatório"),
    telefone: yup.string().required("Telefone obrigatório"),
    cpf: yup.string().required("CPF obrigatório"),
    cep: yup.number().required("CEP obrigatório"),
    //logradouro: yup.string().required('Logradouro obrigatório'),
    numero: yup.number().required("Número da residência obrigatório"),
    //cidade: yup.string().required('Cidade obrigatória'),
    //estado: yup.string().required('Estado obrigatório'),
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
          setEndereco({});
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
      if (data.logradouro) {
        console.log(data);
        const user = await axios
          .post(`http://localhost:3000/user`, data)
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleRegister)}>
        <Typography variant="h3" align="center">
          Cadastro
        </Typography>
        <TextField
          {...register("nome")}
          helperText={errors.nome?.message}
          name="nome"
          label="Nome"
          variant="standard"
          size="small"
        ></TextField>
        <TextField
          {...register("password")}
          helperText={errors.password?.message}
          name="password"
          label="Senha"
          variant="standard"
          size="small"
          type="password"
        ></TextField>
        <TextField
          {...register("confirmPassword")}
          helperText={errors.confirmPassword?.message}
          name="confirmPassword"
          label="Confirmar Senha"
          variant="standard"
          size="small"
          type="password"
        ></TextField>
        <TextField
          {...register("cpf")}
          helperText={errors.cpf?.message}
          name="cpf"
          label="CPF"
          variant="standard"
          size="small"
        ></TextField>
        <TextField
          {...register("telefone")}
          helperText={errors.telefone?.message}
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
            {...register("cep")}
            helperText={errors.cep?.message}
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
  );
};
export default HomePage;
