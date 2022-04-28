import Container from "../components/Container/container";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Header from "../components/Header/header";
import Modal from "../components/Modal/modal";

const DashboardPage = () => {
  const [load, setLoad] = useState(false);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [resetPassword, setResetPassword] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const handleDeleteUser = async () => {
    await axios.delete(`http://localhost:3000/user/${id}`).then(() => {
      toast.success("Usuário deletado com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
      });
      reset();
    });
  };

  const handleEditUser = async (data) => {
    delete data.cpf;
    data.cep = Number(data.cep);
    await axios
      .patch(`http://localhost:3000/user/${id}`, data)
      .then(() => {
        toast.success("Usuário editado com sucesso!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        toast.error("Preencha todos os campos!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
      console.log(data)
  };

  const handleSearchUser = async () => {
    setLoad(true);
    if (!getValues("cpf")) {
      toast.error("Preencha o campo CPF", {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoad(false);
      return;
    }
    await axios
      .get(`http://localhost:3000/user/${getValues("cpf")}`)
      .then((resp) => {
        if (resp.data.erro) {
          toast.error("CPF não encontrado!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          const data = resp.data;
          setId(data.id);
          setValue("nome", data.nome);
          setValue("cpf", data.cpf);
          setValue("telefone", data.telefone);
          setValue("cep", Number(data.cep));
          setValue("logradouro", data.logradouro);
          setValue("numero", data.numero);
          setValue("cidade", data.cidade);
          setValue("estado", data.estado);
        }
      })
      .catch((err) => {
        toast.error("CPF não encontrado!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    setLoad(false);
  };

  const handleSearchCep = async () => {
    setLoad(true);
    await axios
      .get(`http://localhost:3000/cep/${getValues("cep")}`)
      .then((resp) => {
        if (resp.data.erro) {
          toast.error("CEP não encontrado!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          const data = resp.data;
          setValue("logradouro", data.logradouro);
          setValue("cidade", data.localidade);
          setValue("estado", data.uf);
        }
      })
      .catch((err) => {
        toast.error("CEP não encontrado!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    setLoad(false);
  };

  const handleResetPassword = async () => {
    if (getValues("cpf")) {
      const newPassword = await axios
        .get(`http://localhost:3000/recovery/${getValues("cpf")}`)
        .then((data) => setResetPassword(data.data["new password"]));
      setOpen(true);
    } else {
      toast.error("Digite um CPF para resetar a senha!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      {open && <Modal setOpen={setOpen} newPassword={resetPassword} />}
      <Header />
      <Container>
        <form onSubmit={handleSubmit(handleEditUser)}>
          <Typography variant="h3" align="center">
            Dashboard
          </Typography>
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <TextField
              {...register("cpf")}
              helperText={errors.cpf?.message}
              error={errors.cpf}
              name="cpf"
              placeholder="CPF"
              variant="standard"
              size="small"
            ></TextField>
            <Button
              type="button"
              variant="outlined"
              onClick={handleSearchUser}
              disabled={load}
            >
              Buscar
            </Button>
          </div>
          <TextField
            {...register("nome")}
            helperText={errors.nome?.message}
            error={errors.nome}
            name="nome"
            placeholder="Nome"
            variant="standard"
            size="small"
          ></TextField>
          <TextField
            {...register("telefone")}
            helperText={errors.telefone?.message}
            error={errors.telefone}
            name="telefone"
            placeholder="Telefone"
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
              error={errors.cep}
              name="cep"
              placeholder="CEP"
              variant="standard"
              size="small"
              type="number"
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
          ></TextField>
          <TextField
            {...register("numero")}
            helperText={errors.numero?.message}
            error={errors.numero}
            name="numero"
            placeholder="Número"
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
          ></TextField>
          <TextField
            {...register("estado")}
            helperText={errors.estado?.message}
            name="estado"
            placeholder="Estado"
            variant="standard"
            size="small"
          ></TextField>
          <Button sx={{ mt: "12px" }} variant="outlined" type="submit">
            Editar
          </Button>
          <Button
            sx={{ mt: "12px" }}
            variant="outlined"
            type="button"
            onClick={handleDeleteUser}
          >
            Excluir
          </Button>
          <Button
            sx={{ mt: "12px" }}
            variant="outlined"
            type="button"
            onClick={handleResetPassword}
          >
            Resetar Senha
          </Button>
        </form>
      </Container>
    </>
  );
};
export default DashboardPage;
